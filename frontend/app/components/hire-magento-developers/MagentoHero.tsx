"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, DotGrid, Emblem, EdgeChevrons, Eyebrow, Icon, IMG, display, ease, type IconName } from "../shared/MagentoShared";

const needs: { label: [string, string]; icon: IconName; blurb: string }[] = [
  { label: ["New", "Magento Store"], icon: "store", blurb: "Launch a fast, conversion-ready store built on Magento 2 from day one." },
  { label: ["Custom", "Development"], icon: "code", blurb: "Modules, checkout flows and business logic shaped around how you sell." },
  { label: ["Upgrade /", "Migration"], icon: "upload", blurb: "Move to the latest Magento safely — data, SEO and integrations intact." },
  { label: ["Performance", "Optimization"], icon: "gauge", blurb: "Core Web Vitals, caching and indexing tuned for faster page loads." },
  { label: ["Ongoing", "Support"], icon: "headset", blurb: "Patches, monitoring and quick fixes from a team that knows your store." },
];

const features: { title: [string, string]; text: [string, string]; icon: IconName; side: "l" | "r"; row: 0 | 1 }[] = [
  { title: ["Custom", "Solutions"], text: ["Built around your", "business needs."], icon: "puzzle", side: "l", row: 0 },
  { title: ["High", "Performance"], text: ["Faster stores.", "Better results."], icon: "gauge", side: "l", row: 1 },
  { title: ["Seamless", "Integration"], text: ["Connect with the tools", "you already use."], icon: "link", side: "r", row: 0 },
  { title: ["Secure &", "Reliable"], text: ["Secure, stable and", "built to scale."], icon: "shield", side: "r", row: 1 },
];

const trust = ["Vetted Developers", "Flexible Engagement", "Transparent Process", "On-time Delivery"];

/* Stage geometry (1460×400 units, taken from the design mock).
   Cards are 285 wide at the edges, vertically centred on y=92 / y=256.
   Each connector starts with a dot on the card edge, runs flat, bends with a
   rounded corner and heads to the platform. */
