import { AuthObject } from "@clerk/clerk-sdk-node";
import "express";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthObject;
    }
  }
}
