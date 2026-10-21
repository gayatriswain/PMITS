import { Request, Response } from "express";
import { pool } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function getTasks(req: Request, res: Response) {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT id, title, status, created_at FROM tasks ORDER BY created_at DESC"
  );
  res.json(rows);
}

export async function createTask(req: Request, res: Response) {
  const { title, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO tasks (title, status) VALUES (?, ?)",
    [title, status || "pending"]
  );

  res.status(201).json({ id: result.insertId, title, status: status || "pending" });
}

export async function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { title, status } = req.body;

  await pool.query("UPDATE tasks SET title = ?, status = ? WHERE id = ?", [
    title,
    status,
    id,
  ]);

  res.json({ id: Number(id), title, status });
}

export async function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  res.status(204).send();
}
