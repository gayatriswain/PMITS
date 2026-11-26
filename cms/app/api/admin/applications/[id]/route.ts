import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { JobApplication, Media } from "@/models";
import { logActivity } from "@/lib/activity";
import { deleteMedia } from "@/lib/services/media";

type Ctx = { params: Promise<{ id: string }> };
const body = z.object({ status: z.enum(["new", "reviewing", "shortlisted", "interview", "rejected", "hired"]).optional(), note: z.string().trim().min(1).max(4000).optional() });

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "careers.applications");
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  const data = body.parse(await req.json().catch(() => ({})));
  await connectDB();
  const update: Record<string, unknown> = {};
  if (data.status) update.$set = { status: data.status };
  if (data.note) update.$push = { notes: { body: data.note, author: user.id, authorName: user.name } };
  const doc = await JobApplication.findByIdAndUpdate(id, update, { new: true }).populate("resume", "originalName url size").lean();
  if (!doc) throw new HttpError(404, "Application not found");
  logActivity(user, "update", "applications", id, data.status ? `Application status → ${data.status}` : "Added a note");
  return ok(doc, "Application updated");
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "careers.applications");
  const { id } = await ctx.params;
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await JobApplication.findByIdAndDelete(id).lean();
  if (!doc) throw new HttpError(404, "Application not found");
  if (doc.resume && (await Media.exists({ _id: doc.resume }))) await deleteMedia(user, String(doc.resume), true);
  logActivity(user, "delete", "applications", id, `Deleted application from ${doc.email}`);
  return ok({ id }, "Application deleted");
});
