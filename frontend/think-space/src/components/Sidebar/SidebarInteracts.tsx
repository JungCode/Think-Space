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
      flex flex-col gap-2 ml-2 mt-1 transition-colors
      `}
    >
      <SidebarItem
        icon={<MagnifyingGlass size={17} />}
        text="Search"
        active={false}
        alert
      />
      <SidebarItem
        icon={<LegoSmiley size={17} />}
        text="ThinkSpace AI"
        active={false}
      />
      <SidebarItem icon={<HouseLine size={17} />} text="Home" active={false} />
      <SidebarItem icon={<Mailbox size={17} />} text="Inbox" active={true} />
    </ul>
  );
};

export default SidebarInteracts;
