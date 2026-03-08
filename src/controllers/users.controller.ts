import type { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import { newUser, getUserByEmail, getAllUsers } from '../repositories/users.repository';
import { generateToken } from '../utils/jwt';

export const getAllUsersHandler = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch {
        return res.status(500).json({ message: 'Failed to fetch users' });
    }
};




export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await getUserByEmail(normalizedEmail);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const passwordHash = await hash(password, 10);
        const user = await newUser(normalizedEmail, passwordHash);
        return res.status(201).json(user);
    } catch {
        return res.status(500).json({ message: 'Failed to create user' });
    }
};

export const logInUserHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const normalizedEmail = email.trim().toLowerCase();
        const user = await getUserByEmail(normalizedEmail);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.id, user.email);
        const safeUser = {
            id: user.id,
            email: user.email,
            created_at: user.created_at
        };

        return res.json({ token, user: safeUser });
    } catch {
        return res.status(500).json({ message: 'Failed to log in user' });
    }
};

export const getUserByEmailHandler = async (req: Request<{ email: string }>, res: Response) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email.trim().toLowerCase());

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json(user);
    } catch {
        return res.status(500).json({ message: 'Failed to fetch user' });
    }
};