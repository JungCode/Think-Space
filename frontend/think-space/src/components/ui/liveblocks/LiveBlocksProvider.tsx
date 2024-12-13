import { useUser } from "@clerk/clerk-react";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";

interface LiveBlocksProviderProps {
  children: ReactNode;
}

const LiveBlocksProvider = ({ children }: LiveBlocksProviderProps) => {
  const params = useParams();
  const roomId = params.id;
  const userId = useUser().user?.id;
  return (
    <LiveblocksProvider
      key={roomId}
      authEndpoint={async () => {
        const response = await fetch(
          "http://think-space-back-end-production.up.railway.app/auth-endpoint",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomId, userId: userId }),
          }
        );
        const data = await response.json();
        return { token: data };
      }}
      throttle={16}
    >
      {children}
    </LiveblocksProvider>
  );
};

export default LiveBlocksProvider;
