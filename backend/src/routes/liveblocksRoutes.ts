import { Router } from "express";
import { authEndpoint } from "../controllers/liveblocksController";
import { requireAuth } from "@clerk/express";
const router = Router();

router.post("/", authEndpoint);

export default router;
