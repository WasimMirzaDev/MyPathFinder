import React from 'react'
import { Link } from "react-router-dom";

export default function Activity() {
    return (
        <div className="card border h-100">
            <div className="card-body">
                <div className="card-title mb-4">
                    <h3>Activity</h3>
                </div>
                <div className="timeline-vertical timeline-with-details">
                    <div className="timeline-item position-relative">
                        <div className="row g-md-3">
                            <div className="col-12 col-md-auto d-flex">
                                <div className="timeline-item-date order-1 order-md-0 me-md-4">
                                    <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end">03 JUN, 2025<br className="d-none d-md-block" /> 10:30 AM</p>
                                </div>
                                <div className="timeline-item-bar position-md-relative me-3 me-md-0">
                                    <div className="icon-item icon-item-sm rounded-7 shadow-none bg-success-subtle"><svg width={10} className="svg-inline--fa fa-pen-to-square fs-10 text-success-dark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen-to-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"></path></svg></div><span className="timeline-bar border-end border-dashed"></span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="timeline-item-content ps-6 ps-md-3">
                                    <h5 className="fs-9 lh-sm">Created a new CV for ‘Senior Graphic Designer’</h5>
                                    <p className="fs-9"><Link className="fw-semibold" to="#!">View in CV Builder</Link></p>
                                    <p className="fs-9 text-body-secondary mb-5">Creative and detail-oriented Graphic Designer with over 5 years of experience delivering engaging visual content across digital...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-item position-relative">
                        <div className="row g-md-3">
                            <div className="col-12 col-md-auto d-flex">
                                <div className="timeline-item-date order-1 order-md-0 me-md-4">
                                    <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end">05 DEC, 2023<br className="d-none d-md-block" /> 12:30 AM</p>
                                </div>
                                <div className="timeline-item-bar position-md-relative me-3 me-md-0">
                                    <div className="icon-item icon-item-sm rounded-7 shadow-none bg-success-subtle"><svg width={10} className="svg-inline--fa fa-check fs-10 text-success-dark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></div><span className="timeline-bar border-end border-dashed"></span>
                                </div>
                            </div>
                            <div className="col">
                                <div className="timeline-item-content ps-6 ps-md-3">
                                    <h5 className="fs-9 lh-sm">Achieved a score of 96% in General #073: Tell us about yourself</h5>
                                    <p className="fs-9"><Link className="fw-semibold" to="#!">View Feedback</Link></p>
                                    <p className="fs-9 text-body-secondary mb-5">Feedback summary: Include specific roles, industries, and measurable experiences (e.g., “4 years in tech and retail sectors”)...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="timeline-item position-relative">
                        <div className="row g-md-3">
                            <div className="col-12 col-md-auto d-flex">
                                <div className="timeline-item-date order-1 order-md-0 me-md-4">
                                    <p className="fs-10 fw-semibold text-body-tertiary text-opacity-85 text-end">15 DEC, 2023<br className="d-none d-md-block" /> 2:30 AM</p>
                                </div>
                                <div className="timeline-item-bar position-md-relative me-3 me-md-0">
                                    <div className="icon-item icon-item-sm rounded-7 shadow-none bg-warning-subtle"><svg width={10} className="svg-inline--fa fa-minus fs-10 text-warning-dark" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg></div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="timeline-item-content ps-6 ps-md-3">
                                    <h5 className="fs-9 lh-sm">Achieved a score of 69% in General #746: What are your strengths and weaknesses?</h5>
                                    <p className="fs-9"><Link className="fw-semibold" to="#!">View Feedback</Link></p>
                                    <p className="fs-9 text-body-secondary mb-0">Highlight a few key strengths (e.g., communication, problem solving) with examples or proof...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
