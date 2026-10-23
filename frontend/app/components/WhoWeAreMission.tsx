"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import ProposalLink from "./ProposalLink";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

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

const TargetIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4.5" />
    <circle cx="11" cy="13" r="1.2" fill={color} />
    <path d="m11 13 9-9M17 4h3v3" />
  </svg>
);
const KnightIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M7 20h11M8.5 20c0-3 1-5 3-7-2 .3-3.5 1-4.5 2L5.5 13.5C7 10 9 6 13 4.5l1-1.5 1 2c2.5 1.5 3.5 4.5 3.5 8V20" />
    <circle cx="12.5" cy="8" r=".6" fill={color} />
  </svg>
);
const ChartUpIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20h17M6 20v-4M10.5 20v-7M15 20v-5M19.5 20v-9" />
    <path d="m4 12 5-4.5 4 3L20 4M16 4h4v4" />
  </svg>
);
const DiamondIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M6.5 4h11L21 9l-9 11L3 9Z" />
    <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
  </svg>
);
const EyeIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const RocketIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M14 4.5c2.5-1.3 5-1.5 6-1 .5 1 .3 3.5-1 6l-7 7-5-5Z" />
    <path d="M7 11.5 4 11l3-4h4.5M12.5 17l.5 3 4-3v-4.5" />
    <circle cx="15.5" cy="8.5" r="1.4" />
    <path d="M6 15.5c-1.5.5-2.5 2-2.5 5 3 0 4.5-1 5-2.5" />
  </svg>
);

/* ---------- Left visual: the photo with the mission wheel drawn over it, on the photo's own pixel grid ---------- */
const PHOTO_W = 944;
const PHOTO_H = 1127;
// the wheel's hub, sitting just above the open palm, and the arc the nodes ride on
const HUB = { x: 430, y: 470 };
const HUB_D = 220;
const RING_R = 300;

// labelLift raises a label clear of the ring where the ring runs right past it
type Node = { Icon: (p: IconProps) => React.ReactElement; label: string; angle: number; labelLift?: number };
// angles in degrees, clockwise from 3 o'clock (screen y points down)
const NODES: Node[] = [
  { Icon: RocketIcon, label: "Action", angle: 160 },
  { Icon: EyeIcon, label: "Vision", angle: -158 },
  { Icon: KnightIcon, label: "Strategy", angle: -112, labelLift: 44 },
  { Icon: ChartUpIcon, label: "Success", angle: -56 },
  { Icon: DiamondIcon, label: "Values", angle: -6 },
  { Icon: TargetIcon, label: "Goals", angle: 32 },
];
const NODE_D = 88;
// little beads on the ring, halfway between neighbouring nodes
const BEADS = NODES.slice(1).map((n, i) => (n.angle + (i === 0 ? NODES[0].angle - 360 : NODES[i].angle)) / 2);

const at = (deg: number, r = RING_R) => ({
  x: HUB.x + r * Math.cos((deg * Math.PI) / 180),
  y: HUB.y + r * Math.sin((deg * Math.PI) / 180),
});
// the arc runs from Goals up over the top round to Action, leaving the bottom open for the hand
const ARC_FROM = at(42);
const ARC_TO = at(152);
const ARC_D = `M${ARC_FROM.x} ${ARC_FROM.y} A${RING_R} ${RING_R} 0 1 0 ${ARC_TO.x} ${ARC_TO.y}`;

