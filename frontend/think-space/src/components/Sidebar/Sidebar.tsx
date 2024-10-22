import React from "react";
import SidebarHome from "./SidebarHome";
import SidebarFooter from "./SidebarFooter";
import SidebarNotesList from "./SidebarNotesList";

interface SidebarProps {
  username: string | null | undefined; // Username of the logged-in user
  userButton: React.ReactNode; // Accepts any valid React node, such as a button
}

const Sidebar: React.FC<SidebarProps> = ({ username, userButton }) => {
  if (username) {
    username = username?.charAt(0).toUpperCase() + username?.slice(1);
  }
  return (
    <div className="flex flex-col min-w-56 w-56 h-screen bg-stone-100 text-sm text-stone-700 left-0 p-2 border-r-2 fixed justify-between align-items-center">
      <SidebarHome username={username} userButton={userButton} />
      <SidebarNotesList />
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
