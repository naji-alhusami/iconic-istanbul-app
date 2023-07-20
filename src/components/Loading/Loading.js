import React from "react";

import spinnerLoading from "../Images/spinnerLoading.svg";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen min-h-screen bg-white">
      <div className="loading-container animate-pulse">
        <img
          src={spinnerLoading}
          alt="Loading..."
          className="h-[20rem] w-[20rem]"
        />
      </div>
    </div>
  );
};

export default Loading;
