import React from "react";
import { NavLink } from "react-router-dom";

interface myProps {
  children: React.ReactNode;
  to?: string;
}

const SidebarItemUI: React.FC<myProps> = ({ children, to }) => {
  return (
    <>
      {to ? (
        <NavLink
          to={to}
          className={({
            isActive,
          }) => `flex flex-1 gap-3 items-center cursor-pointer overflow-hidden transition duration-200 py-1 px-2 rounded-md mb-1 relative
      ${
        isActive
          ? "bg-stone-200 text-stone-900"
          : "hover:bg-stone-200 text-stone-500"
      }
    `}
        >
          {children}
        </NavLink>
      ) : (
        <li
          className={`flex flex-1 gap-3 items-center cursor-pointer overflow-hidden transition duration-200 py-1 px-2 rounded-md mb-1 relative hover:bg-stone-200 text-stone-500`}
        >
          {children}
        </li>
      )}
    </>
  );
};

export default SidebarItemUI;
