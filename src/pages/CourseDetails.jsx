import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider"; // Assuming you have this context for user data
import { useParams } from "react-router"; // To get the courseId from the URL

const CourseDetails = () => {
    const { user } = useContext(AuthContext); // Get logged-in user
    const { courseId } = useParams(); // Get courseId from URL
    const [course, setCourse] = useState(null); // Store course data
    const [isEnrolled, setIsEnrolled] = useState(false); // Track enrollment status
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Fetch the course details
        fetch(`http://localhost:3000/courses/${courseId}`)
            .then((res) => res.json())
            .then((data) => {
                setCourse(data);
                checkEnrollmentStatus(data._id);
            })
            .catch((error) => {
                console.error("Error fetching course details:", error);
            })
            .finally(() => setLoading(false));
    }, [courseId]);

    const checkEnrollmentStatus = (courseId) => {
        if (user) {
            // Check if the user is already enrolled in this course
            fetch(`http://localhost:3000/enrollment/${courseId}?email=${user.email}`)
                .then((res) => res.json())
                .then((isEnrolled) => {
                    setIsEnrolled(isEnrolled); // Update enrollment status
                })
                .catch((error) => console.error("Error checking enrollment:", error));
        }
    };

    const handleEnroll = () => {
        if (!user) {
            Swal.fire({
                title: "Please log in",
                text: "You need to log in to enroll in the course.",
                icon: "warning",
            });
            return;
        }

        // Enroll the user in the course
        const enrollmentData = {
            userEmail: user.email,
            courseId: course._id,
        };

        fetch("http://localhost:3000/enroll", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(enrollmentData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Enrolled successfully") {
                    setIsEnrolled(true); // Set enrollment status to true
                    Swal.fire({
                        title: "Success",
                        text: "You have successfully enrolled in the course.",
                        icon: "success",
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: "Failed to enroll in the course. Please try again.",
                    icon: "error",
                });
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course) {
        return <div>Course not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-4">{course.courseTitle}</h2>
            <img
                src={course.imageUrl}
                alt={course.courseTitle}
                className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-600 mb-4">{course.shortDescription}</p>
            <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
            <p className="text-sm text-gray-500 mb-2">Duration: {course.duration}</p>
            <p className="text-lg font-bold text-green-600 mb-4">{course.price ? `$${course.price}` : "Free"}</p>

            {/* Enroll Button */}
            <button
                onClick={handleEnroll}
                className={`w-full cursor-pointer py-3 px-4 rounded-md ${
                    isEnrolled ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
                } text-white font-semibold`}
                disabled={isEnrolled || !user}
            >
                {isEnrolled ? "Enrolled" : "Enroll"}
            </button>
        </div>
    );
};

export default CourseDetails;
