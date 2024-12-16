import { Router } from "express";
import * as Controller from "../controllers/userController";

const router = Router();

router.get("/", Controller.getIndex);
router.get("/byRoom/:id", Controller.getUsersByRoom);
router.post("/", Controller.saveAUser);
export default router;
