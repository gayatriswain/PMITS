"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "./Container";
import CountUp from "./CountUp";
import { CakeMark } from "./HireCakePhpExpertise";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";
const INK = "#0f1a2e";
const CAKE = "/Red_Velvet_Cake_with_Glowing_Rim-removebg-preview.png";

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
  className: "h-5 w-5",
};

/* ------------------------------ icons ------------------------------ */
const ic = {
  userStar: (
    <svg {...I}>
      <circle cx="10" cy="8" r="3.6" />
      <path d="M3.5 20c.4-3.6 3-5.6 6.5-5.6 1.3 0 2.4.3 3.4.8" />
      <path d="M18 13.5l1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2-1.6-1.6 2.2-.3 1-2z" />
    </svg>
  ),
  chat: (
    <svg {...I}>
      <path d="M3.5 6.5a2 2 0 012-2h8a2 2 0 012 2V11a2 2 0 01-2 2H9l-3 2.5V13h-.5a2 2 0 01-2-2V6.5z" />
      <path d="M17 9h1.5a2 2 0 012 2v4.5a2 2 0 01-2 2H18v2.5L15 17.5h-3.5a2 2 0 01-1.7-1" />
    </svg>
  ),
  clock: (
    <svg {...I}>
      <path d="M20 12a8 8 0 11-3-6.2" />
      <path d="M12 7.5V12l3 2" />
      <path d="M18 3v3.5h-3.5" />
    </svg>
  ),
  shield: (
    <svg {...I}>
      <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </svg>
  ),
  users: (
    <svg {...I}>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c.3-3 2.7-4.8 5.5-4.8s5.2 1.8 5.5 4.8" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M16 14.8c2.4-.2 4.2 1.3 4.5 4" />
    </svg>
  ),
  headset: (
    <svg {...I}>
      <path d="M4.5 13v-1.5a7.5 7.5 0 0115 0V13" />
      <rect x="3.5" y="12.5" width="3.5" height="5.5" rx="1.5" />
      <rect x="17" y="12.5" width="3.5" height="5.5" rx="1.5" />
      <path d="M19 18v.5a2.5 2.5 0 01-2.5 2.5H13" />
    </svg>
  ),
  briefcase: (
    <svg {...I}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0115 6v1.5M3.5 13h17" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
      <path d="M12 2a6.5 6.5 0 00-6.5 6.5C5.5 13.4 12 22 12 22s6.5-8.6 6.5-13.5A6.5 6.5 0 0012 2zm0 8.8a2.3 2.3 0 110-4.6 2.3 2.3 0 010 4.6z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  ),
};

/* ------------------------------ stage setup ------------------------------ */
// Precise mathematical coordinate system for orbit stage: 860 x 500
// TRUE ROUND CIRCLE: equal radius in X & Y (175px), 0% oval
const STAGE_W = 860;
const STAGE_H = 500;
const ORBIT_CX = 430;
const ORBIT_CY = 245;
const ORBIT_R = 175;

/* ------------------------------ items data ------------------------------ */
type Item = {
  title: string;
  text: string;
  icon: React.ReactNode;
  leftPct: string;
  topPct: string;
  width: string;
  /** "left" = content to left of icon (left side items), "right" = content to right of icon */
  layout: "left" | "right";
  /** [x, y, w, h] cutout in SVG mask to guarantee line NEVER cuts across content */
  mask: [number, number, number, number];
};

const ITEMS: Item[] = [
  // Left side: Content to the LEFT of icon (so text is completely exterior to orbit line)
  {
    title: "Experienced",
    text: "Skilled CakePHP developers with years of real-world experience.",
    icon: ic.userStar,
    leftPct: "8.68%",
    topPct: "24.52%",
    width: "w-[234px]",
    layout: "left",
    mask: [71, 119, 242, 73],
  },
  {
    title: "Transparent",
    text: "Clear communication and complete visibility at every step.",
    icon: ic.chat,
    leftPct: "5.31%",
    topPct: "50.68%",
    width: "w-[234px]",
    layout: "left",
    mask: [42, 249, 242, 73],
  },
  {
    title: "On-Time Delivery",
    text: "We respect deadlines and deliver what we promise.",
    icon: ic.clock,
    leftPct: "16.75%",
    topPct: "76.32%",
    width: "w-[234px]",
    layout: "left",
    mask: [140, 378, 242, 73],
  },
  // Right side: Content to the RIGHT of icon
  {
    title: "Reliable Quality",
    text: "Clean code, best practices and rigorous testing for bug-free delivery.",
    icon: ic.shield,
    leftPct: "64.11%",
    topPct: "24.52%",
    width: "w-[245px]",
    layout: "right",
    mask: [547, 119, 257, 73],
  },
  {
    title: "Flexible Engagement",
    text: "Hire dedicated developers or scale your team as per your project needs.",
    icon: ic.users,
    leftPct: "67.71%",
    topPct: "47.65%",
    width: "w-[245px]",
    layout: "right",
    mask: [578, 234, 257, 73],
  },
  {
    title: "Ongoing Support",
    text: "Dependable post-launch support whenever you need us.",
    icon: ic.headset,
    leftPct: "61.83%",
    topPct: "69.35%",
    width: "w-[245px]",
    layout: "right",
    mask: [528, 343, 257, 73],
  },
];

/** Mask cutout for top CakePHP title area */
const CAKEPHP_MASK: [number, number, number, number] = [330, 8, 200, 120];

/** Accent glowing dots located directly on the true circular orbit line */
const ACCENT_DOTS = [
  { x: 512.2, y: 90.5 },  // between CakePHP & Reliable Quality
  { x: 347.8, y: 90.5 },  // between CakePHP & Experienced
  { x: 258.8, y: 208.6 }, // between Experienced & Transparent
  { x: 292.1, y: 352.8 }, // between Transparent & On-Time Delivery
  { x: 460.4, y: 417.2 }, // between On-Time Delivery & Ongoing Support
];

const COUNTRIES = ["USA", "UK", "Australia", "UAE", "India"];

/* ------------------------------ pieces ------------------------------ */
function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid h-[44px] w-[44px] shrink-0 place-items-center rounded-2xl bg-white text-[#d92b32] shadow-[0_10px_22px_-8px_rgba(217,43,50,0.35)] ring-1 ring-[#f6e1e2] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#d92b32] group-hover:text-white">
      {children}
    </span>
  );
}

