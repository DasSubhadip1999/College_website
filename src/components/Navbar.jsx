import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ResponsiveContext from "../context/ResponsiveContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const {
    colors: { primary },
  } = useContext(ResponsiveContext);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav
      className="flex justify-between items-center px-20 py-4 text-white"
      style={{ backgroundColor: primary }}
    >
      <Link to={"/"} className="text-2xl">
        Logo
      </Link>
      <div className="flex gap-6 items-center">
        <Link to={"/"} className="btn btn-ghost">
          Upload
        </Link>
        {!user ? (
          <>
            <Link to={"/login"} className="btn btn-ghost">
              Login
            </Link>
            <Link to={"/signup"} className="btn btn-ghost">
              Sign up
            </Link>
          </>
        ) : (
          <button className="btn btn-ghost" onClick={() => dispatch(logout())}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
