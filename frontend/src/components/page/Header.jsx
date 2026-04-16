import React from "react";
import { FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
        >
            <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">

                {/* Logo animation */}
                <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    >
                        <FileText className="h-8 w-8 text-blue-600" />
                    </motion.div>

                    <div className="leading-tight">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            QuickCV
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            ATS-friendly • Fast • Free
                        </p>
                    </div>
                </motion.div>

                {/* Right side */}
                <div className="flex items-center gap-4">

                    {/* Username pulse (attention effect) */}
                    <motion.div
                        className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}
                    >
                        👋 Welcome, {}
                    </motion.div>

                    {/* Logout button hover animation */}
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:text-red-500 dark:text-gray-200 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        title="Logout"
                        aria-label="Logout"
                    >
                        <LogOut size={28} />
                    </motion.button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;