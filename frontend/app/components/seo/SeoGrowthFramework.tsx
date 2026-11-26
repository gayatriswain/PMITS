"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { Counter } from "../shared/useCountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";
const GOLD = "#d4a54a";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const svgBase = (color: string, size: number, strokeWidth = 1.8) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const loop = (duration: number, delay = 0) => ({
  duration,
  delay,
  repeat: Infinity,
  ease: "easeInOut" as const,
});

/* ------------------------------------------------------------------ */
/* Card illustrations (soft grey 3D-ish, matches WebsiteDevGrowthPlan) */
/* ------------------------------------------------------------------ */

function KeywordArt() {
  const bars = [16, 26, 38, 52];
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="sg-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e2e8ee" />
          <stop offset="0.6" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#cfd8e0" />
        </linearGradient>
      </defs>
      {bars.map((h, i) => (
        <motion.g
          key={i}
          style={{ originY: 1 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: EASE }}
        >
          <rect x={16 + i * 16} y={78 - h} width="11" height={h} rx="1.5" fill="url(#sg-bar)" />
        </motion.g>
      ))}
      {/* magnifying glass */}
      <motion.g animate={{ y: [0, -4, 0] }} transition={loop(3)}>
        <circle cx="88" cy="30" r="18" fill="#fff" stroke="#d7dee5" strokeWidth="2.5" />
        <circle cx="88" cy="30" r="11" fill="none" stroke="#c4ced7" strokeWidth="2" />
        <line x1="100" y1="42" x2="112" y2="54" stroke="#c4ced7" strokeWidth="5" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}

function OnPageArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="sg-page" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde4ea" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="88" rx="44" ry="3.5" fill="#0f172a" opacity="0.05" />
      <motion.g animate={{ y: [0, -3, 0] }} transition={loop(3.2)}>
        <path d="M18 12 L102 18 L102 78 L18 72 Z" fill="url(#sg-page)" stroke="#d7dee5" strokeWidth="0.8" />
        <path d="M18 12 L102 18 L102 24 L18 18 Z" fill="#e3e9ee" />
        <rect x="26" y="30" width="34" height="4" rx="2" fill="#d2dae1" />
        <rect x="26" y="38" width="24" height="4" rx="2" fill="#d2dae1" />
        <rect x="26" y="47" width="30" height="2.5" rx="1.2" fill="#e0e6eb" />
        <rect x="26" y="52" width="22" height="2.5" rx="1.2" fill="#e0e6eb" />
        <circle cx="82" cy="45" r="16" fill="#eef2f5" stroke="#d7dee5" strokeWidth="0.8" />
        <motion.path
          d="M75 45 L80 50 L90 38"
          fill="none"
          stroke="#1b8a80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}

function LocalSeoArt() {
  const buildings = [
    { x: 16, w: 16, h: 30 },
    { x: 34, w: 18, h: 46 },
    { x: 90, w: 16, h: 24 },
  ];
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="sg-bld" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#dbe3ea" />
        </linearGradient>
      </defs>
      {buildings.map((b, i) => (
        <motion.g
          key={i}
          style={{ originY: 1 }}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease: EASE }}
        >
          <rect x={b.x} y={80 - b.h} width={b.w} height={b.h} fill="url(#sg-bld)" stroke="#dde4ea" strokeWidth="0.6" />
        </motion.g>
      ))}
      {/* map pin */}
      <motion.g animate={{ y: [0, -5, 0] }} transition={loop(2.8)}>
        <path d="M66 20 C56 20 48 28 48 38 C48 52 66 72 66 72 C66 72 84 52 84 38 C84 28 76 20 66 20 Z" fill="#fff" stroke="#d7dee5" strokeWidth="2" />
        <circle cx="66" cy="38" r="10" fill="#eef2f5" stroke="#c4ced7" strokeWidth="1.5" />
        <circle cx="66" cy="38" r="4" fill="#1b8a80" />
      </motion.g>
    </svg>
  );
}

