import React from "react";
import { useLocation } from "react-router-dom";

const AuthWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <div
      className={`border-[1px] rounded-md mx-auto w-[50rem] mt-16 flex items-center justify-center ${
        location.pathname === "/login" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="grid place-items-center w-[40%] rounded-md">
        {children}
      </div>
      {location.pathname !== "/" && (
        <img
          loading="lazy"
          className="w-[60%] rounded-md"
          src={
            location.pathname === "/signup"
              ? "https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?w=2000"
              : "https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg?w=740&t=st=1680360292~exp=1680360892~hmac=9a296b9e1320e89d39e16a2a4c64238ddf93096f8524c0b16b28e121db56dc2a"
          }
        />
      )}
    </div>
  );
};

export default AuthWrapper;