function MissionWheel() {
  return (
    <>
      {/* ring: a soft glow under a crisp line, drawn on as it scrolls in */}
      <svg className="absolute inset-0" width={PHOTO_W} height={PHOTO_H} viewBox={`0 0 ${PHOTO_W} ${PHOTO_H}`} fill="none" aria-hidden>
        <defs>
          <linearGradient id="mission-ring" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="50%" stopColor={TEAL} />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="mission-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <motion.path
          d={ARC_D}
          stroke="#5eead4"
          strokeWidth="12"
          opacity={0.45}
          filter="url(#mission-glow)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <motion.path
          d={ARC_D}
          stroke="url(#mission-ring)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {BEADS.map((deg, i) => {
          const p = at(deg);
          return (
            <motion.circle
              key={deg}
              cx={p.x}
              cy={p.y}
              r="7"
              fill={TEAL}
              stroke="#fff"
              strokeWidth="3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.15 }}
            />
          );
        })}
      </svg>

      {/* hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="absolute"
        style={{ left: HUB.x - HUB_D / 2, top: HUB.y - HUB_D / 2, width: HUB_D, height: HUB_D }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white shadow-[0_30px_60px_-24px_rgba(13,27,51,0.35),0_0_0_18px_rgba(204,240,235,0.55),0_0_0_19px_rgba(13,148,136,0.18),0_0_60px_18px_rgba(94,234,212,0.35)]"
        >
          <span className="absolute inset-[8px] rounded-full border-2" style={{ borderColor: `${TEAL}33` }} />
          <TargetIcon size={62} color={TEAL} />
          <span className="mt-2 text-[34px] font-semibold tracking-[0.1em]" style={{ color: INK }}>
            MISSION
          </span>
          <span className="mt-3 h-[3px] w-12 rounded-full" style={{ backgroundColor: TEAL }} />
        </motion.div>
      </motion.div>

      {/* nodes round the arc, each popping in after the ring reaches it */}
      {NODES.map((n, i) => {
        const p = at(n.angle);
        return (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.15 }}
            className="absolute"
            style={{ left: p.x - NODE_D / 2, top: p.y - NODE_D / 2, width: NODE_D, height: NODE_D }}
          >
            <span className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_18px_36px_-16px_rgba(13,27,51,0.4),0_0_0_8px_rgba(255,255,255,0.55),0_0_24px_4px_rgba(94,234,212,0.25)] ring-1 ring-teal-100">
              <n.Icon size={44} color={TEAL} />
            </span>
            {/* label off to the right, with three fading dots under it */}
            <span className="absolute left-[calc(100%+16px)] top-[42%] -translate-y-1/2 whitespace-nowrap" style={{ marginTop: -(n.labelLift ?? 0) }}>
              <span className="block text-[19px] font-semibold uppercase tracking-[0.06em]" style={{ color: TEAL }}>
                {n.label}
              </span>
              <span className="mt-1.5 flex gap-1.5">
                {[1, 0.55, 0.3].map((o) => (
                  <span key={o} className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: TEAL, opacity: o }} />
                ))}
              </span>
            </span>
          </motion.div>
        );
      })}
    </>
  );
}

/* Where the photo lands under object-cover in a box of the given size: its scale and top-left offset,
   so the wheel can be laid over the exact same pixels however the box crops it. */
function useCoverFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; x: number; y: number } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scale = Math.max(width / PHOTO_W, height / PHOTO_H);
      setFit({ scale, x: (width - PHOTO_W * scale) / 2, y: (height - PHOTO_H * scale) / 2 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, fit };
}

