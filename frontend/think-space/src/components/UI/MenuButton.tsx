import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface myProp{
  expandHandler: () => void;
  isExpanded: boolean;
}
const MenuButton : React.FC<myProp> = ({expandHandler, isExpanded}) => {
  return (
    <button
      onClick={expandHandler}
      className={`${
        isExpanded ? " w-0 opacity-0 " : " opacity-100 "
      } block overflow-hidden absolute h-8 w-8 hover:bg-stone-300 rounded-xl transition duration-200 z-50 transform`}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default MenuButton;
