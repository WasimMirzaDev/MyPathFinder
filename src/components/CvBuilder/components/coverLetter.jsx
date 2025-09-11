import React , {useEffect, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCoverLetter } from "../../../features/resume/resumeSlice";
import { ClassicCoverLetterTemplate } from "../../cover-letter-templates";


const coverLetterjson = {
    header: {
      applicant_name: "John Doe",
      applicant_address: "123 Main Street, Faisalabad, Pakistan",
      applicant_email: "johndoe@email.com",
      applicant_phone: "+92 300 1234567",
      date: "September 5, 2025"
    },
    recipient: {
      hiring_manager_name: "Jane Smith",
      company_name: "Tech Solutions Ltd.",
      company_address: "456 Business Road, London, UK"
    },
    body: {
      greeting: "Dear Hiring Manager,",
      opening_paragraph: "I am excited to apply for the Frontend Developer position at Tech Solutions Ltd...",
      middle_paragraphs: [
        "At Techtrack Software Solutions, I contributed to multiple Laravel and React projects...",
        "I am also proficient in Flutter/Dart and exploring Machine Learning..."
      ],
      closing_paragraph: "I would be delighted to discuss how my skills can contribute to your company’s success.",
      signature: "Sincerely, John Doe"
    }
  };



const CoverLetter = () =>{
  const dispatch = useDispatch();
  const { parsedResume  } = useSelector((state) => state.resume);
  
  const handleGenerateCoverLetter = () => {
    const formData = new FormData();
    formData.append("resume", parsedResume);
    dispatch(generateCoverLetter(formData));
  }

  return (
    <>
     <div>
        <button className='btn btn-primary' onClick={handleGenerateCoverLetter}>Generate Cover Letter</button>
        <h3>Classic Cover Letter</h3>
        <ClassicCoverLetterTemplate coverLetter={coverLetterjson} />
      </div>
    </>
  )
}


export default CoverLetter;