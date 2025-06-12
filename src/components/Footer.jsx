import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* First Column: Logo and Slogan */}
          <div className="flex flex-col items-start">
            <img src="/path/to/logo.png" alt="Logo" className="h-12 mb-4" />
            <p className="text-sm text-gray-400">Empowering Your Learning Journey</p>
          </div>

          {/* Second Column: Links */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul>
              <li><a href="#home" className="hover:text-purple-500 transition duration-300">Home</a></li>
              <li><a href="#features" className="hover:text-purple-500 transition duration-300">Features</a></li>
              <li><a href="#pricing" className="hover:text-purple-500 transition duration-300">Pricing</a></li>
            </ul>
          </div>

          {/* Third Column: Social Media Icons */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition duration-300">
                <FaLinkedin size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-pink-500 transition duration-300">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 YourWebsite. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
