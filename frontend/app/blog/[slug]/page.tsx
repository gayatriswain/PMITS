import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { absoluteUrl, getItem, getSettings, type SeoData } from "@/lib/cms";
import { LdScripts } from "@/components/cms/JsonLd";
import CtaSection from "../../components/shared/CtaSection";
import { GlobalSlot } from "@/components/cms/CmsSections";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const OPTIMIZED_HOSTS = ["images.unsplash.com", "res.cloudinary.com"];

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  author?: string;
  authorImage?: string;
  readingTime?: number;
  tags?: string[];
  categories?: { name: string; slug: string }[];
  publishedAt?: string;
  updatedAt?: string;
  schemaType?: string;
  seo?: SeoData;
  related?: { _id: string; title: string; slug: string; excerpt?: string; featuredImage?: string; publishedAt?: string; readingTime?: number }[];
};

type Props = { params: Promise<{ slug: string }> };

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function load(slug: string) {
  if (!SLUG.test(slug)) return null;
  return getItem<Post>("blogs", slug);
}

/** CMS uploads and known CDNs go through next/image; any other host is shown as-is. */
function img(src?: string) {
  const url = absoluteUrl(src);
  if (!url) return null;
  let optimize = false;
  try {
    const u = new URL(url);
    const cms = process.env.CMS_URL ? new URL(process.env.CMS_URL).host : "localhost:4000";
    optimize = OPTIMIZED_HOSTS.includes(u.hostname) || u.host === cms || url.startsWith(SITE);
  } catch {
    return null;
  }
  return { url, unoptimized: !optimize };
}

const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([load(slug), getSettings()]);
  if (!post) return { title: "Article not found", robots: { index: false } };
  const seo = post.seo ?? {};
  const title = seo.title || post.title;
  const description = seo.description || post.excerpt || settings?.defaultSeo?.description;
  const canonical = seo.canonical ? (seo.canonical.startsWith("/") ? `${SITE}${seo.canonical}` : seo.canonical) : `${SITE}/blog/${post.slug}`;
  const ogImage = absoluteUrl(seo.ogImage || post.featuredImage || settings?.defaultSeo?.ogImage);
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: seo.robotsIndex !== false, follow: seo.robotsFollow !== false },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: settings?.siteName || "ProManage IT Solution",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: { card: seo.twitterCard || "summary_large_image", title: seo.ogTitle || title, description: seo.ogDescription || description, ...(ogImage ? { images: [ogImage] } : {}) },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([load(slug), getSettings()]);
  if (!post) notFound();

  const hero = img(post.featuredImage);
  const url = `${SITE}/blog/${post.slug}`;
  const ld: object[] = [
    {
      "@context": "https://schema.org",
      "@type": post.schemaType || "BlogPosting",
      headline: post.title,
      description: post.seo?.description || post.excerpt,
      ...(hero ? { image: [hero.url] } : {}),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
      publisher: { "@type": "Organization", name: settings?.siteName || "ProManage IT Solution", ...(settings?.logo ? { logo: { "@type": "ImageObject", url: absoluteUrl(settings.logo) } } : {}) },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.seo?.jsonLd) {
    try {
      ld.push(JSON.parse(post.seo.jsonLd));
    } catch {
      /* invalid custom JSON-LD is ignored */
    }
  }

  return (
    <main className="min-h-screen bg-[#fafdfc] font-sans">
      <LdScripts data={ld} />

      <section className="relative overflow-hidden pb-10 pt-10 lg:pt-14">
        <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#99f6e4]/20 blur-[100px]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-slate-500">
            <Link href="/" className="hover:text-[#0f766e]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0f766e]">Blog</Link>
          </nav>

          {post.categories?.length ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.categories.map((c) => (
                <span key={c.slug} className="rounded-full border border-[#0f766e]/20 bg-[#f0fdfa] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
                  {c.name}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="text-h1 font-playfair mt-4 font-bold text-[#0f2333]">{post.title}</h1>
          {post.excerpt && <p className="text-body mt-4 text-slate-600">{post.excerpt}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500">
            {post.author && (
              <span className="flex items-center gap-2 font-semibold text-[#0f2333]">
                {img(post.authorImage) && (
                  <Image src={img(post.authorImage)!.url} unoptimized={img(post.authorImage)!.unoptimized} alt="" width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                )}
                {post.author}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0d9488]" />
                <time dateTime={post.publishedAt}>{fmt(post.publishedAt)}</time>
              </span>
            )}
            {post.readingTime ? (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0d9488]" />
                {post.readingTime} min read
              </span>
            ) : null}
          </div>
        </div>

        {hero && (
          <div className="relative mx-auto mt-10 max-w-5xl px-6">
            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-slate-100 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
              <Image src={hero.url} unoptimized={hero.unoptimized} alt={post.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </section>

      <article className="mx-auto max-w-3xl px-6 pb-16">
        {/* Article HTML is sanitized by the CMS when it is saved (allow-listed tags, attributes and URL schemes). */}
        {post.content ? <div className="cms-prose" dangerouslySetInnerHTML={{ __html: post.content }} /> : null}

        {post.tags?.length ? (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-6">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-slate-100 px-3 py-1 text-[12px] text-slate-600">#{t}</span>
            ))}
          </div>
        ) : null}

        <Link href="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] hover:text-[#0b3b35]">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>
      </article>

      {post.related?.length ? (
        <section className="border-t border-slate-100 bg-white py-14">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-h5 font-playfair font-bold text-[#0f2333]">Related articles</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {post.related.map((r) => {
                const ri = img(r.featuredImage);
                return (
                  <Link key={r._id} href={`/blog/${r.slug}`} className="group overflow-hidden rounded-2xl border border-slate-100 bg-[#fafdfc] transition-shadow hover:shadow-lg">
                    <div className="relative aspect-[16/10] bg-slate-100">
                      {ri && <Image src={ri.url} unoptimized={ri.unoptimized} alt="" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold leading-snug text-[#0f2333] group-hover:text-[#0f766e]">{r.title}</h3>
                      <p className="text-caption mt-2 text-slate-500">
                        {fmt(r.publishedAt)}
                        {r.readingTime ? ` · ${r.readingTime} min read` : ""}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <GlobalSlot><CtaSection /></GlobalSlot>
    </main>
  );
}
