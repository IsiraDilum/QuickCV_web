import React from "react";

const ExecutiveElegantTemplate = ({ cvData }) => {

    const hasValue = (v) => v && String(v).trim() !== "";

    const theme = {
        accent: "bg-gradient-to-r from-blue-700 to-blue-600",
        title: "text-blue-800",
        date: "text-blue-700",
        link: "text-blue-700 hover:text-blue-900"
    };

    /* ------------------ SKILLS FIX ------------------ */

    const manualSkills = Array.isArray(cvData?.skills)
        ? cvData.skills.filter(hasValue)
        : [];

    const aiSkills = cvData?.aiSkills
        ? Object.values(cvData.aiSkills)
            .flatMap(s =>
                String(s)
                    .split(",")
                    .map(x => x.trim())
                    .filter(Boolean)
            )
        : [];

    const skillList = [...manualSkills, ...aiSkills];

    /* ------------------ FILTER DATA ------------------ */

    const validEducation = Array.isArray(cvData?.education)
        ? cvData.education.filter(e => hasValue(e.title))
        : [];

    const validExperience = Array.isArray(cvData?.experience)
        ? cvData.experience.filter(e => hasValue(e.role) || hasValue(e.company))
        : [];

    const validProjects = Array.isArray(cvData?.projects)
        ? cvData.projects.filter(p => hasValue(p.title))
        : [];

    const validLinks = Array.isArray(cvData?.links)
        ? cvData.links.filter(l => hasValue(l.name) || hasValue(l.url))
        : [];

    /* ------------------ SECTION COMPONENT ------------------ */

    const SectionWrapper = ({ title, children }) => (
        <section
            className="mb-8"
            style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
        >
            <h2 className={`text-xl font-semibold mb-3 ${theme.title} border-b border-gray-200 pb-1`}>
                {title}
            </h2>

            <div className="text-gray-800 leading-7">
                {children}
            </div>
        </section>
    );

    /* ------------------ HEADER ------------------ */

    const HeaderSection = (

        <header className={`${theme.accent} text-white px-10 py-10`}>

            <div className="flex items-center gap-8">

                {hasValue(cvData?.photo) && (
                    <img
                        src={cvData.photo}
                        alt="profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white"
                    />
                )}

                <div>

                    {hasValue(cvData?.fullName) && (
                        <h1 className="text-4xl font-bold">
                            {cvData.fullName}
                        </h1>
                    )}

                    {hasValue(cvData?.jobTitle) && (
                        <p className="text-xl mt-2">
                            {cvData.jobTitle}
                        </p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-6 text-sm">

                        {hasValue(cvData?.email) && <div>{cvData.email}</div>}
                        {hasValue(cvData?.phone) && <div>{cvData.phone}</div>}
                        {hasValue(cvData?.location) && <div>{cvData.location}</div>}

                    </div>

                </div>

            </div>

        </header>
    );

    /* ------------------ MAIN ------------------ */

    return (

        <div >

            <div
                className="bg-white border border-gray-200"
                style={{
                    width: "210mm",
                    height: "297mm",
                    pageBreakAfter: "always"
                }}
            >

                {HeaderSection}

                <div className="px-10 py-8 overflow-hidden">

                    {/* SUMMARY */}
                    {hasValue(cvData?.summary) && (
                        <SectionWrapper title="Professional Summary">
                            {cvData.summary}
                        </SectionWrapper>
                    )}

                    {/* SKILLS */}
                    {skillList.length > 0 && (
                        <SectionWrapper title="Skills">

                            <div className="flex flex-wrap">

                                {skillList.map((skill, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full mr-2 mb-2"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </SectionWrapper>
                    )}

                    {/* EXPERIENCE */}
                    {validExperience.length > 0 && (

                        <SectionWrapper title="Professional Experience">

                            {validExperience.map((exp, i) => (

                                <div key={i} className="mb-4">

                                    {hasValue(exp.role) && (
                                        <h3 className="font-semibold">
                                            {exp.role}
                                        </h3>
                                    )}

                                    {hasValue(exp.company) && (
                                        <p className="text-gray-700">
                                            {exp.company}
                                        </p>
                                    )}

                                    {hasValue(exp.date) && (
                                        <p className={`text-sm ${theme.date}`}>
                                            {exp.date}
                                        </p>
                                    )}

                                    {hasValue(exp.description) && (
                                        <p className="text-gray-700 mt-1">
                                            {exp.description}
                                        </p>
                                    )}

                                </div>

                            ))}

                        </SectionWrapper>

                    )}

                    {/* EDUCATION */}
                    {validEducation.length > 0 && (

                        <SectionWrapper title="Education">

                            {validEducation.map((edu, i) => (

                                <div key={i} className="mb-4">

                                    {hasValue(edu.title) && (
                                        <h3 className="font-semibold">
                                            {edu.title}
                                        </h3>
                                    )}

                                    {hasValue(edu.date) && (
                                        <p className={`text-sm ${theme.date}`}>
                                            {edu.date}
                                        </p>
                                    )}

                                    {hasValue(edu.description) && (
                                        <p className="text-gray-700 mt-1">
                                            {edu.description}
                                        </p>
                                    )}

                                </div>

                            ))}

                        </SectionWrapper>

                    )}

                    {/* PROJECTS */}
                    {validProjects.length > 0 && (

                        <SectionWrapper title="Projects">

                            {validProjects.map((p, i) => (

                                <div
                                    key={i}
                                    className="border border-gray-200 rounded-lg p-4 mb-4"
                                >

                                    {hasValue(p.title) && (
                                        <h3 className="font-semibold mb-1">
                                            {p.title}
                                        </h3>
                                    )}

                                    {hasValue(p.developDate) && (
                                        <p className={`text-sm ${theme.date}`}>
                                            {p.developDate}
                                        </p>
                                    )}

                                    {hasValue(p.description) && (
                                        <p className="text-gray-700 mb-1">
                                            {p.description}
                                        </p>
                                    )}

                                    {hasValue(p.technologies) && (
                                        <p className="text-sm text-gray-600">
                                            Technologies: {p.technologies}
                                        </p>
                                    )}

                                    {hasValue(p.link) && (
                                        <a
                                            href={p.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={`${theme.link} underline`}
                                        >
                                            {p.link}
                                        </a>
                                    )}

                                </div>

                            ))}

                        </SectionWrapper>

                    )}

                    {/* LINKS */}
                    {validLinks.length > 0 && (

                        <SectionWrapper title="Online Profiles">

                            {validLinks.map((l, i) => (

                                <p key={i}>

                                    <strong>{l.name}:</strong>{" "}

                                    <a
                                        href={l.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={theme.link}
                                    >
                                        {l.url}
                                    </a>

                                </p>

                            ))}

                        </SectionWrapper>

                    )}

                    {/* REFERENCES */}
                    {hasValue(cvData?.references) && (

                        <SectionWrapper title="References">
                            {cvData.references}
                        </SectionWrapper>

                    )}

                </div>

            </div>

        </div>

    );

};

export default ExecutiveElegantTemplate;