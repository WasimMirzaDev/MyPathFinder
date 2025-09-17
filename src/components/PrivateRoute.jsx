// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Spinner } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { data, accessToken, bootstrapping } = useSelector((state) => state.user);

  // Check for token in both Redux and localStorage
  const token = accessToken || localStorage.getItem("access_token");

  // Show loading state only while bootstrapping auth
  if (bootstrapping) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  // If no token, redirect to sign-in
  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // If user data is not loaded yet, wait
  if (!data) {
    return null; // or a loading spinner
  }

  // If on subscription or feedback page, allow access
  if (location.pathname === '/subscription' || location.pathname === '/upload-profile') {
    return children;
  }

  // If no plan, redirect to subscription
  if (!data.plan_id) {
    return <Navigate to="/subscription" state={{ from: location }} replace />;
  }

  // If all checks pass, render the children
  return children;
};

export default PrivateRoute;