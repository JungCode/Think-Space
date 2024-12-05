import { Router } from "express";
import * as Controller from "../controllers/roomController";
const router = Router();

router.get("/:id", Controller.getRoomsByUserId);
router.post("/", Controller.saveARoom);
export default router;
