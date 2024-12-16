"use client";

import * as React from "react";

import {
  Bot,
  Cog,
  HelpCircle,
  Home,
  Inbox,
  Search,
  Trash2,
  File,
  UsersRound,
  Pen,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavMisc } from "@/pages/DashBoard/Sidebar_subComponents/nav-misc";
import { NavUser } from "@/pages/DashBoard/Sidebar_subComponents/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "ThinkSpace AI",
      url: "/chat",
      icon: Bot,
    },
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
  ],

  navPrivate: [
    {
      title: "Getting Started",
      url: "getting-started",
      icon: File,
      isActive: true,
      items: [],
    },
    {
      title: "Scratchpad",
      url: "scratchpad",
      icon: Pen,
      items: [],
    },
    {
      title: "1:1 notes",
      url: "1-1-notes",
      icon: UsersRound,
      items: [],
    },
  ],
  navMisc: [
    {
      title: "Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Settings",
      url: "#",
      icon: Cog,
    },
  ],
};
interface Document {
  id: string;
  title: string;
}
export function AppSidebar({
  sharedDocuments,
  user,
  addANewDocumentHandler,
  deleteHanlder,
  documents,
  getToken,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { fullName: string; emailAddress: string; imageUrl: string };
  addANewDocumentHandler: () => Promise<void>;
  deleteHanlder: (id: string) => Promise<void>;
  documents: Document[];
  getToken: () => Promise<string | null>;
  sharedDocuments: Document[];
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMisc
          projects={[...sharedDocuments]}
          label="Shared"
          getToken={getToken}
          addANewDocument={addANewDocumentHandler}
          deleteHanlder={deleteHanlder}
        />
        <NavMisc
          projects={[...data.navPrivate, ...documents]}
          label="Private"
          getToken={getToken}
          addANewDocument={addANewDocumentHandler}
          deleteHanlder={deleteHanlder}
        />
        <NavMisc
          projects={data.navMisc}
          label="Setting"
          getToken={getToken}
          addANewDocument={addANewDocumentHandler}
          deleteHanlder={deleteHanlder}
        />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
