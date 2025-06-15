import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

const CourseDetails = () => {
    // --- Hooks and Context ---
    const { user, loading: authLoading } = useContext(AuthContext);
    const { courseId } = useParams();
    const navigate = useNavigate();

    // --- State Management ---
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    // --- Custom Toast Notification (replaces SweetAlert2) ---
    const showToast = (type, message) => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: "", type: "success" });
        }, 4000);
    };

    // --- Data Fetching and State Synchronization ---
    useEffect(() => {
        if (authLoading) {
            return; // Wait for authentication to finish before proceeding.
        }

        setIsLoading(true);
        const fetchData = async () => {
            try {
                // Fetch course details from backend
                const courseResponse = await fetch(`https://course-management-server-beryl.vercel.app/courses/${courseId}`);
                if (!courseResponse.ok) throw new Error("Course not found.");

                const courseData = await courseResponse.json();
                setCourse(courseData);

                // Check if the user is enrolled in the course
                if (user) {
                    const enrollmentResponse = await fetch(`https://course-management-server-beryl.vercel.app/enrollment/${courseId}?email=${user.email}`);
                    const enrollmentStatus = await enrollmentResponse.json();
                    setIsEnrolled(enrollmentStatus); // Set enrollment status based on backend response
                } else {
                    setIsEnrolled(false); // User is not logged in
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setCourse(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [courseId, user, authLoading]);

    // --- Event Handlers ---
    const handleEnroll = async () => {
        if (!user) {
            showToast("warning", "Login required to enroll!");
            setTimeout(() => navigate('/auth/login', { state: { from: `/courses/${courseId}` } }), 2000); // Delay before navigating to login
            return;
        }

        if (isEnrolled) return; // Prevent re-enrollment

        const enrollmentData = {
            userEmail: user.email,
            courseId: course._id,
        };

        try {
            // Call backend to enroll the user
            const enrollResponse = await fetch("https://course-management-server-beryl.vercel.app/enroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(enrollmentData),
            });

            const result = await enrollResponse.json();
            if (result.message === "Enrolled successfully") {
                setIsEnrolled(true); // Set state to reflect that the user is enrolled
                showToast("success", "Enrolled successfully!");
            } else {
                showToast("error", "Enrollment failed. Please try again.");
            }
        } catch (error) {
            showToast("error", "Enrollment failed. Please try again.");
        }
    };

    // --- Render Logic ---
    if (isLoading || authLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center p-10 bg-gray-50 h-screen flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold text-red-500">Course Not Found</h2>
                <p className="text-gray-600 mt-2">The course you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 relative">
            {/* --- Custom Toast Component --- */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={`fixed top-5 right-5 p-4 rounded-lg shadow-2xl z-50 text-white font-semibold ${toast.type === "success" ? "bg-green-500" : toast.type === "warning" ? "bg-yellow-500" : "bg-red-500"}`}
                    >
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-xl shadow-lg">
                <img
                    src={course.imageUrl}
                    alt={course.courseTitle}
                    className="w-full h-64 object-cover rounded-lg mb-6 shadow"
                />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.courseTitle}</h1>
                <p className="text-gray-600 mb-6 text-lg">{course.shortDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
                    <InfoCard label="Instructor" value={course.instructor} />
                    <InfoCard label="Duration" value={course.duration} />
                    <InfoCard label="Price" value={course.price > 0 ? `$${course.price}` : "Free"} isPrice={true} />
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleEnroll}
                        className={`w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                            isEnrolled
                                ? "bg-green-600 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                        disabled={isEnrolled}
                    >
                        {isEnrolled ? "✅ You are Enrolled" : "Enroll Now"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;

// InfoCard Component for Displaying Course Info
const InfoCard = ({ label, value, isPrice = false }) => (
    <div className="bg-gray-100 p-4 rounded-lg">
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`font-semibold ${isPrice ? 'text-2xl text-indigo-600' : 'text-gray-800'}`}>{value}</p>
    </div>
);
