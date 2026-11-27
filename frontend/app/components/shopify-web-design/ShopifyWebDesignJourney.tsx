"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

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

const CheckIcon = ({ size = 12, color = "#fff" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Same floating-group helper used by WebsiteDevApproach.tsx's isometric step icons.
const float = (distance = 4, duration = 3, delay = 0) => ({
  animate: { y: [0, -distance, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* Arrow connector shown between step cards on lg screens */
const ConnectorArrow = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full bg-white shadow border border-slate-100"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, type: "spring", stiffness: 260 }}
  >
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </motion.div>
);


const StarShape = ({ cx, cy, scale = 1, delay = 0 }: { cx: number; cy: number; scale?: number; delay?: number }) => (
  <motion.path
    d="M12 2.5 14.9 8.6 21.5 9.3 16.6 13.8 18 20.4 12 17 6 20.4 7.4 13.8 2.5 9.3 9.1 8.6Z"
    fill="#f59e0b"
    transform={`translate(${cx - 12 * scale} ${cy - 12 * scale}) scale(${scale})`}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay, type: "spring", stiffness: 300 }}
    style={{ transformOrigin: `${cx}px ${cy}px` }}
  />
);

/* ------------------------------------------------------------------ */
/* Step illustrations: flat browser mockup + floating badge icon        */
/* ------------------------------------------------------------------ */

/** Shared browser mockup shell */
function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#f1f5f9] border-b border-slate-200">
        <div className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
        <div className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
        <div className="w-2 h-2 rounded-full bg-[#e2e8f0]" />
        <div className="ml-2 flex-1 h-3 bg-[#e2e8f0] rounded-full max-w-[80px]" />
      </div>
      {/* Page content */}
      <div className="p-3">{children}</div>
    </div>
  );
}

/* 01 — Product grid page + magnifier badge */
function LandIcon() {
  return (
    <div className="relative w-full mb-2">
      <BrowserShell>
        {/* Two products side by side */}
        <div className="flex gap-2">
          {/* T-shirt */}
          <div className="flex-1 bg-[#eef1f4] rounded-lg py-3 flex items-center justify-center">
            <svg viewBox="0 0 40 36" className="w-10 h-9" fill="none">
              <path d="M14 4 L6 8 L10 14 L14 12 L14 32 L26 32 L26 12 L30 14 L34 8 L26 4 C26 4 23 7 20 7 C17 7 14 4 14 4Z" fill="#c8d3dc" />
            </svg>
          </div>
          {/* Shoe/Sneaker */}
          <div className="flex-1 bg-[#eef1f4] rounded-lg py-3 flex items-center justify-center">
            <svg viewBox="0 0 44 28" className="w-11 h-7" fill="none">
              <path d="M4 20 C4 20 8 10 16 10 L22 10 L28 6 C30 5 33 6 33 8 L33 10 L38 12 C41 13 42 16 40 18 L38 20 C36 22 8 23 6 22 C4 21 4 20 4 20Z" fill="#c8d3dc"/>
              <path d="M16 10 L22 10 L22 14 L16 14Z" fill="#b0bec8" opacity="0.6"/>
              <path d="M22 10 L28 6 L30 9 L24 13Z" fill="#b0bec8" opacity="0.5"/>
            </svg>
          </div>
        </div>
      </BrowserShell>
      {/* Floating badge — magnifier */}
      <motion.div
        className="absolute -bottom-3 -right-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
        style={{ background: TEAL }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
      </motion.div>
    </div>
  );
}

/* 02 — Product detail page + question-mark speech bubble badge */
function FindIcon() {
  return (
    <div className="relative w-full mb-2">
      <BrowserShell>
        {/* product detail layout */}
        <div className="flex gap-2 mb-2">
          <div className="w-10 h-12 bg-[#e9eef3] rounded-md flex items-center justify-center shrink-0">
            <div className="w-6 h-8 bg-[#c8d3dc] rounded-sm" />
          </div>
          <div className="flex flex-col gap-1 flex-1 justify-center">
            <div className="h-1.5 bg-[#e9eef3] rounded w-full" />
            <div className="h-1.5 bg-[#e9eef3] rounded w-3/4" />
            <div className="h-1.5 bg-[#e9eef3] rounded w-1/2" />
          </div>
        </div>
        <div className="h-1.5 bg-[#e9eef3] rounded w-full" />
      </BrowserShell>
      {/* Floating badge — question mark bubble */}
      <motion.div
        className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
        style={{ background: TEAL }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3" strokeWidth="2" />
          <circle cx="12" cy="15" r="0.5" fill="#fff" stroke="#fff" strokeWidth="1" />
        </svg>
      </motion.div>
    </div>
  );
}

/* 03 — Reviews/trust page + shield-check badge */
function TrustIcon() {
  return (
    <div className="relative w-full mb-2">
      <BrowserShell>
        {/* star rating row */}
        <div className="flex gap-0.5 mb-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i < 4 ? "#f59e0b" : "#e2e8f0"}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        {/* text lines */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 bg-[#e9eef3] rounded w-full" />
          <div className="h-1.5 bg-[#e9eef3] rounded w-5/6" />
          <div className="h-1.5 bg-[#e9eef3] rounded w-4/6" />
        </div>
      </BrowserShell>
      {/* Floating badge — shield check */}
      <motion.div
        className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
        style={{ background: TEAL }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </motion.div>
    </div>
  );
}

/* 04 — Checkout page + shopping cart badge */
function BuyIcon() {
  return (
    <div className="relative w-full mb-2">
      <BrowserShell>
        {/* checkout form lines */}
        <div className="flex flex-col gap-1.5 mb-2">
          <div className="h-2 bg-[#e9eef3] rounded w-full" />
          <div className="h-2 bg-[#e9eef3] rounded w-full" />
          <div className="h-2 bg-[#e9eef3] rounded w-3/4" />
        </div>
        {/* CTA button */}
        <div className="h-2.5 rounded w-1/2" style={{ background: TEAL, opacity: 0.25 }} />
      </BrowserShell>
      {/* Floating badge — cart */}
      <motion.div
        className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md"
        style={{ background: TEAL }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </motion.div>
    </div>
  );
}

const BagIcon = ({ size = 28, color = "#fff" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6.5 8.5 5 20.5a1.5 1.5 0 0 0 1.5 1.7h11a1.5 1.5 0 0 0 1.5-1.7l-1.5-12Z" fill={color} />
    <path d="M9 8.5V6.8a3 3 0 0 1 6 0v1.7" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const MailIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const StarSparkIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" />
  </svg>
);
const TagIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
  </svg>
);
const ClockIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const BarChartIcon = ({ size = 16, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
    <polyline points="5 8 10 5 15 9 20 4" strokeWidth="1.6" />
    <polyline points="17 4 20 4 20 7" strokeWidth="1.6" />
  </svg>
);

const STEPS__cms = [
  {
    n: "01",
    title: "LAND",
    q: "Can't find the product?",
    desc: "Confusing menus and clutter drive them away.",
    fix: "Better navigation",
    Icon: LandIcon,
  },
  {
    n: "02",
    title: "FIND",
    q: "Too much information?",
    desc: "Poor structure makes it hard to decide.",
    fix: "Better product hierarchy",
    Icon: FindIcon,
  },
  {
    n: "03",
    title: "TRUST",
    q: "Don't trust the store?",
    desc: "Missing trust signals create doubt.",
    fix: "Stronger credibility",
    Icon: TrustIcon,
  },
  {
    n: "04",
    title: "BUY",
    q: "Checkout complicated?",
    desc: "Extra steps and unexpected costs kill sales.",
    fix: "Reduced friction",
    Icon: BuyIcon,
  },
];

const REVIEW_FEATURES__cms = [
  { label: "Free Expert Review", Icon: TagIcon },
  { label: "Actionable Insights", Icon: ClockIcon },
  { label: "Increase Sales & Conversions", Icon: BarChartIcon },
];

// Double-chevron connector between step cards — same as WebsiteDevApproach.tsx's Chevron.
function Chevron() {
  return (
    <motion.div variants={fadeUp} className="hidden lg:flex items-center justify-center w-6 shrink-0 self-center" aria-hidden>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 6 11 12 6 18" />
        <polyline points="13 6 18 12 13 18" />
      </svg>
    </motion.div>
  );
}

export default function ShopifyWebDesignJourney() {
  const $t = useCmsText();
  const STEPS = useCmsData("ShopifyWebDesignJourney__STEPS", STEPS__cms);
  const REVIEW_FEATURES = useCmsData("ShopifyWebDesignJourney__REVIEW_FEATURES", REVIEW_FEATURES__cms);
  return (
    <section className="relative w-full bg-white py-10 sm:py-12 lg:py-14 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="absolute -left-2 top-0 hidden sm:inline-flex text-slate-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4 8 8M4 12h6M4 20l4-4" /></svg>
          </span>
          <span className="absolute -right-2 top-2 hidden sm:inline-flex" style={{ color: TEAL }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 8c4-4 10-4 14 1M19 9V4M19 9h-5" /></svg>
          </span>

          <div className="inline-flex items-center gap-1.5 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill={TEAL}><path d="M12 2c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" /></svg>
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>{html($t("ShopifyWebDesignJourney__t1", "The Shopper Journey"))}</span>
          </div>

          <h2 className="text-h2 font-serif font-bold" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignJourney__t2m", "Your Store Shouldn't Make <span class=\"text-[#0d9488]\">Customers Think.</span>"))}</h2>
          <p className="text-body text-slate-500 mt-4 max-w-lg mx-auto">
            {rich($t("ShopifyWebDesignJourney__t4", "We remove friction at every step of the buying journey—so customers can find what they need, trust your store, and buy with confidence."))}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 lg:gap-0 relative items-stretch">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.n}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                {/* Card */}
                <div className="mx-2 rounded-2xl border border-slate-100 bg-white shadow-[0_8px_32px_-8px_rgba(15,40,60,0.12)] p-5 flex flex-col h-full">
                  
                  {/* Step number — top left, teal, bold */}
                  <span className="text-[22px] font-black mb-3" style={{ color: TEAL }}>{step.n}</span>

                  {/* Illustration with bottom padding for badge */}
                  <div className="mb-5 mt-1 pb-2">
                    <step.Icon />
                  </div>

                  {/* Title in teal */}
                  <h3 className="text-[14px] font-black tracking-wider uppercase mb-2" style={{ color: TEAL }}>
                    {step.title}
                  </h3>

                  {/* Question — bold dark */}
                  <p className="text-small font-bold text-center" style={{ color: NAVY }}>
                    {step.q}
                  </p>

                  {/* Description — gray */}
                  <p className="text-caption text-slate-400 mt-2 text-center flex-1">
                    {step.desc}
                  </p>

                  {/* Bottom fix pill */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold" style={{ backgroundColor: "#e6f6f4", color: TEAL }}>
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: TEAL }}>
                        <CheckIcon size={8} />
                      </span>
                      {step.fix}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Dashed arrow between cards */}
              {i < STEPS.length - 1 && (
                <motion.div
                  className="hidden lg:flex items-center justify-center w-8 shrink-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                >
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <line x1="0" y1="8" x2="24" y2="8" stroke={TEAL} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    <polyline points="20,4 28,8 20,12" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                  </svg>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 lg:mt-12 rounded-2xl bg-[#f7fbfa] border border-slate-100 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8"
        >
          <div className="relative shrink-0 flex h-32 w-32 items-center justify-center">
            <img src={$t("ShopifyWebDesignJourney__t5", "/shopify2.webp")} alt={$t("ShopifyWebDesignJourney__t6", "Shopify")} className="w-full h-full object-contain" />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-h6 font-bold" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignJourney__t7m", "Not sure what's holding <span class=\"text-[#0d9488]\">your store back?</span>"))}</h3>
            <p className="text-small text-slate-500 mt-1.5 max-w-md mx-auto lg:mx-0">
              {rich($t("ShopifyWebDesignJourney__t9", "Get a free Shopify store review and see exactly where you're losing sales."))}</p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mt-4">
              {REVIEW_FEATURES.map((f) => (
                <span key={f.label} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: "#e6f6f4" }}>
                    <f.Icon size={16} color={TEAL} />
                  </span>
                  <span className="text-[12.5px] font-semibold text-slate-600 leading-tight max-w-[90px]">{f.label}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <Link
              href={$t("ShopifyWebDesignJourney__t10", "/contact")}
              className="group inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_15px_30px_-12px_rgba(15,92,86,0.6)] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("ShopifyWebDesignJourney__t11", "Get Free Store Review")}<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <span key={i} className="h-6 w-6 rounded-full ring-2 ring-white bg-slate-200" />
                ))}
              </div>
              <span className="text-[11px] text-slate-500">{html($t("ShopifyWebDesignJourney__t12", "Loved by 100+ store owners"))}</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
