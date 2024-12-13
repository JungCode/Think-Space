import { Router } from "express";
import * as Controller from "../controllers/documentController";
import { requireAuth } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
router.get("/", requireAuth(), Controller.getAllDocument);
router.post("/", requireAuth(), Controller.createADocument);
router.get("/user", requireAuth(), Controller.getDocumentsTitlebyUserId);
router.get("/:id", Controller.getDocumentById);
router.patch("/:id", requireAuth(), Controller.updateADocument);
router.delete("/:id", requireAuth(), Controller.deleteADocument);
export default router;
