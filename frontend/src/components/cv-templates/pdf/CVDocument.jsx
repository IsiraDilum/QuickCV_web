import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 11,
        fontFamily: "Helvetica",
        lineHeight: 1.5
    },

    name: {
        fontSize: 20,
        marginBottom: 6,
        fontWeight: "bold"
    },

    contact: {
        marginBottom: 10
    },

    section: {
        marginTop: 10
    },

    heading: {
        fontSize: 13,
        marginBottom: 4,
        fontWeight: "bold"
    },

    item: {
        marginBottom: 3
    }
});

const hasValue = (v) => v && String(v).trim() !== "";

const CVDocument = ({ cvData }) => {

    const education = Array.isArray(cvData?.education)
        ? cvData.education.filter(e => hasValue(e.title))
        : [];

    const experience = Array.isArray(cvData?.experience)
        ? cvData.experience.filter(e => hasValue(e.role) || hasValue(e.company))
        : [];

    const projects = Array.isArray(cvData?.projects)
        ? cvData.projects.filter(p => hasValue(p.title))
        : [];

    return (
        <Document>

            {/* ❌ REMOVE wrap OR control it */}
            <Page size="A4" style={styles.page}>

                {/* HEADER */}
                <View wrap={false}>
                    {hasValue(cvData.fullName) && (
                        <Text style={styles.name}>{cvData.fullName}</Text>
                    )}

                    <View style={styles.contact}>
                        {hasValue(cvData.email) && <Text>{cvData.email}</Text>}
                        {hasValue(cvData.phone) && <Text>{cvData.phone}</Text>}
                        {hasValue(cvData.location) && <Text>{cvData.location}</Text>}
                    </View>
                </View>

                {/* SUMMARY */}
                {hasValue(cvData.summary) && (
                    <View style={styles.section} wrap={false}>
                        <Text style={styles.heading}>Summary</Text>
                        <Text>{cvData.summary}</Text>
                    </View>
                )}

                {/* EDUCATION */}
                {education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Education</Text>
                        {education.map((edu, i) => (
                            <Text key={i} style={styles.item}>
                                {edu.title} {hasValue(edu.date) && `— ${edu.date}`}
                            </Text>
                        ))}
                    </View>
                )}

                {/* EXPERIENCE */}
                {experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Experience</Text>
                        {experience.map((exp, i) => (
                            <Text key={i} style={styles.item}>
                                {exp.role} {exp.company && `— ${exp.company}`}{" "}
                                {exp.date && `(${exp.date})`}
                            </Text>
                        ))}
                    </View>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.heading}>Projects</Text>
                        {projects.map((p, i) => (
                            <Text key={i} style={styles.item}>
                                {p.title} {p.description && `— ${p.description}`}
                            </Text>
                        ))}
                    </View>
                )}

            </Page>

        </Document>
    );
};

export default CVDocument;