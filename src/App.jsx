import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import PrivateRoute from "./components/PrivateRoute";

// Pages
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplicationTracker from "./pages/ApplicationTracker/ApplicationTracker";

import CvBuilder from "./pages/CvBuilder/CvBuilder";
import CvGenerate from "./pages/CvBuilder/CvGenerate";

import Interview from "./pages/Interview/Interview";
import Prepration from "./pages/Interview/Prepration";

import JobSearch from "./pages/JobSearch/JobSearch";
import GetStarted from "./pages/GetStarted/GetStarted";
import PaymentPlans from "./pages/PaymentPlans/PaymentPlans";
import Support from "./pages/Support/Support";

import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Verification from "./pages/Auth/Verification";
import F2Verification from "./pages/Auth/F2Verification";
import Welcome from "./pages/Welcome";
import UploadProfile from "./pages/Auth/UploadProfile";

import { useDispatch, useSelector } from "react-redux";
import { login, getUser, logout } from "./features/user/userSlice";



const Loader = () => (
  <div id="preloader">
    <div id="loader"></div>
  </div>
);

const PageWrapper = ({ children }) => {

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);



  return loading ? <Loader /> : children;
};

// Route configuration
// const routeConfig = [
//   // Public routes
//   { path: '/', element: <Dashboard />, public: true },
//   { path: '/application-tracker', element: <ApplicationTracker />, public: true },

//   { path: '/cv-builder', element: <CvBuilder />, public: true },
//   { path: '/cv-generate', element: <CvGenerate />, public: true },

//   { path: '/interview', element: <Interview />, public: true },
//   { path: '/prepration', element: <Prepration />, public: true },
  
//   { path: '/job-search', element: <JobSearch />, public: true },
//   { path: '/get-started', element: <GetStarted />, public: true },
//   { path: '/payment-plans', element: <PaymentPlans />, public: true },
//   { path: '/support', element: <Support />, public: true },


//   { path: '/sign-in', element: <SignIn />, public: true },
//   { path: '/sign-up', element: <SignUp />, public: true },
//   { path: '/verification', element: <Verification />, public: true },
//   { path: '/2f-verification', element: <F2Verification />, public: true },
//   { path: '/upload-profile', element: <UploadProfile />, public: true },

//   { path: '/welcome', element: <Welcome />, public: true },

//   // Protected routes with role requirements
//   // { 
//   //   path: '/dashboard', 
//   //   element: <Dashboard />, 
//   //   roles: ['Admin', 'HOD', 'Teacher', 'Data Operator'] 
//   // },

//   // Catch-all route
//   { path: '*', element: <ErrorPage />, public: true }
// ];

const publicRoutes = [
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/verification', element: <Verification /> },
  { path: '/2f-verification', element: <F2Verification /> },
  { path: '/welcome', element: <Welcome /> },
  { path: '*', element: <ErrorPage /> },
];

const protectedRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/upload-profile', element: <UploadProfile /> },
  { path: '/application-tracker', element: <ApplicationTracker /> },
  { path: '/cv-builder', element: <CvBuilder /> },
  { path: '/cv-generate/:id', element: <CvGenerate /> },
  { path: '/interview', element: <Interview /> },
  { path: '/prepration', element: <Prepration /> },
  { path: '/job-search', element: <JobSearch /> },
  { path: '/get-started', element: <GetStarted /> },
  { path: '/payment-plans', element: <PaymentPlans /> },
  { path: '/support', element: <Support /> },
];


function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <ToastContainer />
        <Routes>
          {/* Public routes */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Protected routes */}
          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  {route.element}
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}


export default App;