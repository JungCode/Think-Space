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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function NavMisc({
  projects,
  label,
  addANewDocument,
  deleteHanlder,
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
  addANewDocument: () => Promise<void>;
  deleteHanlder: (id: string) => Promise<void>;
}) {
  const params = useParams();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const [isPending, setIsPending] = useState<string>("");
  const deleteInSidebarHander = async (id: string) => {
    setIsPending(id);
    if (id) {
      await deleteHanlder(id);
      setIsPending("");
      toast.success("Document deleted successfully");
    } else {
      toast.error("Cannot delete the document");
    }
  };
  return (
    <SidebarGroup>
      <SidebarMenuItem className="list-none">
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
              disabled={isPending != ""}
              asChild
              isActive={params.id === item.id && params.id ? true : false}
              tooltip={item.title}
            >
              <Link to={item.url ? `/${item.url}` : `/${item.id}` || "#"}>
                {item.icon ? <item.icon /> : <File />}
                <span>
                  {isPending == item.id && item.id != null
                    ? "Deleting..."
                    : item.title}
                </span>
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
                  <span
                    onClick={() =>
                      navigate(item.url ? `/${item.url}` : `/${item.id}` || "#")
                    }
                  >
                    View Project
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span
                    onClick={() => item.id && deleteInSidebarHander(item.id)}
                  >
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
