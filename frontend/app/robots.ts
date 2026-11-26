import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  // Non-production deployments should never be indexed.
  const indexable = process.env.ALLOW_INDEXING === "true";
  return indexable
    ? { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }], sitemap: `${SITE}/sitemap.xml`, host: SITE }
    : { rules: [{ userAgent: "*", disallow: "/" }] };
}
