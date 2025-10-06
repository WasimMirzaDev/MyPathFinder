import React from 'react'
import { Link } from "react-router-dom";


import logo from '../../assets/images/MPF-logo.svg'


export default function Verification() {
  return (
    <main className="main" id="top">
      <div className="container-fluid bg-body-tertiary dark__bg-gray-1200">
        <div className="bg-holder bg-auth-card-overlay auth-bg-image"></div>

        <div className="row flex-center position-relative min-vh-100 g-0 py-5">
          <div className="col-11 col-sm-10 col-xl-4">
            <div className="card border border-translucent auth-card auth-card--narrow">
              <div className="card-body pb-6">
                <div className="row align-items-center gx-0 gy-7">
                  <div className="col mx-auto">
                    <div className="auth-form-box">
                      <div className="text-center">
                        <div className="d-flex flex-center text-decoration-none mb-4">
                          <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                            <img src={logo} alt="MyPathfinder logo" width="200" />
                          </div>
                        </div>

                        <h3 className="fw-bold">Active Your Account</h3>
                        <p className="text-body-tertiary">
                          We’ll text a Link to the Email Adress below.
                        </p>

                        <form action="2fa.html" method="post" data-2fa-form="data-2fa-form" noValidate="novalidate">
                          <div className="mb-3 text-start">
                            <label className="form-label" htmlFor="email">Email Address</label>
                            <div className="form-icon-container">
                              <input
                                className="form-control w-100"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                autoComplete="email"
                                inputMode="email"
                                autoCapitalize="off"
                                required
                                pattern="^\+?[1-9]\d{1,14}$"
                              />     
                            </div>
                          </div>
                          <div className="visually-hidden" aria-live="polite"></div>

                          <button type="submit" className="btn btn-secondary w-100">
                            Send Link
                          </button>
                        </form>
                      </div>
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
