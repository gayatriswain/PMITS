"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";
const ORANGE = "#f59e0b";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const SEARCH_QUERY = "best business solutions";

// Types the query once after a short delay, then stays
function useTypingOnce(text: string, { typeMs = 12, startDelay = 250 } = {}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      const t = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }
    if (count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), typeMs);
    return () => clearTimeout(t);
  }, [started, count, text, typeMs, startDelay]);

  return text.slice(0, count);
}

function GoogleG({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function SearchBar({ typed }: { typed: string }) {
  const done = typed.length === SEARCH_QUERY.length;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      className="flex items-center gap-4 w-full h-14 lg:h-[60px] pl-5 pr-6 rounded-full bg-white/95 backdrop-blur border border-white shadow-[0_18px_40px_-18px_rgba(15,40,60,0.35),inset_0_-2px_6px_rgba(15,40,60,0.04)]"
    >
      <GoogleG size={24} />
      <span className="w-px h-6 bg-slate-200" aria-hidden />
      <p className="flex-1 min-w-0 text-[15px] text-slate-800 truncate" aria-label={SEARCH_QUERY}>
        {typed}
        {/* caret blinks while typing, then fades out */}
        <motion.span
          className="inline-block w-[1.5px] h-[18px] align-middle ml-0.5 bg-slate-700"
          animate={done ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
          transition={done ? { duration: 0.3, delay: 0.6 } : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          aria-hidden
        />
      </p>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="9" y="3" width="6" height="11" rx="3" fill="#475569" />
        <path d="M5 11 C5 15 8 18 12 18 C16 18 19 15 19 11 M12 18 V21" />
      </svg>
    </motion.div>
  );
}

// Shared 3D tilt for the floating UI: left edge recedes into the page
const TILT: React.CSSProperties = { transform: "perspective(900px) rotateY(-12deg)", transformOrigin: "right center" };
// Search bar: same base perspective/rotateY as TILT so its left edge lines up exactly with the
// result card below (both foreshorten identically), plus a small extra 2D lean on top.
const SEARCH_TILT: React.CSSProperties = { transform: "perspective(900px) rotateY(-12deg) rotate(-1.5deg)", transformOrigin: "right center" };

const RESULT_TAGS = [
  {
    label: "SEO Strategy",
    icon: <path d="M4 20 V15 M9 20 V11 M14 20 V13 M19 20 V7" />,
  },
  {
    label: "Local SEO",
    icon: (
      <>
        <path d="M12 21 C8 16.5 5 13 5 9.5 C5 5.9 8.1 3 12 3 C15.9 3 19 5.9 19 9.5 C19 13 16 16.5 12 21 Z" fill="currentColor" stroke="none" />
        <circle cx="12" cy="9.5" r="2.5" fill="#fff" stroke="none" />
      </>
    ),
  },
  {
    label: "AI Ready",
    icon: <path d="M12 3 L13.8 10.2 L21 12 L13.8 13.8 L12 21 L10.2 13.8 L3 12 L10.2 10.2 Z" fill="currentColor" stroke="none" />,
  },
  {
    label: "Enterprise SEO",
    icon: <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" fill="currentColor" stroke="none" />,
  },
];

function ProManageMark() {
  return (
    <svg viewBox="0 0 40 40" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id="seo-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1f8f84" />
          <stop offset="1" stopColor="#0b3b35" />
        </linearGradient>
      </defs>
      <path d="M6 4 H24 C31 4 35 8.5 35 15 C35 21.5 31 26 24 26 H17 V36 H6 Z M17 13 V17 H23 C24.5 17 25 16 25 15 C25 14 24.5 13 23 13 Z" fill="url(#seo-logo)" />
      <path d="M6 26 L17 17 V36 H6 Z" fill="#0b3b35" opacity="0.55" />
    </svg>
  );
}

// Search result card — sizes use container-query units so it scales with the visual
function ResultCard({ onShown }: { onShown: () => void }) {
  const base = 1.3;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
      onAnimationComplete={onShown}
      className="relative w-full h-full rounded-[3cqw] bg-white/95 backdrop-blur border border-white shadow-[0_30px_60px_-25px_rgba(15,40,60,0.35)] overflow-hidden"
      style={{ padding: "3.6cqw 4cqw 3cqw" }}
    >
      {/* #1 ribbon */}
      <motion.div
        className="absolute top-0 left-[3.5cqw] w-[8cqw] h-[10cqw]"
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.7 }}
      >
        <svg viewBox="0 0 60 76" className="w-full h-full drop-shadow-md" aria-hidden>
          <defs>
            <linearGradient id="seo-ribbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f3c86b" />
              <stop offset="1" stopColor="#c8922f" />
            </linearGradient>
          </defs>
          <path d="M0 0 H60 V76 L30 60 L0 76 Z" fill="url(#seo-ribbon)" />
          <text x="30" y="42" textAnchor="middle" fontSize="24" fontWeight="700" fill="#fff" fontFamily="Georgia, serif">#1</text>
        </svg>
      </motion.div>

      <div className="relative">
        {/* brand row */}
        <div className="flex items-center gap-[1.6cqw] ml-[11cqw] mb-[3.4cqw]">
          <span className="w-[5.6cqw] h-[5.6cqw] shrink-0">
            <ProManageMark />
          </span>
          <div>
            <p className="font-serif font-semibold leading-none" style={{ fontSize: `${base * 2.6}cqw`, color: NAVY }}>ProManage</p>
            <p className="flex items-center gap-[0.6cqw] font-semibold mt-[0.6cqw]" style={{ fontSize: `${base * 1.2}cqw`, color: DEEP_TEAL }}>
              www.promanage.com
              <svg viewBox="0 0 24 24" className="w-[1.8cqw] h-[1.8cqw]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                <path d="M6 9 L12 15 L18 9" />
              </svg>
            </p>
          </div>
        </div>

        <h3 className="font-serif font-semibold leading-tight mb-[1.8cqw]" style={{ fontSize: `${base * 2.8}cqw`, color: "#2b36b8" }}>
          ProManage – Digital Growth Partner
        </h3>
        <p className="text-slate-700 leading-relaxed mb-[2.6cqw] max-w-[60cqw]" style={{ fontSize: `${base * 1.4}cqw` }}>
          Helping businesses rank higher, attract the right audience, and grow consistently with proven SEO strategies.
        </p>

        <div className="flex flex-wrap gap-[1.2cqw] mb-[2.8cqw]">
          {RESULT_TAGS.map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
              className="inline-flex items-center gap-[0.8cqw] rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 font-medium"
              style={{ fontSize: `${base * 1.15}cqw`, padding: "1cqw 1.8cqw" }}
            >
              <svg viewBox="0 0 24 24" className="w-[2cqw] h-[2cqw]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ color: DEEP_TEAL }} aria-hidden>
                {tag.icon}
              </svg>
              {tag.label}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center gap-[1.4cqw] text-slate-600" style={{ fontSize: `${base * 1.15}cqw` }}>
          <span className="flex gap-[0.3cqw]">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.svg
                key={i}
                viewBox="0 0 24 24"
                className="w-[2.2cqw] h-[2.2cqw]"
                fill={ORANGE}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 14, delay: 1.1 + i * 0.07 }}
              >
                <path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z" />
              </motion.svg>
            ))}
          </span>
          <span>300+ reviews</span>
          <span className="w-px h-[2cqw] bg-slate-300" />
          <span>Trusted by 1000+ Clients</span>
        </div>
      </div>
    </motion.div>
  );
}

