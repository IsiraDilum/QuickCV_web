// EducationExperienceProjects.jsx
import React from "react";

const EducationExperienceProjects = ({
                                         form,
                                         inputClass,
                                         aiButtonClass,
                                         loadingAI,
                                         addEducation,
                                         handleEducationChange,
                                         removeEducation,
                                         addExperience,
                                         handleExperienceChange,
                                         removeExperience,
                                         addProject,
                                         handleProjectChange,
                                         removeProject,
                                         handleAutoCorrectProjectDescription,
                                         addExtracurricular,
                                         handleExtracurricularChange,
                                         removeExtracurricular,
                                         handleAutoCorrectField,
                                         setForm,
                                     }) => {
    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Education, Experience & Projects
            </h2>

            <div className="space-y-10">
                {/* EDUCATION */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Education
                        </label>
                        <button
                            type="button"
                            onClick={addEducation}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Add Education
                        </button>
                    </div>

                    {form.education.map((edu, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 bg-white/50 dark:bg-gray-800/40"
                        >
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="University / School"
                                    value={edu.title}
                                    onChange={(e) => handleEducationChange(index, "title", e.target.value)}
                                    className={inputClass}
                                />
                                <input
                                    placeholder="Date (eg: 2022 - 2025)"
                                    value={edu.date}
                                    onChange={(e) => handleEducationChange(index, "date", e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <textarea
                                placeholder="Education Description"
                                value={edu.description}
                                onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                                className={`${inputClass} mt-3`}
                            />

                            <div className="flex gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => handleAutoCorrectField("education", edu.description, index)}
                                    disabled={loadingAI}
                                    className={`${aiButtonClass} bg-green-600 hover:bg-green-700`}
                                >
                                    Improve Grammar
                                </button>

                                {form.education.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* EXPERIENCE */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Work Experience
                        </label>
                        <button
                            type="button"
                            onClick={addExperience}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Add Experience
                        </button>
                    </div>

                    {form.experience.map((exp, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 bg-white/50 dark:bg-gray-800/40"
                        >
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="Job Title / Company"
                                    value={exp.title}
                                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                                    className={inputClass}
                                />
                                <input
                                    placeholder="Date (eg: Jan 2024 - Mar 2024)"
                                    value={exp.date}
                                    onChange={(e) => handleExperienceChange(index, "date", e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <textarea
                                placeholder="Work Description"
                                value={exp.description}
                                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                                className={`${inputClass} mt-3`}
                            />

                            <div className="flex gap-3 mt-3">
                                <button
                                    type="button"
                                    onClick={() => handleAutoCorrectField("experience", exp.description, index)}
                                    disabled={loadingAI}
                                    className={`${aiButtonClass} bg-green-600 hover:bg-green-700`}
                                >
                                    Improve Grammar
                                </button>

                                {form.experience.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeExperience(index)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* PROJECTS */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Projects
                        </h3>
                        <button
                            type="button"
                            onClick={addProject}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Add Project
                        </button>
                    </div>

                    <div className="space-y-6">
                        {form.projects.map((project, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white/50 dark:bg-gray-800/40"
                            >
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        name="title"
                                        value={project.title}
                                        onChange={(e) => handleProjectChange(index, e)}
                                        className={inputClass}
                                        placeholder="Project Title"
                                    />
                                    <input
                                        name="technologies"
                                        value={project.technologies}
                                        onChange={(e) => handleProjectChange(index, e)}
                                        className={inputClass}
                                        placeholder="Technologies"
                                    />
                                    <textarea
                                        name="description"
                                        value={project.description}
                                        onChange={(e) => handleProjectChange(index, e)}
                                        className={inputClass}
                                        placeholder="Project Description"
                                    />
                                    <input
                                        name="developDate"
                                        value={project.developDate}
                                        onChange={(e) => handleProjectChange(index, e)}
                                        className={inputClass}
                                        placeholder="Development Date"
                                    />
                                </div>

                                <input
                                    name="link"
                                    value={project.link}
                                    onChange={(e) => handleProjectChange(index, e)}
                                    className={`${inputClass} mt-3`}
                                    placeholder="Project Link"
                                />

                                <div className="flex gap-3 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => handleAutoCorrectProjectDescription(index)}
                                        disabled={loadingAI}
                                        className={`${aiButtonClass} bg-green-600 hover:bg-green-700`}
                                    >
                                        Auto Correct Description
                                    </button>

                                    {form.projects.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeProject(index)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EXTRACURRICULAR ACTIVITIES */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            Extracurricular Activities
                        </h3>
                        <button
                            type="button"
                            onClick={addExtracurricular}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Add Activity
                        </button>
                    </div>

                    {form.extracurricular.map((act, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 bg-white/50 dark:bg-gray-800/40"
                        >
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input
                                    placeholder="Activity (eg: Coding Club Member)"
                                    value={act.activity}
                                    onChange={(e) => handleExtracurricularChange(index, "activity", e.target.value)}
                                    className={inputClass}
                                />
                                <input
                                    placeholder="Date (eg: 2023 - Present)"
                                    value={act.date}
                                    onChange={(e) => handleExtracurricularChange(index, "date", e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            {form.extracurricular.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeExtracurricular(index)}
                                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* REFERENCES */}
                <div>
                    <label className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 block">
                        References
                    </label>
                    <textarea
                        placeholder="Reference (eg: Dr. John Silva - Senior Lecturer, University of Colombo)"
                        value={form.references}
                        onChange={(e) => setForm({ ...form, references: e.target.value })}
                        className={inputClass}
                        rows={3}
                    />
                </div>
            </div>
        </>
    );
};

export default EducationExperienceProjects;