import { handle, ok, escapeRegex, listParams } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { JobApplication } from "@/models";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "careers.applications");
  await connectDB();
  const url = new URL(req.url);
  const { page, limit, skip, q } = listParams(url, { limit: 25 });
  const filter: Record<string, unknown> = {};
  if (q) filter.$or = ["name", "email", "jobTitle"].map((f) => ({ [f]: { $regex: escapeRegex(q), $options: "i" } }));
  const status = url.searchParams.get("status");
  if (status && /^[a-z]{2,20}$/.test(status)) filter.status = status;
  const [items, total] = await Promise.all([
    JobApplication.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("resume", "originalName url size").lean(),
    JobApplication.countDocuments(filter),
  ]);
  return ok({ items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) });
});
