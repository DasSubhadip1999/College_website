import React, { useContext } from "react";
import ResponsiveContext from "../../context/ResponsiveContext";

const FormHeading = ({ text }) => {
  const {
    colors: { primary, secondary },
  } = useContext(ResponsiveContext);
  return (
    <h1
      style={{ background: primary, color: secondary }}
      className="text-center py-3 mb-4"
    >
      {text}
    </h1>
  );
};

export default FormHeading;
