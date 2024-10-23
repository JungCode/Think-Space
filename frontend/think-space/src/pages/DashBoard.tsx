import { UserButton, useUser } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar/Sidebar";

const DashBoard = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="relative">
      <div className="flex">
        <Sidebar username={user?.username} userButton={<UserButton />} />
        <div className=" w-screen text-center">
          This is DashBoard <br />
          Dit me {user?.username}
          <br />m ten la {user?.firstName} dung ko {user?.fullName}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
