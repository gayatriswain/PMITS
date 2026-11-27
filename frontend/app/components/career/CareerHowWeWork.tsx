"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

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

const BulbIcon = ({ size = 22, color = "#fff" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    <path d="M12 1v.5M4.5 4.5l.4.4M19.5 4.5l-.4.4M2 11h.5M21.5 11H22" />
  </svg>
);
const TeamIcon = ({ size = 22, color = "#fff" }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="7" r="2.8" />
    <circle cx="5.5" cy="9" r="2" />
    <circle cx="18.5" cy="9" r="2" />
    <path d="M6.5 19.5a5.5 5.5 0 0 1 11 0M1.5 18a4 4 0 0 1 4.5-3.5M22.5 18a4 4 0 0 0-4.5-3.5" />
  </svg>
);
const CodeIcon = ({ size = 22, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="m9.5 9-3 3 3 3M14.5 9l3 3-3 3" />
  </svg>
);
const ChartIcon = ({ size = 22, color = "#fff" }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="3" y="3" width="18" height="18" rx="4" />
    <path d="M7.5 17v-3M11 17v-5M14.5 17v-4M7 11l3.5-3 3 2L17 7M15 7h2v2" />
  </svg>
);
const HeartIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20 9.5C20 15.3 12 20 12 20Z" />
  </svg>
);

type Step = {
  num: string;
  title: string;
  desc: string;
  photo: string;
  alt: string;
  Icon: (p: IconProps) => React.ReactElement;
  badge: string;
};

const STEPS__cms: Step[] = [
  {
    num: "01",
    title: "Think",
    desc: "We understand, research and plan with clarity to find the right solution.",
    photo: "/career-step-think.webp",
    alt: "A developer thinking at his laptop",
    Icon: BulbIcon,
    badge: "linear-gradient(140deg,#22d3ee,#0e7490)",
  },
  {
    num: "02",
    title: "Collaborate",
    desc: "We share ideas, align together and solve problems as one team.",
    photo: "/career-step-collab.webp",
    alt: "Three teammates working round one laptop",
    Icon: TeamIcon,
    badge: "linear-gradient(140deg,#3b82f6,#1e3a8a)",
  },
  {
    num: "03",
    title: "Create",
    desc: "We build, design and deliver with passion and precision.",
    photo: "/career-step-create.webp",
    alt: "A designer smiling at her laptop",
    Icon: CodeIcon,
    badge: "linear-gradient(140deg,#2dd4bf,#0f766e)",
  },
  {
    num: "04",
    title: "Improve",
    desc: "We measure, learn and keep getting better every day.",
    photo: "/career-step-improve.webp",
    alt: "A tablet showing a performance dashboard",
    Icon: ChartIcon,
    badge: "linear-gradient(140deg,#6366f1,#1e3a8a)",
  },
];

function Photo({ step, size }: { step: Step; size: number }) {
  return (
    <span className="relative block shrink-0 rounded-full p-1.5 ring-1 ring-teal-100" style={{ width: size + 12, height: size + 12 }}>
      <span className="relative block h-full w-full overflow-hidden rounded-full shadow-[0_20px_40px_-20px_rgba(13,27,51,0.55)] ring-4 ring-white">
        <Image src={step.photo} alt={step.alt} fill sizes={`${size}px`} className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </span>
    </span>
  );
}

function Badge({ step, size = 64 }: { step: Step; size?: number }) {
  return (
    <span
      className="relative flex shrink-0 items-center justify-center rounded-full shadow-[0_14px_28px_-12px_rgba(13,27,51,0.6)] ring-[5px] ring-white"
      style={{ width: size, height: size, background: step.badge }}
    >
      {/* soft pulse behind the badge */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ background: step.badge }}
        animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        aria-hidden
      />
      <step.Icon size={size * 0.45} />
    </span>
  );
}

function StepText({ step }: { step: Step }) {
  return (
    <div className="min-w-0">
      <p className="text-[30px] font-semibold leading-none" style={{ color: TEAL }}>
        {step.num}
      </p>
      <h3 className="text-h6 mt-2 font-bold" style={{ color: INK }}>
        {step.title}
      </h3>
      <span className="mt-2 block h-[2px] w-7 rounded-full" style={{ backgroundColor: TEAL }} />
      <p className="text-small mt-3 max-w-[170px] text-slate-600">{step.desc}</p>
    </div>
  );
}

