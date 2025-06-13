import { createBrowserRouter } from "react-router";  // Corrected import for react-router-dom
import Root from "../components/Root";
import Home from "../components/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";  // Import your Register component
import { Component } from "react";
import AuthLayout from "../layouts/Authlayout";
import AddCourse from "../pages/AddCourse";
import PrivateRoute from "../provider/PrivateRoute";
import CourseDetails from "../pages/CourseDetails";
import ManageCourses from "../pages/ManageCourses";
import EditCourse from "../pages/EditCourse";
import EnrolledCourses from "../pages/EnrolledCourses";
import NotFound from "../pages/NotFound";



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
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourse></AddCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-courses",
        element: (
          <PrivateRoute>
            <ManageCourses></ManageCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-course/:id",
        element: (
          <PrivateRoute>
            <EditCourse></EditCourse>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-enrollments",
        element: (
          <PrivateRoute>
            <EnrolledCourses></EnrolledCourses>
          </PrivateRoute>
        ),
      },
      {
        path: "/course/:courseId",  // Add the dynamic route for Course Details
        element: <CourseDetails></CourseDetails>  // Render the CourseDetails component
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
  {
    path: "*",
    Component: NotFound,
  },
]);
