"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight as LArrow,
  CircleDollarSign,
  CircleHelp,
  Crown,
  FileWarning,
  Search,
  ShieldAlert,
  ShieldCheck,
  Star,
  TrendingDown,
  TrendingUp,
  Waypoints,
} from "lucide-react";
import CountUp from "../shared/CountUp";
import { AI, BrandIcon, H2, Hl, Pill, Sparkle, ease, heading, type Brand, Inner, Panel } from "../shared/AiSeoShared";

const BEFORE = [
  { Icon: TrendingDown, title: "Low Visibility", text: "Hard to find on Google and not shown in AI results." },
  { Icon: CircleHelp, title: "Not AI-Recommended", text: "Your brand is missing in AI overviews and answers." },
  { Icon: FileWarning, title: "Scattered Content", text: "Content isn't structured for topics or user intent." },
  { Icon: ShieldAlert, title: "Low Authority", text: "AI doesn't recognize or trust your brand." },
];
const AFTER = [
  { Icon: TrendingUp, title: "Increased Visibility", text: "Higher rankings across Google, AI Overviews & more." },
  { Icon: Star, title: "AI Recommends You", text: "Your brand is cited in AI answers and suggestions." },
  { Icon: Waypoints, title: "Topical Authority", text: "Structured content that builds trust and relevance." },
  { Icon: ShieldCheck, title: "High Trust & Authority", text: "AI understands, trusts and recommends your brand." },
];

const PLATFORMS: { brand: Brand; name: string; sub: string }[] = [
  { brand: "chatgpt", name: "ChatGPT", sub: "Answers & Recommendations" },
  { brand: "gemini", name: "Google Gemini", sub: "AI Overviews & Summaries" },
  { brand: "google", name: "Google Search", sub: "Rankings & Rich Results" },
  { brand: "perplexity", name: "Perplexity", sub: "AI Answers & Citations" },
  { brand: "claude", name: "Claude", sub: "AI Conversations & Responses" },
  { brand: "copilot", name: "Microsoft Copilot", sub: "AI Assistant Results" },
  { brand: "youtube", name: "YouTube", sub: "Video Search Visibility" },
  { brand: "voice", name: "Voice Search", sub: "Smart Speakers & Assistants" },
];

const STATS = [
  { Icon: TrendingUp, to: 180, suffix: "%+", title: "Increase in Organic Traffic", text: "Drive more qualified visitors that convert.", c: "text-teal-600", bg: "bg-teal-50" },
  { Icon: Search, to: 200, suffix: "%+", title: "Growth in Keyword Rankings", text: "Rank higher for the keywords that matter most.", c: "text-violet-600", bg: "bg-violet-50" },
  { Icon: Crown, to: 250, suffix: "%+", title: "AI Visibility Boost", text: "Be seen in AI Overviews, answers and recommendations.", c: "text-blue-600", bg: "bg-blue-50" },
  { Icon: CircleDollarSign, to: 3, suffix: "X+", title: "More Leads & Revenue", text: "More visibility. More traffic. More business growth.", c: "text-orange-500", bg: "bg-orange-50" },
];

