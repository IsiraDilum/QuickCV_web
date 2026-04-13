import React from "react";
import developer from "../images/developer.jpeg";
import {
    FileText,
    Sparkles,
    Download,
    Palette,
    Wand2,
    ShieldCheck,
} from "lucide-react";
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";
import img2 from "../images/img2.png";

const features = [
    {
        icon: FileText,
        title: "Smart CV Builder",
        description:
            "Create a professional CV step by step with personal details, education, experience, projects, skills, references, and more.",
    },
    {
        icon: Wand2,
        title: "AI-Powered Writing Help",
        description:
            "Generate summaries, improve grammar, and auto-fill skills using AI-assisted features for faster resume writing.",
    },
    {
        icon: Palette,
        title: "Multiple CV Templates",
        description:
            "Choose from different resume layouts including classic, executive, jobseeker, modern, and sidebar-based themes.",
    },
    {
        icon: Download,
        title: "Export Ready",
        description:
            "Preview your CV and download it as PDF or JPG for sharing, printing, or job applications.",
    },
    {
        icon: Sparkles,
        title: "Modern User Experience",
        description:
            "Simple and responsive interface designed to make CV creation fast, easy, and visually attractive.",
    },
    {
        icon: ShieldCheck,
        title: "ATS-Friendly Focus",
        description:
            "Templates are designed to stay clean and readable, helping users create resumes suitable for job applications.",
    },
];

const techStack = [
    "React.js",
    "React Router",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Hugging Face API",
    "html2canvas",
    "jsPDF",
];

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
            <Header />

            <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
                <section className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium mb-6">
                        <Sparkles size={18} />
                        About This Project
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        QuickCV Resume Builder
                    </h1>

                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        QuickCV is a modern web-based CV builder designed to help users create
                        clean, professional, and ATS-friendly resumes in minutes. It simplifies
                        the resume creation process through guided forms, AI-assisted writing,
                        multiple template options, and instant export features.
                    </p>
                </section>

                <section className="mb-16">
                    <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/40 p-8 sm:p-10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">
                            Project Overview
                        </h2>

                        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-8 text-[17px]">
                            <p>
                                This project was built to provide a simple but powerful platform
                                for students, job seekers, and professionals who need to prepare
                                resumes quickly without using complex design tools.
                            </p>

                            <p>
                                Users can enter their personal details, professional summary,
                                education, work experience, technical skills, projects,
                                extracurricular activities, and references through an easy
                                step-by-step interface.
                            </p>

                            <p>
                                The application also includes AI-powered features such as summary
                                generation, grammar improvement, and skill extraction to make the
                                resume-building experience faster and smarter.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Key Features
                    </h2>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/40 hover:shadow-2xl transition"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                                    <feature.icon className="text-indigo-600 dark:text-indigo-400" size={26} />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 leading-7">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-16">
                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/40 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                                Technologies Used
                            </h2>

                            <div className="flex flex-wrap gap-3">
                                {techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/40 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
                                Future Improvements
                            </h2>

                            <div className="space-y-3 text-gray-700 dark:text-gray-300 leading-7">
                                <p>• User account-based CV saving and editing</p>
                                <p>• More premium resume templates</p>
                                <p>• Drag-and-drop section arrangement</p>
                                <p>• Better AI recommendations for job-specific resumes</p>
                                <p>• Real-time ATS score analysis</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl text-white p-8 sm:p-10 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            Why This Project Matters
                        </h2>

                        <p className="text-lg leading-8 text-indigo-50 max-w-4xl">
                            QuickCV was created to solve a practical problem: many users need a
                            resume builder that is fast, clean, modern, and easy to use. This
                            project combines frontend design, backend integration, AI features,
                            and export functionality into one complete application, making it a
                            strong portfolio project for modern web development.
                        </p>
                    </div>
                </section>
                <section className="mt-20">
                    <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/40 p-10 text-center">

                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Developer
                        </h2>

                        <div className="flex flex-col items-center gap-4">

                            <img
                                src={developer}
                                alt="Developer"
                                className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
                            />

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                K.A.I Dilum
                            </h3>

                            <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                                Software Engineering Student
                            </p>

                            <p className="max-w-2xl text-gray-600 dark:text-gray-300 leading-7">
                                I am an Information and Communication Technology student at the
                                University of Sri Jayewardenepura with a strong interest in
                                full-stack web development, modern UI design, and AI-assisted
                                applications. I enjoy building practical software solutions that
                                improve productivity and user experience.
                            </p>

                            <div className="flex gap-4 mt-3">

                                <a
                                    href="https://github.com/IsiraDilum"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
                                >
                                    GitHub
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/Dev-isira-dilum"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                >
                                    LinkedIn
                                </a>

                            </div>

                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;