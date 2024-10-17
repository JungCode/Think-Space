import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index';
import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
dotenv.config();

let serviceAccount: ServiceAccount;
if (process.env.FIREBASE_CONFIG) {
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG) as ServiceAccount;
} else {
  // Chỉ import tệp khi biến môi trường không tồn tại
  const serviceAccountRaw = await import('../firebase-config.json', { assert: { type: 'json' } });
  serviceAccount = serviceAccountRaw as ServiceAccount;
}

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
export default app;