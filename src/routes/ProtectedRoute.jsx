import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useSelector((state) => state.auth);
  // firebase has not finished checking auth
  if (authLoading) {
    return <p>Checking authentication...</p>;
  }
  // user is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // user is logged in
  return <Outlet />;
};

export default ProtectedRoute;
