"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { BarChart3, Code2, Flag, PenTool, Rocket, Search, type LucideIcon } from "lucide-react";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const CYAN = "#14b8c4";
const EASE = [0.16, 1, 0.3, 1] as const;

const STEP_ICONS: LucideIcon[] = [Search, Flag, PenTool, Code2, Rocket, BarChart3];

/** Steps on the podium strip (text editable in the CMS; icons follow the order). */
const steps__cms = [{ label: "Research" }, { label: "Strategy" }, { label: "Design" }, { label: "Development" }, { label: "Launch" }, { label: "Growth" }];

/** "+230%" -> counts up from 0 to 230 keeping the prefix/suffix; anything without a number is shown as is. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (reduce) {
      el.textContent = value;
      return;
    }
    if (!inView) return;
    const target = parseFloat(m[2]);
    const c = animate(0, target, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = `${m[1]}${Number.isInteger(target) ? Math.round(v) : v.toFixed(1)}${m[3]}`;
      },
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);
  return <span ref={ref}>{m ? `${m[1]}0${m[3]}` : value}</span>;
}

const float = (d: number, dur: number, delay = 0) => ({
  animate: { y: [0, -d, 0] },
  transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/**
 * Hero visual of the Why Choose Us page: the devices-on-podium artwork with live, CMS-editable
 * overlays (screen copy, stat cards, steps) and gentle motion.
 */
