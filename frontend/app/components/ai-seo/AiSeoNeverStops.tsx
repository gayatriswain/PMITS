"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpDown,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  ChevronDown,
  Code2,
  FileText,
  Link2,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import CountUp from "../shared/CountUp";
import { CtaButton, Hl, Pill, Spark, ease, heading, Inner, Panel } from "../shared/AiSeoShared";

const FEED = [
  { Icon: Search, title: "New keyword opportunity found", sub: "High-intent keyword with strong potential", t: "2m ago" },
  { Icon: Sparkles, title: "AI Overview opportunity detected", sub: "Your content is eligible for AI Overview", t: "Now" },
  { Icon: ArrowUpDown, title: "Competitor ranking changed", sub: "Tracking position shift in key results", t: "3m ago" },
  { Icon: Link2, title: "Internal link optimized", sub: "New internal link opportunity added", t: "Just now" },
  { Icon: Code2, title: "Schema improvement recommended", sub: "Structured data enhancement detected", t: "Live" },
  { Icon: Users, title: "Entity relationship improved", sub: "Stronger connections for your brand", t: "Running…" },
  { Icon: FileText, title: "Content gap discovered", sub: "New topic opportunity identified", t: "1m ago" },
];

const IMPACT = [
  { to: 18, suffix: " +", label: "Improvements Today", c: "#14a39a", bg: "from-teal-50", fg: "text-teal-600" },
  { to: 2438, suffix: "", label: "Keywords Monitored", c: "#2563eb", bg: "from-blue-50", fg: "text-blue-600" },
  { to: 24, suffix: "", label: "Content Optimized", c: "#8b5cf6", bg: "from-violet-50", fg: "text-violet-600" },
  { to: 186, suffix: "%", label: "AI Visibility (30 Days)", c: "#14a39a", bg: "from-emerald-50", fg: "text-teal-600", arrow: true },
];

const RESULTS = [
  { Icon: BarChart3, title: "More Visibility", sub: "Across Search & AI", c: "bg-teal-50 text-teal-600" },
  { Icon: Target, title: "Stronger Rankings", sub: "Sustainable Growth", c: "bg-blue-50 text-blue-600" },
  { Icon: Users, title: "More Qualified Traffic", sub: "Better Business Outcomes", c: "bg-violet-50 text-violet-600" },
  { Icon: ShieldCheck, title: "Future-Ready", sub: "Built for AI Search", c: "bg-teal-50 text-teal-600" },
  { Icon: Rocket, title: "Measurable Impact", sub: "Real Results, Always", c: "bg-violet-50 text-violet-600" },
];

const card = "rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-34px_rgba(15,40,80,.5)]";

