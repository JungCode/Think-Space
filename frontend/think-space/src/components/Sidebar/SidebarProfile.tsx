import {
  faAnglesLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
interface SidebarProps {
  username: string | null | undefined; // Username of the logged-in user
  userButton: React.ReactNode; // Accepts any valid React node, such as a button
  expandHandler: () => void;
  isExpanded: boolean;
}

const SidebarProfile: React.FC<SidebarProps> = ({
  username,
  userButton,
  expandHandler,
  isExpanded,
}) => {
  return (
    <div className="text-black cursor-pointer flex justify-items-center items-center hover:bg-stone-200 rounded-xl relative transition duration-200">
      <div className=" p-2 flex items-center">
        {userButton}
        <span className="ms-3 font-light text-sx">{username}</span>
      </div>
      <div className="absolute right-2">
        {isExpanded && (
          <button
            className="px-1 py-0 rounded-xl inline-block hover:bg-stone-300 transition duration-100"
            onClick={expandHandler}
          >
            <FontAwesomeIcon
              className="text-stone-400 hover:text-stone-600"
              icon={faAnglesLeft}
            />
          </button>
        )}
        <div className="ml-1 px-1 py-0 rounded-xl inline-block hover:bg-stone-300 transition duration-100">
          <FontAwesomeIcon className="text-stone-600 " icon={faPenToSquare} />
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
