import React from "react";

const Footer = () => {
    return (
        <footer className="mt-20 py-8 text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            <p>© {new Date().getFullYear()} QuickCV • Made with Dev Dilum • Completely Free</p>
        </footer>
    );
};

export default Footer;