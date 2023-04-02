import React from "react";
import { Link } from "react-router-dom";

import BackgroundImage from "../Images/BackgroundImage.jpg";

const Thanks = () => {
  return (
    <div
      className=" w-screen h-screen bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${BackgroundImage})`, top: 0 }}
    >
      <div className="flex flex-col pt-3 pb-12 mr-6  items-end md:flex-col   lg:flex-row lg:justify-end md:items-end md:mr-12 sm:mr-12 lg:pt-30 xl:mr-12 lg:pb-20 md:pt-20">
        <div className=" flex flex-col items-end   md:flex-col md:items-  lg:items-center lg:mr-12">
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-bold">
            {" "}
            Thanks for signing-up,
          </p>
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-bold">
            {" "}
            please check your email
          </p>
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-bold">
            {" "}
            you need to verify your account
          </p>
          <Link to="/">
            <button
              type="button"
              className="text-md mb-8 rounded-md box-border p-2 transition-all duration-250 bg-cyan-400 hover:bg-cyan-500 hover:text-white md:text-2xl"
            >
              Back To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
