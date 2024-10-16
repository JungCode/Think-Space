import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.json({message:'This text comes from Back-end!'});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
