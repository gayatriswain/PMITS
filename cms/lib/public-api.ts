import "server-only";
import { NextResponse } from "next/server";
import { corsHeaders } from "./security";

/** JSON for the public read API. Cached briefly at the edge; the frontend's own cache is tag-based. */
export function publicJson(req: Request, data: unknown, status = 200, preview = false) {
  return NextResponse.json(status === 200 ? { success: true, data } : { success: false, message: String(data) }, {
    status,
    headers: { ...corsHeaders(req), "Cache-Control": preview || status !== 200 ? "no-store" : "public, s-maxage=60, stale-while-revalidate=300" },
  });
}
