import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const JobseekerTemplate = ({ cvData, paginated = true }) => {

    const hasValue = (v) => v && String(v).trim() !== "";


    /* ---------- SKILLS ---------- */

    const manualSkills = Array.isArray(cvData?.skills)
        ? cvData.skills.filter(hasValue)
        : [];

    const aiSkills = cvData?.aiSkills
        ? Object.entries(cvData.aiSkills).filter(([_,v])=>hasValue(v))
        : [];

    const hasSkills = manualSkills.length>0 || aiSkills.length>0;


    /* ---------- LINKS ---------- */

    const validLinks = Array.isArray(cvData?.links)
        ? cvData.links.filter(l=>hasValue(l.name)||hasValue(l.url))
        : [];


    /* ---------- EDUCATION ---------- */

    const validEducation = Array.isArray(cvData?.education)
        ? cvData.education.filter(e=>hasValue(e.title))
        : [];


    /* ---------- EXPERIENCE ---------- */

    const validExperience = Array.isArray(cvData?.experience)
        ? cvData.experience.filter(e=>hasValue(e.role)||hasValue(e.company))
        : [];


    /* ---------- PROJECTS ---------- */

    const validProjects = Array.isArray(cvData?.projects)
        ? cvData.projects.filter(p=>hasValue(p.title))
        : [];


    /* ---------- ACTIVITIES ---------- */

    const validActivities = Array.isArray(cvData?.extracurricular)
        ? cvData.extracurricular.filter(a=>hasValue(a.activity))
        : [];


    /* ---------- HELPERS ---------- */

    const estimateTextHeight = (text="", charsPerLine=60) => {
        const lines = Math.ceil(String(text).length / charsPerLine);
        return Math.max(lines,2) * 24;
    };

    const estimateSectionHeight = (text="") => {
        return 80 + estimateTextHeight(text);
    };


    /* ---------- SECTION COMPONENT ---------- */

    const Section = ({title,children}) => (

        <section className="border border-[#5a9c93] bg-white mb-5">

            <div className="bg-[#3f8f84] text-white px-3 py-2 font-bold">
                {title}
            </div>

            <div className="p-4 text-[14px] leading-7">
                {children}
            </div>

        </section>

    );


    /* ---------- SECTIONS ---------- */

    const sections = [

        /* SUMMARY */

        hasValue(cvData.summary) && {
            height:estimateSectionHeight(cvData.summary),
            node:(
                <Section title="Profile">
                    <p className="whitespace-pre-line">{cvData.summary}</p>
                </Section>
            )
        },


        /* EXPERIENCE */

        validExperience.length>0 && {
            height:validExperience.length*120,
            node:(

                <Section title="Employment">

                    {validExperience.map((exp,i)=>(
                        <div key={i} className="mb-4">

                            <div className="flex justify-between">

                                <h4 className="font-semibold">{exp.role}</h4>

                                <span className="text-sm text-[#3f8f84]">{exp.date}</span>

                            </div>

                            <p className="text-gray-700">{exp.company}</p>

                            {hasValue(exp.description) && (
                                <p className="text-sm mt-1">{exp.description}</p>
                            )}

                        </div>
                    ))}

                </Section>

            )
        },


        /* EDUCATION */

        validEducation.length>0 && {
            height:validEducation.length*110,
            node:(

                <Section title="Education">

                    {validEducation.map((edu,i)=>(
                        <div key={i} className="mb-3">

                            <div className="flex justify-between">

                                <h4 className="font-semibold">{edu.title}</h4>

                                <span className="text-sm text-[#3f8f84]">{edu.date}</span>

                            </div>

                            {hasValue(edu.description) && (
                                <p className="text-sm">{edu.description}</p>
                            )}

                        </div>
                    ))}

                </Section>

            )
        },


        /* SKILLS */

        hasSkills && {
            height:140,
            node:(

                <Section title="Skills">

                    {aiSkills.map(([cat,val],i)=>(
                        <p key={i}>
                            <b>{cat}:</b> {val}
                        </p>
                    ))}

                    {manualSkills.length>0 && (
                        <p className="mt-2">
                            <b>Other Skills:</b> {manualSkills.join(", ")}
                        </p>
                    )}

                </Section>

            )
        },


        /* PROJECTS */

        validProjects.length>0 && {
            height:validProjects.length*110,
            node:(

                <Section title="Projects">

                    {validProjects.map((p,i)=>(
                        <div key={i} className="mb-3">

                            <h4 className="font-semibold">{p.title}</h4>

                            {hasValue(p.description) && (
                                <p className="text-sm">{p.description}</p>
                            )}

                            {hasValue(p.technologies) && (
                                <p className="text-sm">
                                    <b>Tech:</b> {p.technologies}
                                </p>
                            )}

                            {hasValue(p.link) && (
                                <p className="text-sm text-blue-600 break-all">
                                    {p.link}
                                </p>
                            )}

                        </div>
                    ))}

                </Section>

            )
        },


        /* ACTIVITIES */

        validActivities.length>0 && {
            height:validActivities.length*70,
            node:(

                <Section title="Extracurricular Activities">

                    {validActivities.map((a,i)=>(
                        <p key={i}>
                            {a.activity} ({a.date})
                        </p>
                    ))}

                </Section>

            )
        },


        /* LINKS */

        validLinks.length>0 && {
            height:validLinks.length*50,
            node:(

                <Section title="Profile Links">

                    {validLinks.map((l,i)=>(
                        <p key={i} className="break-all">
                            <b>{l.name}:</b> {l.url}
                        </p>
                    ))}

                </Section>

            )
        },


        /* REFERENCES */

        hasValue(cvData.references) && {
            height:estimateSectionHeight(cvData.references),
            node:(

                <Section title="References">
                    <p className="whitespace-pre-line">
                        {cvData.references}
                    </p>
                </Section>

            )
        }

    ].filter(Boolean);



    /* ---------- PAGINATION ---------- */

    const PAGE_LIMIT = 1120;

    const buildPages = () => {

        if(!paginated) return [sections.map(s=>s.node)];

        const pages=[];
        let current=[];
        let height=0;

        sections.forEach(sec=>{

            if(height + sec.height > PAGE_LIMIT && current.length){

                pages.push(current);
                current=[];
                height=0;

            }

            current.push(sec.node);
            height += sec.height;

        });

        if(current.length) pages.push(current);

        return pages;

    };

    const pages = buildPages();

    /* ---------- RENDER ---------- */

    return(

        <div className="flex flex-col items-center gap-6 py-6 bg-[#0b1220]">

            <div id="cv-preview" className="flex flex-col items-center gap-8">

                {pages.map((page,pageIndex)=>(
                    <div
                        key={pageIndex}
                        className="shadow-2xl bg-white"
                        style={{
                            width:"210mm",
                            height:"297mm",
                            overflow: "hidden"
                        }}
                    >

                        <div className="bg-[#f3f3f3] h-full p-8 border">

                            {pageIndex===0 && (

                                <div className="text-center mb-8">

                                    <h2 className="text-4xl font-bold">
                                        {cvData.fullName}
                                    </h2>

                                    <p className="text-sm text-gray-600 mt-2">
                                        {cvData.jobTitle}
                                    </p>

                                    <section className="border border-[#5a9c93] bg-white mt-6">

                                        <div className="bg-[#3f8f84] text-white px-3 py-2 font-bold">
                                            Personal details
                                        </div>

                                        <div className="p-4 text-sm flex flex-wrap gap-6">

                                            {hasValue(cvData.email) &&
                                                <span><b>Email:</b> {cvData.email}</span>}

                                            {hasValue(cvData.phone) &&
                                                <span><b>Phone:</b> {cvData.phone}</span>}

                                            {hasValue(cvData.location) &&
                                                <span><b>Address:</b> {cvData.location}</span>}

                                        </div>

                                    </section>

                                </div>

                            )}

                            {page}

                        </div>

                    </div>
                ))}

            </div>

        </div>

    );

};

export default JobseekerTemplate;