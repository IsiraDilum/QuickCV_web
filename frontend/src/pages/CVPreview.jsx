import React, { useEffect, useRef, useState } from "react";
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import ClassicTemplate from "../components/cv-templates/ClassicTemplate";
import ModernTemplate from "../components/cv-templates/ModernTemplate";
import ExecutiveTemplate from "../components/cv-templates/ExecutiveTemplate";
import JobseekerTemplate from "../components/cv-templates/JobseekerTemplate";
import RedSidebarTemplate from "../components/cv-templates/RedSidebarTemplate";
import BlueSidebarTemplate from "../components/cv-templates/BlueSidebarTemplate";
import { calculateCVSections } from "../utils/cvLayoutCalculator";

const sampleCVData = {
    fullName: "K.A. Isira Dilum",
    email: "isiradilum@example.com",
    phone: "+94 77 000 0000",
    location: "Gampaha, Sri Lanka",
    jobTitle: "Software Engineering Undergraduate",

    summary:
        "Motivated IT undergraduate with hands-on experience in software development and modern web technologies.",

    education: [
        {
            title: "Bachelor of Information and Communication Technology (BICT)",
            date: "2023 - Present"
        },
        {
            title: "Diploma in Software Engineering - NAITA",
            date: "2022 - 2023"
        }
    ],

    experience: [
        {
            role: "Software Developer (Academic Projects)",
            company: "University Projects",
            date: "2024 - Present"
        }
    ],

    extracurricular: [
        {
            activity: "Software Development Projects",
            date: "2024"
        },
        {
            activity: "Programming Competitions",
            date: "2025"
        }
    ],

    references: "Available upon request.",

    skillCategories: [
        {
            category: "Languages",
            skills: ["Java", "Python", "JavaScript"]
        },
        {
            category: "Web Development",
            skills: ["HTML", "CSS", "React", "Node.js"]
        }
    ],

    links: [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/isira-dilum"
        },
        {
            name: "GitHub",
            url: "https://github.com/isiraDilum"
        },
        {
            name: "Facebook",
            url: "https://facebook.com/isiraDilum"
        }
    ],

    projects: [
        {
            title: "QuickCV Resume Builder",
            developDate: "2026",
            description:
                "A full-stack CV builder with multiple templates and PDF export.",
            technologies: "React, Node.js, MongoDB",
            link: "https://github.com/isiraDilum/quickcv"
        },
        {
            title: "Real-Time Currency Converter",
            developDate: "2025",
            description:
                "Currency converter with API integration.",
            technologies: "Java, SQL",
            link: "https://github.com/isiraDilum"
        }
    ],

    themeColor: "blue"
};

