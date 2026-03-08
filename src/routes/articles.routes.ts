import { Router } from 'express';
import { createArticle, deleteArticle, getAllArticles, getArticleById, updateArticle } from '../controllers/articles.controller';
import { authenticateToken } from '../middleware/auth-validation';
import { articleValidation } from '../middleware/article-validation';


const articlesRouter = Router();

/**
 * @openapi
 * /articles:
 *   post:
 *     tags:
 *       - Articles
 *     summary: Submit new article (requires JWT)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCreateRequest'
 *     responses:
 *       201:
 *         description: Article created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
articlesRouter.post('/', authenticateToken, articleValidation, createArticle);

/**
 * @openapi
 * /articles:
 *   get:
 *     tags:
 *       - Articles
 *     summary: View all articles (public)
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
articlesRouter.get('/', getAllArticles);

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Get article by id (public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article not found
 */
articlesRouter.get('/:id', getArticleById);

/**
 * @openapi
 * /articles/{id}:
 *   put:
 *     tags:
 *       - Articles
 *     summary: Update article by id (requires JWT)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArticleCreateRequest'
 *     responses:
 *       200:
 *         description: Article updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
articlesRouter.put('/:id', authenticateToken, articleValidation, updateArticle);

/**
 * @openapi
 * /articles/{id}:
 *   delete:
 *     tags:
 *       - Articles
 *     summary: Delete article by id (requires JWT)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Article deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Article not found
 */
articlesRouter.delete('/:id', authenticateToken, deleteArticle);

export default articlesRouter;
