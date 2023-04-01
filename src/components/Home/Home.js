import React from "react";

import BackgroundImage from "../Images/BackgroundImage.jpg";

const Home = () => {
  return (
    <div
      className=" w-screen h-screen bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${BackgroundImage})`, top: 0 }}
    >
      <div className="flex flex-col pt-12 pb-12 mr-6  items-end md:flex-col   lg:flex-row lg:justify-end md:items-end md:mr-12 sm:mr-12 lg:pt-30 xl:mr-12 lg:pb-20 md:pt-20">
        <div className=" flex flex-col items-end   md:flex-col md:items-  lg:items-center lg:mr-12">
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-bold">
            {" "}
            Please Check
          </p>
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-bold">
            {" "}
            Our Health Centers
          </p>
          {/* <p className="text-5xl mb-5  md:text-7xl lg:text-9xl "></p> */}
          <button
            onClick={() => "/"}
            type="button"
            className="text-md mb-8 rounded-md box-border p-2 transition-all duration-250 bg-cyan-400 hover:bg-cyan-500 hover:text-white md:text-2xl"
          >
            Health Centers
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;