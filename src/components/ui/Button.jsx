import React from "react";

const sizes = {
  small: "px-3 py-2 text-xs",
  default: "px-4 py-2",
  large: "px-5 py-3 text-lg",
};

const colors = {
  primary: "bg-white text-black hover:bg-black hover:text-white",
  secondary: "",
};

const Button = ({ color = "primary", size = "default", onClick, children }) => {
  let sizeClasses = sizes[size];
  let colorClasses = colors[color];

  return (
    <button
      className={`rounded-full  ${sizeClasses} ${colorClasses} transition-colors duration-500 sm`}
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
