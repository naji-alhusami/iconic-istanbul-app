import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { SlidesData } from "./SlidesData";
import "./Home.css";

const Home = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % SlidesData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={currentSlideIndex}
      className="h-screen w-screen flex items-center justify-center bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${SlidesData[currentSlideIndex].background})`,
        animation: "fadeIn 5s",
      }}
    >
      <div className="flex flex-col mx-5">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="rounded-t-md px-5 pt-5 pb-1 bg-opacity-50 bg-black flex flex-col"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white text-center">
            {SlidesData[currentSlideIndex].heading}
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="rounded-b-md px-5 pb-5 pt-1 bg-opacity-50 bg-black flex flex-col"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl text-white text-center">
            {SlidesData[currentSlideIndex].subheading}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
