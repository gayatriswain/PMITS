import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { absoluteUrl, getItem, type SeoData } from "@/lib/cms";
import { cmsImage } from "@/lib/images";
import { LdScripts } from "@/components/cms/JsonLd";
import CtaSection from "../../components/shared/CtaSection";
import { GlobalSlot } from "@/components/cms/CmsSections";

/** Portfolio case study from the CMS Portfolio module. */
type Project = {
  _id: string;
  slug: string;
  name: string;
  client?: string;
  category?: string;
  description?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  featuredImage?: string;
  gallery?: string[];
  projectUrl?: string;
  seo?: SeoData;
};
type Props = { params: Promise<{ slug: string }> };

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const load = (slug: string) => (SLUG.test(slug) ? getItem<Project>("portfolio", slug) : Promise.resolve(null));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await load((await params).slug);
  if (!p) return { title: "Project not found", robots: { index: false } };
  const seo = p.seo ?? {};
  const title = seo.title || `${p.name} | Portfolio | ProManage`;
  const description = seo.description || [p.client, p.category].filter(Boolean).join(" · ") || undefined;
  const canonical = seo.canonical ? (seo.canonical.startsWith("/") ? `${SITE}${seo.canonical}` : seo.canonical) : `${SITE}/portfolio/${p.slug}`;
  const og = absoluteUrl(seo.ogImage || p.featuredImage);
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: seo.robotsIndex !== false, follow: seo.robotsFollow !== false },
    openGraph: { type: "website", url: canonical, title: seo.ogTitle || title, description: seo.ogDescription || description, ...(og ? { images: [{ url: og }] } : {}) },
  };
}

function Block({ title, text }: { title: string; text?: string }) {
  if (!text?.trim()) return null;
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6">
      <h2 className="text-sm font-bold uppercase tracking-wider text-[#0d9488]">{title}</h2>
      <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">{text}</p>
    </div>
  );
}

export default async function PortfolioItemPage({ params }: Props) {
  const p = await load((await params).slug);
  if (!p) notFound();
  const hero = cmsImage(p.featuredImage);
  const live = p.projectUrl && /^https?:\/\//.test(p.projectUrl) ? p.projectUrl : null;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: p.name,
      ...(p.client ? { sourceOrganization: { "@type": "Organization", name: p.client } } : {}),
      ...(hero ? { image: absoluteUrl(p.featuredImage) } : {}),
      url: `${SITE}/portfolio/${p.slug}`,
      ...(p.technologies?.length ? { keywords: p.technologies.join(", ") } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: `${SITE}/portfolio` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${SITE}/portfolio/${p.slug}` },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[#fafdfc] font-sans">
      <LdScripts data={ld} />
      <section className="relative overflow-hidden pb-10 pt-10 lg:pt-14">
        <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#99f6e4]/20 blur-[100px]" />
        <div className="relative mx-auto max-w-5xl px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] text-slate-500">
            <Link href="/" className="hover:text-[#0f766e]">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-[#0f766e]">Portfolio</Link>
          </nav>
          {p.category && <span className="mt-6 inline-block rounded-full border border-[#0f766e]/20 bg-[#f0fdfa] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">{p.category}</span>}
          <h1 className="text-h1 font-playfair mt-4 font-bold text-[#0f2333]">{p.name}</h1>
          {p.client && p.client !== p.name && <p className="text-body mt-3 text-slate-600">{p.client}</p>}
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d9488] to-[#0b3b35] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              Visit live site <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {hero && (
          <div className="relative mx-auto mt-10 max-w-6xl px-6">
            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl bg-slate-100 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
              <Image src={hero.src} unoptimized={hero.unoptimized} alt={p.name} fill priority sizes="(min-width: 1024px) 1100px, 100vw" className="object-cover" />
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        {/* Description HTML is sanitized by the CMS when saved. */}
        {p.description && <div className="cms-prose max-w-3xl" dangerouslySetInnerHTML={{ __html: p.description }} />}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Block title="The challenge" text={p.challenge} />
          <Block title="Our solution" text={p.solution} />
          <Block title="Results" text={p.results} />
        </div>
        {p.technologies?.length ? (
          <div className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Technologies</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <span key={t} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 ring-1 ring-slate-200">{t}</span>
              ))}
            </div>
          </div>
        ) : null}
        {p.gallery?.length ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {p.gallery.map((g, i) => {
              const im = cmsImage(g);
              return im ? (
                <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                  <Image src={im.src} unoptimized={im.unoptimized} alt={`${p.name} screenshot ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              ) : null;
            })}
          </div>
        ) : null}
        <Link href="/portfolio" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-[#0f766e] hover:text-[#0b3b35]">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>
      </section>
      <GlobalSlot><CtaSection /></GlobalSlot>
    </main>
  );
}
