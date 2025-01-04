import React from "react";
import { Navigate } from "react-router-dom";
import { getRoleFromToken } from "../authUtils"; // Import the function to get the role from the token
export const ProtectedRoute = ({ children, requiredRole }) => {
    const role = getRoleFromToken();
    console.log("Current Role:", role); // Debugging
    
    if (!role) {
      return <Navigate to="/login" />; // Redirect if no role
    }
  
    if (requiredRole && role === requiredRole) {
      return <Navigate to="/unauthorized" />; // Redirect unauthorized users
    }
  
    return children; // Render the component if authorized
  };
  