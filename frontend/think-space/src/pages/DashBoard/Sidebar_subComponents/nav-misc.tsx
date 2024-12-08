"use client";

import {
  File,
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  Plus,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useParams } from "react-router-dom";

export function NavMisc({
  projects,
  label,
  addANewDocument,
  deleteHanlder
}: {
  projects: {
    id?: string;
    title: string;
    url?: string;
    roomId?: string;
    icon?: LucideIcon;
  }[];
  label: string;
  getToken: () => string | null | Promise<string | null>;
  addANewDocument: () => void;
  deleteHanlder: (id: string) => void;
}) {
  const params = useParams();
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarMenuItem>
        <SidebarMenuButton className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
        </SidebarMenuButton>
        <DropdownMenu>
          {label === "Private" && (
            <DropdownMenuTrigger onClick={addANewDocument} asChild>
              <SidebarMenuAction showOnHover>
                <Plus />
                <span className="sr-only">Add</span>
              </SidebarMenuAction>
            </DropdownMenuTrigger>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.id ? item.id : item.title}>
            <SidebarMenuButton
              asChild
              isActive={(params.id === item.id && params.id) ? true : false}
              tooltip={item.title}
            >
              <Link to={item.url ? `/${item.url}` : `/${item.id}` || "#"}>
                {item.icon ? <item.icon /> : <File />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span onClick={() => item.id && deleteHanlder(item.id)}>
                    Delete Project
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
