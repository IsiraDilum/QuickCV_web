// utils/cvLayoutCalculator.js

// 🔹 Estimate text block height (improved)
export const estimateTextHeight = (
    text = "",
    charsPerLine = 50,
    lineHeight = 20
) => {
    const safeText = String(text || "").trim();

    if (!safeText) return lineHeight; // minimum 1 line

    const lines = Math.ceil(safeText.length / charsPerLine);
    return lines * lineHeight;
};

// 🔹 Fixed heights for UI elements
const FIXED = {
    sectionTitle: 30,
    itemGap: 15,
    blockPadding: 20,
    skillTag: 28,
    profileBlock: 120,
    linkItem: 25,
};

// 🔹 A4 PAGE HEIGHT (px approximation)
const A4_HEIGHT = 1120; // safer than 1000

// 🔹 MAIN CALCULATOR
export const calculateCVSections = (form) => {
    let totalHeight = 0;
    const sections = {};

    // =========================
    // 🧑 PERSONAL INFO
    // =========================
    let personalHeight = FIXED.profileBlock;

    personalHeight += estimateTextHeight(form.fullName, 30);
    personalHeight += estimateTextHeight(form.jobTitle, 30);

    sections.personal = personalHeight;
    totalHeight += personalHeight;

    // =========================
    // 📝 SUMMARY
    // =========================
    let summaryHeight = 0;

    if (form.summary) {
        summaryHeight =
            FIXED.sectionTitle +
            estimateTextHeight(form.summary, 60) +
            FIXED.blockPadding;
    }

    sections.summary = summaryHeight;
    totalHeight += summaryHeight;

    // =========================
    // 🎓 EDUCATION
    // =========================
    let educationHeight = 0;

    if (form.education?.length) {
        educationHeight += FIXED.sectionTitle;

        form.education.forEach((edu) => {
            if (!edu) return;

            educationHeight += estimateTextHeight(edu.title, 40);
            educationHeight += estimateTextHeight(edu.description, 60);
            educationHeight += estimateTextHeight(edu.date, 30);
            educationHeight += FIXED.itemGap;
        });
    }

    sections.education = educationHeight;
    totalHeight += educationHeight;

    // =========================
    // 💼 EXPERIENCE
    // =========================
    let experienceHeight = 0;

    if (form.experience?.length) {
        experienceHeight += FIXED.sectionTitle;

        form.experience.forEach((exp) => {
            if (!exp) return;

            experienceHeight += estimateTextHeight(exp.role, 40);
            experienceHeight += estimateTextHeight(exp.company, 40);
            experienceHeight += estimateTextHeight(exp.description, 60);
            experienceHeight += estimateTextHeight(exp.date, 30);
            experienceHeight += FIXED.itemGap;
        });
    }

    sections.experience = experienceHeight;
    totalHeight += experienceHeight;

    // =========================
    // 🚀 PROJECTS
    // =========================
    let projectHeight = 0;

    if (form.projects?.length) {
        projectHeight += FIXED.sectionTitle;

        form.projects.forEach((proj) => {
            if (!proj) return;

            projectHeight += estimateTextHeight(proj.title, 40);
            projectHeight += estimateTextHeight(proj.technologies, 50);
            projectHeight += estimateTextHeight(proj.description, 60);
            projectHeight += estimateTextHeight(proj.developDate, 30);
            projectHeight += FIXED.itemGap;
        });
    }

    sections.projects = projectHeight;
    totalHeight += projectHeight;

    // =========================
    // 🧠 SKILLS (IMPROVED)
    // =========================
    let skillHeight = 0;

    if (form.skillCategories?.length) {
        skillHeight += FIXED.sectionTitle;

        form.skillCategories.forEach((cat) => {
            if (!cat) return;

            skillHeight += estimateTextHeight(cat.category, 40);

            const skillCount = cat.skills?.length || 0;

            // responsive rows (better estimation)
            const tagsPerRow = 4;
            const rows = Math.ceil(skillCount / tagsPerRow);

            skillHeight += rows * FIXED.skillTag;
            skillHeight += FIXED.itemGap;
        });
    }

    sections.skills = skillHeight;
    totalHeight += skillHeight;

    // =========================
    // 🔗 LINKS
    // =========================
    let linkHeight = 0;

    if (form.links?.length) {
        linkHeight += FIXED.sectionTitle;

        form.links.forEach((l) => {
            if (!l) return;

            linkHeight += FIXED.linkItem;
        });
    }

    sections.links = linkHeight;
    totalHeight += linkHeight;

    // =========================
    // 🎯 FINAL RESULT
    // =========================
    const isOverflow = totalHeight > A4_HEIGHT;

    return {
        sections,
        totalHeight,
        isOverflow,
        remainingSpace: A4_HEIGHT - totalHeight,
    };
};