import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Centers from "./components/Centers/Centers";
import Singup from "./components/Signup/Signup";
import Thanks from "./components/Thanks/Thanks";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { useEffect } from "react";
import { loadUser } from "./features/users/usersSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HealthCenters from "./components/HealthCenters/HealthCenters";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(loadUser(user.uid));
        } else {
          // User is signed out
          // ...
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
          <Route path="/centers" element={<Centers />} />
        </Route>
        <Route path="/signup" element={<Singup />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/healthcenters" element={<HealthCenters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
