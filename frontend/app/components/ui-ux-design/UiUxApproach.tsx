"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Newsreader, Caveat } from "next/font/google";
import Container from "../shared/Container";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

const NAVY = "#0c1e3d";
const TEAL = "#0d9488";

const WAVE =
  "M 0 98 C 40 94, 60 68, 100 68 C 140 68, 160 86, 200 86 C 240 86, 260 68, 300 68 C 340 68, 360 86, 400 86 C 440 86, 460 68, 500 68 C 540 68, 560 86, 600 86 C 640 86, 660 68, 700 68 C 740 68, 760 86, 800 86 C 840 86, 860 68, 900 68 C 940 68, 970 76, 1000 80";

const iconCls = "h-[26px] w-[26px]";

const processSteps = [
  {
    num: "01",
    title: "Discover",
    desc: "We research users, markets and competitors to uncover opportunities that matter.",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke={NAVY} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M7.8 8.6a3.4 3.4 0 0 1 2.6-1.6" stroke={TEAL} strokeWidth="1.5" />
        <line x1="20" y1="20" x2="15.3" y2="15.3" strokeWidth="2.3" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Define",
    desc: "We structure information, map user flows and define clear experience strategies.",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="6" height="6" rx="1.2" />
        <rect x="14.5" y="14.5" width="6" height="6" rx="1.2" />
        <rect x="14.5" y="3.5" width="6" height="5" rx="1.2" stroke={TEAL} />
        <path d="M6.5 9.5v5a2 2 0 0 0 2 2h6" />
        <path d="M9.5 6.5h5" stroke={TEAL} />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Design",
    desc: "We craft intuitive interfaces that are functional, beautiful and on-brand.",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
        <circle cx="3.5" cy="3.5" r="1.6" fill={TEAL} stroke="none" />
        <circle cx="20.5" cy="20.5" r="1.6" fill={TEAL} stroke="none" />
        <path d="M15.6 8.4l-6.6 6.6v2.5h2.5l6.6-6.6a1.77 1.77 0 0 0-2.5-2.5z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Prototype",
    desc: "We build interactive prototypes to test ideas, validate flows and refine experiences.",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 7l10 10-4.2 1 2.6 4.8-2 1.1-2.6-4.8L8 21.5V7z" transform="translate(-1 -3) scale(0.95)" />
        <g stroke={TEAL} strokeWidth="1.8">
          <line x1="4.5" y1="2.5" x2="6" y2="4.2" />
          <line x1="2" y1="7" x2="4" y2="7.4" />
          <line x1="8.5" y1="1.5" x2="8.6" y2="3.6" />
        </g>
      </svg>
    ),
  },
  {
    num: "05",
    title: "Deliver",
    desc: "We hand off production-ready designs and ensure a smooth implementation.",
    icon: (
      <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke={TEAL} />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <circle cx="15.5" cy="8.5" r="1.5" fill={TEAL} stroke="none" />
      </svg>
    ),
  },
];

