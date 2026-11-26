import "server-only";
import type { Metadata } from "next";
import { absoluteUrl, getCmsPage, getSettings, type SeoData } from "./cms";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/**
 * Page metadata = CMS SEO fields (when the page is published in the CMS) layered over the
 * page's own static metadata. Empty CMS fields never wipe the existing values.
 */
export async function cmsMetadata(path: string, fallback: Metadata = {}): Promise<Metadata> {
  const [page, settings] = await Promise.all([getCmsPage(path), getSettings()]);
  const seo: SeoData = page?.seo ?? {};
  const fbTitle = typeof fallback.title === "string" ? fallback.title : undefined;
  const title = seo.title || fbTitle || settings?.defaultSeo?.title || page?.title;
  const description = seo.description || (fallback.description as string | undefined) || settings?.defaultSeo?.description || page?.description || undefined;
  const ogImage = absoluteUrl(seo.ogImage || page?.featuredImage || settings?.defaultSeo?.ogImage);
  const canonical = seo.canonical ? (seo.canonical.startsWith("/") ? `${SITE}${seo.canonical}` : seo.canonical) : `${SITE}${path === "/" ? "" : path}`;
  const index = seo.robotsIndex !== false;
  const follow = seo.robotsFollow !== false;

  return {
    ...fallback,
    title,
    description,
    alternates: { ...(fallback.alternates ?? {}), canonical },
    robots: { index, follow },
    openGraph: {
      ...(fallback.openGraph ?? {}),
      type: "website",
      url: canonical,
      siteName: settings?.siteName || "ProManage IT Solution",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: seo.twitterCard || "summary_large_image",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/** Structured data for a page: custom JSON-LD from the CMS + optional FAQPage built from its FAQ section. */
export async function pageJsonLd(path: string): Promise<object[]> {
  const page = await getCmsPage(path);
  if (!page) return [];
  const out: object[] = [];
  if (page.seo?.jsonLd) {
    try {
      out.push(JSON.parse(page.seo.jsonLd));
    } catch {
      /* ignore invalid JSON */
    }
  }
  if (page.seo?.faqSchema) {
    const faq = page.sections.find((s) => s.enabled && /Faq|FAQ/.test(s.component));
    const items = (faq?.content?.items as { question?: string; answer?: string }[] | undefined) ?? [];
    if (items.length) {
      out.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.filter((i) => i.question && i.answer).map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
      });
    }
  }
  return out;
}
