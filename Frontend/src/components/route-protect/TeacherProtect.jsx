import React from "react";
import { Navigate } from "react-router-dom";

const TeacherProtectedRoute = ({ children }) => {
  const username = sessionStorage.getItem("username");

  if (!username || !username.startsWith("teacher")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default TeacherProtectedRoute;
