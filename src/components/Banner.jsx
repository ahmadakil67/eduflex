import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Changed import paths for Swiper CSS to be more explicit
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

import banner_1 from "../assets/banner_1.webp"; 
import banner_2 from "../assets/banner_2.webp"; 
import banner_3 from "../assets/banner_3.webp"; 
import banner_4 from "../assets/banner_4.webp"; 

// Placeholder images for demonstration. In a real app,
// you would use your actual imported banner_x.webp assets.
const slides = [
  {
    image: banner_1,
    title: "Learn Anytime, Anywhere",
    desc: "Access courses from top instructors and learn at your own pace, wherever you are.",
  },
  {
    image: banner_2,
    title: "Wide Range of Courses",
    desc: "Choose from a variety of topics, including technology, business, and personal development.",
  },
  {
    image: banner_3,
    title: "Expert-Led Learning",
    desc: "Get insights from industry experts and improve your skills with hands-on projects.",
  },
  {
    image: banner_4,
    title: "Join a Global Community",
    desc: "Connect with learners around the world, share knowledge, and expand your network.",
  },
];

const Banner = () => {
  // State to keep track of the currently active slide's real index
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-[60vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] overflow-hidden rounded-xl my-5">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true} // Enable looping for continuous slide transitions
        autoplay={{
          delay: 3500, // Delay before next slide
          disableOnInteraction: false, // Autoplay continues even after user interaction
        }}
        navigation={true} // Enable navigation arrows
        pagination={{ clickable: true }} // Enable clickable pagination dots
        modules={[Autoplay, Pagination, Navigation]} // Load necessary Swiper modules
        className="w-full h-full"
        // Event listener to update the activeIndex state when the slide changes
        // swiper.realIndex is used for loop mode to get the index of the actual slide data
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}> {/* Unique key for each SwiperSlide */}
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              {/* Conditional rendering for video or image */}
              {slide.video ? (
                <video
                  src={slide.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={slide.image}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover"
                  // Fallback for image load errors
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback also fails
                    e.target.src =
                      "https://placehold.co/1536x1024/cccccc/333333?text=Image+Load+Error";
                  }}
                />
              )}

              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center text-center p-6 rounded-xl">
                {/* Only render motion components if this slide is the active one */}
                {idx === activeIndex && (
                  <>
                    <motion.h2
                      // The key changes when `activeIndex` changes, forcing re-animation
                      key={`${slide.title}-${idx}-${activeIndex}`}
                      initial={{ opacity: 0, y: 30 }} // Initial animation state
                      animate={{ opacity: 1, y: 0 }} // Animate to this state
                      transition={{ duration: 0.6 }} // Animation duration
                      className="text-white text-3xl md:text-5xl font-extrabold mb-2 select-none"
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.p
                      // The key changes when `activeIndex` changes, forcing re-animation
                      key={`${slide.desc}-${idx}-${activeIndex}`}
                      initial={{ opacity: 0, y: 20 }} // Initial animation state
                      animate={{ opacity: 1, y: 0 }} // Animate to this state
                      transition={{ duration: 0.8, delay: 0.2 }} // Animation duration with a slight delay
                      className="text-white text-sm md:text-lg max-w-2xl select-none"
                    >
                      {slide.desc}
                    </motion.p>
                  </>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
