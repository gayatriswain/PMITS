"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Oswald } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { useFitScale } from "./useFitScale";

const oswald = Oswald({ subsets: ["latin"], weight: ["600", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const NAVY = "#132a43";
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

const GlobeUsersIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="7" r="2.5" />
    <circle cx="5.5" cy="10" r="2" />
    <circle cx="18.5" cy="10" r="2" />
    <path d="M7.5 19a4.5 4.5 0 0 1 9 0M2 18a3.5 3.5 0 0 1 5-3M22 18a3.5 3.5 0 0 0-5-3" />
  </svg>
);
const ShieldIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const TeamIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16 14.2A4.8 4.8 0 0 1 21.5 19" />
  </svg>
);
const ChartUpIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 20v-4M10 20v-7M15 20v-5M20 20V9" />
    <path d="m4 11 5-4 4 3 7-6" />
  </svg>
);
const ArrowIcon = ({ size = 18, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const QuoteIcon = ({ size = 14, color = "#fff" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-.5v2H6a4 4 0 0 0 4-4Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-.5v2h.5a4 4 0 0 0 4-4Z" />
  </svg>
);

const HIGHLIGHTS = [
  { Icon: GlobeUsersIcon, label: ["Global Clients", "75+ Cities"] },
  { Icon: ShieldIcon, label: ["Proven", "Expertise"] },
  { Icon: TeamIcon, label: ["Dedicated", "Team"] },
  { Icon: ChartUpIcon, label: ["Results", "That Matter"] },
];

/* ---------- Floating holographic panels over the office photo ---------- */
const HOLO_INK = "#ecfeff";

/* See-through holographic glass card with a bright cyan rim, tilted as if hovering over the belt */
function Glass({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div style={{ transform: "perspective(700px) rotateY(-16deg) rotateX(7deg)" }}>
      <div
        className="relative overflow-hidden rounded-xl border-[1.5px] border-white/85 bg-gradient-to-br from-cyan-50/25 via-sky-300/10 to-cyan-900/30 backdrop-blur-[2px] shadow-[0_0_10px_rgba(165,243,252,0.9),0_0_28px_-4px_rgba(34,211,238,0.6),inset_0_0_16px_rgba(165,243,252,0.35)]"
      >
        {/* glare */}
        <span className="pointer-events-none absolute -left-1/3 -top-1/2 h-full w-[140%] rotate-12 bg-gradient-to-b from-white/25 to-transparent" />
        <div className={`relative ${className}`}>{children}</div>
      </div>
    </div>
  );
}

const Line = ({ w, className = "bg-white/60" }: { w: string; className?: string }) => (
  <span className={`block h-[3px] rounded-full ${className}`} style={{ width: w }} />
);
const Lines = ({ widths, className }: { widths: string[]; className?: string }) => (
  <div className="space-y-[5px]">
    {widths.map((w, i) => (
      <Line key={i} w={w} className={className} />
    ))}
  </div>
);

function Globe() {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="wwaOcean" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#cffafe" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.6" />
          <stop offset="85%" stopColor="#0e6fa8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0b4f86" stopOpacity="0.75" />
        </radialGradient>
        <radialGradient id="wwaAtmo" cx="50%" cy="50%" r="50%">
          <stop offset="82%" stopColor="#67e8f9" stopOpacity="0" />
          <stop offset="92%" stopColor="#67e8f9" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wwaShine" cx="32%" cy="26%" r="40%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern id="wwaDots" width="2.4" height="2.4" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="0.55" fill="#f0fdff" />
        </pattern>
        <clipPath id="wwaClip">
          <circle cx="60" cy="60" r="44" />
        </clipPath>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#wwaAtmo)" />
      <circle cx="60" cy="60" r="44" fill="url(#wwaOcean)" />
      <g clipPath="url(#wwaClip)">
        {/* continents (Americas / Europe-Africa / Asia) */}
        <g fill="#f0fdff" fillOpacity="0.6" stroke="#ffffff" strokeWidth="0.6">
          <path d="M24 30c5-4 13-5 18-2 3 2 1 6 4 8 3 3 1 8-3 9-3 1-4 5-7 6-2 1-2 5-5 5-3-1-3-5-6-7-3-3-5-7-4-11 0-3 1-6 3-8Z" />
          <path d="M40 62c4-1 8 2 9 6 1 5-1 9-3 13-2 5-3 11-6 13-2 1-3-3-3-6 0-5-3-9-3-14 0-5 2-11 6-12Z" />
          <path d="M60 28c4-2 9-1 11 2 2 2 0 5 2 7 3 2 2 6-1 7-3 1-5 0-7 2-2 2-6 1-7-2-1-3-2-6-1-9 1-3 1-6 3-7Z" />
          <path d="M62 50c5-2 11 0 13 5 2 6 0 13-3 18-2 5-6 9-9 8-3-1-3-6-4-10-1-5-2-10-1-15 0-3 2-5 4-6Z" />
          <path d="M76 30c6-2 14-1 19 3 4 4 6 9 4 13-2 3-6 2-9 4-3 3-2 8-6 9-4 1-6-3-8-6-2-4-6-6-6-10 0-5 2-11 6-13Z" />
          <path d="M88 70c4-1 8 1 9 4 1 4-2 7-6 7s-6-2-6-5c0-3 1-5 3-6Z" />
        </g>
        <circle cx="60" cy="60" r="44" fill="url(#wwaDots)" opacity="0.25" />
        {/* clouds */}
        <g fill="#fff" opacity="0.35">
          <ellipse cx="44" cy="44" rx="14" ry="3" />
          <ellipse cx="78" cy="58" rx="12" ry="2.5" />
          <ellipse cx="56" cy="84" rx="16" ry="3" />
        </g>
        {/* graticule */}
        <g fill="none" stroke="#e0fbff" strokeWidth="0.6" opacity="0.35">
          <ellipse cx="60" cy="60" rx="20" ry="44" />
          <ellipse cx="60" cy="60" rx="36" ry="44" />
          <path d="M16 60h88M20 40h80M20 80h80" />
        </g>
        {/* night side */}
        <circle cx="76" cy="72" r="46" fill="#031b33" opacity="0.15" />
      </g>
      <circle cx="60" cy="60" r="44" fill="url(#wwaShine)" />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#a5f3fc" strokeWidth="1" opacity="0.8" />
    </svg>
  );
}

type Panel = { node: React.ReactNode };

// Middle of the white glass panel of the belt in photo pixels (1536×1024), traced from the photo as cubic
// Béziers: emerges behind the glass wall, sweeps right, then curves down-left off the bottom.
type Pt = [number, number];
const BELT: [Pt, Pt, Pt, Pt][] = [
  [[1370, 428], [1425, 448], [1445, 515], [1432, 578]],
  [[1432, 578], [1418, 630], [1350, 662], [1260, 698]],
  [[1260, 698], [1140, 745], [1020, 785], [920, 815]],
  [[920, 815], [820, 845], [720, 875], [620, 905]],
  // carries on past the bottom-left of the photo, so panels slide out of view instead of vanishing
  [[620, 905], [480, 947], [330, 995], [150, 1080]],
];
const LANE_GAP = 80; // furthest a panel strays from the centre line, in photo pixels

/* The belt's centre line pushed sideways by `side` × LANE_GAP. The offset widens along the far half of
   the belt, so panels leave the glass wall together and spread out as they come forward. */
function lanePath(side: number) {
  const steps = 24;
  const pts: string[] = [];
  BELT.forEach(([a, b, c, d], si) => {
    for (let k = si === 0 ? 0 : 1; k <= steps; k++) {
      const t = k / steps;
      const u = 1 - t;
      const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0];
      const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1];
      const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
      const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
      const len = Math.hypot(dx, dy) || 1;
      const ramp = Math.min(1, (si + t) / 2);
      const off = side * LANE_GAP * ramp;
      pts.push(`${(x - (dy / len) * off).toFixed(1)} ${(y + (dx / len) * off).toFixed(1)}`);
    }
  });
  return `M${pts.join(" L")}`;
}
const BELT_LOOP_S = 16;
// how many panels ride the belt at once — the 10 designs repeat to fill it
const BELT_COUNT = 22;
// hand-picked "random" scatter (fixed so server and client render the same): sideways position on the
// belt, -1…1, and a nudge forward/back from the even spacing, as a fraction of one slot
const SCATTER: [number, number][] = [
  [-0.85, 0], [0.55, 0.3], [-0.15, -0.2], [0.95, 0.15], [-0.6, -0.3], [0.25, 0.25], [-1, 0.05], [0.7, -0.25],
  [0.05, 0.3], [-0.45, -0.1], [0.9, 0.2], [-0.75, -0.25], [0.4, 0.1], [-0.1, 0.35], [0.65, -0.15], [-0.95, 0.2],
  [0.15, -0.3], [-0.5, 0.15], [0.8, -0.05], [-0.3, 0.3], [0.5, -0.2], [-0.7, 0.1],
];
const RIDER_PATHS = SCATTER.map(([side]) => lanePath(side));

