import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/page/Header";
import Footer from "../components/page/Footer";
import PersonalInformation from "./collect_data/PersonalInformation";
import ProfessionalDetails from "./collect_data/ProfessionalDetails";
import EducationExperienceProjects from "./collect_data/EducationExperienceProjects";
import ReviewCV from "./collect_data/ReviewCV";
import { calculateCVSections } from "../utils/cvLayoutCalculator";

const CreateCV = () => {
    const navigate = useNavigate();

// ✅ SINGLE form state
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        jobTitle: "",
        summary: "",
        photo: null,

        education: [
            {
                title: "",
                description: "",
                date: ""
            }
        ],

        experience: [
            {
                company: "",
                role: "",
                description: "",
                date: ""
            }
        ],

        extracurricular: [
            {
                activity: "",
                date: ""
            }
        ],

        references: "",

        skillCategories: [
            {
                category: "",
                skills: [],
                aiSkills: {}
            }
        ],

        links: [
            { name: "", url: "" }
        ],

        projects: [
            {
                title: "",
                description: "",
                technologies: "",
                link: "",
                developDate: "",
            }
        ],
    });

// ✅ layout state
    const [, setLayout] = useState(null);

// ✅ calculate layout when form changes
    useEffect(() => {
        const result = calculateCVSections(form);
        setLayout(result);

        console.log("Layout:", result);
    }, [form]);

    useEffect(() => {
        const saved = localStorage.getItem("cvDraft");
        if (saved) {
            setForm(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cvDraft", JSON.stringify(form));
    }, [form]);

    const [step, setStep] = useState(1);
    const [loadingAI, setLoadingAI] = useState(false);
    const [aiAction, setAiAction] = useState("");
    const [aiError, setAiError] = useState("");

    const API_BASE = process.env.REACT_APP_API_URL + "/api/ai";

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    // Update category name
    const handleCategoryChange = (index, value) => {
        const updated = [...form.skillCategories];
        updated[index].category = value;
        setForm({ ...form, skillCategories: updated });
    };

// Update skill inside a category
    const handleCategorySkillChange = (catIndex, skillIndex, value) => {
        const updated = [...form.skillCategories];
        updated[catIndex].skills[skillIndex] = value;
        setForm({ ...form, skillCategories: updated });
    };

// Add new skill to a category
    const addCategorySkill = (catIndex) => {
        const updated = [...form.skillCategories];
        updated[catIndex].skills.push("");
        setForm({ ...form, skillCategories: updated });
    };

// Remove skill from a category
    const removeCategorySkill = (catIndex, skillIndex) => {
        const updated = [...form.skillCategories];
        updated[catIndex].skills.splice(skillIndex, 1);
        setForm({ ...form, skillCategories: updated });
    };

// Add new category
    const addCategory = () => {
        setForm({
            ...form,
            skillCategories: [
                ...form.skillCategories,
                { category: "", skills: [], aiSkills: {} }
            ]
        });
    };

// Remove category
    const removeCategory = (index) => {
        const updated = form.skillCategories.filter((_, i) => i !== index);
        setForm({ ...form, skillCategories: updated });
    };



    const handleLinkChange = (index, field, value) => {
        const updated = [...form.links];
        updated[index][field] = value;

        setForm(prev => ({
            ...prev,
            links: updated
        }));
    };

    const addLink = () => {
        setForm({
            ...form,
            links: [...form.links, { name:"", url:"" }]
        });
    };

    const removeLink = (index) => {
        const updated = form.links.filter((_,i)=>i!==index);
        setForm(prev => ({
            ...prev,
            links: updated
        }));
    };

    const handleProjectChange = (index, e) => {
        const updatedProjects = [...form.projects];
        updatedProjects[index][e.target.name] = e.target.value;

        setForm({
            ...form,
            projects: updatedProjects,
        });
    };
    const handleEducationChange = (index,field,value)=>{
        const updated=[...form.education];
        updated[index][field]=value;

        setForm({...form,education:updated});
    }

    const addEducation=()=>{
        setForm({
            ...form,
            education:[...form.education,{title:"",description:"",date:""}]
        });
    }

    const removeEducation=(index)=>{
        const updated=form.education.filter((_,i)=>i!==index);
        setForm({...form,education:updated});
    }
    // =========================
// EXPERIENCE HANDLERS
// =========================
    const handleExperienceChange = (index, field, value) => {
        const updated = [...form.experience];
        updated[index][field] = value;
        setForm({ ...form, experience: updated });
    };

    const addExperience = () => {
        setForm({
            ...form,
            experience: [...form.experience, { company:"", role:"", description:"", date:"" }]
        });
    };

    const removeExperience = (index) => {
        const updated = form.experience.filter((_, i) => i !== index);
        setForm({ ...form, experience: updated });
    };

    const addProject = () => {
        setForm({
            ...form,
            projects: [
                ...form.projects,
                {
                    title: "",
                    description: "",
                    technologies: "",
                    link: "",
                    developDate: "",
                },
            ],
        });
    };

    // =========================
// EXTRACURRICULAR HANDLERS
// =========================

    const handleExtracurricularChange = (index, field, value) => {
        const updated = [...form.extracurricular];
        updated[index][field] = value;
        setForm({ ...form, extracurricular: updated });
    };

    const addExtracurricular = () => {
        setForm({
            ...form,
            extracurricular: [...form.extracurricular, { activity: "", date: "" }]
        });
    };

    const removeExtracurricular = (index) => {
        const updated = form.extracurricular.filter((_, i) => i !== index);
        setForm({ ...form, extracurricular: updated });
    };

    const removeProject = (index) => {
        const updatedProjects = form.projects.filter((_, i) => i !== index);
        setForm({
            ...form,
            projects: updatedProjects.length
                ? updatedProjects
                : [
                    {
                        title: "",
                        description: "",
                        technologies: "",
                        link: "",
                        developDate: "",
                    },
                ],
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setForm({
                ...form,
                photo: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("cvData", JSON.stringify(form));
        navigate("/select-theme");
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const hasValue = (value) => value && String(value).trim() !== "";

    const runAIRequest = async (actionName, endpoint, payload) => {
        try {
            setLoadingAI(true);
            setAiAction(actionName);
            setAiError("");

            const fullUrl = `${API_BASE}${endpoint}`;
            console.log("Calling:", fullUrl);

            const res = await fetch(fullUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const rawText = await res.text();
            console.log("Raw response:", rawText);

            let data;
            try {
                data = JSON.parse(rawText);
            } catch {
                throw new Error(`Backend did not return JSON: ${rawText.slice(0, 150)}`);
            }

            if (!res.ok) {
                throw new Error(data?.error || "AI request failed");
            }

            return data;
        } catch (error) {
            console.error(error);
            setAiError(error.message || "Something went wrong");
            return null;
        } finally {
            setLoadingAI(false);
            setAiAction("");
        }
    };

    const handleGenerateSummary = async () => {
        const data = await runAIRequest(
            "Generating summary...",
            "/generate-summary",
            form
        );

        if (data?.summary) {
            setForm((prev) => ({
                ...prev,
                summary: data.summary
            }));
        }
    };

    const handleAutoCorrectField = async (field, value, index=null) => {
        if (!hasValue(value)) {
            setAiError(`Please enter ${field} first.`);
            return;
        }

        const data = await runAIRequest(
            `Correcting ${field}...`,
            "/autocorrect",
            { field, text: value }
        );

        if (data?.correctedText) {
            if(index !== null && Array.isArray(form[field])) {
                // For array fields (education / experience)
                const updated = [...form[field]];
                updated[index].description = data.correctedText;
                setForm({ ...form, [field]: updated });
            } else {
                setForm((prev) => ({ ...prev, [field]: data.correctedText }));
            }
        }
    };

    const handleAutoCorrectProjectDescription = async (index) => {
        const project = form.projects[index];

        if (!hasValue(project.description)) {
            setAiError("Please enter project description first.");
            return;
        }

        const data = await runAIRequest(
            "Correcting project description...",
            "/autocorrect",
            {
                field: "project description",
                text: project.description,
            }
        );

        if (data?.correctedText) {
            const updatedProjects = [...form.projects];
            updatedProjects[index].description = data.correctedText;

            setForm((prev) => ({
                ...prev,
                projects: updatedProjects,
            }));
        }
    };

    const inputClass =
        "w-full px-4 py-3 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/60 dark:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:border-indigo-500";

    const aiButtonClass =
        "px-4 py-2 rounded-lg text-sm font-medium text-white transition disabled:opacity-60 disabled:cursor-not-allowed";

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <PersonalInformation
                        form={form}
                        handleChange={handleChange}
                        handlePhotoChange={handlePhotoChange}
                        inputClass={inputClass}
                    />
                );
            case 2:
                return (
                    <ProfessionalDetails
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        handleGenerateSummary={handleGenerateSummary}
                        handleAutoCorrectField={handleAutoCorrectField}
                        handleCategoryChange={handleCategoryChange}
                        removeCategory={removeCategory}
                        removeCategorySkill={removeCategorySkill}
                        addCategory={addCategory}
                        handleLinkChange={handleLinkChange}
                        removeLink={removeLink}
                        addLink={addLink}
                        inputClass={inputClass}
                        aiButtonClass={aiButtonClass}
                        loadingAI={loadingAI}
                        aiAction={aiAction}
                        handleCategorySkillChange={handleCategorySkillChange}
                        addCategorySkill={addCategorySkill}

                    />
                );

            case 3:
                return (
                    <EducationExperienceProjects
                        form={form}
                        inputClass={inputClass}
                        aiButtonClass={aiButtonClass}
                        loadingAI={loadingAI}
                        addEducation={addEducation}
                        handleEducationChange={handleEducationChange}
                        removeEducation={removeEducation}
                        addExperience={addExperience}
                        handleExperienceChange={handleExperienceChange}
                        removeExperience={removeExperience}
                        addProject={addProject}
                        handleProjectChange={handleProjectChange}
                        removeProject={removeProject}
                        handleAutoCorrectProjectDescription={handleAutoCorrectProjectDescription}
                        addExtracurricular={addExtracurricular}
                        handleExtracurricularChange={handleExtracurricularChange}
                        removeExtracurricular={removeExtracurricular}
                        handleAutoCorrectField={handleAutoCorrectField}
                        setForm={setForm}
                    />
                );

            case 4:
                return <ReviewCV form={form} />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">

            <Header />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-14">

                {/* STEP INDICATOR */}
                <div className="mb-12">

                    <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                        <span>Personal</span>
                        <span>Professional</span>
                        <span>Education & Projects</span>
                        <span>Theme</span>
                    </div>

                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>

                </div>


                {/* FORM CONTAINER */}
                <div className="bg-white/80 dark:bg-gray-900/70 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-6 sm:p-10">

                    {/* AI ERROR */}
                    {aiError && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-red-100 text-red-700 border border-red-200">
                            {aiError}
                        </div>
                    )}

                    {/* AI STATUS */}
                    {loadingAI && (
                        <div className="mb-6 px-4 py-3 rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
                            {aiAction || "Processing AI request..."}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* STEP CONTENT */}
                        {renderStepContent()}

                        {/* NAVIGATION BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">

                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex-1 py-3.5 bg-gray-200 dark:bg-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-200 transition"
                                >
                                    Back
                                </button>
                            )}

                            {step < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-md transition"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-blue-700 shadow-lg transition"
                                >
                                    Save & Select CV Theme
                                </button>
                            )}

                        </div>

                    </form>

                </div>

            </main>

            <Footer />

        </div>
    );
};

export default CreateCV;