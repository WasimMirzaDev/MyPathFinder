import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
// import PrivateRoute from "./components/PrivateRoute";

// Pages
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplicationTracker from "./pages/ApplicationTracker/ApplicationTracker";

const Loader = () => (
  <div id="preloader">
    <div id="loader"></div>
  </div>
);

const PageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <Loader /> : children;
  // return loading ? <Loader /> : children;
};

// Route configuration
const routeConfig = [
  // Public routes
  { path: '/', element: <Dashboard />, public: true },
  { path: '/application-tracker', element: <ApplicationTracker />, public: true },

  // Protected routes with role requirements
  // { 
  //   path: '/dashboard', 
  //   element: <Dashboard />, 
  //   roles: ['Admin', 'HOD', 'Teacher', 'Data Operator'] 
  // },

  // Catch-all route
  { path: '*', element: <ErrorPage />, public: true }
];

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <ToastContainer />
        <Routes>
          {routeConfig.map((route, index) => {
            const element = route.public
              ? route.element
              : (
                <PrivateRoute allowedRoles={route.roles}>
                  {route.element}
                </PrivateRoute>
              );

            return <Route key={index} path={route.path} element={element} />;
          })}
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;