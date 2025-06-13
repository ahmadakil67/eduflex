import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider"; // Assuming AuthContext provides user info

const AddCourse = () => {
    const { user } = useContext(AuthContext);  // Get the current user from AuthContext

    const [formData, setFormData] = useState({
        courseTitle: "",
        shortDescription: "",
        imageUrl: "",
        duration: "",
        category: "",
        instructor: "",
        difficultyLevel: "Beginner",
        price: "",
        tags: "",
        prerequisites: "",  // New field for prerequisites
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get the current time and user's info from context
        const currentTime = new Date().toLocaleString();

        // Add the user info and current time to the form data
        const newCourse = {
            ...formData,
            createdByEmail: user.email, // User's email from context
            createdByName: user.displayName || "Anonymous", // User's name from context
            createdAt: currentTime, // Current timestamp
        };

        // Send data to the backend
        fetch("http://localhost:3000/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Course added successfully",
                        icon: "success",
                        background: "#f3e8ff", // Soft pastel background for alert
                        color: "#5b21b6", // Purple text
                    });
                    setFormData({
                        courseTitle: "",
                        shortDescription: "",
                        imageUrl: "",
                        duration: "",
                        category: "",
                        instructor: "",
                        difficultyLevel: "Beginner",
                        price: "",
                        tags: "",
                       
                        prerequisites: "",
                    }); // Reset form after successful submission
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Failed to add the course. Please try again.",
                    icon: "error",
                    background: "#f3e8ff", // Soft pastel background for alert
                    color: "#5b21b6", // Purple text
                });
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Title */}
                <div className="space-y-2">
                    <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
                        Course Title
                    </label>
                    <input
                        type="text"
                        id="courseTitle"
                        name="courseTitle"
                        value={formData.courseTitle}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        placeholder="Enter course title"
                    />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
                        Short Description
                    </label>
                    <textarea
                        id="shortDescription"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        placeholder="Enter a brief description"
                    />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                        Image URL
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        placeholder="Enter image URL"
                    />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                        Duration
                    </label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        placeholder="Enter duration (e.g., 3 months)"
                    />
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter course category"
                    />
                </div>

                {/* Instructor */}
                <div className="space-y-2">
                    <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                        Instructor Name
                    </label>
                    <input
                        type="text"
                        id="instructor"
                        name="instructor"
                        value={formData.instructor}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter instructor's name"
                    />
                </div>

                {/* Difficulty Level */}
                <div className="space-y-2">
                    <label htmlFor="difficultyLevel" className="block text-sm font-medium text-gray-700">
                        Difficulty Level
                    </label>
                    <select
                        id="difficultyLevel"
                        name="difficultyLevel"
                        value={formData.difficultyLevel}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price (Optional)
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter price (if applicable)"
                    />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                        Tags (Optional)
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter tags separated by commas"
                    />
                </div>

                {/* Prerequisites */}
                <div className="space-y-2">
                    <label htmlFor="prerequisites" className="block text-sm font-medium text-gray-700">
                        Prerequisites (Optional)
                    </label>
                    <input
                        type="text"
                        id="prerequisites"
                        name="prerequisites"
                        value={formData.prerequisites}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter prerequisites (if any)"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full cursor-pointer py-3 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourse;
