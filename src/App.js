import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Singup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import AddCenter from "./components/AddCenter/AddCenter";
import Thanks from "./components/Thanks/Thanks";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import HealthCenters from "./components/HealthCenters/HealthCenters";
import { loadUser } from "./features/users/usersSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(loadUser(user.uid));
        } else {
        }
      });
    };

    load();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route path="/addcenter" element={<AddCenter />} />
        </Route>
        <Route path="/signup" element={<Singup />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/healthcenters" element={<HealthCenters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
