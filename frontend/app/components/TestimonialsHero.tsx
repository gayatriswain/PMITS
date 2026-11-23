"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { useFitScale } from "./useFitScale";

const INK = "#0d1b33";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
// gentle in-and-out curve for the cards rising out of the podium, so they start and settle softly
const RISE_EASE = [0.45, 0, 0.2, 1] as [number, number, number, number];

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

const UsersIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16 14.2a4.5 4.5 0 0 1 5.5 4.3" />
  </svg>
);
const RocketIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M14 4.5c2.5-1.3 5-1.5 6-1 .5 1 .3 3.5-1 6l-7 7-5-5Z" />
    <path d="M7 11.5 4 11l3-4h4.5M12.5 17l.5 3 4-3v-4.5" />
    <circle cx="15.5" cy="8.5" r="1.4" />
  </svg>
);
const BarsIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20h17M6 20v-5M10.5 20v-8M15 20v-6M19.5 20V8" />
  </svg>
);
const HeartIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0 1 12 6.8 4.5 4.5 0 0 1 20 9.5C20 15.3 12 20 12 20Z" />
  </svg>
);
const CodeIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
  </svg>
);
const TrendIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
  </svg>
);
const StarIcon = ({ size = 16, color = "#f59e0b" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" />
  </svg>
);
const ArrowDownIcon = ({ size = 18, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

const STATS = [
  { Icon: UsersIcon, value: "200+", label: "Happy Clients" },
  { Icon: RocketIcon, value: "5+", label: "Years of Impact" },
  { Icon: BarsIcon, value: "50+", label: "Industries Served" },
  { Icon: HeartIcon, value: "98%", label: "Client Satisfaction" },
];

// client avatars as coloured initials until real client photos are available
const AVATARS = [
  { initials: "JC", bg: "linear-gradient(135deg,#0f766e,#14b8a6)" },
  { initials: "SM", bg: "linear-gradient(135deg,#9a3412,#f97316)" },
  { initials: "RA", bg: "linear-gradient(135deg,#1e3a8a,#3b82f6)" },
  { initials: "PK", bg: "linear-gradient(135deg,#6d28d9,#a78bfa)" },
  { initials: "DL", bg: "linear-gradient(135deg,#334155,#64748b)" },
];

// the editor's code, as coloured tokens per line: [indent (in tab stops), [text, colour][]]
const T = { tag: "#f472b6", attr: "#7dd3fc", str: "#86efac", text: "#e2e8f0", kw: "#c4b5fd", fn: "#fcd34d" };
const CODE: [number, [string, string][]][] = [
  [0, [["<div ", T.tag], ["class", T.attr], ['="testimonial"', T.str], [">", T.tag]]],
  [1, [["<h2>", T.tag], ["Real results", T.text], ["</h2>", T.tag]]],
  [1, [["<p ", T.tag], ["class", T.attr], ['="quote"', T.str], [">", T.tag]]],
  [2, [["{client.feedback}", T.fn]]],
  [1, [["</p>", T.tag]]],
  [1, [["<Rating ", T.tag], ["value", T.attr], ["={5}", T.fn], [" />", T.tag]]],
  [0, [["</div>", T.tag]]],
  [0, [["", T.text]]],
  [0, [["const ", T.kw], ["growth", T.text], [" = ", T.text], ["measure", T.fn], ["()", T.text]]],
  [0, [["export default ", T.kw], ["Success", T.fn]]],
];

/* ---------- Right side: drawn on a fixed 620×580 canvas, zoomed to fit, so every piece lands on the podium ---------- */
const CANVAS_W = 620;
const CANVAS_H = 580;

function CodeWindow() {
  return (
    <div className="h-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#1b2742] to-[#0b1222] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),4px_5px_0_0_#334155,8px_10px_0_0_#1e293b,0_44px_70px_-25px_rgba(13,27,51,0.8)] ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="flex h-full">
        <div className="flex flex-col items-center gap-4 border-r border-white/10 px-2.5 py-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500 shadow-[0_0_16px_rgba(34,211,238,0.6)]">
            <CodeIcon size={15} color="#fff" />
          </span>
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="h-4 w-4 rounded border border-slate-500/70" />
          ))}
        </div>
        <pre className="flex-1 px-3 py-3 font-mono text-[10px] leading-[1.8]">
          {CODE.map(([indent, tokens], i) => (
            <div key={i} className="flex">
              <span className="mr-3 w-4 select-none text-right text-slate-500">{i + 1}</span>
              <span style={{ paddingLeft: indent * 14 }}>
                {tokens.map(([t, c], k) => (
                  <span key={k} style={{ color: c }}>
                    {t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

/* Thick frosted-glass slab: the stacked offset shadows read as its edge, the inset light as its bevel */
function QuoteCard() {
  return (
    <div
      className="rounded-[22px] bg-gradient-to-br from-white via-[#f4f8fc] to-[#e6eef7] px-6 py-6 backdrop-blur-md"
      style={{
        boxShadow: [
          "inset 0 1px 0 #fff",
          "inset 0 0 0 1px rgba(255,255,255,0.9)",
          "inset -2px -3px 6px rgba(148,163,184,0.25)",
          "3px 4px 0 0 #e8eef6",
          "6px 8px 0 0 #d6e0ec",
          "9px 12px 0 0 #c3d1e2",
          "10px 14px 2px 0 rgba(125,211,252,0.35)",
          "0 44px 60px -22px rgba(13,27,51,0.5)",
        ].join(","),
      }}
    >
      <span className="block font-serif text-[60px] font-bold leading-[0.55]" style={{ color: DEEP_TEAL }} aria-hidden>
        &ldquo;
      </span>
      <p className="mt-3 text-[12.5px] leading-[1.6] text-slate-700">
        ProManage transformed our outdated website into a modern, high-performing platform. Their team understood our goals perfectly and
        delivered beyond expectations.
      </p>
      <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} size={17} />
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold text-white ring-2 ring-white" style={{ background: AVATARS[0].bg }}>
          JC
        </span>
        <span>
          <span className="block text-[14px] font-semibold" style={{ color: INK }}>
            James Carter
          </span>
          <span className="block text-[12px] text-slate-500">CEO, ModuLux</span>
        </span>
      </div>
    </div>
  );
}

/* Chunky frosted tile, tilted in 3D */
function FloatTile({ children, x, y, size = 68, tilt, delay }: { children: React.ReactNode; x: number; y: number; size?: number; tilt: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="absolute z-30"
      style={{ left: x, top: y, width: size, height: size }}
    >
      <span
        className="flex h-full w-full items-center justify-center rounded-[18px] bg-gradient-to-br from-white/95 to-white/70 backdrop-blur"
        style={{
          transform: `perspective(600px) ${tilt}`,
          boxShadow: "inset 0 1px 0 #fff, 3px 4px 0 -1px rgba(203,213,225,0.9), 0 18px 30px -14px rgba(13,27,51,0.45)",
        }}
      >
        {children}
      </span>
    </motion.span>
  );
}

function Showcase() {
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[640px]" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* big pale disc behind the scene */}
        <div
          className="absolute rounded-full"
          style={{ left: 170, top: 20, width: 440, height: 440, background: "radial-gradient(circle at 40% 35%, #f0fbfa, #d7efed 60%, #c5e7e4)" }}
          aria-hidden
        />
        {/* dotted trails linking the floating tiles to the editor */}
        <svg className="absolute inset-0" width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} fill="none" aria-hidden>
          <path d="M118 76 C 60 120, 44 190, 58 250" stroke="#5eead4" strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" />
          <path d="M64 316 C 80 380, 150 410, 210 395" stroke="#5eead4" strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" />
          <path d="M560 120 C 585 170, 590 220, 570 270" stroke="#5eead4" strokeWidth="1.6" strokeDasharray="2 6" strokeLinecap="round" />
        </svg>

        {/* podium, its glowing top sitting right under the quote card; stretched sideways so its rings spread wider */}
        <div className="absolute" style={{ left: 0, top: 10, width: CANVAS_W, height: CANVAS_H, transform: "scaleX(1.35)", transformOrigin: "62% 100%" }}>
          <Image src="/Client%20Testimonials1.png" alt="" fill priority sizes="640px" className="object-contain mix-blend-multiply" aria-hidden />
        </div>

        {/* both cards rise out of the podium's glowing top, growing from tiny to full size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.1, x: 105, y: 116 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 2.4, ease: RISE_EASE, delay: 0.3 }}
          className="absolute origin-bottom"
          style={{ left: 110, top: 60, width: 300, height: 255 }}
        >
          {/* the tilt sits on its own layer: framer-motion owns the transform of the animated wrapper */}
          <div className="h-full" style={{ transform: "perspective(1200px) rotateY(-14deg) skewX(-7deg) skewY(-3deg)" }}>
            <CodeWindow />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.1, x: -32, y: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{ duration: 2.4, ease: RISE_EASE, delay: 1.1 }}
          className="absolute z-20 origin-bottom"
          style={{ left: 240, top: 150, width: 315 }}
        >
          <div style={{ transform: "perspective(1400px) rotateY(-8deg) skewX(-8deg) skewY(-1deg)" }}>
            <QuoteCard />
          </div>
        </motion.div>

        <FloatTile x={64} y={14} tilt="rotateY(-16deg) rotateZ(-6deg)" delay={0.8}>
          <CodeIcon size={28} color="#0e7490" />
        </FloatTile>
        <FloatTile x={520} y={40} size={76} tilt="rotateY(-20deg) rotateZ(6deg)" delay={1}>
          <TrendIcon size={30} color="#0e7490" />
        </FloatTile>
        <FloatTile x={30} y={320} size={62} tilt="rotateY(18deg) rotateZ(-8deg)" delay={1.2}>
          <StarIcon size={26} color="#0e7490" />
        </FloatTile>
      </div>
    </div>
  );
}

function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.9 }}
      className="grid grid-cols-2 gap-y-5 rounded-2xl bg-white/90 px-4 py-5 shadow-[0_24px_50px_-26px_rgba(13,27,51,0.45)] ring-1 ring-slate-100 backdrop-blur md:grid-cols-4"
    >
      {STATS.map((s, i) => (
        <div key={s.label} className={`flex items-center justify-center gap-3 px-3 ${i > 0 ? "md:border-l md:border-slate-200" : ""} ${i % 2 === 1 ? "border-l border-slate-200" : ""}`}>
          <s.Icon size={28} color={DEEP_TEAL} />
          <span className="leading-tight">
            <span className="block text-[22px] font-bold" style={{ color: INK }}>
              {s.value}
            </span>
            <span className="block text-[12.5px] text-slate-500">{s.label}</span>
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function TestimonialsHero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-14 pt-12 lg:pb-16 lg:pt-16">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
              Client Testimonials
            </motion.p>
            <motion.span variants={fadeUp} className="mt-2 block h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} />
            <motion.h1 variants={fadeUp} className="mt-5 text-[52px] font-bold leading-[1.02] tracking-tight sm:text-[72px]">
              <span className="block" style={{ color: INK }}>
                Results
              </span>
              <span className="relative inline-block" style={{ color: DEEP_TEAL }}>
                Speak Louder<span style={{ color: TEAL }}>.</span>
                <svg className="pointer-events-none absolute -bottom-2 left-0 h-3 w-[62%]" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 text-[17px] leading-[1.7] text-slate-600">
              Real feedback. Real relationships.
              <br />
              Real results that <span className="font-semibold" style={{ color: TEAL }}>drive businesses forward.</span>
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex -space-x-1.5">
                {AVATARS.map((a) => (
                  <span
                    key={a.initials}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[12px] font-bold text-white ring-[3px] ring-white"
                    style={{ background: a.bg }}
                  >
                    {a.initials}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-[13px] font-bold text-white shadow-[0_10px_20px_-10px_rgba(15,92,86,0.8)]"
                  style={{ background: `linear-gradient(135deg, ${DEEP_TEAL}, ${TEAL})` }}
                >
                  200+
                </span>
                <span className="text-[14px] leading-snug text-slate-600">
                  Happy clients
                  <br />
                  worldwide
                </span>
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
                Explore their stories
              </p>
              <Link
                href="#client-stories"
                aria-label="Explore their stories"
                className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_12px_24px_-12px_rgba(13,27,51,0.45)] ring-1 ring-teal-100 transition hover:translate-y-0.5"
              >
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                  <ArrowDownIcon />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <Showcase />
        </div>

        <div className="relative z-10 mt-6 lg:-mt-20 lg:ml-[18%] lg:mr-[8%]">
          <StatsBar />
        </div>
      </Container>
    </section>
  );
}
