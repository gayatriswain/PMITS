"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const GOLD = "#c99a3d";
const CREAM = "#FDF9F0";

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

const SparkleIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
    <path d="M12 2c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z" />
  </svg>
);
const LightbulbIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 2Z" />
  </svg>
);
const SearchIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const DesignPenIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <path d="m12 19 7-7 3 3-7 7-3-3Z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18" />
    <path d="m2 2 7.6 7.6" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);
const CodeIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
  </svg>
);
const RocketIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <path d="M14 4c4-1 7 2 6 6l-7 7-6-6Z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
    <path d="M7 11H4l3-4h4M13 17v3l4-4v-4M6 18l-2.5 2.5" />
  </svg>
);
const TrendingUpIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 20)}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 4h-5v5" />
  </svg>
);
const ArrowRightIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 18)} strokeWidth={2.4}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const HeartIcon = (p: { color?: string; size?: number }) => (
  <svg width={p.size ?? 14} height={p.size ?? 14} viewBox="0 0 24 24" fill={p.color ?? "currentColor"}>
    <path d="M12 20.5s-7-4.4-9.3-8.6C.9 8.6 1.6 5 4.5 3.6c2.2-1 4.7-.3 6 1.5l1.5 2 1.5-2c1.3-1.8 3.8-2.5 6-1.5 2.9 1.4 3.6 5 1.8 8.3-2.3 4.2-9.3 8.6-9.3 8.6Z" />
  </svg>
);
const ClockIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 15)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);
const NoObligationIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 15)}>
    <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
  </svg>
);
const NoSalesPitchIcon = (p: { color?: string; size?: number }) => (
  <svg {...svgBase(p.color ?? "currentColor", p.size ?? 15)}>
    <path d="M4 5 H20 V16 H9 L5 20 V16 H4 Z" />
    <path d="m8 15 8-8M16 15 8 7" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const LEFT_STEPS__cms = [
  { num: "1", label: "Idea", Icon: LightbulbIcon, desc: "We turn your idea into a clear roadmap." },
  { num: "2", label: "Discover", Icon: SearchIcon, desc: "Deep research to understand users, market & opportunities." },
  { num: "3", label: "Design", Icon: DesignPenIcon, desc: "Intuitive UX. Beautiful UI. Built for real people." },
];

const RIGHT_STEPS__cms = [
  { num: "4", label: "Build", Icon: CodeIcon, desc: "Clean code. Scalable architecture. Zero compromise on performance." },
  { num: "5", label: "Launch", Icon: RocketIcon, desc: "We launch, support and optimize for real-world success." },
  { num: "6", label: "Grow", Icon: TrendingUpIcon, desc: "We stay with you to scale, improve and grow continuously." },
];

const TRUST_BADGES__cms = [
  { Icon: ClockIcon, label: "30-min strategy call" },
  { Icon: NoObligationIcon, label: "No obligation" },
  { Icon: NoSalesPitchIcon, label: "No sales pitch" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const stepItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/* ------------------------------------------------------------------ */

function StepDot({ step, align }: { step: (typeof LEFT_STEPS__cms)[number]; align: "left" | "right" }) {
  return (
    <motion.div variants={stepItem} className={`flex flex-col items-center text-center w-[104px] sm:w-[120px] ${align === "left" ? "" : ""}`}>
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_10px_25px_-10px_rgba(15,40,60,0.25)] ring-1 ring-slate-100"
        style={{ color: DEEP_TEAL }}
      >
        <step.Icon color={DEEP_TEAL} size={22} />
      </span>
      <p className="text-[11px] font-bold uppercase tracking-wide mt-3" style={{ color: NAVY }}>
        {step.num}. {step.label}
      </p>
      <p className="text-[10.5px] text-slate-500 leading-snug mt-1.5">{step.desc}</p>
    </motion.div>
  );
}

// A dashed dip drawn as a real flex item sitting between two icons (or between an icon and the
// phone), so it only ever spans the actual gap it's placed in — never overshoots past the first
// or last icon the way an absolutely-positioned, width-guessed overlay would.
// No default top offset baked in — callers pass their own mt-* so it can match wherever the
// icon row it sits next to actually ends up (e.g. once that row is nudged down separately).
function Wave({ className = "flex-1 mt-7", flat = false }: { className?: string; flat?: boolean }) {
  return (
    <svg
      className={`hidden md:block ${className} h-6 self-start min-w-[24px]`}
      viewBox="0 0 100 24"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        d={flat ? "M0,4 L100,4" : "M0,4 C30,20 70,20 100,4"}
        stroke="#a9dcd2"
        strokeWidth="2"
        strokeDasharray="5 6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Center phone screen                                                 */
/* ------------------------------------------------------------------ */

function DiscoverScreen() {
  const $t = useCmsText();
  return (
    <div className="absolute inset-[3px] rounded-[30px] overflow-hidden bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-3 pb-1.5 text-[9px] font-semibold" style={{ color: NAVY }}>
        <span>{$t("AppDevProcess__t1", "9:41")}</span>
        <span className="w-3 h-2 rounded-sm border border-current" />
      </div>

      <div className="px-4 pb-2">
        <p className="text-[9px] text-slate-400">{rich($t("AppDevProcess__t2", "Good Morning"))}</p>
        <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("AppDevProcess__t3", "Discover what matters"))}</p>
      </div>

      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
        <SearchIcon color="#94a3b8" size={11} />
        <span className="text-[8.5px] text-slate-400">{$t("AppDevProcess__t4", "Search anything...")}</span>
      </div>

      <div className="px-4 mb-1 flex items-center justify-between">
        <p className="text-[9.5px] font-bold" style={{ color: NAVY }}>{rich($t("AppDevProcess__t5", "Recommended for you"))}</p>
        <p className="text-[7.5px] font-semibold" style={{ color: DEEP_TEAL }}>{rich($t("AppDevProcess__t6", "See all"))}</p>
      </div>
      <div className="px-4 mb-3 grid grid-cols-2 gap-2">
        {[{ n: $t("AppDevProcess__t7", "Minimal Chair"), tag: $t("AppDevProcess__t8", "New Decor") }, { n: $t("AppDevProcess__t9", "Table Lamp"), tag: $t("AppDevProcess__t10", "New Decor") }].map((it) => (
          <div key={it.n} className="rounded-xl bg-slate-50 p-2">
            <div className="relative h-12 w-full overflow-hidden rounded-lg mb-1.5 bg-slate-100">
              <Image src={$t("AppDevProcess__t11", "/83a9d1eb-da0f-4585-bf40-f9031fb7e5f1.png")} alt={it.n} fill className="object-cover" sizes="80px" />
            </div>
            <p className="text-[8px] font-bold truncate" style={{ color: NAVY }}>{it.n}</p>
            <p className="text-[6.5px] text-slate-400">{it.tag}</p>
          </div>
        ))}
      </div>

      <div className="px-4 mb-3">
        <p className="text-[9.5px] font-bold mb-2" style={{ color: NAVY }}>{rich($t("AppDevProcess__t12", "Categories"))}</p>
        <div className="flex items-center justify-between">
          {[$t("AppDevProcess__t13", "Home"), $t("AppDevProcess__t14", "Decor"), $t("AppDevProcess__t15", "Lighting"), $t("AppDevProcess__t16", "More")].map((c) => (
            <div key={c} className="flex flex-col items-center gap-1">
              <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: DEEP_TEAL }} />
              </span>
              <span className="text-[6.5px] text-slate-500">{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-4 mb-3 flex-1 overflow-hidden rounded-2xl p-3.5">
        <Image src={$t("AppDevProcess__t17", "/db67c28c-d876-48dc-bd73-fcdea87c15cb.png")} alt="" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(100deg, ${DEEP_TEAL} 40%, transparent 95%)` }} />
        <p className="relative text-[8px] font-semibold uppercase tracking-wide text-white/70">{rich($t("AppDevProcess__t18", "Summer Sale"))}</p>
        <p className="text-caption relative font-bold text-white mt-1">{rich($t("AppDevProcess__t19", "Up to 40% Off"))}</p>
        <span className="relative inline-block mt-2 rounded-full bg-white px-2.5 py-1 text-[8px] font-bold" style={{ color: DEEP_TEAL }}>{$t("AppDevProcess__t20", "Shop Now")}</span>
      </div>

      <div className="mt-auto flex items-center justify-around border-t border-slate-100 px-1 pt-2 pb-3">
        {[$t("AppDevProcess__t21", "Home"), $t("AppDevProcess__t22", "Categories"), $t("AppDevProcess__t23", "Cart"), $t("AppDevProcess__t24", "Wishlist"), $t("AppDevProcess__t25", "Profile")].map((l, i) => (
          <span key={l} className="text-[6px] font-semibold" style={{ color: i === 0 ? DEEP_TEAL : "#cbd5e1" }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function AppDevProcess() {
  const $t = useCmsText();
  const LEFT_STEPS = useCmsData("AppDevProcess__LEFT_STEPS", LEFT_STEPS__cms);
  const RIGHT_STEPS = useCmsData("AppDevProcess__RIGHT_STEPS", RIGHT_STEPS__cms);
  const TRUST_BADGES = useCmsData("AppDevProcess__TRUST_BADGES", TRUST_BADGES__cms);
  return (
    <section className="relative w-full bg-white py-14 lg:py-20 overflow-x-clip">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center mb-16 lg:mb-20"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase mb-5"
            style={{ borderColor: "#e8d9b8", backgroundColor: CREAM, color: GOLD }}
          >
            <SparkleIcon color={GOLD} size={12} />
            {$t("AppDevProcess__t26", "Let's Build What's Next")}</span>
          <h2 className="text-h2 font-serif font-bold" style={{ color: NAVY }}>
            {$t("AppDevProcess__t27", "The Next App They'll Love.")}<br />
            <span style={{ color: TEAL }}>{$t("AppDevProcess__t28", "It Starts With You.")}</span>
          </h2>
          <p className="text-body text-slate-500 max-w-lg mt-4">
            {rich($t("AppDevProcess__t29", "You bring the vision. We'll handle everything else to turn it into a powerful digital product."))}</p>
        </motion.div>

        {/* Process timeline + phone */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative flex flex-col lg:flex-row items-center lg:items-start justify-center gap-y-10 mt-6 lg:mt-10"
        >
          <div className="flex items-start justify-center mt-8 lg:mt-12">
            {LEFT_STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                <StepDot step={s} align="left" />
                {i < LEFT_STEPS.length - 1 && <Wave className="w-16 lg:w-20 -mx-2 mt-7" />}
              </React.Fragment>
            ))}
          </div>

          <Wave className="w-12 lg:w-16 -mx-4 mt-[60px] lg:mt-[76px]" />

          {/* Phone — kept compact so it sits inline with the icon row, not oversized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative z-10 mx-1 shrink-0"
          >
            {/* faint soft glow behind the phone */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[220px] w-[220px] rounded-full pointer-events-none"
              style={{ backgroundColor: "#F1F5F4" }}
              aria-hidden
            />

            <div
              className="relative z-10 w-[200px] sm:w-[220px] aspect-[9/19] rounded-[34px] bg-[#0b0f1a] shadow-[0_25px_50px_-20px_rgba(15,23,42,0.45)] p-2"
              style={{ border: "2px solid #1e2534" }}
            >
              <span className="absolute left-1/2 top-2 -translate-x-1/2 z-30 h-3.5 w-16 rounded-full bg-[#0b0f1a]" />
              <DiscoverScreen />
            </div>
          </motion.div>

          <Wave className="w-12 lg:w-16 -mx-4 mt-[60px] lg:mt-[76px]" />

          <div className="flex items-start justify-center mt-8 lg:mt-12">
            {RIGHT_STEPS.map((s, i) => (
              <React.Fragment key={s.num}>
                {i > 0 && <Wave className="w-16 lg:w-20 -mx-2 mt-7" />}
                <StepDot step={s} align="right" />
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Bottom banner — one unified card, phone poking up through the top edge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative z-0 -mt-16 lg:-mt-24 w-full rounded-[28px] border border-slate-100 shadow-[0_20px_50px_-30px_rgba(15,40,60,0.25)] overflow-visible"
          style={{ background: `linear-gradient(135deg, ${CREAM}, #F9FAF9)` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-10 lg:gap-0 p-8 lg:p-10">
            {/* Left */}
            <div className="flex flex-col justify-center lg:pr-10 lg:border-r border-slate-200/80">
              <h3 className="text-h4 font-serif font-bold" style={{ color: NAVY }}>
                {$t("AppDevProcess__t30", "From an idea in your mind")}<br />
                to <span className="relative" style={{ color: TEAL }}>
                  {$t("AppDevProcess__t31", "millions in their hands.")}<svg className="absolute -bottom-1.5 left-0 w-full h-2" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none" aria-hidden>
                    <path d="M2 8 Q 100 -2 198 8" stroke={GOLD} strokeWidth="2.5" fill="none" />
                  </svg>
                </span>
              </h3>
              <p className="text-small text-slate-500 mt-3 max-w-sm">
                {rich($t("AppDevProcess__t32", "We've helped startups and enterprises launch apps that users love and businesses rely on."))}</p>
            </div>

            {/* Center: button + caption */}
            <div className="relative flex flex-col items-center justify-center px-10 lg:px-16 lg:border-r border-slate-200/80">
              <div className="relative z-20 flex flex-col items-center mt-10 lg:mt-14">
                <Link
                  href={$t("AppDevProcess__t33", "/contact")}
                  aria-label="Take the first step"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-white shadow-[0_15px_30px_-10px_rgba(15,92,86,0.6)] transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: DEEP_TEAL }}
                >
                  <ArrowRightIcon color="#fff" size={20} />
                </Link>
                <div className="relative mt-2 text-center">
                  <p className="font-serif italic text-[11.5px] leading-snug max-w-[140px]" style={{ color: GOLD }}>
                    {rich($t("AppDevProcess__t34", "Take the first step towards your next big success."))}</p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center lg:pl-10">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-7 w-7 rounded-full ring-2 ring-white overflow-hidden relative bg-slate-200">
                      <Image src={$t("AppDevProcess__t35", "/image1.jpg")} alt={$t("AppDevProcess__t36", "Client")} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500">
                  <span className="font-bold" style={{ color: NAVY }}>{$t("AppDevProcess__t37", "50+ businesses")}</span> {rich($t("AppDevProcess__t38", "transformed with ProManage"))}</p>
              </div>

              <h3 className="text-h6 font-bold" style={{ color: NAVY }}>{$t("AppDevProcess__t39", "Let's Build Your Success Story")}</h3>

              <Link
                href={$t("AppDevProcess__t40", "/contact")}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-3 text-[13px] font-semibold text-white shadow-lg shadow-teal-900/20 transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: DEEP_TEAL }}
              >
                {$t("AppDevProcess__t41", "Start Your Project ")}<ArrowRightIcon color="#fff" size={15} />
              </Link>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex items-center gap-1.5">
                    <b.Icon color={DEEP_TEAL} size={13} />
                    <span className="text-[10.5px] text-slate-500 font-medium whitespace-nowrap">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-8"
        >
          <HeartIcon color="#cbd5e1" size={13} />
          {rich($t("AppDevProcess__t42", "Trusted by "))}<span className="font-semibold" style={{ color: TEAL }}>{$t("AppDevProcess__t43", "ambitious brands")}</span> worldwide
        </motion.p>
      </Container>
    </section>
  );
}
