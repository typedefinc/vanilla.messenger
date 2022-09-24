import express from 'express';
import { PrismaClient } from '@prisma/client';
import router from './routes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT;
export const prisma = new PrismaClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(cookieParser());
app.use(cors());



const start = async () => {
  try {
    app.listen(port, () => console.log('Server is running on ' + port));
  } catch (e) {
    console.log(e)
  }
}

start();
