import React , {useEffect, useState, useCallback, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateCoverLetter } from "../../../features/resume/resumeSlice";
import { ClassicCoverLetterTemplate } from "../../cover-letter-templates";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


const CoverLetter = () =>{
  const dispatch = useDispatch();
  const { parsedResume , coverletterjson } = useSelector((state) => state.resume);
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


  return (
    <>
     <div>
        <button className='btn btn-primary' onClick={handleGenerateCoverLetter}>Generate Cover Letter</button>
        <button className='btn btn-primary' onClick={handleDownloadCoverLetter}>Download Cover Letter</button>
        <h3>Classic Cover Letter</h3>
        <div ref={coverRef}>
          <ClassicCoverLetterTemplate coverLetter={coverletterjson} />
        </div>
      </div>
    </>
  )
}


export default CoverLetter;