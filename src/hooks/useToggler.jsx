import { useState } from "react";

const useToggler = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const hideMenu = () => setShowMenu(false);

  return { showMenu, hideMenu, toggleMenu };
};

export default useToggler;
