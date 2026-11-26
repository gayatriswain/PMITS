import "server-only";
import { draftMode } from "next/headers";

/**
 * Read-only client for the ProManage CMS public API (cms/app/api/public/*).
 *
 * - Runs on the server only; the preview secret never reaches the browser.
 * - Responses are cached with tags; the CMS calls /api/revalidate with those tags after publishing.
 *   As a safety net cached data is also refreshed every REVALIDATE_SECONDS.
 * - In Draft Mode (preview links from the CMS) data is fetched fresh, including drafts.
 * - Every helper returns null when the CMS is unreachable, so pages fall back to their
 *   built-in content instead of failing.
 */
const CMS_URL = (process.env.CMS_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");
const REVALIDATE_SECONDS = 300;
const TIMEOUT_MS = 3000;

export type SeoData = {
  title?: string;
  description?: string;
  canonical?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: "summary" | "summary_large_image";
  jsonLd?: string;
  faqSchema?: boolean;
};
export type CmsSection = { key: string; component: string; enabled: boolean; order: number; content: Record<string, unknown> };
export type CmsPage = { path: string; kind: "coded" | "builder"; status: string; title: string; description: string | null; featuredImage: string | null; seo: SeoData; sections: CmsSection[]; updatedAt: string };
export type NavItem = { label: string; href?: string; description?: string; icon?: string; badge?: string; accent?: string; external?: boolean; children: NavItem[] };
export type CmsNavigation = { key: string; name: string; items: NavItem[] };
export type CmsSettings = {
  siteName?: string;
  logo?: string;
  footerLogo?: string;
  favicon?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  workingHours?: string;
  socials?: Record<string, string | undefined>;
  headerCta?: { label?: string; href?: string };
  topBar?: Record<string, string | undefined>;
  footer?: Record<string, string | undefined> & { stats?: { value?: string; label?: string }[] };
  clientLogos?: { name?: string; image?: string }[];
  defaultSeo?: { title?: string; titleTemplate?: string; description?: string; ogImage?: string };
  analytics?: { googleAnalyticsId?: string; googleTagManagerId?: string; metaPixelId?: string };
};

async function isPreview() {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false; // outside a request (e.g. build-time sitemap)
  }
}

async function get<T>(path: string, tags: string[]): Promise<T | null> {
  const preview = await isPreview();
  try {
    const res = await fetch(`${CMS_URL}${path}`, {
      headers: preview && process.env.REVALIDATE_SECRET ? { "x-preview-secret": process.env.REVALIDATE_SECRET } : undefined,
      signal: AbortSignal.timeout(TIMEOUT_MS),
      ...(preview ? { cache: "no-store" as const } : { next: { tags, revalidate: REVALIDATE_SECONDS } }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { success: boolean; data: T };
    return body.success ? body.data : null;
  } catch {
    return null;
  }
}

export const getCmsPage = (path: string) => get<CmsPage>(`/api/public/page?path=${encodeURIComponent(path)}`, [`page:${path}`, "pages"]);
export const getNavigation = (key: string) => get<CmsNavigation>(`/api/public/navigation/${key}`, [`nav:${key}`]);
export const getSettings = () => get<CmsSettings>("/api/public/settings", ["settings"]);
export const getSitemapEntries = () => get<{ path: string; lastModified: string }[]>("/api/public/sitemap", ["sitemap", "pages"]);

export function getCollection<T = Record<string, unknown>>(name: string, query: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(Object.entries(query).map(([k, v]) => [k, String(v)])).toString();
  return get<{ items: T[]; total?: number; page?: number; pages?: number }>(`/api/public/collections/${name}${qs ? `?${qs}` : ""}`, [`col:${name}`]);
}

export function getItem<T = Record<string, unknown>>(name: string, slug: string) {
  return get<T>(`/api/public/collections/${name}/${encodeURIComponent(slug)}`, [`col:${name}`, `col:${name}:${slug}`]);
}

/** Absolute URL for an image path coming from the CMS (CMS uploads are absolute already). */
export function absoluteUrl(path?: string | null) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  const site = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${site}${path.startsWith("/") ? "" : "/"}${path}`;
}
