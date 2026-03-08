import type { Request, Response } from 'express';
import { createArticleInDb, deleteArticleInDb, getAllArticlesFromDb, getArticleByIdFromDb, updateArticleInDb } from '../repositories/articles.repository';

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await getAllArticlesFromDb();
        return res.json(articles);
    } catch {
        return res.status(500).json({ message: 'Failed to fetch articles' });
    }
};

export const getArticleById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const article = await getArticleByIdFromDb(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.json(article);
    } catch {
        return res.status(500).json({ message: 'Failed to fetch article' });
    }
};  

export const createArticle = async (req: Request, res: Response) => {
    try {
        const authUser = res.locals.authUser as { userId: number } | undefined;

        if (!authUser) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { title, body, category } = req.body as { title: string; body: string; category?: string };
        const newArticle = await createArticleInDb({
            title,
            body,
            category: category ?? null,
            submittedBy: authUser.userId
        });
        return res.status(201).json(newArticle);
    } catch {
        return res.status(500).json({ message: 'Failed to create new article' });
    }
};

export const updateArticle = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const { title, body, category } = req.body as { title: string; body: string; category?: string };
        const updatedArticle = await updateArticleInDb(id, { title, body, category: category ?? null });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.json(updatedArticle);
    } catch {
        return res.status(500).json({ message: 'Failed to update article' });
    }
};

export const deleteArticle = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const deletedArticle = await deleteArticleInDb(id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        return res.json({ message: 'Article deleted successfully' });
    } catch {
        return res.status(500).json({ message: 'Failed to delete article' });
    }
};