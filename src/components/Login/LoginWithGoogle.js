import React from "react";
import { useDispatch } from "react-redux";

import { loginUserWithGoogle } from "../../features/users/usersSlice";

import GoogleLogo from "../Images/GoogleLogo.svg";

const LoginWithGoogle = () => {
  const dispatch = useDispatch();

  const handleLoginGoogle = (event) => {
    event.preventDefault();
    dispatch(loginUserWithGoogle());
  };

  return (
    <>
      <div className="flex justify-around">
        <p className="text-bold text-xl">OR</p>
      </div>
      <div className="flex justify-center my-6 gap-x-20">
        <button type="button" onClick={handleLoginGoogle}>
          <img src={GoogleLogo} alt="Google logo" className="cursor-pointer" />
        </button>
      </div>
    </>
  );
};

export default LoginWithGoogle;
