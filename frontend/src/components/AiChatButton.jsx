import axios from "axios";
import React, { useState, useEffect } from "react";

const AiChatButton = () => {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [showWelcome, setShowWelcome] = useState(false);

    const [messages, setMessages] = useState([
        { sender: "ai", text: "👋 Hi! I can help you build your CV." }
    ]);

    // ✅ show welcome after login
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setShowWelcome(true);

            const timer = setTimeout(() => {
                setShowWelcome(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, []);

    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = { sender: "user", text: message };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const res = await axios.post("http://localhost:5000/api/ai/chatbot", {
                message: message,
                cvData: {}
            });

            const aiReply = {
                sender: "ai",
                text: res.data.reply
            };

            setMessages(prev => [...prev, aiReply]);

        } catch (error) {

            setMessages(prev => [
                ...prev,
                { sender: "ai", text: "⚠️ AI server error" }
            ]);

        }

        setLoading(false);
        setMessage("");
    };

    return (
        <>
            {/* ✅ WELCOME MESSAGE (LEFT SIDE OF BOT ICON) */}
            {showWelcome && (
                <div
                    onClick={() => {
                        setOpen(true);
                        setShowWelcome(false);
                    }}
                    className="fixed bottom-9 right-24 bg-white shadow-2xl rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 cursor-pointer z-50"
                >
                    👋 Hi! I can help you build your CV
                </div>
            )}

            {/* CHAT WINDOW */}
            {open && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white dark:bg-gray-900 shadow-2xl rounded-xl border border-gray-300 dark:border-gray-700 flex flex-col z-50">

                    {/* HEADER */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center text-gray-800 dark:text-white font-semibold">
                        AI CV Assistant
                        <button
                            onClick={() => setOpen(false)}
                            className="text-gray-300 hover:text-red-500"
                        >
                            ✕
                        </button>
                    </div>

                    {/* CHAT AREA */}
                    <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user"
                                    ? "ml-auto bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                                }`}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {loading && (
                            <div className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-2 rounded-lg max-w-[60%]">
                                AI is typing<span className="animate-pulse">...</span>
                            </div>
                        )}

                    </div>

                    {/* INPUT */}
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            placeholder="Ask something..."
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-white bg-white dark:bg-gray-800 focus:outline-none resize-none"
                            rows={2}
                        />

                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>

                </div>
            )}

            {/* FLOATING BUTTON */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg hover:scale-110 transition z-50"
            >
                <img
                    src="/ai-bot.png"
                    alt="AI Chat"
                    className="w-full h-full rounded-full"
                />
            </button>
        </>
    );
};

export default AiChatButton;