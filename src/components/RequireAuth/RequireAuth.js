import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../Loading/Loading";

const RequireAuth = () => {
  const userLogin = useSelector((state) => state.users);
  const location = useLocation();

  if (userLogin.loading) {
    return <Loading />;
  }
  return userLogin.userlogin ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login" }} state={{ from: location }} replace />
  );
};

export default RequireAuth;
