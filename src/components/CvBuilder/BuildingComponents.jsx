import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { createEmptyResume , uploadExistingResume , updateResumeById , generateCvAi , getrecentCvsCreated , delCreatedCv } from '../../features/resume/resumeSlice';
import { toast } from 'react-toastify';
import { FiLoader, FiInfo  } from "react-icons/fi";

export default function BuildingComponents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error ,AiCvLoader , emptyResumeLoader , recentCVsLoader , recentCVs ,delResumeLoader} = useSelector((state) => state.resume);

    const [show, setShow] = useState(false);
    const [profTitle, setProfTitle] = useState("");
    const [profSummary, setProfSummary] = useState("");


    const [formData, setFormData] = useState({
        jobTitle: "",
        description: "",
      });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(()=>{
        dispatch(getrecentCvsCreated());
    },[])

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // You can send form data to backend or redirect here
    //     console.log("Form Submitted:", { profTitle, profSummary });
    //     // Example: redirect to cv-generate.html
    //     window.location.href = "/cv-generate";
    // };


    const handleAICV = async () => {
        handleShow();
    };

      const handleManualCV = async () => {
        const emptyResume = {
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
        };

        try {
          const resultAction = await dispatch(createEmptyResume(emptyResume)).unwrap();
          
          if (resultAction?.data?.id) {
            navigate(`/cv-generate/${resultAction.data.id}`);
            // Show success message
            toast.success('Empty resume created successfully! Start editing your CV.');
          }
        } catch (error) {
          console.error('Error creating empty resume:', error);
          toast.error(error?.message || "Failed to create empty resume. Please try again.");
        }
    };


    const handleCvAiUpload = async () => {

        const emptyResume = {
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
          };
  
          try {
            const resultAction = await dispatch(createEmptyResume(emptyResume)).unwrap();
            
            if (resultAction?.data?.id) {
                
                const resumeId = resultAction.data.id;
                
                try {
                    const resultAction = await dispatch(generateCvAi(formData)).unwrap();
                    
                    const updatedResume = {
                        ...resultAction.data,
                        id: resumeId,
                        template: "Default"
                    }
                    dispatch(updateResumeById({id: resumeId , parsedResume: updatedResume}))

                    navigate(`/cv-generate/${resumeId}`);
                    // if (resultAction?.data?.id) {
                    //     const updatedResume = {
                    //         ...emptyResume,
                    //         id: resultAction.data.id
                    //       }
        
                    //     dispatch(updateResumeById({id: resultAction.data.id , parsedResume: updatedResume}))
        
                    //     handleShow();
        
                    // //   navigate(`/cv-generate/${resultAction.data.id}`);
                    //   // Show success message
                    //   toast.success('Empty resume created successfully! Start editing your CV.');
                    // }
                  } catch (error) {
                    console.error('Error creating empty resume:', error);
                    toast.error(error?.message || "Failed to create empty resume. Please try again.");
                  }

            //   navigate(`/cv-generate/${resultAction.data.id}`);
              // Show success message
              toast.success('Empty resume created successfully! Start editing your CV.');
            }
          } catch (error) {
            console.error('Error creating empty resume:', error);
            toast.error(error?.message || "Failed to create empty resume. Please try again.");
          }
        
    }



    const [uploadinginfo , setuploadinginfo] = useState(false);



    const DeleteCv = async (id) => {
      const ReturnAction = await dispatch(delCreatedCv(id)).unwrap();
      console.log(ReturnAction);
    }

    const handleExistingCvUpload = async (file) => {
      if (!file) {
        toast.error('Please select a file to upload');
        return;
      }

      console.log('Selected file:', file);
      
      // Create new FormData instance
      const formData = new FormData();
      // Append the file with the correct field name that the server expects
      formData.append('file', file);
      
      setTimeout(() => {
        setuploadinginfo(true);
      }, 4000); 


      try {

        // Dispatch the action and wait for it to complete
        const resultAction = await dispatch(uploadExistingResume(formData)).unwrap();
        
        console.log('Server response:', resultAction);
        
        if (resultAction?.data) {
            toast.success('Resume uploaded successfully!');
            try {
                const resultAction2 = await dispatch(createEmptyResume(resultAction.data)).unwrap();
                
                if (resultAction2?.data?.id) {
                  navigate(`/cv-generate/${resultAction2.data.id}`);
                  // Show success message
                  toast.success('Resume created successfully! Start editing your CV.');
                }
              } catch (error) {
                console.error('Error creating empty resume:', error);
                toast.error(error?.message || "Failed to create empty resume. Please try again.");
              }

        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Upload error:', error);
        const errorMessage = error?.response?.data?.message || error?.message || 'Failed to upload file';
        toast.error(`Upload failed: ${errorMessage}`);
      }
    }



    return (
        <>
            <div className="row mb-3 g-3 feature-cards">
                <div className="col-12 col-xl-3">
                    <div className="card border h-100 w-100 overflow-hidden position-relative">
                        <div className="card-body px-6 py-6 position-relative text-center">
                            <div
                                className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                style={{ backgroundColor: '#ece5fc' }}>
                                <svg width={20} className="svg-inline--fa fa-file-import fs-7" style={{ color: '#ba67ef' }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-import" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z"></path></svg>
                            </div>
                            <h4 className="my-3">Upload an existing CV</h4>
                            <p className="fs-8">
                                Upload your existing CV and proceed with keyword optimisation for ATS compatibility.
                            </p>

                            <input
                                id="cvUpload"
                                type="file"
                                className="visually-hidden"
                                disabled={loading}
                                onChange={(e) => {
                                    if (loading) return;
                                    const file = e.target.files[0];
                                    if (file) {
                                        handleExistingCvUpload(file);
                                    }
                                    // Reset the input to allow selecting the same file again
                                    e.target.value = null;
                                }}
                                accept=".pdf,.doc,.docx,.rtf,.odt" />
                            <label
                                htmlFor="cvUpload"
                                className={`btn btn-primary w-100 stretched-link ${emptyResumeLoader || loading || AiCvLoader ? 'disabled' : ''}`}
                                aria-disabled={emptyResumeLoader || loading || AiCvLoader}
                                style={{ pointerEvents: emptyResumeLoader || loading || AiCvLoader ? 'none' : 'auto', opacity: emptyResumeLoader || loading || AiCvLoader ? 0.65 : 1 }}
                            >
                                {loading ? (<><FiLoader size={14} className="me-2 animate-spin" />Launching...</>)  : "Upload Now"}
                            </label>
                            <small id="cvUploadName" className={`mt-2 text-body-secondary ${uploadinginfo ? 'd-block' : 'd-none'}`}>
                                <FiInfo className="me-1" /> Uploading your CV for analysis — this may take up to a minute.
                            </small>
                        </div>
                    </div>
                </div>

                {/* <div className="col-12 col-xl-4">
                    <div className="card border h-100 w-100 overflow-hidden position-relative">
                        <div className="card-body px-6 py-6 position-relative text-center">
                            <div
                                className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                style={{ backgroundColor: '#ece5fc' }}>
                                <svg width={20} className="svg-inline--fa fa-file-pen fs-7" style={{ color: '#ba67ef' }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-pen" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 125.7-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"></path></svg>
                            </div>
                            <h4 className="my-3">Build from scratch</h4>
                            <p className="fs-8">
                                Build your CV from scratch, using clean, modern templates designed for recruiters.
                            </p>
                            <Button className="stretched-link btn btn-primary w-100" onClick={handleManualCV} disabled={emptyResumeLoader || loading || AiCvLoader}
                            >{emptyResumeLoader ?  (<><FiLoader size={14} className="me-2 animate-spin" />Launching...</>)  : 'Launch CV Builder'}</Button>
                        </div>
                    </div>
                </div> */}
                <div className="col-12 col-xl-3">
                    <div className="card border h-100 w-100 overflow-hidden position-relative">
                        <div className="card-body px-6 py-6 position-relative text-center">
                            <div
                                className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                style={{ backgroundColor: '#ece5fc' }}>
                                <svg width={20} className="svg-inline--fa fa-microchip fs-7" style={{ color: '#ba67ef' }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microchip" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M176 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c-35.3 0-64 28.7-64 64l-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0 0 56-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0 0 56-40 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l40 0c0 35.3 28.7 64 64 64l0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40 56 0 0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40 56 0 0 40c0 13.3 10.7 24 24 24s24-10.7 24-24l0-40c35.3 0 64-28.7 64-64l40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0 0-56 40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0 0-56 40 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-40 0c0-35.3-28.7-64-64-64l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40-56 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40-56 0 0-40zM160 128l192 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32l0-192c0-17.7 14.3-32 32-32zm192 32l-192 0 0 192 192 0 0-192z"></path></svg>
                            </div>
                            <h4 className="my-3">Generate with AI</h4>
                            <p className="fs-8">Track your progress, stay organised, and see where you can improve.</p>


                            <button
                                type="button"
                                className="stretched-link btn btn-primary w-100"
                                onClick={handleAICV}
                                disabled={emptyResumeLoader || loading || AiCvLoader}
                                >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
                            {Array.isArray(recentCVs) && recentCVs.length > 0 ? (
                <div class="col-12 col-xl-6">
                        <div class="card border h-100 w-100 overflow-hidden position-relative">
                            <div class="card-body position-relative text-center">
              
  <div className="table-responsive">
    <table className="table table-hover align-middle mb-0 cv-table">
      <thead className="table-light">
        <tr>
          <th scope="col" className="text-start ps-0 bg-white">CV Title</th>
          <th scope="col" className="bg-white">Date Created</th>
          <th scope="col" className="bg-white text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        {recentCVs.map((item, index) => (
          <tr key={index}>
            <td className="text-start">
              {item?.resume?.cv_resumejson?.candidateName?.[0]?.firstName || ''}{" "}
              {item?.resume?.cv_resumejson?.candidateName?.[0]?.familyName || ''} CV
            </td>
            <td>{item?.created_at ? new Date(item.created_at).toLocaleDateString() : ''}</td>
            <td className="text-end">
              <a href={`/cv-generate/${item?.resume?.id}`} className="btn btn-sm btn-outline-primary me-2">
                 View
              </a>
              <a href={`/cv-generate/${item?.resume?.id}?download=true`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary me-2">
                 Download
              </a>
              <button onClick={()=>{DeleteCv(item?.resume?.id)}}  className="btn btn-sm btn-darnger" style={{"background-color":"red", "color":"white"}}>
                 Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

    </div>
  </div>
</div>
) : null}
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"
                keyboard={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Build Your AI-Powered CV</Modal.Title>
                </Modal.Header>

                <Form id="aiGenerateForm" >
                    <Modal.Body>
                        {/* Professional Title */}
                        {/* <Form.Group className="mb-3 text-start" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                                <span className="fas fa-briefcase text-body fs-9 form-icon" />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                                <span className="fas fa-briefcase text-body fs-9 form-icon" />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    type="email"
                                    placeholder="e.g., your.email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                                <span className="fas fa-briefcase text-body fs-9 form-icon" />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., +1234567890"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                                <span className="fas fa-briefcase text-body fs-9 form-icon" />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3 text-start" controlId="address">
                            <Form.Label> Address</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., 123 Main St, Anytown, USA"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    required
                                />
                                <span className="fas fa-briefcase text-body fs-9 form-icon" />
                            </div>
                        </Form.Group> */}
                        <Form.Group className="mb-3 text-start" controlId="profTitle">
                            <Form.Label>Professional Title</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    type="text"
                                    placeholder="e.g., Senior Software Engineer"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    required
                                />
                                <span className="fas fa-briefcase text-body fs-9 form-icon" />
                            </div>
                        </Form.Group>

                        {/* Professional Summary */}
                        <Form.Group className="mb-3 text-start" controlId="description">
                            <Form.Label>Professional Summary</Form.Label>
                            <div className="form-icon-container">
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    placeholder="Describe your professional background, key skills, achievements, and career goals..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                                <span className="fas fa-align-left text-body fs-9 form-icon" />
                            </div>
                            <Form.Text>Tip: aim for 3–6 concise sentences.</Form.Text>
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="link" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="button" variant="primary" onClick={handleCvAiUpload} disabled={AiCvLoader}>
                            {AiCvLoader ? "Generating..." : "Generate"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
