"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const TargetIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill={color} stroke="none" />
  </svg>
);
const CodeIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m9 7-5 5 5 5" />
    <path d="m15 7 5 5-5 5" />
  </svg>
);
const ChartUpIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 20V13" />
    <path d="M10 20V9" />
    <path d="M16 20v-6" />
    <path d="m20 5-6.5 6.5-3-3L4 15" />
    <path d="M15 5h5v5" />
  </svg>
);
const RocketIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  </svg>
);
const SearchIcon = ({ size = 16, color = "white" }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const FlagIcon = ({ size = 16, color = "white" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M5 3v18" />
    <path d="M5 4h11l-2 4 2 4H5" />
  </svg>
);
const PencilIcon = ({ size = 16, color = "white" }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m14.5 3.5 6 6L8 22H2v-6Z" />
    <path d="m13 5 6 6" />
  </svg>
);
const PlayIcon = ({ size = 14, color = NAVY }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8 5.5v13l11-6.5Z" />
  </svg>
);
const BarMini = () => (
  <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
    <rect x="1" y="12" width="5" height="7" rx="1" fill={TEAL} opacity="0.35" />
    <rect x="9" y="7" width="5" height="12" rx="1" fill={TEAL} opacity="0.65" />
    <rect x="17" y="2" width="5" height="17" rx="1" fill={TEAL} />
  </svg>
);
const LineMini = () => (
  <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
    <defs>
      <linearGradient id="whyChoosePerfFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={TEAL} stopOpacity="0.35" />
        <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0 20 10 14 20 17 30 8 40 11 56 2 56 24 0 24Z" fill="url(#whyChoosePerfFill)" />
    <path d="M0 20 10 14 20 17 30 8 40 11 56 2" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
function Cylinder({ height, width = 28 }: { height: number; width?: number }) {
  const cap = width * 0.34;
  return (
    <div className="relative shrink-0" style={{ width, height: height + cap / 2 }}>
      <div
        className="absolute left-0 right-0 bottom-0 rounded-b-md"
        style={{
          top: cap / 2,
          background: `linear-gradient(90deg, ${DEEP_TEAL} 0%, ${TEAL} 45%, #5eead4 100%)`,
        }}
      />
      <div
        className="absolute left-0 right-0 top-0 rounded-full"
        style={{ height: cap, background: `linear-gradient(135deg, #99f6e4 0%, #2dd4bf 60%, ${TEAL} 100%)` }}
      />
    </div>
  );
}

const FEATURES = [
  { Icon: TargetIcon, title: "Strategic by Design", desc: "We start with your goals and build with purpose." },
  { Icon: CodeIcon, title: "Built for You", desc: "Custom solutions tailored to your brand and audience." },
  { Icon: ChartUpIcon, title: "Results That Scale", desc: "Future-ready digital experiences that drive growth." },
  { Icon: RocketIcon, title: "Beyond Delivery", desc: "We partner with you to optimize, evolve, and grow." },
];

const PEDESTAL = [
  { Icon: SearchIcon, label: "Research" },
  { Icon: FlagIcon, label: "Strategy" },
  { Icon: PencilIcon, label: "Design" },
  { Icon: CodeIcon, label: "Development" },
  { Icon: RocketIcon, label: "Launch" },
  { Icon: ChartUpIcon, label: "Growth" },
];

const NAV_LINKS = ["About", "Services", "Work", "Contact"];

export default function WhyChooseUsHero() {
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: TEAL }}>
              Why Choose Us?
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-[52px] font-bold leading-[1.1]" style={{ color: NAVY }}>
              We Build What
              <br />
              <span style={{ color: TEAL }}>Grows Your</span>
              <br />
              <span className="relative inline-block" style={{ color: TEAL }}>
                Business.
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 220 10" fill="none">
                  <path d="M2 7c40-8 160-8 216 0" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
              Strategy. Design. Technology. <span style={{ color: TEAL }}>Growth.</span> Everything aligned to deliver real results that matter to you.
            </p>

            <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6">
              {FEATURES.map((f) => (
                <div key={f.title}>
                  <f.Icon size={22} />
                  <h3 className="mt-2.5 text-[13px] font-bold leading-snug" style={{ color: NAVY }}>{f.title}</h3>
                  <p className="mt-1 text-[11.5px] text-slate-500 leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full pl-6 pr-2 py-2 text-[14px] font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: NAVY }}
              >
                Let&apos;s Build What&apos;s Next
                <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: TEAL }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </Link>
              <button type="button" className="flex items-center gap-2.5 group">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition-colors group-hover:border-teal-300">
                  <PlayIcon />
                </span>
                <span className="text-left">
                  <span className="block text-[13px] font-semibold" style={{ color: NAVY }}>See How We Do It</span>
                  <span className="block text-[11px] text-slate-400">Watch 60-sec overview</span>
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right: 3D growth scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="hidden lg:block relative w-full aspect-[6/5]"
          >
            {/* Soft radial backdrop */}
            <div
              className="pointer-events-none absolute left-0 top-0 h-[60%] w-[60%] rounded-full blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(13,148,136,0.1) 0%, transparent 70%)" }}
            />

            {/* Glow growth line */}
            <svg className="absolute left-[0%] top-[0%] h-[32%] w-[55%]" viewBox="0 0 300 150" fill="none">
              <motion.path
                d="M4 10c40 0 70 40 110 55s110 10 180 60"
                stroke={TEAL}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.85"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.3, ease: EASE }}
                style={{ filter: "drop-shadow(0 0 5px rgba(45,212,191,0.8))" }}
              />
              <circle cx="4" cy="10" r="5" fill={TEAL} style={{ filter: "drop-shadow(0 0 6px rgba(45,212,191,0.9))" }} />
            </svg>

            {/* Main device card */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [10, -6, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-[10%] top-[0%] w-[72%] rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 overflow-hidden"
              style={{ perspective: 1400, rotateX: 5 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <span className="h-5 w-5 rounded-full" style={{ backgroundColor: TEAL }} />
                <div className="flex items-center gap-3">
                  {NAV_LINKS.map((n) => (
                    <span key={n} className="text-[9px] font-medium text-slate-400">{n}</span>
                  ))}
                </div>
              </div>
              <div className="relative flex">
                <div className="flex-1 p-4">
                  <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: NAVY }}>
                    Designed to Engage.
                    <br />
                    <span style={{ color: TEAL }}>Built to Grow.</span>
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold text-white" style={{ backgroundColor: NAVY }}>
                    Explore
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
                      <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </div>
                <div className="relative w-[42%] shrink-0">
                  <Image src="/Tacoma_aerial,_May_2023.png" alt="" fill sizes="260px" className="object-cover" />
                </div>
              </div>
            </motion.div>

            {/* Floating stat card: Performance */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [10, 2, 10] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute left-[0%] top-[42%] w-[26%] rounded-xl bg-white shadow-[0_20px_40px_-18px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 p-3"
            >
              <p className="text-[10px] text-slate-400 font-medium">Performance</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-base font-bold" style={{ color: NAVY }}>+230%</p>
                <LineMini />
              </div>
            </motion.div>

            {/* 3D cylinder chart */}
            <div className="absolute left-[32%] top-[50%] flex items-end gap-3">
              <Cylinder height={26} width={26} />
              <Cylinder height={46} width={26} />
              <Cylinder height={68} width={26} />
            </div>

            {/* Floating stat card: Leads Generated */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [10, -4, 10] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute left-[28%] top-[62%] w-[26%] rounded-xl bg-white shadow-[0_20px_40px_-18px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 p-3"
            >
              <p className="text-[10px] text-slate-400 font-medium">Leads Generated</p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-base font-bold" style={{ color: NAVY }}>+180%</p>
                <BarMini />
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: [10, -5, 10] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="absolute right-[6%] top-[38%] w-[22%] rounded-[1.4rem] bg-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 overflow-hidden"
              style={{ perspective: 1400, rotateX: -4, rotateY: 8 }}
            >
              <div className="p-3 pb-0">
                <p className="text-[11px] font-bold" style={{ color: NAVY }}>Mobile Experience</p>
                <p className="mt-1 text-[9.5px] leading-snug" style={{ color: TEAL }}>Seamless. Fast. Effective.</p>
              </div>
              <div className="relative mt-2 h-20 w-full">
                <Image src="/Tacoma_aerial,_May_2023.png" alt="" fill sizes="140px" className="object-cover" />
              </div>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute right-[-2%] bottom-[10%] h-16 w-16 rounded-full" style={{ background: `conic-gradient(${TEAL} 0deg 230deg, #e2e8f0 230deg 360deg)` }}>
              <div className="absolute inset-[6px] rounded-full bg-white" />
            </div>

            {/* Pedestal */}
            <div className="absolute left-0 bottom-0 w-full rounded-2xl bg-gradient-to-b from-white to-slate-50 shadow-[0_25px_50px_-20px_rgba(15,23,42,0.3)] ring-1 ring-slate-100 px-3 pt-6 pb-5 flex items-center justify-between overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-white via-white to-transparent" />
              <div className="absolute inset-x-0 top-3 h-px bg-slate-200/70" />
              {PEDESTAL.map((p) => (
                <div key={p.label} className="flex flex-col items-center gap-1.5 px-1">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: DEEP_TEAL }}>
                    <p.Icon />
                  </span>
                  <span className="text-[9.5px] font-semibold whitespace-nowrap" style={{ color: NAVY }}>{p.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
