import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./courseCard";
import PopularCourseCard from "./PopularCourseCard";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://course-management-server-beryl.vercel.app/popular-courses")
      .then((response) => {
        setPopularCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading courses:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const sortedCourses = popularCourses.sort(
    (a, b) => b.enrollments - a.enrollments
  );

  if (loading) {
    return <div className="text-center py-8">Loading popular courses...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <div>There was an error loading the courses.</div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 mt-2"
        >
          Retry
        </button>
      </div>
    );
  }

  if (popularCourses.length === 0) {
    return (
      <div className="popular-courses-container">
        <h2 className="text-2xl font-semibold mb-4">Most Enrolled Courses</h2>
        <div className="text-center text-gray-500">
          No popular courses available at the moment. Check back later!
        </div>
      </div>
    );
  }

  return (
    <div className="popular-courses-container p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Most Enrolled Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {sortedCourses.map((course) => (
          <PopularCourseCard
            key={course._id}
            course={course}
            enrollmentCount={course.enrollments}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
