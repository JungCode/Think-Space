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

// Menu  main items.
const main_items_1 = [
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "ThinkSpace AI",
    url: "#",
    icon: Bot,
  },
  {
    title: "Home",
    url: "#",
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

export function AppSidebar({ user }: AppSidebarProps) {
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
            <SidebarGroupAction title="Add Project">
              <Plus /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {privateItems.map((item: MenuItem) => (
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
