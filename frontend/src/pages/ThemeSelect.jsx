
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";

const themes = [
    {
        id: "classic",
        name: "Classic Professional",
        description: "Clean, balanced, and formal layout for internships and office jobs.",
        previewClass: "bg-white border border-gray-200",
    },
    {
        id: "modern",
        name: "Modern Sidebar",
        description: "A stylish layout with a left sidebar for contact details and skills.",
        previewClass: "bg-white border border-gray-200",
    },
    {
        id: "executive",
        name: "Executive Blue",
        description: "A polished professional design with bold blue headers and structured sections.",
        previewClass: "bg-white border border-gray-200",
    },
    {
        id: "jobseeker",
        name: "Jobseeker Green",
        description: "A clean professional layout with green section headers like classic resume builders.",
        previewClass: "bg-white border border-gray-200",
    },
    {
        id: "redsidebar",
        name: "Red Sidebar Pro",
        description: "A professional resume with a red sidebar and structured content layout.",
        previewClass: "bg-white border border-gray-200",
    },
    {
        id: "bluesidebar",
        name: "Blue Sidebar Clean",
        description: "A modern professional resume with a blue sidebar and clean right-side content.",
        previewClass: "bg-white border border-gray-200",
    },
];

const ThemeSelect = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const isSamplePreview = searchParams.get("preview") === "sample";

    const handleSelectTheme = (themeId) => {
        localStorage.setItem("cvTheme", themeId);

        if (isSamplePreview) {
            localStorage.setItem("cvPreviewMode", "sample");
        } else {
            localStorage.removeItem("cvPreviewMode");
        }

        navigate("/cv-preview");
    };
    const step = 4; // Theme is step 4

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
            <Header />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
                {/* STEP INDICATOR */}
                <div className="mb-12">
                    <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                        <span>Personal ✅</span>
                        <span>Professional ✅</span>
                        <span>Education & Projects ✅</span>
                        <span>Theme</span>
                    </div>

                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Select Your CV Theme
                </h1>


                <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
                    {isSamplePreview
                        ? "Choose a template to preview with sample resume data."
                        : "Choose the design style for your resume preview and download."}
                </p>

                {isSamplePreview && (
                    <div className="max-w-3xl mx-auto mb-8 px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200 text-center font-medium">
                        Sample Preview Mode is enabled. These templates will open with demo CV information.
                    </div>
                )}

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className="bg-white/80 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
                        >
                            <div
                                className={`h-64 rounded-xl overflow-hidden mb-5 ${theme.previewClass}`}
                            >
                                {theme.id === "classic" && (
                                    <div className="h-full flex flex-col">
                                        <div className="h-14 bg-gray-800" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-4 w-2/3 bg-gray-300 rounded" />
                                            <div className="h-3 w-1/2 bg-gray-200 rounded" />
                                            <div className="h-3 w-full bg-gray-200 rounded" />
                                            <div className="h-3 w-5/6 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                )}

                                {theme.id === "modern" && (
                                    <div className="h-full flex">
                                        <div className="w-1/3 bg-indigo-600" />
                                        <div className="flex-1 p-4 space-y-3">
                                            <div className="h-4 w-2/3 bg-gray-300 rounded" />
                                            <div className="h-3 w-full bg-gray-200 rounded" />
                                            <div className="h-3 w-5/6 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                )}

                                {theme.id === "executive" && (
                                    <div className="h-full flex flex-col">
                                        <div className="h-16 bg-blue-700" />
                                        <div className="p-4 space-y-3">
                                            <div className="h-4 w-2/3 bg-blue-200 rounded" />
                                            <div className="h-3 w-full bg-gray-200 rounded" />
                                            <div className="h-3 w-5/6 bg-gray-200 rounded" />
                                        </div>
                                    </div>
                                )}

                                {theme.id === "jobseeker" && (
                                    <div className="h-full bg-[#f3f3f3] p-3">
                                        <div className="bg-white h-full border border-[#5a9c93] p-3 flex flex-col gap-3">
                                            <div className="text-center">
                                                <div className="h-4 w-1/2 bg-gray-700 rounded mx-auto mb-2" />
                                                <div className="h-2.5 w-1/3 bg-gray-300 rounded mx-auto" />
                                            </div>
                                            <div>
                                                <div className="h-5 bg-[#3f8f84] rounded-sm mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-200 rounded" />
                                                    <div className="h-2.5 w-5/6 bg-gray-200 rounded" />
                                                    <div className="h-2.5 w-4/6 bg-gray-200 rounded" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="h-5 bg-[#3f8f84] rounded-sm mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-200 rounded" />
                                                    <div className="h-2.5 w-5/6 bg-gray-200 rounded" />
                                                    <div className="h-2.5 w-4/6 bg-gray-200 rounded" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {theme.id === "redsidebar" && (
                                    <div className="h-full bg-[#f3f3f3] flex">
                                        <div className="w-[14%] bg-[#9d120d]" />
                                        <div className="w-[32%] bg-[#efe8e8] p-2 space-y-3">
                                            <div>
                                                <div className="h-4 w-3/4 bg-[#9d120d] rounded mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-5/6 bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-4/6 bg-gray-300 rounded" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="h-4 w-2/3 bg-[#9d120d] rounded mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-5/6 bg-gray-300 rounded" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 bg-white p-3 space-y-3">
                                            <div className="h-4 w-2/3 bg-gray-700 rounded" />
                                            <div className="h-3 w-1/2 bg-[#c83a2f] rounded" />
                                            <div className="h-5 w-1/3 bg-[#c83a2f] rounded mt-2" />
                                            <div className="space-y-1">
                                                <div className="h-2.5 w-full bg-gray-200 rounded" />
                                                <div className="h-2.5 w-5/6 bg-gray-200 rounded" />
                                                <div className="h-2.5 w-4/6 bg-gray-200 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {theme.id === "bluesidebar" && (
                                    <div className="h-full bg-[#f3f3f3] flex">
                                        <div className="w-[34%] bg-[#2f69b8] p-3 flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-white/90 mb-3" />
                                            <div className="h-3 w-20 bg-white/80 rounded mb-2" />
                                            <div className="h-2.5 w-16 bg-white/60 rounded mb-4" />

                                            <div className="w-full space-y-2">
                                                <div className="h-3 w-3/4 bg-white/80 rounded" />
                                                <div className="h-2.5 w-full bg-white/60 rounded" />
                                                <div className="h-2.5 w-5/6 bg-white/60 rounded" />
                                            </div>
                                        </div>

                                        <div className="flex-1 bg-[#f7f7f7] p-3 space-y-3">
                                            <div>
                                                <div className="h-4 w-1/3 bg-[#2f69b8] rounded mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-5/6 bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-4/6 bg-gray-300 rounded" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="h-4 w-1/3 bg-[#2f69b8] rounded mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-5/6 bg-gray-300 rounded" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="h-4 w-1/3 bg-[#2f69b8] rounded mb-2" />
                                                <div className="space-y-1">
                                                    <div className="h-2.5 w-full bg-gray-300 rounded" />
                                                    <div className="h-2.5 w-4/6 bg-gray-300 rounded" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                {theme.name}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-300 mb-5">
                                {theme.description}
                            </p>

                            <button
                                onClick={() => handleSelectTheme(theme.id)}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
                            >
                                {isSamplePreview ? "Preview This Theme" : "Use This Theme"}
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ThemeSelect;