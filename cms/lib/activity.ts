import "server-only";
import { headers } from "next/headers";
import { ActivityLog } from "@/models";
import type { SessionUser } from "./auth";

export type Change = { field: string; before?: string; after?: string };
/** merge: fold into this user's last identical entry from the last 30 minutes (visual-editor autosaves). */
export type ActivityExtra = { changes?: Change[]; path?: string; merge?: boolean };

/** "Chrome on Windows", "Safari on iPhone"… (good enough for an audit log; no external library). */
export function deviceFromUA(ua: string) {
  if (!ua) return "";
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\/|Opera/.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Browser";
  const os = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /Windows/.test(ua) ? "Windows" : /Mac OS X|Macintosh/.test(ua) ? "Mac" : /Linux/.test(ua) ? "Linux" : "";
  return os ? `${browser} on ${os}` : browser;
}

const isLocal = (ip: string) => /^(::1|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::ffff:127\.|localhost|unknown$)/.test(ip);

/**
 * IP, location and device of the current request. Location comes from the hosting provider's free
 * geo headers (Vercel / Cloudflare) - no IP is sent to any outside service. Locally it is "This network".
 */
function requestMeta(h: Headers | null) {
  if (!h) return {};
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || h.get("cf-connecting-ip") || "").trim();
  const dec = (v: string | null) => {
    try {
      return v ? decodeURIComponent(v) : "";
    } catch {
      return v ?? "";
    }
  };
  const city = dec(h.get("x-vercel-ip-city") || h.get("cf-ipcity"));
  const region = dec(h.get("x-vercel-ip-country-region") || h.get("cf-region"));
  const country = h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || "";
  const location = [city, region, country].filter(Boolean).join(", ") || (ip && isLocal(ip) ? "This network (local)" : "");
  return { ip: ip || undefined, location: location || undefined, device: deviceFromUA(h.get("user-agent") ?? "") || undefined };
}

/** Fire-and-forget audit entry; never blocks or breaks the main request. */
export function logActivity(user: SessionUser | null, action: string, entity: string, entityId?: string, summary?: string, extra: ActivityExtra = {}) {
  // headers() must be read while the request is still in scope (it is undefined in CLI scripts)
  let h: Promise<Headers> | null = null;
  try {
    h = headers() as unknown as Promise<Headers>;
  } catch {
    h = null;
  }
  void (async () => {
    const meta = requestMeta(h ? await h.catch(() => null) : null);
    if (extra.merge && user) {
      const last = await ActivityLog.findOne({ user: user.id, action, entity, entityId, createdAt: { $gte: new Date(Date.now() - 30 * 60_000) } })
        .sort({ createdAt: -1 })
        .lean<{ _id: unknown; changes?: Change[] }>();
      if (last) {
        // keep each field's first "before" and its latest "after"
        const byField = new Map((last.changes ?? []).map((c) => [c.field, { field: c.field, before: c.before, after: c.after }]));
        for (const c of extra.changes ?? []) byField.set(c.field, { field: c.field, before: byField.get(c.field)?.before ?? c.before, after: c.after });
        const changes = [...byField.values()].filter((c) => (c.before ?? "") !== (c.after ?? "")).slice(0, 40);
        // raw driver: Mongoose treats createdAt as immutable, but the entry should move to "now"
        await ActivityLog.collection.updateOne({ _id: last._id as never }, { $set: { changes, summary: summary?.slice(0, 500), createdAt: new Date(), ...meta } });
        return;
      }
    }
    await ActivityLog.create({
      user: user?.id,
      userName: user?.name ?? "system",
      action,
      entity,
      entityId,
      summary: summary?.slice(0, 500),
      ...meta,
      path: extra.path?.slice(0, 200),
      changes: extra.changes?.slice(0, 40),
    });
  })().catch((err) => console.error("[activity] failed", err));
}

/* ------------------------------- diffs ------------------------------- */

const SKIP = new Set(["_id", "__v", "createdAt", "updatedAt", "updatedBy", "passwordHash", "passwordEnc", "tokenHash", "resetTokenHash", "draft", "hasUnpublishedChanges"]);
const show = (v: unknown) => {
  if (v === undefined || v === null || v === "") return "";
  const s = typeof v === "string" ? v.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : JSON.stringify(v);
  return s.length > 160 ? `${s.slice(0, 157)}…` : s;
};

function flatten(v: unknown, prefix: string, out: Map<string, unknown>, depth = 0) {
  if (v && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date) && depth < 4 && !("_bsontype" in (v as object))) {
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) if (!SKIP.has(k)) flatten(x, prefix ? `${prefix}.${k}` : k, out, depth + 1);
  } else if (Array.isArray(v) && depth < 4 && v.some((x) => x && typeof x === "object")) {
    v.forEach((x, i) => flatten(x, `${prefix}.${i + 1}`, out, depth + 1));
    out.set(`${prefix}.#count`, v.length);
  } else out.set(prefix, v instanceof Date ? v.toISOString() : Array.isArray(v) ? v.join(", ") : v);
}

/** Field-level differences between two versions of a document (only keys present in `after`). */
export function diffObjects(before: unknown, after: unknown, label: (path: string) => string = (p) => p, max = 40): Change[] {
  const a = new Map<string, unknown>();
  const b = new Map<string, unknown>();
  flatten(before ?? {}, "", a);
  flatten(after ?? {}, "", b);
  const out: Change[] = [];
  for (const [k, v] of b) {
    if (show(a.get(k)) === show(v)) continue;
    out.push({ field: k.endsWith(".#count") ? `${label(k.replace(/\.#count$/, ""))} (number of items)` : label(k), before: show(a.get(k)), after: show(v) });
    if (out.length >= max) break;
  }
  return out;
}

/** "seo.ogTitle" -> "Seo › Og title" */
export const prettyPath = (p: string) =>
  p.split(".").map((x) => (/^\d+$/.test(x) ? `#${x}` : x.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase()))).join(" › ");
