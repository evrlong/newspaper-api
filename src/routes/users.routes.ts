import { Router } from 'express';
import { getUserByEmailHandler, getAllUsersHandler } from '../controllers/users.controller';
import { authenticateToken } from '../middleware/auth-validation';

const usersRouter = Router();

/**
 * @openapi
 * /users/{email}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by email (requires JWT)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SafeUser'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
usersRouter.get('/:email', authenticateToken, getUserByEmailHandler);

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users (requires JWT)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SafeUser'
 *       401:
 *         description: Unauthorized
 */
usersRouter.get('/', authenticateToken, getAllUsersHandler);
export default usersRouter;
