"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useFitScale } from "../shared/useFitScale";

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
const base = (size: number, color: string, strokeWidth = 1.5) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const LeaderIcon = ({ size = 22, color = INK }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M2.5 21.5h19M4 21.5v-4h5v-4h5v-4h6v12" />
    <circle cx="11.5" cy="5" r="1.6" />
    <path d="M11.5 6.6v4M9.5 8.5l2-1 2 1M10.3 13.3l1.2-2.7 1.2 2.7" />
    <path d="M16 2.5v5M16 2.5h3.5l-1 1.2 1 1.3H16" />
  </svg>
);
const BadgeIcon = ({ size = 22, color = INK }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="9" r="6.5" />
    <circle cx="12" cy="9" r="4" />
    <path d="m10.3 9 1.2 1.2 2.3-2.4" />
    <path d="m8 14 -1.8 7 3.3-1.6L11 22l1-6.5M16 14l1.8 7-3.3-1.6L13 22" />
  </svg>
);
const ExpertIcon = ({ size = 22, color = INK }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="6" cy="5" r="1.7" />
    <circle cx="12" cy="4" r="1.7" />
    <circle cx="18" cy="5" r="1.7" />
    <path d="M3.5 10a2.5 2.5 0 0 1 5 0M9.5 9a2.5 2.5 0 0 1 5 0M15.5 10a2.5 2.5 0 0 1 5 0" />
    <path d="M2 19.5h3l3.5 1.5 6.5-2.3c.9-.3 1-1.6 0-1.8l-4.2.6M5 15.5l2.5-1.5c1-.6 2-.6 3 0l3 1.6M5 14v7" />
  </svg>
);
const AccountIcon = ({ size = 22, color = INK }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="8" cy="5" r="2.3" />
    <path d="M4 21v-8.5a4 4 0 0 1 8 0V21M6.5 21v-5M9.5 21v-5" />
    <rect x="14" y="8" width="7.5" height="10" rx="1" />
    <path d="m15.5 11 1 1 1.6-1.7M19.3 11.3h.7M15.5 14.8l1 1 1.6-1.7M19.3 15h.7" />
  </svg>
);
const ScalesIcon = ({ size = 22, color = INK }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3v17M7 21h10M5 6h14M12 3.5l-1 1.5h2Z" />
    <path d="M5 6 2.5 13a3 3 0 0 0 5 0Z M19 6l-2.5 7a3 3 0 0 0 5 0Z" />
  </svg>
);
const SupportIcon = ({ size = 22, color = INK }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="10" r="3.6" />
    <path d="M4.5 10a4.5 4.5 0 0 1 9 0M4 9.5v2.5h1.5M14 9.5V12h-1.5M13 12.5c0 1.5-1.2 2.5-3 2.5" />
    <path d="M3 21a6 6 0 0 1 12 0" />
    <path d="M15 2.5h6.5v5H18l-2 1.8V7.5h-1Z" />
    <path d="M16.8 5h.01M18.3 5h.01M19.8 5h.01" />
  </svg>
);
const DiamondIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M6.5 4h11L21 9l-9 11L3 9Z" />
    <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
  </svg>
);

type Value = { Icon: (p: IconProps) => React.ReactElement; title: string; desc: string };
const LEFT: Value[] = [
  { Icon: LeaderIcon, title: "Leadership", desc: "Driving innovation with vision, integrity, and strategic foresight." },
  { Icon: BadgeIcon, title: "Quality Assurance", desc: "Delivering consistent excellence through rigorous testing and standards." },
  { Icon: ExpertIcon, title: "Industry Expertise", desc: "Bringing deep domain knowledge to every project we undertake." },
];
const RIGHT: Value[] = [
  { Icon: AccountIcon, title: "Accountability", desc: "Taking full ownership of outcomes to ensure client satisfaction." },
  { Icon: ScalesIcon, title: "Work-life Balance", desc: "Fostering a healthy, productive environment for sustained performance." },
  { Icon: SupportIcon, title: "End-user support", desc: "Providing responsive, solution-oriented assistance every step of the way." },
];