export default function UiUxApproach() {
  const reduce = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stripRef, { margin: "-15% 0px -15% 0px" });
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // walk a highlight through the 5 steps while the strip is on screen
  useEffect(() => {
    if (reduce || !inView || hovered !== null) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % processSteps.length), 2200);
    return () => clearTimeout(t);
  }, [active, inView, hovered, reduce]);

  const current = hovered ?? active;

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#eef3f9_0%,#f7fafd_22%,#ffffff_60%,#f8fafc_100%)] py-12 sm:py-16">
      {/* ---------------- BACKGROUND ---------------- */}
      <Container className="relative z-10 max-w-7xl">
        {/* ---------------- HEADER ---------------- */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span className="h-px w-8 origin-right bg-teal-600/45 sm:w-12" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0d9488] sm:text-[12px]">Our Approach</span>
            <motion.span className="h-px w-8 origin-left bg-teal-600/45 sm:w-12" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} />
          </motion.div>

          <h2 className={`${serif.className} mt-6 text-[40px] font-medium leading-[1.06] tracking-[-0.02em] text-[#0c1e3d] sm:text-[56px] lg:text-[64px]`}>
            {["From insight", "to impact."].map((line, li) => (
              <span key={line} className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${li === 1 ? "italic text-[#0d9488]" : ""}`}>
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 + li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-[14.5px] leading-relaxed text-slate-600 sm:text-[16px]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We follow a human-centered design process to solve the right problems,
            <br className="hidden sm:inline" /> create meaningful experiences and deliver measurable results.
          </motion.p>
        </div>

        {/* ---------------- 5-STEP FLOW ---------------- */}
        <div className="relative mt-10 sm:mt-14">
          {/* decorations tied to the strip */}
          <div aria-hidden className="pointer-events-none absolute -top-10 left-1 z-0 hidden opacity-60 lg:block">
            <div className="grid grid-cols-4 gap-2.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full bg-[#0d9488]/50"
                  animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
                />
              ))}
            </div>
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[calc(10%-160px)] top-[-124px] z-0 hidden h-[320px] w-[320px] rounded-full border border-teal-200/40 bg-[radial-gradient(circle,rgba(204,251,241,0.3)_0%,rgba(255,255,255,0)_70%)] lg:block"
            animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div aria-hidden className="pointer-events-none absolute right-[-2%] top-8 z-0 hidden opacity-60 lg:block">
            <div className="grid grid-cols-3 gap-2.5">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="h-1 w-1 rounded-full bg-[#0d9488]/50"
                  animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>

        <div className="scrollbar-none relative overflow-x-auto px-1 pb-4 pt-10">
          <div ref={stripRef} className="relative min-w-[920px] lg:min-w-0">
            {/* Wave: sits behind the badges, passes through every badge centre */}
            <svg
              viewBox="0 0 1000 100"
              className="pointer-events-none absolute left-0 top-0 z-0 h-[85px] w-full overflow-visible"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="apprWave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={TEAL} stopOpacity="0.15" />
                  <stop offset="18%" stopColor={TEAL} stopOpacity="0.9" />
                  <stop offset="85%" stopColor={TEAL} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={TEAL} stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <motion.path
                d={WAVE}
                stroke="url(#apprWave)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {!reduce && (
                <path
                  d={WAVE}
                  stroke="#5eead4"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="70 3200"
                  className="animate-[apprFlow_5.5s_linear_infinite]"
                  style={{ filter: "drop-shadow(0 0 5px rgba(45,212,191,0.95))" }}
                />
              )}
            </svg>

            <div className="relative z-10 grid w-full grid-cols-5">
              {processSteps.map((step, idx) => {
                const on = current === idx;
                return (
                  <motion.div
                    key={step.num}
                    className="group flex cursor-pointer flex-col items-center px-2 text-center"
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 + idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Row height 72 → badge centre sits at y=36 (wave crest) */}
                    <div className="relative flex h-[72px] w-full items-center justify-center">
                      <motion.span
                        className="absolute right-[76%] select-none text-[32px] font-light leading-none tracking-tight sm:text-[38px]"
                        animate={{ color: on ? "#14b8a6" : "#cbd5e1", x: on ? -4 : 0 }}
                        transition={{ duration: 0.45 }}
                      >
                        {step.num}
                      </motion.span>

                      <div className="relative">
                        {/* halo pulse on the active badge */}
                        {on && !reduce && (
                          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-teal-400/25" />
                        )}
                        <motion.div
                          className="relative flex h-[62px] w-[62px] items-center justify-center rounded-full border bg-white"
                          animate={{
                            scale: on ? 1.08 : 1,
                            y: on ? -3 : 0,
                            borderColor: on ? "rgba(94,234,212,0.9)" : "rgba(241,245,249,1)",
                            boxShadow: on
                              ? "0 18px 34px -10px rgba(13,148,136,0.35), 0 0 0 5px rgba(204,251,241,0.55)"
                              : "0 12px 26px -8px rgba(15,35,80,0.14), 0 4px 10px -2px rgba(15,35,80,0.06)",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          whileHover={{ scale: 1.12 }}
                        >
                          <motion.span
                            className="flex"
                            animate={on && !reduce ? { rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] } : { rotate: 0, scale: 1 }}
                            transition={{ duration: 0.8 }}
                          >
                            {step.icon}
                          </motion.span>
                        </motion.div>
                      </div>
                    </div>

                    <span className="relative mt-5 flex h-2 w-2 items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0d9488]" />
                      {on && !reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-teal-500/60" />}
                    </span>

                    <h3 className={`mt-2.5 text-[16px] font-semibold transition-colors duration-300 sm:text-[17px] ${on ? "text-[#0d9488]" : "text-[#0c1e3d]"}`}>
                      {step.title}
                    </h3>

                    <motion.span
                      className="mt-2 h-[2px] rounded-full bg-[#0d9488]/60"
                      animate={{ width: on ? 32 : 20 }}
                      transition={{ duration: 0.4 }}
                    />

                    <p className="mx-auto mt-3 max-w-[200px] text-[12.5px] leading-relaxed text-slate-500 sm:text-[13px]">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        </div>

        {/* ---------------- FOOTER CALLOUT ---------------- */}
        <motion.div
          className="mt-10 text-center sm:mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-[14px] font-semibold tracking-wide text-[#0c1e3d] sm:text-[15px]">
            Great process. Great experiences.
          </div>
          <div className="relative mx-auto mt-1 inline-block">
            <motion.div
              className={`${caveat.className} -rotate-2 select-none pr-2 text-[40px] leading-none text-[#0d9488] sm:text-[48px]`}
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, delay: 0.7, ease: "easeInOut" }}
            >
              Real impact.
            </motion.div>
            <svg viewBox="0 0 200 16" className="absolute -bottom-2 left-1/2 h-4 w-[88%] -translate-x-1/2 overflow-visible" fill="none" aria-hidden>
              <motion.path
                d="M 4 11 C 50 4, 120 14, 196 5"
                stroke={TEAL}
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 1.9, ease: "easeOut" }}
              />
            </svg>
          </div>
        </motion.div>
      </Container>

      <style>{`
        @keyframes apprFlow { from { stroke-dashoffset: 70; } to { stroke-dashoffset: -3200; } }
      `}</style>
    </section>
  );
}