/** Live feed: shows 7 rows, rotating a new one in at the top every couple of seconds. */
function LiveFeed() {
  const reduce = useReducedMotion();
  const [start, setStart] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setStart((s) => (s + FEED.length - 1) % FEED.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  const rows = FEED.map((_, i) => FEED[(start + i) % FEED.length]);
  return (
    <div className={`${card} p-4 sm:p-5`}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#0b1b33]">
          <span className="relative flex h-2 w-2">
            <span className="ai-anim absolute inset-0 rounded-full bg-emerald-400" style={{ animation: "aiPing 1.6s ease-out infinite" }} />
            <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live AI Activity
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold normal-case text-emerald-600">● Live</span>
        </p>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </div>
      <ul className="mt-3 divide-y divide-slate-100">
        <AnimatePresence initial={false}>
          {rows.map(({ Icon, title, sub, t }) => (
            <motion.li
              key={title}
              layout
              initial={{ opacity: 0, y: -12, backgroundColor: "rgba(20,163,154,.10)" }}
              animate={{ opacity: 1, y: 0, backgroundColor: "rgba(20,163,154,0)" }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 rounded-lg py-2.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <Icon className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-semibold text-[#0b1b33]">{title}</span>
                <span className="block truncate text-[11px] text-slate-500">{sub}</span>
              </span>
              <span className="shrink-0 text-[10.5px] font-medium text-emerald-600">{t}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-3 flex justify-center">
        <a href="#ai-seo-strategy" className="inline-flex items-center gap-2 rounded-full border border-teal-100 px-4 py-1.5 text-xs font-semibold text-[#0f766e] transition hover:bg-teal-50">
          View All Activity →
        </a>
      </div>
    </div>
  );
}

/** Glowing "AI SEO in action" core with orbiting rings and particles. */
function Core() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px] 2xl:max-w-[430px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,.28),rgba(125,211,252,.12)_45%,transparent_70%)]" />
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="ai-anim absolute rounded-full border border-teal-300/50"
          style={{
            inset: `${6 + i * 9}%`,
            borderStyle: i === 1 ? "dashed" : "solid",
            animation: `aiSpin ${18 + i * 8}s linear infinite ${i % 2 ? "reverse" : ""}`,
          }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-400 shadow-[0_0_10px_#2dd4bf]" />
        </span>
      ))}
      <span className="ai-anim absolute inset-[28%] rounded-full bg-teal-300/30" style={{ animation: "aiPing 3s ease-out infinite" }} />
      <div className="absolute inset-[27%] flex flex-col items-center justify-center rounded-full border border-white bg-gradient-to-b from-white to-teal-50 text-center shadow-[0_0_60px_rgba(45,212,191,.45),inset_0_0_30px_rgba(45,212,191,.25)]">
        <BrainCircuit className="h-9 w-9 text-[#0f766e] sm:h-10 sm:w-10" strokeWidth={1.6} />
        <p className={`${heading.className} mt-1 text-2xl font-extrabold leading-none text-[#0b1b33] sm:text-[28px]`}>AI SEO</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0f766e]">In Action</p>
        <p className="mt-1.5 hidden text-[10px] leading-snug text-slate-500 sm:block">
          Learning. Analyzing.
          <br /> Optimizing. Growing.
        </p>
      </div>
    </div>
  );
}

