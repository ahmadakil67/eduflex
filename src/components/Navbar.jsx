import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { Typewriter } from "react-simple-typewriter";
import { IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router"; // Use react-router-dom for Link if you're using BrowserRouter
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      link: "/", // Often just '/' for the home route
    },
    {
      name: "Add Course",
      link: "/add-course",
    },
    {
      name: "Manage Courses",
      link: "/manage-courses",
    },
    {
      name: "My Enrollments",
      link: "/my-enrollments",
    },
  ];

  const handleLogout = () => {
    logOut();
  };

  return (
    <motion.div
      className="navbar max-w-6xl mx-auto rounded-3xl shadow-md backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {" "}
      <div className="flex justify-between max-w-7xl mx-auto items-center rounded-full px-6 py-3 fixed top-0 left-0 right-0 z-50">
        {" "}
        <div className="flex items-center flex-shrink-0 relative">
          <img className="h-9 w-9 mr-3" src={logo} alt="Logo" />{" "}
          <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden md:block text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap">
            {" "}
            <Typewriter
              words={["EduFlex", "Keep Learning"]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1000}
            />{" "}
          </div>{" "}
        </div>{" "}
        <div className="hidden md:flex flex-grow justify-center space-x-5">
          {" "}
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5 group" // Added 'group' class
            >
              {item.name}{" "}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>{" "}
            </Link>
          ))}{" "}
        </div>{" "}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {" "}
          {user ? (
            <>
              {" "}
              <img
                src={user.photoURL || "default-avatar.png"}
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />{" "}
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout{" "}
              </button>{" "}
            </>
          ) : (
            <>
              {" "}
              <Link to={"/auth/login"}>
                <button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Login{" "}
                </button>
              </Link>{" "}
              <Link to={"/auth/register"}>
                <button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Register{" "}
                </button>
              </Link>{" "}
            </>
          )}{" "}
        </div>{" "}
        <div className="md:hidden flex items-center">
          {" "}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none focus:text-gray-900"
          >
            {" "}
            {isOpen ? (
              <IoClose className="h-8 w-8" />
            ) : (
              <IoMenu className="h-8 w-8" />
            )}{" "}
          </button>{" "}
        </div>{" "}
      </div>
      {/* Mobile menu with AnimatePresence for smooth entry/exit */}{" "}
      <AnimatePresence>
        {" "}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden z-10"
          >
            {" "}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {" "}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
                >
                  {item.name}{" "}
                </Link>
              ))}{" "}
              <div className="pt-2 pb-3 flex flex-col gap-2">
                {" "}
                {/* Changed to flex-col for mobile buttons */}{" "}
                {user ? (
                  <>
                    {" "}
                    <div className="flex items-center gap-2 px-3 py-2">
                      {" "}
                      {/* Added container for profile picture */}{" "}
                      <img
                        src={user.photoURL || "default-avatar.png"}
                        alt="User Profile"
                        className="h-8 w-8 rounded-full"
                      />{" "}
                      <span className="font-medium text-gray-700">
                        {user.displayName || "User"}
                      </span>{" "}
                    </div>{" "}
                    <button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Logout{" "}
                    </button>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <Link to={"/auth/login"} className="w-full">
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                        Login{" "}
                      </button>
                    </Link>{" "}
                    <Link to={"/auth/register"} className="w-full">
                      <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                        Register{" "}
                      </button>
                    </Link>{" "}
                  </>
                )}{" "}
              </div>{" "}
            </div>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </motion.div>
  );
};

export default Navbar;
