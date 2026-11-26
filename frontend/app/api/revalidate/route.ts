import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

/**
 * Called by the CMS after publishing: { tags: string[] } with header x-revalidate-secret.
 * Data is expired immediately so the next visitor sees the new content.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ revalidated: false, message: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as { tags?: unknown };
  const tags = Array.isArray(body.tags) ? body.tags.filter((t): t is string => typeof t === "string" && t.length > 0 && t.length <= 256).slice(0, 64) : [];
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return Response.json({ revalidated: true, tags, now: Date.now() });
}
