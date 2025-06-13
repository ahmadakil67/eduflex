import React from "react";
import { Link } from "react-router"; // You can use Link to navigate back to the homepage or any other route

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-indigo-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-500 mb-6">Sorry, the page you're looking for does not exist.</p>
        <Link
          to="/"
          className="text-indigo-600 hover:text-indigo-800 text-lg font-medium"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
