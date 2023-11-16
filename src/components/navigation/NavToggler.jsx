import React from "react";
import { CloseOutlined, MenuFoldOutlined } from "@ant-design/icons";

const NavToggler = ({ className, showMenu, toggleMenu }) => {
  return (
    <div
      className={`w-9 h-9 flex items-center justify-center rounded-md text-xl bg-gray-700 cursor-pointer ${className}`}
      onClick={() => toggleMenu()}
    >
      {showMenu ? <CloseOutlined /> : <MenuFoldOutlined />}
    </div>
  );
};

export default NavToggler;
