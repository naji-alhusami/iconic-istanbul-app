// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { SlidesData } from "./SlidesData";
import "./Home.css";

const Home = () => {
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const [isDivVisible, setIsDivVisible] = useState(false);

  // useEffect(() => {
  //   const totalSlides = SlidesData.length;
  //   setIsDivVisible(true); // Show the div when the component mounts

  //   const slideInterval = setInterval(() => {
  //     setIsDivVisible(false); // Hide the div when the image changes

  //     setTimeout(() => {
  //       setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  //       setIsDivVisible(true); // Show the div after 2 seconds delay when the new image slide appears
  //     }, 2000); // Delay after the image changes before showing the div
  //   }, 6000); // Change slide every 6 seconds

  //   return () => clearInterval(slideInterval);
  // }, []);

  // const slideDuration = 36; // Total duration for one full loop (in seconds)

  return (
    <div className="slider w-screen h-screen flex flex-col items-center justify-center bg-cover bg-top bg-no-repeat">
      {/* {isDivVisible && (
        <div className="justify-center flex flex-col items-center md:flex-col lg:flex-row lg:justify-end md:items-end lg:pt-30 lg:pb-20 md:pt-20">
          {SlidesData.map((data, index) => (
            <motion.div
              key={index}
              className={`bg-opacity-50 bg-black rounded-md flex flex-col items-center p-2 md:p-8 md:flex-col md:items-center lg:items-center ${
                index === currentSlide ? "block" : "hidden"
              }`}
              style={{
                animation: ` ${slideDuration}s infinite`,
                // animationDelay: index === currentSlide ? "0s" : "4s",
              }}
              initial={{ x: 0, opacity: 1 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
              }}
              transition={{ duration: 1 }}
            >
              <div className="text-center mb-8">
                <p className="text-3xl md:text-4xl lg:text-5xl text-white mb-5">
                  {data.heading}
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl text-white">
                  {data.subheading}
                </p>
              </div>

              <Link to="/iconicplaces">
                <button
                  type="button"
                  className="text-md mb-8 rounded-md box-border p-2 transition-all duration-250 text-white font-bold bg-cyan-400 hover:bg-cyan-500 hover:text-white md:text-2xl"
                >
                  {data.buttonText}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Home;
