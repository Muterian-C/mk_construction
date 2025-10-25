// src/context/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // block non-admins
  }

  return children;
};

export default ProtectedRoute;
