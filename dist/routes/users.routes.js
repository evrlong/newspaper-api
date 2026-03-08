import { Router } from 'express';
import { createUser, getUserByEmailHandler } from '../controllers/users.controller';
const usersRouter = Router();
usersRouter.post('/', createUser);
usersRouter.get('/:email', getUserByEmailHandler);
export default usersRouter;
