import { getPublicPage } from "@/lib/services/pages";
import { isPreviewRequest } from "@/lib/services/public";
import { publicJson } from "@/lib/public-api";
import { GLOBAL_PATH } from "@/lib/sections/registry";

/** GET /api/public/page?path=/marketing-growth/local-seo */
export async function GET(req: Request) {
  const path = new URL(req.url).searchParams.get("path") || "/";
  // GLOBAL_PATH ("/__global") holds the shared sections; it is not a page URL, so it is allowed explicitly
  if (path !== GLOBAL_PATH && (!/^\/[a-z0-9\-/]*$/.test(path) || path.length > 200)) return publicJson(req, "Invalid path", 400);
  const preview = isPreviewRequest(req);
  try {
    const page = await getPublicPage(path, preview);
    return page ? publicJson(req, page, 200, preview) : publicJson(req, "Not found", 404);
  } catch (err) {
    console.error("[public/page]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

/** Always answered per request (reads headers for CORS and preview). */
export const dynamic = "force-dynamic";
