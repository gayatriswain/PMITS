"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, Eye, Mic, Search, TrendingUp, Users } from "lucide-react";
import { AI, BrandIcon, ClientWordmarks, CtaButton, Pill, Spark, display, ease, type Brand, Inner, Panel } from "../shared/AiSeoShared";

const CHANNELS: { brand: Brand; label: string }[] = [
  { brand: "google", label: "Google Search" },
  { brand: "gemini", label: "AI Overviews" },
  { brand: "chatgpt", label: "ChatGPT" },
  { brand: "gemini", label: "Gemini" },
  { brand: "maps", label: "Google Maps" },
  { brand: "voice", label: "Voice Search" },
];

const NEEDS = [
  { Icon: Eye, label: "More Visibility" },
  { Icon: BarChart3, label: "More Traffic" },
  { Icon: Users, label: "More Customers" },
  { Icon: TrendingUp, label: "More Growth" },
];

const TABS: { brand: Brand; label: string }[] = [
  { brand: "aioverview", label: "AI Overview" },
  { brand: "google", label: "Google Search" },
  { brand: "chatgpt", label: "ChatGPT Answer" },
  { brand: "maps", label: "Google Maps" },
];

const QUERY = "Best Interior Designers in Dubai";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className="flex gap-0.5 text-amber-400">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L1.3 7.8l6.1-.7z" />
        </svg>
      ))}
    </span>
  );
}

