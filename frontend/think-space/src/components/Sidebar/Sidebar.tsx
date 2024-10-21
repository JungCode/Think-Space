import React from "react";
import SidebarHome from "./SidebarHome";

interface SidebarProps {
  username: string | null | undefined; // Username of the logged-in user
  userButton: React.ReactNode; // Accepts any valid React node, such as a button
}

const Sidebar: React.FC<SidebarProps> = ({ username, userButton }) => {
  if (username) {
    username = username?.charAt(0).toUpperCase() + username?.slice(1);
  }
  return (
    <div className="min-w-56 bg-stone-100 text-sm text-stone-700 left-0 h-screen fixed p-2 border-r-2">
      <SidebarHome username={username} userButton={userButton}/>
    </div>
  );
};

export default Sidebar;
