import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index';
import admin from 'firebase-admin';
import serviceAccountRaw from '../firebase-config.json' assert { type: 'json' };
import { ServiceAccount } from 'firebase-admin';
dotenv.config();
const serviceAccount = serviceAccountRaw as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const firestoreDb = admin.firestore(); // Khởi tạo Firestore

const app = express();
app.use(express.json()); // Middleware để parse JSON
app.use(cors());  

app.use('/',indexRoutes)

const port = Number(process.env.PORT) || 3000;  // Chuyển đổi PORT sang số
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export {firestoreDb}