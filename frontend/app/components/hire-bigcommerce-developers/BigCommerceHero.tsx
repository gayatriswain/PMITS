"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, BC, Eyebrow, Icon, QUOTE_HREF, ease, heading, type IconName } from "./BigCommerceShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/* Stage geometry (1560×590) taken from the design mock. Card rows are centred on these y values. */
const SW = 1560, SH = 590;
const ROWS_L = [85, 225, 362, 497];
const ROWS_R = [95, 230, 370, 505];
const RING = { x: 770, y: 290, r: 235 };
/* connector: [startX, startY, endX, endY] in stage units */
const CONN_L: [number, number, number, number][] = [[435, 100, 592, 200], [435, 235, 540, 285], [430, 362, 535, 362], [425, 497, 540, 435]];
const CONN_R: [number, number, number, number][] = [[1125, 100, 948, 200], [1125, 235, 1000, 285], [1128, 368, 1005, 362], [1132, 500, 1000, 435]];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

type CardDef = { title: string; text: string; icon: IconName; mini: React.ReactNode };

function MiniStorefront() {
  const $t = useCmsText();
  return (
    <div className="w-[118px] rounded-lg border border-slate-100 bg-white p-1.5 shadow-sm">
      <div className="mb-1 flex gap-1">{["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((c) => <span key={c} className={`h-1 w-1 rounded-full ${c}`} />)}</div>
      <div className="flex h-[58px] items-center gap-1 rounded bg-gradient-to-r from-slate-50 to-sky-50 px-1.5">
        <div className="flex-1">
          <p className="text-[8px] font-bold leading-tight text-[#0b1a4a]">{rich($t("BigCommerceHero__t1", "Summer"))}<br />{rich($t("BigCommerceHero__t2", "Collection"))}</p>
          <span className="mt-1 block h-2 w-8 rounded-sm bg-[#0b1a4a]" />
        </div>
        <div className="h-[50px] w-[34px] rounded-t-full bg-gradient-to-b from-amber-200 via-[#0d8f9a] to-[#0b5f6a]" />
      </div>
    </div>
  );
}
function MiniApps() {
  const $t = useCmsText();
  const apps = [
    { c: "bg-amber-100 text-amber-700", t: $t("BigCommerceHero__t3", "M") },
    { c: "bg-sky-100 text-sky-600", t: "◎" },
    { c: "bg-blue-600 text-white", t: $t("BigCommerceHero__t4", "P") },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {apps.map((a, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6 + i * 0.12, type: "spring", stiffness: 300 }}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold shadow-sm ${a.c}`}
        >
          {a.t}
        </motion.span>
      ))}
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">•••</span>
    </div>
  );
}
function MiniPay() {
  const $t = useCmsText();
  return (
    <div className="w-[124px] rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
      <p className="text-[7px] text-slate-400">{rich($t("BigCommerceHero__t5", "Credit Card"))}</p>
      <p className="mt-1 rounded border border-slate-100 px-1 py-0.5 text-[8px] tracking-wider text-slate-600">{rich($t("BigCommerceHero__t6", "•••• •••• •••• 4242"))}</p>
      <span className="mt-1.5 block rounded bg-[#0d8f9a] py-1 text-center text-[8px] font-semibold text-white">{$t("BigCommerceHero__t7", "Pay Securely")}</span>
    </div>
  );
}
function MiniPhone() {
  const $t = useCmsText();
  return (
    <div className="w-[64px] rounded-[10px] border border-slate-200 bg-white p-1.5 shadow-sm">
      <p className="text-[6px] text-slate-400">{rich($t("BigCommerceHero__t8", "Headphones"))}</p>
      <svg viewBox="0 0 40 34" className="mx-auto my-1 h-8 w-9" aria-hidden>
        <path d="M6 22v-6a14 14 0 0 1 28 0v6" stroke="#111827" strokeWidth="4" fill="none" />
        <rect x="3" y="18" width="9" height="13" rx="4" fill="#111827" />
        <rect x="28" y="18" width="9" height="13" rx="4" fill="#111827" />
      </svg>
      <p className="text-[7px] font-bold text-[#0b1a4a]">{rich($t("BigCommerceHero__t9", "$89.00"))}</p>
    </div>
  );
}
function MiniTheme() {
  const $t = useCmsText();
  return (
    <div className="w-[120px] overflow-hidden rounded-lg border border-slate-100 bg-white shadow-sm">
      <div className="flex gap-1 p-1">{["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((c) => <span key={c} className={`h-1 w-1 rounded-full ${c}`} />)}</div>
      <div className="flex h-[54px] items-end bg-gradient-to-br from-slate-700 via-slate-500 to-slate-300 p-1.5">
        <p className="text-[8px] font-bold leading-tight text-white">{rich($t("BigCommerceHero__t10", "NEW"))}<br />{rich($t("BigCommerceHero__t11", "ARRIVALS"))}</p>
      </div>
    </div>
  );
}
function MiniGauge({ start }: { start: boolean }) {
  const $t = useCmsText();
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? 95 : 0);
  useEffect(() => {
    if (!start || reduce) return;
    const c = animate(0, 95, { duration: 1.6, delay: 1.4, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [start, reduce]);
  const C = 2 * Math.PI * 30 * 0.75;
  return (
    <div className="relative h-[80px] w-[96px]">
      <svg viewBox="0 0 80 70" className="h-full w-full -rotate-0" aria-hidden>
        <path d="M14 58 A30 30 0 1 1 66 58" stroke="#e2e8f0" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path
          d="M14 58 A30 30 0 1 1 66 58"
          stroke="url(#bcGauge)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - v / 100)}
        />
        <defs>
          <linearGradient id="bcGauge" x1="0" x2="1">
            <stop offset="0" stopColor="#0d8f9a" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-x-0 top-[34%] text-center">
        <span className={`${heading.className} text-xl font-bold text-[#0b1a4a]`}>{v}</span>
        <span className="text-[9px] text-slate-500">{$t("BigCommerceHero__t12", "/100")}</span>
      </span>
      <span className="absolute inset-x-0 bottom-0 text-center text-[8px] text-slate-400">{$t("BigCommerceHero__t13", "Site Speed")}</span>
    </div>
  );
}
function MiniLock() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex h-[76px] w-[76px] items-center justify-center">
      <svg viewBox="0 0 60 66" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d="M30 2 56 12v20c0 16-12 28-26 32C16 60 4 48 4 32V12Z" fill="#f1f5f9" stroke="#e2e8f0" />
      </svg>
      <motion.span
        animate={reduce ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative text-[#0b1a4a]"
      >
        <Icon name="lock" className="h-7 w-7" />
      </motion.span>
      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0d8f9a] text-white shadow">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg>
      </span>
    </div>
  );
}
function MiniChart() {
  const $t = useCmsText();
  const reduce = useReducedMotion();
  return (
    <div className="w-[120px] rounded-lg border border-slate-100 bg-white p-2 shadow-sm">
      <p className="text-[7px] text-slate-400">{rich($t("BigCommerceHero__t14", "Total Sales"))}</p>
      <p className={`text-small ${heading.className} font-bold text-[#0b1a4a]`}>{rich($t("BigCommerceHero__t15", "$48,860"))}</p>
      <svg viewBox="0 0 100 40" className="mt-1 h-9 w-full" aria-hidden>
        <defs>
          <linearGradient id="bcArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 34 L14 28 L26 31 L40 20 L52 24 L66 14 L78 18 L100 4 V40 H0Z" fill="url(#bcArea)" />
        <motion.path
          d="M0 34 L14 28 L26 31 L40 20 L52 24 L66 14 L78 18 L100 4"
          stroke="#7c3aed"
          strokeWidth="2"
          fill="none"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 1.6, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

function Parallax({ mx, my, depth, children, className = "", style }: { mx: MotionValue<number>; my: MotionValue<number>; depth: number; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return <motion.div style={{ ...style, x, y }} className={className}>{children}</motion.div>;
}

function FeatureCard({ c, side, i }: { c: CardDef; side: "l" | "r"; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "l" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.9 + i * 0.12, ease }}
      whileHover={{ scale: 1.03 }}
      className={`group relative flex items-center gap-3 rounded-2xl border border-white bg-white/85 py-4 shadow-[0_22px_44px_-26px_rgba(11,26,74,0.45)] backdrop-blur-md ${
        side === "l" ? "pl-[74px] pr-3" : "pl-[74px] pr-3"
      }`}
    >
      <span className="absolute -left-5 top-1/2 flex h-[66px] w-[66px] -translate-y-1/2 items-center justify-center rounded-2xl border border-white bg-white text-[#0b1a4a] shadow-[0_14px_28px_-14px_rgba(11,26,74,0.45)] transition-colors duration-300 group-hover:text-[#0d8f9a]">
        <Icon name={c.icon} className="h-8 w-8" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className={`${heading.className} whitespace-nowrap text-[12px] font-bold uppercase tracking-wide text-[#0b1a4a]`}>{c.title}</h3>
        <p className="mt-1 line-clamp-3 text-[11.5px] leading-snug text-slate-500">{c.text}</p>
      </div>
      {/* previews are hidden below md and on 1280–1399px, where the cards get too narrow */}
      <div className="hidden shrink-0 origin-right scale-[0.88] md:block xl:max-[1399px]:hidden">{c.mini}</div>
    </motion.div>
  );
}

const trust__cms: { label: [string, string]; icon: IconName }[] = [
  { label: ["Expert BigCommerce", "Developers"], icon: "users" },
  { label: ["Agile & Scalable", "Solutions"], icon: "rocket" },
  { label: ["Transparent &", "Reliable"], icon: "shield" },
  { label: ["Ongoing", "Support"], icon: "headset" },
];

export default function BigCommerceHero() {
  const $t = useCmsText();
  const trust = useCmsData("BigCommerceHero__trust", trust__cms);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 60, damping: 18 });
  const my = useSpring(ry, { stiffness: 60, damping: 18 });



  const left: CardDef[] = [
    { title: $t("BigCommerceHero__t16", "Custom Storefronts"), text: $t("BigCommerceHero__t17", "Unique storefronts that convert and engage."), icon: "store", mini: <MiniStorefront /> },
    { title: $t("BigCommerceHero__t18", "Apps & Integrations"), text: $t("BigCommerceHero__t19", "Connect with the tools your business relies on."), icon: "puzzle", mini: <MiniApps /> },
    { title: $t("BigCommerceHero__t20", "Payments & Checkout"), text: $t("BigCommerceHero__t21", "Secure, seamless, and high-converting checkout experiences."), icon: "briefcase", mini: <MiniPay /> },
    { title: $t("BigCommerceHero__t22", "Mobile Optimized"), text: $t("BigCommerceHero__t23", "Smooth shopping experience across all devices."), icon: "phone", mini: <MiniPhone /> },
  ];
  const right: CardDef[] = [
    { title: $t("BigCommerceHero__t24", "Theme Customization"), text: $t("BigCommerceHero__t25", "Tailored themes built for your brand and goals."), icon: "sliders", mini: <MiniTheme /> },
    { title: $t("BigCommerceHero__t26", "Performance Optimization"), text: $t("BigCommerceHero__t27", "Faster stores. Happier customers. Higher sales."), icon: "chart", mini: <MiniGauge start /> },
    { title: $t("BigCommerceHero__t28", "Security & Reliability"), text: $t("BigCommerceHero__t29", "Enterprise-grade security you can count on."), icon: "shieldCheck", mini: <MiniLock /> },
    { title: $t("BigCommerceHero__t30", "Analytics & Insights"), text: $t("BigCommerceHero__t31", "Data-driven decisions that fuel growth."), icon: "trend", mini: <MiniChart /> },
  ];

  const words1 = [$t("BigCommerceHero__t32", "Build"), $t("BigCommerceHero__t33", "Commerce.")];
  const words2 = [$t("BigCommerceHero__t34", "Scale"), $t("BigCommerceHero__t35", "Success.")];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#f4f7fb] via-[#f6f9fc] to-[#eef4f8] pb-10 pt-12 sm:pt-16"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        rx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        ry.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[48%] h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,190,210,0.18),transparent)]" />

      <Container className="relative">
        <div className="mx-auto max-w-[900px] text-center">
          <Eyebrow variant="line" className="text-[13px] tracking-[0.3em] sm:text-sm">{$t("BigCommerceHero__t36", "BigCommerce Development")}</Eyebrow>
          <h1 className={`text-h1 ${heading.className} mt-5 font-bold tracking-tight text-[#0b1a4a]`}>
            {[words1, words2].map((line, li) => (
              <span key={li} className="block">
                {line.map((w, i) => (
                  <span key={w} className="inline-block overflow-hidden pb-[0.08em] pr-[0.22em] align-bottom last:pr-0">
                    <motion.span
                      className={`inline-block ${li === 1 && i === 1 ? "bg-gradient-to-r from-[#0d8f9a] to-[#14b1b8] bg-clip-text text-transparent" : ""}`}
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 + (li * 2 + i) * 0.1, ease }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease }}
            className="text-body mt-5 text-slate-600"
          >
            {rich($t("BigCommerceHero__t37", "End-to-end BigCommerce development for stores that"))}<br className="hidden sm:block" />{" "}
            <span className="font-semibold text-[#0d8f9a]">{$t("BigCommerceHero__t38", "grow bigger")}</span>, <span className="font-semibold text-[#0d8f9a]">{$t("BigCommerceHero__t39", "sell smarter")}</span>{rich($t("BigCommerceHero__t40", ", and"))}{" "}
            <span className="font-semibold text-[#0d8f9a]">{$t("BigCommerceHero__t41", "scale faster")}</span>.
          </motion.p>
        </div>

        {/* Stage (xl): cards around the developer, dashed connectors into the glowing ring */}
        <div className="relative mx-auto mt-6 max-w-[1300px] xl:-mt-10 xl:aspect-[1560/590] 2xl:max-w-[1480px]">
          {/* ring + connectors */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block" viewBox={`0 0 ${SW} ${SH}`} fill="none" aria-hidden>
            <defs>
              <radialGradient id="bcRingGlow">
                <stop offset="0.75" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="0.97" stopColor="#22d3ee" stopOpacity="0.35" />
                <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={RING.x} cy={RING.y} r={RING.r + 10} fill="url(#bcRingGlow)" />
            <motion.circle
              cx={RING.x} cy={RING.y} r={RING.r}
              stroke="#2bc4d4" strokeOpacity="0.5" strokeWidth="1.5"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.6, ease }}
            />
            <circle cx={RING.x} cy={RING.y} r={RING.r - 18} stroke="#2bc4d4" strokeOpacity="0.25" strokeDasharray="2 8" className="mag-anim" style={{ transformOrigin: `${RING.x}px ${RING.y}px`, animation: "magSpin 40s linear infinite" }} />
            {[...CONN_L, ...CONN_R].map(([x1, y1, x2, y2], i) => {
              const right = i >= 4;
              const mid = right ? x1 - 50 : x1 + 50;
              const d = `M${x1} ${y1} L${mid} ${y1} L${x2} ${y2}`;
              return (
                <g key={i}>
                  <motion.path
                    d={d}
                    stroke="#0d8f9a"
                    strokeOpacity="0.6"
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 + (i % 4) * 0.1 }}
                  />
                  {!reduce && <path d={d} stroke="#5eead4" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 42" style={{ animation: `magFlow 1.8s linear ${i * 0.2}s infinite` }} />}
                  <circle cx={x1} cy={y1} r="5" fill="#fff" stroke="#0d8f9a" strokeWidth="2" />
                  <circle cx={x2} cy={y2} r="4" fill="#22d3ee" />
                  {!reduce && <circle cx={x2} cy={y2} r="4" fill="none" stroke="#22d3ee" className="mag-anim" style={{ transformOrigin: `${x2}px ${y2}px`, animation: `magDotPing 2.4s ease-out ${i * 0.3}s infinite` }} />}
                </g>
              );
            })}
          </svg>

          {/* developer image: 792 units wide at (410, 37) of the stage on xl */}
          <Parallax
            mx={mx}
            my={my}
            depth={-6}
            className="relative mx-auto aspect-[1500/1049] w-full max-w-[560px] xl:absolute xl:left-[26.3%] xl:top-[6.3%] xl:w-[50.8%] xl:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.4, ease }}
              className="absolute inset-0 [mask-image:radial-gradient(ellipse_62%_60%_at_50%_52%,black_70%,transparent_100%)]"
            >
              <Image src={BC.heroDev.src} alt={$t("BigCommerceHero__t42", "BigCommerce developer at work")} fill priority sizes="(min-width:1280px) 660px, 560px" className="object-contain" />
            </motion.div>
            {/* logo on the laptop lid + mug */}
            <svg viewBox="0 0 40 30" className="absolute h-[5.5%] w-[5%]" style={{ left: "43%", top: "62.6%" }} aria-hidden>
              <path d="M4 4l12 11L4 26" stroke="#0b1a4a" strokeWidth="5" fill="none" />
              <path d="M18 4l12 11-12 11" stroke="#0d8f9a" strokeWidth="5" fill="none" />
            </svg>
            <svg viewBox="0 0 40 30" className="absolute h-[3%] w-[3%]" style={{ left: "18.8%", top: "66%" }} aria-hidden>
              <path d="M4 4l12 11L4 26" stroke="#fff" strokeWidth="5" fill="none" />
              <path d="M18 4l12 11-12 11" stroke="#7dd3fc" strokeWidth="5" fill="none" />
            </svg>
            {/* platform wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="absolute inset-x-0 text-center"
              style={{ top: "80.5%" }}
            >
              <p className={`${heading.className} text-[clamp(18px,3.2vw,38px)] font-bold leading-none tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]`}>
                <span className="font-extrabold">{$t("BigCommerceHero__t43", "BIG")}</span>{rich($t("BigCommerceHero__t44", "COMMERCE"))}</p>
              <p className="mt-1 text-[clamp(7px,0.9vw,12px)] font-semibold tracking-[0.3em] text-white/90">{rich($t("BigCommerceHero__t45", "POWERING YOUR COMMERCE"))}</p>
            </motion.div>
            {!reduce && (
              <span aria-hidden className="mag-anim absolute left-1/2 top-[75%] h-[22%] w-[76%] rounded-[50%] border-2 border-cyan-300/70" style={{ animation: "magPing 3s ease-out infinite" }} />
            )}
          </Parallax>

          {/* cards */}
          <div className="mt-8 grid gap-4 pl-5 sm:grid-cols-2 xl:mt-0 xl:block xl:pl-0">
            {left.map((c, i) => (
              <div key={c.title} className="xl:absolute xl:w-[27%] xl:-translate-y-1/2" style={{ left: "0%", top: pct(ROWS_L[i], SH) }}>
                <div className="xl:[transform:perspective(1100px)_rotateY(12deg)]">
                  <FeatureCard c={c} side="l" i={i} />
                </div>
              </div>
            ))}
            {right.map((c, i) => (
              <div key={c.title} className="xl:absolute xl:w-[27%] xl:-translate-y-1/2" style={{ right: "0%", top: pct(ROWS_R[i], SH) }}>
                <div className="xl:[transform:perspective(1100px)_rotateY(-12deg)]">
                  <FeatureCard c={c} side="r" i={i + 4} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
            <Link href={QUOTE_HREF} className="group inline-flex items-center justify-center gap-6 rounded-md bg-[#0d8f9a] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(13,143,154,0.9)] transition hover:-translate-y-0.5 hover:bg-[#0b7c86]">
              {$t("BigCommerceHero__t46", "Start Your Project")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={QUOTE_HREF} className="group inline-flex items-center justify-center gap-6 rounded-md border border-[#0d8f9a]/70 bg-white/70 px-7 py-3.5 text-[15px] font-semibold text-[#0b1a4a] transition hover:-translate-y-0.5 hover:bg-white">
              {$t("BigCommerceHero__t47", "View Our Work")}<ArrowRight className="h-4 w-4 text-[#0d8f9a] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <p className="text-small flex items-center gap-2 text-slate-500">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#0d8f9a]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
            {rich($t("BigCommerceHero__t48", "Let’s build something amazing together."))}</p>
        </motion.div>

        {/* trust bar */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-8 grid max-w-[880px] grid-cols-2 gap-4 rounded-2xl border border-white bg-white/80 px-5 py-5 shadow-[0_20px_44px_-30px_rgba(11,26,74,0.4)] backdrop-blur md:grid-cols-4 md:gap-0"
        >
          {trust.map((t, i) => (
            <motion.li
              key={t.label[0]}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.1 } } }}
              className={`group flex items-center justify-center gap-3 ${i > 0 ? "md:border-l md:border-slate-200" : ""}`}
            >
              <Icon name={t.icon} className="h-7 w-7 text-[#0b1a4a] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#0d8f9a]" />
              <span className="text-[11.5px] font-semibold uppercase leading-tight tracking-wide text-[#0b1a4a]">
                {t.label[0]}
                <br />
                {t.label[1]}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
