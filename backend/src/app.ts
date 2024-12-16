import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/userRouter";
import documentRoutes from "./routes/documentRouter";
import roomRoutes from "./routes/roomRouter";
import geminiRoutes from "./routes/geminiRouter";
import liveblocksRoutes from "./routes/liveblocksRoutes";
import { initializeFirebaseAdmin } from "./config/firebase";
import { clerkMiddleware } from "@clerk/express";
import { liveblocksConnection } from "./config/liveblocks";
import { clerkConnection } from "./config/clerk";
import { geminiConnection } from "./config/gemini";

// Load environment variables
dotenv.config();

// Initialize Firebase
const firestoreDb = initializeFirebaseAdmin();
const liveblocks = liveblocksConnection();
const clerk = clerkConnection();
const model = geminiConnection();
// Initialize Express App
const app = express();

app.use(express.json()); // Middleware for JSON parsing
app.use(clerkMiddleware()); // Middleware for Clerk authentication
app.use(cors());

// Add routes
app.use("/", indexRoutes);
app.use("/documents", documentRoutes);
app.use("/rooms", roomRoutes);
app.use("/auth-endpoint", liveblocksRoutes);
app.use("/askAIQuestion", geminiRoutes);

// Export Firestore and app for use elsewhere
export { firestoreDb, liveblocks, clerk, model };
export default app;