const CVPreview = () => {
    const previewRef = useRef(null);
    const [cvData, setCvData] = useState({});
    const [theme, setTheme] = useState("classic");
    const [isSamplePreview, setIsSamplePreview] = useState(false);
    const [layout, setLayout] = useState(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("cvTheme") || "classic";
        const previewMode = localStorage.getItem("cvPreviewMode");
        const savedData = JSON.parse(localStorage.getItem("cvData") || "{}");

        const finalData =
            previewMode === "sample"
                ? {
                    ...sampleCVData,
                    themeColor: savedData.themeColor || sampleCVData.themeColor,
                }
                : {
                    ...savedData,
                    themeColor: savedData.themeColor || "blue",
                };

        setTheme(savedTheme);
        setCvData(finalData);
        setIsSamplePreview(previewMode === "sample");
    }, []);
    useEffect(() => {
        if (!cvData || Object.keys(cvData).length === 0) return;

        const result = calculateCVSections(cvData);
        setLayout(result);

        console.log("CV Layout:", result);
    }, [cvData]);

    const handleThemeColorChange = (e) => {
        const selectedColor = e.target.value;

        setCvData((prev) => {
            const updated = {
                ...prev,
                themeColor: selectedColor,
            };

            if (isSamplePreview) {
                const savedData = JSON.parse(localStorage.getItem("cvData") || "{}");
                localStorage.setItem(
                    "cvData",
                    JSON.stringify({
                        ...savedData,
                        themeColor: selectedColor,
                    })
                );
            } else {
                localStorage.setItem("cvData", JSON.stringify(updated));
            }

            return updated;
        });
    };

    const downloadPDF = async () => {
        const element = previewRef.current;
        if (!element) return;

        const pages = element.querySelectorAll(".cv-page");
        if (!pages.length) return;

        const pdf = new jsPDF("p", "mm", "a4");

        for (let i = 0; i < pages.length; i++) {

            const canvas = await html2canvas(pages[i], {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            });

            const imgData = canvas.toDataURL("image/png");

            if (i !== 0) pdf.addPage();

            pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        }

        pdf.save("cv.pdf");
    };

    const downloadJPG = async () => {

        const element = previewRef.current;
        if (!element) return;

        const pages = element.querySelectorAll(".cv-page");
        if (!pages.length) return;

        for (let i = 0; i < pages.length; i++) {

            const canvas = await html2canvas(pages[i], {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            });

            const link = document.createElement("a");
            link.download = `cv-page-${i + 1}.jpg`;
            link.href = canvas.toDataURL("image/jpeg", 1.0);
            link.click();
        }
    };

    const renderTheme = () => {

        const props = { cvData, paginated: true };

        switch (theme) {
            case "modern":
                return <ModernTemplate {...props} />;

            case "executive":
                return <ExecutiveTemplate {...props} />;

            case "jobseeker":
                return <JobseekerTemplate {...props} />;

            case "redsidebar":
                return <RedSidebarTemplate {...props} />;

            case "bluesidebar":
                return <BlueSidebarTemplate {...props} />;

            default:
                return <ClassicTemplate {...props} />;
        }
    };

    const showColorDropdown = theme === "executive" || theme === "modern";

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            CV Preview
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Preview your CV and download it in your preferred format.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {showColorDropdown && (
                            <div className="flex items-center gap-3">
                                <label
                                    htmlFor="themeColor"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Theme Color
                                </label>

                                <select
                                    id="themeColor"
                                    value={cvData.themeColor || "blue"}
                                    onChange={handleThemeColorChange}
                                    className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="blue">Blue</option>
                                    <option value="indigo">Indigo</option>
                                    <option value="emerald">Emerald</option>
                                    <option value="red">Red</option>
                                    <option value="purple">Purple</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </div>
                        )}

                        <button
                            onClick={downloadPDF}
                            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700"
                        >
                            Download PDF
                        </button>

                        <button
                            onClick={downloadJPG}
                            className="px-5 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-800"
                        >
                            Download JPG
                        </button>
                    </div>
                </div>

                {/* SAMPLE MODE */}
                {isSamplePreview && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200 font-medium">
                        Sample Preview Mode is enabled. This preview is showing demo CV information.
                    </div>
                )}

                {/* ⚠️ OVERFLOW WARNING */}
                {layout?.isOverflow && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-red-100 text-red-700 border border-red-200 font-medium">
                        ⚠️ CV content is too long. It may overflow the page. Try reducing content.
                    </div>
                )}

                {/* 🧠 DEBUG INFO (optional but useful) */}
                {layout && (
                    <div className="text-sm text-gray-500 mb-4">
                        Total Height: {layout.totalHeight}px
                    </div>
                )}

                {/* CV PREVIEW */}
                <div ref={previewRef} className="flex flex-col items-center gap-10 py-10">

                    {/* ✅ ONLY ONE cv-page HERE */}
                    <div
                        className="cv-page bg-white shadow-lg"
                        style={{
                            width: "210mm",
                            height: "297mm",
                            overflow: "hidden"
                        }}
                    >
                        {renderTheme()}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CVPreview;