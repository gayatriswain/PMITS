"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

/* =========================================================================
   ICON GLYPHS (white, sit inside the coloured 3D feature badges)
   ========================================================================= */

const glyph = {
  className: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#fff",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const UsersGlyph = () => (
  <svg {...glyph}>
    <circle cx="9" cy="8" r="3.2" fill="#fff" stroke="none" />
    <path d="M3 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5Z" fill="#fff" stroke="none" />
    <circle cx="16.5" cy="9" r="2.5" fill="#fff" stroke="none" opacity="0.8" />
    <path d="M16 13.6c2.9 0 5 1.9 5 4.9h-4.4c0-1.9-.7-3.5-1.9-4.6Z" fill="#fff" stroke="none" opacity="0.8" />
  </svg>
);
const ContactGlyph = () => (
  <svg {...glyph}>
    <rect x="4" y="3" width="15" height="18" rx="2" fill="#fff" stroke="none" />
    <circle cx="11.5" cy="10" r="2.6" fill="#2563eb" stroke="none" />
    <path d="M7.5 17c.6-2 2.1-3 4-3s3.4 1 4 3" stroke="#2563eb" strokeWidth="1.8" />
    <path d="M21 7v3M21 13v3" stroke="#fff" />
  </svg>
);
const WorkflowGlyph = () => (
  <svg {...glyph}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" fill="#fff" stroke="none" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" fill="#fff" stroke="none" />
    <path d="M6.5 10v4a3 3 0 0 0 3 3H14M17.5 14v-4a3 3 0 0 0-3-3H10" />
  </svg>
);
const PieGlyph = () => (
  <svg {...glyph}>
    <path d="M11 3.5a8.5 8.5 0 1 0 9.5 9.5H11Z" fill="#fff" stroke="none" />
    <path d="M13.5 2.5v8h8a8 8 0 0 0-8-8Z" fill="#fff" stroke="none" opacity="0.75" />
  </svg>
);
const CalendarGlyph = () => (
  <svg {...glyph}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="#fff" stroke="none" />
    <path d="M8 3v4M16 3v4" />
    <path d="m8.5 13.5 2.5 2.5 4.5-5" stroke="#16a34a" strokeWidth="2.2" />
  </svg>
);
const ChatGlyph = () => (
  <svg {...glyph}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5Z" fill="#fff" stroke="none" />
    <circle cx="8.5" cy="9.5" r="1.1" fill="#2563eb" stroke="none" />
    <circle cx="12" cy="9.5" r="1.1" fill="#2563eb" stroke="none" />
    <circle cx="15.5" cy="9.5" r="1.1" fill="#2563eb" stroke="none" />
  </svg>
);
const CodeLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <path d="M13 6 3.5 16l9.5 10" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m19 6 9.5 10L19 26" stroke="#2dd4bf" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ArrowCircle = () => (
  <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
    <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" />
    </svg>
  </span>
);

/* =========================================================================
   DATA
   Stage coordinates are % of the desktop stage (aspect 1400 / 600).
   ========================================================================= */

interface Feature {
  title: string;
  desc: string;
  link: string;
  glyph: React.ReactNode;
  gradient: string; // badge gradient
  color: string; // connector colour
  cardY: number; // card centre (stage %)
  node: { x: number; y: number }; // orbit node position (stage %)
  edge: number; // inner edge of the card facing the hub (stage % of width)
}

const leftFeatures: Feature[] = [
  {
    title: "Lead & Pipeline Management",
    desc: "Track leads, move deals forward, and close more with a clear pipeline.",
    link: "View Pipeline",
    glyph: <UsersGlyph />,
    gradient: "from-[#2dd4bf] to-[#0f766e]",
    color: "#14b8a6",
    cardY: 6.3,
    node: { x: 41.4, y: 8.4 },
    edge: 31,
  },
  {
    title: "Contact & Account Management",
    desc: "Keep all your customer information organized and instantly accessible.",
    link: "View Contacts",
    glyph: <ContactGlyph />,
    gradient: "from-[#60a5fa] to-[#1d4ed8]",
    color: "#3b82f6",
    cardY: 34.9,
    node: { x: 37.8, y: 30.7 },
    edge: 29.5,
  },
  {
    title: "Workflow & Automation",
    desc: "Automate follow-ups, tasks, and approvals to save time and reduce errors.",
    link: "See Automations",
    glyph: <WorkflowGlyph />,
    gradient: "from-[#a78bfa] to-[#6d28d9]",
    color: "#8b5cf6",
    cardY: 63.5,
    node: { x: 40.9, y: 49.6 },
    edge: 29,
  },
];

