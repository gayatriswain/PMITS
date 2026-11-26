"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const G_BLUE = "#4285F4";
const G_GREEN = "#34A853";
const G_YELLOW = "#FBBC05";
const G_RED = "#EA4335";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SEARCH_QUERY = "web design company near me";

// Same typing effect used in SeoHero.tsx — types the query once after a short delay, then stays.
function useTypingOnce(text: string, { typeMs = 40, startDelay = 500 } = {}) {
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

function Counter({ targetValue, duration = 2 }: { targetValue: string, duration?: number }) {
  const [countStr, setCountStr] = useState("0");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    const match = targetValue.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setCountStr(targetValue);
      return;
    }
    const num = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");
    
    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeProgress * num;
      
      if (isFloat) {
        setCountStr(currentCount.toFixed(1) + suffix);
      } else {
        setCountStr(Math.floor(currentCount) + suffix);
      }
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCountStr(targetValue);
      }
    };
    
    animationFrameId = requestAnimationFrame(animateCount);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView, targetValue, duration]);

  return <span ref={ref}>{countStr}</span>;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// A gentle, staggered reveal for the tabs / ad card / results once typing finishes — a pause
// first (lets the caret settle), then each piece eases in one after another instead of all
// popping in together.
const revealContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.25, delayChildren: 0.5 } },
};
const revealItem: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: EASE } },
};

function GoogleGIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill={G_BLUE} d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h11.9c-.5 2.8-2.1 5.1-4.4 6.7v5.5h7.1c4.2-3.8 6.5-9.5 6.5-16.3Z" />
      <path fill={G_GREEN} d="M24 46c5.9 0 10.9-2 14.5-5.2l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.2 15.4 46 24 46Z" />
      <path fill={G_YELLOW} d="M11.8 28.4c-.4-1.3-.7-2.7-.7-4.1s.2-2.8.7-4.1v-5.7H4.5C3 17.5 2.2 20.6 2.2 24s.8 6.5 2.3 9.4l7.3-5Z" />
      <path fill={G_RED} d="M24 10.7c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.4 2 8.1 6.8 4.5 14.2l7.3 5.7c1.7-5.2 6.5-9.2 12.2-9.2Z" />
    </svg>
  );
}

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={G_YELLOW}>
      <path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z" />
    </svg>
  );
}

