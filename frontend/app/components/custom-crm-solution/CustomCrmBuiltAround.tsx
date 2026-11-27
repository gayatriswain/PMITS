"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

/* =========================================================================
   SCALE BOX: renders children at a fixed design size and scales them to the available width
   ========================================================================= */

function ScaleBox({
  width,
  height,
  className = "",
  children,
}: {
  width: number;
  height: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* =========================================================================
   ICONS
   ========================================================================= */

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Glyph = ({ d, className = "w-5 h-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} {...line}>
    <path d={d} />
  </svg>
);

const CodeLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <path d="M13 6 3.5 16l9.5 10" stroke="#ffffff" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m19 6 9.5 10L19 26" stroke="#2dd4bf" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  funnel: "M4 5h16l-6 7v6l-4 2v-8Z",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.5M21 20a5 5 0 0 0-3.5-4.8",
  clipboard: "M9 4h6v3H9ZM7 5.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-1M9 14l2 2 4-4.5",
  edit: "M4 20h4L19 9l-4-4L4 16ZM13.5 6.5l4 4M4 20h16",
  bars: "M5 20V10M12 20V4M19 20v-7",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7Z",
  cube: "M12 3 4 7.5v9L12 21l8-4.5v-9ZM4 7.5 12 12l8-4.5M12 12v9",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6ZM8.5 12l2.5 2.5 4.5-5",
  code: "M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14",
  gear: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2",
  chevron: "m9 6 6 6-6 6",
} as const;

/* =========================================================================
   DASHBOARD MOCKUP (designed at 760 x 484)
   ========================================================================= */

const navItems__cms = [
  { label: "Dashboard", d: "M4 11l8-7 8 7v9H4Z", active: true },
  { label: "Leads", d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M17 8h4M19 6v4" },
  { label: "Deals", d: "M4 7h16v12H4ZM8 7V5h8v2" },
  { label: "Contacts", d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" },
  { label: "Tasks", d: "M5 5h14v15H5ZM9 3v4M15 3v4M8.5 13l2.5 2.5 4.5-5" },
  { label: "Automations", d: "M13 2 4 14h7l-1 8 9-12h-7Z" },
  { label: "Reports", d: "M5 20V10M12 20V4M19 20v-7" },
  { label: "Settings", d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM12 2v3M12 19v3M2 12h3M19 12h3" },
];

const stats__cms = [
  { label: "New Leads", value: "248", delta: "↑ 18% vs last month", red: false },
  { label: "Deals in Pipeline", value: "₹24.85 Cr", delta: "↑ 21% vs last month", red: false },
  { label: "Won This Month", value: "36", delta: "↑ 16% vs last month", red: false },
  { label: "Tasks Due Today", value: "18", delta: "● 2 due today", red: true },
];

const stages__cms = [
  { name: "New", n: 48 },
  { name: "Qualified", n: 36 },
  { name: "Proposal", n: 28 },
  { name: "Negotiation", n: 14 },
  { name: "Won", n: 10 },
];

function Dashboard() {
  const $t = useCmsText();
  const navItems = useCmsData("CustomCrmBuiltAround__navItems", navItems__cms);
  const stats = useCmsData("CustomCrmBuiltAround__stats", stats__cms);
  const stages = useCmsData("CustomCrmBuiltAround__stages", stages__cms);
  const sources = [
    { name: $t("CustomCrmBuiltAround__t1", "Website"), pct: 42, color: "#0f8a83" },
    { name: $t("CustomCrmBuiltAround__t2", "WhatsApp"), pct: 24, color: "#14b8a6" },
    { name: $t("CustomCrmBuiltAround__t3", "Referral"), pct: 18, color: "#2563eb" },
    { name: $t("CustomCrmBuiltAround__t4", "Others"), pct: 16, color: "#8fb4f5" },
  ];
  // Donut segments
  const R = 30;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="w-[760px] h-[484px] flex bg-white text-[#0b2447] font-sans">
      {/* Sidebar */}
      <aside className="w-[168px] bg-[linear-gradient(180deg,#0a1b45_0%,#0b2a5c_100%)] text-white px-3.5 py-4 flex flex-col">
        <div className="flex items-center gap-2 px-1">
          <CodeLogo className="w-6 h-6" />
          <span className="text-[13px] font-extrabold tracking-wide">{html($t("CustomCrmBuiltAround__t5", "PROMANAGE"))}</span>
        </div>
        <nav className="mt-5 flex flex-col gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3 py-[9px] rounded-lg text-[13px] ${item.active ? "bg-[#14a89a] text-white font-semibold" : "text-white/80"}`}
            >
              <Glyph d={item.d} className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-[#f5f9fb] px-5 py-3.5 flex flex-col min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-h6 font-extrabold">{html($t("CustomCrmBuiltAround__t6", "Dashboard"))}</h4>
          <div className="flex items-center gap-3">
            <div className="w-[190px] h-8 rounded-full bg-white border border-slate-200 flex items-center gap-2 px-3 text-[11px] text-slate-400">
              <Glyph d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4" className="w-3.5 h-3.5" />
              {html($t("CustomCrmBuiltAround__t7", "Search anything..."))}</div>
            <Glyph d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15ZM10 21h4" className="w-4 h-4 text-slate-500" />
            <span className="w-7 h-7 rounded-full bg-[linear-gradient(135deg,#f59e0b,#92400e)]" />
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-white border border-slate-100 px-3 py-2.5">
              <div className="text-[10.5px] text-slate-500 whitespace-nowrap">{s.label}</div>
              <div className="mt-1 text-[20px] font-extrabold leading-none whitespace-nowrap">{s.value}</div>
              <div className={`mt-1.5 text-[8.5px] font-semibold whitespace-nowrap ${s.red ? "text-red-500" : "text-[#16a34a]"}`}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="mt-2.5 rounded-xl bg-white border border-slate-100 px-4 py-2.5">
          <div className="text-[12.5px] font-bold">{html($t("CustomCrmBuiltAround__t8", "Sales Pipeline"))}</div>
          <div className="relative mt-2 grid grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-[53px] border-t border-dotted border-slate-300" />
            {stages.map((st) => (
              <div key={st.name} className="flex flex-col items-center relative">
                <span className="text-[11px] text-slate-500">{st.name}</span>
                <span className="text-[16px] font-extrabold leading-tight">{st.n}</span>
                <span className="mt-1.5 w-[22px] h-[22px] rounded-full bg-[#0f8a83] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-sm bg-white/90" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-2.5 flex-1 min-h-0 grid grid-cols-[1fr_1fr_1.1fr] gap-2.5">
          <div className="rounded-xl bg-white border border-slate-100 px-3 py-2.5 flex flex-col overflow-hidden">
            <div className="text-[12px] font-bold">{html($t("CustomCrmBuiltAround__t9", "Lead Source"))}</div>
            <div className="flex-1 flex items-center gap-2">
              <svg viewBox="0 0 80 80" className="w-[50px] h-[50px] -rotate-90 flex-shrink-0">
                {sources.map((s) => {
                  const len = (s.pct / 100) * C;
                  const seg = (
                    <circle
                      key={s.name}
                      cx="40"
                      cy="40"
                      r={R}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="14"
                      strokeDasharray={`${len} ${C - len}`}
                      strokeDashoffset={-offset}
                    />
                  );
                  offset += len;
                  return seg;
                })}
              </svg>
              <div className="flex flex-col gap-1">
                {sources.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5 text-[9.5px] text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="w-[42px]">{s.name}</span>
                    <span className="font-semibold">{s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-100 px-3 py-2.5 flex flex-col overflow-hidden">
            <div className="text-[12px] font-bold">{html($t("CustomCrmBuiltAround__t10", "Recent Activities"))}</div>
            <div className="flex-1 flex flex-col justify-around mt-1">
              {[
                { t: $t("CustomCrmBuiltAround__t11", "Call with Rohit"), w: $t("CustomCrmBuiltAround__t12", "Today, 10:30 AM"), d: "M6.6 2.8l2.2 3-1.4 1.5a12 12 0 0 0 6.3 6.3l1.5-1.4 3 2.2-1.5 2c-.6.8-1.7 1.2-2.7.9C10.6 18.7 5.3 13.4 3.7 7c-.3-1 .1-2.1.9-2.7Z" },
                { t: $t("CustomCrmBuiltAround__t13", "Demo Scheduled"), w: $t("CustomCrmBuiltAround__t14", "Today, 02:15 PM"), d: "M5 5h14v15H5ZM9 3v4M15 3v4M5 10h14" },
                { t: $t("CustomCrmBuiltAround__t15", "Proposal Sent"), w: $t("CustomCrmBuiltAround__t16", "Yesterday, 04:45 PM"), d: "M22 2 11 13M22 2l-7 20-4-9-9-4Z" },
              ].map((a) => (
                <div key={a.t} className="flex items-center gap-2">
                  <Glyph d={a.d} className="w-3.5 h-3.5 text-[#0f8a83] flex-shrink-0" />
                  <div className="leading-tight">
                    <div className="text-[10px] font-semibold">{a.t}</div>
                    <div className="text-[8.5px] text-slate-400">{a.w}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-white border border-slate-100 px-3 py-2.5 flex flex-col overflow-hidden">
            <div className="text-[12px] font-bold">{html($t("CustomCrmBuiltAround__t17", "Revenue Overview"))}</div>
            <div className="mt-1 text-[16px] font-extrabold leading-none">{html($t("CustomCrmBuiltAround__t18", "₹24.85 Cr"))}</div>
            <div className="mt-1 text-[9px] font-semibold text-[#16a34a]">{rich($t("CustomCrmBuiltAround__t19m", "↑ 24% <span class=\"font-normal text-slate-400\">vs last month</span>"))}</div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-1 flex-1 w-full min-h-0" fill="none">
              <defs>
                <linearGradient id="baRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#14b8a6" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 34 L14 31 L28 33 L42 26 L56 28 L70 20 L84 22 L100 6 L100 40 L0 40Z" fill="url(#baRev)" />
              <path d="M0 34 L14 31 L28 33 L42 26 L56 28 L70 20 L84 22 L100 6" stroke="#0f8a83" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
            </svg>
            <div className="flex justify-between text-[7.5px] text-slate-400">
              {[$t("CustomCrmBuiltAround__t21", "Jan"), $t("CustomCrmBuiltAround__t22", "Feb"), $t("CustomCrmBuiltAround__t23", "Mar"), $t("CustomCrmBuiltAround__t24", "Apr"), $t("CustomCrmBuiltAround__t25", "May"), $t("CustomCrmBuiltAround__t26", "Jun"), $t("CustomCrmBuiltAround__t27", "Jul"), $t("CustomCrmBuiltAround__t28", "Aug")].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================================
   GENERIC CRM WINDOW (washed-out wireframe, designed at 240 x 380)
   ========================================================================= */

function GenericWindow() {
  const bar = "h-2 rounded-full bg-[#d9dde3]";
  return (
    <div className="w-[240px] h-[380px] rounded-xl bg-[#eceef2] border border-[#dfe3e9] overflow-hidden">
      <div className="h-8 bg-[#e3e6eb] flex items-center gap-1.5 px-3">
        <span className="w-2 h-2 rounded-full bg-[#c9ced6]" />
        <span className="w-2 h-2 rounded-full bg-[#c9ced6]" />
        <span className="w-2 h-2 rounded-full bg-[#c9ced6]" />
      </div>
      <div className="flex h-[calc(100%-32px)]">
        <div className="w-[64px] bg-[#e6e9ee] p-2.5 flex flex-col gap-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`${bar} ${i === 1 ? "bg-[#c7ccd5]" : ""}`} />
          ))}
        </div>
        <div className="flex-1 p-3 flex flex-col gap-3">
          <div className={`${bar} w-1/2`} />
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-[#f6f7f9] border border-[#e4e7ec] p-3 flex flex-col gap-2">
              <div className={`${bar} w-2/3`} />
              <div className={`${bar} w-full`} />
              <div className={`${bar} w-4/5`} />
            </div>
          ))}
          <div className="mt-auto flex gap-2">
            <div className="h-5 w-12 rounded-md bg-[#d9dde3]" />
            <div className="h-5 w-12 rounded-md bg-[#e1e4e9]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PUZZLE ILLUSTRATION
   ========================================================================= */

function Puzzle() {
  // Flat puzzle-piece outline (square + knobs); drawn isometrically with a stacked extrusion
  const iso = "matrix(0.78 0.45 -0.78 0.45 0 0)";
  const piece = (fill: string, knobs: [number, number][]) => (
    <>
      <rect x="0" y="0" width="60" height="60" rx="7" fill={fill} />
      {knobs.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="11" fill={fill} />
      ))}
    </>
  );
  const extrude = (x: number, y: number, side: string, top: string, knobs: [number, number][]) => (
    <g>
      {[18, 15, 12, 9, 6, 3].map((d) => (
        <g key={d} transform={`translate(${x} ${y + d}) ${iso}`}>
          {piece(side, knobs)}
        </g>
      ))}
      <g transform={`translate(${x} ${y}) ${iso}`}>{piece(top, knobs)}</g>
    </g>
  );

  return (
    <svg viewBox="0 0 300 170" className="w-full h-auto" fill="none">
      <defs>
        <radialGradient id="baDisc" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d9f0ee" />
        </radialGradient>
      </defs>
      {/* Platform + rings */}
      <ellipse cx="150" cy="138" rx="146" ry="30" stroke="#99e0d8" strokeOpacity="0.5" />
      <ellipse cx="150" cy="138" rx="122" ry="25" stroke="#99e0d8" strokeOpacity="0.7" />
      <ellipse cx="150" cy="140" rx="104" ry="21" fill="url(#baDisc)" />
      <ellipse cx="150" cy="138" rx="104" ry="21" stroke="#5fd6c9" strokeWidth="1.5" />

      {/* Pieces: teal (back-left), navy (back-right), blue (front) */}
      {extrude(98, 34, "#0e7a70", "#1cb5a6", [[66, 30]])}
      {extrude(186, 22, "#10265a", "#1f3f94", [[-6, 30]])}
      {extrude(146, 64, "#1d4fb0", "#3a78e6", [[30, -6]])}
    </svg>
  );
}

/* =========================================================================
   DATA
   ========================================================================= */

const builtFor__cms = [
  { title: "Your Sales Process", desc: "Built around your exact workflow.", icon: ICONS.funnel, y: 12.6 },
  { title: "Your Roles & Teams", desc: "Define access, visibility and responsibilities.", icon: ICONS.users, y: 28.4 },
  { title: "Your Approval Rules", desc: "Automate approvals your way.", icon: ICONS.clipboard, y: 44.2 },
  { title: "Your Fields & Data", desc: "Capture what matters to your business.", icon: ICONS.edit, y: 60 },
  { title: "Your Dashboards", desc: "Track the numbers that drive your growth.", icon: ICONS.bars, y: 75.8 },
  { title: "Your Automations", desc: "Eliminate repetitive work and save time.", icon: ICONS.bolt, y: 91.6 },
];

const perks = [
  { top: "100%", bottom: "Custom-Built", icon: ICONS.cube },
  { top: "Secure", bottom: "by Design", icon: ICONS.shield },
  { top: "Scalable", bottom: "as You Grow", icon: ICONS.code },
  { top: "Easy to Use", bottom: "Easy to Adopt", icon: ICONS.gear },
];

// Stage geometry (desktop), in % of stage width / height
const DASH_RIGHT = 72.9;
const CARD_LEFT = 80.1;
const SOURCE_Y = 51;

function Card({ item, mobile = false }: { item: (typeof builtFor__cms)[number]; mobile?: boolean }) {
  return (
    <div
      className={`flex items-center gap-[clamp(6px,0.6vw,10px)] rounded-xl bg-white border border-slate-100 shadow-[0_10px_26px_-14px_rgba(15,35,51,0.25)] ${
        mobile ? "p-3" : "p-[clamp(6px,0.6vw,10px)]"
      }`}
    >
      <span
        className="flex-shrink-0 rounded-lg bg-[linear-gradient(135deg,#0f8a83_0%,#0b3b5a_100%)] text-white flex items-center justify-center"
        style={{ width: mobile ? 40 : "clamp(26px,2.5vw,38px)", height: mobile ? 40 : "clamp(26px,2.5vw,38px)" }}
      >
        <Glyph d={item.icon} className="w-[52%] h-[52%]" />
      </span>
      <div className="min-w-0">
        <h4 className={`${mobile ? "text-sm" : "text-[clamp(9px,0.8vw,12.5px)]"} font-bold leading-tight text-[#0b2447]`}>{item.title}</h4>
        <p className={`mt-0.5 ${mobile ? "text-xs" : "text-[clamp(7.5px,0.66vw,10.5px)]"} text-slate-500 leading-snug`}>{item.desc}</p>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN SECTION
   ========================================================================= */

export default function CustomCrmBuiltAround() {
  const $t = useCmsText();
  const builtFor = useCmsData("CustomCrmBuiltAround__builtFor", builtFor__cms);
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f7fbfc_0%,#ffffff_55%,#f3f8fa_100%)] pt-14 sm:pt-20 pb-6 sm:pb-8 font-sans">
      <Container className="relative z-10">
        <div className="mx-auto w-[90%]">
          {/* ======================= HEADER ======================= */}
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#0f8a83] uppercase">{html($t("CustomCrmBuiltAround__t29", "Built Around Your Business"))}</span>
            <h2 className="text-h2 mt-3 font-extrabold tracking-tight text-[#0b2447]">{rich($t("CustomCrmBuiltAround__t30m", "Your Process. Your Rules.<br><span class=\"text-[#0f8a83]\">Your CRM.</span>"))}</h2>
            <p className="text-body mt-4 text-slate-600">{rich($t("CustomCrmBuiltAround__t32m", "We don't give you a CRM to fit in. We build one<br class=\"hidden sm:block\"> that fits how you work — perfectly."))}</p>
          </motion.div>

          {/* ======================= DESKTOP STAGE ======================= */}
          <div className="relative hidden lg:block mt-8 w-full" style={{ aspectRatio: "803 / 310" }}>
            {/* Connector lines: dashboard edge -> each card */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" style={{ filter: "drop-shadow(0 0 3px rgba(34,211,238,0.6))" }}>
              <defs>
                <linearGradient id="baLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#14b8a6" />
                  <stop offset="1" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              {builtFor.map((c, i) => {
                const sy = SOURCE_Y + (i - 2.5) * 2.2;
                return (
                  <motion.path
                    key={c.title}
                    d={`M ${DASH_RIGHT} ${sy} C ${DASH_RIGHT + 4.5} ${sy}, ${CARD_LEFT - 4.5} ${c.y}, ${CARD_LEFT} ${c.y}`}
                    stroke="url(#baLine)"
                    strokeWidth="1.4"
                    vectorEffect="non-scaling-stroke"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.9 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                  />
                );
              })}
            </svg>
            {/* Dots where lines meet the cards */}
            {builtFor.map((c) => (
              <span
                key={c.title}
                className="absolute w-[7px] h-[7px] -ml-[3.5px] -mt-[3.5px] rounded-full bg-[#14b8a6] ring-2 ring-white z-10"
                style={{ left: `${CARD_LEFT}%`, top: `${c.y}%` }}
              />
            ))}

            {/* Generic CRM */}
            <motion.div
              className="absolute left-[2.7%] top-[14%] w-[13.2%]"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-[clamp(10px,0.95vw,14px)] font-bold text-[#0b2447] leading-tight">{html($t("CustomCrmBuiltAround__t34", "Generic CRM"))}</h3>
              <p className="text-[clamp(8px,0.75vw,11px)] text-slate-500">{rich($t("CustomCrmBuiltAround__t35", "One-size-fits-all"))}</p>
              <div className="mt-2.5 opacity-90" style={{ transform: "perspective(700px) rotateY(16deg)", transformOrigin: "left center" }}>
                <ScaleBox width={240} height={380}>
                  <GenericWindow />
                </ScaleBox>
              </div>
            </motion.div>

            {/* Arrow */}
            <span className="absolute left-[19.8%] top-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_10px_26px_-8px_rgba(15,35,51,0.3)] flex items-center justify-center text-[#0b2447]" style={{ width: "clamp(30px,2.9vw,44px)", height: "clamp(30px,2.9vw,44px)" }}>
              <Glyph d={ICONS.chevron} className="w-[45%] h-[45%]" />
            </span>

            {/* Dashboard */}
            <motion.div
              className="absolute left-[23.9%] top-[16.8%] w-[48.9%] z-[5]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 z-10 px-3.5 py-[3px] rounded-md bg-[#14a89a] text-white text-[clamp(8px,0.75vw,11px)] font-bold tracking-wide shadow-[0_6px_14px_-4px_rgba(20,168,154,0.6)]">
                {html($t("CustomCrmBuiltAround__t36", "YOUR CRM"))}</span>
              <div className="rounded-2xl overflow-hidden border border-[#bfe9ea] shadow-[0_26px_60px_-24px_rgba(15,35,51,0.35),0_0_0_3px_rgba(255,255,255,0.7)]">
                <ScaleBox width={760} height={484}>
                  <Dashboard />
                </ScaleBox>
              </div>
              {/* Glowing right edge */}
              <motion.span
                className="absolute -right-[2px] top-[4%] bottom-[4%] w-[3px] rounded-full bg-gradient-to-b from-[#2dd4bf] via-[#38bdf8] to-[#2dd4bf] shadow-[0_0_14px_3px_rgba(45,212,191,0.6)]"
                animate={{ opacity: [1, 0.55, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Right column */}
            <span className="absolute left-[80.1%] w-[16.4%] top-[-3%] text-center text-[clamp(8px,0.72vw,11px)] font-bold tracking-[0.16em] text-[#0f8a83] uppercase">
              {html($t("CustomCrmBuiltAround__t37", "Built Exactly For You"))}</span>
            {builtFor.map((c, i) => (
              <motion.div
                key={c.title}
                className="absolute w-[16.4%] -translate-y-1/2"
                style={{ left: `${CARD_LEFT}%`, top: `${c.y}%` }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <Card item={c} />
              </motion.div>
            ))}
          </div>

          {/* ======================= MOBILE / TABLET ======================= */}
          <div className="lg:hidden mt-8">
            <div className="relative max-w-2xl mx-auto">
              <span className="absolute -top-[10px] left-1/2 -translate-x-1/2 z-10 px-3.5 py-[3px] rounded-md bg-[#14a89a] text-white text-[11px] font-bold tracking-wide">
                {html($t("CustomCrmBuiltAround__t38", "YOUR CRM"))}</span>
              <div className="rounded-2xl overflow-hidden border border-[#bfe9ea] shadow-[0_26px_60px_-24px_rgba(15,35,51,0.35)]">
                <ScaleBox width={760} height={484}>
                  <Dashboard />
                </ScaleBox>
              </div>
            </div>
            <p className="mt-8 text-center text-[11px] font-bold tracking-[0.16em] text-[#0f8a83] uppercase">{rich($t("CustomCrmBuiltAround__t39", "Built Exactly For You"))}</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {builtFor.map((c) => (
                <Card key={c.title} item={c} mobile />
              ))}
            </div>
          </div>

          {/* ======================= BOTTOM BAR ======================= */}
          <motion.div
            className="mt-8 lg:mt-7 rounded-3xl bg-white border border-slate-100 shadow-[0_22px_50px_-24px_rgba(15,35,51,0.25)] px-5 sm:px-8 py-5 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="hidden sm:block w-[200px] flex-shrink-0 lg:-my-4 lg:-ml-2">
              <Puzzle />
            </div>
            <div className="lg:pr-6 lg:w-[27%] flex-shrink-0">
              <h3 className="text-h6 font-extrabold text-[#0b2447] lg:whitespace-nowrap">{html($t("CustomCrmBuiltAround__t40", "We adapt to your business."))}</h3>
              <p className="text-body font-extrabold text-[#0f8a83] lg:whitespace-nowrap">{rich($t("CustomCrmBuiltAround__t41", "Not the other way around."))}</p>
            </div>
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4">
              {perks.map((p) => (
                <div key={p.top} className="flex items-center gap-3 py-2 lg:px-4 lg:border-l border-slate-200">
                  <span className="text-[#0f4c5c] flex-shrink-0">
                    <Glyph d={p.icon} className="w-8 h-8" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[15px] font-extrabold text-[#0b2447] whitespace-nowrap">{p.top}</div>
                    <div className="text-[12.5px] text-slate-500 whitespace-nowrap">{p.bottom}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
