import { UserButton, useUser } from "@clerk/clerk-react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";


const DashBoard = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="relative">
      <div className="flex">
        <Sidebar username={user?.username} userButton={<UserButton />} />
        <div className=" w-screen text-center">
          <div className="w-full h-9"></div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
