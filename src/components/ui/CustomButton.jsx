import React from 'react'

const CustomButton = ({ color, label }) => {
    return (
      <button
        className={`lg:ml-2 text-xl px-4 py-2 rounded  transition-colors focus:outline-none  hover:bg-${color}-100 bg-${color}-500 duration-700 text-white`}
      >
        {label}
      </button>
    );
  };
  
  export default CustomButton;