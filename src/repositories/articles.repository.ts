import { pool } from "../database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { Article } from "../types/articles.types";


export async function getAllArticlesFromDb(): Promise<Article[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM articles");
    return rows as Article[];
}

export async function getArticleByIdFromDb(id: string): Promise<Article | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM articles WHERE id = ?",
        [id]
    );
    if (rows.length === 0) {
        return null;
    }
    return rows[0] as Article;
}

export async function createArticleInDb(article: { title: string; body: string; category: string | null; submittedBy: number }): Promise<Article> {
    const { title, body, category, submittedBy } = article;
    const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
        [title, body, category, submittedBy]
    );
    const insertId = (result as ResultSetHeader).insertId;
    return {
        id: insertId,
        title,
        body,
        category,
        submitted_by: submittedBy,
        created_at: new Date()
    } as Article;
}

export async function updateArticleInDb(id: string, article: { title: string; body: string; category: string | null }): Promise<Article | null> {
    const { title, body, category } = article;
    const [result] = await pool.execute<ResultSetHeader>(
        "UPDATE articles SET title = ?, body = ?, category = ? WHERE id = ?",
        [title, body, category, id]
    );
    if ((result as ResultSetHeader).affectedRows === 0) {
        return null;
    }

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM articles WHERE id = ?",
        [id]
    );

    if (rows.length === 0) {
        return null;
    }

    return {
        ...(rows[0] as Article)
    } as Article;
}

export async function deleteArticleInDb(id: string): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
        "DELETE FROM articles WHERE id = ?",
        [id]
    );
    return (result as ResultSetHeader).affectedRows > 0;
}