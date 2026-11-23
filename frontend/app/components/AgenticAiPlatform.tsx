"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "./Container";

/* =========================================================================
   ICONS (24px stroke paths)
   ========================================================================= */

const I = {
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  chart: "M3 17l5-5 4 4 8-9M15 7h5v5",
  shield: "M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6l8-3ZM8.500 12l2.500 2.500L16 9.500",
  bars: "M5 20V12M11 20V6M17 20V10M3 20h18",
  users: "M16 20v-1.500a3.500 3.500 0 0 0-3.500-3.500h-5A3.500 3.500 0 0 0 4 18.500V20M10 11a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7ZM20 20v-1.500a3.500 3.500 0 0 0-2.500-3.300",
  user: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  card: "M3 6h18v12H3ZM3 10h18M7 15h3",
  flow: "M6 6a2 2 0 1 0 0 .01M18 6a2 2 0 1 0 0 .01M6 18a2 2 0 1 0 0 .01M18 18a2 2 0 1 0 0 .01M8 7l8 10M16 7 8 17",
  cart: "M3 4h2l2.500 11h11L20 7H6M9 20a1 1 0 1 0 0 .01M17 20a1 1 0 1 0 0 .01",
  doc: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8ZM14 3v5h5M9 13h6M9 17h4",
  headset: "M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H5a1 1 0 0 1-1-1ZM20 14h-3v5h2a1 1 0 0 0 1-1ZM17 19c0 1.500-2 2-5 2",
  star: "M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9Z",
  truck: "M2 6h12v10H2ZM14 9h4l3 3v4h-7M6 19a1.500 1.500 0 1 0 0 .01M17 19a1.500 1.500 0 1 0 0 .01",
  gift: "M4 11h16v9H4ZM3 7h18v4H3ZM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0",
  undo: "M4 10h10a5 5 0 0 1 0 10H8M4 10l4-4M4 10l4 4",
  insight: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  rocket: "M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5ZM9 14l-4 1 1-4M10 15l-1 4 4-1M15 8.500a1 1 0 1 0 0 .01",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7Z",
  lock: "M6 11h12v9H6ZM8 11V8a4 4 0 0 1 8 0v3",
  chat: "M4 5h16v11H9l-5 4ZM8 10h8",
  arrow: "M5 12h14M13 6l6 6-6 6",
  trend: "M3 17l6-6 4 4 8-9",
  layers: "m12 3 9 5-9 5-9-5ZM3 13l9 5 9-5",
  cogs: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2",
  coin: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM14.500 9c-.5-1-1.500-1.500-2.500-1.500-1.500 0-2.500.8-2.500 2s1 1.700 2.500 2 2.500.8 2.500 2-1 2-2.500 2c-1 0-2-.5-2.500-1.500M12 6v1.500M12 16.500V18",
} as const;

