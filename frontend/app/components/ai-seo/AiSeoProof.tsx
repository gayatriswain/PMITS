"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Globe2, MapPin, ShieldAlert } from "lucide-react";
import { AI, FADE, BrandIcon, CtaButton, Hl, Pill, ease, heading, type Brand, Inner, Panel } from "../shared/AiSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

type Project = {
  name: string;
  brand: string;
  category: string;
  kind: string;
  location: string;
  domain: string;
  challenge: string;
  thumb: string;
};

const PROJECTS__cms: Project[] = [
  { name: "Luxury Interior Studio", brand: "Luxe Interiors", category: "Interior Design", kind: "interior design studio", location: "Dubai, UAE", domain: "luxeinteriors.ae", challenge: "Low visibility in search results and no presence in AI-driven platforms.", thumb: AI.thumbs[0] },
  { name: "Dental Care Clinic", brand: "BrightSmile Dental", category: "Healthcare", kind: "dental clinic", location: "Abu Dhabi, UAE", domain: "brightsmile.ae", challenge: "Patients couldn't find the clinic for local 'near me' and AI assistant searches.", thumb: AI.thumbs[1] },
  { name: "Lexiora Law Firm", brand: "Lexiora Law", category: "Legal Services", kind: "law firm", location: "Dubai, UAE", domain: "lexioralaw.com", challenge: "Strong expertise but almost no authority signals that AI engines trust.", thumb: AI.thumbs[2] },
  { name: "FurniCraft", brand: "FurniCraft", category: "Furniture Brand", kind: "furniture brand", location: "Sharjah, UAE", domain: "furnicraft.ae", challenge: "Product pages weren't structured for shopping results or AI recommendations.", thumb: AI.thumbs[3] },
  { name: "UrbanTrail", brand: "UrbanTrail", category: "E-commerce", kind: "online store", location: "Noida, India", domain: "urbantrail.in", challenge: "High ad spend with little organic traffic and zero AI answer citations.", thumb: AI.thumbs[4] },
];

const SOLUTION__cms = ["AI SEO Strategy", "Entity & Topical Authority", "GEO & Local SEO", "Content Strategy & Optimization", "Technical SEO & Performance"];

const VISIBLE__cms: { brand: Brand; label: string }[] = [
  { brand: "google", label: "Google Search" },
  { brand: "aioverview", label: "AI Overview" },
  { brand: "chatgpt", label: "ChatGPT" },
  { brand: "gemini", label: "Gemini" },
  { brand: "maps", label: "Google Maps" },
];

const mini = "rounded-2xl border border-slate-100 bg-white p-3 text-[11px] shadow-[0_16px_34px_-26px_rgba(15,40,80,.55)]";

function MiniHead({ brand, title, beta = false }: { brand: Brand; title: string; beta?: boolean }) {
  const $t = useCmsText();
  return (
    <p className="text-caption flex items-center gap-2 font-bold text-[#0b1b33]">
      <BrandIcon name={brand} className="h-4 w-4" />
      {title}
      {beta && <span className="ml-auto rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-600">{$t("AiSeoProof__t1", "Beta")}</span>}
    </p>
  );
}

function Bubble({ children, me = false }: { children: React.ReactNode; me?: boolean }) {
  return <p className={`mt-2 rounded-xl px-2.5 py-1.5 leading-snug ${me ? "ml-6 bg-slate-100 text-slate-600" : "bg-slate-50 text-slate-600"}`}>{children}</p>;
}

