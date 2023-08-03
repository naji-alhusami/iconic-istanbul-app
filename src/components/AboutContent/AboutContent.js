import React from "react";

import kulesi from "../Images/kizkulesi.jpg";

const AboutContent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={kulesi} alt="kizkulesi" />
      <h1 className="my-10 text-5xl font-bold text-orange-900 border-amber-900 border-b-4 pb-5">About</h1>
    </div>
  );
};

export default AboutContent;