export default function HeroGrowthScene() {
  const $t = useCmsText();
  const steps = useCmsData("HeroGrowthScene__steps", steps__cms);
  const reduce = !!useReducedMotion();
  const f = (d: number, dur: number, delay = 0) => (reduce ? {} : float(d, dur, delay));

  return (
    <div className="relative mx-auto w-full max-w-[760px] select-none">
      {/* base artwork: laptop + phone on a podium with the rising arrow (blank screens) */}
      <div className="relative aspect-[954/887]">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <Image
            src={$t("HeroGrowthScene__t1", "/why-choose-us/hero-devices.webp")}
            alt={$t("HeroGrowthScene__t2", "Laptop and phone on a podium with a rising growth arrow")}
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="edge-fade object-contain mix-blend-multiply"
          />
        </motion.div>

        {/* glowing dot travelling up the arrow */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_6px_rgba(20,184,196,0.75)]"
            animate={{ left: ["9%", "24%", "37%", "52%", "66%", "79%"], top: ["51%", "45%", "38%", "27%", "17%", "6%"], opacity: [0, 1, 1, 1, 1, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        )}

        {/* "Your Vision / Our Execution" with a leader line to the arrow */}
        <motion.div
          className="absolute left-[2%] top-[9%] sm:left-[6%]"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        >
          <p className="font-heading text-[clamp(13px,1.5vw,20px)] font-semibold leading-snug" style={{ color: NAVY }}>
            {$t("HeroGrowthScene__t3", "Your Vision")}
            <br />
            {$t("HeroGrowthScene__t4", "Our Execution")}
          </p>
        </motion.div>
        <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <motion.path
            d="M 33 17.5 L 41 17.5 L 51.5 27"
            stroke="#8a9ab0"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
        </svg>
        <span aria-hidden className="absolute left-[51.5%] top-[27%] -translate-x-1/2 -translate-y-1/2">
          <span className="relative block h-3 w-3 rounded-full border-2 border-white bg-[#14b8c4] shadow-[0_0_12px_rgba(20,184,196,0.9)]">
            {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#14b8c4]/60" />}
          </span>
        </span>

        {/* laptop screen copy */}
        <motion.div
          className="absolute left-[40%] top-[37%] w-[30%]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        >
          <p className="font-heading text-[clamp(10px,1.45vw,20px)] font-bold leading-tight" style={{ color: NAVY }}>
            {$t("HeroGrowthScene__t5", "Designed to Engage.")}
          </p>
          <p className="font-heading text-[clamp(10px,1.45vw,20px)] font-bold leading-tight" style={{ color: TEAL }}>
            {$t("HeroGrowthScene__t6", "Built to Grow.")}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[clamp(7px,0.7vw,10px)] font-semibold text-white" style={{ backgroundColor: NAVY }}>
            {$t("HeroGrowthScene__t7", "Explore")} →
          </span>
        </motion.div>

        {/* phone screen copy */}
        <motion.div
          className="absolute left-[72%] top-[54%] w-[9.5%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="text-[clamp(6px,0.85vw,11px)] font-bold leading-tight" style={{ color: NAVY }}>
            {$t("HeroGrowthScene__t8", "Mobile Experience")}
          </p>
          <p className="mt-1 text-[clamp(5px,0.7vw,9.5px)] font-medium leading-snug" style={{ color: TEAL }}>
            {$t("HeroGrowthScene__t9", "Seamless. Fast. Effective.")}
          </p>
        </motion.div>

        {/* 3D teal blocks rising */}
        <div aria-hidden className="absolute bottom-[23%] left-[21%] flex h-[17%] w-[15%] items-end gap-[8%]">
          {[42, 68, 100].map((h, i) => (
            <motion.span
              key={i}
              className="relative block flex-1 origin-bottom rounded-[3px] bg-[linear-gradient(90deg,#0b7f8a,#16b3c0_55%,#0e8f9a)] shadow-[0_10px_18px_-8px_rgba(13,120,130,0.6)]"
              style={{ height: `${h}%`, minHeight: 18 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, delay: 0.8 + i * 0.15, ease: EASE }}
            >
              <span className="absolute inset-x-0 -top-[5px] h-[6px] rounded-[2px] bg-[#5ad6df]" />
            </motion.span>
          ))}
        </div>

        {/* Performance card */}
        <motion.div
          className="absolute left-[0%] top-[52%] w-[25%] min-w-[96px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          <motion.div {...f(6, 5)} className="rounded-xl bg-white/95 p-[clamp(6px,1vw,14px)] shadow-[0_20px_40px_-18px_rgba(15,23,42,0.35)] ring-1 ring-slate-100">
            <p className="text-[clamp(8px,0.8vw,11px)] font-medium text-slate-500">{$t("HeroGrowthScene__t10", "Performance")}</p>
            <p className="font-heading text-[clamp(12px,1.4vw,20px)] font-bold" style={{ color: NAVY }}>
              <CountUp value={$t("HeroGrowthScene__t11", "+230%")} />
            </p>
            <svg viewBox="0 0 100 34" className="mt-1 h-auto w-full" fill="none" aria-hidden>
              <motion.path
                d="M2 30 L14 24 L24 27 L36 17 L48 21 L60 11 L72 15 L84 6 L98 3"
                stroke={CYAN}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 1, ease: "easeOut" }}
              />
              <path d="M2 30 L14 24 L24 27 L36 17 L48 21 L60 11 L72 15 L84 6 L98 3 L98 34 L2 34Z" fill="url(#hgsArea)" opacity="0.35" />
              <defs>
                <linearGradient id="hgsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={CYAN} />
                  <stop offset="1" stopColor={CYAN} stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Leads Generated card */}
        <motion.div
          className="absolute left-[31%] top-[58%] w-[23%] min-w-[92px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
        >
          <motion.div {...f(7, 5.6, 0.4)} className="rounded-xl bg-white/95 p-[clamp(6px,1vw,14px)] shadow-[0_22px_44px_-18px_rgba(15,23,42,0.4)] ring-1 ring-slate-100">
            <p className="text-[clamp(8px,0.8vw,11px)] font-medium text-slate-500">{$t("HeroGrowthScene__t12", "Leads Generated")}</p>
            <p className="font-heading text-[clamp(12px,1.4vw,20px)] font-bold" style={{ color: NAVY }}>
              <CountUp value={$t("HeroGrowthScene__t13", "+180%")} />
            </p>
            <div aria-hidden className="mt-1.5 flex h-[clamp(18px,2.6vw,36px)] items-end gap-[6%] px-[6%]">
              {[30, 45, 62, 80, 100].map((h, i) => (
                <motion.span
                  key={i}
                  className="block flex-1 origin-bottom rounded-t-[2px]"
                  style={{ height: `${h}%`, backgroundColor: i === 4 ? TEAL : CYAN, opacity: 0.55 + i * 0.1 }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.7, delay: 1.1 + i * 0.1, ease: EASE }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* donut accent */}
        <motion.span
          aria-hidden
          className="absolute right-[1%] top-[56%] h-[9%] w-[9%] min-h-[30px] min-w-[30px] rounded-full"
          style={{ background: `conic-gradient(${TEAL} 0deg 250deg, #dbe4ee 250deg 360deg)` }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <span className="absolute inset-[22%] rounded-full bg-[#eef3f8]" />
        </motion.span>
      </div>

      {/* steps strip on the podium front */}
      <motion.ul
        className="relative z-10 -mt-[7%] mx-[3%] grid grid-cols-3 gap-y-3 rounded-2xl border border-white bg-white/80 px-2 py-3 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)] backdrop-blur-md sm:grid-cols-6 sm:divide-x sm:divide-slate-200/80 sm:py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
      >
        {steps.map((s, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          return (
            <motion.li
              key={i}
              className="group flex flex-col items-center gap-1.5 px-1 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
            >
              <Icon className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" strokeWidth={1.6} style={{ color: TEAL }} />
              <span className="text-[11px] font-semibold leading-tight sm:text-[12px]" style={{ color: NAVY }}>
                {s.label}
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
