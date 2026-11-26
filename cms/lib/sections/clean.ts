import "server-only";
import { HttpError } from "@/lib/api";
import { sanitizeInlineRichText, sanitizeRichText } from "@/lib/sanitize";
import { env } from "@/lib/env";
import type { Field, SectionDef } from "./registry";

const SAFE_HREF = /^(\/[^\s]*|#[^\s]*|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)?$/i;
const SAFE_IMG = /^(\/[^\s]*|https?:\/\/[^\s]+)?$/i;

/** Hosts the website's image optimiser accepts (keep in sync with frontend/next.config.ts remotePatterns). */
function imageHostAllowed(url: string) {
  if (!/^https?:\/\//i.test(url)) return true; // site-relative path
  try {
    const host = new URL(url).host;
    const allowed = new Set([new URL(env.appUrl).host, "res.cloudinary.com", "images.unsplash.com", ...(process.env.EXTRA_IMAGE_HOSTS || "").split(",").map((h) => h.trim()).filter(Boolean)]);
    return allowed.has(host);
  } catch {
    return false;
  }
}

function cleanValue(field: Field, value: unknown, path: string): unknown {
  if (value === undefined || value === null) return undefined;
  switch (field.type) {
    case "text":
    case "textarea": {
      const s = String(value).slice(0, field.max ?? 5000);
      return s;
    }
    case "richtext":
      return sanitizeRichText(String(value).slice(0, 100000));
    case "richinline":
      return sanitizeInlineRichText(String(value).slice(0, field.max ? field.max * 4 : 20000));
    case "number": {
      const n = Number(value);
      return Number.isFinite(n) ? n : undefined;
    }
    case "boolean":
      return Boolean(value);
    case "select": {
      const s = String(value);
      if (field.options && !field.options.some((o) => o.value === s)) throw new HttpError(422, `Invalid choice for ${path}`);
      return s;
    }
    case "image": {
      const s = String(value).trim().slice(0, 500);
      if (!SAFE_IMG.test(s)) throw new HttpError(422, `Image for ${path} must be a /path or https:// URL`);
      if (!imageHostAllowed(s)) throw new HttpError(422, `Image for ${path}: pick or upload it in the Media library (images from other websites can't be used).`);
      return s;
    }
    case "link": {
      const v = (typeof value === "object" ? value : {}) as { label?: unknown; href?: unknown };
      const href = String(v.href ?? "").trim().slice(0, 500);
      if (!SAFE_HREF.test(href)) throw new HttpError(422, `Link for ${path} must be a /path or https:// URL`);
      return { label: String(v.label ?? "").slice(0, 120), href };
    }
    case "list": {
      if (!Array.isArray(value)) return [];
      return value.slice(0, field.maxItems ?? 50).map((item, i) => cleanObject(field.fields ?? [], item, `${path}[${i + 1}]`));
    }
    case "href": {
      const s = String(value).trim().slice(0, 500);
      if (!SAFE_HREF.test(s)) throw new HttpError(422, `Link for ${path} must be a /path, #anchor, https://, mailto: or tel: URL`);
      return s;
    }
    case "textlist":
      return (Array.isArray(value) ? value : []).slice(0, field.maxItems ?? 50).map((x) => String(x ?? "").slice(0, field.max ?? 1000));
    case "group":
      return cleanObject(field.fields ?? [], value, path);
  }
}

function cleanObject(fields: Field[], obj: unknown, path: string) {
  const src = (obj && typeof obj === "object" ? obj : {}) as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    if (f.type === "group" && f.flat) {
      Object.assign(out, cleanObject(f.fields ?? [], src, path));
      continue;
    }
    const v = cleanValue(f, src[f.name], path ? `${path}.${f.label}` : f.label);
    if (v !== undefined) out[f.name] = v;
  }
  return out;
}

/** Keep only declared fields, enforce types/lengths, sanitize rich text, block unsafe URLs. */
export function cleanSectionContent(def: SectionDef, content: Record<string, unknown>) {
  if (!def.fields.length) return {};
  if (!def.generated) return cleanObject(def.fields, content, "");
  // Generated sections store only what differs from the website's built-in content, so later code
  // changes to untouched text still show up on the site (and untouched defaults are never re-validated).
  const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
  const changed = Object.fromEntries(Object.entries(content ?? {}).filter(([k, v]) => !same(v, def.defaults[k])));
  const clean = cleanObject(def.fields, changed, "");
  return Object.fromEntries(Object.entries(clean).filter(([k, v]) => !same(v, def.defaults[k])));
}
