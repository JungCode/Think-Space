import RoomProvider from "@/components/ui/liveblocks/RoomProvider";
import LiveBlocksProvider from "@/components/ui/liveblocks/LiveBlocksProvider";
import Editor from "@/components/ui/liveblocks/Editor";
import { useLocation, useOutletContext } from "react-router-dom";
interface OutletContextType {
  deleteADocumentHanlder: () => Promise<void>;
  getTitle: (id: string) => string;
  updateADocumentTitle: (id: string, title: string) => Promise<void>;
}

const Document = () => {
  const location = useLocation();
  const path = location.pathname;
  const id = path.substring(1);
  const { deleteADocumentHanlder, getTitle, updateADocumentTitle } =
    useOutletContext<OutletContextType>();
  return (
    <LiveBlocksProvider>
      <RoomProvider roomId={id}>
        <div className="min-h-screen flex flex-col items-center bg-white">
          <div className="lg:w-2/3 md:w-4/5 w-full">
            <Editor
              key={id}
              deleteHanlder={deleteADocumentHanlder}
              getTitle={getTitle}
              updateADocumentTitle={updateADocumentTitle}
            />
          </div>
        </div>
      </RoomProvider>{" "}
    </LiveBlocksProvider>
  );
};

export default Document;
