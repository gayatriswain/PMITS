import { Request, Response } from "express";
import { pool } from "../config/db";
import { ResultSetHeader } from "mysql2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IDEA_MIN = 10;
const IDEA_MAX = 500;

export async function createLead(req: Request, res: Response) {
  const { idea, email, source, website } = req.body ?? {};

  // Honeypot: real users never see or fill the "website" field.
  if (website) {
    return res.status(201).json({ ok: true });
  }

  const cleanIdea = typeof idea === "string" ? idea.trim() : "";
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (cleanIdea.length < IDEA_MIN || cleanIdea.length > IDEA_MAX) {
    return res.status(400).json({ error: `Please describe your idea in ${IDEA_MIN}–${IDEA_MAX} characters.` });
  }
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 255) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO leads (idea, email, source) VALUES (?, ?, ?)",
      [cleanIdea, cleanEmail, typeof source === "string" ? source.slice(0, 100) : null]
    );
    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("Failed to save lead:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