/* Odd steps: photo up top with the badge on its foot, text beside it.
   Even steps (lg only): badge up top with the text beside it, photo underneath. */
function StepBlock({ step, i }: { step: Step; i: number }) {
  const low = i % 2 === 1;
  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.18 }}
      className="group relative"
    >
      {/* mobile and the high steps on desktop */}
      <div className={`flex items-start gap-4 ${low ? "lg:hidden" : ""}`}>
        <div className="relative pb-8">
          <Photo step={step} size={150} />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Badge step={step} />
          </span>
        </div>
        <div className="pt-6">
          <StepText step={step} />
        </div>
      </div>

      {/* the low steps on desktop */}
      {low && (
        <div className="hidden lg:block lg:pt-6">
          <div className="flex items-start gap-4">
            <Badge step={step} />
            <StepText step={step} />
          </div>
          <div className="mt-4 pl-6">
            <Photo step={step} size={150} />
          </div>
        </div>
      )}
    </motion.li>
  );
}

/* The path that strings the steps together on desktop, with an arrowhead into each next step */
function Path() {
  const d = "M70 268 C 120 330, 230 300, 265 230 S 300 70, 360 72 M 520 300 C 600 330, 640 120, 700 140 S 760 300, 860 300 S 960 110, 1010 90";
  return (
    <svg className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" viewBox="0 0 1200 460" preserveAspectRatio="none" fill="none" aria-hidden>
      <defs>
        <marker id="hww-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10Z" fill="#2563eb" />
        </marker>
      </defs>
      <motion.path
        d={d}
        stroke="url(#hww-grad)"
        strokeWidth="2"
        strokeDasharray="5 6"
        markerEnd="url(#hww-arrow)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.3 }}
      />
      <linearGradient id="hww-grad" x1="0" x2="1">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
    </svg>
  );
}

export default function CareerHowWeWork() {
  const $t = useCmsText();
  const STEPS = useCmsData("CareerHowWeWork__STEPS", STEPS__cms);
  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-20">
      <Image src={$t("CareerHowWeWork__t1", "/career3.webp")} alt="" fill sizes="100vw" className="object-cover" aria-hidden />

      <Container className="relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-[760px] text-center"
        >
          <motion.p variants={fadeUp} className="text-small font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
            {rich($t("CareerHowWeWork__t2", "How We Work"))}</motion.p>
          <motion.span variants={fadeUp} className="mx-auto mt-2 block h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} />
          <motion.h2 variants={fadeUp} className="text-h2 mt-4 font-bold tracking-tight" style={{ color: INK }}>
            {$t("CareerHowWeWork__t3", "Turning Ideas into Impact,")}{" "}
            <span className={`${caveat.className} relative inline-block text-[46px] font-bold sm:text-[60px]`} style={{ color: TEAL }}>
              {html($t("CareerHowWeWork__t4", "Together."))}<svg className="pointer-events-none absolute -bottom-1 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-body mx-auto mt-5 max-w-[520px] text-slate-600">{rich($t("CareerHowWeWork__t5m", "Our process is simple. Our focus is you. We think, collaborate, create, and continuously improve to deliver <span class=\"font-semibold text-[#0d9488]\">real results</span>."))}</motion.p>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-[1200px]">
          <Path />
          <ol className="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <StepBlock key={s.num} step={s} i={i} />
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mx-auto mt-14 flex w-fit flex-wrap items-center justify-center gap-4 rounded-full bg-white/90 px-6 py-3 shadow-[0_18px_40px_-22px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 backdrop-blur sm:px-8"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-teal-200">
            <HeartIcon size={22} color={TEAL} />
          </span>
          <span className="text-[15px] font-medium" style={{ color: INK }}>
            {html($t("CareerHowWeWork__t7", "Different steps. One goal."))}</span>
          <span className="hidden h-8 w-px bg-slate-200 sm:block" />
          <span className={`${caveat.className} relative text-[28px] font-bold leading-none`} style={{ color: DEEP_TEAL }}>
            {html($t("CareerHowWeWork__t8", "Your success."))}<svg className="pointer-events-none absolute -bottom-1.5 left-0 h-2 w-full" viewBox="0 0 200 8" preserveAspectRatio="none" aria-hidden>
              <path d="M2 6C60 2 140 1 198 4" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </motion.div>
      </Container>
    </section>
  );
}
