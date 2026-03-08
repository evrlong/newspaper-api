import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticleById, updateArticle } from '../controllers/articles.controller';
import { authenticateToken } from '../middleware/auth-validation';
import { articleValidation } from '../middleware/article-validation';


const articlesRouter = Router();

articlesRouter.post('/', authenticateToken, articleValidation, createArticle);
articlesRouter.get('/', getAllArticles);
articlesRouter.get('/:id', getArticleById);
articlesRouter.put('/:id', authenticateToken, articleValidation, updateArticle);
articlesRouter.delete('/:id', authenticateToken, deleteArticle);

export default articlesRouter;
