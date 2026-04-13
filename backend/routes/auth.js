const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();

// Temporary OTP store
const otpStore = {};
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GOOGLE LOGIN / SIGNUP
router.post("/google", async (req, res) => {
    try {
        const { token } = req.body;

        // 1. Verify the Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, sub, picture } = ticket.getPayload();

        // 2. Find or Create the User
        let user = await User.findOne({ email });

        if (!user) {
            // Register new Google user
            user = await User.create({
                username: name,
                email: email,
                googleId: sub,
                avatar: picture,
                // password is not needed due to our model logic
            });
        } else if (!user.googleId) {
            // Link Google ID to existing email account if not already linked
            user.googleId = sub;
            user.avatar = picture;
            await user.save();
        }

        // 3. Generate your own JWT for the app
        const jwtToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token: jwtToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            },
        });
    } catch (err) {
        console.error("Google Auth Error:", err);
        res.status(400).json({ message: "Google authentication failed" });
    }
});

// SEND OTP
router.post("/send-otp", async (req, res) => {
    console.log("SEND OTP route hit");
    console.log("Body:", req.body);

    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found. Please go back and try again.",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[email] = {
            otp,
            expiresAt: Date.now() + 5 * 60 * 1000,
        };

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "CV Create OTP Verification",
            text: `Your OTP code is: ${otp}. This code will expire in 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.json({
            success: true,
            message: "OTP sent successfully",
        });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
        });
    }
});

// AUTO LOGIN BY EMAIL (after verify)
router.post("/auto-login", async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// VERIFY OTP
router.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            success: false,
            message: "Email and OTP are required",
        });
    }

    const record = otpStore[email];

    if (!record) {
        return res.status(400).json({
            success: false,
            message: "No OTP found for this email",
        });
    }

    if (Date.now() > record.expiresAt) {
        delete otpStore[email];
        return res.status(400).json({
            success: false,
            message: "OTP expired",
        });
    }

    if (record.otp !== otp) {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP",
        });
    }

    delete otpStore[email];

    res.json({
        success: true,
        message: "OTP verified",
    });
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});

module.exports = router;