function GrowthChart() {
  const traffic = "0,78 12,70 22,72 34,62 44,63 56,50 66,52 78,40 88,38 100,28";
  const ai = "0,82 14,80 26,76 38,70 50,66 62,58 74,48 84,36 92,24 100,12";
  return (
    <div className={`${card} p-4 sm:p-5`}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-[#0b1b33]">Your Growth, Powered by AI</p>
        <span className="flex items-center gap-1 text-[11px] text-slate-500">
          30 Days <ChevronDown className="h-3 w-3" />
        </span>
      </div>
      <div className="relative mt-3 flex gap-2">
        <div className="flex flex-col justify-between py-1 text-[9.5px] text-slate-400">
          <span>200%</span>
          <span>100%</span>
          <span>0%</span>
        </div>
        <div className="relative h-32 flex-1">
          <motion.svg
            viewBox="0 0 100 90"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <defs>
              <linearGradient id="ai-growth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#14a39a" stopOpacity=".22" />
                <stop offset="1" stopColor="#14a39a" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 45, 90].map((y) => (
              <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#eef2f7" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <polygon points={`0,90 ${traffic} 100,90`} fill="url(#ai-growth)" />
            <polyline points={traffic} fill="none" stroke="#14a39a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <polyline points={ai} fill="none" stroke="#6366f1" strokeWidth="1.6" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          </motion.svg>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="absolute right-3 top-0 rounded-lg border border-teal-100 bg-teal-50/90 px-2.5 py-1 text-center"
          >
            <span className={`${heading.className} block text-base font-bold leading-none text-[#0f766e]`}>↑ 186%</span>
            <span className="text-[9.5px] text-slate-500">Growth</span>
          </motion.span>
        </div>
      </div>
      <div className="mt-3 flex gap-4 text-[10.5px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Organic Traffic
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> AI Visibility
        </span>
      </div>
    </div>
  );
}

export default function AiSeoNeverStops() {
  return (
    <Panel inner="bg-gradient-to-b !from-[#f6f8fb] !to-[#f1f7f7]">
      <Inner className="!max-w-[1360px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="text-center">
          <Pill>AI That Never Stops</Pill>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className={`${heading.className} mt-5 text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0b1b33] sm:text-5xl lg:text-[56px]`}
          >
            AI <Hl>Never Stops</Hl> Optimizing.
          </motion.h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Thousands of micro-improvements happen every day—so your business stays ahead in search and AI-powered experiences.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-6 lg:grid-cols-[1fr_0.85fr_1.2fr] lg:gap-5 2xl:gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }}>
            <LiveFeed />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease }}
            className="order-first lg:order-none"
          >
            <Core />
            <div className={`${card} mx-auto mt-2 flex w-fit max-w-full items-center gap-2 px-4 py-3`}>
              <span className="h-2 w-2 shrink-0 rounded-full bg-teal-500" />
              <span className="flex-1 whitespace-nowrap text-[11px] font-medium text-[#0b1b33]">Analyzing. Optimizing. Ranking. Always.</span>
              <svg viewBox="0 0 60 16" className="h-4 w-12 text-teal-500" aria-hidden>
                <path
                  d="M0 8h14l3-6 4 12 4-10 3 4h32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="120"
                  className="ai-anim"
                  style={{ animation: "aiWave 2s linear infinite" }}
                />
              </svg>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease }} className="space-y-5">
            <div className={`${card} p-4 sm:p-5`}>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[13px] font-bold text-[#0b1b33]">
                  <CalendarDays className="h-4 w-4 text-slate-500" /> Today&apos;s Impact
                </p>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  Today <ChevronDown className="h-3 w-3" />
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {IMPACT.map((m) => (
                  <div key={m.label} className={`flex flex-col items-center rounded-xl bg-gradient-to-b ${m.bg} to-white px-1.5 pt-3 text-center`}>
                    <span className={`${heading.className} text-lg font-bold leading-none ${m.fg}`}>
                      {m.arrow && "↑ "}
                      <CountUp to={m.to} suffix={m.suffix} />
                    </span>
                    <span className="mt-1.5 min-h-[2.4em] text-[10px] leading-tight text-slate-500">{m.label}</span>
                    <Spark color={m.c} className="mt-1 h-7 w-full" />
                  </div>
                ))}
              </div>
            </div>
            <GrowthChart />
          </motion.div>
        </div>

        {/* results strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className={`${card} mt-8 grid gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[auto_repeat(5,1fr)] lg:items-center lg:gap-0`}
        >
          <p className="text-sm font-medium text-slate-600 sm:col-span-full lg:col-span-1 lg:pr-6">The Results You Get</p>
          {RESULTS.map(({ Icon, title, sub, c }, i) => (
            <div key={title} className={`group flex items-center gap-3 lg:px-4 ${i ? "lg:border-l lg:border-slate-100" : ""}`}>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${c}`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-[#0b1b33]">{title}</span>
                <span className="block text-xs text-slate-500">{sub}</span>
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
          className={`${card} relative mt-5 flex flex-col items-center gap-5 overflow-hidden p-6 text-center md:flex-row md:text-left lg:px-10`}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(90deg,#000,transparent_25%,transparent_75%,#000)]"
          />
          <Sparkles className="relative h-9 w-9 shrink-0 text-[#14a39a]" strokeWidth={1.6} />
          <div className="relative flex-1">
            <p className={`${heading.className} text-lg font-bold text-[#0b1b33] sm:text-xl`}>Your AI SEO Team Is Working Right Now</p>
            <p className="mt-1 text-sm text-slate-500">Let our AI agents and SEO experts build more visibility, authority, and growth—every single day.</p>
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row">
            <CtaButton>Get Your AI SEO Strategy</CtaButton>
            <CtaButton variant="ghost" href="#how-it-works" className="!border-slate-200 !text-[#0b1b33]">
              See How It Works
            </CtaButton>
          </div>
        </motion.div>
      </Inner>
    </Panel>
  );
}
