import React from "react";

import MobileNavigation from "./MobileNavigation";
import Navs from "./Navs";

import logo from "../../assets/images/temple_n_fork_n_spoon_II.svg";

const Navbar = () => {
  return (
    <header className="bg-black sticky top-0 h-20 flex justify-between items-center py-2 max-container md:py-3 z-50">
      <a href="/" className="text-white">
        <img
          src={logo}
          alt="Kasthamandap Logo"
          className="h-9 w-9 object-cover"
        />
      </a>
      {/* Mobile navigation */}
      <MobileNavigation />
      {/* Desktop navigation */}
      <Navs className="hidden md:flex" />
    </header>
  );
};

export default Navbar;
