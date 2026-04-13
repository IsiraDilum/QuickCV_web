import React, { useState } from "react";
import logoImage from "../../assets/LOGO.jpg";
import FGImage from "../../assets/fogotpasswordpage1image.jpg";
import { useNavigate } from "react-router-dom";

function FogotpasswordPage1() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("http://localhost:5000/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("OTP sent to your email.");
                navigate("/verify", { state: { email } });
            } else {
                alert(data.message || "Failed to send OTP");
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Error connecting to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={logoImage}
                        alt="CV Create Logo"
                        className="w-14 h-14 rounded-lg mb-2"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        CV Create
                    </h2>
                </div>

                {/* Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={FGImage}
                        alt="Forgot Password"
                        className="w-48"
                    />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
                    Forgot Password?
                </h3>

                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                    Don’t worry! It happens. Please enter the email address
                    associated with your account.
                </p>

                {/* Email */}
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />

                {/* Login link */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Remember your password?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                    >
                        Go to login
                    </span>
                </p>

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-70"
                >
                    {loading ? "Sending..." : "Submit"}
                </button>

            </form>
        </div>
    );
}

export default FogotpasswordPage1;