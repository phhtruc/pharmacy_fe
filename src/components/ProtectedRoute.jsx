import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ element, requiredRoles }) => {
  const { user, hasRole, isInitializing } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isInitializing) {
      setLoading(false);
    }
  }, [isInitializing]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasRole(requiredRoles)) {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/login" replace />;
  }

  return element;
};
export default ProtectedRoute;
