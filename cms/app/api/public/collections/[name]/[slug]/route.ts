import { isPreviewRequest, publicItem } from "@/lib/services/public";
import { publicJson } from "@/lib/public-api";

const NAMES = ["blogs", "services", "portfolio", "careers"] as const;

export async function GET(req: Request, ctx: { params: Promise<{ name: string; slug: string }> }) {
  const { name, slug } = await ctx.params;
  if (!(NAMES as readonly string[]).includes(name) || !/^[a-z0-9-]{1,200}$/.test(slug)) return publicJson(req, "Not found", 404);
  const preview = isPreviewRequest(req);
  try {
    const item = await publicItem(name as (typeof NAMES)[number], slug, preview);
    return item ? publicJson(req, item, 200, preview) : publicJson(req, "Not found", 404);
  } catch (err) {
    console.error("[public/item]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

/** Always answered per request (reads headers for CORS and preview). */
export const dynamic = "force-dynamic";