const SEO_STATS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="14" width="4" height="6" rx="1" />
        <rect x="10" y="9" width="4" height="11" rx="1" />
        <rect x="16" y="4" width="4" height="16" rx="1" />
        <path d="M3 11l6-6 4 4 8-8" />
        <path d="M17 3h4v4" />
      </svg>
    ),
    value: "312%",
    title: "Increase in Organic Traffic",
    subtitle: "Within 6 Months",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    value: "280%",
    title: "More Enquiries",
    subtitle: "Than Previous Website",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1.5" />
        <circle cx="20" cy="21" r="1.5" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        <path d="M16 11H9" />
        <path d="M12.5 7.5v7" />
      </svg>
    ),
    value: "3.6X",
    title: "Increase in Online Sales",
    subtitle: "Within 4 Months",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14a9 9 0 0 1 18 0" />
        <path d="m12 14 2.5-4.5" />
        <circle cx="12" cy="14" r="2" />
        <path d="M12 5v2" />
        <path d="m5.5 8.5 1.5 1.5" />
        <path d="m18.5 8.5-1.5 1.5" />
      </svg>
    ),
    value: "95/100",
    title: "Performance Score",
    subtitle: "Google PageSpeed",
  },
];

const COMPETITORS = [
  { rank: 2, name: "Competitor One", width: "72%", color: "#b9c4f0" },
  { rank: 3, name: "Competitor Two", width: "58%", color: "#c9b7f0" },
  { rank: 4, name: "Competitor Three", width: "44%", color: "#f0b9c4" },
];

