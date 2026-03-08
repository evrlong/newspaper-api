import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.listen(PORT, () => {
    console.log(`News server is running on port http://localhost:${PORT}`);
});
