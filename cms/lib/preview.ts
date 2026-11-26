import "server-only";
import { createHmac } from "node:crypto";
import { env } from "./env";

/**
 * Short-lived signed preview link to the public site. The frontend verifies the signature with the
 * shared REVALIDATE_SECRET, so the secret itself never reaches the browser.
 */
export function previewUrl(path: string, minutes = 5) {
  const exp = Date.now() + minutes * 60_000;
  const sig = createHmac("sha256", env.revalidateSecret).update(`${path}|${exp}`).digest("hex");
  const q = new URLSearchParams({ path, exp: String(exp), sig });
  return `${env.frontendUrl}/api/draft?${q.toString()}`;
}
