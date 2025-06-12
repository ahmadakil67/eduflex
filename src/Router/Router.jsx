import { createBrowserRouter } from "react-router";  // Corrected import for react-router-dom
import Root from "../components/Root";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";  // Import your Register component
import { Component } from "react";
import AuthLayout from "../layouts/Authlayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,  // Use 'element' instead of 'Component'
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,  // Use 'element' here as well
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,  // Corrected to 'element' instead of 'Component'
    children: [
      {
        path: "login",  // Use relative path for nested routes
        element: <Login />,  // Use 'element' for the Login component
      },
      {
        path: "register",  // Add the register path
        element: <Register />,  // Render Register component
      },
    ],
  },
]);
