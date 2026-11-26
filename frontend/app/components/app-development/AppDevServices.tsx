"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { Counter } from "../shared/useCountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";

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

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const AppleIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 22} height={p.size ?? 22} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
    <path d="M16.7 1c.1 1.2-.4 2.4-1.1 3.3-.7.9-1.9 1.6-3 1.5-.1-1.2.4-2.5 1.1-3.3.8-.9 2.1-1.5 3-1.5ZM20.9 17c-.6 1.3-.9 1.9-1.6 3-1 1.6-2.5 3.6-4.3 3.6-1.6 0-2-1-4.1-1s-2.6 1-4.2 1c-1.8 0-3.2-1.8-4.2-3.4C.1 16.7-.5 12 1.3 9.1c1-1.5 2.6-2.5 4.3-2.5 1.7 0 2.7 1.1 4.1 1.1s2.4-1.1 4.1-1.1c1.5 0 3 .8 4.1 2.2-3.6 2-3 7 2 8.2Z" />
  </svg>
);
const AndroidIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <rect x="5" y="8" width="14" height="11" rx="2" />
    <path d="M9 4 7.5 6M15 4l1.5 2M9 12v3M15 12v3M4 10v5M20 10v5" />
  </svg>
);
const LayersIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </svg>
);
const PaletteIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a4 4 0 0 0 4-4c0-4.4-3.6-8.2-8-8.2Z" />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="10.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="7.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const CloudApiIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M7 18h10a4 4 0 0 0 .5-8 6 6 0 0 0-11.6 1.7A3.5 3.5 0 0 0 7 18Z" />
  </svg>
);
const ShieldCheckIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
    <path d="M8.5 12 L11 14.5 L15.5 9.5" />
  </svg>
);
const ChartIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 4h-5v5" />
  </svg>
);
const UserFocusIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);
const CodeIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
  </svg>
);
const RocketIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 22)}>
    <path d="M14 4c4-1 7 2 6 6l-7 7-6-6Z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
    <path d="M7 11H4l3-4h4M13 17v3l4-4v-4M6 18l-2.5 2.5" />
  </svg>
);
const SmileyIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 10h.01M15.5 10h.01" strokeWidth="2.6" />
    <path d="M8 15c1.2 1.2 2.6 1.8 4 1.8s2.8-.6 4-1.8" />
  </svg>
);
const StarIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
    <path d="m12 2.5 3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.3 3.3 1.2-6.9-5-4.9 7-1Z" />
  </svg>
);
const GlobeIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SERVICES__cms = [
  { Icon: AppleIcon, title: "iOS App Development", desc: "High-performance iOS apps crafted for speed, security and an exceptional user experience." },
  { Icon: AndroidIcon, title: "Android App Development", desc: "Feature-rich Android apps that are powerful, scalable and built to reach billions of users." },
  { Icon: LayersIcon, title: "Cross-Platform Apps", desc: "One codebase. Any platform. Faster time to market with seamless cross-platform solutions." },
  { Icon: PaletteIcon, title: "UI/UX Design", desc: "Beautiful, intuitive designs that engage users and turn ideas into delightful experiences." },
  { Icon: CloudApiIcon, title: "Backend & APIs", desc: "Robust backends and secure APIs that power your app, integrations and scale." },
  { Icon: ShieldCheckIcon, title: "Testing & Quality", desc: "Rigorous testing for performance, security and a bug-free experience your users will love." },
];

const STATS__cms = [
  { target: 120, suffix: "+", label: "Apps Delivered", sub: "Across industries worldwide", Icon: RocketIcon },
  { target: 98, suffix: "%", label: "Client Satisfaction", sub: "Long-term relationships built on trust", Icon: SmileyIcon },
  { target: 4.9, suffix: "/5", label: "Average Rating", sub: "Consistently rated high by our clients", Icon: StarIcon },
  { target: 15, suffix: "+", label: "Industries Served", sub: "Delivering solutions that create impact", Icon: GlobeIcon },
];

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/* Floating badge (over the phone image)                              */
/* ------------------------------------------------------------------ */

function FloatingBadge({
  Icon,
  label,
  sub,
  className,
  delay = 0,
  floatDuration = 3.2,
}: {
  Icon: (p: { color?: string; size?: number }) => React.JSX.Element;
  label: string;
  sub?: string;
  className: string;
  delay?: number;
  floatDuration?: number;
}) {
  return (
    // Outer: one-time entrance (fade/scale in on scroll). Inner: continuous gentle up-down float, forever.
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, delay, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2.5 rounded-2xl bg-white/55 backdrop-blur-lg px-3.5 py-3 shadow-[0_15px_35px_-15px_rgba(15,40,60,0.3)] ring-1 ring-white/60 border border-white/40"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
          <Icon color={DEEP_TEAL} size={17} />
        </span>
        <span className="text-[11px] font-bold leading-tight whitespace-nowrap" style={{ color: NAVY }}>
          {label}
          {sub && (
            <>
              <br />
              <span className="font-semibold text-slate-400">{sub}</span>
            </>
          )}
        </span>
      </motion.div>
    </motion.div>
  );
}

