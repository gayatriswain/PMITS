"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useFitScale } from "../shared/useFitScale";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const oswald = { className: "font-heading" }; // global font from app/layout.tsx
const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const NAVY = "#132a43";
const INK = "#0d1b33";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
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
const PenIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 19 7-7 3 3-7 7Z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18Z" />
    <path d="m2 2 7.6 7.6" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);
const CodeIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
  </svg>
);
const CodeSlashIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </svg>
);
const GrowIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 20v-5M10 20v-8M15 20v-6M20 20V9" />
    <path d="m4 11 5-4 4 3 7-6M16 4h4v4" />
  </svg>
);
const ShieldIcon = ({ size = 18, color = "#5eead4" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const PlayIcon = ({ size = 13, color = NAVY }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

const STEPS__cms = [
  { Icon: TargetIcon, title: "Strategy", desc: ["Understand", "the business."] },
  { Icon: PenIcon, title: "Design", desc: ["Shape the", "experience."] },
  { Icon: CodeIcon, title: "Build", desc: ["Bring the", "solution to life."] },
  { Icon: GrowIcon, title: "Grow", desc: ["Keep improving", "what comes next."] },
];

/* ---------- Centre visual: a real CSS-3D scene on a 660×540 canvas, zoomed to fit ---------- */
const CANVAS_W = 660;
const CANVAS_H = 540;

// faint "code" texture on the monolith
const CODE_ROWS = [62, 40, 78, 55, 30, 70, 48, 84, 36, 66, 52, 74, 44, 60, 28, 80, 50, 68, 38, 58, 46, 72];

// faint dotted world map on the board: a dot grid kept only inside rough continent ellipses (cx, cy, rx, ry)
const CONTINENTS = [
  [62, 44, 46, 26], [96, 104, 17, 30], [156, 38, 20, 14], [162, 88, 22, 30], [218, 46, 52, 26], [258, 112, 20, 11],
];
const MAP_DOTS: [number, number][] = [];
for (let y = 6; y < 150; y += 6) {
  for (let x = 6; x < 312; x += 6) {
    if (CONTINENTS.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1)) MAP_DOTS.push([x, y]);
  }
}
// short "code" lines in two blocks on the board, as [indent, width] in px
const CODE_LINES: [number, number][] = [
  [0, 70], [10, 110], [10, 46], [20, 92], [20, 60], [10, 120], [0, 54], [10, 84], [10, 38],
];

type Faces = { front: React.ReactNode; top?: string; right?: string; frontClass?: string };

/* An axis-aligned box in the 3D scene. x/y place its top-left corner, z its back plane; the box runs d
   towards the viewer. The camera sits up and to the right, so the top and right faces are the ones that show. */
function Box({ x, y, z, w, h, d, faces }: { x: number; y: number; z: number; w: number; h: number; d: number; faces: Faces }) {
  const face = "absolute left-0 top-0 [backface-visibility:hidden]";
  return (
    <div className="absolute [transform-style:preserve-3d]" style={{ left: x, top: y, width: w, height: h, transform: `translateZ(${z}px)` }}>
      <div className={`${face} ${faces.frontClass ?? ""}`} style={{ width: w, height: h, transform: `translateZ(${d}px)` }}>
        {faces.front}
      </div>
      {faces.top && (
        <div className={face} style={{ width: w, height: d, background: faces.top, transformOrigin: "top", transform: "rotateX(90deg)" }} />
      )}
      {faces.right && (
        <div
          className={face}
          style={{ width: d, height: h, left: w - d, background: faces.right, transformOrigin: "right", transform: "rotateY(90deg)" }}
        />
      )}
    </div>
  );
}

// hinge for the monolith: its right edge, rotated so the left edge recedes
const BOARD_SWING = { transformOrigin: "350px 0 -60px", transform: "rotateY(-17deg)" };

// one camera for every layer of the scene: head-on, with the eye up and to the right of the blocks
const SCENE_PERSPECTIVE = { perspective: 1000, perspectiveOrigin: "45% 58%" };
// the step blocks get their own eye further right, so their chunky right sides and the top block's lid show
const BLOCK_PERSPECTIVE = { perspective: 1000, perspectiveOrigin: "100% 50%" };
const SCENE_TRANSFORM = "translate(0px, 4px) scale(0.82) rotateY(-13deg)";

function StepFront({ step }: { step: (typeof STEPS__cms)[number] }) {
  return (
    <div className="flex h-full items-center gap-5 border-b border-slate-200 bg-gradient-to-br from-white via-white to-slate-100 px-7 shadow-[inset_0_-10px_20px_-14px_rgba(13,27,51,0.35),inset_-2px_0_0_rgba(103,232,249,0.75),inset_0_2px_0_rgba(255,255,255,1)]">
      <step.Icon size={34} color={TEAL} />
      <span className="leading-tight">
        <span className="block text-[16px] font-bold uppercase tracking-wide" style={{ color: INK }}>{step.title}</span>
        <span className="mt-1 block text-[12.5px] text-slate-600">
          {step.desc[0]}
          <br />
          {step.desc[1]}
        </span>
      </span>
    </div>
  );
}

// stacked flush down the monolith's right edge, each lower block a little further left
const BLOCK_W = 276;
const BLOCK_H = 104;
const BLOCK_D = 180;
const BLOCK_SPOTS = [
  { x: 374, y: 30, z: -70 },
  { x: 366, y: 134, z: -70 },
  { x: 354, y: 238, z: -70 },
  { x: 336, y: 342, z: -70 },
];

// stairs, top step first: its top sits right under the GROW block (y 446); each step below is one rise lower
const FLOOR_Y = 506;
const STAIR_RISE = 15;
const STAIRS = [0, 1, 2, 3].map((k) => {
  const top = FLOOR_Y - (4 - k) * STAIR_RISE;
  const x = 250 - k * 35;
  return { x, y: top, z: -40, w: 640 - x, h: FLOOR_Y - top, d: 150 + k * 60 };
});
const STAIR_TOPS = [
  "linear-gradient(0deg,#f8fafc,#cbd5e1)",
  "linear-gradient(0deg,#e2e8f0,#94a3b8)",
  "linear-gradient(0deg,#3b4d6e,#22345a)",
  "linear-gradient(0deg,#22345a,#132240)",
];

const WHITE_TOP = "linear-gradient(0deg,#ffffff,#eef2f7)";
const WHITE_SIDE = "linear-gradient(90deg,#e2e8f0,#cbd5e1)";
// step block sides: soft grey, brighter where they meet the lit front edge
// with a cyan rim down the front edge and a bright line along the top
const BLOCK_SIDE = [
  "linear-gradient(90deg,rgba(103,232,249,0.95),rgba(103,232,249,0) 4px)",
  "linear-gradient(180deg,#ffffff,rgba(255,255,255,0) 3px)",
  "linear-gradient(90deg,#f1f5f9,#dde4ee 55%,#c3cddb)",
].join(",");
const BLOCK_TOP = "linear-gradient(90deg,rgba(255,255,255,0) calc(100% - 3px),rgba(103,232,249,0.95)),linear-gradient(0deg,#ffffff,#e9eef5)";

function Scene({ children, camera = SCENE_PERSPECTIVE }: { children: React.ReactNode; camera?: React.CSSProperties }) {
  return (
    <div className="absolute inset-0" style={camera}>
      <div className="absolute inset-0 [transform-style:preserve-3d]" style={{ transform: SCENE_TRANSFORM }}>
        {children}
      </div>
    </div>
  );
}

function SolveVisual() {
  const $t = useCmsText();
  const STEPS = useCmsData("WhoWeAreSolve__STEPS", STEPS__cms);
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* circuit traces behind the scene */}
        <svg className="absolute inset-0" width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} fill="none" aria-hidden>
          <g stroke="#5eead4" strokeWidth="1" opacity="0.7">
            <path d="M30 40h50l30 30h50" />
            <path d="M180 20v20l20 20" />
            <path d="M330 10h-30l-20 20" />
          </g>
          <g fill="#2dd4bf">
            {[[30, 40], [160, 70], [180, 20], [200, 60], [330, 10], [280, 30]].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" />
            ))}
          </g>
          <g fill="#5eead4" opacity="0.5">
            {Array.from({ length: 30 }).map((_, i) => (
              <circle key={i} cx={40 + (i % 10) * 12} cy={10 + Math.floor(i / 10) * 12} r="1.3" />
            ))}
          </g>
        </svg>

        {/* floor shadow */}
        <div className="absolute bottom-[10px] left-[20px] h-[60px] w-[600px] rounded-[50%] bg-slate-500/25 blur-2xl" />

        {/* back wall, monolith and stairs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="absolute inset-0"
        >
          <Scene>
            {/* white wall behind the blocks, its top edge lit */}
            <Box
              x={300}
              y={-6}
              z={-150}
              w={320}
              h={470}
              d={40}
              faces={{
                front: (
                  <div className="h-full w-full border-t-2 border-cyan-300 bg-gradient-to-b from-white to-slate-100 shadow-[0_-4px_16px_-6px_rgba(34,211,238,0.9)]" />
                ),
                top: WHITE_TOP,
                right: WHITE_SIDE,
              }}
            />
            {/* the monolith, swung on its right edge so its left side turns away into the scene */}
            <div className="absolute inset-0 [transform-style:preserve-3d]" style={BOARD_SWING}>
            <Box
              x={-120}
              y={-58}
              z={-90}
              w={470}
              h={536}
              d={30}
              faces={{
                frontClass: "overflow-hidden",
                front: (
                  <div className="relative h-full w-full bg-gradient-to-b from-[#132447] via-[#0d1b38] to-[#08122a]">
                    {/* fine screen texture */}
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{ backgroundImage: "radial-gradient(rgba(103,232,249,0.5) 0.7px, transparent 1.1px)", backgroundSize: "8px 8px" }}
                    />
                    {/* dotted world map across the top */}
                    <svg className="absolute left-0 top-[30px] opacity-80" width="470" height="226" viewBox="0 0 312 150" aria-hidden>
                      {MAP_DOTS.map(([x, y]) => (
                        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.1" fill="#7dd3fc" opacity={0.35 + ((x * 7 + y * 3) % 10) / 25} />
                      ))}
                    </svg>
                    {/* two blocks of faint code, left middle and bottom left */}
                    {[404].map((top) => (
                      <div key={top} className="absolute left-5 space-y-[6px] opacity-45" style={{ top }}>
                        {CODE_LINES.map(([indent, w], i) => (
                          <span
                            key={i}
                            className={`block h-[2px] rounded-full ${i % 3 === 1 ? "bg-cyan-300" : "bg-slate-300"}`}
                            style={{ width: w * 0.8, marginLeft: indent }}
                          />
                        ))}
                      </div>
                    ))}
                    {/* lens flare up and to the right, with a light streak running down through the board */}
                    <div className="absolute right-[120px] top-[120px] h-[170px] w-[170px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(103,232,249,0.55),rgba(34,211,238,0.12)_40%,transparent_70%)]" />
                    <span className="absolute right-[118px] top-[118px] h-[5px] w-[5px] rounded-full bg-white shadow-[0_0_14px_6px_rgba(103,232,249,0.95)]" />
                    <span className="absolute left-[40px] top-[150px] h-[2px] w-[160px] origin-left -rotate-[12deg] rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-200/70 to-white/90 blur-[0.5px]" />
                    <span className="absolute left-0 top-[536px] h-[2px] w-[240px] origin-left -rotate-[24deg] rounded-full bg-gradient-to-r from-cyan-300/0 via-cyan-300/80 to-cyan-100 shadow-[0_0_10px_2px_rgba(34,211,238,0.6)]" />
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-300/0 via-cyan-300 to-cyan-300/0 shadow-[0_0_14px_3px_rgba(34,211,238,0.8)]" />
                    {/* logo */}
                    <div className="absolute inset-x-0 top-[240px] flex flex-col items-center pr-[70px]">
                      <motion.span
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="drop-shadow-[0_0_16px_rgba(34,211,238,0.95)]"
                      >
                        <CodeSlashIcon size={96} color="#67e8f9" />
                      </motion.span>
                      <p className="mt-2 text-[25px] font-extrabold tracking-wide text-white">
                        {rich($t("WhoWeAreSolve__t1", "PR"))}<span className="mx-[2px] inline-block h-[13px] w-[13px] rotate-45 border-[3px] border-cyan-400 align-[1px]" />
                        {rich($t("WhoWeAreSolve__t2", "MANAGE"))}</p>
                      <p className="text-caption mt-0.5 font-semibold tracking-[0.32em] text-sky-400">{rich($t("WhoWeAreSolve__t3", "IT SOLUTIONS"))}</p>
                    </div>
                  </div>
                ),
                top: "#2a3d61",
                right: "#0a1428",
              }}
            />
            </div>

            {/* wide stairs climbing back to the step blocks, which stand on the top one. Lower steps reach
                further left and further forward; tops go from glossy silver up high to deep navy at the floor. */}
            {STAIRS.map((step, k) => (
              <Box
                key={k}
                {...step}
                faces={{
                  front: (
                    <div className="h-full w-full border-t-2 border-cyan-300 bg-gradient-to-b from-[#1e2f4f] to-[#0d1b33] shadow-[0_-6px_18px_-4px_rgba(34,211,238,0.85)]" />
                  ),
                  top: STAIR_TOPS[k],
                  right: "#0a1428",
                }}
              />
            ))}

            {/* small cubes, left */}
            <Box x={70} y={402} z={40} w={52} h={52} d={52} faces={{ front: <div className="h-full w-full bg-gradient-to-br from-white to-slate-200" />, top: "#ffffff", right: "#e2e8f0" }} />
            <Box x={70} y={454} z={40} w={52} h={52} d={52} faces={{ front: <div className="h-full w-full bg-gradient-to-br from-white/90 to-slate-200/90" />, top: "#ffffff", right: "#e2e8f0" }} />
            <Box x={14} y={460} z={80} w={46} h={46} d={46} faces={{ front: <div className="h-full w-full bg-gradient-to-br from-[#1b2a44] to-[#0d1b33]" />, top: "#2a3b5c", right: "#08111f" }} />
            <Box x={96} y={466} z={110} w={40} h={40} d={40} faces={{ front: <div className="h-full w-full bg-gradient-to-br from-teal-300/80 to-teal-600/80" />, top: "rgba(153,246,228,0.9)", right: "rgba(15,118,110,0.85)" }} />
          </Scene>
        </motion.div>

        {/* step blocks, each in its own layer so they can slide in one by one */}
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 + i * 0.12 }}
            className="absolute inset-0"
          >
            <Scene camera={BLOCK_PERSPECTIVE}>
              <Box
                {...BLOCK_SPOTS[i]}
                w={BLOCK_W}
                h={BLOCK_H}
                d={BLOCK_D}
                faces={{ front: <StepFront step={s} />, right: BLOCK_SIDE, top: i === 0 ? BLOCK_TOP : undefined }}
              />
            </Scene>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PromiseCard() {
  const $t = useCmsText();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
      className="rounded-2xl bg-gradient-to-b from-[#132447] to-[#0a1630] p-6 text-white shadow-[0_30px_60px_-25px_rgba(13,27,51,0.8)] ring-1 ring-white/5"
    >
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300">
        <ShieldIcon />
        {rich($t("WhoWeAreSolve__t4", "Our Promise"))}</p>
      <h3 className={`text-h5 ${oswald.className} mt-5 font-semibold uppercase tracking-wide`}>
        {$t("WhoWeAreSolve__t5", "We don't just")}<br />
        {$t("WhoWeAreSolve__t6", "deliver projects.")}</h3>
      <p className={`${oswald.className} mt-3 text-[24px] font-semibold uppercase leading-[1.15] tracking-wide text-teal-300`}>
        {rich($t("WhoWeAreSolve__t7", "We build what"))}<br />
        {rich($t("WhoWeAreSolve__t8", "makes it possible."))}</p>
      <span className="mt-5 block h-[2px] w-10 rounded-full bg-teal-300" />
      <p className="text-small mt-5 text-slate-300">
        {rich($t("WhoWeAreSolve__t9", "Every line of code, every design decision and every strategy we craft is aimed at one thing — helping your business move forward, faster."))}</p>
      <div className="mt-6 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full bg-teal-300/50" />
        ))}
      </div>
    </motion.div>
  );
}

