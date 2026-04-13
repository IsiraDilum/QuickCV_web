import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    GraduationCap,
    Code,
    Link as LinkIcon,
    Trophy,
    Users
} from "lucide-react";

const ModernBlueTemplate = ({ cvData }) => {

    const hasValue = (v) => v && String(v).trim() !== "";

    /* ------------------ SKILLS ------------------ */
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

    const skillTags = [...manualSkills, ...aiSkills];

    /* ------------------ LINKS ------------------ */
    const validLinks = Array.isArray(cvData?.links)
        ? cvData.links.filter(l => hasValue(l.name) || hasValue(l.url))
        : [];

    /* ------------------ DATA FILTERS ------------------ */
    const validEducation = cvData?.education?.filter(e => hasValue(e.title)) || [];
    const validExperience = cvData?.experience?.filter(e => hasValue(e.role)) || [];
    const validProjects = cvData?.projects?.filter(p => hasValue(p.title)) || [];
    const validActivities = cvData?.extracurricular?.filter(a => hasValue(a.activity)) || [];

    /* ------------------ SIDEBAR ------------------ */
    const Sidebar = () => (
        <aside className="bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 flex flex-col ">

            <div>
                {/* PROFILE */}
                <div className="text-center mb-8">
                    {hasValue(cvData?.photo) && (
                        <img
                            src={cvData.photo}
                            alt="Profile"
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    )}

                    <h1 className="text-xl font-bold mt-3 tracking-wide">
                        {cvData.fullName}
                    </h1>

                    <p className="text-blue-200 text-sm mt-1">
                        {cvData.jobTitle}
                    </p>
                </div>

                {/* CONTACT */}
                <div className="space-y-2 text-sm border-t border-blue-700 pt-4">
                    {hasValue(cvData?.email) && (
                        <div className="flex items-center gap-2">
                            <Mail size={14}/> {cvData.email}
                        </div>
                    )}
                    {hasValue(cvData?.phone) && (
                        <div className="flex items-center gap-2">
                            <Phone size={14}/> {cvData.phone}
                        </div>
                    )}
                    {hasValue(cvData?.location) && (
                        <div className="flex items-center gap-2">
                            <MapPin size={14}/> {cvData.location}
                        </div>
                    )}
                </div>

                {/* LINKS */}
                {validLinks.length > 0 && (
                    <div className="mt-6 border-t border-blue-700 pt-4">
                        <h3 className="font-semibold mb-3">Profiles</h3>

                        {validLinks.map((link, i) => (
                            <div key={i} className="mb-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <LinkIcon size={14}/>
                                    <span className="font-medium">{link.name}</span>
                                </div>
                                <p className="text-blue-200 text-xs break-all ml-5">
                                    {link.url}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* SKILLS */}
                {skillTags.length > 0 && (
                    <div className="mt-6 border-t border-blue-700 pt-4">
                        <h3 className="font-semibold mb-3">Skills</h3>

                        <div className="flex flex-wrap gap-2">
                            {skillTags.map((skill, i) => (
                                <span
                                    key={i}
                                    className="bg-white/10 border border-white/20 text-xs px-3 py-1 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <p className="text-[10px] text-blue-300 text-center mt-6">
                Generated CV
            </p>
        </aside>
    );

    /* ------------------ MAIN ------------------ */
    const SectionTitle = ({ icon, title }) => (
        <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2 mb-3 border-b pb-1">
            {icon} {title}
        </h2>
    );

    return (
        <div className="flex justify-center bg-gray-100 py-6">

            <div
                className="grid grid-cols-[70mm_1fr] bg-white shadow-2xl"
                style={{
                    width: "210mm"
                }}
            >

                <Sidebar/>

                <main className="p-8 space-y-6">

                    {/* SUMMARY */}
                    {hasValue(cvData?.summary) && (
                        <section>
                            <SectionTitle icon={<Code size={18}/>} title="Profile"/>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {cvData.summary}
                            </p>
                        </section>
                    )}

                    {/* EXPERIENCE */}
                    {validExperience.length > 0 && (
                        <section>
                            <SectionTitle icon={<Briefcase size={18}/>} title="Experience"/>

                            {validExperience.map((exp, i) => (
                                <div key={i} className="mb-4">

                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {exp.role}
                                        </h3>

                                        <span className="text-xs text-blue-700 flex items-center gap-1">
                                            <Calendar size={12}/> {exp.date}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm">
                                        {exp.company}
                                    </p>

                                    <p className="text-gray-700 text-sm mt-1">
                                        {exp.description}
                                    </p>

                                </div>
                            ))}
                        </section>
                    )}

                    {/* EDUCATION */}
                    {validEducation.length > 0 && (
                        <section>
                            <SectionTitle icon={<GraduationCap size={18}/>} title="Education"/>

                            {validEducation.map((edu, i) => (
                                <div key={i} className="mb-4">

                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {edu.title}
                                        </h3>

                                        <span className="text-xs text-blue-700 flex items-center gap-1">
                                            <Calendar size={12}/> {edu.date}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm">
                                        {edu.description}
                                    </p>

                                </div>
                            ))}
                        </section>
                    )}

                    {/* PROJECTS */}
                    {validProjects.length > 0 && (
                        <section>
                            <SectionTitle icon={<Code size={18}/>} title="Projects"/>

                            {validProjects.map((p, i) => (
                                <div key={i} className="border rounded-lg p-4 mb-3 shadow-sm">

                                    <div className="flex justify-between">
                                        <h3 className="font-semibold">
                                            {p.title}
                                        </h3>

                                        <span className="text-xs text-blue-700">
                                            {p.developDate}
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm mt-1">
                                        {p.description}
                                    </p>

                                    {hasValue(p.technologies) && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            <strong>Tech:</strong> {p.technologies}
                                        </p>
                                    )}

                                    {hasValue(p.link) && (
                                        <p className="text-blue-600 text-xs break-all mt-1">
                                            {p.link}
                                        </p>
                                    )}

                                </div>
                            ))}
                        </section>
                    )}

                    {/* ACTIVITIES */}
                    {validActivities.length > 0 && (
                        <section>
                            <SectionTitle icon={<Trophy size={18}/>} title="Activities"/>

                            {validActivities.map((act, i) => (
                                <p key={i} className="text-sm">
                                    • {act.activity} ({act.date})
                                </p>
                            ))}
                        </section>
                    )}

                    {/* REFERENCES */}
                    {hasValue(cvData?.references) && (
                        <section>
                            <SectionTitle icon={<Users size={18}/>} title="References"/>

                            <p className="text-sm">
                                {cvData.references}
                            </p>
                        </section>
                    )}

                </main>
            </div>
        </div>
    );
};

export default ModernBlueTemplate;