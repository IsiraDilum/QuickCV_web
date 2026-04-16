import React, { useState } from "react";

const ProfessionalDetails = ({
                                 form,
                                 setForm,
                                 handleChange,
                                 handleGenerateSummary,
                                 handleAutoCorrectField,
                                 handleCategoryChange,
                                 removeCategory,
                                 removeCategorySkill,
                                 addCategory,
                                 handleLinkChange,
                                 removeLink,
                                 addLink,
                                 inputClass,
                                 aiButtonClass,
                                 loadingAI,
                                 aiAction,
                             }) => {

    // local input state for skill typing (IMPORTANT FIX)
    const [skillInputs, setSkillInputs] = useState({});

    const handleAddSkill = (catIndex) => {
        const value = (skillInputs[catIndex] || "").trim();
        if (!value) return;

        setForm((prev) => {
            const updated = [...prev.skillCategories];

            if (!updated[catIndex].skills.includes(value)) {
                updated[catIndex].skills.push(value);
            }

            return {
                ...prev,
                skillCategories: updated,
            };
        });

        setSkillInputs((prev) => ({
            ...prev,
            [catIndex]: "",
        }));
    };

    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Professional Details
            </h2>

            <div className="space-y-7">

                {/* ================= SUMMARY ================= */}
                <div>
                    <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Professional Summary
                    </label>

                    <textarea
                        name="summary"
                        value={form.summary}
                        onChange={handleChange}
                        rows={5}
                        className={inputClass}
                        placeholder="Brief summary about yourself..."
                    />

                    <div className="flex flex-wrap gap-3 mt-3">
                        <button
                            type="button"
                            onClick={handleGenerateSummary}
                            disabled={loadingAI}
                            className={`${aiButtonClass} bg-indigo-600`}
                        >
                            {loadingAI && aiAction === "Generating summary..."
                                ? "Generating..."
                                : "Generate Summary"}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAutoCorrectField("summary", form.summary)}
                            disabled={loadingAI}
                            className={`${aiButtonClass} bg-green-600`}
                        >
                            Improve Grammar
                        </button>
                    </div>
                </div>

                {/* ================= SKILLS ================= */}
                <div>
                    <label className="block text-lg font-semibold mb-3">
                        Skills
                    </label>

                    {form.skillCategories.map((cat, catIndex) => (
                        <div
                            key={catIndex}
                            className="border rounded-xl p-4 mb-5 bg-gray-50 dark:bg-gray-800"
                        >

                            {/* CATEGORY */}
                            <div className="flex flex-col sm:flex-row gap-2 mb-3">
                                <input
                                    value={cat.category}
                                    placeholder="Category (e.g. Programming)"
                                    onChange={(e) =>
                                        handleCategoryChange(catIndex, e.target.value)
                                    }
                                    className={`${inputClass} flex-1`}
                                />

                                <button
                                    type="button"
                                    onClick={() => removeCategory(catIndex)}
                                    className="px-3 py-2 bg-red-500 text-white rounded-lg"
                                >
                                    Remove
                                </button>
                            </div>

                            {/* SKILLS DISPLAY */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {cat.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className="flex items-center gap-2 bg-indigo-100 dark:bg-indigo-800 px-3 py-1 rounded-full"
                                    >
                                        <span>{skill}</span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeCategorySkill(catIndex, skillIndex)
                                            }
                                            className="text-white bg-red-500 px-2 rounded-full"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* SKILL INPUT (MOBILE FIX) */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input
                                    value={skillInputs[catIndex] || ""}
                                    placeholder="Add skill"
                                    className={`${inputClass} flex-1`}
                                    onChange={(e) =>
                                        setSkillInputs((prev) => ({
                                            ...prev,
                                            [catIndex]: e.target.value,
                                        }))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault(); // 🚨 FIX mobile jump issue
                                            handleAddSkill(catIndex);
                                        }
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() => handleAddSkill(catIndex)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addCategory}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Add Category
                    </button>
                </div>

                {/* ================= LINKS ================= */}
                <div>
                    <label className="text-lg font-semibold">
                        Profile Links
                    </label>

                    {form.links.map((link, index) => (
                        <div
                            key={index}
                            className="grid sm:grid-cols-2 gap-2 mb-2"
                        >
                            <input
                                value={link.name}
                                placeholder="Platform"
                                onChange={(e) =>
                                    handleLinkChange(index, "name", e.target.value)
                                }
                                className={inputClass}
                            />

                            <input
                                value={link.url}
                                placeholder="URL"
                                onChange={(e) =>
                                    handleLinkChange(index, "url", e.target.value)
                                }
                                className={inputClass}
                            />

                            <button
                                type="button"
                                onClick={() => removeLink(index)}
                                className="px-3 py-2 bg-red-500 text-white rounded"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addLink}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Add Link
                    </button>
                </div>

            </div>
        </>
    );
};

export default ProfessionalDetails;