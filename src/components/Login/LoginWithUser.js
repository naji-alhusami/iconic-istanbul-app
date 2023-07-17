import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../features/users/usersSlice";
import LoginWithGoogle from "./LoginWithGoogle";

const LoginWithUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // dispatch user login with email:
  const handleSubmit = (event) => {
    event.preventDefault();
    const response = dispatch(loginUser({ email, password }));

    if (response.meta.rejectedWithValue) {
      setError(response.payload);
      return;
    }
    navigate("/");
  };

  return (
    <div className="bg-white m-12 rounded-md">
      <h2 className='text-5xl font-["Poppins"] font-normal mb-44 max-[767px]:mt-10 md:mt-10 max-[767px]:mb-10 md:mb-10 text-orange-900 text-center'>
        Login
      </h2>
      {error && <p className="text-red-500 text-lg text-center">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="grid grid-rows-3 gap-6  px-2 py-6 md:px-10 md:py-10 sm:px-10 sm:py-10 xs:px-10 xs:py-10 max-w-lg"
      >
        <input
          className="w-full px-3 broder-solid border-2 border-[#D1DBE3] rounded-md focus:outline-none focus:placeholder-white"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="w-full px-3 broder-solid border-2 border-[#D1DBE3] rounded-md focus:outline-none focus:placeholder-white"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="flex justify-around py-3 gap-8">
          <button
            className="w-1/2 bg-orange-400 hover:bg-orange-800 hover:text-white text-center font-medium text-2xl px-7 py-1 rounded-md shadow-[0px_7px_20px_rgba(0,0,0,0.2)"
            type="submit"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="w-1/2 broder-solid border-2 border-orange-800 hover:text-white bg-white hover:bg-orange-800 font-medium text-2xl px-7 py-1 rounded-md"
          >
            <button type="button">Signup</button>
          </Link>
        </div>
      </form>
      <LoginWithGoogle />
    </div>
  );
};

export default LoginWithUser;
