import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUserWithGoogle } from "../../features/users/usersSlice";

import GoogleLogo from "../Images/GoogleLogo.svg";

const LoginWithGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLoginGoogle = async (event) => {
    event.preventDefault();
    const response = await dispatch(loginUserWithGoogle());
    console.log(response);

  };

  return (
    <>
      <div className="flex justify-around">
        <p className="text-bold text-xl">OR</p>
      </div>
      <div className="flex justify-center my-6 gap-x-20">
        {error && <p className="text-red-500 text-lg text-center">{error}</p>}
        <button type="button" onClick={handleLoginGoogle}>
          <img src={GoogleLogo} alt="Google logo" className="cursor-pointer" />
        </button>
      </div>
    </>
  );
};

export default LoginWithGoogle;