const PANELS: Panel[] = [
  // app grid + mini bars
  {
    node: (
      <Glass className="flex h-[70px] w-[104px] items-center gap-2.5 p-2.5">
        <div className="grid grid-cols-2 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-[18px] w-[18px] rounded-[4px] border border-white/90 bg-white/60 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
          ))}
        </div>
        <div className="flex h-[38px] flex-1 items-end gap-[3px]">
          {[40, 65, 50, 85, 70].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[2px] bg-gradient-to-t from-cyan-400/80 to-cyan-100 shadow-[0_0_6px_rgba(34,211,238,0.7)]" style={{ height: `${h}%` }} />
          ))}
        </div>
      </Glass>
    ),
  },
  // list dashboard
  {
    node: (
      <Glass className="w-[118px] p-2.5">
        <Line w="55%" className="h-[4px] bg-white/85" />
        <div className="mt-2 space-y-1.5">
          {[78, 60, 70].map((w, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-[6px] w-[6px] rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              <Line w={`${w}%`} />
            </div>
          ))}
        </div>
      </Glass>
    ),
  },
  // donut stat
  {
    node: (
      <Glass className="flex w-[124px] items-center gap-2.5 p-2.5">
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <circle cx="20" cy="20" r="15" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="5" />
          <circle cx="20" cy="20" r="15" fill="none" stroke="#22d3ee" strokeWidth="5" strokeDasharray="66 100" strokeLinecap="round" transform="rotate(-90 20 20)" />
          <text x="20" y="23.5" textAnchor="middle" fontSize="9" fontWeight="700" fill={HOLO_INK}>72%</text>
        </svg>
        <div className="flex-1">
          <Lines widths={["90%", "65%", "78%"]} />
        </div>
      </Glass>
    ),
  },
  // globe on a glowing stand
  {
    node: (
      <Glass className="relative flex h-[168px] w-[156px] flex-col items-center px-3 pt-3">
        <div className="h-[118px] w-[118px] drop-shadow-[0_0_16px_rgba(56,189,248,0.75)]">
          <Globe />
        </div>
        <span className="mt-1 h-[3px] w-[3px] bg-white/80" />
        <span className="h-[8px] w-[70px] rounded-[50%] bg-cyan-200/80 shadow-[0_0_14px_4px_rgba(34,211,238,0.7)]" />
      </Glass>
    ),
  },
  // report panel
  {
    node: (
      <Glass className="w-[210px]">
        <div className="flex items-center gap-1.5 bg-cyan-900/25 px-3 py-1.5">
          <span className="h-[6px] w-[6px] rounded-full bg-cyan-300 shadow-[0_0_6px_#22d3ee]" />
          <Line w="38%" className="h-[4px] bg-white/85" />
          <span className="ml-auto flex gap-1">
            <span className="h-[5px] w-[5px] rounded-full bg-white/70" />
            <span className="h-[5px] w-[5px] rounded-full bg-white/70" />
          </span>
        </div>
        <div className="grid grid-cols-[1fr_70px] gap-3 px-3 pt-2.5">
          <Lines widths={["95%", "82%", "90%", "70%", "86%"]} />
          <div className="space-y-[5px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-1">
                <span className="h-[9px] flex-1 rounded-[2px] bg-white/60" />
                <span className="h-[9px] w-[16px] rounded-[2px] bg-cyan-300/70" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-1.5 px-3 pb-2.5 pt-3">
          <span className="h-[12px] w-[38px] rounded-[3px] border border-white/70" />
          <span className="h-[12px] w-[38px] rounded-[3px] bg-cyan-200/60" />
        </div>
      </Glass>
    ),
  },
  // code tile
  {
    node: (
      <Glass className="flex h-[78px] w-[92px] items-center justify-center">
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]" aria-hidden>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
      </Glass>
    ),
  },
  // analytics: bars + trend line
  {
    node: (
      <Glass className="w-[140px] p-2.5">
        <div className="flex items-center justify-between">
          <Line w="45%" className="h-[4px] bg-white/85" />
          <Line w="18%" className="bg-cyan-500/70" />
        </div>
        <div className="relative mt-2 flex h-[46px] items-end gap-[5px]">
          {[30, 45, 38, 60, 52, 78].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-[2px] bg-cyan-200/70" style={{ height: `${h}%` }} />
          ))}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 46" preserveAspectRatio="none" fill="none" aria-hidden>
            <path d="M2 36 20 28l18 6 18-16 18 6 24-14" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Glass>
    ),
  },
  // big bar chart
  {
    node: (
      <Glass className="flex h-[118px] w-[160px] items-end justify-center gap-3 px-5 pb-4 pt-5">
        {[38, 55, 48, 72, 92].map((h, i) => (
          <span
            key={i}
            className="w-[18px] rounded-t-[3px] border border-white bg-gradient-to-t from-cyan-400/80 to-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.85)]"
            style={{ height: `${h}%` }}
          />
        ))}
      </Glass>
    ),
  },
  // sync / logo tile
  {
    node: (
      <Glass className="flex h-[84px] w-[92px] items-center justify-center">
        <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-white/90 shadow-[0_0_12px_rgba(34,211,238,0.8)]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 11a8 8 0 0 0-14.6-4.5M4 4v3h3M4 13a8 8 0 0 0 14.6 4.5M20 20v-3h-3" />
          </svg>
        </span>
      </Glass>
    ),
  },
  // settings toggles
  {
    node: (
      <Glass className="w-[112px] space-y-2 p-2.5">
        {[true, false, true].map((on, i) => (
          <div key={i} className="flex items-center gap-2">
            <Line w="55%" />
            <span className={`ml-auto flex h-[10px] w-[20px] items-center rounded-full p-[2px] ${on ? "justify-end bg-cyan-400/80" : "bg-white/60"}`}>
              <span className="h-[6px] w-[6px] rounded-full bg-white" />
            </span>
          </div>
        ))}
      </Glass>
    ),
  },
];

