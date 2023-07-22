import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const AddPlaceSlider = () => {
  const placeInfo = useSelector((state) => state.place.selectedPlace);

  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    placeInfo.map((slide) => {
      return setActiveSlide(
        (prevSlide) => (prevSlide + 1) % slide.profilePictureURLs.length
      );
    });
  };

  const handlePrevSlide = () => {
    placeInfo.map((slide) => {
      return setActiveSlide(
        (prevSlide) =>
          (prevSlide - 1 + slide.profilePictureURLs) %
          slide.profilePictureURLs.length
      );
    });
  };

  const handleScroll = (event) => {
    // Determine the scroll direction (positive: down, negative: up)
    const delta = event.deltaY;

    // Update the active slide based on the scroll direction
    if (delta > 0) {
      handleNextSlide();
    } else {
      handlePrevSlide();
    }
  };

  useEffect(() => {
    // Attach the scroll event listener to the parent container
    const container = document.getElementById("slider-container");
    container.addEventListener("wheel", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div
      id="slider-container"
      className=" bg-white w-auto rounded-xl h-[30rem] m-4 my-16 relative md:w-[37rem] lg:w-[50rem] lg:h-[35rem]"
    >
      {/* Slider Container */}
      <div className=" bg-white w-[17rem] rounded-xl shadow-xl h-[15rem] m-5 overflow-hidden absolute top-[4rem] transform -translate-y-1/2 md:transform md:-translate-y-1/2 md:top-[13.5rem] md:left-[-6rem] md:w-[24rem] md:h-[20rem] lg:w-[33rem] lg:h-[25rem] lg:top-[16rem]">
        {placeInfo.map((slide) => {
          return slide.profilePictureURLs.map((image, index) => (
            <div
              key={index}
              className={`bg-gray-400 p-2 absolute w-full h-full top-0 transition-opacity duration-500 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={image}
                className="w-full h-full object-cover"
              />
            </div>
          ));
        })}
      </div>
      {/* Dots */}
      <div className="flex justify-center pb-3 md:flex md:flex-col absolute top-[14rem] md:left-[35.5rem] md:top-[12rem] lg:left-[48rem]">
        {placeInfo.map((slide) => {
          return slide.profilePictureURLs.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 md:my-2 cursor-pointer transition-colors duration-300 ${
                index === activeSlide
                  ? "bg-orange-800 w-8 md:h-8 md:w-2"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ));
        })}
      </div>

      {placeInfo.map((info) => {
        return (
          <div className="bg-white w-auto rounded-xl p-8 absolute top-[16rem]  md:w-[15rem] md:left-[20rem] md:top-[8rem] lg:left-[30rem]">
            <p>{info.title}</p>
            <p>{info.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AddPlaceSlider;
