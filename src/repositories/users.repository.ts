import { pool } from "../database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { User } from "../types/users.types";



export async function getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users");
    return rows as User[];
}


export async function newUser(email: string, passwordHash: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const [result] = await pool.execute<ResultSetHeader>(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        [normalizedEmail, passwordHash]
    );

    const insertedId = result.insertId;
    return {
        id: insertedId,
        email: normalizedEmail,
        password_hash: passwordHash,
        created_at: new Date()
    };
}

export async function logInUser(email: string, passwordHash: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ? AND password_hash = ?",
        [normalizedEmail, passwordHash]
    );

    if (rows.length === 0) {
        return null;
    }
    const user = rows[0] as User;
    return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [normalizedEmail]
    );

    if (rows.length === 0) {
        return null;
    }

    const user = rows[0] as User;
    return user;
}

