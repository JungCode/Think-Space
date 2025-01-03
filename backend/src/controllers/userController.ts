import { Request, Response } from "express";
import * as Model from "../models/userModel";
export const getIndex = async (req: Request, res: Response) => {
  try {
    const users = await Model.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching users: An unknown error occurred");
    }
  }
};
export const saveAUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userEmail = await Model.saveAUser(user);
    res.status(201).send({ userEmail });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error creating user: An unknown error occurred");
    }
  }
};
export const getUsersByRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const users = await Model.getUsersByRoom(roomId);
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching users: An unknown error occurred");
    }
  }
};
