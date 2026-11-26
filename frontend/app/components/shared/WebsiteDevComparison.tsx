"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "framer-motion";
import { Counter } from "./useCountUp";
import Container from "./Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";
const GOLD = "#d4a54a";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { color?: string; size?: number };

const svgBase = (color: string, size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ---------------- Icons ---------------- */

const TargetIcon = ({ color = NAVY, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 12 L19 5 M16 5 H19 V8" />
  </svg>
);
const GearIcon = ({ color = NAVY, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    <circle cx="12" cy="12" r="6.5" />
  </svg>
);
const ChatIcon = ({ color = NAVY, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M4 5 H20 V16 H9 L5 20 V16 H4 Z" />
    <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" strokeWidth="2.6" />
  </svg>
);
const SearchIcon = ({ color = NAVY, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16 L20.5 20.5" />
  </svg>
);
const RocketIcon = ({ color = NAVY, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M14 4 C18 3 21 6 20 10 L13 17 L7 11 Z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
    <path d="M7 11 H4 L7 7 H11 M13 17 V20 L17 17 V13 M6 18 L3.5 20.5" />
  </svg>
);
const FlagIcon = ({ color = NAVY, size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M5 21 V4" />
    <path d="M5 4 H17 L14.5 8 L17 12 H5" />
  </svg>
);
const TrophyIcon = ({ color = "#fff", size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M7 4 H17 V9 C17 12 15 14 12 14 C9 14 7 12 7 9 Z" />
    <path d="M7 6 H4 C4 9 5 10 7 10 M17 6 H20 C20 9 19 10 17 10 M12 14 V18 M8 21 H16 M9 18 H15" />
  </svg>
);
const ExpandIcon = ({ color = "#fff", size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M4 10 V4 H10 M4 4 L10 10 M20 14 V20 H14 M20 20 L14 14 M14 4 H20 V10 M20 4 L14 10 M10 20 H4 V14 M4 20 L10 14" />
  </svg>
);
const SendIcon = ({ color = "#fff", size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M21 3 L10 14 M21 3 L14.5 21 L10 14 L3 9.5 Z" />
  </svg>
);
const SeoIcon = ({ color = "#fff", size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16 L20.5 20.5 M8.5 11 L10.3 12.8 L13.8 9.3" />
  </svg>
);
const GrowthIcon = ({ color = "#fff", size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
    <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
  </svg>
);
const HeartIcon = ({ color = "#fff", size = 18 }: IconProps) => (
  <svg {...svgBase(color, size)}>
    <path d="M12 20 C5 15.5 3 12.5 3 9 C3 6.2 5.2 4 8 4 C9.7 4 11.2 4.9 12 6.2 C12.8 4.9 14.3 4 16 4 C18.8 4 21 6.2 21 9 C21 12.5 19 15.5 12 20 Z" />
  </svg>
);

const ROWS__cms = [
  {
    label: "Focus",
    theirs: "Looks Good",
    TheirIcon: TargetIcon,
    title: "Generates Results",
    text: "Websites built to attract, engage & convert.",
    OurIcon: TrophyIcon,
  },
  {
    label: "Process",
    theirs: "Template Based",
    TheirIcon: GearIcon,
    title: "Strategy First",
    text: "A clear plan aligned with your business goals.",
    OurIcon: ExpandIcon,
  },
  {
    label: "Communication",
    theirs: "Slow & Unclear",
    TheirIcon: ChatIcon,
    title: "Transparent & Proactive",
    text: "Clear updates, real-time communication.",
    OurIcon: SendIcon,
  },
  {
    label: "SEO",
    theirs: "Added Separately",
    TheirIcon: SearchIcon,
    title: "SEO Built-in",
    text: "Search-friendly from day one.",
    OurIcon: SeoIcon,
  },
  {
    label: "After Launch",
    theirs: "Launch & Leave",
    TheirIcon: RocketIcon,
    title: "Support & Continuous Growth",
    text: "We optimize, improve and scale with you.",
    OurIcon: GrowthIcon,
  },
  {
    label: "Goal",
    theirs: "Complete Project",
    TheirIcon: FlagIcon,
    title: "Grow Your Business",
    text: "We measure what matters. You grow.",
    OurIcon: HeartIcon,
  },
];

/* ---------------- Motion ---------------- */

const rowsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};

const fadeRow: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const rightRowsVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
};

const rightRow: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const XMark = () => (
  <span className="shrink-0 w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="3.5" strokeLinecap="round">
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  </span>
);

const CheckMark = () => (
  <span className="shrink-0 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: TEAL }}>
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const ROW_H = "h-[78px]";
const HEADER_H = "h-[72px]";
// gentle ease-in-out for the card choreography
const SMOOTH = [0.65, 0, 0.35, 1] as [number, number, number, number];

/* ---------------- Stats strip ---------------- */

const STATS__cms = [
  {
    target: 200,
    suffix: "+",
    label: "Websites Delivered",
    icon: (
      <svg {...svgBase(TEAL, 18)}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20 C2.5 15.5 5.5 13.5 9 13.5 C10.5 13.5 11.8 13.9 12.8 14.6" />
        <circle cx="17" cy="17" r="4" />
        <path d="M15.3 17 L16.5 18.2 L18.8 15.9" />
      </svg>
    ),
  },
  {
    target: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: (
      <svg {...svgBase(TEAL, 18)}>
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
      <svg {...svgBase(TEAL, 18)}>
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
      <svg {...svgBase(TEAL, 18)}>
        <path d="M4 14 V12 C4 7.6 7.6 4 12 4 C16.4 4 20 7.6 20 12 V14" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19 C19 20.5 17.5 21 15 21 H13" />
      </svg>
    ),
  },
];

function StatsStrip() {
  const $t = useCmsText();
  const STATS = useCmsData("WebsiteDevComparison__STATS", STATS__cms);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-20px_rgba(15,40,60,0.2)] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(4,minmax(0,1fr))] gap-6 lg:gap-0 items-center"
    >
      {/* Brand statement */}
      <div className="flex items-center gap-3 lg:pr-4 sm:col-span-2 lg:col-span-1">
        <span
          className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: DEEP_TEAL }}
        >
          <svg {...svgBase("#ffffff", 24)} strokeWidth={1.6}>
            <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
            <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
          </svg>
        </span>
        <div>
          <p className="flex items-center gap-1 text-[8px] font-bold tracking-[0.08em] uppercase mb-1 whitespace-nowrap" style={{ color: GOLD }}>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <path d="M1 7 L4 1 M6 7 L8 1 M10 7 L13 3" />
            </svg>
            {rich($t("WebsiteDevComparison__t1", "Don't just build websites."))}</p>
          <p className="text-body font-serif font-semibold">
            <span style={{ color: NAVY }}>{$t("WebsiteDevComparison__t2", "We build")}</span>
            <br />
            <span style={{ color: DEEP_TEAL }}>{$t("WebsiteDevComparison__t3", "growth engines.")}</span>
          </p>
        </div>
      </div>

      {/* Counters */}
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center text-center lg:border-l border-slate-100 lg:px-2">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="shrink-0 w-9 h-9 rounded-full bg-[#F1F4F6] flex items-center justify-center">{stat.icon}</span>
            <span className="text-xl font-extrabold tabular-nums" style={{ color: DEEP_TEAL }}>
              {inView ? <Counter target={stat.target} suffix={stat.suffix} /> : `0${stat.suffix}`}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 whitespace-nowrap">{stat.label}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function WebsiteDevComparison() {
  const $t = useCmsText();
  const ROWS = useCmsData("WebsiteDevComparison__ROWS", ROWS__cms);
  // 0 idle · 1 left card fades in (centred) · 2 slides left while right card + VS enter
  const [stage, setStage] = useState(0);
  const [shift, setShift] = useState("50%");

  return (
    <section className="relative w-full bg-[#F7F9F8] py-8 lg:py-10 overflow-hidden">
      {/* Background artwork — full width, never cropped (section is at least as tall as the image) */}
      <Image
        src={$t("WebsiteDevComparison__t4", "/diff-section.webp")}
        alt=""
        width={1740}
        height={904}
        sizes="100vw"
        className="absolute left-0 bottom-0 w-full h-auto pointer-events-none select-none"
        aria-hidden
      />
      <Container className="relative z-10 flex flex-col gap-8 lg:gap-10">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[2px]" style={{ backgroundColor: GOLD }} />
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              {rich($t("WebsiteDevComparison__t5", "Built Different. Built To Perform."))}</p>
          </div>

          <h2 className="text-h2 font-serif font-bold tracking-tight">
            <span style={{ color: NAVY }}>{$t("WebsiteDevComparison__t6", "Not All Websites ")}</span>
            <br className="md:hidden" />
            <span style={{ color: NAVY }}>{$t("WebsiteDevComparison__t7", "Are ")}</span>
            <span style={{ color: DEEP_TEAL }}>{$t("WebsiteDevComparison__t8", "Built The Same.")}</span>
          </h2>

          {/* brush underline */}
          <svg className="mt-2 mb-4 w-56 h-4" viewBox="0 0 220 16" fill="none" aria-hidden>
            <motion.path
              d="M3 12 C60 4 150 2 217 5"
              stroke={GOLD}
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>

          <p className="text-body text-slate-600">
            {rich($t("WebsiteDevComparison__t9", "Most agencies deliver what's expected."))}<br />
            {rich($t("WebsiteDevComparison__t10", "We deliver what drives "))}<span className="font-bold" style={{ color: DEEP_TEAL }}>{$t("WebsiteDevComparison__t11", "real results.")}</span>
          </p>
        </motion.div>

        {/* Comparison table
            Sequence: Most Agencies card fades in at the centre → glides left while
            the ProManage card glides in on the right → VS badge appears. */}
        <motion.div
          onViewportEnter={() => {
            if (stage > 0) return;
            setShift(window.matchMedia("(min-width: 768px)").matches ? "50%" : "0%");
            setStage(1);
          }}
          viewport={{ once: true, amount: 0.35 }}
          className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 items-stretch"
        >
          {/* Most Agencies */}
          <motion.div
            initial={{ opacity: 0, x: shift, y: 24, scale: 0.94 }}
            animate={
              stage === 0
                ? { opacity: 0, x: shift, y: 24, scale: 0.94 }
                : stage === 1
                ? { opacity: 1, x: shift, y: 0, scale: 1 }
                : { opacity: 1, x: "0%", y: 0, scale: 1 }
            }
            transition={
              stage === 1
                ? { x: { duration: 0 }, default: { duration: 0.5, ease: SMOOTH } }
                : { duration: 0.45, ease: SMOOTH, delay: 0 }
            }
            onAnimationComplete={() => {
              if (stage === 1) setStage(2);
            }}
            style={{ willChange: "transform, opacity" }}
            className="relative z-10 h-full flex flex-col bg-[#F3F5F7] rounded-2xl md:mr-3 border border-slate-200/70 overflow-hidden shadow-[0_20px_50px_-25px_rgba(15,40,60,0.25)]"
          >
            <div className={`${HEADER_H} flex items-center justify-center border-b border-slate-200/80`}>
              <h3 className="text-base font-bold" style={{ color: NAVY }}>{$t("WebsiteDevComparison__t12", "Most Agencies")}</h3>
            </div>
            <motion.ul
              variants={rowsVariants}
              initial="hidden"
              animate={stage >= 1 ? "show" : "hidden"}
              className="flex-1 px-5 py-2"
            >
              {ROWS.map(({ label, theirs, TheirIcon }, i) => (
                <motion.li
                  key={label}
                  variants={fadeRow}
                  className={`${ROW_H} flex items-center gap-3 ${i < ROWS.length - 1 ? "border-b border-slate-200/80" : ""}`}
                >
                  <span className="shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                    <TheirIcon />
                  </span>
                  <span className="w-[42%] text-[13px] font-semibold" style={{ color: NAVY }}>{label}</span>
                  <span className="flex items-center gap-1.5 text-[12px] text-slate-500 min-w-0">
                    <XMark />
                    <span className="truncate">{theirs}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ProManage Approach */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={stage >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.45, ease: SMOOTH, delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="relative h-full flex flex-col bg-white rounded-2xl md:ml-3 shadow-[0_25px_60px_-20px_rgba(15,60,70,0.3)] border border-slate-100 overflow-hidden"
          >
            <div
              className={`${HEADER_H} flex items-center justify-center`}
              style={{ background: `linear-gradient(135deg, ${TEAL} 0%, ${DEEP_TEAL} 100%)` }}
            >
              <h3 className="text-base font-bold text-white">{$t("WebsiteDevComparison__t13", "ProManage Approach")}</h3>
            </div>
            <motion.ul
              variants={rightRowsVariants}
              initial="hidden"
              animate={stage >= 2 ? "show" : "hidden"}
              className="flex-1 px-5 py-2"
            >
              {ROWS.map(({ title, text, OurIcon }, i) => (
                <motion.li
                  key={title}
                  variants={rightRow}
                  className={`${ROW_H} flex items-center gap-4 ${i < ROWS.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <CheckMark />
                  <motion.span
                    whileHover={{ scale: 1.1, rotate: -6 }}
                    className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center shadow-[0_6px_14px_-6px_rgba(15,92,86,0.6)]"
                    style={{ backgroundColor: DEEP_TEAL }}
                  >
                    <OurIcon />
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold leading-snug" style={{ color: DEEP_TEAL }}>{title}</span>
                    <span className="block text-[11px] text-slate-500 leading-snug mt-0.5">{text}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* VS badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={stage >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.4, ease: SMOOTH, delay: stage >= 2 ? 0.45 : 0 }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <motion.span
              animate={{ boxShadow: ["0 0 0 0 rgba(27,138,128,0.35)", "0 0 0 14px rgba(27,138,128,0)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-extrabold ring-4 ring-white"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("WebsiteDevComparison__t14", "VS")}</motion.span>
          </motion.div>
        </motion.div>

        <StatsStrip />
      </Container>
    </section>
  );
}
