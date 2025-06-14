import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import CourseCard from "./courseCard";
import PopularCourses from "./PopularCourses";
import DiscussionForum from "./DiscussionForum";
import UniversityMarquee from "./UniversityMarquee";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the backend or API
    fetch("http://localhost:3000/courses") // Replace with your backend API
      .then((res) => res.json())
      .then((data) => {
        setCourses(data); // Set courses data from API
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  return (
    <div>
      <Banner />
      {/* Latest Courses Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
            Latest Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length === 0 ? (
              <p className="text-center text-lg text-gray-500">
                No courses available at the moment.
              </p>
            ) : (
              courses.map((course) => (
                <CourseCard key={course._id} course={course} /> // Pass course data to CourseCard
              ))
            )}
          </div>
        </div>
      </section>
      <PopularCourses></PopularCourses>
      <DiscussionForum></DiscussionForum>
      <UniversityMarquee></UniversityMarquee>
    </div>
  );
};

export default Home;
