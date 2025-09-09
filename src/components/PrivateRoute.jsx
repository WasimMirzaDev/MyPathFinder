// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { accessToken } = useSelector((state) => state.user);

  // fallback: also check localStorage
  const token = accessToken || localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