/* ---------- Desktop: a fixed 1200×600 canvas, zoomed to fit, so the connectors meet the hub exactly ---------- */
const CANVAS_W = 1200;
const CANVAS_H = 600;
const HUB = { x: 600, y: 300 };
const HUB_D = 250;
const ICON_D = 96;
const TEXT_W = 200;
// icon centres down the left side, bowing out in the middle like the hub's rings; the right side mirrors them
const LEFT_ICONS = [
  { x: 130, y: 95 },
  { x: 70, y: 300 },
  { x: 130, y: 505 },
];
// where each connector touches the hub's outer ring, as an angle from 3 o'clock (left side)
const HUB_TOUCH = [236, 180, 124];
const TOUCH_R = 205;

const mirror = (p: { x: number; y: number }) => ({ x: CANVAS_W - p.x, y: p.y });

// rough rendered width of a 19px semibold title, so a pointer can start right where the title ends
const titleWidth = (t: string) => t.length * 10.3;

/* Pointer from the end of a value's title to the hub's dotted ring: level along the title's line, then a
   short bend onto the ring. The middle pair meet the ring at their own height, so they stay dead straight. */
function connector(i: number, side: "left" | "right") {
  const icon = side === "left" ? LEFT_ICONS[i] : mirror(LEFT_ICONS[i]);
  const title = (side === "left" ? LEFT : RIGHT)[i].title;
  const dir = side === "left" ? 1 : -1;
  const y = icon.y - 30;
  const startX = icon.x + dir * (ICON_D / 2 + 20 + titleWidth(title) + 14);
  let tx: number;
  let ty: number;
  if (i === 1) {
    ty = y;
    tx = HUB.x - dir * Math.sqrt(TOUCH_R ** 2 - (y - HUB.y) ** 2);
  } else {
    const deg = side === "left" ? HUB_TOUCH[i] : 180 - HUB_TOUCH[i];
    tx = HUB.x + TOUCH_R * Math.cos((deg * Math.PI) / 180);
    ty = HUB.y + TOUCH_R * Math.sin((deg * Math.PI) / 180);
  }
  const elbowX = tx - dir * Math.abs(ty - y) * 0.6;
  return { d: `M${startX} ${y} H${elbowX} L${tx} ${ty}`, start: { x: startX, y }, end: { x: tx, y: ty } };
}

/* Icon in a white disc, ringed by a faint circle with a thick teal arc that sweeps in */
function IconDisc({ Icon, delay, side }: { Icon: Value["Icon"]; delay: number; side: "left" | "right" }) {
  const r = ICON_D / 2 + 6;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative flex items-center justify-center" style={{ width: ICON_D, height: ICON_D }}>
      <svg
        className="absolute"
        width={ICON_D + 16}
        height={ICON_D + 16}
        viewBox={`0 0 ${ICON_D + 16} ${ICON_D + 16}`}
        style={{ transform: side === "left" ? "rotate(110deg)" : "rotate(-70deg) scaleX(-1)" }}
        aria-hidden
      >
        <circle cx={ICON_D / 2 + 8} cy={ICON_D / 2 + 8} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
        <motion.circle
          cx={ICON_D / 2 + 8}
          cy={ICON_D / 2 + 8}
          r={r}
          fill="none"
          stroke={TEAL}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c * 0.66 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay }}
        />
      </svg>
      <span className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_16px_34px_-18px_rgba(13,27,51,0.5)] ring-1 ring-slate-100 transition-transform duration-300 group-hover:scale-105">
        <Icon size={46} color={INK} />
      </span>
    </span>
  );
}

