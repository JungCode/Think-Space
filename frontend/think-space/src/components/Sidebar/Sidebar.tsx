import React, { useState } from "react";
import SidebarHome from "./SidebarHome";
import SidebarFooter from "./SidebarFooter";
import SidebarNotesList from "./SidebarNotesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  username: string | null | undefined; // Username of the logged-in user
  userButton: React.ReactNode; // Accepts any valid React node, such as a button
}

const Sidebar: React.FC<SidebarProps> = ({ username, userButton }) => {
  if (username) {
    username = username?.charAt(0).toUpperCase() + username?.slice(1);
  }
  const [isExpanded, setIsExpanded] = useState(true);
  const [mouseIsEnter, setMouseIsEnter] = useState(false);
  const expandHandler = () => {
    setIsExpanded(!isExpanded);
  };
  const mouseEnterHandler = () => {
    setMouseIsEnter(true);
  };
  const mouseLeaveHandler = () => {
    setMouseIsEnter(false);
  };
  return (
    <>
      {/* side bar  */}

      <div className="fixed h-screen z-40" onMouseLeave={mouseLeaveHandler}>
        {/* button */}
        <button
          onClick={expandHandler}
          className={`${
            isExpanded ? " w-0 opacity-0 " : " opacity-100 " 
          } block overflow-hidden absolute h-8 w-8 hover:bg-stone-300 rounded-xl transition duration-200 z-50 transform`}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div
          className={`${
            isExpanded
              ? " h-screen w-56 p-2 "
              : " translate-y-10 rounded-lg shadow-2xl h-5/6 "
          } 
            ${mouseIsEnter && !isExpanded ? " w-56 p-2 " : " w-0 p-0 "}
            flex flex-col border-t-2 bg-stone-100 overflow-x-hidden text-sm text-stone-700 left-0 border-r-2 justify-between align-items-center transition-all duration-200`}
        >
          <SidebarHome
            username={username}
            userButton={userButton}
            expandHandler={expandHandler}
            isExpanded={isExpanded}
          />
          <SidebarNotesList />
          <SidebarFooter />
        </div>
      </div>

      {/* fake div  */}
      <div
        className={`${isExpanded ? " w-56 " : " w-0 p-0 "} transition-all`}
      ></div>
      {/* fake div for getting cursor  */}
      <div
        onMouseEnter={mouseEnterHandler}
        className={`w-56 h-screen transition-all absolute left-0 `}
      ></div>
    </>
  );
};

export default Sidebar;