const SW = 1460, SH = 400;
const mirror = (d: string) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${SW - +x} ${y}`);
const leftConnectors = [
  "M302 92 L384 92 C404 92 412 98 426 108 L532 170 C546 178 552 184 560 192",
  "M302 256 L398 256 C414 256 416 238 432 238 L522 238",
];
const connectors = [...leftConnectors, ...leftConnectors.map(mirror)];
/* [x, y, r]: big dots sit on the card edge, small ones mark the bend. */
const connectorDots: [number, number, number][] = [
  [302, 92, 6], [302, 256, 6], [SW - 302, 92, 6], [SW - 302, 256, 6],
  [452, 238, 3.5], [SW - 452, 238, 3.5],
];

function Parallax({ mx, my, depth, children, className = "" }: { mx: MotionValue<number>; my: MotionValue<number>; depth: number; children: React.ReactNode; className?: string }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return <motion.div style={{ x, y }} className={className}>{children}</motion.div>;
}

export default function MagentoHero() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % needs.length), 3000);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const line1 = ["NEED", "MAGENTO", "EXPERTISE?"];
  const line2 = ["LET’S", "BUILD", "IT", "RIGHT."];

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className="relative overflow-hidden bg-gradient-to-b from-[#f4f7fa] via-[#f7f9fb] to-[#eef3f6] pb-10 pt-14 sm:pt-16"
    >
      {/* background decorations */}
      <EdgeChevrons />
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 hidden h-[420px] w-[420px] rotate-45 rounded-[48px] border border-slate-200/70 bg-white/40 lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-28 top-40 hidden h-[460px] w-[460px] rotate-45 rounded-[48px] border border-slate-200/70 bg-white/40 lg:block" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[52%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.18),transparent)] blur-2xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <DotGrid className="bottom-40 left-8 hidden lg:grid" cols={4} rows={3} />

      <Container className="relative">
        {/* Heading block */}
        <div className="mx-auto max-w-[1120px] text-center">
          <Eyebrow className="text-sm sm:text-[15px] tracking-[0.12em]">Hire Magento Developers</Eyebrow>

          <h1 className={`${display.className} mt-6 text-[44px] font-bold uppercase leading-[0.98] tracking-[0.005em] text-[#0c1e3d] sm:text-6xl lg:text-[84px]`}>
            <span className="block">
              {line1.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden pr-[0.22em] align-bottom last:pr-0">
                  <motion.span
                    className="inline-block"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="block">
              {line2.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden pr-[0.22em] align-bottom last:pr-0">
                  <motion.span
                    className="inline-block bg-[linear-gradient(100deg,#0d9488_0%,#0d9488_40%,#5eead4_50%,#0d9488_60%,#0d9488_100%)] bg-[length:200%_100%] bg-clip-text text-transparent [animation:magShine_6s_linear_infinite] motion-reduce:[animation:none]"
                    initial={reduce ? false : { y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.38 + i * 0.08, ease }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
            className="mx-auto mt-6 max-w-[640px] text-base leading-relaxed text-slate-600 sm:text-xl"
          >
            Hire dedicated Magento developers for development, customization, optimization and ongoing support.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="#magento-proposal"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#0c1e3d] px-7 py-4 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_12px_30px_-12px_rgba(12,30,61,0.7)] transition hover:-translate-y-0.5 hover:bg-[#13294f] sm:w-auto"
            >
              Hire Magento Developers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#magento-proposal"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-md border border-[#0d9488]/70 bg-white/70 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-[#0c1e3d] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#0d9488] hover:bg-white sm:w-auto"
            >
              Tell us what you’re building
              <ArrowRight className="h-4 w-4 text-[#0d9488] transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* What do you need help with? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease }}
          className="mx-auto mt-10 max-w-[1000px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-[#0c1e3d]">What do you need help with?</p>
          <div role="tablist" aria-label="What do you need help with?" className="relative mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-[0_18px_40px_-24px_rgba(12,30,61,0.35)] backdrop-blur sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
            {needs.map((n, i) => {
              const on = i === active;
              return (
                <button
                  key={n.label.join(" ")}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(i)}
                  className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-left text-[13px] leading-snug transition-colors sm:text-sm lg:justify-center ${
                    i > 0 ? "lg:border-l lg:border-slate-200/80 lg:rounded-none" : ""
                  } ${i === needs.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  {on && (
                    <motion.span
                      layoutId="magNeed"
                      className="absolute inset-0 rounded-xl bg-[#0d9488]/[0.07] ring-1 ring-[#0d9488]/30"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <motion.span
                    animate={on && !reduce ? { y: [0, -3, 0] } : { y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`relative ${on ? "text-[#0d9488]" : "text-[#0d9488]/80"}`}
                  >
                    <Icon name={n.icon} className="h-8 w-8" />
                  </motion.span>
                  <span className={`relative font-medium ${on ? "text-[#0c1e3d]" : "text-slate-700"}`}>
                    {n.label[0]}
                    <br />
                    {n.label[1]}
                  </span>
                  {on && !reduce && !paused && (
                    <motion.span
                      key={`bar-${active}`}
                      className="absolute bottom-1 left-4 right-4 h-[2px] origin-left rounded bg-[#0d9488]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="relative flex flex-col items-center">
            <span className="-mt-[9px] flex h-[18px] w-[18px] rotate-45 items-center justify-center rounded-[4px] border-b border-r border-slate-200 bg-white" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="mt-2 text-center text-sm text-slate-500"
                aria-live="polite"
              >
                {needs[active].blurb}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Stage: emblem on platform with feature cards (fixed 1460×400 aspect on desktop so lines stay glued to the cards) */}
        <div className="relative mx-auto mt-6 max-w-[1300px] xl:aspect-[1460/400]">
          {/* connectors (desktop) */}
          <svg className="pointer-events-none absolute inset-0 hidden h-full w-full xl:block" viewBox={`0 0 ${SW} ${SH}`} fill="none" aria-hidden>
            <defs>
              <linearGradient id="magConnL" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#0d9488" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="magConnR" x1="1" x2="0" y1="0" y2="0">
                <stop offset="0" stopColor="#0d9488" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.35" />
              </linearGradient>
              <filter id="magGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.4" />
              </filter>
            </defs>
            {connectors.map((d, i) => {
              const grad = i < 2 ? "url(#magConnL)" : "url(#magConnR)";
              return (
                <g key={d}>
                  <motion.path
                    d={d}
                    stroke={grad}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1.3 + (i % 2) * 0.15, ease }}
                  />
                  {!reduce && (
                    <>
                      <path d={d} stroke="#5eead4" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 220" filter="url(#magGlow)" style={{ animation: `magFlow2 2.6s linear ${i * 0.35}s infinite` }} />
                      <path d={d} stroke="#ccfbf1" strokeWidth="2" strokeLinecap="round" strokeDasharray="10 220" style={{ animation: `magFlow2 2.6s linear ${i * 0.35}s infinite` }} />
                    </>
                  )}
                </g>
              );
            })}
            {connectorDots.map(([cx, cy, r], i) => (
              <g key={i}>
                {r > 5 && !reduce && (
                  <circle cx={cx} cy={cy} r={r} fill="none" stroke="#14b8a6" strokeWidth="1.5" className="mag-anim" style={{ transformOrigin: `${cx}px ${cy}px`, animation: `magDotPing 2.4s ease-out ${i * 0.3}s infinite` }} />
                )}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="#0d9488"
                  stroke="#ffffff"
                  strokeWidth={r > 5 ? 2.5 : 0}
                  initial={reduce ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.08, type: "spring", stiffness: 300 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              </g>
            ))}
          </svg>

          {/* emblem + platform: platform 530 wide, centred, sitting on the stage bottom */}
          <div className="relative mx-auto aspect-[530/400] w-[340px] sm:w-[420px] xl:absolute xl:bottom-0 xl:left-[31.85%] xl:h-full xl:w-[36.3%]">
            <span aria-hidden className="absolute bottom-[4%] left-1/2 h-[18%] w-[90%] -translate-x-1/2 rounded-[50%] bg-cyan-300/35 blur-2xl" />
            <Parallax mx={mx} my={my} depth={-5} className="absolute inset-x-0 bottom-0">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease }}>
                <Image src={IMG.platform.src} alt="" width={IMG.platform.w} height={IMG.platform.h} sizes="(min-width:1024px) 480px, 420px" className="h-auto w-full" priority />
              </motion.div>
              {!reduce && (
                <>
                  <span aria-hidden className="mag-anim absolute left-1/2 top-[47%] h-[26%] w-[46%] rounded-[50%] border-2 border-cyan-300/80" style={{ animation: "magPing 2.6s ease-out infinite" }} />
                  <span aria-hidden className="mag-anim absolute left-1/2 top-[47%] h-[26%] w-[46%] rounded-[50%] border border-cyan-200/70" style={{ animation: "magPing 2.6s ease-out 1.3s infinite" }} />
                </>
              )}
            </Parallax>
            {/* emblem: 200/530 of the platform width, standing in the glowing ring */}
            <Parallax mx={mx} my={my} depth={9} className="absolute bottom-[30%] left-1/2 w-[38%] -translate-x-1/2">
              <motion.div initial={{ opacity: 0, scale: 0.6, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 1.05, ease }}>
                <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}>
                  <Emblem priority sizes="200px" className="w-full" />
                </motion.div>
              </motion.div>
              {/* soft shadow that shrinks as the emblem floats up */}
              <motion.span
                aria-hidden
                className="absolute -bottom-[6%] left-1/2 h-[10%] w-[70%] -translate-x-1/2 rounded-[50%] bg-orange-500/25 blur-md"
                animate={reduce ? undefined : { scaleX: [1, 0.8, 1], opacity: [0.7, 0.4, 0.7] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </Parallax>
          </div>

          {/* feature cards — centred on the connector rows (y 92 / 256 of 400) */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:mt-0 xl:block">
            {features.map((f, i) => (
              <div
                key={f.title.join(" ")}
                className={`xl:absolute xl:w-[19.52%] xl:-translate-y-1/2 ${f.side === "l" ? "xl:left-0" : "xl:right-0"} ${f.row === 0 ? "xl:top-[23%]" : "xl:top-[64%]"}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: f.side === "l" ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 + i * 0.12, ease }}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-center gap-4 rounded-2xl border border-white bg-white/90 px-5 py-5 shadow-[0_18px_40px_-24px_rgba(12,30,61,0.45)] backdrop-blur transition-shadow hover:shadow-[0_24px_46px_-22px_rgba(13,148,136,0.5)] xl:px-6 xl:py-6"
                >
                  <span className="shrink-0 text-[#0d9488] transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <Icon name={f.icon} className="h-10 w-10 xl:h-11 xl:w-11" />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold uppercase leading-tight tracking-wide text-[#0c1e3d] xl:text-sm">
                      {f.title[0]}
                      <br />
                      {f.title[1]}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-slate-500 xl:text-[13px]">
                      {f.text[0]}
                      <br />
                      {f.text[1]}
                    </span>
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>


        {/* Trust strip */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto mt-8 flex max-w-[860px] flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-slate-200/70 pt-6 text-sm text-slate-600"
        >
          {trust.map((t, i) => (
            <motion.li
              key={t}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.1 } } }}
              className={`flex items-center gap-2 ${i > 0 ? "sm:border-l sm:border-slate-200 sm:pl-6" : ""}`}
            >
              <Icon name="check" className="h-5 w-5 text-[#0d9488]" />
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
