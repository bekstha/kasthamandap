import React from "react";

import { navLinks } from "../../constants";
import { useNavigate } from "react-router-dom";

const mobileClasses = "flex-col justify-center gap-1 mt-10";
const desktopClasses = "items-center gap-2";

const Navs = ({ isMobile = false, className }) => {

  const handleBooking = () => {
    window.location.href = "#reservation"
  }

  return (
    <nav
      role="list"
      className={`flex text-sm ${
        isMobile ? mobileClasses : desktopClasses
      } ${className}`}
    >
      {navLinks?.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={`px-3 py-2 rounded-md hover:bg-white/40 duration-200 cursor-pointer`}
        >
          {item.label}
        </a>
      ))}
      <button
        onClick={handleBooking}
        className={`bg-orange-600 px-3 py-2 rounded-md hover:bg-orange-500 duration-200 ${
          isMobile ? "w-full" : ""
        }`}
      >
        Book a table
      </button>
    </nav>
  );
};

export default Navs;
