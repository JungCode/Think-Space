import { Request, Response } from "express";
import * as Model from "../models/documentModel";

export const getAllDocument = async (req: Request, res: Response) => {
  try {
    const documents = await Model.getAllDocument();
    res.status(200).send(documents);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error fetching documents: An unknown error occurred");
    }
  }
};

export const getDocumentbyUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const documents = await Model.getDocumentbyUserId(userId);
    res.status(200).send(documents);
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
    const document = req.body;
    const documentId = await Model.createADocument(document);
    res.status(201).send({ documentId });
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
    const documentId = req.params.id;
    const document = req.body;
    await Model.updateADocument(documentId, document);
    res.status(204).send();
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
    const documentId = req.params.id;
    await Model.deleteADocument(documentId);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({ message: error.message });
    } else {
      throw new Error("Error deleting document: An unknown error occurred");
    }
  }
};