/** The result cards around the devices — rebuilt for whichever project is active. */
function buildCards(p: Project) {
  const what = p.kind;
  return {
    overview: (
      <div className={mini}>
        <MiniHead brand="google" title="AI Overview (Google SGE)" />
        <div className="mt-2 rounded-xl border border-slate-100 p-2.5">
          <p className="flex items-center gap-1.5 font-semibold text-[#0b1b33]">
            <BrandIcon name="aioverview" className="h-3 w-3" /> AI Overview
          </p>
          <p className="mt-1.5 leading-snug text-slate-600">
            {p.brand} is a premium {what} in {p.location} offering trusted, high-quality services.
          </p>
          <p className="mt-1.5 text-[10px] text-slate-500">{p.domain}</p>
        </div>
      </div>
    ),
    chatgpt: (
      <div className={mini}>
        <MiniHead brand="chatgpt" title="ChatGPT Recommendation" />
        <Bubble me>Recommend the best {what} in {p.location.split(",")[0]}.</Bubble>
        <Bubble>
          <b className="text-[#0b1b33]">{p.brand}</b> is one of the top-rated choices, known for quality, trust and great reviews.
        </Bubble>
        <p className="mt-1.5 text-[9.5px] uppercase tracking-wide text-slate-400">Sources · {p.domain}</p>
      </div>
    ),
    gemini: (
      <div className={mini}>
        <MiniHead brand="gemini" title="Gemini Response" />
        <Bubble me>Suggest a good {what}.</Bubble>
        <Bubble>{p.brand} is a highly rated option offering elegant, reliable solutions.</Bubble>
      </div>
    ),
    search: (
      <div className={mini}>
        <MiniHead brand="google" title="Google Search Result" />
        <p className="mt-2 truncate rounded-full border border-slate-100 px-2.5 py-1 text-[10px] text-slate-500">best {what} in {p.location.split(",")[0].toLowerCase()}</p>
        <p className="mt-2 font-semibold leading-snug text-[#1a3fa8]">
          {p.brand} – {p.category} in {p.location.split(",")[0]}
        </p>
        <p className="text-[10px] text-green-700">https://{p.domain}</p>
        <p className="mt-1 text-[10px] text-amber-500">★★★★★ <span className="text-slate-500">4.9 (128)</span></p>
      </div>
    ),
    profile: (
      <div className={mini}>
        <MiniHead brand="google" title="Google Business Profile" />
        <p className="mt-2 font-bold text-[#0b1b33]">{p.brand}</p>
        <p className="text-[10px] text-amber-500">
          4.9 ★★★★★ <span className="text-slate-500">(128)</span>
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1">
          <div className="relative aspect-[1.6] overflow-hidden rounded-md">
            <Image src={p.thumb} alt="" fill sizes="80px" className="scale-110 object-cover" />
          </div>
          <div className="relative aspect-[1.6] overflow-hidden rounded-md">
            <Image src={AI.interior2} alt="" fill sizes="80px" className="scale-110 object-cover" />
          </div>
        </div>
        <p className="mt-1.5 text-[10px]">
          <span className="font-semibold text-green-600">Open</span> <span className="text-slate-500">· Closes 7 PM</span>
        </p>
      </div>
    ),
    mode: (
      <div className={mini}>
        <MiniHead brand="google" title="AI Mode (Google)" beta />
        <Bubble me>Who is the best {what} near me?</Bubble>
        <Bubble>{p.brand} is a top-rated {what} in {p.location.split(",")[0]}.</Bubble>
      </div>
    ),
  };
}

