"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Cog,
  HelpCircle,
  Home,
  Inbox,
  Notebook,
  Search,
  Trash2,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavPrivate } from "@/pages/DashBoard/Sidebar_subComponents/nav-private";
import { NavMisc } from "@/pages/DashBoard/Sidebar_subComponents/nav-misc";
import { NavUser } from "@/pages/DashBoard/Sidebar_subComponents/nav-user";
import { NavTeamspaces } from "./nav-teamspaces";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
// This is sample data.
const data = {
  // user: {
  //   name: "shadcn",
  //   email: "m@example.com",
  //   avatar: "/avatars/shadcn.jpg",
  // },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
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
  navTeamspaces: [
    {
      title: "Page1",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Subpage1_1",
          url: "#",
        },
        {
          title: "Subpage1_2",
          url: "#",
        },
        {
          title: "Subpage1_3",
          url: "#",
        },
      ],
    },
  ],
  navPrivate: [
    {
      title: "Page1",
      url: "#",
      icon: Notebook,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Page2",
      url: "#",
      icon: Notebook,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Page3",
      url: "#",
      icon: Notebook,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Page4",
      url: "#",
      icon: Notebook,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navMisc: [
    {
      name: "Help",
      url: "#",
      icon: HelpCircle,
    },
    {
      name: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      name: "Settings",
      url: "#",
      icon: Cog,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { fullName: string; emailAddress: string; imageUrl: string };
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTeamspaces items={data.navTeamspaces} />
        <NavPrivate items={data.navPrivate} />
        <NavMisc projects={data.navMisc} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
