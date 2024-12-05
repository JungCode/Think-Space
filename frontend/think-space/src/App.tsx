// import { useEffect, useState } from 'react'
// import axios from 'axios';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import Landing from "./pages/Landing";
import DashBoard from "./pages/DashBoard/DashBoard.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import Home from "./pages/DashBoard/Home/Home.tsx";
import AIChat from "./pages/DashBoard/Home/AIChat.tsx";
import Document from "./pages/DashBoard/Document/Document.tsx";
// interface DataType {
//   message: string; // Thay đổi theo cấu trúc thực tế của dữ liệu
// }
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashBoard />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="home" replace />,
        },
        {
          path: "home",
          element: (
            <Home
              user={{
                imageUrl: useUser().user?.imageUrl || "",
                name: useUser().user?.firstName || "",
              }}
            />
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: "chat",
          element: <AIChat />,
          errorElement: <ErrorPage />,
        },
        {
          path:":id",
          element: <Document />,
          errorElement: <ErrorPage />,
        }
      ],
    },
  ]);
  return (
    <>
      <SignedOut>
        <Landing />
      </SignedOut>
      <SignedIn>
        <RouterProvider router={router} />
      </SignedIn>
    </>
  );
}

export default App;