function StatsBar() {
  const STATS = useCmsData("AppDevServices__STATS", STATS__cms);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1 w-full">
      {STATS.map((stat, i) => (
        <div key={stat.label} className={`flex items-start gap-3 ${i > 0 ? "lg:border-l lg:pl-6 border-slate-100" : ""}`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
            <stat.Icon color={DEEP_TEAL} size={19} />
          </span>
          <div>
            <p className="text-body font-bold tabular-nums" style={{ color: DEEP_TEAL }}>
              {inView
                ? Number.isInteger(stat.target)
                  ? <Counter target={stat.target} suffix={stat.suffix} />
                  : `${stat.target}${stat.suffix}`
                : `0${stat.suffix}`}
            </p>
            <p className="text-caption font-semibold text-slate-700 mt-1.5">{stat.label}</p>
            <p className="text-[10.5px] text-slate-400 leading-snug mt-0.5 max-w-[140px]">{stat.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function AppDevServices() {
  const $t = useCmsText();
  const SERVICES = useCmsData("AppDevServices__SERVICES", SERVICES__cms);
  return (
    <section className="relative w-full bg-[#F7F9FA] py-14 lg:py-20 overflow-x-clip">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: TEAL }} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: TEAL }}>{$t("AppDevServices__t1", "App Development Services")}</span>
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: TEAL }} />
          </div>
          <h2 className="text-h2 font-serif font-bold" style={{ color: NAVY }}>
            {$t("AppDevServices__t2", "Powerful Apps.")}<br />
            {$t("AppDevServices__t3", "Seamless Experiences.")}<br />
            <span style={{ color: TEAL }}>{$t("AppDevServices__t4", "Built For Growth.")}</span>
          </h2>
          <p className="text-body text-slate-500 max-w-xl mt-4">
            {rich($t("AppDevServices__t5", "From idea to launch and beyond, we build high-performance mobile apps that engage users, streamline operations, and drive measurable business success."))}</p>
        </motion.div>

        {/* Phone image + services grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-8 items-start mb-0">
          {/* Left: phone visual with floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative mx-auto w-full max-w-[600px] aspect-[1393/1129]"
          >
            <Image
              src={$t("AppDevServices__t6", "/app-dev-3-section.webp")}
              alt={$t("AppDevServices__t7", "ProManage-built ecommerce app running on a phone")}
              fill
              className="object-contain object-bottom"
              sizes="(min-width: 1024px) 600px, 80vw"
              priority
            />

            <FloatingBadge Icon={ChartIcon} label={$t("AppDevServices__t8", "Performance")} sub="Optimized" className="left-[-6%] top-[38%] sm:left-[-4%]" delay={0.2} floatDuration={3} />
            <FloatingBadge Icon={UserFocusIcon} label={$t("AppDevServices__t9", "User")} sub="Focused" className="right-[2%] top-[42%] sm:right-[6%]" delay={0.35} floatDuration={3.6} />
            <FloatingBadge Icon={ShieldCheckIcon} label={$t("AppDevServices__t10", "Secure &")} sub="Reliable" className="left-[-2%] bottom-[16%] sm:left-[2%]" delay={0.5} floatDuration={3.3} />
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
              className="absolute right-[8%] bottom-[26%] z-20 flex h-11 w-11 items-center justify-center rounded-full shadow-[0_12px_25px_-10px_rgba(15,92,86,0.6)]"
              style={{ backgroundColor: DEEP_TEAL, color: "#fff" }}
            >
              <CodeIcon color="#fff" size={18} />
            </motion.span>
          </motion.div>

          {/* Right: services grid */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={cardItem}
                className="group flex flex-col rounded-2xl bg-white p-5 border border-slate-100 shadow-[0_10px_30px_-20px_rgba(15,40,60,0.25)] transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(15,92,86,0.3)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
                  <s.Icon color={DEEP_TEAL} size={22} />
                </span>
                <h3 className="text-[14px] font-bold mb-1.5" style={{ color: NAVY }}>{s.title}</h3>
                <p className="text-caption text-slate-500 flex-1">{s.desc}</p>
                <Link
                  href={$t("AppDevServices__t11", "/contact")}
                  aria-label={`Learn more about ${s.title}`}
                  className="mt-4 flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 transition-colors group-hover:border-transparent group-hover:text-white"
                  style={{ color: DEEP_TEAL }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DEEP_TEAL; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <ArrowIcon />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom banner: CTA + stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-10 w-full mt-6 lg:mt-8 overflow-hidden bg-white rounded-[24px] border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] flex flex-col lg:flex-row items-stretch"
        >
          {/* Light mint layer behind the card — peeks out above/below the card's own pointed edge */}
          <div
            className="hidden lg:block absolute inset-y-0 z-0 w-[75px] pointer-events-none"
            style={{
              left: 240,
              background: "linear-gradient(160deg, #7fc4b8, #d7f0ea)",
              clipPath: "polygon(0% 0%, 40% 0%, 100% 50%, 40% 100%, 0% 100%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex items-center gap-4 p-6 lg:w-[300px] lg:pr-10 shrink-0">
            {/* Card's own pointed edge on large screens; a plain rectangle below that */}
            <div
              className="absolute inset-0 lg:[clip-path:polygon(0%_0%,85%_0%,100%_50%,85%_100%,0%_100%)]"
              style={{ background: `linear-gradient(135deg, ${DEEP_TEAL}, #09312c)` }}
              aria-hidden
            />
            <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <RocketIcon color="#fff" size={22} />
            </span>
            <div className="relative z-10">
              <h3 className="text-[15px] font-bold text-white leading-snug">{$t("AppDevServices__t12", "Have an App Idea?")}</h3>
              <p className="text-[11px] text-white/70 leading-relaxed mt-1 mb-3">
                {rich($t("AppDevServices__t13", "We turn your idea into a powerful mobile experience that drives real impact."))}</p>
              <Link
                href={$t("AppDevServices__t14", "/contact")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11px] font-bold"
                style={{ color: DEEP_TEAL }}
              >
                {$t("AppDevServices__t15", "Let's Build Together ")}<ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="relative flex-1 flex items-center px-6 py-6 lg:py-0 lg:pl-14">
            <StatsBar />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
