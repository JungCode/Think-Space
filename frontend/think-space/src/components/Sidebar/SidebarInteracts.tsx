import {
  HouseLine,
  LegoSmiley,
  MagnifyingGlass,
  Mailbox,
} from "@phosphor-icons/react";
import { SidebarItem } from "./SidebarItem";

const SidebarInteracts = () => {
  return (
    <ul
      className={`
      flex flex-col mt-1 transition-colors overflow-hidden
      `}
    >
      <SidebarItem icon={<MagnifyingGlass size={17} />} text="Search" alert />
      <SidebarItem
        icon={<LegoSmiley size={17} />}
        text="ThinkSpace AI"
        to="chat"
      />
      <SidebarItem icon={<HouseLine size={17} />} text="Home" to="home" />
      <SidebarItem icon={<Mailbox size={17} />} text="Inbox" />
    </ul>
  );
};

export default SidebarInteracts;
