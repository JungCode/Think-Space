import { useUser } from "@clerk/clerk-react";
import { Outlet, useLocation } from "react-router-dom";
// import { AppSidebar } from "@/pages/DashBoard/app-sidebar";
import { AppSidebar } from "./Sidebar_subComponents/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

const DashBoard = () => {
  const { user } = useUser();
  const location = useLocation();
  return (
    <SidebarProvider>
      {user && (
        <AppSidebar
          user={{
            fullName: user.fullName || "",
            emailAddress: user.primaryEmailAddress?.emailAddress || "",
            imageUrl: user.imageUrl || "",
          }}
        />
      )}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    {location.pathname === "/home"
                      ? "Home"
                      : location.pathname === "/chat"
                      ? "Chat"
                      : "Document"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {location.pathname != "/home" &&
                location.pathname != "/chat" ? (
                  <>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{location.pathname.replace(/^\//, "")}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashBoard;
