import React, { useState, useRef ,useCallback , useEffect  } from 'react';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiMinus } from "react-icons/fi";
import avatar from '../../assets/images/team/150x150/57.webp'
import {
    ModernTemplate,
    ClassicTemplate,
    ProfessionalTemplate2,
    ProfessionalTemplate,
    Template5,
    Template6,
    Template7,
    Template8,
    Template9,
    Template10,
    Template11,
    Template12,
    Template13
} from "../templates";

import { Row, Col, Button , Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { setParsedResume , updateField } from "../../features/resume/resumeSlice";
import { fetchResumeById , updateResumeById } from "../../features/resume/resumeSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";

const cardTemplate = [
    // { name: 'Template1', template: ModernTemplate, image: 'dummy.jpg' },
    // { name: 'Template2', template: ClassicTemplate, image: 'dummy.jpg' },
    // { name: 'Template3', template: ProfessionalTemplate, image: 'dummy.jpg' },
    // { name: 'Template4', template: ProfessionalTemplate2, image: 'dummy.jpg' },
    { name: 'Luxe', template: Template13, image: 'default.png' },
    { name: 'Classic', template: Template12, image: 'default.png' },
    { name: 'Unique', template: Template11, image: 'chrono.png' },
    { name: 'Simple', template: Template10, image: 'default.png' },
    { name: 'Default', template: Template9, image: 'default.png' },
    { name: 'Professional', template: Template5, image: 'professional.jpg' },
    { name: 'Chrono', template: Template6, image: 'chrono.png' },
    { name: 'Elegant', template: Template7, image: 'elegant.jpg' },
    { name: 'Modern', template: Template8, image: 'modern.jpg' },
];


export default function CVBuilder() {

    const {id} = useParams();
    const dispatch = useDispatch();


    useEffect(()=>{
        dispatch(fetchResumeById(id));
    },[id])

    const { parsedResume , saveChangesLoader , error } = useSelector((state) => state.resume);
    const [zoom, setZoom] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    
    const [currentSkill, setCurrentSkill] = useState('');
    const [currentLanguage, setCurrentLanguage] = useState('');
    const [languageLevel, setLanguageLevel] = useState('Intermediate');
    const [currentHobby, setCurrentHobby] = useState('');
    const cvRef = useRef();

    const [customSections, setCustomSections] = useState([]);

    // State for active tab
    const [selectedTemplate, setSelectedTemplate] = useState("Default");

    const handleTemplateChange = (templateName) => {
        setSelectedTemplate(templateName);
        dispatch(setParsedResume({
          ...parsedResume,
          template: templateName
        }));
      };


    

      const zoomIn = () => {
        setZoom(prev => {
            const newZoom = Math.min(prev + 0.1, 2);
            console.log('Zoom In clicked. New zoom level:', newZoom);
            return newZoom;
        });
    };

    const zoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.1, 0.5);
            console.log('Zoom Out clicked. New zoom level:', newZoom);
            return newZoom;
        });
    };



    const saveChanges = () =>{
        dispatch(updateResumeById({id, parsedResume}));
    }



        useEffect(() => {
            if (parsedResume?.skill && parsedResume.skill.length > 0) {
                // Check if any skills have the selected property
                const hasSelectedProperty = parsedResume.skill.some(skill => 'selected' in skill);
    
                if (!hasSelectedProperty) {
                    // Initialize first 5 skills as selected
                    const updatedSkills = parsedResume.skill.map((skill, index) => ({
                        ...skill,
                        selected: index < 5
                    }));
                   dispatch(updateField({path:"skill", value: updatedSkills}));
                }
            }
        }, [parsedResume?.skill]);



        const handleAddSkill = () => {
            if (currentSkill.trim()) {
              const currentSkills = parsedResume?.skill || [];
          
              dispatch(
                updateField({
                  path: "skill",
                  value: [
                    ...currentSkills,
                    {
                      name: currentSkill.trim(),
                      selected: true, // default selected
                    },
                  ],
                })
              );
          
              setCurrentSkill("");
            }
          };

              const handleAddLanguage = () => {
                  if (!currentLanguage.trim()) {
                      toast.error("Please enter a language", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          transition: Bounce,
                      });
                      return;
                  }
          
                  const newLanguage = {
                      name: currentLanguage.trim(),
                      level: languageLevel,
                      fluency: languageLevel
                  };
          
                  dispatch(updateField({path:"languages", value: [...(parsedResume.languages || []), newLanguage]}));
                  setCurrentLanguage('');
              };


              const handleAddHobby = () => {
                if (!currentHobby.trim()) {
                    toast.error("Please enter a hobby", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    return;
                }
                dispatch(updateField({ path:"hobbies", value:[...(parsedResume.hobbies || []), currentHobby.trim()]}));
                setCurrentHobby('');
            };
          


//     const updateField = (path, value) => {
//         dispatch(setParsedResume((prev) => {
//             const newResume = { ...prev };
//             const pathParts = path.match(/(\w+)(?:\[(\d+)\])?\.?(\w+)?/);
//             if (!pathParts) {
//                 newResume[path] = value;
//                 return newResume;
//             }

//             const [_, key, index, subKey] = pathParts;
//             if (index && subKey) {
//                 if (!newResume[key]) newResume[key] = [];
//                 if (!newResume[key][index]) newResume[key][index] = {};
//                 newResume[key][index][subKey] = value;
//             } else if (index) {
//                 if (!newResume[key]) newResume[key] = [];
//                 newResume[key][index] = value;
//             } else {
//                 newResume[key] = value;
//             }
//             return newResume;
//         })
//     );
//    }


    const calculatePages = () => {
        if (!cvRef.current) return 1;

        const a4HeightPx = 1123; // A4 height in pixels at 96 DPI
        const contentHeight = cvRef.current.scrollHeight;
        const calculatedPages = Math.ceil(contentHeight / a4HeightPx);

        // Check if the last page has meaningful content (at least 20% filled)
        const lastPageContent = contentHeight % a4HeightPx;
        if (calculatedPages > 1 && lastPageContent < (a4HeightPx * 0.2)) {
            return calculatedPages - 1;
        }
        return calculatedPages;
    };

    // Update total pages when resume data changes
    // Update total pages when resume data changes
    useEffect(() => {
        if (parsedResume && cvRef.current) {
            setTimeout(() => {
                const pages = calculatePages();
                setTotalPages(pages);
                if (currentPage > pages) {
                    setCurrentPage(pages);
                }
            }, 100);
        }
    }, [parsedResume, currentPage]);



        const handleDownloadPDF = async () => {
            if (!cvRef.current) return;
    
            const pdf = new jsPDF('p', 'mm', 'a4');
            const a4Width = 210; // A4 width in mm
            const a4Height = 297; // A4 height in mm
            const a4WidthPx = 794; // A4 width in pixels at 96 DPI
            const a4HeightPx = 1123; // A4 height in pixels at 96 DPI
            const padding = 0; // Padding in pixels
    
            // Create a temporary container for the entire content
            const tempContainer = document.createElement('div');
            tempContainer.style.position = 'absolute';
            tempContainer.style.left = '-9999px';
            tempContainer.style.width = `${a4WidthPx}px`;
            tempContainer.style.backgroundColor = '#ffffff';
            tempContainer.style.padding = `${padding}px`;
            tempContainer.style.boxSizing = 'border-box';
    
            // Clone the CV content
            const clonedContent = cvRef.current.cloneNode(true);
    
            // Apply PDF-specific styles to center the content
            clonedContent.style.width = `${a4WidthPx - 2 * padding}px`; // Account for padding on both sides
            clonedContent.style.margin = '0 auto'; // Center horizontally
            clonedContent.style.padding = '0';
            clonedContent.style.fontSize = '12px';
            clonedContent.style.lineHeight = '1.4';
    
            // // Center all content elements
            // const centerElements = clonedContent.querySelectorAll('*');
            // centerElements.forEach(el => {
            //   el.style.marginLeft = 'auto';
            //   el.style.marginRight = 'auto';
            //   el.style.maxWidth = '100%';
            // });
    
            // Adjust heading sizes
            const headings = clonedContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach(heading => {
                const currentSize = window.getComputedStyle(heading).fontSize;
                const newSize = parseFloat(currentSize) * 0.8;
                heading.style.fontSize = `${newSize}px`;
                heading.style.marginBottom = '8px';
                heading.style.marginTop = '12px';
            });
    
            // Center sections
            const sections = clonedContent.querySelectorAll('section, .section');
            sections.forEach(section => {
                section.style.marginLeft = 'auto';
                section.style.marginRight = 'auto';
                section.style.maxWidth = '100%';
            });
    
            tempContainer.appendChild(clonedContent);
            document.body.appendChild(tempContainer);
    
            try {
                const totalPages = calculatePages();
    
                for (let i = 0; i < totalPages; i++) {
                    const canvas = await html2canvas(clonedContent, {
                        scale: 2,
                        logging: false,
                        useCORS: true,
                        backgroundColor: '#ffffff',
                        width: a4WidthPx,
                        height: a4HeightPx,
                        scrollY: i * a4HeightPx,
                        windowHeight: a4HeightPx,
                        y: i * a4HeightPx,
                    });
    
                    const imgData = canvas.toDataURL('image/png', 1.0);
    
                    if (i > 0) {
                        pdf.addPage();
                    }
    
                    // Center the image on the PDF page
                    const imgWidth = a4Width;
                    const imgHeight = (canvas.height * a4Width) / canvas.width;
    
                    // Calculate vertical position to center content
                    const yPos = (a4Height - imgHeight) / 2;
    
                    pdf.addImage(imgData, 'PNG', 0, yPos > 0 ? yPos : 0, imgWidth, imgHeight);
                }
    
                pdf.save(`${parsedResume?.candidateName?.[0]?.firstName||'CV'}.pdf`);
            } catch (error) {
                console.error('Error generating PDF:', error);
            } finally {
                document.body.removeChild(tempContainer);
            }
        };



            const previewContainerRef = useRef(null);
        
            const scrollToPage = useCallback((pageNumber) => {
                if (!cvRef.current || !previewContainerRef.current || pageNumber < 1 || pageNumber > totalPages) return;
        
                const pageHeight = cvRef.current.scrollHeight / totalPages;
                const scrollPosition = (pageNumber - 1) * pageHeight;
        
                previewContainerRef.current.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
        
                setCurrentPage(pageNumber);
            }, [totalPages]);
        
            // Handle page navigation
            const goToPage = useCallback((page) => {
                scrollToPage(page);
            }, [scrollToPage]);




    const [activeTab, setActiveTab] = useState('tabPreview');

    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        headline: '',
        email: '',
        phone: '',
        address: '',
        postCode: '',
        city: '',
        summary: '',
        avatar: avatar
    });

    // State for accordion sections
    const [openSections, setOpenSections] = useState({
        personal: false,
        education: false,
        employment: false,
        skills: false,
        languages: false,
        hobbies: false
    });

    // Ref for file input
    const fileInputRef = useRef(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle avatar upload
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    avatar: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Toggle accordion sections
    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Render the component
    return (
        <div className="my-4" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
            <div className="row g-3">
                {/* LEFT: Tabs + Form */}
                <div className="col-12 col-xxl-6 col-lg-7">
                    <div className="card border h-100">
                        <div className="card-header border-bottom-0 pb-0">
                            {/* Tabs */}
                            <ul className="nav nav-underline cv-uploader-tabs" id="cvTabs" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'tabPreview' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tabPreview')}
                                    >
                                        <svg width={16} className="svg-inline--fa fa-eye" aria-hidden="true" focusable="false" data-prefix="far" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"></path>
                                        </svg>
                                        Preview
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'tabDesign' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tabDesign')}
                                    >
                                        <svg width={12} className="svg-inline--fa fa-pen-ruler" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-ruler" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z"></path>
                                        </svg>
                                        Design
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'tabAnalysis' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tabAnalysis')}
                                    >
                                        <svg width={14} className="svg-inline--fa fa-chart-line" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-line" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"></path>
                                        </svg>
                                        Analysis
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'tabMatching' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tabMatching')}
                                    >
                                        <svg width={16} className="svg-inline--fa fa-link" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="link" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                            <path fill="currentColor" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path>
                                        </svg>
                                        Job Matching
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link d-flex align-items-center gap-2 ${activeTab === 'tabCover' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('tabCover')}
                                    >
                                        <svg width={10} className="svg-inline--fa fa-file-lines" aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-lines" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                            <path fill="currentColor" d="M64 464c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0z"></path>
                                        </svg>
                                        Cover Letter
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body pt-3">


                            {/* Tab panes */}
                            <div className="tab-content" id="cvTabsContent">
                                {/* TAB: Preview (main form) */}
                                {activeTab === 'tabPreview' && (
                                    <div className="tab-pane fade active show" id="tabPreview" role="tabpanel" aria-labelledby="tabPreview-tab" tabIndex="0">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Basic Information</h4>
                                <button className="btn btn-primary btn-sm" onClick={saveChanges} disabled={saveChangesLoader}>{saveChangesLoader ? "Saving..." : "Save Changes"}</button>
                            </div>
                                        <div className="accordion" id="cvAccordion">
                                            {/* Personal details */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingPersonal">
                                                    <button
                                                        className={`accordion-button ${openSections.personal ? '' : 'collapsed'}`}
                                                        type="button"
                                                        onClick={() => toggleSection('personal')}
                                                    >
                                                        Personal details
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapsePersonal"
                                                    className={`accordion-collapse collapse ${openSections.personal ? 'show' : ''}`}
                                                    aria-labelledby="headingPersonal"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="card border-0">
                                                            {/* Avatar + Name/Headline */}
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-3 col-4">
                                                                    <div className="border rounded d-flex flex-column justify-content-center align-items-center overflow-hidden" style={{ height: '120px' }}>
                                                                        <img
                                                                            id="avatarPreview"
                                                                            alt="Profile"
                                                                            src={formData.avatar}
                                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                                        />
                                                                        <input
                                                                            id="avatarInput"
                                                                            ref={fileInputRef}
                                                                            type="file"
                                                                            accept="image/*"
                                                                            className="d-none"
                                                                            onChange={handleAvatarUpload}
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        className="btn btn-outline-secondary btn-sm w-100 mt-2"
                                                                        type="button"
                                                                        onClick={() => fileInputRef.current.click()}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-upload me-1">
                                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                                            <polyline points="17 8 12 3 7 8"></polyline>
                                                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                                                        </svg>
                                                                        Upload Photo
                                                                    </button>
                                                                </div>
                                                                <div className="col-md-9 col-8">
                                                                    <div className="row g-3">
                                                                        <div className="col-md-6">
                                                                            <label className="form-label">First Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="firstName"
                                                                                value={parsedResume?.candidateName?.[0]?.firstName || ""}
                                                                                onChange={(e) =>
                                                                                  dispatch(
                                                                                    updateField({
                                                                                      path: "candidateName[0].firstName",
                                                                                      value: e.target.value
                                                                                    })
                                                                                  )
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <label className="form-label">Last name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="lastName"
                                                                                value={`${parsedResume?.candidateName?.[0]?.familyName || ''}`}
                                                                                onChange={(e) =>
                                                                                    dispatch(
                                                                                      updateField({
                                                                                        path: "candidateName[0].familyName",
                                                                                        value: e.target.value
                                                                                      })
                                                                                    )
                                                                                  }
                                                                            />
                                                                        </div>
                                                                        <div className="col-12">
                                                                            <label className="form-label">Headline</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                name="headline"
                                                                                value={parsedResume?.headline || ''}
                                                                                onChange={(e) =>
                                                                                    dispatch(
                                                                                      updateField({
                                                                                        path: "headline",
                                                                                        value: e.target.value
                                                                                      })
                                                                                    )
                                                                                  }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Email / Phone */}
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Email address</label>
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        name="email"
                                                                        value={parsedResume?.email?.[0] || ''}
                                                                        onChange={(e) =>
                                                                            dispatch(
                                                                              updateField({
                                                                                path: "email",
                                                                                value: [e.target.value]
                                                                              })
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Phone number</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="phone"
                                                                        value={parsedResume?.phoneNumber?.[0]?.formattedNumber || ''}
                                                                        onChange={(e) =>
                                                                            dispatch(
                                                                              updateField({
                                                                                path: "phoneNumber[0].formattedNumber",
                                                                                value: e.target.value
                                                                              })
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Address */}
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-12">
                                                                    <label className="form-label">Address</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="address"
                                                                        value={parsedResume?.location?.formatted || ''}
                                                                        onChange={(e) =>
                                                                            dispatch(
                                                                              updateField({
                                                                                path: "location.formatted",
                                                                                value: e.target.value
                                                                              })
                                                                            )
                                                                          }
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Post code / City */}
                                                            <div className="row g-3 mb-3">
                                                                <div className="col-md-6">
                                                                    <label className="form-label">Post code</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="postCode"
                                                                        value={parsedResume?.location?.postCode || ''}
                                                                        onChange={(e) =>
                                                                            dispatch(
                                                                              updateField({
                                                                                path: "location.postCode",
                                                                                value: e.target.value
                                                                              })
                                                                            )
                                                                          }
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label className="form-label">City</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="city"
                                                                        value={parsedResume?.location?.city || ''}
                                                                        onChange={(e) =>
                                                                            dispatch(
                                                                              updateField({
                                                                                path: "location.city",
                                                                                value: e.target.value
                                                                              })
                                                                            )
                                                                          }
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Summary */}
                                                            <div className="row g-3">
                                                                <div className="col-12">
                                                                    <label className="form-label fw-bold small">Summary</label>
                                                                    <textarea
                                                                        rows="5"
                                                                        className="form-control"
                                                                        placeholder="Describe your professional background, key skills, achievements, and career goals. Be specific about technologies, methodologies, and results..."
                                                                        name="summary"
                                                                        value={parsedResume?.summary || ''}
                                                                        onChange={(e) =>
                                                                            dispatch(
                                                                              updateField({
                                                                                path: "summary",
                                                                                value: e.target.value
                                                                              })
                                                                            )
                                                                          }
                                                                    ></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Education */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingEducation">
                                                    <button
                                                        className={`accordion-button ${openSections.education ? '' : 'collapsed'}`}
                                                        type="button"
                                                        onClick={() => toggleSection('education')}
                                                    >
                                                        Education
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseEducation"
                                                    className={`accordion-collapse collapse ${openSections.education ? 'show' : ''}`}
                                                    aria-labelledby="headingEducation"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="card border-0">
                                                            <button type="button" className="btn btn-outline-secondary btn-sm mt-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-1">
                                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                </svg>
                                                                Add Education
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Employment */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingEmployment">
                                                    <button
                                                        className={`accordion-button ${openSections.employment ? '' : 'collapsed'}`}
                                                        type="button"
                                                        onClick={() => toggleSection('employment')}
                                                    >
                                                        Employment
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseEmployment"
                                                    className={`accordion-collapse collapse ${openSections.employment ? 'show' : ''}`}
                                                    aria-labelledby="headingEmployment"
                                                >

                                                    <div className="accordion-body">
                                                        <div className="card border-0">

                                                            <button type="button" className="btn btn-outline-secondary btn-sm mt-2" onClick={() => addSectionEmployment()}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-1">
                                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                </svg>
                                                                Add Employment
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingSkills">
                                                    <button
                                                        className={`accordion-button ${openSections.skills ? '' : 'collapsed'}`}
                                                        type="button"
                                                        onClick={() => toggleSection('skills')}
                                                    >
                                                        Skills
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseSkills"
                                                    className={`accordion-collapse collapse ${openSections.skills ? 'show' : ''}`}
                                                    aria-labelledby="headingSkills"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="card border-0">
                                                            <div className="border rounded p-3">
                                                                <label className="form-label">Add Skills (one per line)</label>
                                                                <input type="text" className="form-control me-2" placeholder="Type a skill and press Enter to add it"
                                                                value={currentSkill}
                                                                onChange={(e) => setCurrentSkill(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                                        e.preventDefault();
                                                                        handleAddSkill();
                                                                    }
                                                                }}
                                                                />
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="button" className="btn btn-outline-secondary btn-sm mt-3"
                                                                        onClick={() => {
                                                                            if (currentSkill.trim()) {
                                                                                const currentSkills = parsedResume?.skill || [];
                                                                                handleAddSkill();
                                                                                setCurrentSkill('');
                                                                            }
                                                                        }}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-1">
                                                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                        </svg>
                                                                        Add Skill
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="mt-3">
                                                                <div className="mb-3">
                                                                    <h6>Selected Skills</h6>
                                                                    <div className="d-flex flex-wrap gap-2">
                                                                    {parsedResume?.skill
                                                    ?.filter(skill => skill.selected)
                                                    .map((skill, index) => (
                                                        <span key={index} className="badge bg-primary d-inline-flex align-items-center skill-badge">
                                                            {skill.name}
                                                            <button
                                                                type="button"
                                                                className="ms-1"
                                                                aria-label="Remove"
                                                                onClick={() => {
                                                                    const updatedSkills = [...parsedResume.skill];
                                                                    updatedSkills.splice(updatedSkills.findIndex(s => s.name === skill.name), 1);
                                                                    dispatch(updateField({path:"skill", value: updatedSkills}));
                                                                }}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M18 6l-12 12" />
                                                                    <path d="M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    ))}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h6>Suggested Skills</h6>
                                                                    <div className="d-flex flex-wrap gap-2">
                                                                    {parsedResume?.skill
                                                    ?.filter(skill => !skill.selected)
                                                    .map((skill, index) => (
                                                        <span key={index} className="badge bg-secondary d-inline-flex align-items-center skill-badge">
                                                            {skill.name}
                                                            <button
                                                                type="button"
                                                                className="ms-1"
                                                                aria-label="Select"
                                                                onClick={() => {
                                                                    const updatedSkills = [...parsedResume.skill];
                                                                    const skillIndex = updatedSkills.findIndex(s => s.name === skill.name);
                                                                    updatedSkills[skillIndex] = {
                                                                        ...updatedSkills[skillIndex],
                                                                        selected: true
                                                                    };
                                                                    dispatch(updateField({ path:"skill", value: updatedSkills}));
                                                                }}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-check">
                                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                    <path d="M5 12l5 5l10 -10" />
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <small className="text-muted d-block">Type a skill and press Enter or click Add</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Languages */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingLanguages">
                                                    <button
                                                        className={`accordion-button ${openSections.languages ? '' : 'collapsed'}`}
                                                        type="button"
                                                        onClick={() => toggleSection('languages')}
                                                    >
                                                        Languages
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseLanguages"
                                                    className={`accordion-collapse collapse ${openSections.languages ? 'show' : ''}`}
                                                    aria-labelledby="headingLanguages"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="card border-0">
                                                            <div className="border rounded p-3">
                                                                <label className="form-label">Add Language</label>
                                                                <div className="row g-2">
                                                                    <div className="col-md-8">
                                                                        <input type="text" className="form-control" placeholder="Language name"
                                                                         value={currentLanguage}
                                                                         onChange={(e) => setCurrentLanguage(e.target.value)}
                                                                         onKeyDown={(e) => {
                                                                             if (e.key === 'Enter' && !e.shiftKey) {
                                                                                 e.preventDefault();
                                                                                 handleAddLanguage();
                                                                             }
                                                                         }}
                                                                        />
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <select className="form-select"
                                                                        value={languageLevel}
                                                                        onChange={(e) => setLanguageLevel(e.target.value)}
                                                                        >
                                                                            <option value="Beginner">Beginner</option>
                                                                            <option value="Intermediate">Intermediate</option>
                                                                            <option value="Advanced">Advanced</option>
                                                                            <option value="Native">Native</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="button" className="btn btn-outline-secondary btn-sm mt-3"
                                                                      onClick={handleAddLanguage}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-1">
                                                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                        </svg>
                                                                        Add Language
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 d-flex flex-wrap gap-2">

                                                            {parsedResume?.languages?.map((lang, index) => (
                                            <span key={index} className="badge bg-secondary d-inline-flex align-items-center skill-badge">
                                                {lang.name} ({lang.level})
                                                <button
                                                    type="button"
                                                    className=""
                                                    aria-label="Remove"
                                                    onClick={() => {
                                                        const updatedLangs = [...parsedResume.languages];
                                                        updatedLangs.splice(index, 1);
                                                        dispatch(updateField({ path:"languages", value:updatedLangs}));
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                                </button>
                                            </span>
                                        ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hobbies */}
                                            <div className="accordion-item">
                                                <h2 className="accordion-header" id="headingHobbies">
                                                    <button
                                                        className={`accordion-button ${openSections.hobbies ? '' : 'collapsed'}`}
                                                        type="button"
                                                        onClick={() => toggleSection('hobbies')}
                                                    >
                                                        Hobbies
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseHobbies"
                                                    className={`accordion-collapse collapse ${openSections.hobbies ? 'show' : ''}`}
                                                    aria-labelledby="headingHobbies"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="card border-0">
                                                            <div className="border rounded p-3">
                                                                <label className="form-label">Add Hobby</label>
                                                                <input type="text" className="form-control" placeholder="Hobby name"
                                                                value={currentHobby}
                                                                onChange={(e) => setCurrentHobby(e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                                        e.preventDefault();
                                                                        handleAddHobby();
                                                                    }
                                                                }}
                                                                />
                                                                <div className="d-flex justify-content-end">
                                                                    <button type="button" className="btn btn-outline-secondary btn-sm mt-3" onClick={handleAddHobby}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-1">
                                                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                        </svg>
                                                                        Add Hobby
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 d-flex flex-wrap gap-2">

                                                                {parsedResume?.hobbies?.map((hobby, index) => (
                                                                      <span key={index} className="badge bg-secondary d-inline-flex align-items-center skill-badge">
                                                                          {hobby}
                                                                          <button
                                                                              type="button"
                                                                              className="ms-2"
                                                                              aria-label="Remove"
                                                                              onClick={() => {
                                                                                  const updatedHobbies = [...parsedResume.hobbies];
                                                                                  updatedHobbies.splice(index, 1);
                                                                                  dispatch(updateField({ path:"hobbies", value:updatedHobbies}));
                                                                              }}
                                                                          >
                                                                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                                                                          </button>
                                                                      </span>
                                                                  ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Prev/Next */}
                                        <div className="card border-0 shadow-sm mt-3">
                                            <div className="card-body p-3 d-flex justify-content-between align-items-center">
                                                <button type="button" className="btn btn-outline-primary d-flex align-items-center gap-2" disabled="">
                                                    <span aria-hidden="true">←</span> Previous
                                                </button>
                                                <button type="button" className="btn btn-primary d-flex align-items-center gap-2">
                                                    Next <span aria-hidden="true">→</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* TAB placeholders */}
                                {activeTab === 'tabDesign' && (
                                    <div className={`tab-pane fade ${activeTab === 'tabDesign' ? 'show active' : ''}`} id="tabDesign" role="tabpanel" aria-labelledby="tabDesign-tab" tabIndex="0">
                                        <div className="card border-0 shadow-sm"><div className="card-body">          
                                            <Row className="g-4">
                                {cardTemplate.map((template) => (
                                    <Col key={template.name} xs={6} sm={6} md={4} lg={3} xl={2}>
                                        <div 
                                            className={`template-card p-3 text-center cursor-pointer ${selectedTemplate === template.name ? 'border border-primary rounded-3' : 'border border-light-subtle rounded-3'}`}
                                            onClick={() => handleTemplateChange(template.name)}
                                            style={{
                                                transition: 'all 0.2s ease-in-out',
                                                height: '100%',
                                                backgroundColor: selectedTemplate === template.name ? 'rgba(13, 110, 253, 0.05)' : 'white'
                                            }}
                                        >
                                            <div className="position-relative mb-3" style={{ paddingTop: '141.4%' }}>
                                                <img
                                                    src={`/assets/images/${template.image}`}
                                                    alt={template.name}
                                                    className="img-fluid position-absolute top-0 start-0 w-100 h-100 object-fit-cover rounded-2 border"
                                                    style={{
                                                        objectFit: 'cover',
                                                        transition: 'transform 0.3s ease-in-out',
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                />
                                                {selectedTemplate === template.name && (
                                                    <div className="position-absolute top-0 end-0 m-2">
                                                        <span className="badge bg-primary rounded-pill">
                                                            <i className="fas fa-check"></i> Selected
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <h6 className="mb-0 fw-medium">{template.name}</h6>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                                </div></div>
                                    </div>
                                )}
                                {activeTab === 'tabAnalysis' && (
                                    <div className="tab-pane fade" id="tabAnalysis" role="tabpanel" aria-labelledby="tabAnalysis-tab" tabIndex="0">
                                        <div className="card border-0 shadow-sm"><div className="card-body">Analysis goes here.</div></div>
                                    </div>
                                )}
                                {activeTab === 'tabMatching' && (
                                    <div className="tab-pane fade" id="tabMatching" role="tabpanel" aria-labelledby="tabMatching-tab" tabIndex="0">
                                        <div className="card border-0 shadow-sm"><div className="card-body">Job matching goes here.</div></div>
                                    </div>
                                )}
                                {activeTab === 'tabCover' && (
                                    <div className="tab-pane fade" id="tabCover" role="tabpanel" aria-labelledby="tabCover-tab" tabIndex="0">
                                        <div className="card border-0 shadow-sm"><div className="card-body">Cover letter tools go here.</div></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Col lg={5} xxl={6} className='right-section'>
                                    <Card className="border-0 shadow-custom mb-3">
                                        <Card.Header className="bg-white border-bottom p-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h5 className="mb-0 fw-semibold" style={{ fontSize: '1.1rem' }}>CV Preview</h5>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="d-flex align-items-center gap-1">
                                                        <Button variant="outline-primary" size="sm" onClick={zoomOut}>
                                                            <FiMinus />
                                                        </Button>
                                                        <Button variant="outline-primary" size="sm" onClick={zoomIn}>
                                                            <FiPlus />
                                                        </Button>
                                                        {/* <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={handleUploadNew}
                                                            className="btn btn-outline-primary"
                                                        >
                                                            <FiUpload size={14} /> 
                                                            <span className="d-none d-xl-inline ms-1">New Upload</span>
                                                        </Button> */}
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={handleDownloadPDF}
                                                            className="btn btn-outline-primary"
                                                        >
                                                            {/* <FiDownload size={14} />  */}
                                                            <span className="d-none d-xl-inline ms-1">Download PDF</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </Card.Header>
                                        <div
                                            ref={previewContainerRef}
                                            className="cv-template-div"
                                        >
                                            <div
                                                ref={cvRef}
                                                style={{
                                                    background: 'white',
                                                    padding: '16px',
                                                    minHeight: `${Math.max(1, totalPages) * 1080}px`,
                                                    transform: `scale(${zoom})`,
                                                    transformOrigin: 'top center',
                                                    transition: 'transform 0.2s ease-in-out',
                                                }}
                                            >
                                                {(() => {
                                                    const selectedTemplateData = cardTemplate.find(t => t.name === selectedTemplate);
                                                    if (!selectedTemplateData) {
                                                        return <div className="alert alert-warning">Please select a template</div>;
                                                    }

                                                    const TemplateComponent = selectedTemplateData.template;
                                                    return (
                                                        <TemplateComponent
                                                            resumeData={{
                                                                ...(parsedResume || {
                                                                    candidateName: [{ firstName: '', familyName: '' }],
                                                                    headline: '',
                                                                    summary: '',
                                                                    phoneNumber: [{ formattedNumber: '' }],
                                                                    email: [''],
                                                                    location: { formatted: '' },
                                                                    workExperience: [],
                                                                    education: [],
                                                                    skill: [],
                                                                    profilePic: null,
                                                                    website: [''],
                                                                    certifications: [],
                                                                    languages: [],
                                                                    hobbies: []
                                                                }),
                                                                customSections
                                                            }}
                                                        />
                                                    );
                                                })()}
                                            </div>

                                            {/* Only show page dividers if we have multiple pages with content */}
                                            {totalPages > 1 && Array.from({ length: totalPages - 1 }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        right: 0,
                                                        top: `${(index + 1) * 1123}px`,
                                                        borderTop: '2px dashed #ccc',
                                                        pointerEvents: 'none'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </Card>
                                    <Card className="border-0 shadow-custom">
                                        <Card.Body className="p-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {/* <Button
                                                    variant="outline-primary"
                                                    onClick={handlePreviousStep}
                                                    disabled={activeTab === "Preview"}
                                                    className="d-flex align-items-center gap-2"
                                                >
                                                    <FiChevronLeft /> Previous
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    onClick={handleNextStep}
                                                    disabled={activeTab === "Cover Letter"}
                                                    className="d-flex align-items-center gap-2"
                                                >
                                                    Next <FiChevronRight />
                                                </Button> */}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
            </div>
        </div>
    );
}