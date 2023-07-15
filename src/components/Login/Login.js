import React from "react";
import LoginWithUserPassword from "./LoginWithUser";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function Login() {
  const userLogin = useSelector((state) => state.users);
  const location = useLocation();
  const state = location.state;

  if (userLogin.userlogin)
    return <Navigate to={{ pathname: state?.from?.pathname || "/" }} />;
  return (
    <div
      className="w-screen h-screen bg-cover bg-no-repeat flex justify-center content-center md:flex-wrap max-[767px]:flex-wrap gap-x-20"
    >
      <LoginWithUserPassword />
    </div>
  );
}
export default Login;
