import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../button";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
const DeleteDocumentButton = ({
  deleteHanlder,
  isOwner,
  roomId,
}: {
  deleteHanlder: (id: string) => Promise<void>;
  roomId: string;
  isOwner: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const DeleteAndPendingHanlder = async () => {
    setIsPending(true);
    if (roomId) {
      await deleteHanlder(roomId);
      setIsPending(false);
      toast.success("Document deleted successfully");
    } else {
      toast.error("Cannot delete the document");
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="destructive" disabled={!isOwner}>
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to Delete?</DialogTitle>
          <DialogDescription>
            This will delete the document and all its content, removing all
            users from the document.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2">
          <Button
            type="button"
            variant="destructive"
            onClick={DeleteAndPendingHanlder}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocumentButton;
