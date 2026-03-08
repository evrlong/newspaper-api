import { Router } from 'express';
import { createUser, logInUserHandler } from '../controllers/users.controller';
import { validateCreateUser, validateLogInUser } from '../middleware/auth-validation';

const authRouter = Router();

authRouter.post('/register', validateCreateUser, createUser);
authRouter.post('/login', validateLogInUser, logInUserHandler);

export default authRouter;
