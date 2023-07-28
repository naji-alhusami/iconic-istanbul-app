import React, { useState, useEffect } from "react";
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
      key={currentSlideIndex} // Add a unique key to force remounting and trigger animation on slide change
      className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: `url(${SlidesData[currentSlideIndex].background})`,
        animation: "fadeIn 5s",
      }}
    >
      <div>
        <h1>{SlidesData[currentSlideIndex].heading}</h1>
        <p>{SlidesData[currentSlideIndex].subheading}</p>
      </div>
    </div>
  );
};

export default Home;