function CompetitorsCard() {
  const base = 1.3;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="w-full rounded-[2.4cqw] bg-white/85 backdrop-blur border border-white shadow-[0_20px_40px_-20px_rgba(15,40,60,0.3)]"
      style={{ padding: "2.4cqw 2.8cqw" }}
    >
      <p className="font-semibold mb-[1.6cqw]" style={{ fontSize: `${base * 1.25}cqw`, color: NAVY }}>Your Competitors</p>
      <ul className="flex flex-col">
        {COMPETITORS.map((c, i) => (
          <li
            key={c.rank}
            className={`flex items-center gap-[2.4cqw] py-[1.2cqw] ${i < COMPETITORS.length - 1 ? "border-b border-slate-100" : ""}`}
          >
            <span className="text-slate-600 w-[2cqw]" style={{ fontSize: `${base * 1.4}cqw` }}>{c.rank}</span>
            <div className="flex-1">
              <p className="text-slate-700 mb-[0.8cqw]" style={{ fontSize: `${base * 1}cqw` }}>{c.name}</p>
              <div className="h-[0.5cqw] rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: c.color }}
                  initial={{ width: 0 }}
                  animate={{ width: c.width }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.15, ease: EASE }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Divider() {
  return <span className="hidden sm:block w-px h-10 bg-slate-200" aria-hidden />;
}

const RIGHT_FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" fill="currentColor" stroke="none" />
        <path d="M18 15c0 1.5 1.5 3 3 3-1.5 0-3 1.5-3 3 0-1.5-1.5-3-3-3 1.5 0 3-1.5 3-3z" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "AI OVERVIEWS",
    text1: "Be the answer.",
    text2: "Build authority.",
    color: "#3b82f6",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "FEATURED SNIPPETS",
    text1: "Own the top spot.",
    text2: "Get more visibility.",
    color: "#2563eb",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    ),
    title: "GOOGLE MAPS",
    text1: "Be found locally.",
    text2: "Get more customers.",
    color: "#15803d",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ),
    title: "REVIEWS",
    text1: "More trust.",
    text2: "More customers.",
    color: "#f59e0b",
  },
];

