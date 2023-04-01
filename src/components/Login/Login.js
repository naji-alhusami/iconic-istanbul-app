import React from "react";

import LoginWithUserPassword from "./LoginWithUser";
import BackgroundImage from "../Images/BackgroundImage.jpg";

function Login() {
  return (
    <div
      className="h-full flex justify-center content-center md:flex-wrap max-[767px]:flex-wrap gap-x-20"
      style={{ backgroundImage: `url(${BackgroundImage})`, top: 0 }}
    >
      <LoginWithUserPassword />
    </div>
  );
}
export default Login;
