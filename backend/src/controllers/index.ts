import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response) => {
  res.json({message:'Hello this text comes from Back-end!'});
}