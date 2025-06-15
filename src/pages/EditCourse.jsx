import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router"; // Import useParams for getting the course id and useNavigate for navigation

const EditCourse = () => {
  const { user } = useContext(AuthContext); // Fetching the logged-in user from context
  const { id } = useParams(); // Get the course ID from the URL parameter
  const navigate = useNavigate(); // To navigate to the course list page after successful update

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    category: "General",
    instructor: "",
    userEmail: "",
    userName: "",
  });

  // Fetch the course data when the component is mounted and pre-fill the form
  useEffect(() => {
    if (!id) return;

    fetch(`https://course-management-server-beryl.vercel.app/courses/${id}`) // Fetch the course data using the ID
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData({
            title: data.title || "",
            description: data.description || "",
            duration: data.duration || "",
            category: data.category || "General",
            instructor: data.instructor || "",
            userEmail: data.userEmail || user?.email || "",
            userName: data.userName || user?.displayName || "Anonymous",
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
      });
  }, [id, user]);

  // Update form data when the input fields change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://course-management-server-beryl.vercel.app/courses/${id}`, {
      method: "PUT", // Update the course using PUT method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Send the updated form data to the backend
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount || data.updatedAt) {
          Swal.fire({
            title: "Success!",
            text: "Course updated successfully!",
            icon: "success",
          });
          navigate("/my-courses"); // Redirect to the courses page after successful update
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to update course",
            icon: "error",
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Error",
          text: "Failed to update course",
          icon: "error",
        });
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            type="text"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Introduction to Programming"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Duration</label>
          <input
            name="duration"
            type="text"
            className="input input-bordered w-full"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 3 months"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            name="category"
            className="select select-bordered w-full"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Instructor</label>
          <input
            name="instructor"
            type="text"
            className="input input-bordered w-full"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="e.g., John Doe"
            required
          />
        </div>

        <div>
          <label className="block mb-1">User Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-gray-100"
            value={formData.userEmail}
            readOnly
          />
        </div>

        <div>
          <label className="block mb-1">User Name</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100"
            value={formData.userName}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Edit Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
