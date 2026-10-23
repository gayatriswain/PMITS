"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const DARK = "#0b2a2a";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.6) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const TargetIcon = ({ size = 26, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.4)}>
    <circle cx="11" cy="13" r="8" />
    <circle cx="11" cy="13" r="4.5" />
    <circle cx="11" cy="13" r="1" fill={color} stroke="none" />
    <path d="M11 13 20 4M17 4h3v3" />
  </svg>
);
const BulbIcon = ({ size = 26, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.4)}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 6a5 5 0 0 0-3 9c.6.5 1 1.2 1 2h4c0-.8.4-1.5 1-2a5 5 0 0 0-3-9Z" />
    <path d="M12 1.5v1.5M4.5 4.5l1 1M19.5 4.5l-1 1M2 11.5h1.5M20.5 11.5H22" />
  </svg>
);
const GrowthIcon = ({ size = 26, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.4)}>
    <path d="M4 21v-5M9 21v-8M14 21v-6M19 21V10" />
    <path d="M3 12 9 7l4 3 8-7" />
    <path d="M17 3h4v4" />
  </svg>
);
const SparkIcon = ({ size = 10, color = TEAL }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2c.6 4.8 2.7 7.2 10 10-7.3 2.8-9.4 5.2-10 10-.6-4.8-2.7-7.2-10-10 7.3-2.8 9.4-5.2 10-10Z" />
  </svg>
);
const ArrowIcon = ({ size = 14, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const LayersIcon = ({ size = 40, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.4)}>
    <path d="M12 3 21 8 12 13 3 8Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 16 9 5 9-5" />
  </svg>
);
const ShieldIcon = ({ size = 34, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.4)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const CheckBadge = () => (
  <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: DEEP_TEAL }}>
    <svg {...base(11, "#fff", 2.6)}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  </span>
);