function LinkBuildingArt() {
  return (
    <svg viewBox="0 0 120 90" className="w-full h-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="sg-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde4ea" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="88" rx="44" ry="3.5" fill="#0f172a" opacity="0.05" />
      {/* monitor */}
      <motion.g animate={{ y: [0, -3, 0] }} transition={loop(3.4)}>
        <rect x="16" y="16" width="56" height="40" rx="3" fill="url(#sg-link)" stroke="#d7dee5" strokeWidth="1" />
        <rect x="38" y="58" width="12" height="6" fill="#d7dee5" />
        <rect x="30" y="64" width="28" height="3" rx="1.5" fill="#d7dee5" />
      </motion.g>
      {/* chain links */}
      <motion.g animate={{ rotate: [0, 6, 0] }} transition={loop(3)} style={{ originX: 0.5, originY: 0.5 }}>
        <rect x="78" y="30" width="18" height="26" rx="9" fill="none" stroke="#1b8a80" strokeWidth="4" transform="rotate(-20 87 43)" />
        <rect x="90" y="42" width="18" height="26" rx="9" fill="none" stroke="#c4ced7" strokeWidth="4" transform="rotate(-20 99 55)" />
      </motion.g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PILLARS__cms = [
  {
    num: "01",
    title: "Keyword Research & Strategy",
    highlight: "Target Customers, Not Just Keywords",
    text: "We find the right keywords your ideal customers are searching for and build a strategy that attracts high-intent traffic and real results.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21 L16.65 16.65" />
      </svg>
    ),
    Art: KeywordArt,
  },
  {
    num: "02",
    title: "On-Page SEO Optimization",
    highlight: "Optimize Pages. Improve Rankings.",
    text: "We optimize titles, content, headings, internal links, and user experience so every page ranks better and converts more visitors.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
      </svg>
    ),
    Art: OnPageArt,
  },
  {
    num: "03",
    title: "Local SEO",
    highlight: "Be Found. Get Chosen. Grow Locally.",
    text: "We optimize your Google Business Profile, local citations, and “near me” visibility to drive more calls, visits, and customers from your local area.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <path d="M12 21 C8 16.5 5 13 5 9.5 C5 5.9 8.1 3 12 3 C15.9 3 19 5.9 19 9.5 C19 13 16 16.5 12 21 Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
    Art: LocalSeoArt,
  },
  {
    num: "04",
    title: "Link Building & Authority Growth",
    highlight: "Build Authority. Earn Top Rankings.",
    text: "We build high-quality backlinks and brand mentions from trusted websites to improve your domain authority and outrank competitors.",
    icon: (
      <svg {...svgBase("#fff", 20)}>
        <path d="M9 7 L6 7 A4 4 0 0 0 6 15 L9 15" />
        <path d="M15 7 L18 7 A4 4 0 0 1 18 15 L15 15" />
        <line x1="8" y1="11" x2="16" y2="11" />
      </svg>
    ),
    Art: LinkBuildingArt,
  },
];

const FEATURES__cms = [
  "Technical SEO Audit & Website Health",
  "Keyword & Competitor Research",
  "On-Page SEO Optimization",
  "Local SEO & Google Business Profile",
  "Content Strategy & SEO Copywriting",
  "High-Quality Link Building",
  "Ecommerce SEO",
  "Performance Tracking & Monthly Reporting",
];

