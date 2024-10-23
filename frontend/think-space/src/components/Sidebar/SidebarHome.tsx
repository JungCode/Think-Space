
import React from "react";
import SidebarInteracts from "./SidebarInteracts";
import SidebarProfile from "./SidebarProfile";

interface SidebarProps {
  username: string | null | undefined; // Username of the logged-in user
  userButton: React.ReactNode; // Accepts any valid React node, such as a button
  expandHandler: () => void;
  isExpanded : boolean;
}

const SidebarHome: React.FC<SidebarProps> = ({ username, userButton, expandHandler, isExpanded }) => {
  return (
    <div>
      <SidebarProfile username={username} expandHandler={expandHandler} userButton={userButton} isExpanded={isExpanded}/>
      <SidebarInteracts />
    </div>
  );
};

export default SidebarHome;
