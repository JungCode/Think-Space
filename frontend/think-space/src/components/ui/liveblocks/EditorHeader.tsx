import { useState } from "react";
import { Button } from "../button";
import DeleteDocumentButton from "./DeleteDocumentButton";
import { toast } from "sonner";

const EditorHeader = ({
  roomId,
  deleteHanlder,
  getTitle,
  updateADocumentTitle,
}: {
  roomId: string;
  getTitle: (id: string) => string;
  deleteHanlder: (id: string) => Promise<void>;
  updateADocumentTitle: (id: string, title: string) => Promise<void>;
}) => {
  const [input, setInput] = useState<string>(getTitle(roomId));
  const [isPending, setIsPending] = useState<boolean>(false);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const updateHandler = async () => {
    setIsPending(true);
    if (roomId) {
      await updateADocumentTitle(roomId, input);
      setIsPending(false);
      toast.success("Update successfully");
    } else {
      toast.error("Cannot update the document");
    }
  };
  return (
    <div className="flex justify-end gap-2  items-center">
      <input
        className="w-full h-12 rounded-lg border-2 text-xl pl-3 focus:border-black focus:outline-none"
        value={input}
        onChange={inputHandler}
      />
      <Button variant="default" onClick={updateHandler} disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </Button>
      <DeleteDocumentButton deleteHanlder={deleteHanlder} roomId={roomId} />
    </div>
  );
};

export default EditorHeader;
