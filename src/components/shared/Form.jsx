import React from "react";

const Form = ({ children, onSubmit }) => {
  return (
    <form className="" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
