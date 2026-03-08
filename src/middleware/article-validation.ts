import { z } from 'zod';
import type { NextFunction, Request, Response } from 'express';


const schemaNewArticle = z.object({
    title: z.string({ message: 'Title is required' }).min(1, { message: 'Title cannot be empty' }),
    body: z.string({ message: 'Body is required' }).min(1, { message: 'Body cannot be empty' }),
    category: z.string().min(1, { message: 'Category cannot be empty' }).optional()
});

export const articleValidation = (req: Request, res: Response, next: NextFunction) => {
    const parsed = schemaNewArticle.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.issues });
    }

    req.body = parsed.data;

    next();
};