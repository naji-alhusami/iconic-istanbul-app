import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const AddPlaceSlider = ({ setShowTableInfo, setShowPlaceSlider }) => {
  const { loading } = useSelector((state) => state.place);
  const placeInfo = useSelector((state) => state.place.selectedPlace);

  const [activeSlide, setActiveSlide] = useState(0);

  const isSmallScreen = () => {
    return window.innerWidth <= 768;
  };
  const [isSmall, setIsSmall] = useState(isSmallScreen());

  const handleNextSlide = () => {
    setActiveSlide(
      (prevSlide) => (prevSlide + 1) % placeInfo[0].downloadURLs.length
    );
  };

  const handlePrevSlide = () => {
    setActiveSlide(
      (prevSlide) =>
        (prevSlide - 1 + placeInfo[0].downloadURLs.length) %
        placeInfo[0].downloadURLs.length
    );
  };

  useEffect(() => {
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

    const handleResize = () => {
      setIsSmall(isSmallScreen());
    };

    // Attach or detach the event listener based on the screen size
    const container = document.getElementById("slider-container");
    if (container) {
      if (isSmall) {
        container.removeEventListener("wheel", handleScroll);
      } else {
        container.addEventListener("wheel", handleScroll);
      }

      window.addEventListener("resize", handleResize);

      // Clean up the event listeners when the component unmounts
      return () => {
        container.removeEventListener("wheel", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isSmall]);

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
      className={`flex flex-col justify-center items-center bg-white w-auto rounded-xl m-4 my-16 p-4 ${
        isSmall ? "overflow-hidden" : ""
      }`}
    >
      {/* Slider Container */}
      <div className="bg-gray-400 rounded-xl m-2">
        <div
          className=" w-[17rem] h-[18rem] rounded-xl shadow-md m-2"
          style={{
            backgroundImage: `url(${profilePictureURLs[activeSlide]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      {/* Dots & Buttons */}
      <div className="flex items-center justify-center pb-3 md:flex md:flex-col">
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
              className={`w-2 h-2 rounded-full mx-1 md:my-2 cursor-pointer transition-colors duration-300 ${
                index === activeSlide
                  ? "bg-orange-800 w-8 md:h-8 md:w-2"
                  : "bg-gray-300"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))
        )}
      </div>

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
