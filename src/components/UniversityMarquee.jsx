import React from 'react';

const UniversityMarquee = () => {
  return (
    <div className="max-w-full bg-gray-100 py-6 font-sans overflow-hidden"> {/* Added overflow-hidden to contain the scroll */}
      <h2 className="text-4xl text-center font-extrabold text-gray-800 mb-8 tracking-tight">
        Students Learning from These World Famous Universities
      </h2>
      <style>
        {`
        /* Define the scrolling animation */
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }

        /* Container for the marquee items */
        .marquee-container {
          display: flex;
          white-space: nowrap; /* Prevent items from wrapping */
          animation: scroll 15s linear infinite; /* Adjust duration for speed */
          padding: 16px 0; /* Tailwind py-4 */
        }

        /* Duplicate the content to ensure continuous loop without jump */
        .marquee-container > span {
          margin-right: 96px; /* Tailwind space-x-24 (24 * 4px) */
          flex-shrink: 0; /* Prevent items from shrinking */
        }

        /* Hover effect to pause animation */
        .marquee-wrapper:hover .marquee-container {
          animation-play-state: paused;
        }

        /* Fade effect for ends (optional, mimics react-fast-marquee gradient) */
        .marquee-wrapper {
            position: relative;
        }

        .marquee-wrapper::before,
        .marquee-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            width: 80px; /* Width of the fade effect */
            height: 100%;
            pointer-events: none;
            z-index: 10;
        }

        .marquee-wrapper::before {
            left: 0;
            background: linear-gradient(to right, rgb(243, 244, 246), rgba(243, 244, 246, 0)); /* Matches bg-gray-100 */
        }

        .marquee-wrapper::after {
            right: 0;
            background: linear-gradient(to left, rgb(243, 244, 246), rgba(243, 244, 246, 0)); /* Matches bg-gray-100 */
        }
        `}
      </style>
      <div className="marquee-wrapper"> {/* Added wrapper for gradient effect */}
        <div className="marquee-container cursor-pointer">
          {/* Duplicate content for seamless looping */}
          <span className="text-3xl font-bold text-red-800 tracking-wide transform hover:scale-105 transition-transform duration-300">Harvard University</span>
          <span className="text-3xl font-bold text-red-700 tracking-wide transform hover:scale-105 transition-transform duration-300">Stanford University</span>
          <span className="text-3xl font-bold text-blue-900 tracking-wide transform hover:scale-105 transition-transform duration-300">University of Oxford</span>
          <span className="text-3xl font-bold text-gray-700 tracking-wide transform hover:scale-105 transition-transform duration-300">MIT - Massachusetts Institute of Technology</span>
          <span className="text-3xl font-bold text-blue-600 tracking-wide transform hover:scale-105 transition-transform duration-300">University of Cambridge</span>
          <span className="text-3xl font-bold text-orange-700 tracking-wide transform hover:scale-105 transition-transform duration-300">Princeton University</span>
          <span className="text-3xl font-bold text-indigo-800 tracking-wide transform hover:scale-105 transition-transform duration-300">University of California, Berkeley</span>
          <span className="text-3xl font-bold text-blue-700 tracking-wide transform hover:scale-105 transition-transform duration-300">Columbia University</span>

          {/* Duplicate the items for infinite loop illusion */}
          <span className="text-3xl font-bold text-red-800 tracking-wide transform hover:scale-105 transition-transform duration-300">Harvard University</span>
          <span className="text-3xl font-bold text-red-700 tracking-wide transform hover:scale-105 transition-transform duration-300">Stanford University</span>
          <span className="text-3xl font-bold text-blue-900 tracking-wide transform hover:scale-105 transition-transform duration-300">University of Oxford</span>
          <span className="text-3xl font-bold text-gray-700 tracking-wide transform hover:scale-105 transition-transform duration-300">MIT - Massachusetts Institute of Technology</span>
          <span className="text-3xl font-bold text-blue-600 tracking-wide transform hover:scale-105 transition-transform duration-300">University of Cambridge</span>
          <span className="text-3xl font-bold text-orange-700 tracking-wide transform hover:scale-105 transition-transform duration-300">Princeton University</span>
          <span className="text-3xl font-bold text-indigo-800 tracking-wide transform hover:scale-105 transition-transform duration-300">University of California, Berkeley</span>
          <span className="text-3xl font-bold text-blue-700 tracking-wide transform hover:scale-105 transition-transform duration-300">Columbia University</span>
        </div>
      </div>
    </div>
  );
};

export default UniversityMarquee;
