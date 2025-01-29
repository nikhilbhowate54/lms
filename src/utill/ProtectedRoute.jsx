import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const items = JSON.parse(localStorage.getItem('token'));
  console.log(items);
  // If the user is not authenticated, redirect to the login page
  return items ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
