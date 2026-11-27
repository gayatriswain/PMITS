"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import ProposalLink from "./ProposalLink";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const INK = "#0d1b33";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.7) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const BrowserCodeIcon = ({ size = 28, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="2.5" y="4" width="19" height="16" rx="2" />
    <path d="M2.5 8.5h19M5.5 6.2h.01M7.8 6.2h.01" />
    <path d="m9.5 12-2 2 2 2M14.5 12l2 2-2 2M12.8 11.5l-1.6 5" />
  </svg>
);
const CubeIcon = ({ size = 28, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" />
    <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
    <path d="M7.8 4.8 16.2 9.3v4.4" />
  </svg>
);
const MegaphoneIcon = ({ size = 28, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M3 10v4a1 1 0 0 0 1 1h2l8 4.5V4.5L6 9H4a1 1 0 0 0-1 1Z" />
    <path d="m7 15 1.5 5h2.5L10 15.8" />
    <path d="M17.5 9.5a3.5 3.5 0 0 1 0 5M19.5 4.5l1.5-1.5M20.5 12H22.5M19.5 19.5l1.5 1.5" />
  </svg>
);
const ChartUpIcon = ({ size = 30, color = TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="3.5" y="15" width="3" height="6" rx="0.6" fill={color} />
    <rect x="8.5" y="12" width="3" height="9" rx="0.6" fill={color} />
    <rect x="13.5" y="13.5" width="3" height="7.5" rx="0.6" fill={color} />
    <rect x="18.5" y="9" width="3" height="12" rx="0.6" fill={color} />
    <path d="m3.5 11 5-4.5 4 3 7.5-6.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 3h4v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CARDS__cms = [
  {
    Icon: BrowserCodeIcon,
    num: "01",
    title: "Web Design & Development:",
    desc: "Creating responsive, visually compelling websites with robust functionality.",
    color: "#0d9488",
    tint: "#e6f6f4",
  },
  {
    Icon: CubeIcon,
    num: "02",
    title: "Digital Products:",
    desc: "Building secure, scalable applications and platforms tailored to business needs.",
    color: "#7c3aed",
    tint: "#f1ebfe",
  },
  {
    Icon: MegaphoneIcon,
    num: "03",
    title: "Digital Marketing & SEO:",
    desc: "Increasing visibility and conversions by utilising performance-driven strategies, such as PPC and SEO.",
    color: "#f97316",
    tint: "#fff1e6",
  },
];

/* A grid of faint dots, used as background texture in a few corners */
function Dots({ cols, rows, className = "" }: { cols: number; rows: number; className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} width={cols * 14} height={rows * 14} aria-hidden>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <circle key={i} cx={7 + (i % cols) * 14} cy={7 + Math.floor(i / cols) * 14} r="1.5" fill="#cbd5e1" />
      ))}
    </svg>
  );
}

