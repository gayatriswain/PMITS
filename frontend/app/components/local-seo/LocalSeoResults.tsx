"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Eye,
  Globe2,
  MapPin,
  Navigation,
  Phone,
  Scissors,
  Search,
  Stethoscope,
  Target,
  Trophy,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import CountUp from "../shared/CountUp";
import { Inner, LH2, LPill, LS, Panel, Stars, T, ease, heading } from "./LocalSeoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

type Biz = { name: string; rating: number; reviews: number; type: string; dist: string; img: string };
type Case = {
  query: string;
  Icon: LucideIcon;
  title: string;
  area: string;
  challenge: string;
  did: string;
  views: number;
  calls: number;
  directions: number;
  keywords: string;
  list: Biz[];
};

const CASES__cms: Case[] = [
  {
    query: "plumber near me",
    Icon: Wrench,
    title: "Local Plumbing Business",
    area: "Servicing in Austin, TX",
    challenge: "Low visibility, few calls and minimal website traffic.",
    did: "Optimized GBP, targeted local keywords, built citations and improved on-page local SEO.",
    views: 215,
    calls: 160,
    directions: 168,
    keywords: "12+",
    list: [
      { name: "Local Plumbing Business", rating: 4.9, reviews: 256, type: "Plumber", dist: "0.3 mi", img: LS.plumbers[0] },
      { name: "Competitor A", rating: 4.1, reviews: 120, type: "Plumber", dist: "0.6 mi", img: LS.plumbers[1] },
      { name: "Competitor B", rating: 3.2, reviews: 83, type: "Plumber", dist: "1.2 mi", img: LS.plumbers[2] },
    ],
  },
  {
    query: "cafe near me",
    Icon: Coffee,
    title: "Neighbourhood Café",
    area: "Serving Downtown Dubai",
    challenge: "Great food but hidden behind bigger chains on Maps.",
    did: "Rebuilt the profile with fresh photos, menu, posts and a steady review strategy.",
    views: 240,
    calls: 132,
    directions: 190,
    keywords: "18+",
    list: [
      { name: "Neighbourhood Café", rating: 4.9, reviews: 312, type: "Cafe", dist: "0.2 mi", img: LS.gbpThumbs[0] },
      { name: "Competitor A", rating: 4.0, reviews: 98, type: "Cafe", dist: "0.5 mi", img: LS.gbpThumbs[1] },
      { name: "Competitor B", rating: 3.6, reviews: 64, type: "Cafe", dist: "0.9 mi", img: LS.gbpThumbs[2] },
    ],
  },
  {
    query: "dentist near me",
    Icon: Stethoscope,
    title: "Family Dental Clinic",
    area: "Serving Noida, India",
    challenge: "Patients chose clinics further away that ranked in the local pack.",
    did: "Service-area pages, local schema, citation clean-up and review requests after visits.",
    views: 198,
    calls: 145,
    directions: 152,
    keywords: "10+",
    list: [
      { name: "Family Dental Clinic", rating: 4.8, reviews: 204, type: "Dentist", dist: "0.4 mi", img: "/ai-seo/thumb-2.webp" },
      { name: "Competitor A", rating: 4.2, reviews: 77, type: "Dentist", dist: "0.8 mi", img: LS.plumbers[1] },
      { name: "Competitor B", rating: 3.9, reviews: 41, type: "Dentist", dist: "1.4 mi", img: LS.plumbers[2] },
    ],
  },
  {
    query: "salon near me",
    Icon: Scissors,
    title: "Boutique Hair Salon",
    area: "Serving Gurugram, India",
    challenge: "Bookings depended on walk-ins; almost no calls from Google.",
    did: "Optimized categories and services, weekly offers posts and a booking-ready website.",
    views: 226,
    calls: 171,
    directions: 140,
    keywords: "15+",
    list: [
      { name: "Boutique Hair Salon", rating: 4.9, reviews: 188, type: "Salon", dist: "0.3 mi", img: "/ai-seo/thumb-4.webp" },
      { name: "Competitor A", rating: 4.3, reviews: 102, type: "Salon", dist: "0.7 mi", img: LS.gbpThumbs[2] },
      { name: "Competitor B", rating: 3.8, reviews: 59, type: "Salon", dist: "1.1 mi", img: LS.plumbers[1] },
    ],
  },
];

function Growth() {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ls-growth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14a39a" stopOpacity=".3" />
          <stop offset="1" stopColor="#14a39a" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 110 C 40 100, 60 80, 90 82 S 140 60, 160 40 S 190 15, 200 6 V120 H0Z"
        fill="url(#ls-growth)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path
        d="M0 110 C 40 100, 60 80, 90 82 S 140 60, 160 40 S 190 15, 200 6"
        fill="none"
        stroke="#0f766e"
        strokeWidth="2.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <circle cx="200" cy="6" r="5" fill="#0f766e" />
    </svg>
  );
}

