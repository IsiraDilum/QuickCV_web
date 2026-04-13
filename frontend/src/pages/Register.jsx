import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";           // ← added
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();                             // ← added

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        if (message) {
            setMessage("");
            setIsError(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/google", {
                token: credentialResponse.credential,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage("Google signup successful!");
            setIsError(false);

            // Optional: small delay for user to see success message
            setTimeout(() => {
                navigate("/dashboard");
            }, 800);
        } catch (err) {
            const msg = err.response?.data?.message || "Google registration failed. Try again.";
            setMessage(msg);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", form);

            setMessage(res.data.message || "Registration successful! Please sign in.");
            setIsError(false);
            setForm({ username: "", email: "", password: "" });

            // Optional: auto-redirect to login after success
            // setTimeout(() => navigate("/login"), 1200);
        } catch (err) {
            const errorMsg =
                err.response?.data?.message || "Registration failed. Please try again.";
            setMessage(errorMsg);
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-6 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Create Account
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Join us and start your journey
                        </p>
                    </div>

                    {/* Google + separator */}
                    <div className="px-8 pb-4">
                        <div className="flex justify-center mb-6">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    setMessage("Google signup failed");
                                    setIsError(true);
                                }}
                                theme="filled_blue"
                                shape="pill"
                                text="signup_with"          // ← better for register page
                                width="100%"
                                logo_alignment="center"
                                disabled={loading}
                            />
                        </div>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                        </div>
                    </div>

                    {/* Single message display – moved up */}
                    {message && (
                        <div
                            className={`mx-8 mb-6 text-center text-sm font-medium p-3 rounded-lg border ${
                                isError
                                    ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800"
                                    : "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">
                        {/* Username */}
                        <div className="relative">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                autoComplete="username"
                                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder=" "
                            />
                            <label
                                htmlFor="username"
                                className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Username
                            </label>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                className="peer w-full px-4 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Email address
                            </label>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="new-password"
                                className="peer w-full px-4 pt-6 pb-2 pr-11 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 pointer-events-none transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Password
                            </label>

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={20} className="animate-spin" />}
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;