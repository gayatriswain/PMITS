"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import DottedMap from "dotted-map/without-countries";
import Container from "../shared/Container";
import WORLD_DOT_MAP from "../shared/worldDotMap";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: EASE },
  }),
};

const I = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------------------------------- cards ---------------------------------- */
const CARDS = [
  {
    title: "Custom Development",
    text: "Build tailored web applications using the full power of CakePHP.",
    icon: (
      <svg {...I} className="h-7 w-7">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01M10 13l-2 2 2 2M14 13l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: "API & Integrations",
    text: "Seamlessly integrate payment gateways, APIs and third-party services.",
    icon: (
      <svg {...I} className="h-7 w-7">
        <path d="M6 4v16M12 4v16M18 4v16" />
        <rect x="4" y="13" width="4" height="3" rx="1" fill="#fff" />
        <rect x="10" y="7" width="4" height="3" rx="1" fill="#fff" />
        <rect x="16" y="11" width="4" height="3" rx="1" fill="#fff" />
      </svg>
    ),
  },
  {
    title: "Migration & Upgrade",
    text: "Upgrade smoothly to the latest CakePHP versions with zero downtime.",
    icon: (
      <svg {...I} className="h-7 w-7">
        <path d="M7 18a4.5 4.5 0 01-.6-8.96A6 6 0 0118 10.5a3.8 3.8 0 01-.5 7.5H7z" />
        <path d="M12 16v-5m0 0l-2.2 2.2M12 11l2.2 2.2" />
      </svg>
    ),
  },
  {
    title: "Performance Optimization",
    text: "Optimize speed, security and scalability for high-performance applications.",
    icon: (
      <svg {...I} className="h-7 w-7">
        <path d="M4.5 18a8.5 8.5 0 1115 0" />
        <path d="M12 14l4-5M7 11.5h.01M9 8.5h.01M12 7.5h.01" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Maintenance & Support",
    text: "Keep your application secure, updated and running at its best.",
    icon: (
      <svg {...I} className="h-7 w-7">
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "Scalability",
    text: "Architect and build applications that grow with your business confidently.",
    icon: (
      <svg {...I} className="h-7 w-7">
        <path d="M4 20V14M10 20V10M16 20v-4M22 20H2" />
        <path d="M5 9l5-4 4 3 6-4M16 4h4v4" />
      </svg>
    ),
  },
];

/* ---------------------------------- stats ---------------------------------- */
const STATS = [
  {
    value: 15,
    suffix: "+",
    title: "CakePHP Developers",
    text: "Skilled. Experienced. Dedicated.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
      </svg>
    ),
  },
  {
    value: 10,
    suffix: "+",
    title: "Years of Experience",
    text: "Delivering reliable digital solutions.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 14l-1.5 1.5L8 17M13 14l1.5 1.5L13 17" />
      </svg>
    ),
  },
  {
    value: 500,
    suffix: "+",
    title: "Projects Delivered",
    text: "Across industries worldwide.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M14 4c3.5 0 6 2.5 6 6-3 1-5 3-6 6l-4-4c3-1 5-3 6-6" />
        <path d="M10 12l-4 1-2 3 4 1M12 14l-1 4-3 2-1-4" />
      </svg>
    ),
  },
  {
    value: 75,
    suffix: "+",
    title: "Cities Served",
    text: "Building long-term partnerships.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
    ),
  },
];

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView) return;
    setN(value);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function CakeMark() {
  const layer = (y: number, fill: string, shade: string) => (
    <g key={y}>
      <path d={`M6 ${y} v9 a26 9 0 0 0 52 0 v-9 a26 9 0 0 1 -52 0 z`} fill={fill} />
      <path d={`M6 ${y + 9} a26 9 0 0 0 52 0`} fill="none" stroke={shade} strokeWidth="1" opacity=".5" />
    </g>
  );
  return (
    <svg viewBox="0 0 64 58" className="h-[66px] w-[76px]" aria-hidden>
      {layer(38, "#c8242b", "#8f1218")}
      {layer(29, "#fdf3f3", "#e4c9c9")}
      {layer(20, "#d92b32", "#8f1218")}
      <ellipse cx="32" cy="20" rx="26" ry="9" fill="#ee4a50" />
      <path d="M32 20 L58 20 A26 9 0 0 1 32 29 Z" fill="#fff" opacity=".9" />
      <ellipse cx="32" cy="20" rx="26" ry="9" fill="none" stroke="#b81f26" strokeWidth=".8" />
    </svg>
  );
}

