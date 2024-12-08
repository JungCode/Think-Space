import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import React from "react";
import FollowPointer from "./FollowPointer";

const LiveCursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [, updateMyPresence] = useMyPresence();
  const others = useOthers();
  const handlePointerMove = (e: React.PointerEvent) => {
    const cursor = { x: e.pageX, y: e.pageY };
    updateMyPresence({ cursor });
  };
  const handlePointerLeave = () => {
    updateMyPresence({ cursor: null });
  };
  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => (
          <FollowPointer
            key={connectionId}
            info={{ name: info?.name ?? "", avatar: info?.avatar ?? "" }}
            x={(presence.cursor as { x: number; y: number }).x}
            y={(presence.cursor as { x: number; y: number }).y}
          />
        ))}
      {children}
    </div>
  );
};

export default LiveCursorProvider;