function OrbitItem({ item, i }: { item: Item; i: number }) {
  const isLeft = item.layout === "left";
  return (
    <motion.div
      style={{ left: item.leftPct, top: item.topPct }}
      className={`group absolute z-10 flex ${
        isLeft
          ? "flex-row items-start justify-end gap-3 text-right"
          : "flex-row items-start gap-3 text-left"
      } ${item.width}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: EASE }}
    >
      {/* If left side: text comes FIRST, then icon on the right (adjacent to orbit circle) */}
      {isLeft && (
        <div className="pt-0.5">
          <h3 className="text-[12.5px] font-bold leading-tight" style={{ color: INK }}>
            {item.title}
          </h3>
          <p className="mt-0.5 text-[9.5px] leading-[1.42] text-slate-500">
            {item.text}
          </p>
        </div>
      )}

      <IconTile>{item.icon}</IconTile>

      {/* If right side: icon comes first, then text on the right */}
      {!isLeft && (
        <div className="pt-0.5">
          <h3 className="text-[12.5px] font-bold leading-tight" style={{ color: INK }}>
            {item.title}
          </h3>
          <p className="mt-0.5 text-[9.5px] leading-[1.42] text-slate-500">
            {item.text}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function Plane() {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 150 90"
      className="pointer-events-none absolute -bottom-1 right-1 h-[75px] w-[125px]"
      fill="none"
      aria-hidden
      animate={reduce ? undefined : { y: [0, -5, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M4 78C28 80 44 60 64 54c14-4 26-2 34-12" stroke="#e9a3a6" strokeWidth="1.2" strokeDasharray="2.5 4.5" strokeLinecap="round" />
      <path d="M140 8L74 38l22 8 8 22 36-60z" fill="#e5383b" />
      <path d="M140 8L96 46l8 22" fill="#b91c22" opacity=".55" />
      <path d="M140 8L74 38l22 8z" fill="#ff6b6e" />
    </motion.svg>
  );
}

/* ------------------------------ main section ------------------------------ */
export default function HireCakePhpWhy() {
  const reduce = useReducedMotion();

  // Pure circular SVG motion path for the spark animation (true round circle: r = ORBIT_R)
  const CIRCLE_MOTION_PATH = `M ${ORBIT_CX} ${ORBIT_CY - ORBIT_R} a ${ORBIT_R} ${ORBIT_R} 0 1 1 0 ${2 * ORBIT_R} a ${ORBIT_R} ${ORBIT_R} 0 1 1 0 -${2 * ORBIT_R} Z`;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fdf9f9_100%)] py-12 sm:py-16">
      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ 2-COLUMN MAIN ROW ------------------------------ */}
        <div className="grid items-center gap-6 lg:grid-cols-[0.66fr_1.34fr] xl:grid-cols-[0.62fr_1.38fr] xl:gap-8">
          {/* Left Column: Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative z-10 flex flex-col items-start"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: RED }}>
                WHY PROMANAGE
              </span>
              <span className="h-[1.5px] w-6 opacity-60" style={{ background: RED }} />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 font-playfair text-[32px] font-bold leading-[1.14] tracking-tight sm:text-4xl xl:text-[42px]"
              style={{ color: INK }}
            >
              More than developers.
              <br />
              Your <span style={{ color: RED }}>CakePHP</span> partner.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 max-w-[420px] text-[13.5px] leading-relaxed text-slate-600"
            >
              We combine deep CakePHP expertise with a client-first approach to deliver secure, scalable and
              high-performing applications.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-6 flex flex-col items-start">
              <Link
                href="#cakephp-contact"
                className="group inline-flex items-center gap-2 text-[13px] font-semibold transition-colors hover:opacity-90"
                style={{ color: RED }}
              >
                Hire a CakePHP Developer
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">{ic.arrow}</span>
              </Link>
              <motion.span
                className="mt-2 block h-[1.5px] w-8 origin-left"
                style={{ background: RED }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Orbit Stage (TRUE CIRCLE, CONTENT TO LEFT OF ICON FOR LEFT POINTS) */}
          <div className="relative mx-auto hidden aspect-[860/500] w-full max-w-[860px] select-none md:block">
            {/* SVG Orbit Lines: True Round Circle */}
            <svg
              viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              <defs>
                <mask id="cakeOrbitMask" maskUnits="userSpaceOnUse" x="0" y="0" width={STAGE_W} height={STAGE_H}>
                  <rect width={STAGE_W} height={STAGE_H} fill="white" />
                  {/* Top CakePHP badge cutout */}
                  <rect
                    x={CAKEPHP_MASK[0]}
                    y={CAKEPHP_MASK[1]}
                    width={CAKEPHP_MASK[2]}
                    height={CAKEPHP_MASK[3]}
                    rx="14"
                    fill="black"
                  />
                  {/* 6 feature cards cutouts - completely erases orbit line behind cards */}
                  {ITEMS.map((item) => (
                    <rect
                      key={item.title}
                      x={item.mask[0]}
                      y={item.mask[1]}
                      width={item.mask[2]}
                      height={item.mask[3]}
                      rx="14"
                      fill="black"
                    />
                  ))}
                </mask>
              </defs>

              {/* Orbit lines under mask: Guaranteed to never touch or cross content lines */}
              <g mask="url(#cakeOrbitMask)">
                {/* Outer faint secondary concentric orbit */}
                <circle
                  cx={ORBIT_CX}
                  cy={ORBIT_CY}
                  r={ORBIT_R + 18}
                  stroke="#fae9ea"
                  strokeWidth="0.8"
                  strokeDasharray="2 6"
                />
                {/* Main TRUE CIRCLE orbit */}
                <circle
                  cx={ORBIT_CX}
                  cy={ORBIT_CY}
                  r={ORBIT_R}
                  stroke="#f0cfd1"
                  strokeWidth="1.2"
                  strokeDasharray="3 6"
                />
                {/* Spark traveling along the true round circular path */}
                {!reduce && (
                  <circle r="3.5" fill="#ff5a5f" style={{ filter: "drop-shadow(0 0 5px rgba(255,90,95,0.9))" }}>
                    <animateMotion dur="14s" repeatCount="indefinite" path={CIRCLE_MOTION_PATH} />
                  </circle>
                )}
              </g>

              {/* Glowing accent dots placed cleanly on the circular orbit line */}
              {ACCENT_DOTS.map((dot, i) => (
                <g key={i}>
                  <circle cx={dot.x} cy={dot.y} r="2.8" fill={RED} />
                  {!reduce && (
                    <circle cx={dot.x} cy={dot.y} r="2.8" fill={RED} opacity="0.45">
                      <animate
                        attributeName="r"
                        values="2.8;7.5;2.8"
                        dur="3s"
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.45;0;0.45"
                        dur="3s"
                        begin={`${i * 0.6}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            {/* Top: CakePHP emblem & tagline */}
            <motion.div
              style={{ left: "50%", top: "2.0%" }}
              className="absolute z-10 flex w-[180px] -translate-x-1/2 flex-col items-center text-center"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <span className="scale-[0.85]">
                <CakeMark />
              </span>
              <h3 className="mt-1 text-[13px] font-bold leading-tight" style={{ color: INK }}>
                CakePHP
              </h3>
              <p className="mt-0.5 text-[9.5px] leading-snug text-slate-500">
                The solid foundation for your next big idea.
              </p>
            </motion.div>

            {/* Center: 3D Cake with glowing plate pedestal */}
            <motion.div
              style={{ left: "50%", top: "49.0%" }}
              className="absolute z-10 w-[185px] -translate-x-1/2 -translate-y-1/2 xl:w-[195px]"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            >
              <motion.span
                aria-hidden
                className="absolute -bottom-2 left-1/2 h-12 w-[125%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,170,170,0.65)_0%,transparent_68%)] blur-md"
                animate={reduce ? undefined : { opacity: [0.65, 1, 0.65], scaleX: [0.96, 1.04, 0.96] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={reduce ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={CAKE}
                  alt="CakePHP 3D Architecture Cake"
                  width={612}
                  height={408}
                  sizes="195px"
                  className="relative h-auto w-full select-none drop-shadow-[0_20px_24px_rgba(120,40,40,0.2)]"
                />
              </motion.div>
            </motion.div>

            {/* 6 orbit items placed around the true circle */}
            {ITEMS.map((it, i) => (
              <OrbitItem key={it.title} item={it} i={i} />
            ))}
          </div>
        </div>

        {/* ------------------------ Mobile Stacked Version ------------------------ */}
        <div className="mt-10 md:hidden">
          <div className="flex flex-col items-center text-center">
            <CakeMark />
            <h3 className="mt-2 text-[16px] font-bold" style={{ color: INK }}>
              CakePHP
            </h3>
            <p className="mt-1 text-[12px] text-slate-500">
              The solid foundation for your next big idea.
            </p>
          </div>
          <div className="mx-auto mt-6 w-[250px]">
            <Image
              src={CAKE}
              alt="CakePHP 3D Architecture Cake"
              width={612}
              height={408}
              sizes="250px"
              className="h-auto w-full drop-shadow-[0_20px_24px_rgba(120,40,40,0.2)]"
            />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {ITEMS.map((it) => (
              <div
                key={it.title}
                className="group flex items-start gap-3.5 rounded-xl border border-[#f5e6e6] bg-white p-3.5 shadow-sm"
              >
                <IconTile>{it.icon}</IconTile>
                <div>
                  <h3 className="text-[13.5px] font-bold" style={{ color: INK }}>
                    {it.title}
                  </h3>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">{it.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------- BOTTOM BAR (GLOBAL CLIENTS + STATS + CTA) ----------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 grid items-center gap-5 rounded-2xl border border-[#f3eaea] bg-white p-4 shadow-[0_20px_50px_-28px_rgba(80,30,30,0.3)] lg:grid-cols-[1fr_auto_1fr_1.18fr] lg:gap-6 lg:p-4 lg:pl-6"
        >
          {/* Col 1: Global Clients */}
          <div>
            <p className="text-[13.5px] font-semibold leading-snug" style={{ color: INK }}>
              Working with clients
              <br />
              across the globe
            </p>
            <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5">
              {COUNTRIES.map((c, i) => (
                <motion.li
                  key={c}
                  className="flex items-center gap-1 text-[10.5px] font-medium text-slate-600"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className="text-[#d92b32]">{ic.pin}</span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <span aria-hidden className="hidden h-14 w-px bg-[#f0e3e3] lg:block" />

          {/* Col 2: Numbers */}
          <div className="flex items-center gap-7">
            {[
              { n: 100, s: "+", l: "Projects Delivered", icon: ic.users },
              { n: 15, s: "+", l: "Industries Served", icon: ic.briefcase },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#fdeeee] text-[#d92b32]">
                  {s.icon}
                </span>
                <div>
                  <p className="text-[22px] font-extrabold leading-none" style={{ color: INK }}>
                    <CountUp to={s.n} suffix={s.s} />
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">{s.l}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Col 3: Have a Project in Mind CTA */}
          <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(110deg,#fff2f2_0%,#ffe8e8_100%)] px-5 py-4">
            <h3 className="font-playfair text-[15.5px] font-bold" style={{ color: INK }}>
              Have a project in mind?
            </h3>
            <p className="mt-0.5 text-[11px] text-slate-500">Let&apos;s build something great together.</p>
            <Link
              href="#cakephp-contact"
              className="group relative mt-3 inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-4 py-2 text-[11.5px] font-semibold text-white shadow-[0_8px_18px_-6px_rgba(217,43,50,0.7)] transition-transform hover:-translate-y-0.5 active:scale-95"
              style={{ background: RED }}
            >
              <span className="relative">Get In Touch</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1">
                {ic.arrow}
              </span>
            </Link>
            <Plane />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
