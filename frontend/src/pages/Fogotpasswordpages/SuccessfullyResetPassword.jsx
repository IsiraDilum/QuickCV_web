import React from "react";
import logoImage from "../../assets/LOGO.jpg";
import frontimage from "../../assets/SuccessfullyResetPassword.png";
import { useNavigate } from "react-router-dom";

function SuccessfullyResetPassword() {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
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

                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                    Password Changed <br /> Successfully
                </h2>

                <div className="flex justify-center mb-6">
                    <img
                        src={frontimage}
                        alt="Success"
                        className="w-44"
                    />
                </div>

                <button
                    type="button"
                    onClick={handleContinue}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                    Log In
                </button>
            </div>
        </div>
    );
}

export default SuccessfullyResetPassword;