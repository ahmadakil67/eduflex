import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router'; // Importing Link for navigation

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext); // Fetching the logged-in user from context
  console.log(user.email);

  useEffect(() => {
    if (user?.email) {
      // Fetch courses from the backend, assuming courses have 'createdByEmail' field
      fetch("https://course-management-server-beryl.vercel.app/courses")  // Replace with your backend API
        .then((res) => res.json())
        .then((data) => {
          // Filter courses that are created by the logged-in user
          const filteredCourses = data.filter(course => course.createdByEmail === user.email);
          setCourses(filteredCourses);  // Set the filtered courses data from API
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    }
  }, [user?.email]);  // Fetch courses when the user email changes

  // Handle course deletion
  const handleDelete = (id) => {
    fetch(`https://course-management-server-beryl.vercel.app/courses/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
          alert('Course deleted successfully!');
        } else {
          alert('Error deleting course.');
        }
      })
      .catch((error) => {
        console.error("Error deleting the course:", error);
        alert('Error deleting the course');
      });
  };

  return (
    <div>
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">Manage Courses</h2>
          <div className="overflow-x-auto rounded-lg border border-indigo-200 shadow-md">
            <table className="table-auto w-full text-left">
              <thead className="bg-indigo-100 text-indigo-700 font-semibold uppercase">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Short Description</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No courses available at the moment.
                    </td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <tr key={course._id} className="border-b last:border-b-0 hover:bg-indigo-50 transition cursor-pointer">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{course.courseTitle}</td>
                      <td className="p-3">{course.shortDescription}</td>
                      <td className="p-3 text-center flex justify-center gap-4">
                        {/* Edit Button */}
                        <Link to={`/edit-course/${course._id}`}>
                          <button
                            className="btn btn-sm btn-warning flex items-center gap-1 px-4 py-1 rounded-md border border-yellow-500 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                            aria-label={`Edit course ${course.title}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5h6M6 12h6m-6 7h6" />
                            </svg>
                            Edit
                          </button>
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(course._id)}
                          className="btn btn-sm btn-error flex items-center gap-1 px-4 py-1 rounded-md border border-red-600 bg-red-100 text-red-700 hover:bg-red-200 transition"
                          aria-label={`Delete course ${course.title}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageCourses;
