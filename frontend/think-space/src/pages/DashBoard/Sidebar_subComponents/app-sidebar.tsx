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
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useParams } from "react-router-dom";
import { createANewDocument, deleteADocument, getUserDocuments } from "@/api";
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
      url: "/getting-started",
      icon: File,
      isActive: true,
      items: [],
    },
    {
      title: "Scratchpad",
      url: "/scratchpad",
      icon: Pen,
      items: [],
    },
    {
      title: "1:1 notes",
      url: "/1-1-notes",
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
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { fullName: string; emailAddress: string; imageUrl: string };
}) {
  const [documents, setDocuments] = React.useState<Document[]>([]);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const data = await getUserDocuments(token);
        setDocuments(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDocuments();
  }, [getToken]);
  const addANewDocumentHandler = async () => {
    const token = await getToken();
    if (!token) return;
    // Call the createANewDocument function
    try {
      const docId = await createANewDocument(token);
      navigate(`/${docId}`);
      setDocuments((prev) => [
        ...prev,
        {
          id: docId,
          title: "New page",
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHanlder = async (id: string) => {
    const token = await getToken();
    if (token) {
      const data = await deleteADocument(id, token);
      console.log(data);
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      if (params.id == id) navigate("/home");
    } else {
      console.error("Token is null");
    }
    navigate("/home");
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMisc
          projects={[]}
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