function PaperPlane() {
  return (
    <svg className="pointer-events-none absolute right-0 top-0 hidden md:block" width="150" height="90" viewBox="0 0 150 90" fill="none" aria-hidden>
      <path d="M12 72c10 10 26 8 30-2s-8-14-14-6c-6 9 10 18 30 10s36-26 54-40" stroke="#5eead4" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
      <path d="M100 30 146 6l-14 44-12-14Z" stroke="#5eead4" strokeWidth="1.6" strokeLinejoin="round" fill="#f0fdfa" />
      <path d="m120 36 26-30M120 36l-2 14 8-8" stroke="#5eead4" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ApproachCard({ card, index }: { card: (typeof CARDS__cms)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.12 }}
      className="group relative h-full pt-7 [perspective:1400px]"
    >
      {/* the card leans back a touch on its right, so the left edge and the coloured fold come forward */}
      <div className="relative h-full transition-transform duration-500 [transform:rotateY(6deg)] group-hover:[transform:rotateY(0deg)_translateY(-4px)]">
        {/* coloured fold peeking out from under the card's left and bottom edges */}
        <div
          className="absolute -bottom-2.5 -left-2.5 top-[42%] w-[62%] rounded-bl-[26px] rounded-tl-lg"
          style={{
            background: `linear-gradient(to top right, ${card.color}, ${card.color}cc 25%, ${card.color}33 60%, transparent 85%)`,
            maskImage: "linear-gradient(to right, #000 45%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, #000 45%, transparent)",
          }}
        />
        <div className="relative h-full rounded-[22px] bg-white px-7 pb-10 pt-[88px] shadow-[0_24px_50px_-28px_rgba(13,27,51,0.4)] ring-1 ring-slate-100">
          {/* icon tile in a thick white frame, rising out of the card's top-left corner */}
          <span className="absolute -top-7 left-5 rounded-[24px] bg-white p-2 shadow-[0_14px_30px_-16px_rgba(13,27,51,0.45)]">
            <span
              className="flex h-[84px] w-[84px] items-center justify-center rounded-[18px]"
              style={{ background: `linear-gradient(145deg, ${card.tint}, #ffffff)`, boxShadow: `inset 0 0 0 1px ${card.color}22` }}
            >
              <card.Icon size={44} color={card.color} />
            </span>
          </span>
          <span
            className="absolute right-7 top-5 select-none text-[86px] font-bold leading-none tracking-tight"
            style={{ color: card.color, opacity: 0.09 }}
          >
            {card.num}
          </span>
          <h3 className="text-h6 font-semibold" style={{ color: card.color }}>
            {card.title}
          </h3>
          <span className="mt-4 block h-[3px] w-9 rounded-full" style={{ backgroundColor: card.color }} />
          <p className="text-small mt-5 max-w-[320px] text-slate-700">{card.desc}</p>
          {/* short coloured bar trailing off into a dotted line along the bottom edge */}
          <span className="absolute bottom-0 left-[28%] right-10 flex items-center">
            <span className="h-[3px] w-9 shrink-0 rounded-full" style={{ backgroundColor: card.color }} />
            <span className="ml-1 h-px flex-1 border-t border-dotted border-slate-300" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const RING_R = 44;
const RING_C = 2 * Math.PI * RING_R;
const RETENTION = 0.92;

function RetentionRing() {
  const $t = useCmsText();
  // the arc's end, where the dot sits; the ring starts at 12 o'clock and runs clockwise
  const end = -Math.PI / 2 + RETENTION * 2 * Math.PI;
  return (
    <div className="relative h-[112px] w-[112px] shrink-0">
      <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
        <defs>
          <linearGradient id="approach-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor={TEAL} />
          </linearGradient>
        </defs>
        <circle cx="56" cy="56" r={RING_R} stroke="#e2f3f1" strokeWidth="7" fill="none" />
        <motion.circle
          cx="56"
          cy="56"
          r={RING_R}
          stroke="url(#approach-ring)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={RING_C}
          initial={{ strokeDashoffset: RING_C }}
          whileInView={{ strokeDashoffset: RING_C * (1 - RETENTION) }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
        />
      </svg>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4 }}
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow"
        style={{ left: 56 + RING_R * Math.cos(end), top: 56 + RING_R * Math.sin(end), backgroundColor: TEAL }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-[34px] font-bold" style={{ color: DEEP_TEAL }}>
        {html($t("WhoWeAreApproach__t1", "92"))}<span className="mt-2 text-[18px]">%</span>
      </span>
    </div>
  );
}

function RetentionStrip() {
  const $t = useCmsText();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto mt-10 flex max-w-[980px] flex-col items-center gap-6 overflow-hidden rounded-2xl border border-teal-100 bg-white/90 px-8 py-7 shadow-[0_20px_45px_-30px_rgba(13,27,51,0.35)] md:flex-row md:gap-10 md:px-14"
    >
      <RetentionRing />
      <span className="hidden h-16 w-px bg-slate-200 md:block" />
      <p className="text-small flex-1 text-center text-slate-600 md:text-left">{rich($t("WhoWeAreApproach__t2m", "We have maintained a <strong class=\"font-bold text-[#0d9488]\">92%</strong> customer retention rate thanks to our consistent focus on transparency, client satisfaction, and quantifiable return on investment. This accomplishment speaks to the quality of our work and the confidence we gain from our clients."))}</p>
      <span className="hidden h-16 w-px bg-slate-200 md:block" />
      <span className="relative z-10 flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-2xl bg-white lg:mr-12 shadow-[0_12px_28px_-14px_rgba(13,27,51,0.4)] ring-1 ring-slate-100">
        <ChartUpIcon size={32} color={DEEP_TEAL} />
      </span>
      <Dots cols={4} rows={4} className="absolute right-3 top-1/2 hidden -translate-y-1/2 opacity-70 lg:block" />
    </motion.div>
  );
}

function ProposalButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
      className="relative mt-10 flex justify-center"
    >
      <div className="relative">
        {/* hand-drawn arrow swinging round from above to point at the button */}
        <svg className="pointer-events-none absolute -left-[92px] top-1 hidden sm:block" width="80" height="56" viewBox="0 0 80 56" fill="none" aria-hidden>
          <path d="M44 4C20 6 4 22 12 36c6 10 30 12 58 8" stroke={DEEP_TEAL} strokeWidth="2.2" strokeLinecap="round" />
          <path d="m61 36 10 8-11 6" stroke={DEEP_TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <ProposalLink />
        {/* little spark lines fanning off the button's bottom-right corner */}
        <svg className="pointer-events-none absolute -bottom-5 -right-7 hidden sm:block" width="30" height="24" viewBox="0 0 30 24" fill="none" aria-hidden>
          <path d="M3 5l6 5M13 3l1.5 8.5M24 5l-5 7" stroke={DEEP_TEAL} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function WhoWeAreApproach() {
  const $t = useCmsText();
  const CARDS = useCmsData("WhoWeAreApproach__CARDS", CARDS__cms);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f8fb] via-white to-[#f7fbfb] py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-teal-100/30 blur-3xl" />
      <Dots cols={6} rows={4} className="absolute right-10 top-44 hidden opacity-60 lg:block" />
      <Dots cols={10} rows={3} className="absolute bottom-8 left-1/2 hidden -translate-x-[420px] opacity-50 lg:block" />

      <Container className="relative">
        <div className="relative max-w-[1160px]">
          <PaperPlane />
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-lg bg-white px-3.5 py-2 text-[13px] font-semibold uppercase tracking-wide shadow-[0_8px_20px_-12px_rgba(13,27,51,0.35)] ring-1 ring-slate-100"
              style={{ color: DEEP_TEAL }}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border-2" style={{ borderColor: TEAL }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEAL }} />
              </span>
              {html($t("WhoWeAreApproach__t4", "Our Approach"))}<span className="text-teal-400">÷</span>
            </motion.span>

            <motion.h2 variants={fadeUp} className="text-h2 mt-5 font-bold tracking-tight">
              <span style={{ color: INK }}>{html($t("WhoWeAreApproach__t5", "Our "))}</span>
              <span className="relative inline-block" style={{ color: TEAL }}>
                {html($t("WhoWeAreApproach__t6", "Approach"))}<svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" fill="none" aria-hidden>
                  <path d="M3 7C60 2 140 1 197 5" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-small mt-6 max-w-[760px] text-slate-600">
              {rich($t("WhoWeAreApproach__t7", "ProManage IT Solution provides an extensive range of services aimed at supporting companies in their digital transformation. We have experience with digital product development, which focuses on safe, scalable applications for specific business requirements, web design and development, digital marketing, and SEO."))}</motion.p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
          {CARDS.map((card, i) => (
            <ApproachCard key={card.num} card={card} index={i} />
          ))}
        </div>

        <RetentionStrip />
        <ProposalButton />
      </Container>
    </section>
  );
}
