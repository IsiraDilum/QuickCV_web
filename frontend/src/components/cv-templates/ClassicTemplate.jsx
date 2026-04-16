import React, { useRef, useEffect, useState } from "react";

const ClassicTemplate = ({ cvData }) => {

    const hasValue = (v) => v && String(v).trim() !== "";
    const sectionRefs = useRef([]);
    const [pages, setPages] = useState([]);

    const PAGE_HEIGHT = 1122; // A4 height in px

    sectionRefs.current = [];

    const setRef = (el) => {
        if (el) sectionRefs.current.push(el);
    };

    /* ================= DATA FILTERING ================= */

    const manualSkills = Array.isArray(cvData?.skills)
        ? cvData.skills.filter(hasValue)
        : [];

    const aiSkills = cvData?.aiSkills
        ? Object.entries(cvData.aiSkills).filter(([_, v]) => hasValue(v))
        : [];

    const hasSkills = manualSkills.length > 0 || aiSkills.length > 0;

    const validLinks = Array.isArray(cvData?.links)
        ? cvData.links.filter(l => hasValue(l.name) || hasValue(l.url))
        : [];

    const validEducation = Array.isArray(cvData?.education)
        ? cvData.education.filter(e => hasValue(e.title))
        : [];

    const validExperience = Array.isArray(cvData?.experience)
        ? cvData.experience.filter(e => hasValue(e.role) || hasValue(e.company))
        : [];

    const validProjects = Array.isArray(cvData?.projects)
        ? cvData.projects.filter(p => hasValue(p.title))
        : [];

    const validActivities = Array.isArray(cvData?.extracurricular)
        ? cvData.extracurricular.filter(a => hasValue(a.activity))
        : [];

    /* ================= SECTIONS ================= */

    const sections = [

        <section className="border-b pb-6 mb-6">
            <div className="flex gap-6 items-start">
                {hasValue(cvData?.photo) && (
                    <img
                        src={cvData.photo}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border"
                    />
                )}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold">{cvData.fullName}</h2>

                    {hasValue(cvData?.jobTitle) && (
                        <p className="text-gray-600 mt-1">{cvData.jobTitle}</p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm mt-3">
                        {hasValue(cvData?.email) && <p>Email: {cvData.email}</p>}
                        {hasValue(cvData?.phone) && <p>Phone: {cvData.phone}</p>}
                        {hasValue(cvData?.location) && <p>{cvData.location}</p>}
                    </div>
                </div>
            </div>
        </section>,

        hasValue(cvData?.summary) && (
            <section className="mb-6">
                <h3 className="section-title">Professional Summary</h3>
                <p className="text-[15px] leading-7">{cvData.summary}</p>
            </section>
        ),

        hasSkills && (
            <section className="mb-6">
                <h3 className="section-title">Skills</h3>

                {aiSkills.map(([cat, val], i) => (
                    <p key={i}><strong>{cat}:</strong> {val}</p>
                ))}

                {manualSkills.length > 0 && (
                    <p className="mt-2">
                        <strong>Other Skills:</strong> {manualSkills.join(", ")}
                    </p>
                )}
            </section>
        ),

        validEducation.length > 0 && (
            <section className="mb-6">
                <h3 className="section-title">Education</h3>

                {validEducation.map((edu, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between">
                            <h4>{edu.title}</h4>
                            <span>{edu.date}</span>
                        </div>
                        {hasValue(edu.description) && <p>{edu.description}</p>}
                    </div>
                ))}
            </section>
        ),

        validExperience.length > 0 && (
            <section className="mb-6">
                <h3 className="section-title">Experience</h3>

                {validExperience.map((exp, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between">
                            <h4>{exp.role}</h4>
                            <span>{exp.date}</span>
                        </div>
                        <p>{exp.company}</p>
                        {hasValue(exp.description) && <p>{exp.description}</p>}
                    </div>
                ))}
            </section>
        ),

        validProjects.length > 0 && (
            <section className="mb-6">
                <h3 className="section-title">Projects</h3>

                {validProjects.map((p, i) => (
                    <div key={i} className="mb-4">
                        <div className="flex justify-between">
                            <h4>{p.title}</h4>
                            <span>{p.developDate}</span>
                        </div>
                        {hasValue(p.description) && <p>{p.description}</p>}
                        {hasValue(p.technologies) && <p><strong>Tech:</strong> {p.technologies}</p>}
                        {hasValue(p.link) && <p className="text-blue-600">{p.link}</p>}
                    </div>
                ))}
            </section>
        ),

        validActivities.length > 0 && (
            <section className="mb-6">
                <h3 className="section-title">Activities</h3>
                {validActivities.map((a, i) => (
                    <p key={i}>{a.activity} ({a.date})</p>
                ))}
            </section>
        ),

        validLinks.length > 0 && (
            <section className="mb-6">
                <h3 className="section-title">Profile Links</h3>
                {validLinks.map((l, i) => (
                    <p key={i}><strong>{l.name}:</strong> {l.url}</p>
                ))}
            </section>
        ),

        hasValue(cvData?.references) && (
            <section className="mb-6">
                <h3 className="section-title">References</h3>
                <p>{cvData.references}</p>
            </section>
        )

    ].filter(Boolean);

    /* ================= PAGINATION ENGINE ================= */

    useEffect(() => {

        if (sectionRefs.current.length === 0) return;

        let currentPage = [];
        let currentHeight = 0;
        const newPages = [];

        sectionRefs.current.forEach((section, index) => {

            const height = section.offsetHeight;

            if (currentHeight + height > PAGE_HEIGHT) {
                newPages.push(currentPage);
                currentPage = [sections[index]];
                currentHeight = height;
            } else {
                currentPage.push(sections[index]);
                currentHeight += height;
            }

        });

        if (currentPage.length > 0) newPages.push(currentPage);

        setPages(newPages);

    }, [cvData, sections]);

    /* ================= RENDER ================= */

    return (
        <div className="flex flex-col items-center gap-6">

            {/* Hidden measurement layer */}
            <div
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    width: "210mm"
                }}
            >
                {sections.map((sec, i) => (
                    <div key={i} ref={setRef}>
                        {sec}
                    </div>
                ))}
            </div>

            {/* Final Pages */}
            {pages.map((page, i) => (
                <div
                    key={i}
                    className="bg-white"
                    style={{
                        width: "210mm",
                        minHeight: "297mm",
                        padding: "24px"
                    }}
                >
                    {page}
                </div>
            ))}

        </div>
    );
};

export default ClassicTemplate;