"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Newsreader } from "next/font/google";
import Container from "./Container";

const GlassTile3D = dynamic(() => import("./UiUxGlassTile3D"), {
  ssr: false,
  loading: () => <div className="h-[220px] w-[260px] lg:h-[270px] lg:w-[320px]" />,
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const TEAL = "#0d9488";
const NAVY = "#0c1e3d";

const steps = [
  {
    title: "Understand",
    sub: "User & Business",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Define",
    sub: "Structure & Flow",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="5" y="5" width="14" height="14" rx="1.5" />
        <circle cx="5" cy="5" r="1.8" fill="currentColor" />
        <circle cx="19" cy="5" r="1.8" fill="currentColor" />
        <circle cx="5" cy="19" r="1.8" fill="currentColor" />
        <circle cx="19" cy="19" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Design",
    sub: "Interface & Interaction",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21l3.5-1 12-12a2.1 2.1 0 0 0-3-3l-12 12L3 21z" />
        <path d="M14 6l3 3" />
      </svg>
    ),
  },
  {
    title: "Deliver",
    sub: "Impact & Value",
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M12 3L3 8l9 5 9-5-9-5z" />
        <path d="M3 13l9 5 9-5" />
        <path d="M3 17.5l9 5 9-5" opacity="0.55" />
      </svg>
    ),
  },
];

const swatches = [
  { color: NAVY, label: "Navy" },
  { color: TEAL, label: "Teal" },
  { color: "#cbd5e1", label: "Slate" },
  { color: "#ffffff", label: "White" },
];

