import React from "react";

const Input = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="flex flex-col my-2 w-[16rem]">
      <label className="mb-[2px] text-[14px] font-semibold opacity-80">
        {label}
      </label>
      <input
        className="outline-none border-[1px] rounded-md p-2 text-[15px]"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
