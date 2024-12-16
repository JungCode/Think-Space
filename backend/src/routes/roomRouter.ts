import { Router } from "express";
import * as Controller from "../controllers/roomController";
const router = Router();

router.get("/:id", Controller.getRoomsByUserId);
router.post("/:id", Controller.saveARoom);
router.post("/removeARoom/:id", Controller.removeARoom);
export default router;
