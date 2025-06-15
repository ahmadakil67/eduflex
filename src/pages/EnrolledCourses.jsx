import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router"; // Assuming you want to link to other pages if needed

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext); // Get logged-in user from context
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      // Fetch the enrolled courses for the user
      fetch(`https://course-management-server-beryl.vercel.app/enrollments?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setEnrolledCourses(data); // Set enrolled courses data from API
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching enrolled courses:", error);
          setLoading(false);
        });
    }
  }, [user?.email]); // Re-fetch when user email changes

  // Handle removing the enrollment
  const handleRemoveEnrollment = (enrollmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove your enrollment from this course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send request to remove the enrollment from the database
        fetch(`https://course-management-server-beryl.vercel.app/enrollments/${enrollmentId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Removed!", "Your enrollment has been removed.", "success");
              setEnrolledCourses((prev) => prev.filter((course) => course._id !== enrollmentId)); // Update state
            }
          })
          .catch((error) => {
            console.error("Error removing enrollment:", error);
            Swal.fire("Error", "Failed to remove enrollment", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
            My Enrolled Courses
          </h2>
          <div className="overflow-x-auto rounded-lg border border-indigo-200 shadow-md">
            <table className="table-auto w-full text-left">
              <thead className="bg-indigo-100 text-indigo-700 font-semibold uppercase">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      You are not enrolled in any courses yet.
                    </td>
                  </tr>
                ) : (
                  enrolledCourses.map((enrollment, index) => (
                    <tr
                      key={enrollment._id}
                      className="border-b last:border-b-0 hover:bg-indigo-50 transition cursor-pointer"
                    >
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{enrollment.courseTitle}</td>
                      <td className="p-3">{enrollment.instructor}</td>
                      <td className="p-3 text-center flex justify-center gap-4">
                        {/* Remove Enrollment button */}
                        <button
                          onClick={() => handleRemoveEnrollment(enrollment._id)}
                          className="btn btn-sm btn-error flex items-center gap-1 px-4 py-1 rounded-md border border-red-600 bg-red-100 text-red-700 hover:bg-red-200 transition"
                          aria-label={`Remove enrollment for ${enrollment.courseTitle}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                          Remove Enrollment
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

export default EnrolledCourses;
