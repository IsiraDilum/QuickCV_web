import React from "react";

const RedSidebarTemplate = ({ cvData, paginated = true }) => {

    const hasValue = (v) => v && String(v).trim() !== "";

    /* ------------------ NORMALIZED DATA ------------------ */

    const experiences = Array.isArray(cvData.experience)
        ? cvData.experience.filter(e => hasValue(e.role) || hasValue(e.company))
        : [];

    const educations = Array.isArray(cvData.education)
        ? cvData.education.filter(e => hasValue(e.title))
        : [];

    const projects = Array.isArray(cvData.projects)
        ? cvData.projects.filter(p => hasValue(p.title))
        : [];

    const activities = Array.isArray(cvData.extracurricular)
        ? cvData.extracurricular.filter(a => hasValue(a.activity))
        : [];

    const links = Array.isArray(cvData.links)
        ? cvData.links.filter(l => hasValue(l.name) || hasValue(l.url))
        : [];

    const skillCategories = Array.isArray(cvData.skillCategories)
        ? cvData.skillCategories
        : [];

    /* ------------------ HEIGHT CALC ------------------ */

    const estimateTextHeight = (text = "", charsPerLine = 60) => {
        const lines = Math.ceil(String(text).length / charsPerLine);
        return Math.max(lines, 2) * 22;
    };

    const blockHeight = (text = "") => 60 + estimateTextHeight(text);

    /* ------------------ SECTIONS ------------------ */

    const sections = [

        hasValue(cvData.summary) && {
            height: blockHeight(cvData.summary),
            node: (
                <section className="mb-6">
                    <h3 className="section-title">Profile</h3>
                    <p className="text-sm leading-7">{cvData.summary}</p>
                </section>
            )
        },

        ...experiences.map((exp, i) => ({
            height: blockHeight(exp.description),
            node: (
                <section key={i} className="mb-6">
                    <h3 className="section-title">Experience</h3>

                    <div className="flex justify-between">
                        <h4 className="font-semibold">
                            {exp.role} - {exp.company}
                        </h4>
                        <span className="text-red-600 text-sm">{exp.date}</span>
                    </div>

                    <p className="text-sm mt-2">{exp.description}</p>
                </section>
            )
        })),

        ...educations.map((edu, i) => ({
            height: blockHeight(edu.description),
            node: (
                <section key={i} className="mb-6">
                    <h3 className="section-title">Education</h3>

                    <div className="flex justify-between">
                        <h4 className="font-semibold">{edu.title}</h4>
                        <span className="text-red-600 text-sm">{edu.date}</span>
                    </div>

                    <p className="text-sm mt-2">{edu.description}</p>
                </section>
            )
        })),

        projects.length > 0 && {
            height: projects.length * 100,
            node: (
                <section className="mb-6">
                    <h3 className="section-title">Projects</h3>

                    {projects.map((p, i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between">
                                <h4 className="font-semibold">{p.title}</h4>
                                <span className="text-red-600 text-sm">{p.developDate}</span>
                            </div>

                            <p className="text-sm">{p.description}</p>

                            {hasValue(p.technologies) && (
                                <p className="text-xs mt-1">
                                    Tech: {p.technologies}
                                </p>
                            )}
                        </div>
                    ))}
                </section>
            )
        },

        activities.length > 0 && {
            height: activities.length * 60,
            node: (
                <section className="mb-6">
                    <h3 className="section-title">Activities</h3>

                    {activities.map((a, i) => (
                        <p key={i} className="text-sm">
                            {a.activity} ({a.date})
                        </p>
                    ))}
                </section>
            )
        },

        hasValue(cvData.references) && {
            height: blockHeight(cvData.references),
            node: (
                <section>
                    <h3 className="section-title">References</h3>
                    <p className="text-sm">{cvData.references}</p>
                </section>
            )
        }

    ].filter(Boolean);

    /* ------------------ PAGINATION ------------------ */

    const buildPages = () => {
        if (!paginated) return [sections.map(s => s.node)];

        const PAGE_LIMIT = 1100;
        const pages = [];
        let current = [];
        let height = 0;

        sections.forEach(sec => {
            if (height + sec.height > PAGE_LIMIT) {
                pages.push(current);
                current = [];
                height = 0;
            }
            current.push(sec.node);
            height += sec.height;
        });

        if (current.length) pages.push(current);

        return pages;
    };

    const pages = buildPages();

    /* ------------------ SIDEBAR ------------------ */

    const Sidebar = ({ first }) => (
        <aside className="bg-gray-100 p-5">
            {first && (
                <>
                    {hasValue(cvData.photo) && (
                        <img src={cvData.photo} className="w-24 h-24 rounded-full mx-auto mb-4" />
                    )}

                    <h2 className="text-center font-bold">{cvData.fullName}</h2>
                    <p className="text-center text-sm">{cvData.jobTitle}</p>

                    <div className="mt-4 text-sm">
                        <p>{cvData.email}</p>
                        <p>{cvData.phone}</p>
                        <p>{cvData.location}</p>
                    </div>

                    {/* SKILLS */}
                    {skillCategories.length > 0 && (
                        <div className="mt-4">
                            <h3 className="section-title">Skills</h3>

                            {skillCategories.map((cat, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-sm">{cat.category}</p>
                                    <p className="text-xs">{cat.skills.join(", ")}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* LINKS */}
                    {links.length > 0 && (
                        <div className="mt-4">
                            <h3 className="section-title">Links</h3>

                            {links.map((l, i) => (
                                <p key={i} className="text-xs">
                                    {l.name}: {l.url}
                                </p>
                            ))}
                        </div>
                    )}
                </>
            )}
        </aside>
    );

    /* ------------------ RENDER ------------------ */

    return (
        <div className="flex flex-col items-center gap-6">

            {pages.map((page, i) => (
                <div
                    key={i}
                    style={{ width: "210mm", height: "297mm" }}
                    className="grid grid-cols-[30px_220px_1fr] bg-white shadow-xl"
                >
                    <div className="bg-red-700"></div>

                    <Sidebar first={i === 0} />

                    <main className="p-6 overflow-hidden">
                        {page}
                    </main>
                </div>
            ))}

        </div>
    );
};

export default RedSidebarTemplate;