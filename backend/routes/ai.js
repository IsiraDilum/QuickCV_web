const express = require("express");
const axios = require("axios");

const router = express.Router();

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL = "meta-llama/Meta-Llama-3-8B-Instruct";

// simple in-memory conversation memory
const conversationMemory = {};


// ---------------------------
// Hugging Face Call Function
// ---------------------------
async function callHF(messages, max_tokens = 300, temperature = 0.3) {

    const response = await axios.post(
        HF_API_URL,
        {
            model: HF_MODEL,
            messages,
            max_tokens,
            temperature
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return response?.data?.choices?.[0]?.message?.content?.trim() || "";
}


// ---------------------------
// Clean AI Response
// ---------------------------
function cleanAIResponse(text) {

    if (!text) return "";

    const patterns = [
        /The given answer[\s\S]*/i,
        /Here is a rewritten version[\s\S]*/i,
        /Changes made[\s\S]*/i,
        /I made the following changes[\s\S]*/i,
        /However,.*improvement[\s\S]*/i
    ];

    let cleaned = text;

    patterns.forEach(pattern => {
        cleaned = cleaned.replace(pattern, "");
    });

    return cleaned.trim();
}

// ---------------------------
// Generate CV Summary
// ---------------------------
router.post("/generate-summary", async (req, res) => {

    try {

        const {
            fullName,
            jobTitle,
            education,
            experience,
            projects,
            skillCategories
        } = req.body;

        /* ---------- FORMAT EDUCATION ---------- */
        const educationText = Array.isArray(education)
            ? education
                .map(e => `${e.title || ""} (${e.date || ""})`)
                .join(", ")
            : "";

        /* ---------- FORMAT EXPERIENCE ---------- */
        const experienceText = Array.isArray(experience)
            ? experience
                .map(e => `${e.role || ""} at ${e.company || ""} (${e.date || ""})`)
                .join(", ")
            : "";

        /* ---------- FORMAT SKILLS ---------- */
        const skillsText = Array.isArray(skillCategories)
            ? skillCategories
                .map(cat => `${cat.category || ""}: ${(cat.skills || []).join(", ")}`)
                .join("\n")
            : "";

        /* ---------- FORMAT PROJECTS ---------- */
        const projectText = Array.isArray(projects)
            ? projects.map((p, i) => `
Project ${i + 1}
Title: ${p.title || ""}
Description: ${p.description || ""}
Technologies: ${p.technologies || ""}
`).join("\n")
            : "";

        /* ---------- AI PROMPT ---------- */
        const messages = [
            {
                role: "system",
                content: `
You are a professional CV writing assistant.

Write concise CV summaries suitable for students or junior developers.
Keep it realistic and ATS friendly.
Avoid exaggeration.
`
            },
            {
                role: "user",
                content: `
Write a professional CV summary.

Name: ${fullName || ""}
Target Job Title: ${jobTitle || ""}

Education:
${educationText}

Experience:
${experienceText}

Skills:
${skillsText}

Projects:
${projectText}

Rules:
- 3 to 5 sentences
- Professional tone
- No bullet points
- Return ONLY the summary
`
            }
        ];

        const summary = await callHF(messages, 200, 0.3);

        if (!summary) {
            return res.status(500).json({
                error: "Failed to generate summary"
            });
        }

        res.json({ summary });

    } catch (error) {

        console.error("HF generate-summary error:", error.message);

        res.status(500).json({
            error: "Failed to generate summary"
        });
    }
});



// ---------------------------
// Autocorrect CV Text
// ---------------------------
router.post("/autocorrect", async (req, res) => {

    try {

        const { field, text } = req.body;

        const messages = [
            {
                role: "system",
                content: `
You are a professional CV editor.

Correct grammar and spelling.
Keep the original meaning.
Return only the corrected text.
`
            },
            {
                role: "user",
                content: `
Correct this CV ${field} text.

Text:
${text || ""}
`
            }
        ];

        const correctedText = await callHF(messages, 200, 0.2);

        if (!correctedText) {
            return res.status(500).json({ error: "Failed to autocorrect text" });
        }

        res.json({ correctedText });

    } catch (error) {

        console.error("HF autocorrect error:", error.message);

        res.status(500).json({
            error: "Failed to autocorrect text"
        });
    }
});



// ---------------------------
// Chatbot Route
// ---------------------------
router.post("/chatbot", async (req, res) => {

    try {

        const { message, cvData, sessionId = "default" } = req.body;

        if (!conversationMemory[sessionId]) {
            conversationMemory[sessionId] = [];
        }

        const history = conversationMemory[sessionId];

        history.push({
            role: "user",
            content: message
        });

        const messages = [

            {
                role: "system",
                content: `
You are CVCHelper 🤖 — the friendly assistant of QuickCV.

Personality:
Friendly, supportive, simple English.
Use small emojis sometimes 😊

Goal:
Help users build a CV step by step.

Rules:
- Never analyze answers
- Never explain improvements
- Never say "The given answer"
- Never say "rewritten version"
- do not say  like " The answer is mostly correct and helpful. However, I can suggest a slight improvement for clarity and professionalism. Here's a rewritten version:" only send direct answer

If user asks for CV examples:
Return only the final CV text ready to paste.

If user greets:
Reply friendly and short.

Keep replies under 4 sentences.
`
            },

            ...history.slice(-6),

            {
                role: "user",
                content: `
User Message:
${message}

User CV Data:

Name: ${cvData?.fullName || ""}
Job Title: ${cvData?.jobTitle || ""}
Education: ${JSON.stringify(cvData?.education || [])}
Experience: ${JSON.stringify(cvData?.experience || [])}
Skills: ${JSON.stringify(cvData?.skillCategories || [])}
Projects: ${JSON.stringify(cvData?.projects || [])}

Respond helpfully.
`
            }
        ];

        const aiReply = await callHF(messages, 300, 0.25);

        if (!aiReply) {
            return res.status(500).json({
                reply: "⚠️ Sorry, I couldn't generate a response."
            });
        }

        const finalReply = cleanAIResponse(aiReply);

        history.push({
            role: "assistant",
            content: finalReply
        });

        res.json({ reply: finalReply });

    } catch (error) {

        console.error("HF chatbot error:", error.message);

        res.status(500).json({
            error: "Chatbot failed"
        });
    }
});


module.exports = router;