function Hexagon({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative flex h-[66px] w-[60px] shrink-0 items-center justify-center drop-shadow-[0_10px_14px_rgba(13,27,51,0.15)]">
      <span
        className="absolute inset-0 bg-white"
        style={{ clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function StepsStrip() {
  const STEPS = useCmsData("WhoWeAreSolve__STEPS", STEPS__cms);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
      className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white/90 shadow-[0_25px_50px_-30px_rgba(13,27,51,0.4)] backdrop-blur"
    >
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className={`relative flex items-center gap-4 px-6 py-6 ${i > 0 ? "border-t border-slate-100 sm:border-t-0 lg:border-l" : ""} ${i === 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 3 ? "sm:border-t lg:border-t-0 sm:border-l" : ""} ${i === 1 ? "sm:border-l" : ""}`}
          >
            <Hexagon>
              <s.Icon size={26} color={i === 2 ? TEAL : INK} />
            </Hexagon>
            <div className="leading-tight">
              <p className="text-body font-bold" style={{ color: TEAL }}>{String(i + 1).padStart(2, "0")}</p>
              <p className="text-small mt-1 font-bold uppercase tracking-wide" style={{ color: INK }}>{s.title}</p>
              <p className="text-caption mt-1 text-slate-500">
                {s.desc[0]}
                <br />
                {s.desc[1]}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full lg:flex"
                style={{ backgroundColor: INK }}
              >
                <ArrowIcon size={12} />
              </span>
            )}
          </li>
        ))}
      </ol>
      {/* progress line */}
      <div className="h-[3px] w-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "62%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.6 }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL}, #22d3ee)` }}
        />
      </div>
    </motion.div>
  );
}

