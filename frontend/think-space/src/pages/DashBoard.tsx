import { UserButton, useUser } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar/Sidebar";

const DashBoard = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="relative">
      <Sidebar username={user?.username} userButton={<UserButton />}/>
      <div className="flex">
        <div className="min-w-56"></div>
        <div className="  ">
          This is DashBoard <br />
          Dit me {user?.username}
          <br />m ten la {user?.firstName} dung ko {user?.fullName}
          
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