/** Per-tab body of the results mock. */
function TabBody({ tab }: { tab: number }) {
  const lead =
    tab === 2
      ? "Based on reviews and portfolio, ProManage Interior Studio is one of the top-rated interior designers in Dubai."
      : tab === 3
        ? "ProManage Interior Studio · Interior designer · Open now · Business Bay, Dubai"
        : "ProManage Interior Studio is a leading interior design company in Dubai known for luxury, creativity and exceptional client experience.";
  const label = TABS[tab].label;
  return (
    <div className="divide-y divide-slate-100">
      <div className="flex gap-4 pb-4">
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded bg-teal-100/70 px-1.5 py-0.5 text-xs font-semibold text-[#0f766e]">{label}</span>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-700 sm:text-sm">
            <b className="font-semibold text-[#0b1b33]">{lead.split(" is ")[0]}</b>
            {lead.includes(" is ") ? ` is ${lead.split(" is ").slice(1).join(" is ")}` : ""}
          </p>
        </div>
        <div className="relative hidden aspect-[1.9] w-40 shrink-0 overflow-hidden rounded-xl sm:block">
          <Image src={AI.interior1} alt="" fill sizes="160px" className="scale-[1.04] object-cover" />
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-[#1a3fa8]">ProManage Interior Studio</p>
          <p className="text-xs text-green-700">https://promanage.com</p>
          <p className="mt-1 text-[13px] text-slate-600">Luxury Interior Designers in Dubai | ProManage</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
            4.9 <Stars /> (128)
          </p>
        </div>
        <div className="relative hidden aspect-[1.55] w-28 shrink-0 overflow-hidden rounded-xl sm:block">
          <Image src={AI.interior2} alt="" fill sizes="112px" className="scale-[1.05] object-cover" />
        </div>
      </div>
    </div>
  );
}

/** Vertical dashed spine joining the connector stubs of a side list (xl only). */
function Spine({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute bottom-[1.35rem] top-[1.35rem] hidden w-px border-l border-dashed border-teal-400/60 xl:block ${side === "left" ? "-right-8" : "-left-8"}`}
    />
  );
}

export default function AiSeoRankEverywhere() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [typed, setTyped] = useState(reduce ? QUERY.length : 0);

  // auto-rotate the tabs every few seconds (pauses after the visitor picks one)
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => setTab((v) => (v + 1) % TABS.length), 4200);
    return () => clearInterval(t);
  }, [auto, reduce]);

  // type the query once
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setTyped((n) => (n >= QUERY.length ? n : n + 1)), 55);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <Panel inner="!bg-[#fbfcfd]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(50%_100%_at_50%_0%,rgba(20,163,154,.08),transparent)]" />
      <Inner className="!max-w-[1314px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="text-center">
          <Pill>AI SEO Services</Pill>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className={`${display.className} mt-5 text-[clamp(44px,5vw,97px)] font-bold uppercase leading-[0.98] tracking-tight text-[#0b1b33]`}
          >
            Rank Everywhere.
            <br />
            <span className="bg-gradient-to-r from-[#0b4f4a] via-[#0f766e] to-[#0b4f4a] bg-clip-text text-transparent">Grow Faster.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg 2xl:max-w-[540px] 2xl:text-[19px]"
          >
            AI SEO strategies that get your business discovered across Google, AI Overviews, ChatGPT, Gemini, Maps and beyond.
          </motion.p>
        </div>

        {/* search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mx-auto mt-8 flex max-w-[740px] items-center gap-3 rounded-full border border-slate-100 bg-white px-5 py-3.5 shadow-[0_18px_40px_-22px_rgba(15,40,80,.35)] sm:px-7 2xl:py-[18px] 2xl:text-lg"
        >
          <Search className="h-5 w-5 shrink-0 text-slate-700" />
          <span className="min-w-0 flex-1 truncate text-sm text-slate-800 sm:text-base">
            {QUERY.slice(0, typed)}
            <span className="ai-anim ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-slate-700" style={{ animation: "aiBlink 1s step-end infinite" }} />
          </span>
          <Mic className="h-5 w-5 shrink-0 text-slate-700" />
        </motion.div>

        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] 2xl:mt-12 gap-6 lg:mt-10 xl:grid-cols-[200px_minmax(0,1fr)_210px] xl:gap-14 2xl:grid-cols-[210px_minmax(0,740px)_222px] 2xl:justify-between 2xl:gap-0">
          {/* where we show up */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="relative order-2 xl:order-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              We show up where
              <br className="hidden xl:block" /> your customers search
            </p>
            <div className="relative mt-4">
            <Spine side="left" />
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-1">
              {CHANNELS.map((c, i) => (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                  className="group relative flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-2.5 text-sm text-slate-700 2xl:py-3 2xl:text-[15px] shadow-[0_8px_20px_-16px_rgba(15,40,80,.4)] transition hover:border-teal-200 hover:shadow-[0_12px_24px_-14px_rgba(15,118,110,.4)]"
                >
                  <BrandIcon name={c.brand} className="h-5 w-5 shrink-0" />
                  {c.label}
                  <span className="absolute -right-8 top-1/2 hidden h-px w-8 border-t border-dashed border-teal-400/60 xl:block">
                    <span className="absolute -left-0.5 -top-[3px] h-1.5 w-1.5 rounded-full bg-teal-500" />
                  </span>
                </motion.li>
              ))}
            </ul>
            </div>
          </motion.div>

          {/* results mock */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease }}
            className="order-1 min-w-0 rounded-3xl border border-slate-100 bg-white p-3 shadow-[0_30px_60px_-34px_rgba(15,40,80,.45)] sm:p-4 xl:order-2"
          >
            <div className="flex gap-1 overflow-x-auto border-b border-slate-100 [scrollbar-width:none]">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => {
                    setTab(i);
                    setAuto(false);
                  }}
                  className={`relative flex shrink-0 items-center gap-2 px-3 py-3 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                    tab === i ? "text-[#0b1b33]" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <BrandIcon name={t.brand} className="h-4 w-4" />
                  {t.label}
                  {tab === i && <motion.span layoutId="ai-rank-tab" className="absolute inset-x-2 -bottom-px h-[2.5px] rounded-full bg-[#0f766e]" />}
                </button>
              ))}
            </div>
            <div className="relative mt-3 min-h-[230px] rounded-2xl border border-slate-50 bg-slate-50/40 p-4 sm:p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <TabBody tab={tab} />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* what you get */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="relative order-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              More of what
              <br className="hidden xl:block" /> your business needs
            </p>
            <div className="relative mt-4">
            <Spine side="right" />
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 xl:grid-cols-1">
              {NEEDS.map(({ Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                  className="relative flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3.5 py-3 text-sm text-slate-700 2xl:py-3.5 2xl:text-[15px] shadow-[0_8px_20px_-16px_rgba(15,40,80,.4)] transition hover:border-teal-200"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#0f766e]" strokeWidth={1.8} />
                  {label}
                  <span className="absolute -left-8 top-1/2 hidden h-px w-8 border-t border-dashed border-teal-400/60 xl:block">
                    <span className="absolute -right-0.5 -top-[3px] h-1.5 w-1.5 rounded-full bg-teal-500" />
                  </span>
                </motion.li>
              ))}
            </ul>
            </div>
            <div className="mt-2.5 flex items-end justify-between gap-2 rounded-xl border border-slate-100 bg-white p-3.5 shadow-[0_8px_20px_-16px_rgba(15,40,80,.4)]">
              <p className="text-[13px] leading-snug text-slate-700">
                Sustainable growth that compounds over time.
              </p>
              <Spark className="h-12 w-16 shrink-0" points="0,28 14,24 26,26 40,17 52,20 66,10 78,13 100,1" />
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton className="sm:min-w-[240px] 2xl:min-w-[310px] 2xl:py-4 2xl:text-[17px]">Get AI SEO Strategy</CtaButton>
          <CtaButton variant="ghost" href="#how-it-works" className="sm:min-w-[240px] 2xl:min-w-[280px] 2xl:py-4 2xl:text-[17px]">
            See How It Works
          </CtaButton>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6 text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500">Trusted by 100+ businesses growing through modern search</p>
          <ClientWordmarks className="mt-5" />
        </div>
      </Inner>
    </Panel>
  );
}
