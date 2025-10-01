import React from "react";

const Template6 = ({ resumeData }) => {
  const styles = {
    container: {
      maxWidth: "850px",
      margin: "0 auto",
      padding: "40px",
      fontFamily: "'Segoe UI', Tahoma, sans-serif",
      border: "1px solid #e0e0e0",
      background: "#fff",
      lineHeight: "1.6",
    },
    header: {
      fontSize: "14px",
      color: "#333",
      marginBottom: "20px",
    },
    candidateHeadline: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#2585E0",
      margin: "10px 0 4px",
    },
    headlineText: {
      fontSize: "15px",
      fontWeight: "500",
      color: "#000",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#2585E0",
      margin: "20px 0 8px",
    },
    profile: {
      fontSize: "14px",
      color: "#333",
      marginBottom: "20px",
    },
    leftColumn: {
      width: "100%",
    },
    rightColumn: {
      width: "100%",
    },
    bulletList: {
      margin: "6px 0 0 18px",
      padding: 0,
      fontSize: "14px",
      color: "#333",
    },
    jobTitle: {
      fontSize: "14px",
      fontWeight: "600",
      color: "#2585E0",
      margin: "0 0 2px",
    },
    company: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#000",
      margin: "0 0 6px",
    },
    date: {
      fontSize: "13px",
      color: "#777",
      marginBottom: "8px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        {resumeData?.candidateName?.[0]?.firstName}{" "}
        {resumeData?.candidateName?.[0]?.familyName} |{" "}
        {resumeData?.location?.city}, {resumeData?.location?.country} |{" "}
        {resumeData?.email?.[0]} |{" "}
        {resumeData?.phoneNumber?.[0]?.formattedNumber} |{" "}
        {resumeData?.socialLinks?.[0]?.url || "LinkedIn URL"}
      </div>

      {/* Candidate Headline */}
      <h2 style={styles.candidateHeadline}>Candidate Headline</h2>
      <p style={styles.headlineText}>
        {resumeData?.headline || "Results-Driven Partnerships & Client Success Leader"}
      </p>

      {/* Profile */}
      <h2 style={styles.sectionTitle}>Profile</h2>
      <p style={styles.profile}>
        {resumeData?.summary ||
          "Results-focused partnerships professional with 6+ years’ experience..."}
      </p>

      {/* Two Column Layout */}
      <div style={styles.twoColumn}>
        {/* Left Column */}
        <div style={styles.leftColumn}>
          <h2 style={styles.sectionTitle}>Key Skills</h2>
          <ul style={styles.bulletList}>
            {(resumeData?.skills || [
              "Strategic Account Growth & Retention",
              "SaaS & Recruitment Technology Solutions",
              "Client Success & Stakeholder Engagement",
              "Business Development & Contract Negotiation",
              "Team Leadership & Coaching",
              "Revenue Expansion & Partnership Management",
            ]).map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div style={styles.rightColumn}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {(resumeData?.workExperience || [
            {
              jobTitle: "Head of Partnerships",
              organization: "Genius Group",
              start: "Dec 2022",
              end: "Present",
              description: `Oversaw business development and account growth across 60+ clients within SaaS recruitment and employee engagement solutions.\nDefined and implemented growth strategies post-merger, ensuring seamless client transitions.`,
            },
          ]).map((job, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <p style={styles.jobTitle}>
                {job.jobTitle} | {job.organization}
              </p>
              <p style={styles.date}>
                {job.start} – {job.end || "Present"}
              </p>
              {job.description && (
                <ul style={styles.bulletList}>
                  {job.description.split("\n").map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template6;