function Column({ kind }: { kind: "before" | "after" }) {
  const before = kind === "before";
  const rows = before ? BEFORE : AFTER;
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: before ? 0 : 0.2, ease }}
      className={`overflow-hidden rounded-2xl border ${
        before ? "border-rose-100 bg-gradient-to-b from-rose-50/70 to-white" : "border-teal-100 bg-gradient-to-b from-teal-50/70 to-white shadow-[0_20px_40px_-28px_rgba(15,118,110,.5)]"
      }`}
    >
      <p className={`py-3 text-center text-xs font-bold uppercase tracking-wide ${before ? "bg-rose-50 text-[#0b1b33]" : "bg-teal-50 text-[#0f766e]"}`}>
        {before ? "Before AI SEO" : "After AI SEO"}
      </p>
      <ul className="divide-y divide-slate-100 px-4">
        {rows.map(({ Icon, title, text }, i) => (
          <motion.li
            key={title}
            initial={{ opacity: 0, x: before ? -12 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.5, ease }}
            className="flex gap-3 py-4"
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${before ? "bg-rose-50 text-rose-500" : "bg-teal-50 text-teal-600"}`}>
              <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
            </span>
            <span>
              <span className="block text-[13px] font-bold text-[#0b1b33]">{title}</span>
              <span className="mt-0.5 block text-[11.5px] leading-relaxed text-slate-500">{text}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function AiSeoDifference() {
  return (
    <Panel inner="!bg-white">
      <Inner className="py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="relative">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-10">
            {/* left: robot + heading + before/after */}
            <div className="relative grid gap-6 md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] xl:grid-cols-[240px_1fr] 2xl:grid-cols-[320px_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease }}
                className="relative mx-auto hidden w-full max-w-[240px] self-center md:block lg:row-span-2 xl:-ml-6 xl:max-w-none 2xl:-ml-10"
              >
                <div className="relative aspect-[0.86]">
                  <span aria-hidden className="absolute -inset-[18%] rounded-full bg-[radial-gradient(closest-side,#e8effd_55%,rgba(232,239,253,0))]" />
                  <Image src={AI.robotPresent} alt="AI SEO robot presenting results" fill sizes="(min-width:1536px) 340px, 260px" className="ai-float object-contain"
                    style={{ maskImage: "radial-gradient(62% 60% at 50% 46%, #000 72%, transparent 100%)", WebkitMaskImage: "radial-gradient(62% 60% at 50% 46%, #000 72%, transparent 100%)" }} />
                </div>
              </motion.div>
              <div className="min-w-0 md:row-start-1 md:col-start-2">
                <Pill>Transform Your Visibility</Pill>
                <H2 className="mt-4 !text-[clamp(26px,1.65vw,32px)] xl:whitespace-nowrap">
                  See the Difference <Hl>AI SEO</Hl> Makes
                </H2>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                  From traditional SEO to AI-powered visibility. We help your business get recommended everywhere people search.
                </p>
              </div>
              <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-7 md:col-span-2 md:col-start-1 lg:col-span-1 lg:col-start-2">
                <Column kind="before" />
                <Column kind="after" />
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 16 }}
                  className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-teal-100 bg-white text-[#0f766e] shadow-lg sm:flex"
                >
                  <LArrow className="h-5 w-5" />
                </motion.span>
              </div>
            </div>

            {/* right: platforms */}
            <div className="min-w-0 xl:self-center">
              <motion.h3
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className={`${heading.className} text-2xl font-bold text-[#0b1b33] sm:text-[26px]`}
              >
                AI Platforms We <Hl>Optimize</Hl> For
              </motion.h3>
              <p className="mt-2 max-w-xs text-sm text-slate-500">Be visible where your customers and AI are searching.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:gap-2.5">
                {PLATFORMS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease }}
                    className="group flex flex-col items-center rounded-2xl border border-slate-100 bg-white px-2 py-4 text-center shadow-[0_12px_26px_-22px_rgba(15,40,80,.55)] transition duration-300 hover:-translate-y-1 hover:border-teal-100 hover:shadow-[0_18px_34px_-20px_rgba(15,118,110,.4)]"
                  >
                    <span className="flex h-10 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <BrandIcon name={p.brand} className="h-8 w-8 2xl:h-10 2xl:w-10" />
                    </span>
                    <span className="mt-2 text-[12.5px] font-bold text-[#0b1b33] 2xl:text-[13.5px]">{p.name}</span>
                    <span className="mt-1 text-[10.5px] leading-snug text-slate-500">{p.sub}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="mt-8 grid overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_20px_50px_-36px_rgba(15,40,80,.5)] md:grid-cols-[200px_1fr]"
          >
            <div className="relative hidden overflow-hidden md:block">
              <Image src={AI.rocket} alt="" fill sizes="200px" className="object-cover" />
              <div className="ai-float absolute inset-0" />
            </div>
            <div className="grid grid-cols-1 gap-y-5 p-5 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:p-6">
              {STATS.map(({ Icon, to, suffix, title, text, c, bg }, i) => (
                <div key={title} className={`flex gap-3 px-2 ${i ? "lg:border-l lg:border-slate-100 lg:pl-5" : ""}`}>
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${bg} ${c}`}>
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className={`${heading.className} block text-2xl font-bold leading-none sm:text-[28px] ${c}`}>
                      <CountUp to={to} suffix={suffix} />
                    </span>
                    <span className="mt-1.5 block text-[13px] font-bold text-[#0b1b33]">{title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-500">{text}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-slate-500 sm:gap-6">
            <span className="hidden h-px w-16 bg-slate-200 sm:block" />
            <span className="flex items-center gap-1.5">
              <Sparkle className="h-3 w-3 text-[#0b1b33]" /> AI Powered.
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[#1e3a8a]">
              <Sparkle className="ai-anim h-5 w-5" />
            </span>
            <span>Human Driven.</span>
            <span className="hidden h-px w-16 bg-slate-200 sm:block" />
          </div>
        </div>
      </Inner>
    </Panel>
  );
}

