/** Client-safe blog URL helpers (no server imports), used by BlogGrid, routes and the sitemap. */

/** URL-safe category slug: "AI & GEO" → "ai-geo", "Web & UX" → "web-ux". */
export function categorySlug(name: string) {
  return name.toLowerCase().replace(/&/g, " ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** URL of a blog category listing ("All" → /blog). */
export function categoryHref(name: string) {
  return name === "All" ? "/blog" : `/blog/category/${categorySlug(name)}`;
}
