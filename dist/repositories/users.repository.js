import { pool } from "../database";
export async function newUser(email, passwordHash) {
    const [result] = await pool.execute("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, passwordHash]);
    const insertedId = result.insertId;
    return {
        id: insertedId,
        email,
        password_hash: passwordHash,
        created_at: new Date()
    };
}
export async function getUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
        return null;
    }
    const user = rows[0];
    return user;
}
