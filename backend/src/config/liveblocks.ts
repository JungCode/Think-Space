import { Liveblocks } from "@liveblocks/node";

// Load environment variables
// run git action again
export const liveblocksConnection = () => {
  const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY || "",
  });
  return liveblocks;
};
