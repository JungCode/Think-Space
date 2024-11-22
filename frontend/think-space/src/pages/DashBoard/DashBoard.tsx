import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";


const DashBoard = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="relative">
      <div className="flex">
        {/* side bar de o day  */}
        <div className=" w-screen text-center">
          <div className="w-full h-9"></div>
          <Button>Click me</Button>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