function FeaturesList() {
  const base = 1.3;
  return (
    <div className="flex flex-col h-full justify-between py-2">
      {RIGHT_FEATURES.map((feat, i) => (
        <motion.div
          key={feat.title}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: i * 0.15, ease: EASE }}
          className="relative flex items-center gap-[1.5cqw]"
        >
          {/* Dashed connecting line */}
          <svg className="absolute right-[100%] top-1/2 -translate-y-1/2 w-[8cqw] h-[4cqw] pointer-events-none" viewBox="0 0 80 40" fill="none">
            <path d="M0 40 C30 40, 50 20, 80 20" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="78" cy="20" r="2.5" fill="#0f5c56" />
          </svg>

          <div className="w-[6cqw] h-[6cqw] shrink-0 rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.12)] border border-slate-50 flex items-center justify-center relative z-10">
            <div className="w-[3cqw] h-[3cqw]" style={{ color: feat.color }}>
              {feat.icon}
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="font-bold leading-tight" style={{ fontSize: `${base * 1}cqw`, color: DEEP_TEAL }}>
              {feat.title}
            </span>
            <span className="text-slate-600 leading-snug mt-[0.3cqw]" style={{ fontSize: `${base * 0.9}cqw` }}>
              {feat.text1}
            </span>
            <span className="text-slate-600 leading-snug" style={{ fontSize: `${base * 0.9}cqw` }}>
              {feat.text2}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function SeoHero() {
  // Sequence: search query types out → result card → competitors card
  const typed = useTypingOnce(SEARCH_QUERY);
  const typingDone = typed.length === SEARCH_QUERY.length;
  const [showCompetitors, setShowCompetitors] = useState(false);

  return (
    <section className="relative pt-4 pb-12 lg:pt-6 lg:pb-16">
      {/* City background — pinned to the right edge, stretched full section height so no blank gap shows above/below it.
          Left edge is feathered (mask-image) so it melts into the page background instead of reading as a hard box. */}
      <motion.div
        className="hidden lg:block absolute inset-y-0 right-0 w-[60vw] max-w-[1150px] pointer-events-none"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, black 45%, black 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, black 45%, black 100%)",
        }}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden
      >
        <Image src="/seo-bg.png" alt="" fill priority sizes="60vw" className="object-cover object-right" />
      </motion.div>

      <Container className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-4 items-center">
        {/* Left content */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-xl lg:-translate-y-10">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="text-[11px] lg:text-xs font-bold tracking-[0.15em] uppercase" style={{ color: ORANGE }}>
              Premium SEO Services
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="w-10 h-px" style={{ backgroundColor: ORANGE }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-[68px] leading-[1.05] font-bold tracking-tight mb-6">
            <span className="block" style={{ color: NAVY }}>Others Search.</span>
            <span className="block" style={{ color: DEEP_TEAL }}>
              You Stay On Top
              <motion.span
                className="inline-block"
                style={{ color: ORANGE }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                .
              </motion.span>
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-600 leading-relaxed mb-9 max-w-lg">
            We put your business at the top of search where it matters—driving more{" "}
            <span className="font-bold" style={{ color: DEEP_TEAL }}>visibility</span>, more{" "}
            <span className="font-bold" style={{ color: DEEP_TEAL }}>traffic</span>, and more{" "}
            <span className="font-bold" style={{ color: DEEP_TEAL }}>revenue</span>.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-lg text-white text-[15px] font-semibold shadow-[0_15px_30px_-12px_rgba(15,92,86,0.7)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              Get My SEO Strategy
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#how-it-works"
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-lg bg-white border text-[15px] font-semibold transition-colors hover:bg-teal-50"
              style={{ borderColor: `${TEAL}66`, color: DEEP_TEAL }}
            >
              <span className="w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: DEEP_TEAL }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill={DEEP_TEAL} className="ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
              See How It Works
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DEEP_TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
                  <path d="M8.5 12 L11 14.5 L15.5 9.5" />
                </svg>
              </span>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: NAVY }}>
                Trusted by
                <br />
                300+ Businesses
              </p>
            </div>

            <Divider />

            <div className="flex items-center gap-3">
              <GoogleG size={28} />
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.svg
                      key={i}
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill={ORANGE}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 14, delay: 1 + i * 0.08 }}
                    >
                      <path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z" />
                    </motion.svg>
                  ))}
                </div>
                <p className="text-[12px] font-semibold leading-snug" style={{ color: NAVY }}>4.9/5 Rating</p>
                <p className="text-[11px] text-slate-500 leading-snug">120+ Reviews</p>
              </div>
            </div>

            <Divider />

            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={DEEP_TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M8.5 12 L11 14.5 L15.5 9.5" />
                </svg>
              </span>
              <p className="text-[12px] font-semibold leading-snug" style={{ color: NAVY }}>
                Proven Strategies.
                <br />
                Real Results.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right visual: the man stays inside the page container */}
        {/* taller than the artwork so the cards get breathing room above the man */}
        <div className="@container relative w-full aspect-[1494/1320]">
          {/* Google-style search bar with typing query */}
          <div className="absolute z-20 top-[1%] -left-[8%] w-[74%]" style={SEARCH_TILT}>
            <SearchBar typed={typed} />
          </div>
          {/* Search result card (below the search bar, behind the man) */}
          <div className="absolute z-10 top-[11%] -left-[8%] w-[74%] h-[41%]" style={TILT}>
            {typingDone && <ResultCard onShown={() => setShowCompetitors(true)} />}
          </div>
          {/* Competitors list */}
          <div className="absolute z-20 top-[55%] left-[4%] w-[36%]" style={TILT}>
            {showCompetitors && <CompetitorsCard />}
          </div>
          {/* Features list on the right — reveal one by one only after the ProManage result card has appeared */}
          <div className="absolute z-20 top-[11%] right-[-18%] w-[45%] h-[41%] hidden md:block">
            {showCompetitors && <FeaturesList />}
          </div>
          {/* on small screens the city sits behind the man inside the column */}
          <motion.div
            className="absolute inset-0 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <Image src="/seo-bg.png" alt="" fill priority sizes="100vw" className="object-contain" />
          </motion.div>
          {/* man sits above the cards (static, no animation) */}
          <div className="absolute inset-x-0 bottom-0 aspect-[1494/1052] z-30 pointer-events-none">
            <div className="absolute inset-0 scale-[0.95] origin-[100%_92%] translate-y-[14%]">
              <Image
                src="/seo-man.png"
                alt="Business owner looking at the city skyline"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Stats Bar */}
      <Container className="relative z-30 mt-0 lg:-mt-6 xl:-mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="w-full bg-white rounded-[32px] shadow-[0_12px_40px_rgb(0,0,0,0.06)] border border-slate-100 p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4"
        >
          {SEO_STATS.map((stat, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-4 lg:gap-5 w-full lg:w-auto lg:flex-1 justify-center lg:justify-start lg:pl-6 first:lg:pl-2">
                <div
                  className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: DEEP_TEAL }}
                >
                  <div className="w-7 h-7 lg:w-8 lg:h-8">
                    {stat.icon}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl lg:text-[28px] font-bold leading-tight" style={{ color: DEEP_TEAL }}>
                    {stat.value}
                  </span>
                  <span className="text-[13px] lg:text-[14px] text-slate-700 font-medium leading-snug mt-1">
                    {stat.title}
                  </span>
                  <span className="text-[11px] lg:text-[12px] text-slate-500 leading-snug mt-0.5">
                    {stat.subtitle}
                  </span>
                </div>
              </div>
              {i < SEO_STATS.length - 1 && (
                <>
                  <div className="hidden lg:block w-px h-16 bg-slate-100" />
                  <div className="block lg:hidden w-full h-px bg-slate-100" />
                </>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
