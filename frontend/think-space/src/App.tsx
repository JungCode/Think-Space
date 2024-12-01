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
      ],
    },
  ]);
  // const [data, setData] = useState<DataType>();
  // useEffect(() => {
  //   axios.get<DataType>('https://think-space-back-end-production.up.railway.app/')
  //     .then(response => {
  //       setData(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error.message));
  // }, []);
  // console.log(data);
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
