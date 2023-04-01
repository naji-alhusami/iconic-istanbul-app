import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     return true;
//   } else {
//     return false;
//   }
// });

const RequireAuth = () => {
  const userLogin = useSelector((state) => state.users);
  const location = useLocation();
  console.log(userLogin.userlogin);
  if (userLogin.loading) {
    return "loading...";
  }
  return userLogin.userlogin ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login" }} state={{ from: location }} replace />
  );
};

export default RequireAuth;