const rightFeatures: Feature[] = [
  {
    title: "Reports & Analytics",
    desc: "Get real-time insights with custom dashboards and advanced reporting.",
    link: "View Reports",
    glyph: <PieGlyph />,
    gradient: "from-[#fcd34d] to-[#f59e0b]",
    color: "#f59e0b",
    cardY: 6.3,
    node: { x: 58.3, y: 8.4 },
    edge: 69.4,
  },
  {
    title: "Task & Activity Management",
    desc: "Stay on top of tasks, meetings, and reminders across your team.",
    link: "View Tasks",
    glyph: <CalendarGlyph />,
    gradient: "from-[#86efac] to-[#16a34a]",
    color: "#22c55e",
    cardY: 34.9,
    node: { x: 62.5, y: 30.9 },
    edge: 71.2,
  },
  {
    title: "Team Collaboration",
    desc: "Share updates, collaborate and work together from one place.",
    link: "See Collaboration",
    glyph: <ChatGlyph />,
    gradient: "from-[#60a5fa] to-[#2563eb]",
    color: "#3b82f6",
    cardY: 63.5,
    node: { x: 59, y: 49.6 },
    edge: 70.4,
  },
];

const stats = [
  { value: "42%", label: "More Conversions", icon: "users" },
  { value: "35%", label: "Time Saved on Manual Tasks", icon: "clock" },
  { value: "50%", label: "Better Customer Retention", icon: "person" },
  { value: "3X", label: "Faster Revenue Growth", icon: "rupee" },
] as const;

// Stage geometry (desktop)
const STAGE_RATIO = 1400 / 570; // width / height
const HUB = { x: 50, y: 25.1, r: 8.5 }; // r in % of stage width
const NODE_R = 12.5; // connector node ring radius, % of stage width
const DOT_GAP = 0; // connector dot is centred exactly on the card edge (increase to push it outside)

// Dashed orbit rings centred on the hub (r = % of stage width); the one at NODE_R carries the nodes
const ORBIT_RINGS = [
  { r: HUB.r + 2.6, color: "rgba(45,212,191,0.4)", style: "dashed", pulse: true },
  { r: NODE_R, color: "rgba(20,184,166,0.45)", style: "dashed", pulse: false },
  { r: NODE_R + 2.2, color: "rgba(148,163,184,0.35)", style: "dashed", pulse: false },
] as const;
const CARD_W = 29; // feature card width (stage % of width)

type Pt = { x: number; y: number };
const WAVE_AMP = 2.6; // vertical amplitude (stage % of height) of the gentle wave on the top and bottom lines

const ACCENT_GAP = 3.1; // distance of the accent dot from its node centre, along the line (in % of stage width)

// Point on a cubic Bezier curve at parameter t (used to sit the accent dot exactly on its line)
const cubicAt = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
};

// Connector from the dot on the card edge (A) to its orbit node (B); the top (row 0) and bottom (row 2) lines get a soft S-wave
const connectorCurve = (f: Feature, side: "left" | "right", row: number) => {
  const dir = side === "left" ? 1 : -1;
  const A: Pt = { x: f.edge + dir * DOT_GAP, y: f.cardY };
  const B: Pt = f.node;
  const wave = row === 0 ? WAVE_AMP : row === 2 ? -WAVE_AMP : 0;
  const dx = B.x - A.x;
  const dy = B.y - A.y;
  const c1: Pt = { x: A.x + dx * 0.35, y: A.y + dy * 0.12 + wave };
  const c2: Pt = { x: A.x + dx * 0.65, y: B.y - dy * 0.12 - wave };
  return { A, B, c1, c2 };
};

/* =========================================================================
   SMALL PIECES
   ========================================================================= */

