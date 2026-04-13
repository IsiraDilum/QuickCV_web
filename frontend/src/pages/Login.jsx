import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        if (message) {
            setMessage("");
            setIsError(false);
        }
    };

    // GOOGLE LOGIN
    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/google",
                { token: credentialResponse.credential }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage("Google login successful!");
            setIsError(false);

            setTimeout(() => {
                navigate("/dashboard");
            }, 600);

        } catch (err) {

            const msg =
                err.response?.data?.message ||
                "Google login failed. Try again.";

            setMessage(msg);
            setIsError(true);

        } finally {
            setLoading(false);
        }
    };


    // EMAIL LOGIN
    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                form
            );

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
            }

            if (res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            setMessage(res.data.message || "Login successful!");
            setIsError(false);

            setTimeout(() => {
                navigate("/dashboard");
            }, 600);

            setForm({ email: "", password: "" });

        } catch (err) {

            const errorMsg =
                err.response?.data?.message ||
                "Login failed. Please try again.";

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

                    {/* HEADER */}
                    <div className="px-8 pt-8 pb-6 text-center">

                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome Back
                        </h2>

                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Sign in to continue
                        </p>

                    </div>


                    {/* GOOGLE LOGIN */}
                    <div className="px-8 pb-2">

                        <div className="flex justify-center mb-6">

                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    setMessage("Google login failed");
                                    setIsError(true);
                                }}
                                theme="filled_blue"
                                shape="pill"
                                text="signin_with"
                                width="100%"
                                logo_alignment="center"
                            />

                        </div>


                        {/* SEPARATOR */}
                        <div className="relative flex items-center py-3">

                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>

                            <span className="flex-shrink mx-4 text-gray-400 text-sm">
                                or
                            </span>

                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>

                        </div>

                    </div>


                    {/* MESSAGE */}
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


                    {/* LOGIN FORM */}
                    <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">


                        {/* EMAIL */}
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


                        {/* PASSWORD */}
                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
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


                        {/* REMEMBER / FORGOT */}
                        <div className="flex items-center justify-between text-sm">

                            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 select-none">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-600"
                                />
                                Remember me
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                            >
                                Forgot password?
                            </Link>

                        </div>


                        {/* LOGIN BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 size={20} className="animate-spin" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>

                    </form>


                    {/* FOOTER */}
                    <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">

                        Don&apos;t have an account?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline"
                        >
                            Create account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;