const Icon = ({ d, className = "w-5 h-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

/* =========================================================================
   DATA
   ========================================================================= */

const benefits = [
  { icon: I.clock, title: "Save Time", desc: "Automate repetitive work and free up your team." },
  { icon: I.chart, title: "Boost Productivity", desc: "Your agent works 24/7— faster, smarter, tireless." },
  { icon: I.shield, title: "Reduce Errors", desc: "Consistent, accurate actions across every workflow." },
  { icon: I.bars, title: "Drive Growth", desc: "Better decisions. Better outcomes. Stronger business impact." },
];

const b2b = [
  { icon: I.users, label: "Sales & Lead Intelligence" },
  { icon: I.user, label: "HR & People Operations" },
  { icon: I.card, label: "Finance & Compliance Automation" },
  { icon: I.flow, label: "Workflow & Process Automation" },
  { icon: I.cart, label: "Procurement & Vendor Management" },
  { icon: I.doc, label: "Document & Knowledge Management" },
];

const b2c = [
  { icon: I.headset, label: "Smart Customer Support" },
  { icon: I.undo, label: "Returns & Refunds Automation" },
  { icon: I.star, label: "Personalized Product Recommendations" },
  { icon: I.insight, label: "Customer Insights & Analytics" },
  { icon: I.truck, label: "Order Tracking & Delivery Updates" },
  { icon: I.gift, label: "Loyalty & Rewards Management" },
];

const ctaPoints = [
  { icon: I.shield, title: "Faster Implementation", desc: "Quick setup. Real results." },
  { icon: I.lock, title: "Enterprise-Grade Security", desc: "Your data, always protected." },
  { icon: I.chat, title: "Expert Support", desc: "We're with you, every step." },
];

const proof = [
  { icon: I.trend, title: "Proven Results", desc: "Measurable impact across industries." },
  { icon: I.layers, title: "Scalable Solutions", desc: "Built to grow with your business." },
  { icon: I.cogs, title: "Flexible & Custom", desc: "Tailored to your unique needs." },
  { icon: I.coin, title: "ROI-Focused", desc: "Solutions that drive real value." },
];

export const logos = [
  { name: "REGAL", sub: "HOSPITALITY", mark: "M4 18l2-10 5 5 5-5 2 10Z", serif: true },
  { name: "NEXORA", sub: "TECHNOLOGIES", mark: "M5 19V5l14 14V5" },
  { name: "ZENITH", sub: "FINANCIAL", mark: "M12 3l8 4.500v9L12 21l-8-4.500v-9ZM8.500 10h7l-7 5h7" },
  { name: "PIVOTAL", sub: "SOLUTIONS", mark: "M5 5h8a4 4 0 0 1 0 8H5ZM5 13v6" },
  { name: "ALPHORA", sub: "INDUSTRIES", mark: "M12 4 4 20h4l4-9 4 9h4Z" },
  { name: "SUMMIT", sub: "HEALTHCARE", mark: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7Z" },
];

/* =========================================================================
   PIECES
   ========================================================================= */

function FeatureItem({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-[11.5px] leading-snug font-medium text-slate-700">
      <span className="w-8 h-8 rounded-lg bg-[#eaf4fb] text-[#1b6fa8] flex items-center justify-center shrink-0">
        <Icon d={icon} className="w-4 h-4" />
      </span>
      <span>{label}</span>
    </div>
  );
}

const HUB_TRACES = [
  { d: "M 150 150 H 66", dots: [[66, 150]] },
  { d: "M 150 166 H 102 C 92 166 94 178 82 178 H 30", dots: [[30, 178]] },
  { d: "M 150 182 H 112 C 102 182 104 194 92 194 H 52", dots: [[52, 194]] },
  { d: "M 150 198 H 122 C 112 198 114 210 102 210 H 74", dots: [[74, 210]] },
  { d: "M 150 134 H 92 C 72 134 66 108 52 90 L 38 68", dots: [[38, 68]] },
  { d: "M 150 120 H 120 C 104 120 100 98 88 80", dots: [[88, 80]] },
  { d: "M 150 214 H 106 C 86 214 80 236 66 252", dots: [[66, 252]] },
];

function HubSide() {
  return (
    <g>
      {HUB_TRACES.map((t) => (
        <g key={t.d}>
          <path d={t.d} stroke="url(#hubTrace)" strokeWidth="0.9" />
          {t.dots.map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="6" fill="#38bdf8" opacity="0.2" />
              <circle cx={x} cy={y} r="2.5" fill="#38bdf8" />
            </g>
          ))}
          <circle r="2.2" fill="#0ea5e9">
            <animateMotion dur={`${3 + (t.dots[0][1] % 5) * 0.4}s`} repeatCount="indefinite" path={t.d} />
          </circle>
        </g>
      ))}
      <circle cx="150" cy="150" r="3.5" fill="#ffffff" stroke="#7dd3fc" strokeWidth="1.5" />
      <circle cx="150" cy="168" r="2.5" fill="#38bdf8" />
    </g>
  );
}

function hexPoints(cx: number, cy: number, r: number) {
  const w = r * 0.866;
  return `${cx},${cy - r} ${cx + w},${cy - r / 2} ${cx + w},${cy + r / 2} ${cx},${cy + r} ${cx - w},${cy + r / 2} ${cx - w},${cy - r / 2}`;
}

function PlatformHub() {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* rings + circuit traces */}
      <svg
        className="hidden lg:block absolute left-1/2 top-[-95px] -translate-x-1/2 w-[360px] h-[340px] pointer-events-none"
        viewBox="0 0 360 340"
        fill="none"
      >
        <defs>
          <linearGradient id="hubTrace" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="hubFadeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.1" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.3" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="0.36" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.64" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.7" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.9" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="hubFade" maskUnits="userSpaceOnUse" x="0" y="0" width="360" height="340">
            <rect x="0" y="0" width="360" height="340" fill="url(#hubFadeGrad)" />
          </mask>
          <radialGradient id="hubGlow">
            <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.55" />
            <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="180" cy="170" r="135" fill="url(#hubGlow)" />
        <polygon points={hexPoints(180, 170, 134)} stroke="#bfe3f8" strokeOpacity="0.55" strokeWidth="1" strokeLinejoin="round" />
        <polygon points={hexPoints(180, 170, 112)} fill="#e6f4fd" fillOpacity="0.45" stroke="#cfeaf9" strokeOpacity="0.7" strokeWidth="8" strokeLinejoin="round" />
        <polygon points={hexPoints(180, 170, 90)} fill="#f0f9ff" fillOpacity="0.8" stroke="#dcf0fc" strokeOpacity="0.9" strokeWidth="8" strokeLinejoin="round" />
        <g mask="url(#hubFade)">
          <g transform="translate(-50 20)">
            <HubSide />
          </g>
          <g transform="translate(410 20) scale(-1 1)">
            <HubSide />
          </g>
        </g>
      </svg>

      <motion.div
        className="relative w-[136px] h-[150px] flex items-center justify-center"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/Ai-badge.webp"
          alt="ProManage AI badge"
          width={1254}
          height={1254}
          sizes="150px"
          className="relative w-[150px] h-auto max-w-none mix-blend-multiply drop-shadow-[0_14px_22px_rgba(2,132,199,0.3)]"
        />
      </motion.div>

      <div className="relative mt-3 text-[16px] font-black leading-tight text-[#0b1f4a]">One platform.</div>
      <div className="relative text-[16px] font-black leading-tight bg-gradient-to-r from-[#0f8a83] to-[#1b6fa8] bg-clip-text text-transparent">Infinite impact.</div>
    </div>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: "teal" | "purple" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-bold tracking-[0.1em] uppercase border ${
        tone === "teal" ? "bg-[#e6f6f5] text-[#0f6f78] border-[#c9ebe9]" : "bg-[#f0eaff] text-[#6d4bd0] border-[#ded3fb]"
      }`}
    >
      <span className="text-[9px]">#</span>
      {children}
    </span>
  );
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export default function AgenticAiPlatform() {
  return (
    <section id="platform" className="relative w-full bg-[linear-gradient(180deg,#ffffff_0%,#f5f9fd_100%)] py-10 sm:py-14 font-sans overflow-hidden">
      <Container className="relative z-10 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-sky-200 px-3 py-1 text-[9.5px] font-extrabold tracking-[0.14em] text-[#0f6f78] uppercase shadow-sm">
            <span>#</span> Custom Agentic AI Solutions
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.12] text-[#0b1f4a]">
            Intelligent Agents.{" "}
            <span className="bg-gradient-to-r from-[#0f8a83] to-[#1b6fa8] bg-clip-text text-transparent">Real Results.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
            Custom-built AI agents that automate work, optimize operations,
            <br className="hidden sm:inline" /> and deliver measurable impact across your business.
          </p>
        </motion.div>

        {/* Benefits row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0 lg:divide-x divide-slate-200/70">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="flex items-center gap-3 lg:px-5 first:lg:pl-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="w-12 h-12 rounded-full bg-[#eaf1fb] text-[#1b5fa8] flex items-center justify-center shrink-0">
                <Icon d={b.icon} className="w-5 h-5" />
              </span>
              <div>
                <div className="text-[13px] font-bold text-[#0b1f4a]">{b.title}</div>
                <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{b.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform card */}
        <motion.div
          className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-[0_18px_44px_-22px_rgba(15,35,80,0.2)] px-5 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px_1fr] gap-8 lg:gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* B2B */}
          <div>
            <Tag tone="teal">Built for B2B</Tag>
            <h3 className="mt-3 text-[17px] font-black leading-tight text-[#0b1f4a]">
              Power Operations.
              <br />
              <span className="text-[#0f8a83]">Scale Smarter.</span>
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
              {b2b.map((f) => (
                <FeatureItem key={f.label} icon={f.icon} label={f.label} />
              ))}
            </div>
          </div>

          <PlatformHub />

          {/* B2C */}
          <div className="lg:pl-2">
            <Tag tone="purple">Built for B2C</Tag>
            <h3 className="mt-3 text-[17px] font-black leading-tight text-[#0b1f4a]">
              Delight Customers.
              <br />
              <span className="text-[#7c4dff]">Build Loyalty.</span>
            </h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
              {b2c.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 text-[11.5px] leading-snug font-medium text-slate-700">
                  <span className="w-8 h-8 rounded-lg bg-[#f1ebff] text-[#7c4dff] flex items-center justify-center shrink-0">
                    <Icon d={f.icon} className="w-4 h-4" />
                  </span>
                  <span>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA banner */}
        <motion.div
          className="mt-6 rounded-2xl bg-[linear-gradient(100deg,#0b3b5a_0%,#0e6a73_60%,#0f7f80_100%)] text-white px-5 sm:px-7 py-5 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-6 shadow-[0_18px_40px_-20px_rgba(11,59,90,0.7)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 lg:w-[290px] shrink-0">
            <span className="w-14 h-14 rounded-full bg-white text-[#0e6a73] flex items-center justify-center shrink-0">
              <Icon d={I.rocket} className="w-7 h-7" />
            </span>
            <div className="text-[14px] font-bold leading-snug">
              Ready to transform your business with AI agents that deliver?
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:border-l lg:border-white/15 lg:pl-6">
            {ctaPoints.map((p) => (
              <div key={p.title} className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-white/12 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon d={p.icon} className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] font-bold leading-tight">{p.title}</div>
                  <div className="text-[10px] text-white/70 leading-snug">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center lg:items-start shrink-0">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-white text-[#0b1f4a] text-[13px] font-bold shadow-md hover:shadow-lg transition"
            >
              Book a Free Consultation
              <Icon d={I.arrow} className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <span className="mt-2 text-[10px] text-white/70">No commitment. Just possibilities.</span>
          </div>
        </motion.div>

        {/* Trusted by */}
        <div className="mt-8 text-center">
          <div className="text-[10.5px] font-extrabold tracking-[0.16em] text-[#0f4a6a] uppercase">
            Trusted by forward-thinking businesses worldwide
          </div>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-5 items-center lg:divide-x divide-slate-200">
            {logos.map((l) => (
              <div key={l.name} className="flex items-center justify-center gap-2 text-[#0b2a4a] opacity-90">
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="currentColor">
                  <path d={l.mark} fillRule="evenodd" />
                </svg>
                <div className="text-left leading-none">
                  <div className={`text-[14px] font-extrabold tracking-wide ${l.serif ? "font-serif" : ""}`}>{l.name}</div>
                  <div className="mt-0.5 text-[6.5px] font-semibold tracking-[0.18em] text-slate-500">{l.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proof strip */}
        <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-[0_10px_30px_-18px_rgba(15,35,80,0.18)] px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-slate-100">
          {proof.map((p) => (
            <div key={p.title} className="flex items-center gap-3 lg:px-5 first:lg:pl-0">
              <span className="w-10 h-10 rounded-full bg-[#e9f6f4] text-[#0f8a83] flex items-center justify-center shrink-0">
                <Icon d={p.icon} className="w-[18px] h-[18px]" />
              </span>
              <div>
                <div className="text-[12px] font-bold text-[#0b1f4a]">{p.title}</div>
                <div className="text-[10.5px] text-slate-500 leading-snug">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
