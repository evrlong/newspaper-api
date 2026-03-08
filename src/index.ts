import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes';
import articlesRouter from './routes/articles.routes';
import authRouter from './routes/auth.routes';
import { swaggerUi, swaggerSpec } from './swagger';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`News server is running on port http://localhost:${PORT}`);
}); 

