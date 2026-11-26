import "server-only";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { HttpError, zodErrors } from "./api";
import { corsHeaders } from "./security";

/**
 * Public form endpoints answer in the new envelope AND keep the old Express fields
 * (`ok`, `id`, `error`, `errors`) so every existing frontend form keeps working unchanged.
 */
export async function formResponse(req: Request, run: () => Promise<{ id: string | null; spam: boolean }>) {
  const headers = corsHeaders(req);
  try {
    const { id } = await run();
    // Spam (honeypot) gets the same 201 as real visitors so bots learn nothing.
    return NextResponse.json({ success: true, ok: true, id, message: "Thanks! We'll get back to you shortly.", data: { id } }, { status: 201, headers });
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = zodErrors(err);
      const first = Object.values(errors)[0] ?? "Please check the highlighted fields.";
      return NextResponse.json({ success: false, message: first, error: first, errors }, { status: 400, headers });
    }
    if (err instanceof HttpError) {
      return NextResponse.json({ success: false, message: err.message, error: err.message }, { status: err.status, headers });
    }
    console.error("[forms] failed", err);
    const msg = "Something went wrong. Please try again.";
    return NextResponse.json({ success: false, message: msg, error: msg }, { status: 500, headers });
  }
}

export function preflight(req: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(req) });
}
