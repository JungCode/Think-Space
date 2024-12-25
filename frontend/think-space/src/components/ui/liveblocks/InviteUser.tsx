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
import { toast } from "sonner";
import { Input } from "../input";
import { useAuth } from "@clerk/clerk-react";
import { inviteAUserToRoom } from "@/api";
import { UserRoundPlus } from "lucide-react";
const InviteUser = ({
  roomId,
  isOwner,
  getTitle,
  updateUsers,
}: {
  roomId: string;
  isOwner: boolean;
  getTitle: (id: string) => string;
  updateUsers: (email: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState<string>("");
  const { getToken } = useAuth();

  const inviteHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const token = await getToken();
    if (!token) {
      toast.error("Failed to get authentication token");
      return;
    }
    if (roomId) {
      const title = getTitle(roomId);
      const data = await inviteAUserToRoom(roomId, email, token, title);
      setIsPending(false);
      if (data) {
        toast.success("User Added to Room successfully");
        updateUsers(email);
      } else {
        toast.error("Cannot find user with this email");
      }
    } else {
      toast.error("Cannot add user to the room");
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline" disabled={!isOwner}>
        <DialogTrigger>
          <UserRoundPlus />
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User to collaborate!</DialogTitle>
          <DialogDescription>
            Enter the email of the user you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={inviteHandler} className="flex gap-2">
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={isPending || !email}>
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
