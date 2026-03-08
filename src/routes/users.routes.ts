import { Router } from 'express';
import { createUser, getUserByEmailHandler, getAllUsersHandler, logInUserHandler } from '../controllers/users.controller';
import { authenticateToken, validateCreateUser, validateLogInUser } from '../middleware/auth-validation';

const usersRouter = Router();

usersRouter.post('/', validateCreateUser, createUser);
usersRouter.post('/login', validateLogInUser, logInUserHandler);
usersRouter.get('/:email', authenticateToken, getUserByEmailHandler);
usersRouter.get('/', authenticateToken, getAllUsersHandler);
export default usersRouter;
