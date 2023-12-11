import { useEffect, useRef } from "react";

import NavToggler from "./NavToggler";

const Sidebar = ({
  children,
  exceptionRef,
  showMenu = true,
  hideMenu,
  toggleMenu,
}) => {
  const wrapperRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  const handleClickListener = (event) => {
    let clickedInside;
    if (exceptionRef) {
      clickedInside =
        (wrapperRef && wrapperRef.current.contains(event.target)) ||
        exceptionRef.current === event.target ||
        exceptionRef.current.contains(event.target);
    } else {
      clickedInside = wrapperRef && wrapperRef.current.contains(event.target);
    }

    if (clickedInside) toggleMenu();
    else hideMenu();
  };

  return (
    <aside
      ref={wrapperRef}
      className={`fixed h-full w-72 right-0 inset-y-0 p-3 bg-gray-900 transition-translate duration-300 ${
        showMenu ? "translate-x-0" : "translate-x-[120%]"
      }`}
    >
      <NavToggler
        className="absolute -left-5"
        showMenu={showMenu}
        toggleMenu={toggleMenu}
      />
      {children}
    </aside>
  );
};

export default Sidebar;
