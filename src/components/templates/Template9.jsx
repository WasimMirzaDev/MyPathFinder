import React from 'react';
import demo_profile from '../../assets/images/default_avatar.jpeg';

const Template9 = ({ resumeData }) => {
  const styles = {
    container: {
      fontFamily: "'Arial', sans-serif",
      margin: 0,
      padding: '20px 30px',
      color: '#333',
      backgroundColor: '#fff',
      lineHeight: 1.4,
      fontSize: '14px',
      maxWidth: '850px',
      margin: '0 auto'
    },
    wrapper: {
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '25px'
    },
    nameTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 5px 0',
      color: '#000',
      letterSpacing: '0.5px'
    },
    subtitle: {
      margin: 0,
      fontStyle: 'italic',
      color: '#555'
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: '2px solid #ddd'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    sectionTitle: {
      fontSize: '16px',
      
      pageBreakInside: "avoid",
      pageBreakBefore: "auto",
      pageBreakAfter: "auto",
      fontWeight: 'bold',
      margin: '0 0 12px 0',
      color: '#000',
      paddingBottom: '3px',
      borderBottom: '1px solid #ddd'
    },
    detailsTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '25px'
    },
    tableLabel: {
      width: '120px',
      padding: '3px 0',
      fontWeight: 'bold',
      verticalAlign: 'top'
    },
    tableValue: {
      padding: '3px 0'
    },
    profileText: {
      margin: '0 0 25px 0',
      textAlign: 'justify',
      
      pageBreakInside: "avoid",
      pageBreakBefore: "auto",
      pageBreakAfter: "auto",
      lineHeight: '1.5'
      
    },
    jobPeriod: {
      margin: '0 0 4px 0',
      fontWeight: 'bold',
      
      pageBreakInside: "avoid",
      pageBreakBefore: "auto",
      pageBreakAfter: "auto",
      fontSize: '14px'
    },
    jobTitle: {
      margin: '0 0 4px 0',
      
      pageBreakInside: "avoid",
      pageBreakBefore: "auto",
      pageBreakAfter: "auto",
      fontWeight: 'bold',
      fontSize: '14px'
    },
    company: {
      margin: '0 0 8px 0',
      fontWeight: 'bold',
      
      pageBreakInside: "avoid",
      pageBreakBefore: "auto",
      pageBreakAfter: "auto",
      fontSize: '14px'
      
    },
    bulletList: {
      margin: '0 0 20px 0',
      paddingLeft: '18px'
    },
    bulletItem: {
      
      pageBreakInside: "avoid",
      pageBreakBefore: "auto",
      pageBreakAfter: "auto",
      marginBottom: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header with name and photo */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.nameTitle}>
              {resumeData?.candidateName?.[0]?.firstName} {resumeData?.candidateName?.[0]?.familyName}
            </h1>
            <p style={styles.subtitle}>
              {resumeData?.headline || 'Professional title'}
            </p>
          </div>
          {resumeData?.profilePic ? <div style={styles.profileImage}>
            <img 
              src={resumeData?.profilePic || demo_profile} 
              alt="Profile" 
              style={styles.image} 
            />
          </div> :""}
          
        </div>

        {/* Personal Details */}
        {!(resumeData?.personalDisabled) && (
          <>
            <h2 style={styles.sectionTitle}>
              {resumeData?.personalTitle || 'Personal details'}
            </h2>
            <table style={styles.detailsTable}>
              <tbody>
                <tr>
                  <td style={styles.tableLabel}>Name</td>
                  <td style={styles.tableValue}>
                    {resumeData?.candidateName?.[0]?.firstName} {resumeData?.candidateName?.[0]?.familyName}
                  </td>
                </tr>
                {resumeData?.email?.[0] && (
                  <tr>
                    <td style={styles.tableLabel}>Email address</td>
                    <td style={styles.tableValue}>{resumeData.email[0]}</td>
                  </tr>
                )}
                {resumeData?.phoneNumber?.[0]?.formattedNumber && (
                  <tr>
                    <td style={styles.tableLabel}>Phone number</td>
                    <td style={styles.tableValue}>{resumeData.phoneNumber[0].formattedNumber}</td>
                  </tr>
                )}
                {resumeData?.location?.formatted && (
                  <tr>
                    <td style={styles.tableLabel}>Address</td>
                    <td style={styles.tableValue}>{resumeData.location.formatted}</td>
                  </tr>
                )}
                {resumeData?.location?.city && (
                  <tr>
                    <td style={styles.tableLabel}>City</td>
                    <td style={styles.tableValue}>{resumeData.location.city}</td>
                  </tr>
                )}
                {resumeData?.location?.postCode && (
                  <tr>
                    <td style={styles.tableLabel}>Postcode</td>
                    <td style={styles.tableValue}>{resumeData.location.postCode}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        {/* Profile Summary */}
        <h2 style={styles.sectionTitle}>Profile</h2>
        <p style={styles.profileText}>
          {resumeData?.summary?.paragraph || 'Professional summary goes here...'}
        </p>

        {/* Employment History */}
        {resumeData?.workExperience?.length > 0 && !(resumeData?.employmentDisabled) && (
          <>
            <h2 style={styles.sectionTitle}>
              {resumeData?.employmentTitle || 'Employment'}
            </h2>
            {resumeData?.workExperience?.map((job, index) => (
              <div key={index} style={{ marginBottom: index === resumeData.workExperience.length - 1 ? '5px' : '20px' }}>
                <p style={styles.jobPeriod}>
                  {job.workExperienceDates?.start?.date} - {job.workExperienceDates?.end?.date || 'Present'}
                </p>
                <p style={styles.jobTitle}>{job.workExperienceJobTitle}</p>
                <p style={styles.company}>{job.workExperienceOrganization}</p>
                <p>{job.workExperienceDescription ?? ""}</p>
                <h5>Key Achievements</h5>
                {job.highlights?.items?.length > 0 && (
                  <ul style={styles.bulletList}>
                    {job.highlights.items.map((item, i) => (
                      <li key={i} style={styles.bulletItem}>{item.bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}



        {/* Education */}
        {resumeData?.education?.length > 0 && !(resumeData?.educationDisabled) && (
          <>
            <h2 style={styles.sectionTitle}>
              {resumeData?.educationTitle || 'Education'}
            </h2>
            {resumeData?.education?.map((edu, index) => (
              <div key={index} style={{ marginBottom: index === resumeData.education.length - 1 ? '5px' : '20px' }}>
                <p style={styles.jobPeriod}>
                  {edu.educationDates?.start?.date} - {edu.educationDates?.end?.date}
                </p>
                <p style={styles.jobTitle}>{edu.educationLevel.label}</p>
                <p style={styles.company}>{edu.educationOrganization}</p>
                {edu.educationMajor.length > 0 ? (
                <>
                  <div className='d-flex' style={styles.pagecontentfull}>
                    <div>
                       Subjects : 
                    </div>
                    <div className='ms-1'>
                      {edu.educationMajor.map((major, i) => (
                        <span key={i}> {i > 0 ? ', ' : ''}{major}</span>
                      ))}
                    </div>
                  </div>
                  {/* <br /> */}
                </>
              ) : ""}
                {edu.achievedGrade? (
                <p style={styles.company}>Grade : {edu.achievedGrade}</p>
                ) : ""}
                {edu.educationDescription && (
                  <ul style={styles.bulletList}>
                    {edu.educationDescription.split('\n').map((item, i) => (
                      <li key={i} style={styles.bulletItem}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
        )}

        {!(resumeData?.skillsDisabled) && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={styles.sectionTitle}>
              {resumeData?.skillsTitle || 'Skills'}
            </h2>
            <ul style={styles.sidebarList}>
              {(resumeData?.skill || [])
                .filter(skill => skill.selected)
                .map((skill, index) => (
                  <li key={index} style={styles.sidebarListItem}>
                     {skill.name || skill}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template9;