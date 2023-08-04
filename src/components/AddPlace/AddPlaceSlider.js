import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const AddPlaceSlider = ({ setShowTableInfo, setShowPlaceSlider }) => {
  const { loading } = useSelector((state) => state.place);
  const placeInfo = useSelector((state) => state.place.selectedPlace);

  const [activeSlide, setActiveSlide] = useState(0);

  const [isSmall, setIsSmall] = useState(null);

  const handleNextSlide = useCallback(() => {
    setActiveSlide(
      (prevSlide) => (prevSlide + 1) % placeInfo[0].downloadURLs.length
    );
  }, [placeInfo]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlide(
      (prevSlide) =>
        (prevSlide - 1 + placeInfo[0].downloadURLs.length) %
        placeInfo[0].downloadURLs.length
    );
  }, [placeInfo]);

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY;

      if (delta > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
      event.preventDefault();
    };

    const handleResize = () => {
      setIsSmall(window.innerWidth <= 768);
    };

    const container = document.getElementById("slider-container");
    if (container) {
      if (isSmall) {
        container.removeEventListener("wheel", handleScroll);
      } else {
        container.addEventListener("wheel", handleScroll, { passive: false });
      }

      window.addEventListener("resize", handleResize);

      // Clean up the event listeners when the component unmounts
      return () => {
        container.removeEventListener("wheel", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isSmall, handleNextSlide, handlePrevSlide]);

  const handleBackToTable = () => {
    setShowTableInfo(true);
    setShowPlaceSlider(false);
  };

  if (loading) {
    return <Loading />;
  }

  const selectedPlace = placeInfo[0];
  console.log(selectedPlace);
  const profilePictureURLs = selectedPlace.downloadURLs;

  return (
    <div
      id="slider-container"
      className="flex flex-col justify-center items-center bg-white w-auto rounded-xl mx-[2rem] mb-[10rem] mt-[15rem] p-4 relative z-10 md:flex md:flex-row md:justify-center md:items-center md:mt-[10rem] md:mx-20 lg:mx-40 lg:mt-[10rem]"
    >
      {/* Slider Container */}
      <div className="md:flex md:flex-col">
        <div className="bg-gray-400 rounded-xl m-2 p-[0.1rem] mt-[-10rem] relative z-20">
          <div
            className=" w-[17rem] h-[17rem] rounded-xl shadow-md m-2 md:w-[22rem] md:h-[22rem] md:w-[26rem] md:h-[26rem]"
            style={{
              backgroundImage: `url(${profilePictureURLs[activeSlide]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        {/* Dots & Buttons */}
        <div className="flex items-center justify-center my-5 pb-3 md:flex md:flex-row ">
          {isSmall ? (
            <>
              <button
                type="button"
                className="bg-orange-400 p-2 rounded-md hover:bg-orange-900 hover:text-white mx-2"
                onClick={handlePrevSlide}
              >
                Prev
              </button>
              <button
                type="button"
                className="bg-orange-400 p-2 rounded-md hover:bg-orange-900 hover:text-white"
                onClick={handleNextSlide}
              >
                Next
              </button>
            </>
          ) : (
            profilePictureURLs.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 cursor-pointer transition-colors duration-300 ${
                  index === activeSlide ? "bg-orange-800 w-8 " : "bg-gray-300"
                }`}
                onClick={() => setActiveSlide(index)}
              />
            ))
          )}
        </div>
      </div>

      {/* Information */}
      <div className="bg-white w-auto h-auto rounded-xl flex flex-col justify-center items-center">
        <h1 className="text-orange-900 text-2xl font-bold">
          {selectedPlace.name}
        </h1>
        <p>{selectedPlace.title}</p>
        <p className="px-10 py-5">{selectedPlace.description}</p>
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-900 hover:text-white p-2 rounded-md"
          onClick={handleBackToTable}
        >
          Back to Places Table
        </button>
      </div>
    </div>
  );
};

export default AddPlaceSlider;