export default function AiSeoProof() {
  const $t = useCmsText();
  const PROJECTS = useCmsData("AiSeoProof__PROJECTS", PROJECTS__cms);
  const SOLUTION = useCmsData("AiSeoProof__SOLUTION", SOLUTION__cms);
  const VISIBLE = useCmsData("AiSeoProof__VISIBLE", VISIBLE__cms);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const p = PROJECTS[active];
  const c = buildCards(p);

  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % PROJECTS.length), 6000);
    return () => clearInterval(t);
  }, [auto, reduce]);

  const go = (i: number) => {
    setActive((i + PROJECTS.length) % PROJECTS.length);
    setAuto(false);
  };

  const swap = (k: string, node: React.ReactNode, delay = 0) => (
    <AnimatePresence mode="wait">
      <motion.div key={`${k}-${active}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, delay, ease }}>
        {node}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <Panel>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(#d6dee8_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(60%_50%_at_20%_60%,#000,transparent)]" />
      <Inner className="!max-w-[1340px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="text-center">
          <Pill>{$t("AiSeoProof__t2", "Real Businesses. Real AI Visibility.")}</Pill>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className={`text-h2 ${heading.className} mt-5 font-bold tracking-[-0.025em] text-[#0b1b33]`}
          >
            {$t("AiSeoProof__t3", "Proof, Not ")}<Hl>{$t("AiSeoProof__t4", "Promises.")}</Hl>
          </motion.h2>
          <p className="text-body mx-auto mt-4 max-w-lg text-slate-600">
            {rich($t("AiSeoProof__t5", "See how we help businesses show up and get recommended across Google, AI Overviews, ChatGPT, Gemini and beyond."))}</p>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_290px] xl:gap-8">
          {/* showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease }}
            className="relative min-w-0"
          >
            <div className="grid gap-4 md:grid-cols-[120px_1fr_210px] md:items-center lg:grid-cols-[140px_1fr_220px]">
              {/* phone */}
              <div className="relative hidden md:block">
                <p className="mb-1 text-center text-[11px] font-semibold text-[#0b1b33]">{rich($t("AiSeoProof__t6", "Mobile Website"))}</p>
                <div className="relative aspect-[0.8]">
                  <Image src={AI.casePhone} alt={$t("AiSeoProof__t7", "Client mobile website")} fill sizes="140px" className="ai-float object-contain mix-blend-multiply" style={FADE} />
                </div>
              </div>
              {/* laptop */}
              <div className="relative">
                <div className="relative aspect-[1.59]">
                  <Image src={AI.caseLaptop} alt={$t("AiSeoProof__t8", "Client website on a laptop")} fill sizes="(min-width:1280px) 480px, 90vw" className="object-contain mix-blend-multiply" style={FADE} />
                </div>
                <span className="absolute -right-4 top-1/3 hidden h-px w-6 border-t border-dashed border-teal-400 md:block" />
              </div>
              {/* right stack */}
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                {swap("ov", c.overview)}
                {swap("gpt", c.chatgpt, 0.05)}
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {swap("se", c.search, 0.05)}
              {swap("gbp", c.profile, 0.1)}
              {swap("mode", c.mode, 0.15)}
              {swap("gem", c.gemini, 0.2)}
            </div>
          </motion.div>

          {/* details */}
          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="xl:border-l xl:border-slate-200 xl:pl-8"
          >
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f766e]">{rich($t("AiSeoProof__t9", "Featured Project"))}</p>
                <h3 className={`text-h5 ${heading.className} mt-2 font-bold text-[#0b1b33]`}>{p.name}</h3>
                <p className="text-caption mt-2 flex items-center gap-2 text-slate-500">
                  <MapPin className="h-3.5 w-3.5" /> {p.location} <span className="text-slate-300">|</span> {p.category}
                </p>
                <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#0b1b33]">
                  <ShieldAlert className="h-4 w-4" /> {rich($t("AiSeoProof__t10", "The Challenge"))}</p>
                <p className="text-small mt-1.5 pl-6 text-slate-500">{p.challenge}</p>
              </motion.div>
            </AnimatePresence>
            <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#0b1b33]">
              <CheckCircle2 className="h-4 w-4" /> {rich($t("AiSeoProof__t11", "Our AI SEO Solution"))}</p>
            <ul className="mt-2 space-y-1.5 pl-6">
              {SOLUTION.map((s) => (
                <li key={s} className="flex items-center gap-2 text-[13px] text-slate-600">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-[#0f766e]" aria-hidden>
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#0b1b33]">
              <Globe2 className="h-4 w-4" /> {rich($t("AiSeoProof__t12", "Now Visible On"))}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {VISIBLE.map((v, i) => (
                <motion.span
                  key={v.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 240, damping: 16 }}
                  className="flex w-12 flex-col items-center gap-1 text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white shadow-sm">
                    <BrandIcon name={v.brand} className="h-5 w-5" />
                  </span>
                  <span className="text-[9px] leading-tight text-slate-500">{v.label}</span>
                </motion.span>
              ))}
            </div>
            <CtaButton variant="primary" href={$t("AiSeoProof__t13", "#ai-seo-strategy")} className="mt-6 w-full !bg-none !bg-white !text-[#0f766e] !shadow-none ring-1 ring-[#0f766e]/60 hover:!bg-teal-50">
              {$t("AiSeoProof__t14", "View Full Case Study")}</CtaButton>
          </motion.aside>
        </div>

        {/* project carousel */}
        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous project"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0b1b33] shadow transition hover:bg-teal-50 sm:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {PROJECTS.map((pr, i) => (
              <button
                key={pr.name}
                type="button"
                onClick={() => go(i)}
                aria-pressed={active === i}
                className={`relative flex min-w-[220px] snap-start items-center gap-3 rounded-2xl border bg-white p-3 text-left transition duration-300 lg:min-w-0 ${
                  active === i ? "border-[#14a39a] shadow-[0_16px_34px_-20px_rgba(15,118,110,.55)]" : "border-slate-100 hover:-translate-y-0.5 hover:border-teal-100"
                }`}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                  <Image src={pr.thumb} alt="" fill sizes="56px" className="scale-110 object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-[#0f766e]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block truncate text-[13px] font-bold text-[#0b1b33]">{pr.name}</span>
                  <span className="block truncate text-[11px] text-slate-500">{pr.category}</span>
                </span>
                {active === i && auto && !reduce && (
                  <motion.span
                    key={`bar-${active}`}
                    className="absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full bg-[#14a39a]/60"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next project"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0b1b33] shadow transition hover:bg-teal-50 sm:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {PROJECTS.map((pr, i) => (
            <button
              key={pr.name}
              type="button"
              aria-label={`Show ${pr.name}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${active === i ? "w-6 bg-[#0f766e]" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mt-8 text-center"
        >
          <p className="text-body italic text-slate-600">
            <span className={`${heading.className} mr-2 align-[-0.2em] text-4xl font-black not-italic text-[#0f766e]`}>“</span>
            {rich($t("AiSeoProof__t15", "We didn't just improve rankings. "))}<span className="text-[#0f766e]">{$t("AiSeoProof__t16", "We became the answer AI recommends.")}</span>
          </p>
          <footer className="mt-2 text-sm text-slate-500">{$t("AiSeoProof__t17", "– Founder, Luxe Interiors")}</footer>
        </motion.blockquote>
      </Inner>
    </Panel>
  );
}
