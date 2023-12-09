import NavToggler from "./NavToggler";

const Sidebar = ({ children, showMenu = true, toggleMenu }) => {
  return (
    <aside
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
