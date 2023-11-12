import { useEffect, useState } from "react";
import { navLinks } from "../constants";
import CustomButton from "./ui/CustomButton";

const TopNavBar = () => {
  const [scrollOpacity, setScrollOpacity] = useState(70);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Set scroll event listener to update the opacity
  useEffect(() => {
    const handleScroll = () => {
      const opacity = window.scrollY > 100 ? 100 : 70;
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="shadow-lg w-full fixed top-0 left-0 z-50">
      <div
        className={`lg:flex items-center justify-between bg-black bg-opacity-${scrollOpacity} py-3 lg:px-10 px-10 ${
          showMenu
            ? "top-20 bg-opacity-100 transition-all duration-500 ease-in"
            : `top-[-490px] bg-opacity-${scrollOpacity}`
        }`}
      >
        <div className="font-bold text-2xl cursor-pointer flex items-center gap-4 text-white">
          <span>
            <a href="">
              <img
                src="../../public/assets/images/temple_n_fork_n_spoon_II.svg"
                alt="logo"
                width={40}
                height={40}
              />
            </a>
          </span>
        </div>

        <div
          className="text-white text-3xl absolute right-8 top-6 lg:hidden"
          onClick={toggleMenu}
        >
          <ion-icon name={showMenu ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`lg:flex lg:items-center gap-5 lg:pb-0 pb-12 absolute lg:static bg-black lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            showMenu ? "top-20 bg-opacity-100" : "top-[-490px] bg-opacity-0"
          }`}
        >
          {navLinks.map((item) => (
            <li className="lg:ml-8 text-xl lg:my-0 my-7 " key={item.label}>
              <a
                href={item.href}
                className="text-white hover:text-gray-400 duration-500"
              >
                {" "}
                {item.label}
              </a>
            </li>
          ))}
          <CustomButton color="orange" label="Book a table" />
        </ul>
      </div>
    </div>
  );
};

export default TopNavBar;