type IconProps = { size?: number; color?: string };
const svgBase = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const TargetIcon = ({ size = 16, color = G_BLUE }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
  </svg>
);
const ReportIcon = ({ size = 16, color = G_BLUE }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);
const FunnelIcon = ({ size = 16, color = G_BLUE }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M4 4h16l-6 8v6l-4 2v-8Z" />
  </svg>
);
const UserIcon = ({ size = 16, color = G_BLUE }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c0-4 3.4-7 7.5-7s7.5 3 7.5 7" />
  </svg>
);
const UsersStatIcon = ({ size = 20, color = G_BLUE }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="9" cy="8" r="3.3" />
    <path d="M2.5 20c0-3.6 2.9-6.3 6.5-6.3s6.5 2.7 6.5 6.3" />
    <circle cx="17.5" cy="9" r="2.6" />
    <path d="M15.8 13.8c2.9.3 5.2 2.8 5.2 6.2" />
  </svg>
);
const ChartStatIcon = ({ size = 20, color = G_GREEN }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M4 20 V13 M9 20 V8 M14 20 V11 M19 20 V4" />
  </svg>
);
const CoinStatIcon = ({ size = 20, color = G_YELLOW }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9.5 9.3c0-1.3 1.1-2.3 2.5-2.3s2.5.8 2.5 2c0 2.7-5 1.5-5 4.2 0 1.2 1.1 2.1 2.5 2.1s2.5-1 2.5-2.3" />
  </svg>
);
const ClockStatIcon = ({ size = 20, color = "#9333ea" }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
const PhoneIcon = ({ size = 12, color = NAVY }: IconProps) => (
  <svg {...svgBase(size, color)} fill={color} stroke="none">
    <path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.5 21 3 13.5 3 4.5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1Z" />
  </svg>
);
const QuoteIcon = ({ size = 12, color = NAVY }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h4" />
  </svg>
);
const GlobeIcon = ({ size = 12, color = NAVY }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 4 5.7 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.7-4-9s1.5-6.5 4-9Z" />
  </svg>
);
const TrendUpIcon = ({ size = 14, color = G_GREEN }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M3 17 9 11 13 14 21 6" />
    <path d="M15 6h6v6" />
  </svg>
);
const PlayIcon = ({ size = 9 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const FEATURES__cms = [
  { label: "ROI Focused Campaigns", Icon: TargetIcon },
  { label: "Transparent Reporting", Icon: ReportIcon },
  { label: "Conversion Optimized", Icon: FunnelIcon },
  { label: "Dedicated Account Manager", Icon: UserIcon },
];

const STATS__cms = [
  { value: "250+", label: "Businesses Scaled", sub: "Across 20+ Industries", Icon: UsersStatIcon, tint: "#e8f0fe" },
  { value: "4.6X", label: "Average ROAS", sub: "Across All Campaigns", Icon: ChartStatIcon, tint: "#e6f4ea" },
  { value: "52%", label: "Lower Cost Per Lead", sub: "Through Optimization", Icon: CoinStatIcon, tint: "#fef7e0" },
  { value: "24/7", label: "Monitoring & Optimization", sub: "For Maximum Results", Icon: ClockStatIcon, tint: "#f3e8ff" },
];

function SearchMockup() {
  const $t = useCmsText();
  const typed = useTypingOnce(SEARCH_QUERY);
  const typingDone = typed.length === SEARCH_QUERY.length;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.25)]"
      >
        {/* Search bar — types the query out, then the ad card below appears */}
        <div className="flex items-center gap-3 mb-3">
          <GoogleGIcon size={22} />
          <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 px-3.5 py-2">
            <p className="text-small flex-1 min-w-0 truncate text-slate-600">
              {typed}
              <motion.span
                className="inline-block w-[1.5px] h-[13px] align-middle ml-0.5 bg-slate-500"
                animate={typingDone ? { opacity: 0 } : { opacity: [1, 1, 0, 0] }}
                transition={typingDone ? { duration: 0.3, delay: 0.6 } : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                aria-hidden
              />
            </p>
            <span className="text-slate-300 text-xs">✕</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G_BLUE} strokeWidth="1.8"><path d="M12 15a3.5 3.5 0 0 0 3.5-3.5V6a3.5 3.5 0 1 0-7 0v5.5A3.5 3.5 0 0 0 12 15Z" /><path d="M6 11a6 6 0 0 0 12 0M12 18v3" /></svg>
            <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#4285F4,#34A853,#FBBC05,#EA4335)" }} />
          </div>
        </div>

        <AnimatePresence>
          {typingDone && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="overflow-hidden"
            >
              <motion.div variants={revealContainer} initial="hidden" animate="show" className="pt-2">
              {/* Tabs */}
              <motion.div variants={revealItem} className="flex items-center gap-4 border-b border-slate-100 pb-2.5 mb-4 text-[11px] sm:text-[12px] text-slate-500 overflow-x-auto">
                <span className="font-semibold pb-2.5 -mb-[11px] border-b-2 whitespace-nowrap" style={{ color: G_BLUE, borderColor: G_BLUE }}>{$t("GoogleAdsHero__t1", "All")}</span>
                <span className="whitespace-nowrap">{$t("GoogleAdsHero__t2", "Maps")}</span>
                <span className="whitespace-nowrap">{$t("GoogleAdsHero__t3", "Images")}</span>
                <span className="whitespace-nowrap">{$t("GoogleAdsHero__t4", "News")}</span>
                <span className="whitespace-nowrap">{$t("GoogleAdsHero__t5", "Videos")}</span>
                <span className="whitespace-nowrap">{$t("GoogleAdsHero__t6", "More")}</span>
              </motion.div>

              {/* Sponsored ad card */}
              <motion.div variants={revealItem} className="relative w-[85%] sm:w-[72%] rounded-xl border border-slate-200 p-3.5 sm:p-4 bg-white z-10">
                <motion.div 
                  className="absolute inset-0 rounded-xl border-[1.5px] pointer-events-none" 
                  style={{ borderColor: G_BLUE }} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1.4, duration: 0.6 }} 
                />
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{$t("GoogleAdsHero__t7", "Sponsored")}</span>
                <div className="flex items-start gap-2.5 mt-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: G_BLUE }}>
                    <GlobeIcon size={14} color="#fff" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-small font-bold" style={{ color: G_BLUE }}>{rich($t("GoogleAdsHero__t8", "ProManage IT Solution"))}</p>
                    <p className="text-[11px] text-slate-500 truncate">{rich($t("GoogleAdsHero__t9", "www.promanageitsolution.com"))}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-[12px] font-semibold text-slate-700">{$t("GoogleAdsHero__t10", "5.0")}</span>
                  <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((s) => <StarIcon key={s} />)}</span>
                  <span className="text-[11px] text-slate-400">{$t("GoogleAdsHero__t11", "(120+ reviews)")}</span>
                </div>
                <p className="text-caption text-slate-500 mt-2">
                  {rich($t("GoogleAdsHero__t12", "Professional Web Design Services. Get a Free Consultation Today."))}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    <PhoneIcon /> {$t("GoogleAdsHero__t13", "Call Us")}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    <QuoteIcon /> {$t("GoogleAdsHero__t14", "Get Quote")}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-600">
                    <GlobeIcon /> {$t("GoogleAdsHero__t15", "Visit Website")}</span>
                </div>
              </motion.div>

              {/* Faded organic results underneath */}
              <div className="mt-4 space-y-3 opacity-50">
                {[0, 1].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-2.5 w-1/3 rounded-full bg-slate-200" />
                    <div className="h-2 w-full rounded-full bg-slate-100" />
                    <div className="h-2 w-4/5 rounded-full bg-slate-100" />
                  </div>
                ))}
              </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating "new lead" notification — appears just after the ad card does */}
      <AnimatePresence>
        {typingDone && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.6 }}
            className="absolute z-20 -right-3 sm:-right-6 bottom-10 sm:bottom-16 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-3 shadow-[0_20px_45px_-15px_rgba(15,23,42,0.35)] border border-slate-100"
          >
            {/* Animated Connecting Line */}
            <svg className="absolute bottom-[100%] right-[30px] sm:right-[50px] w-[90px] sm:w-[150px] h-[80px] sm:h-[130px] -z-10 overflow-visible" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
              <motion.path
                d="M0 0 L 60 0 Q 100 0 100 40 L 100 100"
                stroke={G_BLUE}
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2.2, duration: 0.8, ease: EASE }}
              />
              <motion.circle cx="0" cy="0" r="4" fill={G_BLUE} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.2 }} />
              <motion.circle cx="100" cy="100" r="4" fill={G_BLUE} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.9 }} />
            </svg>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f4ea" }}>
              <PhoneIcon size={14} color={G_GREEN} />
            </span>
            <div>
              <p className="text-caption font-bold" style={{ color: NAVY }}>{rich($t("GoogleAdsHero__t16", "New Lead"))}</p>
              <p className="text-[10.5px] text-slate-500 leading-tight">{rich($t("GoogleAdsHero__t17", "Phone Call"))}</p>
              <p className="text-[10px] text-slate-400 leading-tight">{rich($t("GoogleAdsHero__t18", "Just now"))}</p>
            </div>
            <TrendUpIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GoogleAdsHero() {
  const $t = useCmsText();
  const FEATURES = useCmsData("GoogleAdsHero__FEATURES", FEATURES__cms);
  const STATS = useCmsData("GoogleAdsHero__STATS", STATS__cms);
  return (
    <section className="relative w-full bg-white pt-10 pb-12 lg:pt-14 lg:pb-16 overflow-x-clip">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Left content */}
          <motion.div variants={container} initial="hidden" animate="show" className="relative z-10 max-w-xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-slate-200 pl-2.5 pr-4 py-1.5 mb-5">
              <GoogleGIcon size={16} />
              <span className="text-[11px] font-semibold text-slate-500">{$t("GoogleAdsHero__t19", "Google Partner")}</span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-semibold text-slate-500">{$t("GoogleAdsHero__t20", "5-Star Rated")}</span>
              <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((s) => <StarIcon key={s} size={10} />)}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-h1 font-serif font-bold tracking-tight mb-6" style={{ color: NAVY }}>
              {$t("GoogleAdsHero__t21", "Be Found.")}<br />
              {$t("GoogleAdsHero__t22", "Get ")}<span style={{ color: G_BLUE }}>{$t("GoogleAdsHero__t23", "More Customers.")}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-body text-slate-600 max-w-lg mb-8">
              {rich($t("GoogleAdsHero__t24", "We create high-performing Google Ads campaigns that put your business at the top of search results—driving qualified leads, more calls, and real revenue."))}</motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-9">
              <Link
                href={$t("GoogleAdsHero__t25", "/contact")}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-white text-[14px] font-semibold shadow-[0_15px_30px_-12px_rgba(66,133,244,0.6)] transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: G_BLUE }}
              >
                {$t("GoogleAdsHero__t26", "Get Free Google Ads Audit")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={$t("GoogleAdsHero__t27", "/portfolio")}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg bg-white border border-slate-300 text-[14px] font-semibold transition-colors hover:border-slate-400"
                style={{ color: NAVY }}
              >
                <span className="w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: NAVY }}>
                  <PlayIcon />
                </span>
                {$t("GoogleAdsHero__t28", "See Our Success Stories")}</Link>
            </motion.div>

            {/* Feature row */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-x-6 gap-y-3.5">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-2">
                  <f.Icon />
                  <span className="text-[12.5px] font-medium text-slate-600">{f.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <div className="relative lg:pl-6">
            <SearchMockup />
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-14 lg:mt-16 bg-white rounded-2xl border border-slate-100 shadow-[0_15px_40px_-25px_rgba(15,40,60,0.25)] p-6 lg:p-7 grid grid-cols-2 sm:grid-cols-4 gap-y-6 gap-x-4"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className={`flex items-center gap-3 px-2 ${i > 0 ? "sm:border-l border-slate-100" : ""}`}>
              <span className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center" style={{ backgroundColor: stat.tint }}>
                <stat.Icon />
              </span>
              <div>
                <p className="text-body font-bold" style={{ color: NAVY }}>
                  {stat.value === "24/7" ? stat.value : <Counter targetValue={stat.value} />}
                </p>
                <p className="text-caption font-semibold text-slate-700 mt-1">{stat.label}</p>
                <p className="text-[11px] text-slate-400">{stat.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
