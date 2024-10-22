import {
  faAnglesLeft,
  faChevronDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import SidebarInteracts from "./SidebarInteracts";

interface SidebarProps {
  username: string | null | undefined; // Username of the logged-in user
  userButton: React.ReactNode; // Accepts any valid React node, such as a button
}

const SidebarHome: React.FC<SidebarProps> = ({ username, userButton }) => {
  return (
    <div>
      <div className="text-black cursor-pointer flex justify-items-center items-center hover:bg-stone-200 rounded-xl relative">
        <div className=" p-2 flex items-center">
          {userButton}
          <span className="ms-3 font-light text-sx">{username}</span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-stone-400 text-xs ml-2"
          />
        </div>
        {/* awf */}
        <div className="absolute right-2">
          <div className="px-1 py-0 rounded-xl inline-block hover:bg-stone-300">
            <FontAwesomeIcon
              className="text-stone-400 hover:text-stone-600"
              icon={faAnglesLeft}
            />
          </div>
          <div className="ml-1 px-1 py-0 rounded-xl inline-block hover:bg-stone-300">
            <FontAwesomeIcon className="text-stone-600 " icon={faPenToSquare} />
          </div>
        </div>
      </div>
      <SidebarInteracts />
    </div>
  );
};

export default SidebarHome;
