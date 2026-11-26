import { publicNavigation } from "@/lib/services/public";
import { publicJson } from "@/lib/public-api";

export async function GET(req: Request, ctx: { params: Promise<{ key: string }> }) {
  const { key } = await ctx.params;
  if (!/^[a-z0-9-]{2,60}$/.test(key)) return publicJson(req, "Invalid key", 400);
  try {
    const nav = await publicNavigation(key);
    return nav ? publicJson(req, nav) : publicJson(req, "Not found", 404);
  } catch (err) {
    console.error("[public/navigation]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

/** Always answered per request (reads headers for CORS and preview). */
export const dynamic = "force-dynamic";
