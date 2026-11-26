import { connectDB } from "@/lib/mongodb";
import { Media } from "@/models";
import { publicJson } from "@/lib/public-api";

/**
 * GET /api/public/media-alts -> { "<image url>": "<alt text>" } for every public image that has alt text
 * set in the Media library. The website uses it to give those images the same alt text everywhere.
 */
export async function GET(req: Request) {
  try {
    await connectDB();
    const rows = await Media.find({ private: { $ne: true }, alt: { $nin: [null, ""] }, mimeType: /^image\// }, "url alt").lean<{ url: string; alt: string }[]>();
    return publicJson(req, Object.fromEntries(rows.map((r) => [r.url, r.alt])));
  } catch (err) {
    console.error("[public/media-alts]", err);
    return publicJson(req, "Unavailable", 503);
  }
}

export const dynamic = "force-dynamic";
