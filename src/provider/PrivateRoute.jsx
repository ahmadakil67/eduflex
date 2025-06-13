import React, { use } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../pages/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  console.log("PrivateRoute - User:", user); 
  console.log("PrivateRoute - Loading:", loading); 
  console.log("PrivateRoute - Location:", location); 

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    console.log("PrivateRoute - User authenticated, rendering children"); 
    return children;
  }

  console.log("PrivateRoute - User not authenticated, redirecting to /auth/login"); 
  return <Navigate state={location.pathname} to="/auth/login" replace></Navigate>;
};

export default PrivateRoute;