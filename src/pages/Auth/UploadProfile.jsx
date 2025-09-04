import React from 'react'
import { Link } from "react-router-dom";


import logo from '../../assets/images/MPF-logo.svg'

export default function UploadProfile() {
    return (
        <main className="main" id="top">
            <div className="container-fluid bg-body-tertiary">
                <div className="bg-holder bg-auth-card-overlay auth-bg-image"></div>

                <div className="row flex-center position-relative min-vh-100 g-0">
                    <div className="col-11 col-sm-10 col-xl-4">
                        <div className="card border border-translucent auth-card">
                            <div className="card-body py-5">
                                <div className="row align-items-center gx-0 gy-7">
                                    <div className="col mx-auto">
                                        <div className=" auth-card--narrow">
                                            <div className="text-center mb-5">
                                                <a className="d-flex flex-center text-decoration-none mb-4" href="index.html"
                                                    aria-label="Go to homepage">
                                                    <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                                                        <img src={logo} alt="MyPathfinder logo" width="200" />
                                                    </div>
                                                </a>
                                                <h3 className="fw-bold">Lets get to know you a bit first, Alex<span className="text-primary">.</span></h3>
                                                <p>MyPathfinder curates job opportunities that match your profile, allowing you to apply quickly
                                                    and efficiently.</p>
                                            </div>

                                            <div className="mb-4 text-start">
                                                <label className="form-label d-flex align-items-center gap-2" htmlFor="linkedinUrl">
                                                    <span>LinkedIn profile</span>
                                                    <span className="badge bg-primary-subtle text-primary">Preferred</span>
                                                </label>

                                                <div className="input-group input-group-lg">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                                                    </span>
                                                    <input type="url" className="form-control form-control-lg border-primary shadow-sm" id="linkedinUrl"
                                                        name="linkedin_url" placeholder="https://www.linkedin.com/in/your-name" inputMode="url"
                                                        autoComplete="url" autoCapitalize="off" spellCheck="false"
                                                        pattern="https?://(www\.)?linkedin\.com/(in|pub)/[A-Za-z0-9\-\._%]+/?"
                                                        aria-describedby="linkedinHelp" required />
                                                </div>

                                                <div id="linkedinHelp" className="form-text">
                                                    Paste your LinkedIn URL and we’ll auto-fill the rest.
                                                </div>
                                                <div className="invalid-feedback">
                                                    Please enter a valid LinkedIn URL, e.g. https://www.linkedin.com/in/your-name
                                                </div>
                                            </div>



                                            <div className="position-relative">
                                                <hr className="bg-body-secondary mt-5 mb-4" />
                                                <div className="divider-content-center bg-body-emphasis">or complete a short questionnaire</div>
                                            </div>


                                            <form action="welcome.html" method="post" noValidate="noValidate">

                                                <div className="mb-3 text-start">
                                                    <label className="form-label" htmlFor="industry">Industry I am looking to work in:</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text"><i className="fas fa-briefcase" aria-hidden="true"></i></span>
                                                        <select className="form-select" id="industry" name="industry" required>
                                                            <option value=""  disabled>Select an industry</option>
                                                            <option>Technology</option>
                                                            <option>Finance</option>
                                                            <option>Marketing</option>
                                                            <option>Healthcare</option>
                                                            <option>Education</option>
                                                            <option>Retail &amp; E-commerce</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3 text-start">
                                                    <label className="form-label" htmlFor="jobRole">Job role I am looking to work in:</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text"><i className="fas fa-user-tie" aria-hidden="true"></i></span>
                                                        <select className="form-select" id="jobRole" name="jobRole" required>
                                                            <option value=""  disabled>Select a role</option>
                                                            <option>Software Developer</option>
                                                            <option>Product Manager</option>
                                                            <option>Data Analyst</option>
                                                            <option>Designer (UI/UX)</option>
                                                            <option>Project Manager</option>
                                                            <option>Sales / Business Dev</option>
                                                            <option>Customer Support</option>
                                                            <option>Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="mb-3 text-start">
                                                    <label className="form-label" htmlFor="educationLevel">Highest education level:</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">
                                                            <i className="fas fa-user-graduate" aria-hidden="true"></i>
                                                        </span>
                                                        <select className="form-select" id="educationLevel" name="education_level" required>
                                                            <option value=""  disabled>Select education level</option>
                                                            <option value="no-qualifications">No formal qualifications</option>
                                                            <option value="gcse">GCSEs / O-Levels</option>
                                                            <option value="alevel">A-Levels / Equivalent</option>
                                                            <option value="apprenticeship">Apprenticeship</option>
                                                            <option value="foundation">Foundation / HND / HNC</option>
                                                            <option value="bachelors">Bachelor’s degree</option>
                                                            <option value="masters">Master’s degree</option>
                                                            <option value="mba">MBA</option>
                                                            <option value="phd">PhD / Doctorate</option>
                                                            <option value="certificate">Professional certificate / Bootcamp</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="visually-hidden" aria-live="polite"></div>

                                                <button type="submit" className="btn btn-primary w-100 mt-2 mb-4">Continue</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
