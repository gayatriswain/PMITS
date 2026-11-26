import type { BlogCard } from "@/app/components/blog/BlogGrid";
import "server-only";
import { absoluteUrl, getCollection } from "./cms";
import { categorySlug } from "./blog-slug";

export { categorySlug, categoryHref } from "./blog-slug";

/** Category names the grid shows out of the box (kept in sync with BlogGrid's CATEGORIES). */
export const DEFAULT_BLOG_CATEGORIES = ["SEO", "AI & GEO", "Ecommerce", "Local SEO", "Web & UX", "Digital Growth"];

type PublicPost = {
  _id: string;
  slug: string;
  title: string;
  featuredImage?: string;
  publishedAt?: string;
  readingTime?: number;
  author?: string;
  authorImage?: string;
  categories?: { name: string; slug?: string }[];
};

/** Published posts from the CMS, shaped for the grid. Empty → the grid keeps its built-in cards. */
export async function cmsPosts(): Promise<BlogCard[]> {
  const res = await getCollection<PublicPost>("blogs", { limit: 100 });
  return (res?.items ?? []).map((p) => ({
    id: p._id,
    href: `/blog/${p.slug}`,
    category: p.categories?.[0]?.name ?? "Insights",
    image: absoluteUrl(p.featuredImage) ?? "/blog-vector.svg",
    date: p.publishedAt ?? new Date().toISOString(),
    readTime: `${p.readingTime || 1} min read`,
    title: p.title,
    author: { name: p.author || "ProManage Team", role: "ProManage", avatar: absoluteUrl(p.authorImage) ?? "" },
  }));
}

/** Resolve a category slug to its display name (CMS categories, post categories, then the defaults). */
export async function findCategory(slug: string, posts: BlogCard[]): Promise<string | null> {
  const cms = await getCollection<{ name: string; slug?: string }>("blog-categories");
  const names = [...(cms?.items ?? []).map((c) => c.name), ...posts.map((p) => p.category), ...DEFAULT_BLOG_CATEGORIES];
  return names.find((n) => n && categorySlug(n) === slug) ?? null;
}
