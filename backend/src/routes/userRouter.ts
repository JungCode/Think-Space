import { Router } from "express";
import * as Controller from "../controllers/userController";

const router = Router();

router.get("/", Controller.getIndex);
router.post("/", Controller.saveAUser);
export default router;
