import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './database';
import usersRouter from './routes/users.routes';
import articlesRouter from './routes/articles.routes';
import { ar } from 'zod/v4/locales';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);




app.listen(PORT, () => {
  console.log(`News server is running on port http://localhost:${PORT}`);
}); 