const PHOTO_W = 1536;
const PHOTO_H = 1024;
const PANEL_SCALE = 0.6 * 1.45;

/* A box with the photo's aspect ratio that covers its parent exactly like
   object-cover + object-position 100% 50% (parent needs container-type: size). */
const COVER = {
  position: "absolute" as const,
  width: `max(100cqw, ${(PHOTO_W / PHOTO_H) * 100}cqh)`,
  height: `max(100cqh, ${(PHOTO_H / PHOTO_W) * 100}cqw)`,
  left: `calc((100cqw - max(100cqw, ${(PHOTO_W / PHOTO_H) * 100}cqh)) * 1)`,
  top: `calc((100cqh - max(100cqh, ${(PHOTO_H / PHOTO_W) * 100}cqw)) * 0.5)`,
};

/* Where panel i sits along the belt (0–1) at `seconds` into the loop — all panels share one clock,
   so they stay evenly spaced like a marquee. Pass `fromEmpty` to start with a bare belt: a panel stays
   hidden (-1) until its slot first reaches the start of the belt, so they come out one by one. */
const beltProgress = (i: number, seconds: number, fromEmpty = false) => {
  const raw = seconds / BELT_LOOP_S + (i + SCATTER[i][1]) / BELT_COUNT;
  if (fromEmpty && raw < 1) return -1;
  return (raw + 1) % 1;
};
const beltStyle = (p: number) =>
  p < 0 ? { offsetDistance: "0%", opacity: 0 } : { offsetDistance: `${p * 100}%`, opacity: Math.min(1, p / 0.03) };
