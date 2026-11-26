import { z } from "zod";
import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models";

/**
 * Port of the old Express /api/tasks. It was unauthenticated there; it now requires an admin
 * session because nothing on the public website uses it.
 */
const body = z.object({ title: z.string().trim().min(1, "title is required").max(255), status: z.string().trim().max(50).optional() });

export const GET = handle(async (req: Request) => {
  await requireUser(req, "dashboard.view");
  await connectDB();
  return ok(await Task.find().sort({ createdAt: -1 }).limit(500).lean());
});

export const POST = handle(async (req: Request) => {
  await requireUser(req, "content.write");
  await connectDB();
  const data = body.parse(await req.json().catch(() => ({})));
  return ok(await Task.create({ title: data.title, status: data.status || "pending" }), "Task created", 201);
});
