import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../button";
import { useUser } from "@clerk/clerk-react";

type User = {
  username?: string;
  email: string;
  id?: string;
};
const ManageUsers = ({
  isOwner,
  users,
  removeHandler,
  isPending,
}: {
  isOwner: boolean;
  users: User[];
  removeHandler: (userEmail: string) => Promise<void>;
  isPending: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" disabled={false}>
        <DialogTrigger>{`Users (${users.length})`}</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with Access</DialogTitle>
          <DialogDescription>
            Below is a list of users who have access to this document
          </DialogDescription>
        </DialogHeader>
        <hr className="my-2" />
        <div>
          {users.map((user) => (
            <div key={user.email} className="flex justify-between ">
              <div>{user.email}</div>
              <div className="mb-2">
                <Button variant="outline">
                  {user.username == "owner" ? "Owner" : "Editor"}
                </Button>
                {isOwner && email != user.email && (
                  <Button
                    variant="destructive"
                    disabled={isPending}
                    size="sm"
                    onClick={() => removeHandler(user.email)}
                  >
                    {isPending ? "Removing" : "X"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageUsers;
