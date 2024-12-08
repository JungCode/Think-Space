import { Router } from "express";
import { authEndpoint } from "../controllers/liveblocksController";
const router = Router();

router.post("/", authEndpoint);

export default router;