const ChevronIcon = ({ size = 18, color = DEEP_TEAL, dir = "right" }: IconProps & { dir?: "left" | "right" }) => (
  <svg {...base(size, color, 2)}>
    {dir === "right" ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);
const DashboardIcon = ({ size = 24, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <rect x="3" y="4" width="18" height="15" rx="2" />
    <path d="M3 8h18M7 12h4M7 15h2M14 12h3v3h-3Z" />
  </svg>
);
const CartIcon = ({ size = 24, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M3 4h2.5l2.2 11h10.8l2-8H7" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </svg>
);
const UserIcon = ({ size = 24, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
  </svg>
);
const BoxIcon = ({ size = 24, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </svg>
);
const PeopleIcon = ({ size = 24, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.6.5 4.5 2.8 4.5 5.8" />
  </svg>
);
const ChatIcon = ({ size = 22, color = "#5eead4" }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M4 5h16v11H9l-5 4Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </svg>
);
const LockIcon = ({ size = 22, color = "#5eead4" }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <rect x="5" y="10" width="14" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2.5" />
  </svg>
);
const CubeIcon = ({ size = 40, color = "#99f6e4" }: IconProps) => (
  <svg {...base(size, color, 1.3)}>
    <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" />
    <path d="m3.5 7 8.5 4.7L20.5 7M12 11.7v9.8" />
    <path d="m7.7 4.8 8.5 4.6v4.8" opacity="0.6" />
  </svg>
);

type Project = {
  name: string;
  title: string[];
  short: string;
  desc: string;
  Icon: (p: IconProps) => React.JSX.Element;
};

const PROJECTS: Project[] = [
  {
    name: "Business Management System",
    title: ["Business", "Management", "System"],
    short: "Streamlined operations and increased productivity.",
    desc: "A unified platform to manage operations, teams, clients, projects, and performance — all in one place.",
    Icon: DashboardIcon,
  },
  {
    name: "E-commerce Platform",
    title: ["E-commerce", "Platform"],
    short: "Scalable platform for seamless shopping experience.",
    desc: "A fast, scalable storefront with catalog, payments, and order management built in.",
    Icon: CartIcon,
  },
  {
    name: "Customer Portal",
    title: ["Customer", "Portal"],
    short: "Self-service portal that improved customer satisfaction.",
    desc: "A secure self-service portal where customers track orders, raise tickets, and manage accounts.",
    Icon: UserIcon,
  },
  {
    name: "Inventory Management",
    title: ["Inventory", "Management", "System"],
    short: "Real-time stock tracking across every location.",
    desc: "Live stock levels, purchase orders, and warehouse transfers — synced across every location.",
    Icon: BoxIcon,
  },
  {
    name: "HR & Payroll Suite",
    title: ["HR & Payroll", "Suite"],
    short: "Automated payroll, attendance, and onboarding.",
    desc: "Attendance, leave, payroll, and onboarding automated in one place for growing teams.",
    Icon: PeopleIcon,
  },
];

const CTA_POINTS = [
  { Icon: ChatIcon, title: "Free Consultation", desc: "Let's discuss your idea." },
  { Icon: LockIcon, title: "No Obligation", desc: "You decide, we build." },
  { Icon: (p: IconProps) => <ShieldIcon {...p} color="#5eead4" />, title: "100% Confidential", desc: "Your idea is always safe." },
];

const STEPS = [
  { Icon: TargetIcon, num: "01", title: "Real Challenge", desc: "Every solution starts with an actual business problem." },
  { Icon: BulbIcon, num: "02", title: "Our Approach", desc: "We design, build, and integrate what fits — nothing more, nothing less." },
  { Icon: GrowthIcon, num: "03", title: "Real Impact", desc: "Solutions that streamline operations and create measurable value." },
];

/* ---------- Dashboard mockup pieces ---------- */

const NAV = ["Dashboard", "Projects", "Clients", "Tasks", "Team", "Reports", "Settings"];

const STATS = [
  { label: "Total Projects", value: "128", delta: "14%" },
  { label: "Active Clients", value: "64", delta: "12%" },
  { label: "Team Members", value: "24", delta: "8%" },
  { label: "Completion Rate", value: "89%", delta: "6%" },
];

const ACTIVITY = [
  { title: "Project Alpha", sub: "Design Completed", time: "2h ago" },
  { title: "Mobile App", sub: "Development In Progress", time: "5h ago" },
  { title: "Client Meeting", sub: "Project Briefing", time: "1d ago" },
];

const WORKLOAD = [72, 48, 85, 60, 40];

function Sparkline() {
  return (
    <svg viewBox="0 0 50 18" className="h-[14px] w-[42px]">
      <path d="M1 15 9 12 16 13 24 8 31 10 39 5 49 2" fill="none" stroke={TEAL} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function LineChart() {
  const pts = "0,70 30,60 60,66 90,48 120,54 150,40 180,46 210,30 240,36 270,22 300,12";
  return (
    <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <linearGradient id="cdowFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.25" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60].map((y) => (
        <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#eef2f4" strokeWidth="1" />
      ))}
      <polygon points={`0,80 ${pts} 300,80`} fill="url(#cdowFill)" />
      <polyline points={pts} fill="none" stroke={TEAL} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Donut() {
  const r = 15;
  const c = 2 * Math.PI * r;
  const segs = [
    { pct: 0.7, color: DEEP_TEAL },
    { pct: 0.2, color: "#5eead4" },
    { pct: 0.1, color: "#e2e8f0" },
  ];
  let offset = 0;
  return (
    <div className="relative h-[54px] w-[54px] shrink-0">
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
        {segs.map((s) => {
          const el = (
            <circle
              key={s.color}
              cx="20"
              cy="20"
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="5"
              strokeDasharray={`${s.pct * c} ${c}`}
              strokeDashoffset={-offset * c}
            />
          );
          offset += s.pct;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[10px] font-bold" style={{ color: NAVY }}>128</span>
        <span className="text-[5px] text-slate-400">Total</span>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="flex h-full w-full bg-[#f6f9fa] text-[7px]">
      {/* Sidebar */}
      <aside className="w-[18%] shrink-0 bg-white border-r border-slate-100 px-2 py-3">
        <div className="flex items-center gap-1 mb-4 px-1">
          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full" style={{ backgroundColor: DEEP_TEAL }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="text-[9px] font-bold" style={{ color: NAVY }}>OpsHub</span>
        </div>
        <ul className="flex flex-col gap-1">
          {NAV.map((n, i) => (
            <li
              key={n}
              className="flex items-center gap-1.5 rounded-md px-1.5 py-1"
              style={i === 0 ? { backgroundColor: DEEP_TEAL, color: "#fff" } : { color: "#64748b" }}
            >
              <span className="h-1.5 w-1.5 rounded-sm border" style={{ borderColor: i === 0 ? "#fff" : "#94a3b8" }} />
              {n}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 p-3 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold leading-none" style={{ color: NAVY }}>Dashboard</p>
            <p className="text-[6px] text-slate-400 mt-0.5">Welcome back, Admin</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[6px] text-slate-500">May 01 – May 31, 2024</span>
            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-md bg-white border border-slate-100 p-1.5">
              <p className="text-[6px] text-slate-400">{s.label}</p>
              <div className="flex items-end justify-between mt-0.5">
                <div>
                  <p className="text-[11px] font-bold leading-none" style={{ color: NAVY }}>{s.value}</p>
                  <p className="text-[5.5px] mt-0.5" style={{ color: TEAL }}>▲ {s.delta}</p>
                </div>
                <Sparkline />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-1.5 flex-1 min-h-0">
          <div className="rounded-md bg-white border border-slate-100 p-1.5 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-[7px] font-semibold" style={{ color: NAVY }}>Project Overview</p>
              <span className="text-[5.5px] text-slate-400">This Month ▾</span>
            </div>
            <div className="relative flex-1 min-h-[50px] mt-1">
              <LineChart />
              <span className="absolute right-[12%] top-[8%] rounded bg-white px-1 py-0.5 text-[5px] shadow border border-slate-100" style={{ color: NAVY }}>
                May<br /><b>128 Projects</b>
              </span>
            </div>
            <div className="flex justify-between text-[5px] text-slate-400 mt-0.5">
              {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => <span key={m}>{m}</span>)}
            </div>
          </div>

          <div className="rounded-md bg-white border border-slate-100 p-1.5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[7px] font-semibold" style={{ color: NAVY }}>Recent Activity</p>
              <span className="text-[5.5px]" style={{ color: TEAL }}>View All</span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {ACTIVITY.map((a) => (
                <li key={a.title} className="flex items-start gap-1">
                  <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded" style={{ backgroundColor: "#e6f6f4" }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold leading-tight truncate" style={{ color: NAVY }}>{a.title}</p>
                    <p className="text-[5.5px] text-slate-400 truncate">{a.sub}</p>
                  </div>
                  <span className="text-[5px] text-slate-400 whitespace-nowrap">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1.6fr] gap-1.5">
          <div className="rounded-md bg-white border border-slate-100 p-1.5">
            <p className="text-[7px] font-semibold mb-1" style={{ color: NAVY }}>Tasks by Status</p>
            <div className="flex items-center gap-2">
              <Donut />
              <ul className="flex-1 flex flex-col gap-0.5 text-[5.5px] text-slate-500">
                {[["Completed", "70%", DEEP_TEAL], ["In Progress", "20%", "#5eead4"], ["Pending", "10%", "#cbd5e1"]].map(([l, v, c]) => (
                  <li key={l} className="flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1"><span className="h-1 w-1 rounded-full" style={{ backgroundColor: c }} />{l}</span>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-md bg-white border border-slate-100 p-1.5">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[7px] font-semibold" style={{ color: NAVY }}>Team Workload</p>
              <span className="text-[5.5px]" style={{ color: TEAL }}>+ Add Member</span>
            </div>
            <div className="flex items-end justify-around h-[46px]">
              {WORKLOAD.map((w, i) => (
                <div key={i} className="flex flex-col items-center gap-0.5 h-full justify-end">
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 ring-1 ring-white" />
                  <div className="w-1.5 flex-1 max-h-[30px] rounded-full bg-slate-100 flex items-end overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${w}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.5 + i * 0.08 }}
                      className="w-full rounded-full"
                      style={{ backgroundColor: TEAL }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedBackground() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 90% at 0% 100%, #0f4f4a 0%, ${DARK} 55%, #071c1c 100%)` }}
      />
      {/* subtle wave lines */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 w-full opacity-30" viewBox="0 0 300 150" preserveAspectRatio="none">
        {Array.from({ length: 18 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${110 + i * 3} C 80 ${60 + i * 4}, 160 ${150 - i * 2}, 300 ${70 + i * 5}`}
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="0.4"
          />
        ))}
      </svg>
    </>
  );
}

function FeaturedContent({ project }: { project: Project }) {
  return (
    <div className="relative flex flex-col">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] uppercase text-teal-200">
        <SparkIcon size={8} color="#5eead4" /> Featured Project
      </span>
      <h3 className="mt-4 font-serif text-[28px] lg:text-[26px] xl:text-[34px] font-bold leading-[1.12] text-white">
        {project.title.map((line) => <span key={line} className="block">{line}</span>)}
      </h3>
      <p className="mt-4 text-[12px] xl:text-[13px] leading-relaxed text-slate-300 max-w-[240px]">
        {project.desc}
      </p>
      <Link
        href="/contact"
        className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-[11.5px] font-medium text-white transition-colors hover:bg-white/10"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        View Case Study
        <span className="transition-transform group-hover:translate-x-0.5"><ArrowIcon size={13} /></span>
      </Link>
    </div>
  );
}

/* Design canvas: everything below is laid out at 900×607 and scaled to fit. */
const CANVAS_W = 900;
const CANVAS_H = 607;
const LAPTOP_W = 720;
const DASH_W = 560; // DashboardMock is drawn at this width, then scaled to the screen
const DASH_SCALE = (LAPTOP_W - 24) / DASH_W;

function Laptop() {
  return (
    <div className="relative" style={{ width: LAPTOP_W }}>
      {/* Screen bezel */}
      <div className="rounded-[26px] bg-gradient-to-br from-white via-slate-50 to-slate-300 p-[7px] shadow-[0_60px_90px_-40px_rgba(10,30,40,0.6)] ring-1 ring-slate-300/70">
        <div className="rounded-[20px] bg-[#e4eaec] p-[5px]">
          <div className="relative aspect-[16/10.4] overflow-hidden rounded-[15px] bg-white">
            <div
              className="absolute left-0 top-0"
              style={{ width: DASH_W, height: (DASH_W * 10.4) / 16, transform: `scale(${DASH_SCALE})`, transformOrigin: "0 0" }}
            >
              <DashboardMock />
            </div>
          </div>
        </div>
      </div>
      {/* Base */}
      <div className="relative -mt-1 ml-[-3%] h-4 w-[106%] rounded-b-[20px] rounded-t-[4px] bg-gradient-to-b from-slate-50 to-slate-300 shadow-[0_24px_30px_-14px_rgba(10,30,40,0.5)]">
        <span className="absolute left-1/2 top-0 h-1.5 w-28 -translate-x-1/2 rounded-b-lg bg-slate-300" />
      </div>
    </div>
  );
}

function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / designWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);
  return { ref, scale };
}

function ShowcaseCanvas({ project }: { project: Project }) {
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{
          width: CANVAS_W,
          height: CANVAS_H,
          transform: `scale(${scale})`,
          transformOrigin: "0 0",
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {/* Dark card — tilted so its right side recedes behind the laptop */}
        <div
          className="absolute left-0 top-[20px]"
          style={{ width: 1440, height: 540, perspective: "1675px", perspectiveOrigin: "0% 50%" }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-[30px] shadow-[0_40px_70px_-35px_rgba(5,30,30,0.7)]"
            style={{ transform: "rotateY(30deg)", transformOrigin: "0% 50%" }}
          >
            <FeaturedBackground />
          </div>
        </div>

        {/* Card text — kept flat, not tilted */}
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute left-[56px] top-[104px] w-[225px]"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] uppercase text-teal-200">
            <SparkIcon size={9} color="#5eead4" /> Featured Project
          </span>
          <h3 className="mt-5 font-serif text-[31px] font-bold leading-[1.1] text-white">
            {project.title.map((line) => <span key={line} className="block">{line}</span>)}
          </h3>
          <p className="mt-4 text-[13px] leading-[1.65] text-slate-300">
            {project.desc}
          </p>
          <Link
            href="/contact"
            className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-4 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-white/10"
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            View Case Study
            <span className="transition-transform group-hover:translate-x-0.5"><ArrowIcon size={15} /></span>
          </Link>
        </motion.div>

        {/* Laptop — tilted so its right side comes toward the viewer */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="absolute top-[56px]"
          style={{ right: 30, width: LAPTOP_W, perspective: "1720px", perspectiveOrigin: "100% 50%" }}
        >
          <div style={{ transform: "rotateY(-25deg)", transformOrigin: "100% 50%" }}>
            <Laptop />
          </div>
        </motion.div>

        {/* Floating layers badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[262px] top-[392px] flex h-[108px] w-[108px] items-center justify-center rounded-full bg-white shadow-[0_24px_45px_-15px_rgba(15,40,60,0.45)]"
        >
          <LayersIcon size={50} />
        </motion.div>

        {/* Secure & Scalable card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          className="absolute left-[722px] top-[490px] flex items-center gap-4 rounded-2xl bg-white/95 backdrop-blur pl-5 pr-4 py-4 shadow-[0_24px_45px_-15px_rgba(15,40,60,0.4)] border border-slate-100"
        >
          <ShieldIcon size={42} />
          <p className="text-[16px] font-bold leading-tight" style={{ color: NAVY }}>
            Secure
            <br />& Scalable
          </p>
          <span className="self-end"><CheckBadge /></span>
        </motion.div>
      </div>
    </div>
  );
}

const SLIDE_TRANSITION = { duration: 0.9, ease: EASE };
const mod = (a: number, n: number) => ((a % n) + n) % n;

function ProjectCarousel({ onChange }: { onChange: (i: number) => void }) {
  const n = PROJECTS.length;
  // Unbounded slide position; the project shown is pos mod n, so it loops forever.
  const [pos, setPos] = useState(0);
  const go = (next: number) => {
    setPos(next);
    onChange(mod(next, n));
  };
  // Only render the slides near the current position.
  const slides = Array.from({ length: 7 }, (_, i) => pos - 2 + i);

  return (
    <div className="mx-auto flex w-full lg:w-[80%] items-center gap-3 sm:gap-5 rounded-[22px] bg-white border border-slate-100 shadow-[0_20px_45px_-30px_rgba(15,40,60,0.35)] px-3 py-3 sm:px-5">
      <button
        type="button"
        aria-label="Previous project"
        onClick={() => go(pos - 1)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm transition hover:border-teal-300 hover:-translate-x-0.5"
      >
        <ChevronIcon dir="left" />
      </button>

      <div className="relative h-[104px] flex-1 min-w-0 overflow-hidden">
        {/* The track is one slide wide; each slide sits at k × 100% inside it. */}
        <motion.div
          className="absolute inset-y-0 left-0 w-full md:w-1/3"
          initial={false}
          animate={{ x: `${-pos * 100}%` }}
          transition={SLIDE_TRANSITION}
        >
          {slides.map((k) => {
            const p = PROJECTS[mod(k, n)];
            const isActive = k === pos;
            return (
              <div key={k} className="absolute inset-y-0 w-full px-1.5" style={{ left: `${k * 100}%` }}>
                <button
                  type="button"
                  onClick={() => go(k)}
                  className={`relative flex h-full w-full items-center gap-4 rounded-2xl px-4 text-left transition-all duration-700 ${
                    isActive ? "bg-white shadow-[0_15px_35px_-18px_rgba(15,40,60,0.35)] ring-1 ring-slate-100" : "hover:bg-slate-50"
                  }`}
                >
                  {!isActive && <span className="absolute -left-1.5 top-3 bottom-3 w-px bg-slate-100" aria-hidden />}
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-colors duration-700"
                    style={isActive ? { backgroundColor: DEEP_TEAL, borderColor: DEEP_TEAL } : { backgroundColor: "#f1f7f6", borderColor: "#e2ecea" }}
                  >
                    <p.Icon color={isActive ? "#fff" : TEAL} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-bold leading-snug" style={{ color: NAVY }}>{p.name}</span>
                    <span className="mt-1 block text-[12.5px] leading-snug text-slate-500">{p.short}</span>
                  </span>
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>

      <button
        type="button"
        aria-label="Next project"
        onClick={() => go(pos + 1)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm transition hover:border-teal-300 hover:translate-x-0.5"
      >
        <ChevronIcon />
      </button>
    </div>
  );
}

function SuccessCta() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative overflow-hidden rounded-[22px] px-6 py-6 sm:px-8 lg:px-10"
      style={{ background: `linear-gradient(100deg, #071c1c 0%, ${DARK} 45%, #0d3d3a 100%)` }}
    >
      {/* soft glow + wave lines */}
      <div className="pointer-events-none absolute -left-16 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-teal-400/20 blur-3xl" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 800 120" preserveAspectRatio="none">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={i} d={`M300 ${130 - i * 4} C 480 ${40 + i * 6}, 620 ${140 - i * 3}, 800 ${60 + i * 5}`} fill="none" stroke="#2dd4bf" strokeWidth="0.5" />
        ))}
      </svg>

      <div className="relative flex flex-col xl:flex-row items-center gap-6 xl:gap-8">
        {/* Cube + headline */}
        <div className="flex items-center gap-5 xl:gap-6 shrink-0">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-teal-300/40"
            />
            <span className="absolute inset-2 rounded-full bg-teal-400/15 blur-md" />
            <span
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.45)]"
              style={{ background: "linear-gradient(135deg, rgba(94,234,212,0.35), rgba(13,148,136,0.15))" }}
            >
              <CubeIcon size={34} />
            </span>
          </div>
          <p className="text-[22px] sm:text-[26px] leading-tight text-white font-medium">
            Your idea could be
            <br />
            <span className="font-semibold text-teal-300 underline decoration-teal-300/70 decoration-2 underline-offset-[6px]">
              our next success story.
            </span>
          </p>
        </div>

        {/* Points */}
        <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-center gap-5 sm:gap-0">
          {CTA_POINTS.map((pt, i) => (
            <div key={pt.title} className={`flex items-start gap-3 sm:px-6 ${i > 0 ? "sm:border-l sm:border-white/15" : ""}`}>
              <pt.Icon size={22} />
              <div>
                <p className="text-[13px] font-semibold text-white">{pt.title}</p>
                <p className="mt-0.5 text-[11.5px] text-slate-400">{pt.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Button + social proof */}
        <div className="flex flex-col items-center gap-2.5 shrink-0">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 rounded-full border border-teal-300/40 pl-6 pr-1.5 py-1.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #0f766e, #0f5c56)" }}
          >
            Start Your Project
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
              <ArrowIcon size={16} color={DEEP_TEAL} />
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#fcd9bd", "#e7c4a5", "#d6b08c", "#f1d3b8"].map((c) => (
                <span key={c} className="h-6 w-6 rounded-full ring-2 ring-[#0b2a2a]" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-[11.5px] text-slate-300 whitespace-nowrap">Trusted by 500+ businesses</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomDevOurWork() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#f4f8f8] py-8 sm:py-10 lg:py-12">
      {/* soft background rings */}
      <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full border border-slate-200/60" />
      <div className="pointer-events-none absolute right-[-4%] top-[-10%] h-[440px] w-[440px] rounded-full border border-slate-200/50" />

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-[0.8fr_1.6fr] gap-12 lg:gap-10 items-center">
          {/* Left: heading + steps */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ backgroundColor: "#e6f6f4", color: DEEP_TEAL }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEAL }} />
                Our Work in Action
              </span>
              <h2 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-[54px] font-bold leading-[1.05]" style={{ color: NAVY }}>
                Real Problems.
                <br />
                <span style={{ color: TEAL }}>Real Solutions.</span>
              </h2>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md">
                Custom software we&apos;ve built for businesses to simplify operations and drive real results.
              </p>
            </motion.div>

            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
              className="relative mt-8 flex flex-col gap-7"
            >
              {/* connecting line */}
              <span className="absolute left-[31px] top-16 bottom-16 w-px bg-slate-200" aria-hidden />
              {STEPS.map((s) => (
                <motion.li
                  key={s.num}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}
                  className="relative flex items-start gap-5"
                >
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white border border-slate-100 shadow-[0_10px_25px_-12px_rgba(15,40,60,0.25)]">
                    <s.Icon />
                  </span>
                  <div className="pt-1">
                    <p className="text-[12px] font-semibold" style={{ color: TEAL }}>{s.num}</p>
                    <h3 className="mt-0.5 text-[17px] font-bold" style={{ color: NAVY }}>{s.title}</h3>
                    <p className="mt-1 text-[13.5px] text-slate-500 leading-snug max-w-[250px]">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* Right: laptop mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative w-full"
          >
            {/* Mobile: featured card only */}
            <div className="md:hidden relative overflow-hidden rounded-[24px] px-6 py-8">
              <FeaturedBackground />
              <FeaturedContent project={project} />
            </div>

            {/* Tablet / desktop: tilted card + separate laptop */}
            <div className="hidden md:block">
              <ShowcaseCanvas project={project} />
            </div>
          </motion.div>
        </div>

        <div className="relative mt-10 lg:mt-12 flex flex-col gap-6">
          <ProjectCarousel onChange={setActive} />
          <SuccessCta />
        </div>
      </Container>
    </section>
  );
}
