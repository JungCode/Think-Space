import { Router } from "express";
import * as Controller from "../controllers/documentController";
const router = Router();

router.post("/", Controller.createADocument);
router.get("/", Controller.getAllDocument);
router.get("/:id", Controller.getDocumentbyUserId);
router.put("/:id", Controller.updateADocument);
router.delete("/:id", Controller.deleteADocument);
export default router;
