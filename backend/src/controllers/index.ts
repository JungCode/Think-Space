import { Request, Response } from "express";
import * as Model from "../models/index"
export const getIndex = async (req: Request, res: Response) => {
  try {
    const users = await Model.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error('Error fetching users: An unknown error occurred');
    }
  }
}