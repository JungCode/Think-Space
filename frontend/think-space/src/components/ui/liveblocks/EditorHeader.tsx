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
      <div className="flex justify-end gap-2 w-full items-center">
        {" "}
        <input
          className="w-full h-12 rounded-lg border-2 text-xl pl-3 focus:border-black focus:outline-none"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateHandler();
          }}
          onChange={inputHandler}
          readOnly={!isOwner}
        />
        <Button
          variant="default"
          onClick={updateHandler}
          disabled={!isOwner || isPending}
        >
          {isPending ? "Updating..." : "Update"}
        </Button>
        <InviteUser updateUsers={updateUsers} roomId={roomId} getTitle={getTitle} isOwner={isOwner} />
        <DeleteDocumentButton
          deleteHanlder={deleteHanlder}
          roomId={roomId}
          isOwner={isOwner}
        />
      </div>
      <div className="mt-3 flex justify-between">
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
