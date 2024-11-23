import { useUser } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

const DashBoard = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <div className="flex">
        {/* side bar de o day  */}
        <SidebarProvider className="relative">
          {user && user.imageUrl && user.fullName && (
            <AppSidebar
              user={{ imageUrl: user.imageUrl, name: user.fullName }}
            />
          )}
          <main className="flex-1 p-4">
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
        {/* <div className="w-screen text-center ">
          <div className="w-full h-9"></div>
          <Button>Click me</Button>
          <Outlet />
        </div> */}
      </div>
    </div>
  );
};

export default DashBoard;
