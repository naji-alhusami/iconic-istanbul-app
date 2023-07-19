import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AiFillCaretDown } from "react-icons/ai";

import { logoutUser } from "../../features/users/usersSlice";

import galata from "../Images/Galata.svg";

const Navbar = () => {
  const userLogin = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNavbarInResponsive, setShowNavbarInResponsive] = useState(false);
  const [showProfileInResponsive, setShowProfileInResponsive] = useState(false);

  // dispatch logout user:
  const logOut = (e) => {
    e.preventDefault();
    navigate("/");
    dispatch(logoutUser());
    if (showNavbarInResponsive) {
      setShowNavbarInResponsive(!showNavbarInResponsive);
    }
  };

  const hoverBackgroundColor = "rgba(165, 42, 42, 1)";
  const hoverTextColor = "rgb(255, 255, 255)";

  return (
    <nav className="w-screen sticky top-0 z-50 bg-white shadow font-poppins">
      <div className="justify-between px-4 mx-auto  md:items-center md:flex md:px-8">
        <div className="flex items-center md:block">
          <div className=" md:hidden">
            <button
              type="button"
              className="p-2 text-gray-700 rounded-md outline-none  focus:border-gray-400 focus:border"
              onClick={() => setShowNavbarInResponsive(!showNavbarInResponsive)}
            >
              {showNavbarInResponsive ? (
                <svg
                  className="w-6 h-6 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <Link to="/">
            <motion.div
              className="flex flex-row items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={galata} alt="logo" className="h-9 w-9 mt-2 ml-6" />
              <h2 className="text-xl m-4 ml-3 font-bold text-orange-900">
                EXPLORE ISTANBUL
              </h2>
            </motion.div>
          </Link>
        </div>

        {/* mobile screens */}
        <div
          className={`flex-1 z-10 justify-self-center bg-cyan-50 pt-4 pl-4 h-full text-base left-[-250px]  transition duration-300 transform fixed w-[250px] pb-3 md:block md:pb-0 md:mt-0 ${
            showNavbarInResponsive
              ? "translate-x-full "
              : "translate-x-[-250px]"
          }`}
        >
          <div className="mt-3 space-y-2 lg:hidden md:hidden ">
            <div className="flex flex-col items-start  text-xl ">
              <ul className="items-center justify-center  md:flex md:space-x-6 md:space-y-0">
                <li className="w-fit">
                  <Link
                    to="/"
                    className=" p-1 font-bold text-orange-900"
                    onClick={() => {
                      setShowNavbarInResponsive(!showNavbarInResponsive);
                    }}
                  >
                    <motion.div
                      className="p-2"
                      whileHover={{
                        scale: 1.07,
                        backgroundColor: hoverBackgroundColor,
                        color: hoverTextColor,
                        borderRadius: "0.25rem",
                      }}
                    >
                      HOME
                    </motion.div>
                  </Link>
                </li>
                <li className="w-fit">
                  <Link
                    to="/iconicplaces"
                    className="p-1 font-bold text-orange-900"
                    onClick={() => {
                      setShowNavbarInResponsive(!showNavbarInResponsive);
                    }}
                  >
                    <motion.div
                      className="p-2"
                      whileHover={{
                        scale: 1.07,
                        backgroundColor: hoverBackgroundColor,
                        color: hoverTextColor,
                        borderRadius: "0.25rem",
                      }}
                    >
                      ICONIC ISTANBUL
                    </motion.div>
                  </Link>
                </li>

                <li className="w-fit hover:text-indigo-100 hover:bg-cyan-400 hover:rounded-md cursor-pointer ">
                  <div className=" relative  absolute">
                    {!userLogin.userlogin && (
                      <li>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            to="/login"
                            className="flex justify-center px-4 py-2 text-center font-bold rounded-md shadow transition-all duration-250 bg-cyan-400 bg-orange-400 hover:bg-orange-800 hover:text-white text-m"
                          >
                            Login
                          </Link>
                        </motion.div>
                      </li>
                    )}
                    {userLogin.userlogin && (
                      <div className="w-fit hover:text-indigo-100 hover:bg-cyan-400 hover:rounded-md cursor-pointer relative  absolute">
                        <button
                          type="button"
                          className="flex peer text-white bg-cyan-400 hover:bg-cyan-500 rounded-md p-2"
                          onClick={() =>
                            setShowProfileInResponsive(!showProfileInResponsive)
                          }
                        >
                          Admin
                          <AiFillCaretDown className=" mt-1 ml-2" />
                        </button>
                        {showProfileInResponsive ? (
                          <div className="flex relative peer-hover:flex hover:flex w-[100px] flex-col bg-white drop-shadow-lg">
                            <Link
                              className="p-2 pl-5 text-black hover:bg-cyan-400 hover:text-white"
                              to="/addplace"
                              onClick={() => {
                                setShowNavbarInResponsive(
                                  !showNavbarInResponsive
                                );
                              }}
                            >
                              Centers
                            </Link>
                            <button
                              type="button"
                              className="p-2 text-black hover:bg-cyan-400 hover:text-indigo-100"
                              onClick={logOut}
                            >
                              Log Out
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Large screens */}
        <div className="hidden space-x-2 md:inline-block">
          <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li>
              <Link to="/" className="font-bold text-orange-900">
                <motion.div
                  className="p-2"
                  whileHover={{
                    scale: 1.07,
                    backgroundColor: hoverBackgroundColor,
                    color: hoverTextColor,
                    borderRadius: "0.25rem",
                  }}
                >
                  HOME
                </motion.div>
              </Link>
            </li>
            <li>
              <Link to="/iconicplaces" className="font-bold text-orange-900">
                <motion.div
                  className="p-2"
                  whileHover={{
                    scale: 1.07,
                    backgroundColor: hoverBackgroundColor,
                    color: hoverTextColor,
                    borderRadius: "0.25rem",
                  }}
                >
                  ICONIC ISTANBUL
                </motion.div>
              </Link>
            </li>
            {!userLogin.userlogin && (
              <li>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/login"
                    className="flex justify-center px-4 py-2 text-center font-bold rounded-md shadow transition-all duration-250 bg-cyan-400 bg-orange-400 hover:bg-orange-800 hover:text-white text-m"
                  >
                    Login
                  </Link>
                </motion.div>
              </li>
            )}
            {userLogin.userlogin && (
              <li className="hover:text-indigo-100 hover:bg-cyan-400 hover:rounded-md cursor-pointer ">
                <div className="relative absolute">
                  <div className="flex peer text-white p-2 bg-cyan-500 hover:bg-cyan-600 hover:text-white rounded-md">
                    Admin
                    <AiFillCaretDown className="mt-1 ml-2" />
                  </div>

                  <div className="hidden absolute peer-hover:flex hover:flex w-[100px] flex-col bg-white drop-shadow-lg">
                    <Link
                      className="p-2 pl-6 text-black hover:bg-cyan-500 hover:text-white"
                      to="/addplace"
                    >
                      Centers
                    </Link>
                    <button
                      type="button"
                      className="py-2 text-black hover:bg-cyan-500 hover:text-white"
                      onClick={logOut}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
