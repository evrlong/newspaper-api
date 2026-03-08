import jwt, { type SignOptions } from 'jsonwebtoken';
import type { AuthTokenPayload } from '../types/auth.types';

function getJwtSecret(): string {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is missing in environment variables');
    }

    return jwtSecret;
}

export function generateToken(userId: number, email: string): string {
    const payload: AuthTokenPayload = { userId, email };
    const expiresIn = (process.env.JWT_EXPIRES_IN ?? '1h') as SignOptions['expiresIn'];
    return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

export function verifyToken(token: string): AuthTokenPayload | null {
    try {
        return jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
    } catch {
        return null;
    }
}