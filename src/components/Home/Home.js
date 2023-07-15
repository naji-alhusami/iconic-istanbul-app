import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import BackgroundImage from "../Images/BackgroundImage.jpg";

const Home = () => {
  return (
    <div
      className=" w-screen h-screen bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${BackgroundImage})`, top: 0 }}
    >
      <div className="flex flex-col pt-12 pb-12  items-end md:flex-col   lg:flex-row lg:justify-end md:items-end lg:pt-30 lg:pb-20 md:pt-20">
        <div className="bg-opacity-90 bg-orange-800 rounded-l-md flex flex-col items-center p-10  md:flex-col md:items-center  lg:items-center">
          <motion.p
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl mb-5 md:text-4xl lg:text-5xl text-white"
          >
            Please Check
          </motion.p>
          <motion.p
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl mb-5 md:text-4xl lg:text-5xl text-white"
          >
            Iconic Places In Istanbul
          </motion.p>
          <Link to="/healthcenters">
            <button
              type="button"
              className="text-md mb-8 rounded-md box-border p-2 transition-all duration-250 text-white font-bold bg-cyan-400 hover:bg-cyan-500 hover:text-white md:text-2xl"
            >
              ICONIC PLACES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
