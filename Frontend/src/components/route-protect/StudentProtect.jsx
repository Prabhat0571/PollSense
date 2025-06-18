import React from "react";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const username = sessionStorage.getItem("username");

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StudentProtectedRoute;
