"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { animate, motion, useInView, useMotionValueEvent, useMotionValue, type Variants } from "framer-motion";
import Container from "./Container";

const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#1b8a80";
const GOLD = "#c29245";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const svgBase = (color: string, size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const FEATURES = [
  {
    title: "Strategy-First",
    text: "Every decision aligned with your goals.",
    icon: (
      <svg {...svgBase(TEAL, 20)}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12 L19 5 M16 5 H19 V8" />
      </svg>
    ),
  },
  {
    title: "Built to Perform",
    text: "Fast, optimized and conversion-focused.",
    icon: (
      <svg {...svgBase(GOLD, 20)}>
        <path d="M13 3 L5 14 H11 L10 21 L19 9 H13 Z" />
      </svg>
    ),
  },
  {
    title: "Reliable Partner",
    text: "Clear communication and on-time delivery.",
    icon: (
      <svg {...svgBase(TEAL, 20)}>
        <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" />
      </svg>
    ),
  },
  {
    title: "Results That Grow",
    text: "Websites that generate leads and revenue.",
    icon: (
      <svg {...svgBase(GOLD, 20)}>
        <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
        <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
      </svg>
    ),
  },
];

const BENEFITS = [
  "Custom strategy tailored to your business",
  "Actionable insights you can use immediately",
  "No pressure. No sales pitch.",
  "100% Free. 100% Valuable.",
];

const stagger = (delayChildren = 0.2, staggerChildren = 0.1): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

/* ---------------- Proof strip ---------------- */

// Counts from 0 to `to` once `start` is true; supports decimals (e.g. 4.9)
function CountUp({ to, start, decimals = 0, duration = 1.6 }: { to: number; start: boolean; decimals?: number; duration?: number }) {
  const value = useMotionValue(0);
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useMotionValueEvent(value, "change", (v) => setDisplay(v.toFixed(decimals)));

  useEffect(() => {
    if (!start) return;
    const controls = animate(value, to, { duration, ease: EASE });
    return () => controls.stop();
  }, [start, to, duration, value]);

  return <span className="tabular-nums">{display}</span>;
}

const PROOF_STATS = [
  {
    to: 150,
    suffix: "+",
    label: "Happy Clients",
    icon: (
      <svg {...svgBase(DEEP_TEAL, 22)}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20 C2.5 15.5 5.5 13.5 9 13.5 C12.5 13.5 15.5 15.5 15.5 20" />
        <path d="M15.5 4.8 C17.3 5.3 18.5 6.9 18.5 8.5 C18.5 10.1 17.3 11.7 15.5 12.2 M17.5 14 C20 14.8 21.5 16.8 21.5 20" />
      </svg>
    ),
  },
  {
    to: 5,
    suffix: "+",
    label: "Countries Served",
    icon: (
      <svg {...svgBase(DEEP_TEAL, 22)}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12 H21 M12 3 C14.5 5.5 15.8 8.6 15.8 12 C15.8 15.4 14.5 18.5 12 21 C9.5 18.5 8.2 15.4 8.2 12 C8.2 8.6 9.5 5.5 12 3 Z" />
      </svg>
    ),
  },
  {
    to: 3,
    suffix: "X",
    label: "Average Growth\nin Leads",
    icon: (
      <svg {...svgBase(DEEP_TEAL, 22)}>
        <path d="M4 20 V15 M9 20 V12 M14 20 V14 M19 20 V9" />
        <path d="M4 11 L9 7 L13 9 L20 4 M16.5 4 H20 V7.5" />
      </svg>
    ),
  },
];

function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <motion.div
      ref={ref}
      variants={stagger(0.1, 0.1)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="relative mt-14 lg:mt-16 bg-white/80 backdrop-blur-sm rounded-[24px] border border-white shadow-[0_25px_60px_-30px_rgba(60,40,20,0.3)] px-6 py-8 lg:px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,0.75fr))_minmax(0,1fr)_minmax(0,1.4fr)] gap-8 xl:gap-0 items-center overflow-hidden"
    >
      {/* decorative contour lines */}
      <svg className="pointer-events-none absolute -right-6 -bottom-10 w-48 h-48 opacity-40" viewBox="0 0 200 200" fill="none" aria-hidden>
        {[30, 50, 70, 90, 110].map((r) => (
          <path key={r} d={`M${200 - r} 200 C${200 - r} ${200 - r * 0.9} ${200 - r * 0.2} ${200 - r} 200 ${200 - r}`} stroke="#e4d6c2" strokeWidth="1" />
        ))}
      </svg>

      {/* Testimonial */}
      <motion.div variants={item} className="xl:pr-8 md:col-span-2 xl:col-span-1">
        <div className="flex gap-4 mb-5">
          <span className={`${caveat.className} shrink-0 text-6xl leading-[0.6]`} style={{ color: GOLD }}>&ldquo;</span>
          <p className="text-[13px] text-slate-700 leading-relaxed">
            ProManage transformed our online presence completely. Our leads increased 3X within just 3 months of the new website launch.
          </p>
        </div>
        <div className="flex items-center gap-3 pl-10">
          <span className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shadow-md">
            <Image src="/image1.jpg" alt="Ravi Sharma" fill sizes="44px" className="object-cover" />
          </span>
          <div>
            <p className="text-[13px] font-bold" style={{ color: NAVY }}>Ravi Sharma</p>
            <p className="text-[11px] text-slate-500">Founder, WellnessKart</p>
          </div>
        </div>
      </motion.div>

      {/* Counters */}
      {PROOF_STATS.map((stat) => (
        <motion.div
          key={stat.label}
          variants={item}
          className="flex flex-col items-center text-center xl:border-l border-[#ece4d8] xl:px-3"
        >
          <motion.span
            whileHover={{ scale: 1.08 }}
            className="w-14 h-14 rounded-full bg-[#EAF1EF] flex items-center justify-center mb-3"
          >
            {stat.icon}
          </motion.span>
          <p className="text-3xl font-bold mb-1" style={{ color: NAVY }}>
            <CountUp to={stat.to} start={inView} />
            {stat.suffix}
          </p>
          <p className="text-[12px] text-slate-600 leading-snug whitespace-pre-line">{stat.label}</p>
          {stat.label === "Happy Clients" && (
            <motion.span
              className="mt-3 block w-8 h-[2px] origin-center"
              style={{ backgroundColor: GOLD }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.8 }}
            />
          )}
        </motion.div>
      ))}

      {/* Rating */}
      <motion.div variants={item} className="flex flex-col items-center text-center xl:border-l border-[#ece4d8] xl:px-4">
        <div className="flex gap-1 mb-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.svg
              key={i}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={GOLD}
              initial={{ scale: 0, rotate: -45 }}
              animate={inView ? { scale: 1, rotate: 0 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.5 + i * 0.1 }}
            >
              <path d="M12 2.5 L14.9 8.6 L21.5 9.3 L16.6 13.8 L18 20.4 L12 17 L6 20.4 L7.4 13.8 L2.5 9.3 L9.1 8.6 Z" />
            </motion.svg>
          ))}
        </div>
        <p className="text-3xl font-bold mb-1" style={{ color: NAVY }}>
          <CountUp to={4.9} decimals={1} start={inView} />/5
        </p>
        <p className="text-[12px] text-slate-600 mb-3">Client Rating</p>
        <span className="block w-8 h-[2px] mb-3" style={{ backgroundColor: GOLD }} />
        <p className="text-[11px] text-slate-500 whitespace-nowrap">Google | Clutch | GoodFirms</p>
      </motion.div>

      {/* CTA */}
      <motion.div variants={item} className="relative md:col-span-2 xl:col-span-1 xl:border-l border-[#e2d7c7] xl:pl-8">
        <h3 className="font-serif text-2xl leading-tight font-semibold mb-3">
          <span className="block" style={{ color: NAVY }}>Let&apos;s build something</span>
          <span className="block" style={{ color: DEEP_TEAL }}>extraordinary together.</span>
        </h3>
        <p className="text-[12px] text-slate-600 leading-relaxed mb-5">
          Tell us about your project and let&apos;s create a website that sets you ahead of your competition.
        </p>
        <Link href="/contact" className="group inline-flex items-center gap-3 text-[13px] font-semibold" style={{ color: DEEP_TEAL }}>
          Start Your Project
          <svg {...svgBase(DEEP_TEAL, 18)} className="transition-transform group-hover:translate-x-1.5">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function WebsiteDevStrategyCta() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FBF8F3] py-14 lg:py-20">
      {/* Background artwork (leaf shadows + plant on the right) */}
      <Image
        src="/growth.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right pointer-events-none select-none"
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <motion.div variants={stagger(0.1, 0.12)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
            <span className="w-12 h-px" style={{ backgroundColor: GOLD }} />
            <p className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: DEEP_TEAL }}>
              Let&apos;s Build What&apos;s Next
            </p>
          </motion.div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[58px] leading-[1.08] font-semibold tracking-tight mb-4">
            {["Ready to turn", "your website into"].map((line) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span variants={lineReveal} className="block" style={{ color: NAVY }}>
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineReveal} className="block italic" style={{ color: GOLD }}>
                your growth engine?
              </motion.span>
            </span>
          </h2>

          {/* brush underline */}
          <svg className="w-64 sm:w-80 h-5 mb-8" viewBox="0 0 320 20" fill="none" aria-hidden>
            <motion.path
              d="M2 14 C80 6 200 4 318 9"
              stroke={GOLD}
              strokeWidth="3"
              strokeLinecap="round"
              variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1, delay: 0.6, ease: "easeInOut" } } }}
            />
          </svg>

          <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-700 leading-relaxed mb-10">
            The right website does more than look good.
            <br />
            It attracts, engages and converts — every single day.
          </motion.p>

          <motion.div variants={stagger(0, 0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 mb-10">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className={`pr-4 ${i > 0 ? "lg:border-l lg:pl-5" : ""} ${i % 2 === 1 ? "border-l pl-5 lg:pl-5" : ""} border-[#e8dfd2]`}
              >
                <motion.span
                  whileHover={{ rotate: -10, scale: 1.08 }}
                  className="w-11 h-11 rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(60,40,20,0.35)] flex items-center justify-center mb-4"
                >
                  {f.icon}
                </motion.span>
                <h3 className="text-[14px] font-bold mb-1.5" style={{ color: NAVY }}>{f.title}</h3>
                <p className="text-[12px] text-slate-500 leading-relaxed">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className={`${caveat.className} text-2xl leading-snug`}>
            <span className="block" style={{ color: TEAL }}>Great websites don&apos;t happen by chance.</span>
            <span className="block" style={{ color: GOLD }}>They happen by strategy.</span>
          </motion.p>
        </motion.div>

        {/* Right: booking card */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="relative w-full max-w-[480px] mx-auto lg:ml-auto"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="relative bg-white/90 backdrop-blur-sm rounded-[28px] border border-white shadow-[0_40px_80px_-30px_rgba(60,40,20,0.3)] px-7 sm:px-9 py-9"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.span
                className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_20px_-8px_rgba(194,146,69,0.7)]"
                style={{ background: `linear-gradient(135deg, #d6a95a, ${GOLD})` }}
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg {...svgBase("#ffffff", 24)} strokeWidth={1.6}>
                  <path d="M12 3 L13.6 8.4 L19 10 L13.6 11.6 L12 17 L10.4 11.6 L5 10 L10.4 8.4 Z" />
                  <path d="M18.5 15 L19.2 17 L21 17.5 L19.2 18.2 L18.5 20 L17.8 18.2 L16 17.5 L17.8 17 Z" />
                </svg>
              </motion.span>
              <span className="h-px flex-1 max-w-8" style={{ backgroundColor: GOLD }} />
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap" style={{ color: GOLD }}>
                Take the Next Step
              </p>
              <span className="h-px flex-1 max-w-8" style={{ backgroundColor: GOLD }} />
            </div>

            <h3 className="font-serif text-3xl sm:text-[34px] leading-[1.15] font-semibold text-center mb-4" style={{ color: NAVY }}>
              Book Your Free
              <br />
              Strategy Session
            </h3>
            <p className="text-[13px] text-slate-600 text-center leading-relaxed mb-7 max-w-sm mx-auto">
              A personalized 30-minute session to explore your goals, challenges and the right website strategy to grow your business.
            </p>

            <motion.ul
              variants={stagger(0.6, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="flex flex-col gap-3 mb-8"
            >
              {BENEFITS.map((b) => (
                <motion.li
                  key={b}
                  variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}
                  className="flex items-center gap-3 text-[13px] text-slate-700"
                >
                  <span className="shrink-0 w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center" style={{ borderColor: GOLD }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {b}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="group relative overflow-hidden flex items-center justify-center gap-3 w-full rounded-xl px-6 py-4 text-white text-[14px] font-semibold shadow-[0_15px_30px_-12px_rgba(15,92,86,0.7)]"
                style={{ backgroundColor: DEEP_TEAL }}
              >
                {/* shine sweep */}
                <motion.span
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ["0%", "450%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                />
                <svg {...svgBase("#ffffff", 18)}>
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3 V7 M8 3 V7 M3 11 H21" />
                  <rect x="8" y="14" width="3" height="3" rx="0.5" />
                </svg>
                <span className="relative">Book My Free Strategy Session</span>
                <svg {...svgBase("#ffffff", 18)} className="relative ml-auto transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <Link
              href="/contact"
              className="mt-5 flex items-center justify-center gap-2 text-[13px] font-semibold"
              style={{ color: DEEP_TEAL }}
            >
              <motion.svg
                {...svgBase(DEEP_TEAL, 16)}
                animate={{ rotate: [0, -12, 12, -8, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
              >
                <path d="M5 4 H9 L11 9 L8.5 10.5 C9.5 12.5 11.5 14.5 13.5 15.5 L15 13 L20 15 V19 C20 20 19 21 18 21 C10 20.5 3.5 14 3 6 C3 5 4 4 5 4 Z" />
              </motion.svg>
              <span className="underline underline-offset-4">Schedule a Call</span>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <Container className="relative">
        <ProofStrip />
      </Container>
    </section>
  );
}
