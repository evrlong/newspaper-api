import { z } from 'zod';
import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

const createUserSchema = z.object({
	email: z.email({ message: 'Invalid email format' }),
	password: z
		.string({ message: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters long' })
});

export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
	const parsed = createUserSchema.safeParse(req.body);

	if (!parsed.success) {
		return res.status(400).json({
			message: 'Validation failed',
			errors: parsed.error.issues.map((issue) => ({
				field: issue.path.join('.'),
				message: issue.message
			}))
		});
	}

	req.body = {
		...parsed.data,
		email: parsed.data.email.trim().toLowerCase()
	};

	next();
};

const logInUserSchema = z.object({
    email: z.email({ message: 'Invalid email format' }),
    password: z.string({ message: 'Password is required' })
});

export const validateLogInUser = (req: Request, res: Response, next: NextFunction) => {
    const parsed = logInUserSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: parsed.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }

    req.body = {
        ...parsed.data,
        email: parsed.data.email.trim().toLowerCase()
    };
    next();
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Missing or invalid authorization header' });
	}

	const token = authHeader.slice('Bearer '.length).trim();
	const payload = verifyToken(token);

	if (!payload) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}

	res.locals.authUser = payload;
	next();
};

