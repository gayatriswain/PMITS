import { handle, ok, listParams } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ActivityLog } from "@/models";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "activity.read");
  await connectDB();
  const url = new URL(req.url);
  const { page, limit, skip } = listParams(url, { limit: 50 });
  const filter: Record<string, unknown> = {};
  const entity = url.searchParams.get("entity");
  if (entity && /^[a-z-]{2,40}$/.test(entity)) filter.entity = entity;
  const [items, total] = await Promise.all([ActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(), ActivityLog.countDocuments(filter)]);
  return ok({ items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) });
});
