import Sidebar from "./Sidebar";
import Navs from "./Navs";
import NavToggler from "./NavToggler";

import useToggler from "../../hooks/useToggler";

const MobileNavigation = () => {
  const { showMenu, toggleMenu } = useToggler();

  return (
    <>
      <NavToggler
        className="md:hidden"
        showMenu={showMenu}
        toggleMenu={toggleMenu}
      />
      <Sidebar showMenu={showMenu} toggleMenu={toggleMenu}>
        <Navs isMobile />
      </Sidebar>
    </>
  );
};

export default MobileNavigation;