const STATS__cms = [
  {
    target: 200,
    suffix: "+",
    label: "Projects Delivered",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" />
      </svg>
    ),
  },
  {
    target: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <circle cx="12" cy="9" r="6" />
        <path d="M12 6 L12.9 7.9 L15 8.2 L13.5 9.6 L13.9 11.7 L12 10.7 L10.1 11.7 L10.5 9.6 L9 8.2 L11.1 7.9 Z" />
        <path d="M8.5 14 L7 21 L12 18.5 L17 21 L15.5 14" />
      </svg>
    ),
  },
  {
    target: 5,
    suffix: "+",
    label: "Years of Experience",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
        <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
      </svg>
    ),
  },
  {
    target: 24,
    suffix: "/7",
    label: "Support & Maintenance",
    icon: (
      <svg {...svgBase(TEAL, 22)}>
        <path d="M4 14 V12 C4 7.6 7.6 4 12 4 C16.4 4 20 7.6 20 12 V14" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19 C19 20.5 17.5 21 15 21 H13" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: (i % 2) * 0.12 } }),
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/* ------------------------------------------------------------------ */

function DottedRule() {
  return <span className="hidden sm:block w-14 border-t-2 border-dotted" style={{ borderColor: `${TEAL}80` }} />;
}

function Stats() {
  const STATS = useCmsData("SeoGrowthFramework__STATS", STATS__cms);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] px-4 py-5 grid grid-cols-2 lg:grid-cols-4 gap-y-6"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex items-center justify-center gap-3 px-2 ${i > 0 ? "lg:border-l border-slate-100" : ""}`}
        >
          <span className="shrink-0 w-12 h-12 rounded-full bg-[#F1F4F6] flex items-center justify-center">{stat.icon}</span>
          <div>
            <p className="text-body font-bold tabular-nums mb-1" style={{ color: DEEP_TEAL }}>
              {inView ? <Counter target={stat.target} suffix={stat.suffix} /> : `0${stat.suffix}`}
            </p>
            <p className="text-[11px] text-slate-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function SeoGrowthFramework() {
  const $t = useCmsText();
  const PILLARS = useCmsData("SeoGrowthFramework__PILLARS", PILLARS__cms);
  const FEATURES = useCmsData("SeoGrowthFramework__FEATURES", FEATURES__cms);
  return (
    <section className="relative w-full bg-white py-12 lg:py-16 overflow-x-clip">
      <Container>
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="flex items-center gap-4 mb-3">
              <DottedRule />
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
                {rich($t("SeoGrowthFramework__t1", "Our Complete SEO Framework"))}</p>
              <DottedRule />
            </div>
            <h2 className="text-h2 font-serif font-semibold mb-3" style={{ color: NAVY }}>
              {$t("SeoGrowthFramework__t2", "Complete SEO Solutions")}<br />
              {$t("SeoGrowthFramework__t3", "That Drive ")}<span style={{ color: TEAL }}>{$t("SeoGrowthFramework__t4", "Real Growth")}</span>
              <span style={{ color: GOLD }}>.</span>
            </h2>
            <p className="text-body text-slate-600 max-w-xl">
              {rich($t("SeoGrowthFramework__t5", "From strategy to execution, we cover every aspect of SEO to increase your visibility, attract the right audience and deliver measurable business results."))}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,2fr)] gap-5">
            {/* Core focus card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative lg:sticky lg:top-40 lg:self-start"
              style={{ filter: "drop-shadow(0 18px 30px rgba(15,40,60,0.08)) drop-shadow(0 1px 1px rgba(15,40,60,0.04))" }}
            >
              <div className="absolute inset-0 bg-white rounded-3xl pointer-events-none" aria-hidden />

              {/* Icon badge */}
              <div className="absolute left-10 top-12 w-[120px] h-[120px] flex items-center justify-center">
                <motion.span
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: `${TEAL}40` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                  <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                  <span className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
                </motion.span>
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={loop(3)}
                  className="relative w-[84px] h-[84px] rounded-full bg-gradient-to-br from-white via-white to-[#e8eef1] shadow-[0_14px_28px_-10px_rgba(15,60,70,0.35),inset_0_2px_6px_rgba(255,255,255,1)] flex items-center justify-center"
                >
                  <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-hidden>
                    <defs>
                      <linearGradient id="sg-badge-bar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#1f8f84" />
                        <stop offset="1" stopColor={DEEP_TEAL} />
                      </linearGradient>
                    </defs>
                    {[
                      { x: 8, h: 12 },
                      { x: 17, h: 18 },
                      { x: 26, h: 24 },
                      { x: 35, h: 30 },
                    ].map((b, i) => (
                      <motion.rect
                        key={i}
                        x={b.x}
                        y={42 - b.h}
                        width="6.5"
                        height={b.h}
                        rx="1"
                        fill="url(#sg-badge-bar)"
                        style={{ originY: 1 }}
                        animate={{ scaleY: [0.6, 1, 0.6] }}
                        transition={loop(2.4, i * 0.18)}
                      />
                    ))}
                    <path d="M6 24 L16 16 L24 19 L40 6" stroke={DEEP_TEAL} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M33 5.5 H40.5 V13" stroke={DEEP_TEAL} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </div>

              {/* Vertical label */}
              <div className="absolute left-5 top-44 bottom-12 flex flex-col items-center gap-3">
                <span
                  className="text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                  style={{ color: TEAL }}
                >
                  {$t("SeoGrowthFramework__t6", "Our Core Focus")}</span>
                <motion.span
                  className="w-px flex-1 origin-top"
                  style={{ backgroundColor: `${TEAL}80` }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5, ease: EASE }}
                />
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
              </div>

              {/* Content */}
              <div className="relative pt-[184px] pb-10 pl-14 pr-5">
                <h3 className="text-h5 font-serif font-semibold mb-4">
                  <span style={{ color: NAVY }}>{$t("SeoGrowthFramework__t7", "SEO Solutions")}</span>
                  <br />
                  <span style={{ color: TEAL }}>{$t("SeoGrowthFramework__t8", "That Grow Your Business")}</span>
                </h3>
                <span className="block w-8 h-[2px] mb-6" style={{ backgroundColor: GOLD }} />

                <p className="text-small text-slate-600 mb-5">
                  {rich($t("SeoGrowthFramework__t9", "Not every business needs the same SEO strategy. We build a customized SEO roadmap based on your industry, competition, target audience, and business goals to increase visibility, generate qualified leads, and deliver sustainable growth."))}</p>

                <p className="text-caption font-bold uppercase tracking-wide mb-3" style={{ color: NAVY }}>
                  {rich($t("SeoGrowthFramework__t10", "What's Included:"))}</p>
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col gap-3 mb-8"
                >
                  {FEATURES.map((f) => (
                    <motion.li key={f} variants={listItem} className="flex items-center gap-2 text-[12px] text-slate-600">
                      <span className="shrink-0 w-3.5 h-3.5 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: TEAL }}>
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={$t("SeoGrowthFramework__t11", "/contact")}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg text-white text-[12px] font-semibold whitespace-nowrap shadow-lg shadow-teal-900/20 transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: DEEP_TEAL }}
                  >
                    {$t("SeoGrowthFramework__t12", "Get My SEO Strategy")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={$t("SeoGrowthFramework__t13", "/testimonials")}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border text-[12px] font-semibold whitespace-nowrap"
                    style={{ borderColor: `${DEEP_TEAL}55`, color: DEEP_TEAL }}
                  >
                    {$t("SeoGrowthFramework__t14", "View SEO Results")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 20 V15 M9 20 V11 M14 20 V13 M19 20 V7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Pillar cards */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLARS.map(({ num, title, highlight, text, icon, Art }, i) => (
                <motion.div
                  key={num}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i}
                  whileHover="hover"
                  className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] p-6 overflow-hidden min-h-[280px] flex flex-col transition-shadow hover:shadow-[0_25px_50px_-20px_rgba(15,60,70,0.3)]"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <motion.span
                      variants={{ hover: { rotate: -8, scale: 1.08 } }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_8px_16px_-6px_rgba(15,92,86,0.6)]"
                      style={{ backgroundColor: DEEP_TEAL }}
                    >
                      {icon}
                    </motion.span>
                    <div className="pt-1">
                      <h3 className="text-h6 font-serif font-semibold" style={{ color: NAVY }}>
                        {title}
                      </h3>
                    </div>
                    <span className="ml-auto font-serif text-5xl md:text-[56px] font-extralight text-slate-200 transition-colors group-hover:text-teal-100 leading-none">
                      {num}
                    </span>
                  </div>

                  <p className="text-caption font-bold mb-3" style={{ color: TEAL }}>
                    {highlight}
                  </p>

                  <p className="text-small relative z-10 text-slate-600 max-w-[64%] mb-6">{text}</p>

                  <Link
                    href={$t("SeoGrowthFramework__t15", "/contact")}
                    className="relative z-10 mt-auto inline-flex items-center gap-2 text-[13px] font-semibold self-start"
                    style={{ color: DEEP_TEAL }}
                  >
                    {$t("SeoGrowthFramework__t16", "Learn More")}<motion.svg
                      variants={{ hover: { x: 5 } }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </motion.svg>
                  </Link>

                  {/* illustration, faded into the card */}
                  <div
                    className="absolute right-2 bottom-2 w-[48%] max-w-[190px] aspect-[4/3] pointer-events-none opacity-80"
                    style={{
                      maskImage: "radial-gradient(ellipse 90% 90% at 80% 85%, #000 45%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 80% 85%, #000 45%, transparent 100%)",
                    }}
                  >
                    <Art />
                  </div>
                  {/* soft mist at the bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Stats />
        </div>
      </Container>
    </section>
  );
}
