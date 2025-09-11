import React , {useEffect, useState, useCallback, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCoverLetter } from "../../../features/resume/resumeSlice";
import { ClassicCoverLetterTemplate } from "../../cover-letter-templates";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const CoverLetter = () =>{
  const dispatch = useDispatch();
  const { parsedResume , coverletterjson , coverletterLoader } = useSelector((state) => state.resume);
  const coverRef = useRef(null);
    
  const handleGenerateCoverLetter = () => {
    const formData = new FormData();
    console.log(parsedResume, "parsedResume");
    formData.append('jsonResume', JSON.stringify(parsedResume));
    dispatch(generateCoverLetter(formData));
  }


  const handleDownloadCoverLetter = async () => {
    if (!coverRef.current) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const a4Width = 210;
    const a4Height = 297;
    const a4WidthPx = 794;
    const a4HeightPx = 1123;

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = `${a4WidthPx}px`;
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.boxSizing = 'border-box';

    const cloned = coverRef.current.cloneNode(true);
    cloned.style.width = `${a4WidthPx}px`;
    cloned.style.margin = '0 auto';
    cloned.style.padding = '24px';
    cloned.style.fontSize = '12px';
    cloned.style.lineHeight = '1.5';

    tempContainer.appendChild(cloned);
    document.body.appendChild(tempContainer);

    try {
      const canvas = await html2canvas(cloned, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: a4WidthPx,
        height: a4HeightPx,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = a4Width;
      const imgHeight = (canvas.height * a4Width) / canvas.width;
      const yPos = Math.max(0, (a4Height - imgHeight) / 2);

      pdf.addImage(imgData, 'PNG', 0, yPos, imgWidth, imgHeight);
      const filename = `${parsedResume?.candidateName?.[0]?.firstName || 'CoverLetter'}.pdf`;
      pdf.save(filename);
    } catch (err) {
      console.error('Error generating Cover Letter PDF:', err);
    } finally {
      document.body.removeChild(tempContainer);
    }
  }

  const handleCopyToClipboard = () => {
    const cl = coverletterjson || {};
    const header = cl.header || {};
    const recipient = cl.recipient || {};
    const body = cl.body || {};

    const lines = [];

    if (header.applicant_name) lines.push(header.applicant_name);
    if (header.applicant_address) lines.push(header.applicant_address);
    if (header.applicant_email) lines.push(header.applicant_email);
    if (header.applicant_phone) lines.push(header.applicant_phone);
    if (header.date) lines.push(header.date);

    lines.push("");

    if (recipient.hiring_manager_name) lines.push(recipient.hiring_manager_name);
    if (recipient.company_name) lines.push(recipient.company_name);
    if (recipient.company_address) lines.push(recipient.company_address);

    lines.push("");

    lines.push(body.greeting || "Dear Hiring Manager,");
    lines.push("");
    if (body.opening_paragraph) lines.push(body.opening_paragraph);
    if (Array.isArray(body.middle_paragraphs)) {
      body.middle_paragraphs.forEach(p => { if (p) lines.push(p); });
    }
    if (body.closing_paragraph) {
      lines.push("");
      lines.push(body.closing_paragraph);
    }
    lines.push("");

    const signature = (body.signature || "Sincerely, {applicant_name}")
      .replace('{applicant_name}', header.applicant_name || "");
    lines.push(signature);

    const plainText = lines.join('\n');
    navigator.clipboard.writeText(plainText);
  }

  return (
    <>
     <div>
      <div className="d-flex gap-2 mb-3">
        <div>
          <button className='btn btn-primary' onClick={handleGenerateCoverLetter} disabled={coverletterLoader}>{coverletterLoader ? "Generating Cover Letter..." : "Generate Cover Letter"}</button>
        </div>
        <div>
          <button className='btn btn-primary' onClick={handleDownloadCoverLetter}>Download Cover Letter</button>
        
        </div>
      </div>
        <h3>Classic Cover Letter</h3>
        <div ref={coverRef}>
          <ClassicCoverLetterTemplate coverLetter={coverletterjson} />
        </div>
        <button className="btn btn-primary border-0 mt-2" onClick={handleCopyToClipboard}>Copy to clipboard</button>
      </div>
    </>
  )
}


export default CoverLetter;