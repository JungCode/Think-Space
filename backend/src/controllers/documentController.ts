import { Request, Response } from "express";
import * as Model from "../models/documentModel";
import { saveARoom } from "../models/roomModel";
import dotenv from "dotenv";
import { deleteLiveBlocksRoom } from "./liveblocksController";

dotenv.config();

export const getAllDocument = async (req: Request, res: Response) => {
  try {
    const documents = await Model.getAllDocument(); // Pass userId to fetch user-specific documents
    res.status(200).send(documents);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { auth } = req;
    if (!auth || !auth.userId) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      const documentId = req.params.id;
      const document = await Model.getDocumentById(documentId);
      res.status(200).send(document);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching document: An unknown error occurred");
    }
  }
};

export const getDocumentsTitlebyUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { auth } = req;
    if (!auth || !auth) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      const userId = auth.userId;
      const documents = await Model.getDocumentbyUserId(userId);
      const documentTitles = documents.map((doc) => ({
        title: doc.title,
        id: doc.id,
        updatedAt: doc.updatedAt,
      }));
      res.status(200).send(documentTitles);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const createADocument = async (req: Request, res: Response) => {
  try {
    const { auth } = req;
    if (!auth || !auth.userId) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      const document = { owner: auth.userId, ...req.body };
      const documentId = await Model.createADocument(document);
      const roomId = await saveARoom(auth.userId, documentId);
      res.status(201).send({ documentId });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error creating document: An unknown error occurred");
    }
  }
};

export const updateADocument = async (req: Request, res: Response) => {
  try {
    const { auth } = req;
    if (!auth || !auth.userId) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      const documentId = req.params.id;
      const document = req.body;
      await Model.updateADocument(documentId, document);
      res.status(204).send();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error updating document: An unknown error occurred");
    }
  }
};

export const deleteADocument = async (req: Request, res: Response) => {
  try {
    const { auth } = req;
    if (!auth || !auth.userId) {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      const documentId = req.params.id;
      await Model.deleteADocument(documentId, auth.userId);
      await deleteLiveBlocksRoom(documentId);
      res.status(204).send();
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error deleting document: An unknown error occurred");
    }
  }
};
