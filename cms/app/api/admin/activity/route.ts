import { isValidObjectId } from "mongoose";
import { handle, ok, listParams, escapeRegex } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ActivityLog, AdminUser } from "@/models";

/**
 * Activity log. Filters: entity (area), user (id), kind:
 *   "" (default)  everything except page visits
 *   changes       edits, publishing, deletes…
 *   auth          sign-ins / sign-outs / passwords
 *   visits        admin screens opened
 *   all           everything
 */
export const GET = handle(async (req: Request) => {
  await requireUser(req, "activity.read");
  await connectDB();
  const url = new URL(req.url);
  const { page, limit, skip, q } = listParams(url, { limit: 50 });
  const filter: Record<string, unknown> = {};
  const entity = url.searchParams.get("entity");
  if (entity && /^[a-z-]{2,40}$/.test(entity)) filter.entity = entity;
  const user = url.searchParams.get("user");
  if (user && isValidObjectId(user)) filter.user = user;
  const kind = url.searchParams.get("kind") ?? "";
  if (kind === "visits") filter.action = "view";
  else if (kind === "auth") filter.entity = "auth";
  else if (kind === "changes") filter.$and = [{ action: { $ne: "view" } }, { entity: { $ne: "auth" } }];
  else if (kind !== "all") filter.action = { $ne: "view" };
  if (q) filter.$or = [{ summary: { $regex: escapeRegex(q), $options: "i" } }, { "changes.field": { $regex: escapeRegex(q), $options: "i" } }, { ip: q }];
  const [items, total, users] = await Promise.all([
    ActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    ActivityLog.countDocuments(filter),
    AdminUser.find({}, "name email").sort({ name: 1 }).lean(),
  ]);
  return ok({ items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)), users: users.map((u) => ({ _id: String(u._id), name: u.name })) });
});
