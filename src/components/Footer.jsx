import React from "react";
import { NavLink } from "react-router"; // Fixed import path for react-router-dom
// Corrected the import path for react-icons. This is a common change in newer versions.
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
// Note: Using a placeholder for the logo import.
import logo from "../assets/logo.png";

const Footer = ({
  navItems = [
    { name: "Home", link: "/" },
    { name: "Add Course", link: "/add-course" },
    { name: "Manage Courses", link: "/manage-courses" },
    { name: "My Enrollments", link: "/my-enrollments" },
  ],
}) => {
  // You no longer need to redefine navItems here. It is passed as a prop.

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12">
          {/* Column 1: Brand and Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center mb-4">
              {/* Assuming you have a logo, if not you can remove this img tag */}
              <img
                src={logo}
                alt="EduFlex Logo"
                className="h-10 w-10 mr-3 rounded-full"
              />
              <span className="text-2xl font-bold tracking-wide">EduFlex</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering your learning journey.
            </p>
          </div>

          {/* Column 2: Quick Links (Dynamically Generated) */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.link}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal Links */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/privacy-policy"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/terms-of-service"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                >
                  Terms of Service
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-lg mb-4 tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transform hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-500 transform hover:scale-110 transition-all duration-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transform hover:scale-110 transition-all duration-300"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Text */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} EduFlex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
