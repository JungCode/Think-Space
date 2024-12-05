import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import indexRoutes from "./routes/userRouter";
import documentRoutes from "./routes/documentRouter";
import roomRoutes from "./routes/roomRouter";
import { initializeFirebaseAdmin } from "./config/firebase";

// Load environment variables
dotenv.config();

// Initialize Firebase
const firestoreDb = initializeFirebaseAdmin();

// Initialize Express App
const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(cors());

// Add routes
app.use("/", indexRoutes);
app.use("/document", documentRoutes);
app.use("/room", roomRoutes);
// Export Firestore and app for use elsewhere
export { firestoreDb };
export default app;
