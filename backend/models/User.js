// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Only required if NOT a Google user
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple nulls for regular users
    },
    avatar: {
        type: String // Optional: store Google profile picture
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);