import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const AddPlaceSlider = ({ setShowTableInfo, setShowPlaceSlider }) => {
  const { loading } = useSelector((state) => state.place);
  const placeInfo = useSelector((state) => state.place.selectedPlace);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
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

    // Attach the scroll event listener to the parent container
    const container = document.getElementById("slider-container");
    if (container) {
      container.addEventListener("wheel", handleScroll);

      // Clean up the event listener when the component unmounts
      return () => {
        container.removeEventListener("wheel", handleScroll);
      };
    }
  }, [activeSlide, placeInfo]);

  // const handleBackToTable = () => {
  //   setShowTableInfo(true);
  //   setShowPlaceSlider(false);
  // };

  if (loading) {
    return <Loading />;
  }

  const selectedPlace = placeInfo[0];
  console.log(selectedPlace);
  const profilePictureURLs = selectedPlace.downloadURLs;

  return (
    <div
      id="slider-container"
      className="flex justify-center items-center bg-white w-auto rounded-xl m-4 my-16"
    >
      {/* Slider Container */}
      <div className="bg-gray-400 rounded-xl m-5">
        <div
          className=" w-[17rem] h-[17rem] rounded-xl shadow-xl m-5"
          style={{
            backgroundImage: `url(${profilePictureURLs[activeSlide]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
      {/* Dots */}
      {/* <div className="flex items-center justify-center pb-3 md:flex md:flex-col absolute top-[14rem] md:left-[35.5rem] md:top-[12rem] lg:left-[48rem]">
          {profilePictureURLs.map((_, index) => {
            return (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 md:my-2 cursor-pointer transition-colors duration-300 ${
                  index === activeSlide
                    ? "bg-orange-800 w-8 md:h-8 md:w-2"
                    : "bg-gray-300"
                }`}
                onClick={() => setActiveSlide(index)}
              />
            );
          })}
        </div> */}

      {/* <div className="flex flex-col justify-center items-center bg-white w-auto h-auto rounded-xl absolute top-[16rem]  md:w-[15rem] md:left-[20rem] md:top-[8rem] lg:left-[30rem]">
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
        </div> */}
    </div>
  );
};

export default AddPlaceSlider;
