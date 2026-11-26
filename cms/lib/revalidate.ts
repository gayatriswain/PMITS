import "server-only";
import { env } from "./env";

/**
 * Tell the public website to drop cached data for these tags (frontend/app/api/revalidate).
 * Never throws: a failed revalidation must not fail the admin save; content still refreshes on the
 * frontend's fallback revalidate interval.
 */
export async function revalidateFrontend(tags: string[]) {
  const unique = [...new Set(tags.filter(Boolean))].slice(0, 64);
  if (!unique.length) return { ok: true };
  try {
    const res = await fetch(`${env.frontendUrl}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": env.revalidateSecret },
      body: JSON.stringify({ tags: unique }),
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.warn("[revalidate] frontend responded", res.status);
    return { ok: res.ok };
  } catch (err) {
    console.warn("[revalidate] frontend unreachable:", (err as Error).message);
    return { ok: false };
  }
}

/** Cache tag conventions shared with frontend/lib/cms.ts */
export const tags = {
  page: (path: string) => `page:${path || "/"}`,
  pages: "pages",
  nav: (key: string) => `nav:${key}`,
  settings: "settings",
  collection: (name: string) => `col:${name}`,
  item: (name: string, slug: string) => `col:${name}:${slug}`,
  sitemap: "sitemap",
};