function ValueItem({ v, i, side }: { v: Value; i: number; side: "left" | "right" }) {
  const icon = side === "left" ? LEFT_ICONS[i] : mirror(LEFT_ICONS[i]);
  const delay = 0.5 + i * 0.15;
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={`group absolute flex items-start gap-5 ${side === "right" ? "flex-row-reverse text-right" : ""}`}
      style={{
        top: icon.y - ICON_D / 2,
        ...(side === "left" ? { left: icon.x - ICON_D / 2 } : { right: CANVAS_W - icon.x - ICON_D / 2 }),
      }}
    >
      <IconDisc Icon={v.Icon} delay={delay + 0.2} side={side} />
      <div style={{ width: TEXT_W }} className="pt-1">
        <h3 className="text-[19px] font-semibold" style={{ color: TEAL }}>
          {v.title}
        </h3>
        <p className="mt-3 text-[14.5px] leading-[1.75] text-slate-600">{v.desc}</p>
      </div>
    </motion.div>
  );
}

function Hub() {
  return (
    <div className="absolute" style={{ left: HUB.x - HUB_D / 2, top: HUB.y - HUB_D / 2, width: HUB_D, height: HUB_D }}>
      {/* slow-turning dashed outer ring and a soft solid one */}
      <motion.svg
        className="absolute"
        style={{ left: -90, top: -90 }}
        width={HUB_D + 180}
        height={HUB_D + 180}
        viewBox={`0 0 ${HUB_D + 180} ${HUB_D + 180}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <circle cx={(HUB_D + 180) / 2} cy={(HUB_D + 180) / 2} r={TOUCH_R} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 7" strokeLinecap="round" />
      </motion.svg>
      <span className="absolute -inset-[42px] rounded-full border border-slate-200/80 bg-white/40" />
      <span className="absolute -inset-[20px] rounded-full bg-gradient-to-b from-white to-slate-50 shadow-[0_30px_60px_-30px_rgba(13,27,51,0.35)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative h-full w-full"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white shadow-[0_24px_50px_-20px_rgba(13,27,51,0.4),inset_0_-8px_20px_-12px_rgba(13,27,51,0.2)] ring-1 ring-slate-100"
        >
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-[0_6px_10px_rgba(13,148,136,0.35)]"
          >
            <DiamondIcon size={44} color={TEAL} />
          </motion.span>
          <span className="mt-3 text-[18px] font-medium" style={{ color: INK }}>
            Guided by
          </span>
          <span className="text-[30px] font-bold leading-tight" style={{ color: TEAL }}>
            Principles
          </span>
          <span className="mt-3 h-[3px] w-12 rounded-full" style={{ backgroundColor: TEAL }} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ValuesDiagram() {
  const { ref, scale } = useFitScale(CANVAS_W);
  const lines = [0, 1, 2].flatMap((i) => [
    { ...connector(i, "left"), key: `l${i}`, i },
    { ...connector(i, "right"), key: `r${i}`, i },
  ]);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        <Hub />
        {/* connectors draw in from each value towards the hub, then a pulse rides each one */}
        <svg className="pointer-events-none absolute inset-0" width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} fill="none" aria-hidden>
          {lines.map(({ d, start, end, key, i }) => (
            <g key={key}>
              <motion.path
                d={d}
                stroke="#9fd3cd"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.9 + i * 0.15 }}
              />
              {/* end dot: solid teal with a soft halo, sitting on the ring */}
              <motion.circle
                cx={end.x}
                cy={end.y}
                r="9"
                fill={TEAL}
                fillOpacity={0.15}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.7 + i * 0.15 }}
              />
              <motion.circle
                cx={end.x}
                cy={end.y}
                r="3.5"
                fill={TEAL}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.7 + i * 0.15 }}
              />
              <circle r="3" fill={TEAL}>
                <animateMotion dur="3.2s" begin={`${2 + i * 0.4}s`} repeatCount="indefinite" path={d} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.2s" begin={`${2 + i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>
        {LEFT.map((v, i) => (
          <ValueItem key={v.title} v={v} i={i} side="left" />
        ))}
        {RIGHT.map((v, i) => (
          <ValueItem key={v.title} v={v} i={i} side="right" />
        ))}
      </div>
    </div>
  );
}

/* ---------- Small screens: the hub, then the values as a simple list ---------- */
function ValuesList() {
  return (
    <div>
      <div className="mx-auto flex h-[200px] w-[200px] flex-col items-center justify-center rounded-full bg-white shadow-[0_24px_50px_-20px_rgba(13,27,51,0.4),0_0_0_14px_rgba(255,255,255,0.7),0_0_0_15px_rgba(203,213,225,0.7)]">
        <DiamondIcon size={36} color={TEAL} />
        <span className="mt-2 text-[15px] font-medium" style={{ color: INK }}>
          Guided by
        </span>
        <span className="text-[24px] font-bold leading-tight" style={{ color: TEAL }}>
          Principles
        </span>
      </div>
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2"
      >
        {[...LEFT, ...RIGHT].map((v) => (
          <motion.li key={v.title} variants={fadeUp} className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_12px_26px_-14px_rgba(13,27,51,0.5)] ring-4 ring-teal-50">
              <v.Icon size={32} color={INK} />
            </span>
            <span>
              <span className="block text-[17px] font-semibold" style={{ color: TEAL }}>
                {v.title}
              </span>
              <span className="mt-1.5 block text-[14px] leading-[1.7] text-slate-600">{v.desc}</span>
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function WhoWeAreValues() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f8fbfc] to-white py-16 lg:py-20">
      {/* faint flowing lines in the corners */}
      <svg className="pointer-events-none absolute -left-20 bottom-0 hidden opacity-40 lg:block" width="360" height="300" viewBox="0 0 360 300" fill="none" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M0 ${120 + i * 18}C90 ${60 + i * 18} 160 ${220 + i * 10} 360 ${150 + i * 16}`} stroke="#cbd5e1" strokeWidth="1" />
        ))}
      </svg>
      <svg className="pointer-events-none absolute -right-20 top-10 hidden opacity-40 lg:block" width="360" height="300" viewBox="0 0 360 300" fill="none" aria-hidden>
        {Array.from({ length: 7 }).map((_, i) => (
          <path key={i} d={`M0 ${150 + i * 16}C200 ${220 + i * 10} 270 ${60 + i * 18} 360 ${120 + i * 18}`} stroke="#cbd5e1" strokeWidth="1" />
        ))}
      </svg>

      <Container className="relative">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="relative mx-auto max-w-[640px] text-center"
        >
          {/* faint script watermark behind the heading */}
          <span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-serif -top-6 text-[120px] italic leading-none text-slate-200/30"
            aria-hidden
          >
            Values
          </span>
          <motion.h2 variants={fadeUp} className="relative text-[46px] font-bold tracking-tight sm:text-[58px]">
            <span style={{ color: INK }}>Our </span>
            <span style={{ color: TEAL }}>Values</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="relative mt-4 text-[15.5px] leading-[1.8] text-slate-600">
            Every choice we make is guided by our principles, which are based on honesty, quality, and a dedication to the success of our
            clients.
          </motion.p>
          <motion.span variants={fadeUp} className="mt-5 flex items-center justify-center gap-1.5" aria-hidden>
            <span className="h-[3px] w-7 rounded-full" style={{ backgroundColor: TEAL }} />
            <span className="h-[4px] w-[4px] rounded-full" style={{ backgroundColor: TEAL }} />
            <span className="h-[4px] w-[4px] rounded-full" style={{ backgroundColor: DEEP_TEAL, opacity: 0.6 }} />
          </motion.span>
        </motion.div>

        <div className="mx-auto mt-12 hidden max-w-[1200px] lg:block">
          <ValuesDiagram />
        </div>
        <div className="mt-12 lg:hidden">
          <ValuesList />
        </div>
      </Container>
    </section>
  );
}
