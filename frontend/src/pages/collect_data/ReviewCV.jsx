// ReviewCV.jsx
import React from "react";

const ReviewCV = ({ form }) => {
    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Review Your CV Before Choosing a Theme
            </h2>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
                <div className="bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                        Review Your CV Details
                    </h3>

                    <div className="space-y-2">
                        <p><strong>Full Name:</strong> {form.fullName || "Not added"}</p>
                        <p><strong>Email:</strong> {form.email || "Not added"}</p>
                        <p><strong>Phone:</strong> {form.phone || "Not added"}</p>
                        <p><strong>Location:</strong> {form.location || "Not added"}</p>
                        <p><strong>Job Title:</strong> {form.jobTitle || "Not added"}</p>
                        <p><strong>Summary:</strong> {form.summary || "Not added"}</p>

                        {/* LINKS */}
                        <div>
                            <strong>Links:</strong>
                            {form.links?.length ? (
                                form.links.map((link, i) => (
                                    <p key={i}>
                                        {link.name || "Platform"}: {link.url || "Not added"}
                                    </p>
                                ))
                            ) : (
                                <p>Not added</p>
                            )}
                        </div>

                        {/* EDUCATION */}
                        <div>
                            <strong>Education:</strong>
                            {form.education?.length ? (
                                form.education.map((edu, i) => (
                                    <p key={i}>
                                        {edu.title || "Degree"} - {edu.date || ""}
                                    </p>
                                ))
                            ) : (
                                <p>Not added</p>
                            )}
                        </div>

                        {/* SKILLS */}
                        <div>
                            <strong>Skills:</strong>
                            {Object.keys(form.skills || {}).length ? (
                                Object.entries(form.skills).map(([cat, skills], i) => (
                                    <p key={i}>
                                        <strong>{cat}:</strong> {skills}
                                    </p>
                                ))
                            ) : (
                                <p>No skills added</p>
                            )}
                        </div>

                        {/* EXPERIENCE */}
                        <div>
                            <strong>Experience:</strong>
                            {form.experience?.length ? (
                                form.experience.map((exp, i) => (
                                    <p key={i}>
                                        {exp.role || exp.title || "Role"} - {exp.company || exp.date || ""}
                                    </p>
                                ))
                            ) : (
                                <p>Not added</p>
                            )}
                        </div>

                        {/* PROJECTS */}
                        <div>
                            <strong>Projects:</strong>
                            {form.projects?.length ? (
                                form.projects.map((proj, i) => (
                                    <p key={i}>
                                        {proj.title || "Project"} - {proj.description || ""}
                                    </p>
                                ))
                            ) : (
                                <p>Not added</p>
                            )}
                        </div>

                        {/* EXTRACURRICULAR */}
                        <div>
                            <strong>Extracurricular Activities:</strong>
                            {form.extracurricular?.length ? (
                                form.extracurricular.map((act, i) => (
                                    <p key={i}>
                                        {act.activity} - {act.date}
                                    </p>
                                ))
                            ) : (
                                <p>Not added</p>
                            )}
                        </div>

                        <p><strong>References:</strong> {form.references || "Not added"}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewCV;