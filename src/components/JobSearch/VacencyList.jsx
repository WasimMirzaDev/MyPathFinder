import React, { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Avatar from '../../assets/images/MPF-180x180.png'
import { Button , Modal , Badge} from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {fetchJobs , setfilteredJobs} from "../../features/job/jobSlice";
import {PulseLoader } from "react-spinners";
import {updateCompletedSteps} from "../../features/user/userSlice";

const VacanciesList = () => {
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = useState("frontend developer");
    const [location, setLocation] = useState("uk");
    const [country, setCountry] = useState("uk");
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [salaryRange, setSalaryRange] = useState("");
    const { filteredJobs , jobs , loading , error } = useSelector((state) => state.job);
    const [selectedJob, setSelectedJob] = useState(null);
    const { data } = useSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
    
    const ukCities = [
        "All",
        "London",
        "Birmingham",
        "Glasgow",
        "Manchester",
        "Liverpool",
        "Bristol",
        "Leeds",
        "Sheffield",
        "Edinburgh",
        "Cardiff",
        "Belfast",
        "Newcastle upon Tyne",
        "Nottingham",
        "Coventry",
        "Leicester",
        "Bradford",
        "Aberdeen",
        "Stoke-on-Trent",
        "Wolverhampton",
        "Plymouth",
        "Southampton",
        "Derby",
        "Brighton and Hove",
        "Cambridge",
        "Oxford",
        "Milton Keynes",
        "Portsmouth",
        "York",
        "Swansea",
        "Dundee",
        "Norwich",
        "Exeter",
        "Gloucester",
        "Salford",
        "Peterborough",
        "Canterbury",
        "Bath",
        "Chester",
        "Durham",
        "Lincoln",
        "St Davids"
    ];
    
    
    const [salaryRanges, setSalaryRanges] = useState([
        { label: "All Salaries", value: "0-0" },
        { label: "£20,000 +", value: "20000-1000000" },
        { label: "£25,000 +", value: "25000-1000000" },
        { label: "£30,000 +", value: "30000-1000000" },
        { label: "£35,000 +", value: "35000-1000000" },
        { label: "£40,000 +", value: "40000-1000000" },
        { label: "£50,000 +", value: "50000-1000000" },
        { label: "£60,000 +", value: "60000-1000000" },
        { label: "£70,000 +", value: "70000-1000000" },
        { label: "£80,000 +", value: "80000-1000000" },
        { label: "£100,000 +", value: "100000-1000000" },
        { label: "£150,000+", value: "150000-1000000" }
      ]);



    const handleJobSearch = () =>{
        dispatch(fetchJobs({searchQuery,location,country}))
    }


    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowFullDescription(false);
        setShowModal(false);
        setSelectedJob(null);
      };

      const handleJobRedirect = async (link) => {
        try {
          const formData = new FormData();
          formData.append("applied_job", "true"); // Send as string "true"
          
          await dispatch(updateCompletedSteps(formData)).unwrap();
          window.open(link, "_blank");
        } catch (error) {
          console.error("Error updating steps:", error);
          window.open(link, "_blank");
        }
      };
      





    // const [vacancies] = useState([
    //     {
    //         position: "Senior Software Developer",
    //         location: "Manchester",
    //         date: "01/08/2025",
    //         salary: "£53,000+",
    //         applyNow: "#",
    //         applyWithMpf: "#"
    //     },
    //     {
    //         position: "Team Leader",
    //         location: "Stockport",
    //         date: "01/08/2025",
    //         salary: "£60,000+",
    //         applyNow:
    //             "https://uk.indeed.com/cmp/Clear-Business?from=mobviewjob&tk=1j31b3rm7l13m81f&fromjk=82f6edbbb857fc35&attributionid=mobvjcmp",
    //         applyWithMpf: "#pdfModal"
    //     }
    // ]);

    // Transform jobs data for DataTable
    const vacancies = useMemo(() => {
        if (!filteredJobs || filteredJobs.length === 0) {
            return [
            ];
        }
        
        return filteredJobs.map(job => ({
            position: job.job_title || "N/A",
            company: job.employer_name || "N/A",
            location: job.job_location || "N/A",
            date: job.job_posted_at || (job.created_at ? new Date(job.created_at).toLocaleDateString() : "N/A"),
            salary: job.job_min_salary || job.job_max_salary ? (
                `${job.job_salary_currency || '£'} ${job.job_min_salary === job.job_max_salary
                    ? job.job_min_salary.toLocaleString()
                    : `${job.job_min_salary?.toLocaleString() || '0'} - ${job.job_max_salary?.toLocaleString()}`
                }/year`
            ) : "Not specified",
            applyNow: job.job_url || "#",
            applyWithMpf: "#",
            job_id: job.job_id,
            employer_logo: job.employer_logo,
            full_job:job
        }));
    }, [filteredJobs]);

    // ✅ Define DataTable columns
    const columns = useMemo(
        () => [
            {
                name: ( <strong>Job Position</strong> ),
                selector: (row) => row.position,
                sortable: true,
                cell: (row) => (
                    <div className="d-flex align-items-center" onClick={() => {handleJobClick(row.full_job)}}>
                        {row.employer_logo && (
                            <img 
                                src={row.employer_logo} 
                                alt={row.company}
                                className="me-2"
                                style={{ 
                                    width: '24px', 
                                    height: '24px', 
                                    objectFit: 'contain',
                                    borderRadius: '4px'
                                }}
                            />
                        )}
                        <span className="fw-bold text-primary">
                        {row.position.split(' ').length > 7
                            ? row.position.split(' ').slice(0, 7).join(' ') + '...' 
                            : row.position}
                        </span>
                    </div>
                ),
                minWidth: '250px',
            },
            {
                name: ( <strong>Company</strong> ),
                selector: (row) => row.company,
                sortable: true,
                maxWidth: '150px'
            },
            {
                name: ( <strong>Location</strong> ),
                selector: (row) => row.location,
                sortable: true,
                maxWidth: '160px'
            },
            {
                name: ( <strong>Date</strong> ),
                selector: (row) => row.date,
                sortable: true,
                maxWidth: '140px'
            },
            {
                name: ( <strong>Salary</strong> ),
                selector: (row) => row.salary,
                sortable: true,
                maxWidth: '160px'
            },
            {
                name: ( <strong>Actions</strong> ),
                cell: (row) => (
                    <div className="d-flex gap-2">
                        {/* Apply Now */}
                        <button
                            className="badge bg-secondary-subtle text-secondary-dark border"
                            onClick={() => {handleJobClick(row.full_job)}}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Apply Now 
                        </button>

                        {/* Apply with MPF */}
                        {row.applyWithMpf.startsWith("#") ? (
                            <a
                                className="badge"
                                style={{ backgroundColor: "#ece5fc", color: "#BA67EF" }}
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target={row.applyWithMpf}
                            >
                                Apply with MPF CV 
                            </a>
                        ) : (
                            <a
                                className="badge"
                                style={{ backgroundColor: "#ece5fc", color: "#BA67EF" }}
                                href={row.applyWithMpf}
                            >
                                Apply with MPF CV 
                            </a>
                        )}
                    </div>
                ),
                minWidth: '220px',
            }
        ],
        []
    );

    return (
        <div className="pb-9">
            <div className="row g-4 g-xl-6">



                {/* Sidebar */}
                <div className="col-xl-5 col-xxl-4">
                    <div className="sticky-leads-sidebar">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center g-3">
                                    <div className="col-12 col-sm-auto flex-1">
                                        <div className="d-md-flex d-xl-block align-items-center justify-content-between">
                                            <div className="d-flex align-items-center mb-3 mb-md-0 mb-xl-3">
                                                <div className="avatar avatar-xl me-3">
                                                    <img
                                                        className="rounded-circle"
                                                        src={Avatar}
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <h4>{data?.name}</h4>
                                                    <div className="dropdown">
                                                        <a
                                                            className="text-body-secondary dropdown-toggle text-decoration-none dropdown-caret-none"
                                                            href="#!"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            {data?.role?.name}
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div>
                                                <span className="badge badge-phoenix badge-phoenix-secondary me-2">
                                                    Skill 1
                                                </span>
                                                <span className="badge badge-phoenix badge-phoenix-secondary me-2">
                                                    Skill 2
                                                </span>
                                                <span className="badge badge-phoenix badge-phoenix-secondary me-2">
                                                    Skill 3
                                                </span>
                                                <span className="badge badge-phoenix badge-phoenix-secondary">
                                                    Skill 4
                                                </span>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-12">
                                        <div className="mb-4">
                                            <div className="d-flex flex-wrap justify-content-between mb-2">
                                                <h5 className="mb-0 text-body-highlight me-2">Job Title</h5>
                                            </div>
                                            <input className="form-select mb-3"  value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
                                        </div>
                                        {/* <div className="mb-4">
                                            <div className="d-flex flex-wrap justify-content-between mb-2">
                                                <h5 className="mb-0 text-body-highlight me-2">Industry</h5>
                                            </div>
                                            <select className="form-select mb-3" aria-label="category">
                                                <option value="tech">Tech</option>
                                                <option value="finance">Finance</option>
                                                <option value="marketing">Marketing</option>
                                                <option value="e-commerce">E-commerce</option>
                                                <option value="catering">Catering</option>
                                            </select>
                                        </div> */}
                                        <div className="mb-4">
                                            <h5 className="mb-0 text-body-highlight mb-2">Location</h5>
                                             <select onChange={(e)=>{setLocation(e.target.value == "All" ? "uk": e.target.value )}} className="form-select mb-3" aria-label="priority">
                                                 {ukCities.map((city, index)=>(
                                                 <option key={index} value={city}>
                                                     {city}
                                                 </option>
                                                 ))}
                                            </select>
                                        </div>
                                        {/* <div className="mb-4">
                                            <h5 className="mb-0 text-body-highlight mb-2">Date Posted</h5>
                                            <select className="form-select mb-3" aria-label="stage">
                                                <option value="any">Any time</option>
                                            </select>
                                        </div> */}
                                        <div>
                                            <div className="d-flex flex-wrap justify-content-between mb-2">
                                                <h5 className="mb-0 text-body-highlight me-2">
                                                    Salary Expectation
                                                </h5>
                                            </div>
                                            <select className="form-select mb-3" aria-label="lead-source"
                                             value={salaryRange}
                                             onChange={(e) => {
                                               setSalaryRange(e.target.value);
                                               if (e.target.value === "0-0") {
                                                 // For "All Salaries" option, show all jobs with 0/null at bottom
                                                 const sortedJobs = [...jobs].sort((a, b) => {
                                                   const aSalary = a.job_max_salary ?? a.job_min_salary ?? 0;
                                                   const bSalary = b.job_max_salary ?? b.job_min_salary ?? 0;
                                                   if (aSalary === 0 && bSalary === 0) return 0;
                                                   if (aSalary === 0) return 1;
                                                   if (bSalary === 0) return -1;
                                                   return bSalary - aSalary; // Sort by salary in descending order
                                                 });
                                                 dispatch(setfilteredJobs(sortedJobs));
                                                 return;
                                               }
                                               
                                               const [min, max] = e.target.value.split("-").map(Number);
                                               // First filter, then sort
                                               const filteredAndSorted = [...jobs]
                                                 .filter(job => {
                                                   const salary = job.job_max_salary ?? job.job_min_salary ?? 0;
                                                   // Include jobs within range OR jobs with 0/null salary
                                                   return (salary >= min && salary <= max) || salary === 0;
                                                 })
                                                 .sort((a, b) => {
                                                   const aSalary = a.job_max_salary ?? a.job_min_salary ?? 0;
                                                   const bSalary = b.job_max_salary ?? b.job_min_salary ?? 0;
                                                   // Push 0/null salaries to bottom
                                                   if (aSalary === 0 && bSalary === 0) return 0;
                                                   if (aSalary === 0) return 1;
                                                   if (bSalary === 0) return -1;
                                                   // Sort by salary in descending order
                                                   return bSalary - aSalary;
                                                 });
                                                 
                                                dispatch(setfilteredJobs(filteredAndSorted));
                                             }}
                                            
                                            >
                                                {salaryRanges.map((range, index) => (
                                                  <option key={index} value={range.value}>
                                                    {range.label}
                                                  </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <Button className="text-align-center d-flex justify-content-center" style={{height:"40px"}} disabled={loading} onClick={handleJobSearch}>
                                        {loading ? <PulseLoader  color="#fff" size={13}/>  : (
                                            <>
                                                <FiSearch fontSize={14}/>
                                                &nbsp; Search
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                {/* Vacancies Table */}
                                <div className="col-xl-7 col-xxl-8">
                    {/* <div className="row g-3 justify-content-between mb-2">
                        <div className="col-12">
                            <div className="d-md-flex justify-content-between">
                                <div className="d-flex mb-3">
                                    <div className="search-box me-2">
                                        <form className="position-relative">
                                            <input
                                                className="form-control search-input search"
                                                type="search"
                                                placeholder="Search vacancies"
                                                aria-label="Search"
                                            />
                                            <svg width={13} className="svg-inline--fa fa-magnifying-glass search-box-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Table */}
                    <div className="row g-3">
                        <div className="col-12">
                            <div className="card h-100">
                                <div className="card-body py-0 scrollbar to-do-list-body">
                                    <DataTable
                                        columns={columns}
                                        data={vacancies}
                                        responsive
                                        persistTableHead
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
      {/* Job Details Modal */}
      <Modal
        show={showModal}
        style={{ zIndex: 1050 }}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        {selectedJob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.job_title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <h5>{selectedJob.employer_name}</h5>
                <div className="d-flex flex-wrap gap-2 mb-2">
                  <Badge bg="primary">{selectedJob.job_employment_type}</Badge>
                  {selectedJob.job_is_remote && (
                    <Badge bg="success">Remote</Badge>
                  )}
                  <Badge bg="info">{selectedJob.job_location}</Badge>
                </div>
                {selectedJob.job_posted_at && (
                  <p className="text-muted">
                    Posted: {selectedJob.job_posted_at}
                  </p>
                )}
{(selectedJob.job_min_salary || selectedJob.job_max_salary) ? (
  <div className="mt-2">
    <span className="fw-bold">
      {selectedJob.job_salary_currency} {selectedJob.job_min_salary === selectedJob.job_max_salary
        ? `${selectedJob.job_min_salary.toLocaleString()}/year`
        : `${selectedJob.job_min_salary.toLocaleString()} - ${selectedJob.job_max_salary.toLocaleString()}/year`}
    </span>
  </div>
) : (
  <span className="text-muted">Salary not specified</span>
)}
              </div>

              <div className="mb-3">
  <h6>Job Description</h6>
  <div 
    style={{ 
      maxHeight: showFullDescription ? 'none' : '150px', 
      overflow: 'hidden',
      position: 'relative'
    }}
  >
    <p style={{ whiteSpace: 'pre-line' }}>{selectedJob.job_description}</p>
    {!showFullDescription && (
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)'
        }}
      />
    )}
  </div>
  {selectedJob.job_description && selectedJob.job_description.split(/\s+/).length > 100 && (
    <button 
      onClick={() => setShowFullDescription(!showFullDescription)}
      className="btn btn-link p-0 text-primary mt-2"
      style={{ 
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500
      }}
    >
      {showFullDescription ? 'Show Less' : 'Read More'}
    </button>
  )}
</div>

              {selectedJob.job_highlights &&
                Object.keys(selectedJob.job_highlights).length > 0 && (
                  <div className="mb-3">
                    <h6>Highlights</h6>
                    {Object.entries(selectedJob.job_highlights).map(
                      ([key, values]) => (
                        <div key={key} className="mb-2">
                          <strong>{key}:</strong>
                          <ul className="mb-1">
                            {values.map((value, i) => (
                              <li key={i}>{value}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}

              <div className="mb-3">
                <h6>Apply Options</h6>
                <div className="d-grid gap-2">
                  {selectedJob.apply_options &&
                    selectedJob.apply_options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleJobRedirect(option.apply_link)}
                      >
                        Apply via {option.publisher}
                      </Button>
                    ))}
                  {selectedJob.job_apply_link && (
                    <Button
                      variant="primary"
                      onClick={() => handleJobRedirect(selectedJob.job_apply_link)}
                    >
                      Apply Now
                    </Button>
                  )}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
        </div>
    );
};

export default VacanciesList;
