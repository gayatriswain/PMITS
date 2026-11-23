"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 * i, ease: EASE },
  }),
};

const I = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-7",
};

const POINTS = [
  {
    title: "Business-First Thinking",
    text: "We start with your objective, audience and measurable outcome to ensure real value.",
    icon: (
      <svg {...I}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
        <path d="M12 12l7-7M16.5 3.5V7.5h4" />
      </svg>
    ),
  },
  {
    title: "Immersive Design",
    text: "Interfaces and environments designed around how people naturally learn, explore and interact.",
    icon: (
      <svg {...I}>
        <path d="M14 4c3.5 0 6 2.5 6 6-3 1-5 3-6 6l-4-4c3-1 5-3 6-6" />
        <path d="M10 12l-4 1-2 3 4 1M12 14l-1 4-3 2-1-4M15 8.5h.01" />
      </svg>
    ),
  },
  {
    title: "Advanced Technology",
    text: "Leveraging AR, VR, 3D, spatial computing and real-time technologies to create seamless experiences.",
    icon: (
      <svg {...I}>
        <path d="M12 2.5l8.5 4.7v9.6L12 21.5l-8.5-4.7V7.2L12 2.5z" />
        <path d="M3.5 7.2L12 12l8.5-4.8M12 12v9.5" />
      </svg>
    ),
  },
  {
    title: "Built to Scale",
    text: "Solutions architected to scale across users, devices and platforms—today and tomorrow.",
    icon: (
      <svg {...I}>
        <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
        <path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
      </svg>
    ),
  },
  {
    title: "Measurable Impact",
    text: "We track what matters—engagement, performance, efficiency and ROI—so you see real business results.",
    icon: (
      <svg {...I}>
        <path d="M4 20V11M10 20V5M16 20v-7M22 20H2" />
      </svg>
    ),
  },
];

// The points sit on a gentle arc. ROW is each row's height; the sideways push follows a
// parabola (0 at the ends, ARC at the middle) and the SVG line is drawn through the same points.
const ROW = 96;
const ARC = 44;
const DOT_X = 14;
const pushFor = (i: number) => {
  const t = i / (POINTS.length - 1);
  return ARC * 4 * t * (1 - t);
};

function ArcLine() {
  const h = ROW * POINTS.length;
  const y0 = ROW / 2;
  const y1 = h - ROW / 2;
  const w = DOT_X * 2 + ARC;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className="pointer-events-none absolute left-0 top-0 hidden overflow-visible lg:block"
    >
      <path
        d={`M${DOT_X} ${y0} Q${DOT_X + ARC * 2} ${h / 2} ${DOT_X} ${y1}`}
        fill="none"
        stroke="#cfcaf5"
        strokeWidth="1.2"
      />
      {POINTS.map((_, i) => (
        <circle
          key={i}
          cx={DOT_X + pushFor(i)}
          cy={ROW * i + ROW / 2}
          r="3.2"
          fill="#fff"
          stroke="#7c5cf6"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}

export default function ArVrWhy() {
  return (
    <section
      id="why-promanage"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f5ff] via-white to-[#f4f5ff] pb-14 pt-14 sm:pt-20 lg:pb-20"
    >
      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
          {/* Left: heading + artwork */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="block text-[11px] font-bold uppercase tracking-[0.28em] text-[#6d5ef5]"
              >
                Why ProManage
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="mt-4 text-4xl font-black leading-[1.08] tracking-tight text-[#0f1535] sm:text-5xl lg:text-[52px]"
              >
                Technology that solves{" "}
                <span className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent">
                  real business
                </span>{" "}
                problems.
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={2}
                className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-[15px]"
              >
                We combine strategy, design, technology and industry understanding to create
                AR/VR experiences that deliver measurable impact.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="relative mt-8 w-full max-w-[640px]"
            >
              <Image
                src="/Neon Performance Overview Interface.webp"
                alt="Engineer in an AR headset using a holographic performance dashboard"
                width={1616}
                height={973}
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="h-auto w-full select-none"
              />
            </motion.div>
          </div>

          {/* Right: five points on an arc */}
          <ol className="relative lg:pt-2">
            <ArcLine />
            {POINTS.map((p, i) => (
              <motion.li
                key={p.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE }}
                style={{ ["--push" as string]: `${DOT_X + 30 + pushFor(i)}px` }}
                className="flex items-center gap-5 py-3 lg:h-[96px] lg:pl-[var(--push)]"
              >
                <span className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full bg-white text-[#5b43e8] shadow-[0_0_0_6px_rgba(255,255,255,0.7),0_14px_30px_-10px_rgba(91,67,232,0.5)]">
                  {p.icon}
                </span>
                <div className="max-w-[360px]">
                  <h3 className="flex items-baseline gap-3 text-[16px] font-bold text-[#0f1535]">
                    <span className="text-[17px] font-bold text-[#7c5cf6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{p.text}</p>
                  <span aria-hidden className="mt-2 block h-px w-6 bg-[#7c5cf6]" />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-12 flex flex-col gap-6 rounded-[28px] border border-white bg-white/70 p-6 shadow-[0_30px_70px_-35px_rgba(91,67,232,0.45)] backdrop-blur lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-10 lg:py-7"
        >
          <div className="flex items-center gap-5 sm:gap-6">
            <span className="relative grid h-20 w-20 shrink-0 place-items-center">
              <span aria-hidden className="absolute inset-0 rounded-full border border-[#e3dffb]" />
              <span aria-hidden className="absolute inset-2 rounded-full border border-[#d6d0f6]" />
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#7c5cf6] to-[#4f46e5] text-white shadow-[0_12px_26px_-8px_rgba(91,67,232,0.65)]">
                <svg {...I} className="h-6 w-6">
                  <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 014 13.5v-8z" />
                  <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" strokeWidth="2.4" />
                </svg>
              </span>
            </span>
            <div>
              <h3 className="text-xl font-bold leading-snug text-[#0f1535] sm:text-[22px]">
                Have a business challenge that
                <br className="hidden sm:block" />{" "}
                <span className="text-[#5b43e8]">immersive technology</span> could solve?
              </h3>
              <p className="mt-1.5 text-[13px] text-slate-600">
                Let&apos;s build an experience that makes a real difference.
              </p>
            </div>
          </div>

          <Link
            href="#contact-form"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#6d4df0] to-[#4f46e5] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-6px_rgba(91,67,232,0.55)] transition hover:brightness-110"
          >
            Talk to an AR/VR Specialist
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
