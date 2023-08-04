import React from "react";

import { AboutData } from "./AboutData";
import kulesi from "../Images/kizkulesi.jpg";

const AboutContent = () => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <div>
        <img src={kulesi} alt="kizkulesi" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="my-10 text-5xl font-bold text-orange-900 border-amber-900 border-b-4 pb-5">
          About
        </h1>
        <h3 className="text-3xl text-center m-5 text-orange-900 font-bold">
          Welcome to ICONIC ISTANBUL - Your Ultimate Guide to Unveiling the
          City's Hidden Treasures!
        </h3>
        <div>
          {AboutData.map((data) => (
            <div key={data.id} className="my-8">
              <h1 className="font-bold text-xl text-orange-900 m-5 md:mx-20">
                {data.title}
              </h1>
              <p className="text-xl  leading-[2rem] m-5 md:mx-20">
                {data.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