// the photo always keeps its full shape; the copy beside it stretches to match its height
function MissionVisual() {
  const { ref, fit } = useCoverFit();
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${PHOTO_W} / ${PHOTO_H}` }}
    >
      {/* beside the copy, the photo melts into the page on its right; the wheel sits outside the mask so it stays crisp */}
      <Image
        src="/who-we-are2.webp"
        alt="An open hand held out over a city skyline"
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover lg:[-webkit-mask-image:linear-gradient(to_right,#000_55%,transparent)] lg:[mask-image:linear-gradient(to_right,#000_55%,transparent)]"
      />
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: PHOTO_W,
          height: PHOTO_H,
          transform: fit ? `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})` : undefined,
          visibility: fit ? "visible" : "hidden",
        }}
      >
        <MissionWheel />
      </div>
    </div>
  );
}

/* ---------- Right copy ---------- */
function PaperPlane() {
  return (
    <svg className="pointer-events-none absolute right-0 top-0 hidden md:block" width="120" height="70" viewBox="0 0 120 70" fill="none" aria-hidden>
      <path d="M6 60c18 4 36-2 50-16" stroke="#5eead4" strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />
      <path d="M70 26 116 4l-14 42-12-14Z" stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" fill="#f0fdfa" />
      <path d="m90 32 26-28M90 32l-2 12 8-6" stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Dots({ cols, rows, className = "" }: { cols: number; rows: number; className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} width={cols * 14} height={rows * 14} aria-hidden>
      {Array.from({ length: cols * rows }).map((_, i) => (
        <circle key={i} cx={7 + (i % cols) * 14} cy={7 + Math.floor(i / cols) * 14} r="1.6" fill="#99d5d0" />
      ))}
    </svg>
  );
}

function MissionCopy() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="relative mx-auto flex w-full max-w-[820px] flex-col justify-center px-6 py-14 lg:px-10 lg:py-16"
    >
      <PaperPlane />

      <motion.div variants={fadeUp} className="text-center">
        <p className={`${caveat.className} text-[30px] leading-none`} style={{ color: TEAL }}>
          Driven by Purpose
        </p>
        <p className="mt-1 text-[19px] font-bold" style={{ color: INK }}>
          Focused on <span style={{ color: TEAL }}>Impact</span>
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="relative mt-8 text-center">
        <span className="absolute -top-8 left-0 font-serif text-[90px] leading-none sm:left-4" style={{ color: `${TEAL}55` }} aria-hidden>
          &ldquo;
        </span>
        <h2 className="text-[46px] font-bold leading-tight tracking-tight sm:text-[58px]">
          <span style={{ color: INK }}>Our </span>
          <span className="relative inline-block" style={{ color: TEAL }}>
            Mission
            <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" aria-hidden>
              <path d="M3 9C60 3 140 1 197 6" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="relative mt-10 overflow-hidden rounded-2xl bg-white py-7 pl-8 pr-7 shadow-[0_24px_50px_-28px_rgba(13,27,51,0.4)] ring-1 ring-slate-100"
      >
        <span className="absolute inset-y-6 left-0 w-[3px] rounded-r-full" style={{ background: `linear-gradient(180deg, ${TEAL}, #5eead4)` }} />
        <p className="text-[14.5px] leading-[1.8] text-slate-600">
          Our mission is to provide companies with specialised digital solutions that boost operational effectiveness, build brand
          awareness, and enable quantitative growth. By providing end-to-end services that are scalable, secure, and
          performance-focused, such as software solutions, SEO, digital marketing, and site design and development, we hope to close the
          gap between technology and business objectives.
        </p>
        <p className="mt-5 text-[14.5px] leading-[1.8] text-slate-600">
          We help our clients feel confident in the digital change process by providing strategic advice, implementing plans based on
          data, and continuously seeking ways to improve. At the core of everything we do is our commitment to transparency, customer
          satisfaction, and creating long-term value.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-3">
        <div className="relative flex items-center">
          <p className={`${caveat.className} -rotate-6 text-center text-[20px] leading-[1.05]`} style={{ color: DEEP_TEAL }}>
            Let&apos;s build
            <br />
            something impactful
            <br />
            together!
          </p>
          {/* hand-drawn arrow from the note to the button */}
          <svg className="ml-1 hidden sm:block" width="44" height="34" viewBox="0 0 56 40" fill="none" aria-hidden>
            <path d="M3 8c10 22 26 26 46 20" stroke={DEEP_TEAL} strokeWidth="2" strokeLinecap="round" />
            <path d="m41 21 9 7-10 5" stroke={DEEP_TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <ProposalLink />
      </motion.div>

      <Dots cols={5} rows={4} className="absolute bottom-4 right-6 hidden opacity-60 lg:block" />
    </motion.div>
  );
}

export default function WhoWeAreMission() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f7fbfb] via-white to-[#f4f8fb]">
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[2fr_3fr]">
        <MissionVisual />
        <MissionCopy />
      </div>
    </section>
  );
}
