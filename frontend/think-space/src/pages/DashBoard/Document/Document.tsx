import RoomProvider from "@/components/ui/liveblocks/RoomProvider";
import LiveBlocksProvider from "@/components/ui/liveblocks/LiveBlocksProvider";
import Editor from "@/components/ui/liveblocks/Editor";
import { useLocation } from "react-router-dom";
const Document = () => {
  const location = useLocation();
  const path = location.pathname;
  const id = path.substring(1);
  return (
    <LiveBlocksProvider>
      <RoomProvider roomId={id}>
        <div className="min-h-screen flex flex-col items-center bg-white">
          <div className="w-2/3">
            <Editor key={id} />
          </div>
        </div>
      </RoomProvider>{" "}
    </LiveBlocksProvider>
  );
};

export default Document;
