import { publicCollection } from "@/lib/services/public";
import { publicJson } from "@/lib/public-api";

const NAMES = ["blogs", "services", "testimonials", "portfolio", "careers", "team", "blog-categories"] as const;

export async function GET(req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!(NAMES as readonly string[]).includes(name)) return publicJson(req, "Not found", 404);
  try {
    return publicJson(req, await publicCollection(name as (typeof NAMES)[number], new URL(req.url)));
  } catch (err) {
    console.error("[public/collection]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

/** Always answered per request (reads headers for CORS and preview). */
export const dynamic = "force-dynamic";
