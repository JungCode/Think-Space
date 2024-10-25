import React, { useState } from "react";
import SidebarHome from "./SidebarHome";
import SidebarFooter from "./SidebarFooter";
import SidebarNotesList from "./SidebarNotesList";
import MenuButton from "../UI/MenuButton";
import FakeDiffDiv from "./Animation/FakeDiffDiv";
import SlideSidebar from "./Animation/SlideSidebar";
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

      <div
        className="fixed h-screen z-40 w-52"
        onMouseLeave={mouseLeaveHandler}
        onMouseEnter={mouseEnterHandler}
      >
        <MenuButton expandHandler={expandHandler} isExpanded={isExpanded} />
        <SlideSidebar isExpanded={isExpanded} mouseIsEnter={mouseIsEnter}>

          <SidebarHome
            username={username}
            userButton={userButton}
            expandHandler={expandHandler}
            isExpanded={isExpanded}
          />
          <SidebarNotesList />
          <SidebarFooter />
          
        </SlideSidebar>
      </div>

      <FakeDiffDiv isExpanded={isExpanded} />
    </>
  );
};

export default Sidebar;
