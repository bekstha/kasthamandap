import { useState } from "react";

const useToggler = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return { showMenu, toggleMenu };
};

export default useToggler;
