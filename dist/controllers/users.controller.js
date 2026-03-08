import { hash } from 'bcryptjs';
import { newUser, getUserByEmail } from '../repositories/users.repository';
export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const passwordHash = await hash(password, 10);
        const user = await newUser(email, passwordHash);
        return res.status(201).json(user);
    }
    catch {
        return res.status(500).json({ message: 'Failed to create user' });
    }
};
export const getUserByEmailHandler = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch {
        return res.status(500).json({ message: 'Failed to fetch user' });
    }
};
