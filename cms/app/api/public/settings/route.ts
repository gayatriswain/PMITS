import { publicSettings } from "@/lib/services/public";
import { publicJson } from "@/lib/public-api";

export async function GET(req: Request) {
  try {
    const s = await publicSettings();
    return s ? publicJson(req, s) : publicJson(req, "Not found", 404);
  } catch (err) {
    console.error("[public/settings]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

/** Always answered per request (reads headers for CORS and preview). */
export const dynamic = "force-dynamic";
