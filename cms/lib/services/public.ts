import "server-only";
import { connectDB } from "@/lib/mongodb";
import { Blog, BlogCategory, Career, Navigation, Page, Portfolio, Service, TeamMember, Testimonial, WebsiteSettings } from "@/models";
import { safeEqual } from "@/lib/security";
import { env } from "@/lib/env";
import { escapeRegex } from "@/lib/api";

/** Only the website's own server (holding REVALIDATE_SECRET) may ask for draft content. */
export function isPreviewRequest(req: Request) {
  const s = req.headers.get("x-preview-secret");
  return !!s && safeEqual(s, env.revalidateSecret);
}

const blogLive = () => ({ $or: [{ status: "published" }, { status: "scheduled", publishedAt: { $lte: new Date() } }] });

export async function publicNavigation(key: string) {
  await connectDB();
  const nav = await Navigation.findOne({ key }).lean();
  if (!nav) return null;
  type Item = { label: string; href?: string; visible?: boolean; children?: Item[]; [k: string]: unknown };
  const strip = (items: Item[]): Item[] =>
    items.filter((i) => i.visible !== false).map(({ _id: _x, visible: _v, children, ...rest }) => ({ ...rest, children: strip(children ?? []) }));
  return { key: nav.key, name: nav.name, items: strip(nav.items as unknown as Item[]) };
}

export async function publicSettings() {
  await connectDB();
  const s = await WebsiteSettings.findOne({ key: "global" }).lean();
  if (!s) return null;
  // Internal-only fields never leave the CMS.
  const { notificationEmails: _n, _id, __v, ...rest } = s as Record<string, unknown>;
  void _id; void __v;
  return rest;
}

type CollectionName = "blogs" | "services" | "testimonials" | "portfolio" | "careers" | "team" | "blog-categories";

export async function publicCollection(name: CollectionName, url: URL) {
  await connectDB();
  const limit = Math.min(100, Math.max(1, Number(url.searchParams.get("limit")) || 20));
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const skip = (page - 1) * limit;
  const q = (url.searchParams.get("q") || "").trim().slice(0, 80);
  switch (name) {
    case "blogs": {
      const filter: Record<string, unknown> = blogLive();
      const cat = url.searchParams.get("category");
      if (cat && /^[a-z0-9-]{1,80}$/.test(cat)) {
        const c = await BlogCategory.findOne({ slug: cat }, "_id").lean();
        filter.categories = c?._id ?? null;
      }
      const tag = url.searchParams.get("tag");
      if (tag && /^[a-z0-9 -]{1,60}$/.test(tag)) filter.tags = tag;
      if (q) filter.title = { $regex: escapeRegex(q), $options: "i" };
      if (url.searchParams.get("featured") === "1") filter.featured = true;
      const [items, total] = await Promise.all([
        Blog.find(filter, "-content").sort({ publishedAt: -1 }).skip(skip).limit(limit).populate("categories", "name slug").lean(),
        Blog.countDocuments(filter),
      ]);
      return { items, total, page, pages: Math.max(1, Math.ceil(total / limit)) };
    }
    case "services":
      return { items: await Service.find({ status: "published" }, "-description").sort({ order: 1 }).lean() };
    case "testimonials": {
      const filter: Record<string, unknown> = { status: "published" };
      if (url.searchParams.get("featured") === "1") filter.featured = true;
      return { items: await Testimonial.find(filter).sort({ order: 1, createdAt: -1 }).limit(limit).lean() };
    }
    case "portfolio": {
      const filter: Record<string, unknown> = { status: "published" };
      const cat = url.searchParams.get("category");
      if (cat && /^[A-Za-z0-9 &-]{1,80}$/.test(cat)) filter.category = cat;
      return { items: await Portfolio.find(filter, "-description -challenge -solution -results").sort({ order: 1 }).limit(limit).lean() };
    }
    case "careers":
      return { items: await Career.find({ status: "open", $or: [{ deadline: null }, { deadline: { $exists: false } }, { deadline: { $gte: new Date() } }] }).sort({ order: 1, createdAt: -1 }).lean() };
    case "team":
      return { items: await TeamMember.find({ status: "published" }).sort({ order: 1 }).lean() };
    case "blog-categories":
      return { items: await BlogCategory.find().sort({ order: 1, name: 1 }).lean() };
  }
}

export async function publicItem(name: "blogs" | "services" | "portfolio" | "careers", slug: string, preview: boolean) {
  await connectDB();
  switch (name) {
    case "blogs": {
      const filter = preview ? { slug } : { slug, ...blogLive() };
      const post = await Blog.findOne(filter).populate("categories", "name slug").lean();
      if (!post) return null;
      const related = post.relatedBlogs?.length
        ? await Blog.find({ _id: { $in: post.relatedBlogs }, ...blogLive() }, "title slug excerpt featuredImage publishedAt readingTime").lean()
        : await Blog.find({ _id: { $ne: post._id }, categories: { $in: post.categories?.map((c: unknown) => (c as { _id: unknown })._id) ?? [] }, ...blogLive() }, "title slug excerpt featuredImage publishedAt readingTime").sort({ publishedAt: -1 }).limit(3).lean();
      return { ...post, related };
    }
    case "services":
      return Service.findOne(preview ? { slug } : { slug, status: "published" }).populate("relatedServices", "name slug pagePath shortDescription icon").lean();
    case "portfolio":
      return Portfolio.findOne(preview ? { slug } : { slug, status: "published" }).lean();
    case "careers":
      return Career.findOne(preview ? { slug } : { slug, status: "open" }).lean();
  }
}

/** Every public URL the CMS knows about, for sitemap.xml. */
export async function sitemapEntries() {
  await connectDB();
  const [pages, blogs, portfolio] = await Promise.all([
    Page.find({ status: "published", "seo.robotsIndex": { $ne: false } }, "path updatedAt").lean(),
    Blog.find(blogLive(), "slug updatedAt seo.robotsIndex").lean(),
    Portfolio.find({ status: "published", "seo.robotsIndex": { $ne: false } }, "slug updatedAt").lean(),
  ]);
  return [
    ...pages.map((p) => ({ path: p.path, lastModified: p.updatedAt })),
    ...blogs.filter((b) => b.seo?.robotsIndex !== false).map((b) => ({ path: `/blog/${b.slug}`, lastModified: b.updatedAt })),
    ...portfolio.map((p) => ({ path: `/portfolio/${p.slug}`, lastModified: p.updatedAt })),
  ];
}

export async function publicPageExists(path: string) {
  await connectDB();
  return Page.exists({ path, status: "published" });
}
