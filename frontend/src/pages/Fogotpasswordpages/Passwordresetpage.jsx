import React, { useState } from "react";
import logoImage from "../../assets/LOGO.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function Passwordresetpage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
                <p className="text-red-500 text-lg font-medium">
                    ❌ Email not found. Please go back and try again.
                </p>
            </div>
        );
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            setConfirmPassword("");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(process.env.REACT_APP_API_URL + "/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert("✅ Password reset successful");
                navigate("/success");
            } else {
                alert(data.message || "❌ Failed to reset password");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
            <form
                onSubmit={handlePasswordChange}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
                <div className="flex flex-col items-center mb-8">
                    <img
                        src={logoImage}
                        alt="CV Create Logo"
                        className="w-14 h-14 rounded-lg mb-2"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        CV Create
                    </h2>
                </div>

                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Reset Password
                </h3>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 size={20} className="animate-spin" />}
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Passwordresetpage;