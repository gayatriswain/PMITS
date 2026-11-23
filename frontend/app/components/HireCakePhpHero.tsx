"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.09 * i, ease: EASE },
  }),
};

const I = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-[18px] w-[18px]",
};

const FEATURES = [
  {
    title: "Secure",
    text: "Built with best security practices",
    icon: (
      <svg {...I}>
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "High Performance",
    text: "Optimized for speed and scalability",
    icon: (
      <svg {...I}>
        <path d="M4.5 18a8.5 8.5 0 1115 0" />
        <path d="M12 14l4-5" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Clean Code",
    text: "Follows PHP standards and best practices",
    icon: (
      <svg {...I}>
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
      </svg>
    ),
  },
  {
    title: "Scalable",
    text: "Flexible solutions for future growth",
    icon: (
      <svg {...I}>
        <path d="M4 20V13M10 20V9M16 20v-5M22 20H2" />
        <path d="M5 8l5-4 4 3 6-4M16 3h4v4" />
      </svg>
    ),
  },
];

export default function HireCakePhpHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbf7f7_60%,#f7f1f1_100%)] pb-12 pt-10 font-sans sm:pt-14 lg:pb-16 lg:pt-16">
      {/* soft glow + ring behind the cake */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-[-6%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgba(255,196,196,0.45)_0%,rgba(255,226,226,0.25)_45%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[2%] top-[6%] hidden h-[620px] w-[620px] rounded-full border border-[#f0d9d9]/70 lg:block"
      />

      <Container className="relative max-w-[1240px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6">
          {/* ----------------------------- copy ----------------------------- */}
          <motion.div initial="hidden" animate="show" className="relative z-[1]">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="block text-[11px] font-bold uppercase tracking-[0.24em]"
              style={{ color: RED }}
            >
              Hire CakePHP Developers
            </motion.span>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="mt-4 text-[40px] font-extrabold leading-[1.06] tracking-tight text-[#0f1a2e] sm:text-5xl lg:text-[58px]"
            >
              Built on CakePHP.
              <br />
              Built for what&apos;s next.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 max-w-[440px] text-sm leading-relaxed text-slate-600 sm:text-[15px]"
            >
              Hire dedicated CakePHP developers to build secure, high-performance web
              applications that help your business rise.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="#contact"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg px-6 text-sm font-semibold text-white shadow-[0_14px_28px_-10px_rgba(217,43,50,0.7)] transition hover:brightness-110"
                style={{ background: RED }}
              >
                Hire a CakePHP Developer
                <svg {...I} className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.2}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-[#0f1a2e] transition-colors hover:text-[#d92b32]"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-full text-white shadow-[0_10px_22px_-8px_rgba(217,43,50,0.7)] transition-transform duration-300 group-hover:scale-110"
                  style={{ background: RED }}
                >
                  <span aria-hidden className="ml-0.5 text-[11px]">▶</span>
                </span>
                Discuss Your Project
              </Link>
            </motion.div>

            {/* feature strip */}
            <motion.ul
              variants={fadeUp}
              custom={4}
              className="mt-9 grid grid-cols-2 gap-y-5 rounded-2xl border border-white bg-white/90 px-3 py-5 shadow-[0_20px_50px_-26px_rgba(80,30,30,0.35)] sm:grid-cols-4 sm:px-2"
            >
              {FEATURES.map((f, i) => (
                <li
                  key={f.title}
                  className={`flex flex-col items-start px-4 ${
                    i > 0 ? "sm:border-l sm:border-[#eee4e4]" : ""
                  }`}
                >
                  <span
                    className="mb-2.5 grid h-9 w-9 place-items-center rounded-full border"
                    style={{ color: RED, borderColor: "#f3cfd1", background: "#fff6f6" }}
                  >
                    {f.icon}
                  </span>
                  <h3 className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#0f1a2e]">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-[10.5px] leading-snug text-slate-500">{f.text}</p>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeUp}
              custom={5}
              className="mt-5 flex items-center gap-2.5 text-[12.5px] text-slate-600"
            >
              <svg {...I} className="h-[18px] w-[18px] text-slate-500">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                <circle cx="17" cy="9" r="2.4" />
                <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
              </svg>
              <span>
                Trusted by <strong className="font-semibold text-[#0f1a2e]">2,700+</strong> businesses
                across <strong className="font-semibold text-[#0f1a2e]">75+</strong> cities
              </span>
            </motion.p>
          </motion.div>

          {/* ----------------------------- cake ----------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/CakePHP Layered Architecture Cake.webp"
                alt="Layered CakePHP cake showing the Presentation, Controller, Model and CakePHP Core layers"
                width={1202}
                height={1309}
                priority
                sizes="(min-width: 1024px) 560px, 90vw"
                className="mx-auto h-auto w-full max-w-[560px] select-none drop-shadow-[0_40px_50px_rgba(120,40,40,0.18)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