/* ---------------------------------- dotted map ---------------------------------- */
const worldMap = new DottedMap({ map: JSON.parse(WORLD_DOT_MAP) });
const MAP_W = worldMap.image.width;
const MAP_H = worldMap.image.height;
const MAP_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  worldMap.getSVG({ shape: "circle", color: "#cfc9c9", radius: 0.32, backgroundColor: "transparent" }),
)}`;

const PINS = [
  { x: 0.5, y: 0.47 },
  { x: 0.7, y: 0.36 },
  { x: 0.37, y: 0.74 },
];

export default function HireCakePhpExpertise() {
  return (
    <section
      id="expertise"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#f7f1f1_0%,#fcfafa_45%,#ffffff_100%)] pb-14 pt-14 font-sans sm:pt-20 lg:pb-20"
    >
      <Container className="relative max-w-[1240px]">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: RED }}>
            <i aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: RED }} />
            CakePHP Expertise
          </span>
          <h2 className="mt-4 font-serif text-[34px] font-bold leading-[1.12] tracking-tight text-[#0f1a2e] sm:text-5xl lg:text-[50px]">
            More than Developers.
            <br />
            <span style={{ color: RED }}>A Complete CakePHP Partner.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            We combine deep CakePHP expertise with proven engineering practices to deliver secure, scalable and future-ready web applications.
          </p>
        </div>

        {/* 6 cards */}
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-4">
          {CARDS.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.07 * i, ease: EASE }}
              className="group flex flex-col items-center rounded-2xl border border-white bg-white px-4 pb-5 pt-6 text-center shadow-[0_18px_44px_-24px_rgba(80,30,30,0.3)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="grid h-14 w-14 place-items-center rounded-xl border border-[#f3d3d5] bg-[#fff7f7] text-[#d92b32] transition-colors duration-300 group-hover:border-[#d92b32] group-hover:bg-[#d92b32] group-hover:text-white">
                {c.icon}
              </span>
              <h3 className="mt-4 text-sm font-bold text-[#0f1a2e]">{c.title}</h3>
              <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">{c.text}</p>
            </motion.li>
          ))}
        </ul>

        {/* stats bar */}
        <div className="relative mt-8 overflow-hidden rounded-3xl border border-white bg-white/90 shadow-[0_24px_60px_-30px_rgba(80,30,30,0.35)]">
          <div className="grid items-center gap-y-6 px-5 py-5 lg:grid-cols-[auto_1fr_30%] lg:gap-x-6 lg:pl-8 lg:pr-4">
            <div className="flex flex-col items-center gap-1.5 lg:px-2">
              <CakeMark />
              <span className="text-[22px] font-extrabold leading-none tracking-tight" style={{ color: RED }}>
                CakePHP
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <li key={s.title} className={`flex flex-col items-start px-4 ${i > 0 ? "sm:border-l sm:border-[#eee4e4]" : ""}`}>
                  <span style={{ color: RED }}>{s.icon}</span>
                  <p className="mt-2.5 text-[26px] font-extrabold leading-none text-[#0f1a2e]">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-[12px] font-bold text-[#0f1a2e]">{s.title}</p>
                  <p className="mt-1 max-w-[150px] text-[10.5px] leading-snug text-slate-500">{s.text}</p>
                </li>
              ))}
            </ul>

            <div className="relative hidden w-full lg:block" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }} aria-hidden>
              <img src={MAP_URI} alt="" className="absolute inset-0 h-full w-full" />
              {PINS.map((p, i) => (
                <span key={i} style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }} className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2">
                  <span className="absolute -inset-1.5 animate-ping rounded-full bg-[#d92b32]/30" />
                  <span className="absolute inset-0 rounded-full bg-[#d92b32]" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
