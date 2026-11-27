import Image from "next/image";
import EditMark from "./EditMark";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { absoluteUrl, type CmsSection } from "@/lib/cms";
import FAQSection from "@/app/components/shared/FAQSection";

/**
 * Sections for pages created in the CMS page builder, styled like the rest of the site.
 * All content was cleaned by the CMS on save (declared fields only, sanitized rich text,
 * http(s)/relative links and image URLs).
 */

type Lnk = { label?: string; href?: string };
type C = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");
const list = <T,>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const lnk = (v: unknown): Lnk => (v && typeof v === "object" ? (v as Lnk) : {});

const TEAL = "#0d9488";
const DARK = "#0b3b35";
const NAVY = "#0f2333";
const OPTIMIZED = ["images.unsplash.com", "res.cloudinary.com"];

function Img({ src, alt, sizes, className, priority }: { src: string; alt: string; sizes: string; className?: string; priority?: boolean }) {
  const url = absoluteUrl(src);
  if (!url) return null;
  let unoptimized = true;
  try {
    const host = new URL(url).hostname;
    const cmsHost = process.env.CMS_URL ? new URL(process.env.CMS_URL).hostname : "localhost";
    unoptimized = !(OPTIMIZED.includes(host) || host === cmsHost || url.startsWith(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  } catch {
    return null;
  }
  return <Image src={url} alt={alt} fill sizes={sizes} priority={priority} unoptimized={unoptimized} className={className} />;
}

function Button({ link, variant = "primary" }: { link: Lnk; variant?: "primary" | "secondary" | "light" }) {
  if (!link.label || !link.href) return null;
  const external = /^https?:\/\//.test(link.href);
  const cls =
    variant === "primary"
      ? "text-white hover:opacity-90"
      : variant === "light"
        ? "bg-white text-[#0b3b35] hover:bg-slate-100"
        : "border border-slate-300 bg-white text-[#0f2333] hover:border-[#0d9488] hover:text-[#0d9488]";
  const style = variant === "primary" ? { backgroundImage: `linear-gradient(135deg, ${TEAL}, ${DARK})` } : undefined;
  const inner = (
    <>
      {link.label} <ArrowRight className="h-4 w-4" />
    </>
  );
  const className = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${cls}`;
  return external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {inner}
    </a>
  ) : (
    <Link href={link.href} className={className} style={style}>
      {inner}
    </Link>
  );
}

const Heading = ({ children }: { children: string }) =>
  children ? <h2 className="text-h2 font-playfair font-bold" style={{ color: NAVY }}>{children}</h2> : null;

function BuilderHero({ c, first }: { c: C; first: boolean }) {
  const image = str(c.image);
  const Title = first ? "h1" : "h2";
  return (
    <section className="relative overflow-hidden bg-[#fafdfc] py-16 lg:py-24">
      <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#99f6e4]/25 blur-[100px]" />
      <div className={`relative mx-auto grid max-w-7xl items-center gap-12 px-6 ${image ? "lg:grid-cols-2" : ""}`}>
        <div className={image ? "" : "mx-auto max-w-3xl text-center"}>
          {str(c.eyebrow) && (
            <span className="inline-block rounded-full border border-[#0d9488]/25 bg-[#f0fdfa] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest" style={{ color: TEAL }}>
              {str(c.eyebrow)}
            </span>
          )}
          <Title className="font-playfair mt-5 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.4rem]" style={{ color: NAVY }}>
            {str(c.title)}
          </Title>
          {str(c.subtitle) && <p className="text-body mt-5 text-slate-600">{str(c.subtitle)}</p>}
          <div className={`mt-8 flex flex-wrap gap-3 ${image ? "" : "justify-center"}`}>
            <Button link={lnk(c.primary)} />
            <Button link={lnk(c.secondary)} variant="secondary" />
          </div>
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
            <Img src={image} alt={str(c.title)} sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" priority={first} />
          </div>
        )}
      </div>
    </section>
  );
}

function BuilderRichText({ c }: { c: C }) {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Heading>{str(c.heading)}</Heading>
        {str(c.body) && <div className={`cms-prose ${str(c.heading) ? "mt-6" : ""}`} dangerouslySetInnerHTML={{ __html: str(c.body) }} />}
      </div>
    </section>
  );
}

function BuilderCards({ c }: { c: C }) {
  const cards = list<{ title?: string; text?: string; image?: string; link?: Lnk }>(c.cards);
  const cols = { "2": "sm:grid-cols-2", "3": "sm:grid-cols-2 lg:grid-cols-3", "4": "sm:grid-cols-2 lg:grid-cols-4" }[str(c.columns)] ?? "sm:grid-cols-2 lg:grid-cols-3";
  if (!cards.length && !str(c.heading)) return null;
  return (
    <section className="bg-[#fafdfc] py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Heading>{str(c.heading)}</Heading>
          {str(c.intro) && <p className="mt-4 text-slate-600">{str(c.intro)}</p>}
        </div>
        <div className={`mt-10 grid gap-6 ${cols}`}>
          {cards.map((card, i) => {
            const l = lnk(card.link);
            return (
              <div key={i} className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,118,110,0.08)]">
                {card.image && (
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Img src={card.image} alt={card.title ?? ""} sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {card.title && <h3 className="text-lg font-bold" style={{ color: NAVY }}>{card.title}</h3>}
                  {card.text && <p className="text-body mt-2 text-slate-600">{card.text}</p>}
                  {l.label && l.href && (
                    <Link href={l.href} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold" style={{ color: TEAL }}>
                      {l.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BuilderImageText({ c }: { c: C }) {
  const image = str(c.image);
  const left = str(c.imageSide) === "left";
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className={`mx-auto grid max-w-7xl items-center gap-12 px-6 ${image ? "lg:grid-cols-2" : ""}`}>
        <div className={left ? "lg:order-2" : ""}>
          <Heading>{str(c.heading)}</Heading>
          {str(c.body) && <div className="cms-prose mt-5" dangerouslySetInnerHTML={{ __html: str(c.body) }} />}
          <div className="mt-7">
            <Button link={lnk(c.button)} />
          </div>
        </div>
        {image && (
          <div className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 ${left ? "lg:order-1" : ""}`}>
            <Img src={image} alt={str(c.heading)} sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}

function BuilderStats({ c }: { c: C }) {
  const items = list<{ value?: string; label?: string }>(c.items);
  if (!items.length) return null;
  return (
    <section className="bg-[#fafdfc] py-14">
      <div className="mx-auto max-w-7xl px-6">
        {str(c.heading) && (
          <div className="mb-8 text-center">
            <Heading>{str(c.heading)}</Heading>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 rounded-3xl px-6 py-8 text-white lg:grid-cols-4" style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})` }}>
          {items.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-white/80">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuilderFaq({ c }: { c: C }) {
  const items = list<{ question?: string; answer?: string }>(c.items).filter((i) => i.question && i.answer);
  if (!items.length) return null;
  // same design as the FAQ on the coded pages
  return <FAQSection content={{ heading: str(c.heading) || undefined, intro: "", items }} />;
}

function BuilderCta({ c }: { c: C }) {
  return (
    <section className="bg-[#fafdfc] py-14">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-3xl px-8 py-12 text-center text-white" style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})` }}>
          <h2 className="text-h2 font-playfair font-bold">{str(c.title)}</h2>
          {str(c.text) && <p className="mx-auto mt-4 max-w-2xl text-white/85">{str(c.text)}</p>}
          <div className="mt-7 flex justify-center">
            <Button link={lnk(c.button)} variant="light" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Renders a builder page's enabled sections in CMS order. Unknown section types are skipped. */
export default function BuilderSections({ sections }: { sections: CmsSection[] }) {
  const visible = sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  return (
    <>
      {visible.map((s, i) => (
        <EditMark key={s.key} k={s.key}>
          {builderSection(s, i)}
        </EditMark>
      ))}
    </>
  );
}

function builderSection(s: CmsSection, i: number) {
        const c = s.content ?? {};
        switch (s.component) {
          case "BuilderHero":
            return <BuilderHero c={c} first={i === 0} />;
          case "BuilderRichText":
            return <BuilderRichText c={c} />;
          case "BuilderCards":
            return <BuilderCards c={c} />;
          case "BuilderImageText":
            return <BuilderImageText c={c} />;
          case "BuilderStats":
            return <BuilderStats c={c} />;
          case "BuilderFaq":
            return <BuilderFaq c={c} />;
          case "BuilderCta":
            return <BuilderCta c={c} />;
          default:
            return null;
        }
}
