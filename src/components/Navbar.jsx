import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { Typewriter } from 'react-simple-typewriter';
import { IoMenu, IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router'; // Corrected import for Link
import { AuthContext } from '../provider/AuthProvider';



const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);  // Get user and logOut from AuthContext
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      name: 'Home',
      link: '/#home',
    },
    {
      name: 'Courses',
      link: '/#courses',
    },
    {
      name: 'Add Course',
      link: '/add-course',
    },
  ];

  const handleLogout = () => {
    logOut(); // Call the logOut function from AuthContext
  };

  return (
    <motion.div
      className="navbar max-w-6xl mx-auto rounded-3xl shadow-md backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="flex justify-between max-w-7xl mx-auto items-center rounded-full px-6 py-3 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center flex-shrink-0 relative"> 
          <img className="h-9 w-9 mr-3" src={logo} alt="Logo" />
          <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden md:block text-xl font-bold text-gray-800 tracking-tight whitespace-nowrap">
            <Typewriter
              words={['EduFlex', 'Keep Learning']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={100}
              deleteSpeed={100}
              delaySpeed={1000}
            />
          </div>
        </div>

        <div className="hidden md:flex flex-grow justify-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}  // Use Link's 'to' prop for navigation
              className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          {user ? (
            <>
              {/* Display user photo and logout button if user is logged in */}
              <img
                src={user.photoURL || "default-avatar.png"}  // Use user's photo URL or a default image
                alt="User Profile"
                className="h-8 w-8 rounded-full"
              />
              <button
                onClick={handleLogout}
                className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Login/Register buttons if user is not logged in */}
              <Link to={'/auth/login'} ><button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Login
              </button></Link>
              <Link to={'/auth/register'}><button className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                Register
              </button></Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none focus:text-gray-900">
            {isOpen ? <IoClose className="h-8 w-8" /> : <IoMenu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out z-10 ${
          isOpen ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}  // Use Link's 'to' prop for navigation
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition duration-200"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 pb-3 flex">
            {user ? (
              <>
                {/* Mobile view: Show user photo and logout button */}
                <img
                  src={user.photoURL || "default-avatar.png"}  // Use user's photo URL or a default image
                  alt="User Profile"
                  className="h-8 w-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Mobile view: Show Login/Register buttons */}
                <Link to={'/auth/login'}><button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Login
                </button></Link>
                <Link to={'/auth/register'}><button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
                  Register
                </button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