export default function LocalSeoResults() {
  const $t = useCmsText();
  const CASES = useCmsData("LocalSeoResults__CASES", CASES__cms);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const c = CASES[i];

  useEffect(() => {
    if (!auto || reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % CASES.length), 7000);
    return () => clearInterval(t);
  }, [auto, reduce]);

  const go = (n: number) => {
    setI((n + CASES.length) % CASES.length);
    setAuto(false);
  };

  return (
    <Panel id="local-seo-results" inner="!bg-white">
      <Inner className="!max-w-[1460px] py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="text-center">
          <LPill soft>{$t("LocalSeoResults__t1", "Proven Impact. Real Growth.")}</LPill>
          <LH2 className="mt-5" size="text-[clamp(32px,3.4vw,66px)]">
            {$t("LocalSeoResults__t2", "Real ")}<T>{$t("LocalSeoResults__t3", "Results.")}</T> {$t("LocalSeoResults__t4", "Real Businesses.")}</LH2>
          <p className="text-body mt-4 text-slate-600">{rich($t("LocalSeoResults__t5", "Local visibility that drives real-world impact."))}</p>
        </div>

        <div className="relative mt-10 flex items-center gap-4">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous case study" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-lg transition hover:scale-105 lg:flex">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease }}
            className="grid min-w-0 flex-1 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_30px_60px_-36px_rgba(15,40,80,.5)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
          >
            {/* search mock */}
            <div className="border-b border-slate-100 p-5 lg:border-b-0 lg:border-r lg:p-6">
              <div className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-3">
                <Search className="h-5 w-5 text-slate-700" />
                <AnimatePresence mode="wait">
                  <motion.span key={c.query} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 text-[15px] text-slate-800">
                    {c.query}
                  </motion.span>
                </AnimatePresence>
                <X className="h-4 w-4 text-slate-500" />
              </div>
              <div className="mt-3 flex gap-5 border-b border-slate-100 px-1 text-[14px] text-slate-600">
                {[$t("LocalSeoResults__t6", "All"), $t("LocalSeoResults__t7", "Maps"), $t("LocalSeoResults__t8", "Images"), $t("LocalSeoResults__t9", "Shopping"), $t("LocalSeoResults__t10", "News")].map((t, k) => (
                  <span key={t} className={`pb-2.5 ${k === 0 ? "rounded-t-lg border-b-2 border-[#0f766e] bg-teal-50/70 px-3 font-semibold text-[#0b1b33]" : ""}`}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-body mt-4 flex items-center justify-between font-medium text-[#0b1b33]">
                <span className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> {$t("LocalSeoResults__t11", "Businesses")}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </p>
              <AnimatePresence mode="wait">
                <motion.ul key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease }} className="mt-3 space-y-2">
                  {c.list.map((b, k) => (
                    <li
                      key={b.name}
                      className={`flex items-center gap-3 rounded-xl p-2.5 ${k === 0 ? "border-2 border-[#14a39a] bg-white shadow-[0_12px_28px_-18px_rgba(15,118,110,.6)]" : "border border-transparent"}`}
                    >
                      <span className="relative h-16 w-[72px] 2xl:h-20 2xl:w-24 shrink-0 overflow-hidden rounded-lg">
                        <Image src={b.img} alt="" fill sizes="72px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1 text-[12px] text-slate-500 2xl:text-[13.5px]">
                        <span className="block truncate text-[14px] font-semibold text-[#0b1b33] 2xl:text-[16px]">{b.name}</span>
                        <span className="flex items-center gap-1">
                          {b.rating} <Stars n={Math.round(b.rating)} className="h-3 w-3" /> ({b.reviews}) · {b.type}
                        </span>
                        <span>
                          {b.dist} · <span className="text-green-600">{$t("LocalSeoResults__t12", "Open")}</span> {$t("LocalSeoResults__t13", "· Closes 7 PM")}</span>
                      </span>
                      <span className="hidden gap-3 text-center text-[10.5px] text-slate-500 sm:flex">
                        {[
                          { I: Phone, l: $t("LocalSeoResults__t14", "Call") },
                          { I: Globe2, l: $t("LocalSeoResults__t15", "Website") },
                        ].map(({ I, l }) => (
                          <span key={l} className="flex flex-col items-center gap-1">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-[#0f766e]">
                              <I className="h-4 w-4" />
                            </span>
                            {l}
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
              <p className="text-small mt-3 rounded-full bg-slate-50 py-2.5 text-center font-medium text-[#0b1b33]">{rich($t("LocalSeoResults__t16", "View more businesses ›"))}</p>
            </div>

            {/* case details */}
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: 0.45, ease }} className="p-5 lg:p-7">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-[#0f766e]">
                    <c.Icon className="h-7 w-7" />
                  </span>
                  <span>
                    <span className={`${heading.className} block text-xl font-semibold text-[#0b1b33] 2xl:text-2xl`}>{c.title}</span>
                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                      <MapPin className="h-4 w-4 text-[#0f766e]" /> {c.area}
                    </span>
                  </span>
                </div>
                <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-[minmax(0,1fr)_170px] 2xl:grid-cols-[minmax(0,1fr)_230px]">
                  <div className="space-y-4">
                    {[
                      { I: Target, h: $t("LocalSeoResults__t17", "Challenge"), t: c.challenge },
                      { I: Zap, h: $t("LocalSeoResults__t18", "What We Did"), t: c.did },
                    ].map(({ I, h, t }) => (
                      <div key={h} className="flex gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0f766e]">
                          <I className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-[12px] font-bold uppercase tracking-wide text-[#0b1b33]">{h}</span>
                          <span className="mt-0.5 block text-[14px] leading-relaxed text-slate-600 2xl:text-[15px]">{t}</span>
                        </span>
                      </div>
                    ))}
                    <div className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#0f766e]">
                        <Trophy className="h-4 w-4" />
                      </span>
                      <span className="text-[14px] text-slate-700 2xl:text-[15.5px]">
                        <span className="block text-[12px] font-bold uppercase tracking-wide text-[#0b1b33]">{$t("LocalSeoResults__t19", "The Result")}</span>
                        <span className="mt-1 block"><b className="text-[#0f766e]">+{c.views}%</b> {$t("LocalSeoResults__t20", "Profile Views")}</span>
                        <span className="block"><b className="text-[#0f766e]">+{c.calls}%</b> {$t("LocalSeoResults__t21", "Calls from Profile")}</span>
                        <span className="block"><b className="text-[#0f766e]">+{c.directions}%</b> {$t("LocalSeoResults__t22", "Direction Requests")}</span>
                        <span className="block">{$t("LocalSeoResults__t23", "Top 3 Rankings for ")}{c.keywords} {$t("LocalSeoResults__t24", "Keywords")}</span>
                      </span>
                    </div>
                  </div>
                  <div className="relative hidden h-full min-h-[200px] sm:block">
                    <span className="absolute right-6 top-0 z-10 rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-center shadow-md">
                      <span className={`${heading.className} block text-lg font-bold text-[#0f766e]`}>+{c.views}%</span>
                      <span className="text-[10.5px] text-slate-500">{$t("LocalSeoResults__t25", "Profile Views")}</span>
                    </span>
                    <div className="absolute inset-x-0 bottom-0 top-12">
                      <Growth />
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-teal-50/70 p-4 sm:grid-cols-4">
                  {[
                    { I: Eye, v: c.views, s: "%", l: $t("LocalSeoResults__t26", "More Visibility") },
                    { I: Phone, v: c.calls, s: "%", l: $t("LocalSeoResults__t27", "More Calls") },
                    { I: Navigation, v: c.directions, s: "%", l: $t("LocalSeoResults__t28", "More Directions") },
                    { I: Trophy, v: 3, s: "", l: $t("LocalSeoResults__t29", "Rankings"), p: $t("LocalSeoResults__t30", "Top ") },
                  ].map(({ I, v, s, l, p }) => (
                    <div key={l} className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0f766e] shadow-sm">
                        <I className="h-5 w-5" />
                      </span>
                      <span>
                        <span className={`${heading.className} block text-[17px] font-bold leading-none text-[#0b1b33]`}>
                          {p}
                          <CountUp to={v} suffix={s} />
                        </span>
                        <span className="text-[11px] text-slate-500">{l}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <button type="button" onClick={() => go(i + 1)} aria-label="Next case study" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-lg transition hover:scale-105 lg:flex">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flex justify-center gap-2.5">
          {CASES.map((k, n) => (
            <button
              key={k.title}
              type="button"
              aria-label={`Show ${k.title}`}
              onClick={() => go(n)}
              className={`h-2.5 rounded-full transition-all duration-300 ${n === i ? "w-7 bg-[#0f766e]" : "w-2.5 bg-slate-200 hover:bg-slate-300"}`}
            />
          ))}
        </div>
      </Inner>
    </Panel>
  );
}