export default function WhoWeAreSolve() {
  const $t = useCmsText();
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f7fbfb] via-white to-[#f4f8fb] py-16 lg:py-20">
      {/* soft accents */}
      <div className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-teal-100/40 blur-3xl" />
      <svg className="pointer-events-none absolute right-6 top-40 hidden opacity-60 lg:block" width="80" height="120" viewBox="0 0 80 120" aria-hidden>
        {Array.from({ length: 48 }).map((_, i) => (
          <circle key={i} cx={5 + (i % 6) * 14} cy={5 + Math.floor(i / 6) * 15} r="1.5" fill="#99d5d0" />
        ))}
      </svg>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,460px)_1fr] xl:gap-12">
          {/* Left copy */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.p variants={fadeUp} className="text-caption flex items-center gap-3 font-semibold uppercase tracking-[0.14em]" style={{ color: DEEP_TEAL }}>
              <span className="h-px w-10 bg-teal-400" />
              {rich($t("WhoWeAreSolve__t10", "We don't just write code."))}</motion.p>

            <motion.h2
              variants={fadeUp}
              className={`text-h2 ${oswald.className} mt-4 font-bold uppercase tracking-tight`}
            >
              <span className="block" style={{ color: INK }}>{$t("WhoWeAreSolve__t11", "We Solve.")}</span>
              <span className="block" style={{ color: INK }}>{$t("WhoWeAreSolve__t12", "We Build.")}</span>
              <span className="relative inline-block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL} 60%, #22d3ee)` }}>
                {$t("WhoWeAreSolve__t13", "We Grow")}<svg className="pointer-events-none absolute -right-12 top-0" width="40" height="38" viewBox="0 0 48 46" fill="none" aria-hidden>
                  <path d="M4 42C16 36 30 22 40 8" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
                  <path d="M31 7l11-3-1 12" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className={`${caveat.className} mt-2 text-[36px] leading-none`} style={{ color: INK }}>
              {rich($t("WhoWeAreSolve__t14", "With You."))}<svg className="mt-1 block h-2 w-[130px]" viewBox="0 0 130 8" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 6C40 1 90 1 128 4" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.p>

            <motion.p variants={fadeUp} className="text-body mt-6 max-w-[440px] text-slate-600">
              {rich($t("WhoWeAreSolve__t15", "At ProManage IT Solutions, we blend strategy, creativity and technology to build digital solutions that drive measurable impact and meaningful growth."))}</motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href={$t("WhoWeAreSolve__t16", "/contact")}
                className="group inline-flex items-center gap-4 rounded-xl py-3 pl-5 pr-3 text-[14.5px] font-semibold text-white shadow-[0_15px_30px_-12px_rgba(13,148,136,0.7)] transition hover:-translate-y-0.5"
                style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL} 55%, #1d4ed8)` }}
              >
                {$t("WhoWeAreSolve__t17", "Start a Conversation")}<span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon size={14} color={DEEP_TEAL} />
                </span>
              </Link>
              <Link href={$t("WhoWeAreSolve__t18", "#how-we-work")} className="group inline-flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-105" style={{ borderColor: INK }}>
                  <PlayIcon color={INK} />
                </span>
                <span className="text-[14.5px] font-semibold" style={{ color: INK }}>{$t("WhoWeAreSolve__t19", "See How We Work")}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Visual, with the promise card overlapping its bottom-right on xl (below it otherwise) */}
          <div className="relative xl:pr-[120px]">
            <SolveVisual />
            <div className="mt-8 relative z-10 xl:absolute xl:-bottom-32 xl:right-[60px] xl:mt-0 xl:w-[290px]">
              <PromiseCard />
            </div>
          </div>
        </div>

        <div id="how-we-work" className="relative mt-10 xl:-mt-6 xl:mr-[380px]">
          <StepsStrip />
        </div>
      </Container>
    </section>
  );
}
