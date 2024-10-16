import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import indexRoutes from './routes/index';

dotenv.config();
const app = express();
app.use(cors());  

const port = process.env.PORT;

app.use('/',indexRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
