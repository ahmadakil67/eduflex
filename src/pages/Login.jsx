import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { logIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // To toggle between Login and Register forms
  const location = useLocation();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        console.log(result);
        showToast("success", "Logged In Successfully");
        navigate(location.state || "/");
      })
      .catch(() => {
        showToast("error", "Wrong Email or Password");
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        showToast("success", "Logged in with Google");
        navigate(location.state || "/");
      })
      .catch((error) => {
        showToast("error", error.message || "Google Login Failed");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTabChange = (isLogin) => {
    setIsLogin(isLogin);
    // Navigate to the respective route when switching tabs
    navigate(isLogin ? '/auth/login' : '/auth/register');
  };

  return (
    <div className="hero mb-9 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-11/12">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-4xl text-center font-bold">EduFlex</h1>
            <p className="text-sm text-center">Your Gateway to Learning</p>
            {/* Tabs for Login and Register */}
            <div className="flex justify-center space-x-8 mt-3">
              <button
                onClick={() => handleTabChange(true)}
                className={`text-lg font-medium cursor-pointer ${isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
              >
                Login
              </button>
              <button
                onClick={() => handleTabChange(false)}
                className={`text-lg font-medium cursor-pointer ${!isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
              >
                Register
              </button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin}>
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                  required
                />

                <div className="form-control w-full">
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pr-12"
                      placeholder="Password"
                      required
                    />
                    <div
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                </div>

                <div>
                  <Link
                    className="link link-hover text-sm"
                    to="/auth/forgot-password"
                    state={{
                      email: document.querySelector('input[name="email"]')?.value || "",
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="btn btn-neutral mt-4 w-full">
                  Login
                </button>
              </form>
            ) : (
              // Register Form
              <form>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Enter your email"
                  required
                />
                <div className="form-control w-full">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Create a password"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">Confirm Password</label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <button className="btn btn-neutral mt-4 w-full">Register</button>
              </form>
            )}

            <div className="text-center mt-4">
              <p className="text-sm mb-2">or login with</p>
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full flex items-center justify-center gap-2"
              >
                <FcGoogle size={20} />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
