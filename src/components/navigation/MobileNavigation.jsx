import Sidebar from "./Sidebar";
import Navs from "./Navs";
import NavToggler from "./NavToggler";
import useToggler from "../../hooks/useToggler";

const MobileNavigation = () => {
  const { showMenu, hideMenu, toggleMenu } = useToggler();

  return (
    <>
      <NavToggler
        className="md:hidden"
        showMenu={showMenu}
        toggleMenu={toggleMenu}
      />
      <Sidebar showMenu={showMenu} hideMenu={hideMenu} toggleMenu={toggleMenu}>
        <Navs isMobile />
      </Sidebar>
    </>
  );
};

export default MobileNavigation;
