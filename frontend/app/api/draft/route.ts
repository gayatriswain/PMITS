import { createHmac, timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Entry point for CMS "Preview" links: /api/draft?path=/x&exp=<ms>&sig=<hmac>.
 * The CMS signs path+expiry with the shared REVALIDATE_SECRET; links expire after a few minutes.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path") ?? "";
  const exp = Number(searchParams.get("exp"));
  const sig = searchParams.get("sig") ?? "";
  const secret = process.env.REVALIDATE_SECRET;
  // Same-site paths only (no open redirect).
  if (!secret || !/^\/[a-z0-9\-/]*$/.test(path) || path.startsWith("//") || !Number.isFinite(exp) || exp < Date.now()) {
    return new Response("Invalid or expired preview link", { status: 401 });
  }
  const expected = createHmac("sha256", secret).update(`${path}|${exp}`).digest("hex");
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return new Response("Invalid preview link", { status: 401 });
  }
  (await draftMode()).enable();
  redirect(path);
}
