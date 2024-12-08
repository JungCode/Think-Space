import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/userRouter";
import documentRoutes from "./routes/documentRouter";
import roomRoutes from "./routes/roomRouter";
import liveblocksRoutes from "./routes/liveblocksRoutes";
import { initializeFirebaseAdmin } from "./config/firebase";
import { clerkMiddleware } from "@clerk/express";
import { liveblocksConnection } from "./config/liveblocks";

// Load environment variables
dotenv.config();

// Initialize Firebase
const firestoreDb = initializeFirebaseAdmin();
const liveblocks = liveblocksConnection();
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
// Export Firestore and app for use elsewhere
export { firestoreDb, liveblocks };
export default app;
