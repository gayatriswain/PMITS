import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { ActivityLog, Page } from "@/models";
import { logActivity } from "@/lib/activity";
import { assertSameOrigin } from "@/lib/security";

const body = z.object({ path: z.string().regex(/^\/admin(\/[A-Za-z0-9_\-./]*)?$/).max(200), title: z.string().max(120).optional() });

const pretty = (s: string) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** "Blogs", "Page editor: Home", "Careers › New"… from the admin URL (the browser title is often just "ProManage CMS"). */
async function screenName(path: string, title?: string) {
  const t = title?.replace(/\s*\|\s*ProManage CMS$/, "").trim();
  const parts = path.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  if (!parts.length) return "Dashboard";
  if (parts[0] === "pages" && parts[1] && isValidObjectId(parts[1])) {
    const p = await Page.findById(parts[1], "title path").lean<{ title?: string; path?: string }>();
    return `Page editor: ${p?.title ?? p?.path ?? "page"}`;
  }
  const last = parts[parts.length - 1];
  const section = pretty(parts[0] === "content" || parts[0] === "global" ? parts[1] ?? parts[0] : parts[0]);
  if (isValidObjectId(last)) return `${section} › Edit`;
  if (last === "new") return `${section} › New`;
  if (t && t !== "ProManage CMS") return t;
  return parts.length > 1 && parts[0] !== "content" ? `${section} › ${pretty(last)}` : section;
}

/** Records which admin screens a signed-in user opens (same screen counted once per 10 minutes). */
export const POST = handle(async (req: Request) => {
  assertSameOrigin(req);
  const user = await requireUser(req);
  const { path, title } = body.parse(await req.json().catch(() => ({})));
  await connectDB();
  const recent = await ActivityLog.exists({ user: user.id, action: "view", path, createdAt: { $gte: new Date(Date.now() - 10 * 60_000) } });
  if (!recent) logActivity(user, "view", "visits", undefined, `Opened ${await screenName(path, title)}`, { path });
  return ok(null);
});
