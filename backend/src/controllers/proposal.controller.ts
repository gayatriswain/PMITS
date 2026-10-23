import { Request, Response } from "express";
import { pool } from "../config/db";
import { ResultSetHeader } from "mysql2";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,20}$/;
const MESSAGE_MAX = 1000;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function createProposal(req: Request, res: Response) {
  const body = req.body ?? {};

  // Honeypot: real users never see or fill the "website" field.
  if (body.website) {
    return res.status(201).json({ ok: true });
  }

  const firstName = str(body.firstName);
  const lastName = str(body.lastName);
  const email = str(body.email).toLowerCase();
  const phone = str(body.phone);
  const location = str(body.location);
  const message = str(body.message);

  const errors: Record<string, string> = {};
  if (!firstName || firstName.length > 100) errors.firstName = "Please enter your first name.";
  if (!lastName || lastName.length > 100) errors.lastName = "Please enter your last name.";
  if (!EMAIL_RE.test(email) || email.length > 255) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (!location || location.length > 150) errors.location = "Please enter your location.";
  if (message.length > MESSAGE_MAX) errors.message = `Please keep this under ${MESSAGE_MAX} characters.`;

  if (Object.keys(errors).length) {
    return res.status(400).json({ error: "Please check the highlighted fields.", errors });
  }

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO proposals (first_name, last_name, email, phone, location, message, source) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, phone, location, message || null, str(body.source).slice(0, 100) || null]
    );
    res.status(201).json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error("Failed to save proposal request:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
