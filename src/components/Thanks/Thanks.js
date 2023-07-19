import React from "react";
import { Link } from "react-router-dom";

const Thanks = () => {
  return (
    <div className=" w-screen h-screen bg-cover bg-top bg-no-repeat">
      <div className="flex flex-col pt-12 pb-12  items-end md:flex-col   lg:flex-row lg:justify-end md:items-end lg:pt-30 lg:pb-20 md:pt-20">
        <div className="bg-opacity-90 bg-orange-800 rounded-l-md flex flex-col items-center p-4 md:p-8  md:flex-col md:items-center  lg:items-center">
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-white">
            {" "}
            Thanks for signing-up,
          </p>
          <p className="text-3xl mb-5 md:text-4xl lg:text-5xl text-white">
            {" "}
            please check your email
          </p>
          <Link to="/">
            <button
              type="button"
              className="text-md mb-8 rounded-md box-border p-2 transition-all duration-250 text-white font-bold bg-cyan-400 hover:bg-cyan-500 hover:text-white md:text-2xl"
            >
              BACK TO HOME
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