function FeatureCard({ f, side }: { f: Feature; side: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="relative flex items-center gap-4 rounded-[56px] bg-white/90 backdrop-blur border border-slate-100/80 shadow-[0_14px_36px_-16px_rgba(15,35,51,0.22)] py-5 pl-3.5 pr-7 xl:pr-9"
    >
      {/* Icon: 3D badge inside a white ring, with a small accent dot on its outer edge */}
      <span className="relative w-[72px] h-[72px] rounded-full bg-white ring-1 ring-slate-100 shadow-[0_10px_24px_-10px_rgba(15,35,51,0.3)] flex items-center justify-center flex-shrink-0">
        <span
          className={`w-[54px] h-[54px] rounded-full bg-gradient-to-br ${f.gradient} flex items-center justify-center shadow-[inset_0_-5px_9px_rgba(0,0,0,0.15),inset_0_4px_7px_rgba(255,255,255,0.5),0_8px_16px_-6px_rgba(15,35,51,0.35)]`}
        >
          {f.glyph}
        </span>
        <span
          className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full ring-2 ring-white"
          style={{ backgroundColor: f.color }}
        />
      </span>
      <div className="min-w-0">
        <h3 className="text-[14px] xl:text-[15px] font-bold text-[#0f2333] leading-snug">{f.title}</h3>
        <p className="mt-1 text-[12px] xl:text-[12.5px] text-slate-500 leading-relaxed">{f.desc}</p>
        <Link href="#" className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#0f8a83] hover:text-[#0f5e63]">
          {f.link}
          <ArrowCircle />
        </Link>
      </div>
    </motion.div>
  );
}

function StatIcon({ type }: { type: (typeof stats)[number]["icon"] }) {
  const p = { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "users")
    return (
      <svg {...p}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M20.5 19a5 5 0 0 0-3.5-4.8" />
      </svg>
    );
  if (type === "clock")
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    );
  if (type === "person")
    return (
      <svg {...p}>
        <circle cx="10" cy="8" r="3.5" />
        <path d="M3.5 20a6.5 6.5 0 0 1 11-4.7M16 16l2 2 3.5-4" />
      </svg>
    );
  return (
    <svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9 8h6M9 11h6M11.5 8c2 0 2 3 0 3H9l4.5 5" />
    </svg>
  );
}

/* =========================================================================
   CENTRE: hub + platform with mini dashboard and floating app tiles
   ========================================================================= */

const HALO_MASK = "radial-gradient(circle closest-side, transparent 73%, #000 78%, #000 90%, transparent 98%)";

function Hub() {
  return (
    <div className="relative w-full h-full">
      {/* Wide soft outer glow */}
      <motion.div
        className="absolute -inset-[40%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle closest-side, transparent 55%, rgba(147,197,253,0.24) 66%, rgba(186,230,253,0.16) 80%, transparent 100%)",
        }}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Translucent light-blue glow band hugging the core */}
      <div
        className="absolute -inset-[18%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle closest-side, transparent 71%, rgba(125,200,255,0.26) 74%, rgba(170,215,250,0.32) 82%, rgba(205,232,252,0.2) 92%, transparent 100%)",
        }}
      />
      {/* Vertical stripe texture on that band */}
      <div
        className="absolute -inset-[18%] rounded-full pointer-events-none opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1.5px, transparent 1.5px, transparent 6px)",
          WebkitMaskImage: HALO_MASK,
          maskImage: HALO_MASK,
        }}
      />

      {/* Core */}
      <div
        className="relative w-full h-full rounded-full flex flex-col items-center justify-center text-center px-3"
        style={{
          background: "radial-gradient(circle at 50% 26%, #15397a 0%, #0b2554 52%, #071634 100%)",
          boxShadow:
            "0 0 0 1px rgba(147,210,255,0.35), 0 0 44px rgba(56,189,248,0.35), inset 0 0 40px rgba(56,189,248,0.1)",
        }}
      >
        <CodeLogo className="w-[clamp(30px,3vw,46px)] h-[clamp(30px,3vw,46px)]" />
        <span className="mt-[clamp(4px,0.5vw,8px)] text-[clamp(16px,1.65vw,24px)] font-bold text-white tracking-wide leading-none">
          YOUR CRM
        </span>
        <span className="mt-[clamp(4px,0.6vw,9px)] text-[clamp(9px,0.9vw,13px)] text-white/90 leading-snug">
          Your Data. Your Process.
          <br />
          One Smart System.
        </span>
      </div>
    </div>
  );
}

