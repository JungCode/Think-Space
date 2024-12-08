import e, { Request, Response } from "express";
import { liveblocks } from "../app";
import axios from "axios";

export const authEndpoint = async (req: Request, res: Response) => {
  const { roomId } = req.body;
  const { userId } = req.body;
  try {
    const session = liveblocks.prepareSession(
      userId // Required, user ID from your DB
    );
    session.allow(roomId, session.FULL_ACCESS);
    const { body, status } = await session.authorize();
    const parsedBody = JSON.parse(body);
    res.status(status).json(parsedBody.token);
  } catch (error) {
    res.status(500).json({ error: "Authorization failed" });
  }
};
export const deleteLiveBlocksRoom = async (roomId: string) => {
  try {
    console.log(roomId);
    const response = await axios.delete(
      `https://api.liveblocks.io/v2/rooms/${roomId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
        },
      }
    );
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};
