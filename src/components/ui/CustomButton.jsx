import React from 'react';

const CustomButton = ({ borderColor, color, label, disabled }) => {
  return (
    <button
      className={`lg:ml-2 text-xl px-4 py-2 rounded transition-colors focus:outline-none ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : `hover:bg-${color}-50 bg-${color}-700 duration-700 text-black`
      }`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CustomButton;
