import { useUser } from "@clerk/clerk-react";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { useParams } from "react-router-dom";

interface LiveBlocksProviderProps {
  children: ReactNode;
  getToken: () => Promise<string | null>;
}

const LiveBlocksProvider = ({
  children,
  getToken,
}: LiveBlocksProviderProps) => {
  const params = useParams();
  const roomId = params.id;
  const userId = useUser().user?.id;
  const username = useUser().user?.username;
  return (
    <LiveblocksProvider
      key={roomId}
      authEndpoint={async () => {
        const token = await getToken();
        const response = await fetch("https://think-space-back-end-production.up.railway.app/auth-endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ roomId, userId: userId, username: username }),
        });
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
