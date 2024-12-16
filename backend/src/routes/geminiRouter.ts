import { Router } from "express";
import { askGemini, chatToGemini } from "../controllers/geminiController";
import { requireAuth } from "@clerk/express";
const router = Router();

router.post("/", askGemini);
router.post("/chatToDocument", chatToGemini);
export default router;
