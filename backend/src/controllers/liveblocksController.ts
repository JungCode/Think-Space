import { Request, Response } from "express";
import { liveblocks } from "../app";
import axios from "axios";

export const authEndpoint = async (req: Request, res: Response) => {
  const { roomId, userId, username, avatar } = req.body;
  try {
    const session = liveblocks.prepareSession(userId, {
      userInfo: {
        name: username,
        email: "",
        avatar: avatar,
      },
    });
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
