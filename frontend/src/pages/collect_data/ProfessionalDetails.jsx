import React from "react";

const ProfessionalDetails = ({
                                 form,
                                 setForm, // ✅ IMPORTANT (added)
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
    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Professional Details
            </h2>

            <div className="space-y-7">
                {/* Professional Summary */}
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
                            className={`${aiButtonClass} bg-indigo-600 hover:bg-indigo-700`}
                        >
                            {loadingAI && aiAction === "Generating summary..."
                                ? "Generating..."
                                : "Generate Summary with AI"}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleAutoCorrectField("summary", form.summary)}
                            disabled={loadingAI}
                            className={`${aiButtonClass} bg-green-600 hover:bg-green-700`}
                        >
                            {loadingAI && aiAction === "Correcting summary..."
                                ? "Correcting..."
                                : "Improve Grammar"}
                        </button>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-6">
                    <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Skills
                    </label>

                    {form.skillCategories.length === 0 && (
                        <p className="text-gray-500 dark:text-gray-400 mb-3">
                            No skills added yet.
                        </p>
                    )}

                    {form.skillCategories.map((cat, catIndex) => (
                        <div
                            key={catIndex}
                            className="border p-4 mb-5 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                            {/* CATEGORY */}
                            <div className="flex gap-2 items-center mb-3">
                                <input
                                    type="text"
                                    value={cat.category}
                                    placeholder="Category Name (e.g., Programming)"
                                    onChange={(e) =>
                                        handleCategoryChange(catIndex, e.target.value)
                                    }
                                    className={`${inputClass} flex-1`}
                                />

                                {form.skillCategories.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(catIndex)}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Remove Category
                                    </button>
                                )}
                            </div>

                            {/* SKILL TAGS */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {cat.skills.map((skill, skillIndex) => (
                                    <div
                                        key={skillIndex}
                                        className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-200 px-2 py-1 rounded"
                                    >
                                        <span>{skill.trim()}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeCategorySkill(catIndex, skillIndex)
                                            }
                                            className="text-white bg-red-500 rounded px-1 hover:bg-red-600"
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {/* ADD SKILL INPUT */}
                            <div className="flex gap-2 items-center mt-2">
                                <input
                                    type="text"
                                    placeholder={`Add new skill to ${cat.category || "this category"}`}
                                    className={`${inputClass} flex-1`}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.repeat) {
                                            e.preventDefault();

                                            const value = e.target.value.trim();

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

                                            e.target.value = "";
                                        }
                                    }}
                                />

                                <span className="text-gray-400 text-sm">
                                    Press Enter to add
                                </span>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addCategory}
                        className="px-4 py-2 bg-green-600 text-white rounded mt-3"
                    >
                        Add New Category
                    </button>
                </div>

                {/* Profile Links */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Profile Links
                    </h3>

                    {form.links.map((link, index) => (
                        <div
                            key={index}
                            className="grid sm:grid-cols-2 gap-2 mb-2 items-center"
                        >
                            <input
                                placeholder="Platform (LinkedIn, Portfolio, GitHub)"
                                value={link.name}
                                onChange={(e) =>
                                    handleLinkChange(index, "name", e.target.value)
                                }
                                className={inputClass}
                            />

                            <input
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) =>
                                    handleLinkChange(index, "url", e.target.value)
                                }
                                className={inputClass}
                            />

                            <button
                                type="button"
                                onClick={() => removeLink(index)}
                                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm font-semibold transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addLink}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg mt-2"
                    >
                        Add Profile Link
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProfessionalDetails;