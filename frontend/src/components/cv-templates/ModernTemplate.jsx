import React from "react";

const ModernTemplate = ({ cvData, paginated = false }) => {

    const hasValue = (v) => v && String(v).trim() !== "";


    /* ---------------- SKILLS ---------------- */

    const manualSkills = Array.isArray(cvData?.skills)
        ? cvData.skills.filter(hasValue)
        : [];

    const aiSkills = cvData?.aiSkills
        ? Object.entries(cvData.aiSkills).filter(([_,v])=>hasValue(v))
        : [];

    const hasSkills = manualSkills.length>0 || aiSkills.length>0;


    /* ---------------- LINKS ---------------- */

    const validLinks = Array.isArray(cvData?.links)
        ? cvData.links.filter(l=>hasValue(l.name)||hasValue(l.url))
        : [];


    /* ---------------- EDUCATION ---------------- */

    const validEducation = Array.isArray(cvData?.education)
        ? cvData.education.filter(e=>hasValue(e.title))
        : [];


    /* ---------------- EXPERIENCE ---------------- */

    const validExperience = Array.isArray(cvData?.experience)
        ? cvData.experience.filter(e=>hasValue(e.role)||hasValue(e.company))
        : [];


    /* ---------------- PROJECTS ---------------- */

    const validProjects = Array.isArray(cvData?.projects)
        ? cvData.projects.filter(p=>hasValue(p.title))
        : [];


    /* ---------------- ACTIVITIES ---------------- */

    const validActivities = Array.isArray(cvData?.extracurricular)
        ? cvData.extracurricular.filter(a=>hasValue(a.activity))
        : [];


    /* ---------------- COLOR THEMES ---------------- */

    const colorThemes = {
        indigo:{sidebarBg:"bg-indigo-600",muted:"text-indigo-100",title:"text-indigo-700"},
        blue:{sidebarBg:"bg-blue-600",muted:"text-blue-100",title:"text-blue-700"},
        emerald:{sidebarBg:"bg-emerald-600",muted:"text-emerald-100",title:"text-emerald-700"},
        purple:{sidebarBg:"bg-purple-600",muted:"text-purple-100",title:"text-purple-700"},
        dark:{sidebarBg:"bg-gray-900",muted:"text-gray-200",title:"text-gray-900"}
    };

    const theme = colorThemes[cvData?.themeColor] || colorThemes.indigo;


    /* ---------------- SIDEBAR ---------------- */

    const Sidebar = ({full}) => (

        <aside className={`${theme.sidebarBg} text-white p-8`}>

            {full && (

                <>

                    <div className="text-center border-b border-white/30 pb-6 mb-6">

                        {hasValue(cvData?.photo) && (
                            <img
                                src={cvData.photo}
                                alt="profile"
                                className="w-28 h-28 rounded-full object-cover border-4 border-white mx-auto mb-4"
                            />
                        )}

                        <h2 className="text-2xl font-bold">{cvData.fullName}</h2>

                        {hasValue(cvData.jobTitle) && (
                            <p className={`text-sm mt-1 ${theme.muted}`}>
                                {cvData.jobTitle}
                            </p>
                        )}

                    </div>


                    {/* CONTACT */}

                    <div className="mb-6 text-sm space-y-2">

                        {hasValue(cvData.email) && <p>{cvData.email}</p>}
                        {hasValue(cvData.phone) && <p>{cvData.phone}</p>}
                        {hasValue(cvData.location) && <p>{cvData.location}</p>}

                    </div>


                    {/* SKILLS */}

                    {hasSkills && (

                        <div className="mb-6">

                            <h3 className="font-semibold mb-2">Skills</h3>

                            {aiSkills.map(([cat,val],i)=>(
                                <p key={i} className={`${theme.muted}`}>
                                    <strong>{cat}:</strong> {val}
                                </p>
                            ))}

                            {manualSkills.length>0 && (
                                <p className={`${theme.muted}`}>
                                    <strong>Other:</strong> {manualSkills.join(", ")}
                                </p>
                            )}

                        </div>

                    )}


                    {/* LINKS */}

                    {validLinks.length>0 && (

                        <div>

                            <h3 className="font-semibold mb-2">Links</h3>

                            {validLinks.map((l,i)=>(
                                <p key={i} className={`${theme.muted} break-all`}>
                                    <strong>{l.name}:</strong> {l.url}
                                </p>
                            ))}

                        </div>

                    )}

                </>

            )}

        </aside>

    );



    /* ---------------- MAIN SECTIONS ---------------- */

    const Section = ({title,children}) => (

        <section className="mb-8">

            <h3 className={`text-xl font-bold mb-2 ${theme.title}`}>
                {title}
            </h3>

            {children}

        </section>

    );


    /* ---------------- CONTENT ---------------- */

    const sections = [

        hasValue(cvData.summary) && (
            <Section title="Professional Summary">
                <p className="text-[15px] leading-7 whitespace-pre-line">
                    {cvData.summary}
                </p>
            </Section>
        ),


        validExperience.length>0 && (
            <Section title="Work Experience">

                {validExperience.map((exp,i)=>(
                    <div key={i} className="mb-4">

                        <div className="flex justify-between">

                            <h4 className="font-semibold">{exp.role}</h4>

                            <span className="text-sm">{exp.date}</span>

                        </div>

                        <p className="text-gray-700">{exp.company}</p>

                        {hasValue(exp.description) && (
                            <p className="text-sm mt-1">{exp.description}</p>
                        )}

                    </div>
                ))}

            </Section>
        ),


        validEducation.length>0 && (
            <Section title="Education">

                {validEducation.map((edu,i)=>(
                    <div key={i} className="mb-3">

                        <div className="flex justify-between">

                            <h4 className="font-semibold">{edu.title}</h4>

                            <span className="text-sm">{edu.date}</span>

                        </div>

                        {hasValue(edu.description) && (
                            <p className="text-sm">{edu.description}</p>
                        )}

                    </div>
                ))}

            </Section>
        ),


        validProjects.length>0 && (
            <Section title="Projects">

                {validProjects.map((p,i)=>(
                    <div key={i} className="mb-4">

                        <h4 className="font-semibold">{p.title}</h4>

                        {hasValue(p.description) && (
                            <p className="text-sm">{p.description}</p>
                        )}

                        {hasValue(p.technologies) && (
                            <p className="text-sm">
                                <strong>Tech:</strong> {p.technologies}
                            </p>
                        )}

                        {hasValue(p.link) && (
                            <p className="text-sm break-all text-blue-600">
                                {p.link}
                            </p>
                        )}

                    </div>
                ))}

            </Section>
        ),


        validActivities.length>0 && (
            <Section title="Extracurricular Activities">

                {validActivities.map((a,i)=>(
                    <p key={i}>
                        {a.activity} ({a.date})
                    </p>
                ))}

            </Section>
        ),

    ].filter(Boolean);



    /* ---------------- PAGINATION ---------------- */

    const PAGE_SIZE = 4;

    const pages = paginated
        ? Array.from(
            {length:Math.ceil(sections.length/PAGE_SIZE)},
            (_,i)=>sections.slice(i*PAGE_SIZE,i*PAGE_SIZE+PAGE_SIZE)
        )
        :[sections];


    /* ---------------- RENDER ---------------- */

    return(

        <div className="flex flex-col items-center gap-6">

            {pages.map((page,pageIndex)=>(
                <div
                    key={pageIndex}
                    className="cv-page bg-white"
                    style={{
                        width:"210mm",
                        minHeight:"297mm"
                    }}
                >

                    <div className="grid grid-cols-[260px_1fr]">

                        <Sidebar full={pageIndex===0}/>

                        <div className="p-10">

                            {page}

                        </div>

                    </div>

                </div>
            ))}

        </div>

    );

};

export default ModernTemplate;