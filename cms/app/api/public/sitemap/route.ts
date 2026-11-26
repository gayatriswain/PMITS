import { sitemapEntries } from "@/lib/services/public";
import { publicJson } from "@/lib/public-api";

export async function GET(req: Request) {
  try {
    return publicJson(req, await sitemapEntries());
  } catch (err) {
    console.error("[public/sitemap]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

/** Always answered per request (reads headers for CORS and preview). */
export const dynamic = "force-dynamic";
