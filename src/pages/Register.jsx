import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import path for react-router-dom
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // To toggle between Login and Register forms
  const [confirmPassword, setConfirmPassword] = useState(""); // For Confirm Password field

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (password.length < 8) {
      showToast("error", "Password must be at least 8 characters long.");
      return;
    }

    if (!upperCase || !lowerCase || !specialChar || !hasNumber) {
      showToast(
        "error",
        "Password must contain at least one uppercase, one lowercase, one special character, and one number."
      );
      return;
    }

    if (password.includes(email)) {
      showToast("error", "Password cannot contain your email address.");
      return;
    }

    if (password !== confirmPassword) {
      showToast("error", "Password and Confirm Password must match.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Update the user's profile after successful registration
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...result.user, displayName: name, photoURL: photo });
            showToast("success", "Registered Successfully");
            navigate("/"); // Redirect to homepage or previously visited page
          })
          .catch((error) => {
            showToast("warning", "Profile update failed");
            console.log(error.message);
          });
      })
      .catch((error) => {
        showToast("error", error.message);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        showToast("success", "Registered with Google");
        navigate("/"); // Redirect after successful registration
      })
      .catch((error) => {
        showToast("error", error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTabChange = (isLogin) => {
    setIsLogin(isLogin);
    navigate(isLogin ? "/auth/login" : "/auth/register");
  };

  return (
    <div className="hero mb-9 min-h-screen">
      <Helmet>
        <title>Register - EduFlex</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse w-11/12">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl text-center font-bold">EduFlex</h1>
            <p className="text-sm text-center">Your Gateway to Learning</p>

            {/* Tabs for Login and Register */}
            <div className="flex justify-center space-x-8 mt-3">
              <button
                onClick={() => handleTabChange(true)}
                className={`text-lg font-medium cursor-pointer ${
                  isLogin
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-700"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleTabChange(false)}
                className={`text-lg font-medium cursor-pointer ${
                  !isLogin
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-700"
                }`}
              >
                Register
              </button>
            </div>

            {/* Register Form */}
            {isLogin ? (
              <form>
                {/* Login form content */}
                <p>Login Form will be here...</p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <label className="label">Your Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Enter Your Name"
                  required
                />

                <label className="label">Photo URL</label>
                <input
                  name="photo"
                  type="text"
                  className="input"
                  placeholder="Photo URL"
                />

                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <div className="relative w-full">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pr-12"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-500"
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <label className="label">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Register
                </button>
              </form>
            )}

            <div className="text-center mt-4">
              <p>or</p>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full mt-2 flex items-center justify-center gap-2"
              >
                <FcGoogle size={20} />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
