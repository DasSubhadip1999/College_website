import React, { useContext } from "react";
import ResponsiveContext from "../../context/ResponsiveContext";

const Button = ({ text, type }) => {
  const {
    colors: { primary, secondary },
  } = useContext(ResponsiveContext);

  return (
    <button
      type={type}
      style={{ backgroundColor: primary, color: secondary }}
      className="w-full mt-2 rounded-md outline-none border-none btn"
    >
      {text}
    </button>
  );
};

export default Button;
