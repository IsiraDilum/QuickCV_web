import React from "react";
import logoImage from "../../assets/LOGO.jpg";
import frontimage from "../../assets/Verified.png";
import { useNavigate, useLocation } from "react-router-dom";

function EmailVerifiedpage() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg font-medium">
                    ❌ Email not found. Please go back and try again.
                </p>
            </div>
        );
    }

    const handleContinue = async () => {
        try {
            const res = await fetch(process.env.REACT_APP_API_URL + "/api/auth/auto-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/dashboard");
            } else {
                alert("Login failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">

            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">

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

                {/* Verified Image */}
                <div className="flex justify-center mb-4">
                    <img
                        src={frontimage}
                        alt="Verified"
                        className="w-40"
                    />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">
                    Email Verified
                </h3>

                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                    Congratulations, your email address has been verified successfully.
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/reset-password", { state: { email } })
                        }
                        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
                    >
                        Reset Password
                    </button>

                    <button
                        type="button"
                        onClick={handleContinue}
                        className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-medium transition"
                    >
                        Continue
                    </button>

                </div>

            </div>
        </div>
    );
}

export default EmailVerifiedpage;