const slides = [
  "/uiux-architecture.jpg",
  "/Futuristic Lavender Archway Atrium.webp",
  "/Luminous Icy Blue Abstract Waves.webp",
];

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.8, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function RevealLine({
  words,
  startIndex = 0,
  className = "",
}: {
  words: string[];
  startIndex?: number;
  className?: string;
}) {
  return (
    <span className={`block ${className}`}>
      {words.map((w, i) => (
        <span key={w + i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] pr-[0.22em] last:pr-0">
          <motion.span
            className="inline-block will-change-transform"
            variants={wordVariants}
            custom={startIndex + i}
            initial="hidden"
            animate="show"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Mouse-parallax layer: shifts by `depth` px relative to pointer position (-0.5..0.5). */
function Parallax({
  mx,
  my,
  depth,
  children,
  className = "",
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  children: React.ReactNode;
  className?: string;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function UiUxHero() {
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [slide, setSlide] = useState(0);
  const [swatch, setSwatch] = useState(1);

  // pointer parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const my = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // auto-cycle phone slides, colour swatches and process steps
  useEffect(() => {
    if (reduce) return;
    const a = setInterval(() => setSlide((s) => (s + 1) % slides.length), 3400);
    const b = setInterval(() => setSwatch((s) => (s + 1) % swatches.length), 2200);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setActiveStep((s) => (s + 1) % steps.length), 2800);
    return () => clearTimeout(t);
  }, [activeStep, reduce]);

  const float = (dur: number, amp: number, delay = 0) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -amp, 0] },
          transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const, delay },
        };

  return (
    <section className="relative w-full overflow-hidden bg-[#e9eff7] pt-9 sm:pt-12 pb-8 lg:min-h-[calc(100svh-122px)] flex flex-col justify-between">
      {/* ================= BACKGROUND ================= */}
      {/* Background artwork */}
      <Image
        src="/ui-ux-hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center"
      />
      {/* Teal ambient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[26%] h-72 w-72 rounded-full bg-teal-200/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-[34%] h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, -26, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Perspective floor grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] opacity-50 [mask-image:linear-gradient(to_bottom,transparent_0%,black_75%)]"
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="uiux-hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(13,148,136,0.13)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#uiux-hero-grid)" />
        </svg>
      </div>

      <Container className="relative z-10">
        {/* ================= STAGE ================= */}
        <div className="relative mx-auto w-full max-w-[1180px] lg:h-[580px] lg:px-0" onMouseMove={onMove} onMouseLeave={onLeave}>
          {/* ---- Eyebrow + headline + copy + CTAs ---- */}
          <div className="relative z-20 mx-auto flex max-w-[640px] flex-col items-center text-center">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="h-px w-8 origin-right bg-teal-600/50 sm:w-14"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[#0d9488] sm:text-[11.5px]">
                UI / UX Design
              </span>
              <motion.span
                className="h-px w-8 origin-left bg-teal-600/50 sm:w-14"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
            <motion.span
              className="mt-1.5 h-1 w-1 rounded-full bg-teal-500 shadow-[0_0_10px_#14b8a6]"
              animate={reduce ? undefined : { opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />

            <h1
              className={`${serif.className} mt-4 text-[40px] font-medium leading-[1.04] tracking-[-0.02em] text-[#0c1e3d] sm:text-[56px] lg:text-[62px]`}
              aria-label="Crafting Experiences. Creating Impact."
            >
              <RevealLine words={["Crafting", "Experiences."]} />
              <RevealLine
                words={["Creating", "Impact."]}
                startIndex={2}
                className="italic [&_span>span]:bg-[linear-gradient(100deg,#0f766e_20%,#2dd4bf_45%,#0d9488_70%)] [&_span>span]:bg-[length:220%_100%] [&_span>span]:bg-clip-text [&_span>span]:text-transparent [&_span>span]:animate-[uiuxShine_6s_linear_infinite] [&_span>span]:pr-[0.06em]"
              />
            </h1>

            <motion.p
              className="mt-4 max-w-[480px] text-[14.5px] leading-relaxed text-slate-600 sm:text-[15.5px]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              We design digital experiences that are intuitive, meaningful and built to deliver{" "}
              <strong className="font-semibold text-[#0c1e3d]">real business results.</strong>
            </motion.p>

            <motion.div
              className="mt-6 flex flex-wrap items-center justify-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#0c1e3d] px-7 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_-10px_rgba(12,30,61,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-10px_rgba(12,30,61,0.65)] active:scale-95"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Start a Project</span>
                <svg viewBox="0 0 24 24" className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link
                href="#work"
                className="inline-flex items-center rounded-full border border-slate-200/90 bg-white/70 px-7 py-3.5 text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#0c1e3d] shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white hover:shadow-md active:scale-95"
              >
                Explore Our Work
              </Link>
            </motion.div>
          </div>

          {/* ---- Connecting spline (desktop only) ---- */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full lg:block"
            viewBox="0 0 1000 580"
            preserveAspectRatio="none"
            fill="none"
          >
            <defs>
              <linearGradient id="uiuxSpline" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={TEAL} stopOpacity="0.15" />
                <stop offset="45%" stopColor={TEAL} stopOpacity="0.95" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 215 372 C 300 480, 400 478, 500 425 S 700 392, 790 318"
              stroke="url(#uiuxSpline)"
              strokeWidth="1.6"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 0.6, ease: "easeInOut" }}
            />
            {/* energy flowing along the line */}
            {!reduce && (
              <path
                d="M 215 372 C 300 480, 400 478, 500 425 S 700 392, 790 318"
                stroke="#5eead4"
                strokeWidth="2.4"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="14 220"
                className="animate-[uiuxFlow_4.5s_linear_infinite]"
                style={{ filter: "drop-shadow(0 0 5px rgba(45,212,191,0.9))" }}
              />
            )}
          </svg>

          {/* connection nodes */}
          {[
            { left: "21.5%", top: "64%" },
            { left: "79%", top: "55%" },
          ].map((n, i) => (
            <span key={i} className="pointer-events-none absolute z-[2] hidden lg:block" style={{ left: n.left, top: n.top }}>
              <span className="relative block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-600">
                {!reduce && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-teal-500/60" style={{ animationDelay: `${i * 0.9}s` }} />
                )}
                <span className="absolute -inset-1.5 rounded-full border border-teal-500/40" />
              </span>
            </span>
          ))}

          {/* ---- Wireframe floor sheets ---- */}
          <div className="pointer-events-none absolute bottom-[10px] left-1/2 z-0 hidden h-[200px] w-[640px] -translate-x-1/2 lg:block [transform:translateX(-50%)_perspective(900px)_rotateX(58deg)]">
            <div className="grid h-full w-full grid-cols-3 gap-3 rounded-2xl border border-teal-300/30 bg-white/30 p-3 backdrop-blur-[2px]">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="relative flex flex-col justify-between rounded-lg border border-dashed border-teal-400/45 p-2"
                  animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
                >
                  <span className="h-1.5 w-10 rounded bg-teal-400/30" />
                  <span className="relative block h-12 rounded border border-teal-400/35 bg-teal-300/10">
                    {i === 0 && (
                      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 50">
                        <path d="M0 0L100 50M100 0L0 50" stroke="rgba(13,148,136,0.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                      </svg>
                    )}
                    {i === 1 && <span className="absolute inset-2 grid grid-cols-2 gap-1.5"><span className="rounded-sm border border-teal-400/40" /><span className="rounded-sm border border-teal-400/40" /></span>}
                    {i === 2 && <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/40" />}
                  </span>
                  <span className="h-1.5 w-14 rounded bg-teal-400/30" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ---- Side + centre objects ---- */}
          <div className="mt-10 flex flex-col items-center gap-10 sm:flex-row sm:items-end sm:justify-center sm:gap-8 lg:mt-0 lg:contents">
            {/* LEFT: design-system glass card */}
            <div className="relative order-2 sm:order-1 lg:absolute lg:-left-[1%] lg:top-[58px] lg:z-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Parallax mx={mx} my={my} depth={-14}>
                  {/* floating tool badges */}
                  <motion.span
                    className="absolute -left-5 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white/85 text-teal-600 shadow-[0_10px_24px_-6px_rgba(15,35,80,0.2)] backdrop-blur-md sm:-left-9"
                    {...float(4, 7)}
                  >
                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                      <path d="M8 3h8l2 3v15l-6-3-6 3V6l2-3z" />
                      <path d="M9 9h6" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                  <motion.span
                    className="absolute -left-4 top-[88px] z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-white/85 text-teal-500 shadow-[0_10px_24px_-6px_rgba(15,35,80,0.2)] backdrop-blur-md sm:-left-7"
                    {...float(4.6, 6, 0.6)}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
                      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
                    </svg>
                  </motion.span>

                  <motion.div
                    className="flex min-h-[372px] w-[236px] flex-col justify-between rounded-[30px] border border-white/90 bg-gradient-to-br from-white/75 via-white/50 to-white/30 px-5 py-6 text-left shadow-[0_40px_80px_-26px_rgba(15,35,80,0.3),inset_0_1px_0_rgba(255,255,255,1),inset_0_0_30px_rgba(255,255,255,0.5)] backdrop-blur-xl"
                    style={{ transformPerspective: 900, rotateX: 8, rotateY: 22, rotate: -3, skewX: 5 }}
                    {...float(6.5, 9)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <motion.span
                          className={`${serif.className} block text-[48px] font-medium leading-none`}
                          animate={{ color: swatches[swatch].color === "#ffffff" ? NAVY : swatches[swatch].color }}
                          transition={{ duration: 0.6 }}
                        >
                          Aa
                        </motion.span>
                        <div className="mt-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Typography</div>
                        <div className="text-[12px] font-semibold text-[#0c1e3d]">DM Serif Display</div>
                      </div>
                    </div>

                    <div className="mt-3.5 border-t border-slate-200/70 pt-3">
                      <div className="text-[13px] font-bold text-[#0c1e3d]">Inter</div>
                      <div className="text-[10.5px] font-medium text-slate-400">Regular / Medium / Semibold</div>
                    </div>

                    <div className="mt-3.5 border-t border-slate-200/70 pt-3">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Colors</div>
                      <div className="mt-2 flex items-center gap-2.5">
                        {swatches.map((s, i) => (
                          <motion.button
                            key={s.label}
                            type="button"
                            aria-label={s.label}
                            onClick={() => setSwatch(i)}
                            className="relative h-5 w-5 cursor-pointer rounded-full border border-slate-200/80 shadow-sm"
                            style={{ background: s.color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: swatch === i ? 1.25 : 1 }}
                            transition={{ type: "spring", stiffness: 380, damping: 16, delay: swatch === i ? 0 : 0 }}
                            whileHover={{ scale: 1.3 }}
                          >
                            {swatch === i && (
                              <motion.span
                                layoutId="uiux-swatch-ring"
                                className="absolute -inset-[5px] rounded-full border-[1.5px] border-teal-500/70"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3.5 flex items-center gap-3 border-t border-slate-200/70 pt-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-teal-50/80 text-[#0d9488]">
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
                          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
                          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
                          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
                          <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
                        </svg>
                      </span>
                      <div>
                        <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">Components</div>
                        <div className="text-[10.5px] font-medium text-slate-600">Button / Input / Card</div>
                      </div>
                    </div>
                  </motion.div>
                </Parallax>
              </motion.div>
            </div>

            {/* CENTRE: glowing pen-tool tile */}
            <div className="relative order-1 sm:order-2 lg:absolute lg:left-1/2 lg:top-[300px] lg:z-10 lg:-translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Parallax mx={mx} my={my} depth={10}>
                  <GlassTile3D mx={mx} my={my} reduce={!!reduce} className="relative h-[220px] w-[260px] lg:h-[270px] lg:w-[320px]" />
                </Parallax>
              </motion.div>
            </div>

            {/* RIGHT: phone mockup */}
            <div className="relative order-3 lg:absolute lg:right-[1%] lg:top-[112px] lg:z-10">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Parallax mx={mx} my={my} depth={-20}>
                  <motion.div
                    className="w-[214px] rounded-[38px] border border-white/90 bg-gradient-to-b from-white/70 to-slate-200/50 p-[8px] shadow-[0_40px_80px_-26px_rgba(15,35,80,0.32)] backdrop-blur-xl"
                    style={{ transformPerspective: 900, rotate: 7, rotateX: 6, rotateY: -22 }}
                    {...float(6.5, 9, 0.4)}
                  >
                    <div className="flex h-[372px] flex-col rounded-[30px] border border-slate-100 bg-white/95 p-4">
                      <div className="flex items-center justify-between">
                        <span className="flex w-4 flex-col gap-[3px]">
                          <span className="h-[1.5px] w-full rounded-full bg-slate-700" />
                          <span className="h-[1.5px] w-2.5 rounded-full bg-slate-700" />
                        </span>
                        <span className="grid grid-cols-3 gap-[2px]">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <span key={i} className="h-[3px] w-[3px] rounded-full bg-slate-400" />
                          ))}
                        </span>
                      </div>

                      <h3 className={`${serif.className} mt-3 text-[23px] font-medium leading-[1.1] text-[#0c1e3d]`}>
                        Design
                        <br />
                        that <span className="italic text-[#0d9488]">connects.</span>
                      </h3>

                      <div className="relative mt-3 flex-1 overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.div
                            key={slide}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.12, x: reduce ? 0 : 24 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 1.02, x: reduce ? 0 : -24 }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <Image
                              src={slides[slide]}
                              alt="Featured design work"
                              fill
                              sizes="220px"
                              className="object-cover"
                              priority={slide === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      <div className="mt-3.5 flex items-center justify-between">
                        <motion.button
                          type="button"
                          aria-label="Next slide"
                          onClick={() => setSlide((s) => (s + 1) % slides.length)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#0d9488] text-white shadow-md shadow-teal-500/30"
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </motion.button>
                        <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-slate-400">
                          <span className="tabular-nums text-[#0c1e3d]">0{slide + 1}</span>
                          <span className="relative h-[2px] w-10 overflow-hidden rounded-full bg-slate-200">
                            <motion.span
                              className="absolute inset-y-0 left-0 rounded-full bg-[#0d9488]"
                              animate={{ width: `${((slide + 1) / slides.length) * 100}%` }}
                              transition={{ duration: 0.7, ease: "easeInOut" }}
                            />
                          </span>
                          <span className="tabular-nums">0{slides.length}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Parallax>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ================= PROCESS BAR ================= */}
        <motion.div
          className="mt-10 w-full border-t border-slate-200/80 pt-5 lg:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
        >
          <div className="grid grid-cols-2 items-center gap-4 md:grid-cols-4 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
            {steps.map((st, idx) => {
              const active = activeStep === idx;
              return (
                <button
                  key={st.title}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-xl p-2 text-left transition-colors ${
                    active ? "bg-white/70 shadow-sm" : "hover:bg-white/40"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      active
                        ? "scale-105 bg-[#0d9488] text-white shadow-md shadow-teal-500/25"
                        : "border border-slate-200 bg-white/80 text-slate-500 group-hover:text-teal-600"
                    }`}
                  >
                    {st.icon}
                  </span>
                  <span>
                    <span className="block text-[13px] font-semibold text-[#0c1e3d]">{st.title}</span>
                    <span className="block text-[11px] text-slate-500">{st.sub}</span>
                  </span>
                  {active && !reduce && (
                    <motion.span
                      key={`bar-${activeStep}`}
                      className="absolute inset-x-3 bottom-0 h-[2px] origin-left rounded-full bg-teal-500/70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.8, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}

            <div className="col-span-2 border-slate-200 md:col-span-4 lg:col-span-1 lg:border-l lg:pl-6">
              <div className="text-[12px] text-slate-500">Every detail has a purpose.</div>
              <div className="text-[12.5px] font-bold text-[#0d9488]">Every experience creates value.</div>
            </div>
          </div>
        </motion.div>
      </Container>

      <style>{`
        @keyframes uiuxShine { 0% { background-position: 0% 0; } 100% { background-position: -220% 0; } }
        @keyframes uiuxFlow { from { stroke-dashoffset: 234; } to { stroke-dashoffset: 0; } }
        @keyframes uiuxSpin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [class*="uiuxShine"], [class*="uiuxFlow"], [class*="uiuxSpin"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
