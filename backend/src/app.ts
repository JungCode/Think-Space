import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index';

dotenv.config();
const app = express();
app.use(cors());  

const port = Number(process.env.PORT) || 3000;  // Chuyển đổi PORT sang số

app.use('/',indexRoutes)

console.log(`Environment port: ${process.env.PORT}`);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
