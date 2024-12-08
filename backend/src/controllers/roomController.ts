import { Request, Response } from "express";
import * as Model from "../models/roomModel";
export const getRoomsByUserId = async (req: Request, res: Response) => {
  try {
    const rooms = await Model.getRoomsByUserId(req.params.id);
    res.status(200).send(rooms);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching rooms: An unknown error occurred");
    }
  }
};
export const saveARoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.id;
    const room = {
      documentId: req.body.documentId,
    };
    const userId = req.body.userId;
    const roomRes = await Model.saveARoom(userId, roomId);
    res.status(201).send({ roomRes });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error saving a room: An unknown error occurred");
    }
  }
};
