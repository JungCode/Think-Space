import {
  Bot,
  Calendar,
  HandHelping,
  HelpCircle,
  Home,
  Inbox,
  Plus,
  ScrollText,
  Search,
  Settings,
  Shapes,
  Trash2,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroupAction,
} from "@/components/ui/sidebar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
// import { url } from "inspector";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { createANewDocument, getUserDocuments } from "@/api";
import { useAuth } from "@clerk/clerk-react";
import { s } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { Link, useNavigate } from "react-router-dom";

// Menu  main items.
const main_items_1 = [
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
];

const main_items_2 = [
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Templates",
    url: "#",
    icon: Shapes,
  },
  {
    title: "Trash",
    url: "#",
    icon: Trash2,
  },
  {
    title: "Help",
    url: "#",
    icon: HelpCircle,
  },
];

const privateItems = [
  {
    title: "Getting Started",
    url: "#",
    icon: HandHelping,
  },
  {
    title: "Quick Note",
    url: "#",
    icon: ScrollText,
  },
  {
    title: "Personal Home",
    url: "#",
    icon: UserRound,
  },
];

const footerInfos = [
  {
    title: "Invite members",
    url: "#",
    icon: UserRoundPlus,
  },
];

interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType;
}

interface AppSidebarProps {
  user: {
    imageUrl: string;
    name: string;
  };
}
interface Document {
  id: string;
  title: string;
  roomId?: string;
}
export function AppSidebar({ user }: AppSidebarProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
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
  return (
    <Sidebar className="m-2">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <img
                    src={user.imageUrl}
                    alt="Avatar"
                    className="rounded-sm w-7 h-7"
                  />
                  <span className="text-xl">{user.name}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {main_items_1.map((item: MenuItem) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className="text-gray-500" to={item.url}>
                      <item.icon />
                      <span className="text-sm text-gray-600">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Favorites</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs">Teamspaces</SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
        <Collapsible>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs">
              <CollapsibleTrigger>Private</CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupAction
              onClick={addANewDocumentHandler}
              title="Add Project"
            >
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[...privateItems, ...documents].map((item) => (
                    <SidebarMenuItem key={"id" in item ? item.id : item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          className="text-gray-500"
                          to={"id" in item ? `/${item.id}` : item.url}
                        >
                          {"icon" in item && item.icon ? (
                            <item.icon />
                          ) : (
                            <ScrollText />
                          )}
                          <span className="text-sm text-gray-600">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {main_items_2.map((item: MenuItem) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a className="text-gray-500" href={item.url}>
                      <item.icon />
                      <span className="text-sm text-gray-600">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-3">
        <SidebarMenu>
          {footerInfos.map((item: MenuItem) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a className="text-gray-500" href={item.url}>
                  <item.icon />
                  <span className="text-sm text-gray-600">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
