import React from 'react'
import { Link } from "react-router-dom";


import logo from '../../assets/images/MPF-logo.svg'

export default function SignUp() {
    return (
        <main className="main" id="top">
            <div className="container-fluid bg-body-tertiary dark__bg-gray-1200">
                <div className="bg-holder bg-auth-card-overlay auth-bg-image"></div>
                <div className="row flex-center position-relative min-vh-100 g-0">
                    <div className="col-11 col-sm-10 col-xl-4">
                        <div className="card border border-translucent auth-card">
                            <div className="card-body">
                                <div className="auth-form-box">
                                    <div className="text-center mb-5">
                                        <div
                                            className="d-flex flex-center text-decoration-none mb-4">
                                            <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                                                <img src={logo} alt="MyPathfinder logo" width="200" />
                                            </div>
                                        </div>
                                        <h3 className="fw-bold">Sign Up</h3>
                                        <p>Create your account today</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-phoenix-light border w-100 mb-3"
                                        aria-label="Continue with Google">
                                        <svg width={13} className="svg-inline--fa fa-google fs-9 me-2 text-danger" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" data-fa-i2svg=""><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                        Continue with Google
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-phoenix-light border w-100"
                                        aria-label="Continue with Facebook">
                                        <svg width={13} className="svg-inline--fa fa-facebook fs-9 me-2" style={{ color: '#1877f2' }} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"></path></svg>
                                        Continue with Facebook
                                    </button>

                                    <div className="position-relative mt-4">
                                        <hr className="bg-body-secondary" />
                                        <div className="divider-content-center bg-body-emphasis">or use email</div>
                                    </div>

                                    <form action="/2f-varification" method="post">
                                        <div className="mb-3 text-start">
                                            <label className="form-label" htmlFor="name">Name</label>
                                            <input
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                autoComplete="name"
                                                required />
                                        </div>

                                        <div className="mb-3 text-start">
                                            <label className="form-label" htmlFor="email">Email address</label>
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                autoComplete="email"
                                                inputMode="email"
                                                required
                                                aria-describedby="emailHelp" />
                                        </div>

                                        <div className="row g-3 mb-3">
                                            <div className="col-sm-6">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <div className="position-relative" data-password="data-password">
                                                    <input
                                                        className="form-control form-icon-input pe-6"
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        placeholder="Password"
                                                        data-password-input="data-password-input"
                                                        autoComplete="new-password"
                                                        minLength="8"
                                                        required
                                                        aria-describedby="passwordHelp" />
                                                    <button
                                                        className="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary"
                                                        type="button"
                                                        data-password-toggle="data-password-toggle"
                                                        aria-label="Show password"
                                                        aria-controls="password">
                                                        <span className="uil uil-eye show"></span><span className="uil uil-eye-slash hide"></span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                                <div className="position-relative" data-password="data-password">
                                                    <input
                                                        className="form-control form-icon-input pe-6"
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                        data-password-input="data-password-input"
                                                        autoComplete="new-password"
                                                        minLength="8"
                                                        required />
                                                    <button
                                                        className="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary"
                                                        type="button"
                                                        data-password-toggle="data-password-toggle"
                                                        aria-label="Show confirm password"
                                                        aria-controls="confirmPassword">
                                                        <span className="uil uil-eye show"></span><span className="uil uil-eye-slash hide"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                id="termsService"
                                                name="termsService"
                                                type="checkbox"
                                                required />
                                            <label className="form-check-label fs-9 text-transform-none" htmlFor="termsService">
                                                I accept the <Link to="/term">terms</Link> and <Link to="/policy">privacy policy</Link>
                                            </label>
                                        </div>

                                        <div className="visually-hidden" aria-live="polite"></div>

                                        <button type="submit" className="btn btn-primary w-100 mb-4">
                                            Create Account
                                        </button>

                                        <div className="text-center">
                                            <Link className="fs-9 fw-bold" to="/sign-in">Already a member? Click here to sign in.</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
