import React from "react";
import { useNavigate } from "react-router"; // Import the useNavigate hook for navigation

const CourseCard = ({ course }) => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleViewCourse = () => {
        // Navigate to the course details page, passing the course ID as a parameter
        navigate(`/course/${course._id}`);
    };

    // Fallback image URL using placehold.co with a purple theme
    const fallbackImageUrl = `https://placehold.co/400x200/4c1d95/ffffff?text=Course+Image`;

    return (
        <div className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white transform transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 group relative flex flex-col">
            {/* Course Image Section */}
            <div className="relative overflow-hidden">
                <img
                    src={course.imageUrl || fallbackImageUrl} // Use course.imageUrl or fallback
                    alt={course.courseTitle}
                    className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.target.src = fallbackImageUrl; }} // Fallback if image fails to load
                />
                {/* Category Badge - positioned on top of the image */}
                {course.category && (
                    <div className="absolute top-3 left-3 p-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 shadow-sm">
                            {course.category}
                        </span>
                    </div>
                )}
            </div>

            {/* Course Details Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Course Title */}
                <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2 leading-tight">
                    {course.courseTitle}
                </h2>

                {/* Difficulty Level Badge */}
                {course.difficultyLevel && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3
                    ${course.difficultyLevel === 'Beginner' ? 'bg-green-100 text-green-800' : ''}
                    ${course.difficultyLevel === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${course.difficultyLevel === 'Advanced' ? 'bg-red-100 text-red-800' : ''}`}>
                        {course.difficultyLevel}
                    </span>
                )}

                {/* Instructor Name with Icon */}
                <p className="text-sm text-gray-600 flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Instructor: <span className="font-medium ml-1">{course.instructor}</span>
                </p>

                {/* Duration with Icon */}
                <p className="text-sm text-gray-600 flex items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-gray-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    Duration: <span className="font-medium ml-1">{course.duration}</span>
                </p>

                {/* Course Price */}
                <p className="text-xl font-extrabold text-green-700 mb-4">
                    {course.price ? `$${parseFloat(course.price).toFixed(2)}` : "Free"}
                </p>

                {/* Tags (comma-separated, displayed as chips) */}
                {course.tags && (
                    <div className="mb-4 flex flex-wrap gap-2">
                        {course.tags.split(',').map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* View Course Button - Hidden by default, appears on hover */}
            <div
                className="absolute bottom-0 left-0 right-0 p-6 pt-0 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
            >
                <button
                    onClick={handleViewCourse}
                    className="w-full py-3 px-4 cursor-pointer bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    View Course
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
