import { GoogleGenerativeAI } from "@google/generative-ai";

export const geminiConnection = async () => {
  if (!process.env.AI_API_KEY) {
    throw new Error("AI_API_KEY is not defined in environment variables");
  }
  const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  return model;
};