// tiny where the belt emerges far away, growing steadily to full size as the panel comes forward
const growStyle = (p: number) => ({ transform: `scale(${PANEL_SCALE * (0.12 + 0.88 * Math.sqrt(Math.min(1, p / 0.7)))})` });

function FloatingTech() {
  const { ref, scale } = useFitScale(PHOTO_W);
  const riders = useRef<(HTMLDivElement | null)[]>([]);
  const growers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const place = (seconds: number, fromEmpty: boolean) =>
      riders.current.forEach((el, i) => {
        const p = beltProgress(i, seconds, fromEmpty);
        if (el) Object.assign(el.style, beltStyle(p));
        const grower = growers.current[i];
        if (grower) Object.assign(grower.style, growStyle(Math.max(0, p)));
      });
    // no motion: show the belt already full and still
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return place(0, false);
    let frame = 0;
    // skip the wait for the first slot to come round, so a panel leaves the wall straight away
    const lead = Math.max(...SCATTER.map(([, nudge], i) => (i + nudge) / BELT_COUNT));
    const start = performance.now() - (1 - lead) * BELT_LOOP_S * 1000;
    const tick = (now: number) => {
      place((now - start) / 1000, true);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={ref} className="pointer-events-none" style={COVER} aria-hidden>
      <div
        className="absolute left-0 top-0"
        style={{ width: PHOTO_W, height: PHOTO_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {Array.from({ length: BELT_COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              riders.current[i] = el;
            }}
            className="absolute left-0 top-0"
            style={{ offsetPath: `path("${RIDER_PATHS[i]}")`, offsetRotate: "0deg", ...beltStyle(-1) }}
          >
            {/* growth lives on a child: scale on the riding element would also shrink the path itself */}
            <div
              ref={(el) => {
                growers.current[i] = el;
              }}
              style={growStyle(0)}
            >
              {PANELS[i % PANELS.length].node}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Partner marks, drawn as simple wordmarks */
function Partners() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 items-center rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_20px_45px_-25px_rgba(15,40,60,0.45)] backdrop-blur-md">
      <div className="flex items-center justify-center gap-1.5 px-3 py-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#95bf47] text-[13px] font-extrabold text-white">S</span>
        <span className="text-[15px] font-bold tracking-tight text-slate-800">
          shopify<span className="font-normal italic text-slate-500">partners</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 px-3 py-2 sm:border-l sm:border-slate-200">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#34313f] text-[13px] font-extrabold text-white">B</span>
        <span className="leading-none">
          <span className="block text-[11.5px] font-bold tracking-wide text-slate-800">BIGCOMMERCE</span>
          <span className="block text-[9.5px] text-slate-500">Partner</span>
        </span>
      </div>
      <div className="flex items-center justify-center px-3 py-2 border-t border-slate-200 sm:border-t-0 sm:border-l">
        <span className="leading-none text-center">
          <span className="block text-[15px] font-semibold">
            <span className="text-[#4285f4]">G</span>
            <span className="text-[#ea4335]">o</span>
            <span className="text-[#fbbc05]">o</span>
            <span className="text-[#4285f4]">g</span>
            <span className="text-[#34a853]">l</span>
            <span className="text-[#ea4335]">e</span>
          </span>
          <span className="block text-[14px] text-slate-600">Partner</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 px-3 py-2 border-t border-l border-slate-200 sm:border-t-0">
        <span className="flex h-6 w-6 rotate-45 items-center justify-center rounded-[5px]" style={{ background: `linear-gradient(135deg, ${DEEP_TEAL}, #22c55e)` }}>
          <span className="-rotate-45 text-[12px] font-extrabold text-white">e</span>
        </span>
        <span className="text-[15px] font-semibold text-slate-700">
          <span className="text-[#16a34a]">eLearning</span>.com
        </span>
      </div>
    </div>
  );
}

export default function WhoWeAreHero() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-gradient-to-br lg:block from-white via-[#f7fbfb] to-[#eef7f6]">
      {/* Office photo — full-height on the right from lg up, fading into the copy */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative order-last h-[320px] w-full overflow-hidden sm:h-[420px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]"
        style={{ containerType: "size" }}
      >
        <div style={COVER}>
          <Image
            src="/who-we-are.webp"
            alt="ProManage IT Solutions office reception"
            fill
            priority
            sizes="(min-width: 1024px) 90vw, 150vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#f7fbfb] via-[#f7fbfb]/40 via-[18%] to-transparent to-[40%]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f7fbfb] to-transparent lg:hidden" />
        <FloatingTech />
      </motion.div>

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_1fr] gap-10 pt-10 pb-12 lg:pt-16 lg:pb-14 lg:min-h-[640px]">
          {/* Left copy */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col justify-center">
            <motion.p variants={fadeUp} className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: DEEP_TEAL }}>
              Technology That Moves Businesses Forward
              <span className="h-px w-10 bg-teal-300" />
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className={`${oswald.className} mt-3 text-[46px] sm:text-[62px] lg:text-[70px] font-bold uppercase leading-[0.98] tracking-tight`}
            >
              <span className="block" style={{ color: NAVY }}>Solutions Today.</span>
              <span className="relative inline-block bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL} 55%, #14b8a6)` }}>
                Success Tomorrow.
                <svg className="pointer-events-none absolute -right-9 -top-5 hidden sm:block" width="40" height="34" viewBox="0 0 40 34" fill="none" aria-hidden>
                  <path d="M4 30C14 26 26 16 34 6" stroke={TEAL} strokeWidth="2.4" strokeLinecap="round" />
                  <path d="M26 5l9-1-1 9" stroke={TEAL} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className={`${caveat.className} mt-4 text-[30px] sm:text-[34px] leading-none`} style={{ color: NAVY }}>
              Built on trust. Driven by impact.
              <svg className="mt-1 block h-2 w-[260px]" viewBox="0 0 260 8" fill="none" preserveAspectRatio="none" aria-hidden>
                <path d="M2 6C80 1 180 1 258 4" stroke={TEAL} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.p>

            <motion.p variants={fadeUp} className="mt-6 max-w-[520px] text-[15px] leading-[1.7] text-slate-600">
              Founded on a commitment to empowering businesses through advanced IT services, ProManage IT Solution has grown
              from a dedicated team of tech professionals into a global agency serving clients across{" "}
              <span className="font-semibold" style={{ color: DEEP_TEAL }}>75+ global cities.</span>
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-slate-600">
              We combine strategic insight, strong methodology, and a passion for innovation to help organizations{" "}
              <span className="font-semibold" style={{ color: DEEP_TEAL }}>thrive in a fast-changing digital landscape.</span>
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-8 grid max-w-[520px] grid-cols-2 sm:grid-cols-4 gap-y-6">
              {HIGHLIGHTS.map((h, i) => (
                <li
                  key={h.label[0]}
                  className={`flex flex-col items-center gap-2.5 px-2 text-center ${i > 0 ? "sm:border-l sm:border-slate-200" : ""} ${i % 2 === 1 ? "border-l border-slate-200" : ""}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-100 bg-teal-50/80">
                    <h.Icon />
                  </span>
                  <span className="text-[13px] font-semibold leading-snug" style={{ color: NAVY }}>
                    {h.label[0]}
                    <br />
                    {h.label[1]}
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="mt-9">
              <Link href="/contact" className="group inline-flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full shadow-[0_15px_30px_-12px_rgba(13,148,136,0.7)] transition-transform group-hover:translate-x-1"
                  style={{ background: `linear-gradient(135deg, ${DEEP_TEAL}, ${TEAL})` }}
                >
                  <ArrowIcon />
                </span>
                <span className="relative text-[15px] font-bold uppercase tracking-[0.06em]" style={{ color: NAVY }}>
                  Get My Free Proposal
                  <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-75 rounded-full transition-transform group-hover:scale-x-100" style={{ backgroundColor: TEAL }} />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — quote bubble and partners sit over the photo */}
          <div className="relative hidden lg:flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
              className="mt-[190px] ml-[2%] flex h-[230px] w-[230px] flex-col items-center justify-center rounded-full px-8 text-center text-white shadow-[0_30px_60px_-25px_rgba(15,92,86,0.8)] ring-[10px] ring-white/40"
              style={{ background: `radial-gradient(circle at 30% 25%, #14b8a6, ${DEEP_TEAL} 75%)` }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <QuoteIcon />
              </span>
              <p className="mt-3 text-[16px] leading-snug">
                We don&apos;t just build solutions, we build{" "}
                <span className="font-bold">digital success stories.</span>
              </p>
              <svg className="mt-2" width="70" height="8" viewBox="0 0 70 8" fill="none" aria-hidden>
                <path d="M2 6C24 2 46 2 68 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Partners strip — spans the photo on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="relative pb-10 xl:absolute xl:bottom-8 xl:right-6 xl:w-[54%] xl:max-w-[720px] xl:pb-0"
        >
          <Partners />
        </motion.div>
      </Container>
    </section>
  );
}
