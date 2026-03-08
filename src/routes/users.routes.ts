import { Router } from 'express';
import { getUserByEmailHandler, getAllUsersHandler } from '../controllers/users.controller';
import { authenticateToken } from '../middleware/auth-validation';

const usersRouter = Router();

usersRouter.get('/:email', authenticateToken, getUserByEmailHandler);
usersRouter.get('/', authenticateToken, getAllUsersHandler);
export default usersRouter;
