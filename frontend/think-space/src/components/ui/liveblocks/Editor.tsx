import { useRoom, useSelf } from "@liveblocks/react";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import { useOwner } from "@/api";
import { useAuth } from "@clerk/clerk-react";
import EditorHeader from "./EditorHeader";

type EditorProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
};
function BlockNote({ doc, provider }: EditorProps) {
  const userInfo = useSelf((me) => me.info);
  const editor: BlockNoteEditor = useCreateBlockNote(
    {
      collaboration: {
        provider,
        fragment: doc.getXmlFragment("document-store"),
        user: {
          name: userInfo?.name || "Anonymous",
          color: stringToColor(userInfo?.name || "Anonymous"),
        },
      },
    },
    [doc, provider]
  );
  return (
    <div className="relative max-w-6xl mx-auto border-t-2 mt-5">
      <BlockNoteView
        className="min-h-screen "
        theme="light"
        editor={editor}
      ></BlockNoteView>
    </div>
  );
}
const Editor = ({
  deleteHanlder,
  getTitle,
  updateADocumentTitle,
}: {
  deleteHanlder: (id: string) => Promise<void>;
  getTitle: (id: string) => string;
  updateADocumentTitle: (id: string, title: string) => Promise<void>;
}) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();

  const { userId, getToken } = useAuth();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    const yDoc = new Y.Doc();
    setDoc(yDoc);
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setProvider(yProvider);

    const fetchToken = async () => {
      const token = await getToken();
      const owner = await useOwner(room.id, userId || "", token || "");
      setIsOwner(owner);
    };

    fetchToken();
    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
      setDoc(undefined);
      setProvider(undefined);
      setIsOwner(false);
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }
  return (
    <div className="max-w-6xl mx-auto">
      <div className="h-10">
          <EditorHeader
            deleteHanlder={deleteHanlder}
            getTitle={getTitle}
            updateADocumentTitle={updateADocumentTitle}
            roomId={room.id}
            isOwner={isOwner}
          />
      </div>
      <BlockNote key={room.id} doc={doc} provider={provider} />
    </div>
  );
};

export default Editor;
