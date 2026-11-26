import "server-only";
import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { env } from "./env";
import { HttpError } from "./api";

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

/** Keyed hash for tokens and IPs - a DB leak alone does not reveal usable session tokens. */
export function hmac(value: string) {
  return createHmac("sha256", env.authSecret).update(value).digest("hex");
}

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * CSRF defence for cookie-authenticated, state-changing admin requests:
 * the browser must send an Origin (or Referer) that matches this CMS.
 * Session cookies are also SameSite=Lax, so cross-site POSTs never carry them.
 */
export function assertSameOrigin(req: Request) {
  const method = req.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return;
  const origin = req.headers.get("origin") || req.headers.get("referer") || "";
  const allowed = new URL(env.appUrl).origin;
  let reqOrigin = "";
  try {
    reqOrigin = origin ? new URL(origin).origin : "";
  } catch {
    reqOrigin = "";
  }
  // Same host as the request itself is also fine (covers custom domains / proxies).
  const self = new URL(req.url).origin;
  if (reqOrigin !== allowed && reqOrigin !== self) throw new HttpError(403, "Invalid request origin");
}

/** CORS headers for the public website calling the public API. */
export function corsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  const allowed = new Set([env.frontendUrl, ...(process.env.EXTRA_CORS_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean)]);
  if (origin && allowed.has(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
  }
  return { Vary: "Origin" };
}

/* Reversible encryption for secrets the app must use later (e.g. the SMTP password). AES-256-GCM,
   key derived from AUTH_SECRET, so a database dump alone does not reveal the secret. */
function secretKey() {
  return createHash("sha256").update(`${env.authSecret}:stored-secret:v1`).digest();
}

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", secretKey(), iv);
  const enc = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return ["v1", iv.toString("base64url"), c.getAuthTag().toString("base64url"), enc.toString("base64url")].join(".");
}

/** Returns null when the value cannot be decrypted (e.g. AUTH_SECRET changed). */
export function decryptSecret(stored: string | undefined | null): string | null {
  if (!stored) return null;
  const [v, iv, tag, data] = stored.split(".");
  if (v !== "v1" || !iv || !tag || !data) return null;
  try {
    const d = createDecipheriv("aes-256-gcm", secretKey(), Buffer.from(iv, "base64url"));
    d.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([d.update(Buffer.from(data, "base64url")), d.final()]).toString("utf8");
  } catch {
    return null;
  }
}
