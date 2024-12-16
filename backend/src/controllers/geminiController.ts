import { Request, Response } from "express";
import { model } from "../app";

export const askGemini = async (req: Request, res: Response) => {
  try {
    const prompt = `
      Summarize this document, by using ${req.body.language} language: ${req.body.documentData}.
    `;

    const resolvedModel = await model;
    const result = await resolvedModel.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    res.end(); // Kết thúc streaming
  } catch (error) {
    res.status(500).json({ error: "Authorization failed" });
  }
};
export const chatToGemini = async (req: Request, res: Response) => {
  try {
    const prompt = `You are a assistant helping the user to chat to a document, I am providing a JSON file of the markdown for the document. Using this, answer the users question in the clearest way possible , the document is about${req.body.documentData}
    and my question is : ${req.body.question}
    `;

    const resolvedModel = await model;
    const result = await resolvedModel.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      res.write(chunkText);
    }
    res.end(); // Kết thúc streaming
  } catch (error) {
    res.status(500).json({ error: "Authorization failed" });
  }
};
