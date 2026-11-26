import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Task } from "@/models";

type Ctx = { params: Promise<{ id: string }> };
const body = z.object({ title: z.string().trim().min(1).max(255).optional(), status: z.string().trim().max(50).optional() });

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  await requireUser(req, "content.write");
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await Task.findByIdAndUpdate(id, { $set: body.parse(await req.json().catch(() => ({}))) }, { new: true }).lean();
  if (!doc) throw new HttpError(404, "Task not found");
  return ok(doc, "Task updated");
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  await requireUser(req, "content.delete");
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  await Task.findByIdAndDelete(id);
  return ok({ id }, "Task deleted");
});
