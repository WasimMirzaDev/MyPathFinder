import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../utils/axios';
import logo from '../../assets/images/MPF-logo.svg';

// Validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
});

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    setIsLoading(true);
    setApiError('');
    
    try {
      const response = await axios.post('/api/login', values);
      localStorage.setItem('access_token', response.data.access_token);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      setApiError(errorMessage);
      
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(([field, message]) => {
          setFieldError(field, Array.isArray(message) ? message[0] : message);
        });
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



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
                                        <div className="auth-form-box">
                                            <div className="text-center mb-5">
                                                <Link
                                                    className="d-flex flex-center text-decoration-none mb-4"
                                                    to="/"
                                                    aria-label="Go to homepage">
                                                    <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
                                                        <img src={logo} alt="MyPathfinder logo" width="200" />
                                                    </div>
                                                </Link>
                                                <h3 className="fw-bold">Sign In</h3>
                                                <p>Get access to your account</p>
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
                                                <svg width={13} className="svg-inline--fa fa-facebook fs-9 me-2" style={{color: '#1877f2'}} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"></path></svg>
                                                Continue with Facebook
                                            </button>

                                            <div className="position-relative">
                                                <hr className="bg-body-secondary mt-5 mb-4" />
                                                <div className="divider-content-center bg-body-emphasis">or use email</div>
                                            </div>

                                            <Formik
                                              initialValues={{
                                                email: '',
                                                password: '',
                                                remember: false
                                              }}
                                              validationSchema={loginSchema}
                                              onSubmit={handleLogin}
                                            >
                                              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                                <form onSubmit={handleSubmit} noValidate>
                                                  {apiError && (
                                                    <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
                                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="me-2" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                      </svg>
                                                      <div>{apiError}</div>
                                                    </div>
                                                  )}
                                                  
                                                  <div className="mb-3 text-start">
                                                    <label className="form-label" htmlFor="email">Email address</label>
                                                    <div className="form-icon-container">
                                                      <input
                                                        className={`form-control form-icon-input ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        autoComplete="username"
                                                        inputMode="email"
                                                        autoCapitalize="none"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={isLoading}
                                                      />
                                                      <svg width={11} className="svg-inline--fa fa-user form-icon fs-9 text-body" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                        <path fill="currentColor" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"></path>
                                                      </svg>
                                                    </div>
                                                    {touched.email && errors.email && (
                                                      <div className="invalid-feedback d-block">{errors.email}</div>
                                                    )}
                                                  </div>

                                                  <div className="mb-3 text-start">
                                                    <label className="form-label" htmlFor="password">Password</label>
                                                    <div className="form-icon-container position-relative">
                                                      <input
                                                        className={`form-control form-icon-input pe-6 ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                                        id="password"
                                                        name="password"
                                                        type={showPassword ? 'text' : 'password'}
                                                        placeholder="Password"
                                                        autoComplete="current-password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        disabled={isLoading}
                                                      />
                                                      <svg width={11} className="svg-inline--fa fa-key form-icon fs-9 text-body" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"></path>
                                                      </svg>
                                                      <button
                                                        className="btn px-3 py-0 h-100 position-absolute top-0 end-0 fs-7 text-body-tertiary"
                                                        type="button"
                                                        onClick={togglePasswordVisibility}
                                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                      >
                                                        {showPassword ? (
                                                          <span className="uil uil-eye-slash"></span>
                                                        ) : (
                                                          <span className="uil uil-eye"></span>
                                                        )}
                                                      </button>
                                                    </div>
                                                    {touched.password && errors.password && (
                                                      <div className="invalid-feedback d-block">{errors.password}</div>
                                                    )}
                                                  </div>

                                                  <div className="row flex-between-center mb-3">
                                                    <div className="col-auto">
                                                      <div className="form-check mb-0">
                                                        <input
                                                          className="form-check-input"
                                                          id="remember"
                                                          name="remember"
                                                          type="checkbox"
                                                          checked={values.remember}
                                                          onChange={handleChange}
                                                          onBlur={handleBlur}
                                                          disabled={isLoading}
                                                        />
                                                        <label className="form-check-label mb-0" htmlFor="remember">Remember me</label>
                                                      </div>
                                                    </div>
                                                    <div className="col-auto">
                                                      <Link className="fs-9 fw-semibold" to="/forget-password">Forgot Password?</Link>
                                                    </div>
                                                  </div>

                                                  <button
                                                    type="submit"
                                                    className="btn btn-primary w-100 mb-4"
                                                    disabled={isLoading || isSubmitting}
                                                  >
                                                    {isLoading ? (
                                                      <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                        Signing In...
                                                      </>
                                                    ) : 'Sign In'}
                                                  </button>

                                                  <div className="text-center">
                                                    <Link className="fs-9 fw-bold" to="/sign-up">Create an account</Link>
                                                  </div>
                                                </form>
                                              )}
                                            </Formik>
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
