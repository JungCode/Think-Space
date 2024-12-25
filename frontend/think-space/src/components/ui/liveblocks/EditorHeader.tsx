import { useEffect, useState } from "react";
import { Button } from "../button";
import DeleteDocumentButton from "./DeleteDocumentButton";
import { toast } from "sonner";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import { useAuth } from "@clerk/clerk-react";
import { getUsersByRoom, removeARoom } from "@/api";
import { useParams } from "react-router-dom";
import Avatars from "./Avatars";
import { RefreshCw, Save } from "lucide-react";

type User = {
  username?: string;
  email: string;
  id?: string;
};

const EditorHeader = ({
  roomId,
  deleteHanlder,
  getTitle,
  updateADocumentTitle,
  isOwner,
}: {
  roomId: string;
  getTitle: (id: string) => string;
  deleteHanlder: (id: string) => Promise<void>;
  updateADocumentTitle: (id: string, title: string) => Promise<void>;
  isOwner: boolean;
}) => {
  const [input, setInput] = useState<string>(getTitle(roomId));
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isRemovePending, setIsRemovePending] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const { getToken } = useAuth();
  const params = useParams();

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const updateHandler = async () => {
    setIsPending(true);
    if (roomId) {
      await updateADocumentTitle(roomId, input);
      toast.success("Update successfully");
    } else {
      toast.error("Cannot update the document");
    }
    setIsPending(false);
  };

  const removeHandler = async (userEmail: string) => {
    setIsRemovePending(true);
    const token = await getToken();
    const roomId = params.id;
    if (roomId) {
      await removeARoom(roomId, userEmail, token || "");
      setUsers((prev) => prev.filter((doc) => doc.email !== userEmail));
      toast.success("remove the user successfully");
    } else {
      toast.error("Room ID is undefined");
    }
    setIsRemovePending(false);
  };

  const updateUsers = (email: string) => {
    setUsers((prev) => [...prev, { email: email, username: "Editor" }]);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await getToken();
      if (token) {
        const data = await getUsersByRoom(roomId, token);
        const usersData: User[] = data.map((doc: any) => ({
          username: doc.username,
          email: doc.email,
          id: doc.id,
        }));
        setUsers(usersData);
      } else {
        console.error("Token is null");
      }
    };
    fetchUsers();
  }, [roomId]);

  return (
    <div className="">
      <div className="flex items-center justify-end w-full gap-2">
        {" "}
        <input
          className="w-full h-12 px-2 text-lg bg-gray-100 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateHandler();
          }}
          onChange={inputHandler}
          readOnly={!isOwner}
        />
        <Button
          onClick={updateHandler}
          disabled={!isOwner || isPending}
          className={`flex items-center justify-center h-12 px-4 text-lg font-semibold text-white rounded-lg transition-colors duration-300 ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-black"
          }`}
        >
          {isPending ? <RefreshCw className="animate-spin" /> : <Save />}
        </Button>
        <div className="flex flex-row gap-2 pl-2 border-l-2 border-gray-600">
          <InviteUser
            updateUsers={updateUsers}
            roomId={roomId}
            getTitle={getTitle}
            isOwner={isOwner}
          />
          <DeleteDocumentButton
            deleteHanlder={deleteHanlder}
            roomId={roomId}
            isOwner={isOwner}
          />
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <ManageUsers
          isPending={isRemovePending}
          isOwner={isOwner}
          users={users}
          removeHandler={removeHandler}
        />
        <Avatars />
      </div>
    </div>
  );
};

export default EditorHeader;
