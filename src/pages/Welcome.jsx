import React from 'react'
import { Link } from "react-router-dom";


import logo from '../assets/images/MPF-Logo-Light.svg'

export default function Welcome() {
    return (
        <main className="main min-vh-100 d-flex pt-3 pt-lg-10 welcome-page" id="top">
            <div className="container-lg position-relative py-6 py-md-8" data-bs-theme="light">
                <div className="row gy-3 mb-4 justify-content-between">
                    <div className="col-md-12 col-auto pb-3">
                        <div className="d-flex flex-center text-decoration-none mb-4">
                            <img src={logo} alt="MyPathfinder logo" width="200" />
                        </div>
                        <div className="card-body position-relative">
                            <h1 className="mb-2 fw-semibold text-white text-center">Where do you want to start?</h1>
                            <h3 className="text-white fs-7 fw-normal lh-lg text-center">
                                MyPathfinder curates job opportunities that match your profile, allowing you to apply
                                quickly and efficiently.
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="row mb-3 g-3 feature-cards">
                    <div className="col-12 col-xl-3">
                        <div className="card border h-100 w-100 overflow-hidden position-relative">
                            <div className="card-body px-4 position-relative text-center">
                                <div
                                    className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                    style={{backgroundColor: '#ece5fc'}}>
                                    <svg width={20} className="svg-inline--fa fa-file-import fs-7" style={{color: '#ba67ef'}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-import" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M128 64c0-35.3 28.7-64 64-64L352 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64l-256 0c-35.3 0-64-28.7-64-64l0-112 174.1 0-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39L128 288l0-224zm0 224l0 48L24 336c-13.3 0-24-10.7-24-24s10.7-24 24-24l104 0zM512 128l-128 0L384 0 512 128z"></path></svg>
                                </div>
                                <h4 className="my-3">Smart CV Builder</h4>
                                <p className="fs-8">Tailor your CV to any job in seconds. Just upload and optimise.</p>
                                <Link to="/cv-builder" className="stretched-link btn btn-primary w-100">Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3">
                        <div className="card border h-100 w-100 overflow-hidden position-relative">
                            <div className="card-body px-4 position-relative text-center">
                                <div
                                    className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                    style={{backgroundColor: '#ece5fc'}}>
                                    <svg width={20} className="svg-inline--fa fa-video fs-7" style={{color: '#ba67ef'}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M0 128C0 92.7 28.7 64 64 64l256 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2l0 256c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1l0-17.1 0-128 0-17.1 14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"></path></svg>
                                </div>
                                <h4 className="my-3">Interview Simulator</h4>
                                <p className="fs-8">Practise with industry specific questions and real time feedback.</p>
                                <Link className="stretched-link btn btn-primary w-100" to="/interview">Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3">
                        <div className="card border h-100 w-100 overflow-hidden position-relative">
                            <div className="card-body px-4 position-relative text-center">
                                <div
                                    className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                    style={{backgroundColor: '#ece5fc'}}>
                                    <svg width={20} className="svg-inline--fa fa-magnifying-glass fs-7" style={{color: '#ba67ef'}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                                </div>
                                <h4 className="my-3">Job Search</h4>
                                <p className="fs-8">
                                    Find roles that align with your experience, strengths and goals.
                                </p>
                                <Link className="stretched-link btn btn-primary w-100" to="/job-search">Get Started</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-xl-3">
                        <div className="card border h-100 w-100 overflow-hidden position-relative">
                            <div className="card-body px-4 position-relative text-center">
                                <div
                                    className="icon-item icon-item-md rounded-1 shadow-none mx-auto"
                                    style={{backgroundColor: '#ece5fc'}}>
                                    <svg width={20} className="svg-inline--fa fa-forward fs-7" style={{color: '#ba67ef'}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="forward" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z"></path></svg>
                                </div>
                                <h4 className="my-3">Skip to Dashboard</h4>
                                <p className="fs-8">
                                    Head over to your personal dashboard and explore. The opportunities are endless!
                                </p>
                                <Link className="stretched-link btn btn-primary w-100" to="/">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
