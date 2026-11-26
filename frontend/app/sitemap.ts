import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/cms";
import { categorySlug, cmsPosts } from "@/lib/blog";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Published pages, blog posts and projects from the CMS (noindex pages are excluded there), plus blog category listings. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = (await getSitemapEntries()) ?? [];
  // one listing per category that has at least one published post
  const posts = await cmsPosts();
  const categories = posts
    .map((p) => ({ path: `/blog/category/${categorySlug(p.category)}`, lastModified: p.date }))
    .filter((c) => !c.path.endsWith("/category/"));
  // URLs that permanently redirect elsewhere (next.config.ts) must not be listed
  const seen = new Set<string>(["/hosting"]);
  return [...entries, ...categories]
    .filter((e) => !seen.has(e.path) && seen.add(e.path))
    .map((e) => ({
      url: `${SITE}${e.path === "/" ? "" : e.path}`,
      lastModified: e.lastModified ? new Date(e.lastModified) : undefined,
      changeFrequency: e.path === "/" ? "weekly" : "monthly",
      priority: e.path === "/" ? 1 : e.path.split("/").length > 2 ? 0.7 : 0.8,
    }));
}

export const revalidate = 3600;
