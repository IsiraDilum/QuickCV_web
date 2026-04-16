import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, Infinity } from "lucide-react";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import {
    Loader2,
    Wand2,
    LayoutTemplate,
    Info,
} from "lucide-react";
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading] = useState(false);
    const handleCreateCV = () => {
        navigate("/create-cv");
    };

    const handleOpenRecentCV = () => {
        if (savedCV) {
            navigate("/cv-preview");
        }
    };

    const savedCV = JSON.parse(localStorage.getItem("cvData"));

    const user = useMemo(() => ({
        username: "Isira",
        email: "isira@example.com",
        lastCV: savedCV?.fullName ? `${savedCV.fullName}'s CV` : null
    }), [savedCV]);




    const handleExamples = () => {
        navigate("/select-theme?preview=sample");
    };

    const handleAbout = () => {
        navigate("/about");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 relative overflow-hidden">
            {/* Subtle background blobs */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute -left-40 top-20 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute right-10 bottom-32 w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow delay-700"></div>
            </div>

            <Header user={user} />

            <main className="relative max-w-7xl xl:max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-6">
                {/* Hero */}
                <div className="text-center mb-20 relative z-10">


                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 tracking-tight leading-tight">
                        Create Stunning CVs<br className="hidden sm:block" /> in Minutes
                    </h1>
                    <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <button
                            type="button"
                            onClick={handleCreateCV}
                            disabled={loading}
                            className="group relative inline-flex items-center gap-3
px-6 py-3 text-base
sm:px-8 sm:py-4 sm:text-lg
md:px-10 md:py-6 md:text-xl
bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700
text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl
focus:outline-none focus:ring-4 focus:ring-indigo-500/40
transition-all transform hover:-translate-y-1.5 disabled:opacity-60 overflow-hidden">
                            <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>

                            {loading ? (
                                <>
                                    <Loader2 size={28} className="animate-spin" />
                                    Preparing your canvas...
                                </>
                            ) : (
                                <>
                                    Start Building CV

                                </>
                            )}
                        </button>
                    </div>

                    <p className="mt-9 text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
                        Free forever. Lightning fast. ATS-optimized resumes that help you{" "}
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
        land interviews
    </span>.
                    </p>

                    {/* Floating mockup previews */}
                    <div className="relative mt-6 md:mt-8 h-[320px] sm:h-[360px] lg:h-[400px] max-w-5xl mx-auto perspective-1000">

                        <img
                            src={img1}
                            alt="Modern CV Preview 1"
                            className="absolute left-4 sm:left-8 top-10 w-64 sm:w-80 lg:w-96 rounded-2xl shadow-2xl rotate-[-5deg] z-10 border border-gray-200/60 dark:border-gray-700/50 transform transition-transform hover:rotate-[-3deg] hover:scale-105 duration-500"
                        />

                        <img
                            src={img3}
                            alt="Modern CV Preview 2"
                            className="absolute left-1/2 -translate-x-1/2 top-0 w-72 sm:w-96 lg:w-[28rem] rounded-2xl shadow-2xl z-20 border border-gray-200/60 dark:border-gray-700/50 transform transition-transform hover:scale-105 duration-500"
                        />

                        <img
                            src={img2}
                            alt="Modern CV Preview 3"
                            className="absolute right-4 sm:right-8 top-12 w-64 sm:w-80 lg:w-96 rounded-2xl shadow-2xl rotate-[4deg] z-10 border border-gray-200/60 dark:border-gray-700/50 transform transition-transform hover:rotate-[2deg] hover:scale-105 duration-500"
                        />

                    </div>



                    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <button
                            onClick={handleExamples}
                            className="mt-0 inline-flex items-center gap-3 px-9 py-5 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-300/70 dark:border-gray-600/60 text-gray-900 dark:text-gray-100 font-semibold text-lg rounded-2xl hover:bg-white dark:hover:bg-gray-700/80 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            <LayoutTemplate size={22} />
                            View Templates
                        </button>

                        <button
                            onClick={handleAbout}
                            className="inline-flex items-center gap-3 px-9 py-5 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-gray-300/70 dark:border-gray-600/60 text-gray-900 dark:text-gray-100 font-semibold text-lg rounded-2xl hover:bg-white dark:hover:bg-gray-700/80 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            <Info size={22} />
                            About Project
                        </button>
                    </div>
                </div>

                {/* Features – more elegant & premium feel */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
                    {[
                        {
                            icon: Sparkles,
                            color: "indigo",
                            title: "Modern & ATS-Optimized",
                            text: "2026-ready layouts that look professional and pass every major applicant tracking system.",
                        },
                        {
                            icon: Clock,
                            color: "emerald",
                            title: "Ready in Minutes",
                            text: "Create, preview, and download your perfect PDF resume — usually in under 5 minutes.",
                        },
                        {
                            icon: Infinity,
                            color: "violet",
                            title: "100% Free Forever",
                            text: "No watermarks, no limits, no hidden fees. Unlimited resumes, unlimited downloads.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className={`
        group relative bg-white/80 dark:bg-gray-800/70 backdrop-blur-lg 
        rounded-2xl p-7 md:p-8 border border-gray-200/60 dark:border-gray-700/50 
        shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-400
        overflow-hidden
      `}
                        >
                            {/* Subtle gradient accent bar at top */}
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-600 opacity-90`} />

                            <div className="relative">
                                <div
                                    className={`
            w-14 h-14 sm:w-16 sm:h-16 
            bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 
            dark:from-${feature.color}-900/40 dark:to-${feature.color}-800/40 
            rounded-xl flex items-center justify-center mb-5 sm:mb-6 
            group-hover:scale-110 group-hover:rotate-3 transition-all duration-400
          `}
                                >
                                    <feature.icon className={`h-7 w-7 sm:h-8 sm:w-8 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 text-[15px] sm:text-base leading-relaxed">
                                    {feature.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Start – more inviting, balanced cards */}
                <div className="
  relative overflow-hidden
  bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/70 dark:to-gray-800/70
  backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/40 dark:border-gray-700/40
  p-8 md:p-10 lg:p-12
">
                    {/* Subtle background texture */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(99,102,241,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_15%_85%,rgba(99,102,241,0.12),transparent_40%)] pointer-events-none" />

                    <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 md:mb-12">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    Ready to Build Your CV?
                                </h3>
                                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                                    Choose your starting point — it takes just seconds to begin
                                </p>
                            </div>

                            <div className="self-start sm:self-center">
                                <div className="
          inline-flex items-center gap-2 text-sm font-medium
          px-5 py-2.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/60
          border border-indigo-200/70 dark:border-indigo-800/50
          text-indigo-700 dark:text-indigo-300 shadow-sm
        ">
                                    <Wand2 size={16} className="text-indigo-600 dark:text-indigo-400" />
                                    Smart layout & auto-formatting
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                            {/* Primary action – Start fresh */}
                            <div className="
        flex flex-col p-7 md:p-8
        bg-white/70 dark:bg-gray-800/70 rounded-2xl
        border border-gray-200/60 dark:border-gray-700/50
        shadow-lg hover:shadow-2xl hover:border-indigo-300/60 dark:hover:border-indigo-500/50
        transition-all duration-400 group
      ">
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Create New Resume
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                                        Perfect if you're starting fresh or want a brand-new design.
                                    </p>
                                </div>

                                <button
                                    onClick={handleCreateCV}
                                    className="
            mt-6 w-full sm:w-auto px-8 py-4
            bg-gradient-to-r from-indigo-600 to-indigo-700
            hover:from-indigo-700 hover:to-indigo-800
            text-white font-semibold text-lg rounded-xl
            shadow-lg hover:shadow-xl transition-all duration-300
            hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/50
          "
                                >
                                    Start Building →
                                </button>
                            </div>

                            {/* Secondary action – Continue last CV */}
                            {savedCV && (
                                <div className="
          flex flex-col p-7 md:p-8
          bg-white/60 dark:bg-gray-800/60 rounded-2xl
          border border-gray-200/60 dark:border-gray-700/50
          shadow-lg hover:shadow-2xl hover:border-emerald-300/60 dark:hover:border-emerald-500/50
          transition-all duration-400 group
        ">
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                            Continue Working
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                                            Resume your last project:<br />
                                            <span className="font-medium text-emerald-700 dark:text-emerald-400">
                {user.lastCV}
              </span>
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleOpenRecentCV}
                                        className="mt-6 w-full sm:w-auto px-8 py-4 border-2 border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-300 font-semibold text-lg rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        Open Recent CV
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;