import React, { useState, useRef } from "react";
import mailImage from "../../assets/verificationpageimg.jpg";
import logoImage from "../../assets/LOGO.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function VerificationPage() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
                <p className="text-red-500 text-base sm:text-lg font-medium text-center">
                    ❌ Email not found. Please go back and try again.
                </p>
            </div>
        );
    }

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < code.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpCode = code.join("");

        if (otpCode.length !== 6) {
            alert("Please enter the 6-digit OTP");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                process.env.REACT_APP_API_URL + "/api/auth/verify-otp",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp: otpCode }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                navigate("/email-verified", { state: { email } });
            } else {
                alert(data.message || "Invalid OTP");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            setResending(true);

            const response = await fetch(
                process.env.REACT_APP_API_URL + "/api/auth/send-otp",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                alert("OTP sent again successfully");
            } else {
                alert(data.message || "Failed to resend OTP");
            }
        } catch (err) {
            console.error("Error resending OTP:", err);
            alert("Server error");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-3 py-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
            <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">

                {/* Logo */}
                <div className="flex flex-col items-center mb-5">
                    <img
                        src={logoImage}
                        alt="CV Create Logo"
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg mb-2"
                    />
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                        CV Create
                    </h2>
                </div>

                {/* Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={mailImage}
                        alt="Verification"
                        className="w-24 sm:w-40"
                    />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
                    Verification Code
                </h3>

                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
                    Enter the 6-digit code sent to your email
                </p>

                {/* OTP Form */}
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 sm:gap-3 mb-5">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    {/* Resend */}
                    <div className="text-center mb-5">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resending}
                            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium hover:underline disabled:opacity-60"
                        >
                            {resending ? "Sending..." : "Resend Code"}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 sm:py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 size={20} className="animate-spin" />}
                        {loading ? "Verifying..." : "Verify"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VerificationPage;