function FloatingTile({
  className,
  children,
  delay,
  line,
}: {
  className: string;
  children: React.ReactNode;
  delay: number;
  line?: boolean;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div
        className="rounded-2xl bg-white border border-slate-100 shadow-[0_14px_28px_-10px_rgba(15,35,51,0.28)] flex items-center justify-center"
        style={{ width: "clamp(32px,2.8vw,43px)", height: "clamp(32px,2.8vw,43px)" }}
      >
        {children}
      </div>
      {/* Thin guide line dropping from the tile towards the platform */}
      {line && <span className="absolute left-1/2 top-full h-5 border-l border-dashed border-slate-300" />}
    </motion.div>
  );
}

// Text sizes scale with the viewport so the dashboard stays proportional on smaller laptops
const TXT = {
  title: "text-[clamp(8px,0.68vw,10.5px)]",
  small: "text-[clamp(6.2px,0.47vw,7.3px)]",
  value: "text-[clamp(14px,1.45vw,22px)]",
};

function Platform() {
  const activities = [
    {
      t: "Follow up with John",
      w: "Today",
      bg: "bg-[#2563eb]",
      icon: <path d="m6 12.5 4 4 8-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
    },
    {
      t: "Demo with ABC Corp",
      w: "2h ago",
      bg: "bg-[#a855f7]",
      icon: <path d="M7 6h10v12H7ZM9.5 10h5M9.5 13h5" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />,
    },
    {
      t: "Proposal Sent",
      w: "Yesterday",
      bg: "bg-[#f59e0b]",
      icon: (
        <>
          <circle cx="12" cy="9" r="3.2" fill="#fff" />
          <path d="M6 19c.5-3.2 3-4.6 6-4.6s5.5 1.4 6 4.6Z" fill="#fff" />
        </>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Faint dashed orbit rings with direction arrows */}
      <div className="absolute -left-[7%] -right-[7%] bottom-[1%] h-[60%] rounded-[50%] border border-dashed border-slate-300/70" />
      <div className="absolute -left-[12%] -right-[12%] -bottom-[3%] h-[68%] rounded-[50%] border border-dashed border-slate-200/80" />
      <svg className="absolute -left-[9%] bottom-[9%] w-3 h-3 text-slate-300" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 6H2M5 3 2 6l3 3" />
      </svg>
      <svg className="absolute -right-[9%] top-[38%] w-3 h-3 text-slate-300" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6h8M7 3l3 3-3 3" />
      </svg>

      {/* Stacked podium discs */}
      <div className="absolute left-0 right-0 bottom-0 h-[57%] rounded-[50%] bg-[linear-gradient(180deg,#f7fafc_0%,#e2eaf1_100%)] border border-white shadow-[0_24px_40px_-18px_rgba(15,35,51,0.3)]" />
      <div className="absolute left-[4%] right-[4%] bottom-[4%] h-[53%] rounded-[50%] bg-[linear-gradient(180deg,#ffffff_0%,#f1f6fa_100%)] border border-slate-100 shadow-[inset_0_-6px_14px_rgba(148,163,184,0.18)]" />

      {/* Glowing ring: teal on the left fading to blue on the right */}
      <motion.div
        className="absolute left-[14.5%] right-[14.5%] bottom-[7.5%] h-[34%]"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="crmPlatformRing" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2dd4bf" />
              <stop offset="0.55" stopColor="#38bdf8" />
              <stop offset="1" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <ellipse
            cx="50"
            cy="50"
            rx="50"
            ry="50"
            stroke="url(#crmPlatformRing)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            style={{ filter: "drop-shadow(0 0 7px rgba(45,212,191,0.55))" }}
          />
        </svg>
      </motion.div>

      {/* Top face the tablet stands on */}
      <div className="absolute left-[17%] right-[17%] bottom-[9.5%] h-[27%] rounded-[50%] bg-[linear-gradient(180deg,#ffffff_0%,#e9f0f5_100%)] shadow-[inset_0_-8px_16px_rgba(148,163,184,0.2)]" />
      <span className="absolute left-1/2 -translate-x-1/2 bottom-[6.5%] w-1.5 h-1.5 rounded-full bg-[#2dd4bf] shadow-[0_0_8px_#2dd4bf]" />

      {/* Tablet dashboard */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[13.7%] w-[53%] rounded-[18px] bg-[linear-gradient(180deg,#ffffff_0%,#eef3f7_100%)] border border-slate-200/70 p-[clamp(5px,0.58vw,9px)] shadow-[0_4px_0_#d9e2ea,0_22px_34px_-12px_rgba(15,35,51,0.4)]">
        <div className="grid grid-cols-2 gap-[clamp(6px,0.7vw,10px)]">
          {/* Deals panel */}
          <div className="rounded-xl bg-white border border-slate-100 p-[clamp(6px,0.8vw,12px)]">
            <div className="flex items-center justify-between gap-1">
              <span className={`${TXT.title} font-bold text-[#0f2333] whitespace-nowrap`}>Deals This Month</span>
              <span className={`${TXT.small} text-slate-500 border border-slate-200 rounded px-1 whitespace-nowrap`}>This Month ▾</span>
            </div>
            <div className={`mt-[clamp(6px,0.8vw,12px)] ${TXT.value} font-extrabold text-[#0f2333] leading-none`}>₹24.85 Cr</div>
            <div className={`mt-1 ${TXT.small} font-semibold text-[#16a34a]`}>
              ↑ 24% <span className="font-normal text-slate-500">vs last month</span>
            </div>
            <svg className="mt-[clamp(6px,0.8vw,12px)] w-full h-[clamp(28px,3.4vw,52px)] overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none" fill="none">
              <defs>
                <linearGradient id="crmDealsArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 32 L12 26 L22 29 L34 20 L46 24 L58 14 L70 17 L84 9 L100 3 L100 40 L0 40Z" fill="url(#crmDealsArea)" />
              <path d="M0 32 L12 26 L22 29 L34 20 L46 24 L58 14 L70 17 L84 9 L100 3" stroke="#3b82f6" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Recent activities panel */}
          <div className="rounded-xl bg-white border border-slate-100 p-[clamp(6px,0.8vw,12px)] flex flex-col">
            <span className={`${TXT.title} font-bold text-[#0f2333]`}>Recent Activities</span>
            <div className="mt-[clamp(6px,0.8vw,12px)] flex-1 flex flex-col justify-around">
              {activities.map((a) => (
                <div key={a.t} className="flex items-center gap-[clamp(4px,0.55vw,8px)]">
                  <span className={`w-[clamp(12px,1.05vw,16px)] h-[clamp(12px,1.05vw,16px)] rounded-full ${a.bg} flex items-center justify-center flex-shrink-0`}>
                    <svg className="w-[62%] h-[62%]" viewBox="0 0 24 24">
                      {a.icon}
                    </svg>
                  </span>
                  <span className={`${TXT.small} text-slate-700 truncate flex-1`}>{a.t}</span>
                  <span className={`${TXT.small} text-slate-400 whitespace-nowrap`}>{a.w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating app tiles */}
      <FloatingTile className="left-[14%] top-[12%]" delay={0} line>
        <svg className="w-1/2 h-1/2" viewBox="0 0 32 32">
          <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Z" fill="#1fa855" />
          <path d="M11.2 9.4c.3-.6.6-.6.9-.6h.8c.2 0 .6.1.8.6l1.1 2.7c.1.3 0 .6-.1.8l-.8 1c-.2.2-.2.4 0 .7a9 9 0 0 0 4.2 3.7c.3.1.5.1.7-.1l1.1-1.3c.2-.3.5-.3.8-.2l2.6 1.2c.3.2.5.3.5.5.1.4 0 1.6-.6 2.3-.6.7-1.9 1.3-3 1.2-1.8-.1-4.4-1-6.9-3.4-2.3-2.3-3.2-4.8-3.3-6.5 0-1.3.6-2.3 1.2-2.6Z" fill="#fff" />
        </svg>
      </FloatingTile>
      <FloatingTile className="left-[10.8%] top-[50%]" delay={0.8}>
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2" fill="#2563eb" />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" stroke="#fff" strokeWidth="1.6" fill="none" />
        </svg>
      </FloatingTile>
      <FloatingTile className="right-[14.4%] top-[11%]" delay={0.4} line>
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="16" rx="3" fill="#6366f1" />
          <path d="M3 10h18" stroke="#fff" strokeWidth="1.6" />
          <path d="M8 3v4M16 3v4" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </FloatingTile>
      <FloatingTile className="right-[11.5%] top-[49%]" delay={1.2}>
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24">
          <rect x="3" y="13" width="4.5" height="8" rx="1.2" fill="#f59e0b" />
          <rect x="9.75" y="8" width="4.5" height="13" rx="1.2" fill="#f59e0b" />
          <rect x="16.5" y="3" width="4.5" height="18" rx="1.2" fill="#f59e0b" />
        </svg>
      </FloatingTile>
    </div>
  );
}

/* =========================================================================
   MAIN SECTION
   ========================================================================= */

export default function CustomCrmFeatures() {
  const connectors = [
    ...leftFeatures.map((f, row) => ({ f, side: "left" as const, row })),
    ...rightFeatures.map((f, row) => ({ f, side: "right" as const, row })),
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f7fafc_0%,#f1f6f9_100%)] py-16 sm:py-20 font-sans">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-200/30 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* ======================= HEADER ======================= */}
        <div className="relative text-center max-w-2xl mx-auto">
          <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-[#0f8a83] uppercase">Do More With Your CRM</span>
          <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight leading-[1.1] lg:leading-[1.3] text-[#0f2333]">
            Powerful Features.
            <br />
            <span className="text-[#0f8a83]">Real Results.</span>
          </h2>
          <p className="mt-4 lg:mt-1 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
            Everything you need to manage, automate and grow your business
            <br className="hidden sm:block" /> — in one custom-built CRM.
          </p>
        </div>
        <Link
          href="#"
          className="group mt-6 lg:mt-0 lg:absolute lg:right-6 lg:top-[92px] flex lg:inline-flex justify-center items-center gap-3 text-sm font-bold text-[#0f5e63]"
        >
          Explore All Features
          <span className="w-9 h-9 rounded-full bg-[#0f5e63] text-white flex items-center justify-center group-hover:bg-[#0f8a83] transition-colors">
            →
          </span>
        </Link>

        {/* ======================= DESKTOP STAGE ======================= */}
        <div className="relative hidden lg:block mt-6 w-full" style={{ aspectRatio: `${STAGE_RATIO}` }}>
          {/* Orbit rings around the hub (CSS circles so they stay round at any width); the middle one carries the nodes */}
          {ORBIT_RINGS.map((ring) => (
            <motion.div
              key={ring.r}
              className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full pointer-events-none"
              style={{
                left: `${HUB.x}%`,
                top: `${HUB.y}%`,
                width: `${ring.r * 2}%`,
                border: `1px ${ring.style} ${ring.color}`,
              }}
              animate={ring.pulse ? { opacity: [1, 0.55, 1] } : undefined}
              transition={ring.pulse ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" } : undefined}
            />
          ))}

          {/* Thin connector lines: card-edge dot -> node on the orbit */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
            {connectors.map(({ f, side, row }) => {
              const { A, B, c1, c2 } = connectorCurve(f, side, row);
              return (
                <path
                  key={f.title}
                  d={`M ${A.x} ${A.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${B.x} ${B.y}`}
                  stroke={f.color}
                  strokeOpacity="0.75"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* Connector points: solid dot just outside each card, ringed node sitting on the orbit */}
          {connectors.map(({ f, side, row }) => {
            const { A, B, c1, c2 } = connectorCurve(f, side, row);
            const node = B;
            const lineLen = Math.hypot(B.x - A.x, (B.y - A.y) / STAGE_RATIO); // line length in % of stage width
            const accent = cubicAt(A, c1, c2, B, Math.max(0.5, 1 - ACCENT_GAP / lineLen)); // sits exactly on the line, just outside the node
            return (
              <React.Fragment key={f.title}>
                <span
                  className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full ring-2 ring-white z-10"
                  style={{ left: `${A.x}%`, top: `${A.y}%`, backgroundColor: f.color }}
                />
                <span
                  className="absolute w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full z-10"
                  style={{ left: `${accent.x}%`, top: `${accent.y}%`, backgroundColor: f.color }}
                />
                <motion.span
                  className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full bg-white ring-1 ring-slate-100 shadow-[0_8px_22px_-6px_rgba(15,35,51,0.3)] flex items-center justify-center z-10"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: f.cardY / 40 }}
                >
                  <span className="w-5 h-5 rounded-full border-4 bg-white" style={{ borderColor: f.color }} />
                </motion.span>
              </React.Fragment>
            );
          })}

          {/* Hub */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%`, width: `${HUB.r * 2}%` }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Hub />
          </motion.div>

          {/* Platform */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-[58.4%] w-[47%] h-[39.6%]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Platform />
          </motion.div>

          {/* Feature cards */}
          {leftFeatures.map((f) => (
            <div key={f.title} className="absolute -translate-y-1/2" style={{ top: `${f.cardY}%`, left: `${f.edge - CARD_W}%`, width: `${CARD_W}%` }}>
              <FeatureCard f={f} side="left" />
            </div>
          ))}
          {rightFeatures.map((f) => (
            <div key={f.title} className="absolute -translate-y-1/2" style={{ top: `${f.cardY}%`, left: `${f.edge}%`, width: `${CARD_W}%` }}>
              <FeatureCard f={f} side="right" />
            </div>
          ))}
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden mt-10">
          <div className="w-56 h-56 mx-auto">
            <Hub />
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...leftFeatures, ...rightFeatures].map((f, i) => (
              <FeatureCard key={f.title} f={f} side={i % 2 ? "right" : "left"} />
            ))}
          </div>
        </div>

        {/* ======================= IMPACT STATS BAR ======================= */}
        <motion.div
          className="mt-6 rounded-2xl bg-white border border-slate-100 shadow-[0_16px_40px_-20px_rgba(15,35,51,0.25)] grid grid-cols-1 md:grid-cols-[1.35fr_repeat(4,1fr)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 p-5 bg-[linear-gradient(90deg,#f0f9f8_0%,#ffffff_100%)] md:border-r border-slate-100">
            <svg className="w-14 h-14 flex-shrink-0" viewBox="0 0 56 56" fill="none">
              <rect x="8" y="34" width="7" height="14" rx="1.5" fill="#5eead4" />
              <rect x="19" y="28" width="7" height="20" rx="1.5" fill="#2dd4bf" />
              <rect x="30" y="22" width="7" height="26" rx="1.5" fill="#14b8a6" />
              <rect x="41" y="14" width="7" height="34" rx="1.5" fill="#0f8a83" />
              <path d="m6 30 12-10 9 6 18-16" stroke="#0f5e63" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M38 9h8v8" stroke="#0f5e63" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <h4 className="text-base font-bold text-[#0f2333] leading-snug">
                Built to Drive
                <br />
                Real Business Impact
              </h4>
              <p className="mt-1 text-[11.5px] text-slate-500 leading-snug">
                Smarter workflows. Stronger relationships. Better decisions.
              </p>
              <div className="mt-2 flex gap-1">
                <span className="w-6 h-1 rounded-full bg-[#0f8a83]" />
                <span className="w-3 h-1 rounded-full bg-slate-200" />
                <span className="w-3 h-1 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-3 p-5 ${i < stats.length - 1 ? "md:border-r" : ""} border-t md:border-t-0 border-slate-100`}
            >
              <span className="w-11 h-11 rounded-full bg-[#eef7f6] text-[#0f5e63] flex items-center justify-center flex-shrink-0">
                <StatIcon type={s.icon} />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-extrabold text-[#0f2333] leading-none">{s.value}</span>
                  <span className="text-[#0f8a83] text-sm font-bold">↗</span>
                </div>
                <p className="mt-1 text-[11.5px] text-slate-500 leading-snug">{s.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
