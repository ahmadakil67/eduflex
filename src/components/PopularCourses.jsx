import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './courseCard';

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/popular-courses")
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

  if (loading) {
    return <div className="text-center py-8">Loading popular courses...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        Error loading popular courses: {error.message}
      </div>
    );
  }

  if (popularCourses.length === 0) {
    return (
      <div className="popular-courses-container">
        <h2 className="text-2xl font-semibold mb-4">Most Enrolled Courses</h2>
        <div className="text-center text-gray-500">No popular courses found yet.</div>
      </div>
    );
  }

  return (
    <div className="popular-courses-container p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Most Enrolled Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {popularCourses.map((course) => (
          <CourseCard 
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