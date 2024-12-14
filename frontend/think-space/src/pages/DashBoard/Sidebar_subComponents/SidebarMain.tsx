import { Outlet } from "react-router-dom";
// import { AppSidebar } from "@/pages/DashBoard/app-sidebar";
import { AppSidebar } from "./app-sidebar";

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
import { Toaster } from "sonner";

const SidebarMain = ({
  user,
  addANewDocumentHandler,
  deleteADocumentHanlder,
  documents,
  getToken,
  getTitle,
  updateADocumentTitle,
  sharedDocuments,
}: {
  user: {
    fullName: string;
    primaryEmailAddress: { emailAddress: string };
    imageUrl: string;
  };
  addANewDocumentHandler: () => Promise<void>;
  deleteADocumentHanlder: (id: string) => Promise<void>;
  documents: { id: string; title: string }[];
  getToken: () => Promise<string | null>;
  getTitle: (id: string) => string;
  updateADocumentTitle: (id: string, title: string) => Promise<void>;
  sharedDocuments: { id: string; title: string }[];
}) => {
  return (
    <SidebarProvider>
      {user && (
        <AppSidebar
          addANewDocumentHandler={addANewDocumentHandler}
          deleteHanlder={deleteADocumentHanlder}
          documents={documents}
          sharedDocuments={sharedDocuments}
          getToken={getToken}
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
                      <BreadcrumbPage>
                        {location.pathname.replace(/^\//, "")}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                ) : null}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <Toaster position="top-center" />
            <Outlet
              context={{
                deleteADocumentHanlder,
                getTitle,
                updateADocumentTitle,
                getToken,
              }}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarMain;
