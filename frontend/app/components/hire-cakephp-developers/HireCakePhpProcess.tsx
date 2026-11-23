"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { CakeMark } from "./HireCakePhpExpertise";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";

// Artwork on the left of the steps. Swap this path to change the cake.
const CAKE_IMAGE = "/Photorealistic Red Velvet Cake Slice.webp";

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
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
};

const STEPS = [
  {
    title: "Discovery",
    text: "We understand your business, goals and technical requirements.",
    icon: (
      <svg {...I}>
        <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 014 13.5v-8z" />
        <path d="M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    title: "Planning",
    text: "We create a clear roadmap with architecture, timelines and deliverables.",
    icon: (
      <svg {...I}>
        <path d="M6 3h9l4 4v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
        <path d="M14 3v5h5M8.5 12.5h5M8.5 16h3" />
        <path d="M15.5 17.5l3.5-3.5 1.2 1.2-3.5 3.5-1.7.5.5-1.7z" />
      </svg>
    ),
  },
  {
    title: "Development",
    text: "Our CakePHP experts build clean, secure and scalable solutions.",
    icon: (
      <svg {...I}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M10 13l-2 2 2 2M14 13l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: "Testing",
    text: "Rigorous testing ensures performance, security and bug-free delivery.",
    icon: (
      <svg {...I}>
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "Deployment",
    text: "We deploy your application smoothly and ensure a seamless launch.",
    icon: (
      <svg {...I}>
        <path d="M14 4c3.5 0 6 2.5 6 6-3 1-5 3-6 6l-4-4c3-1 5-3 6-6" />
        <path d="M10 12l-4 1-2 3 4 1M12 14l-1 4-3 2-1-4M15 8.5h.01" />
      </svg>
    ),
  },
  {
    title: "Support",
    text: "Ongoing maintenance and support to keep your application at its best.",
    icon: (
      <svg {...I}>
        <path d="M4 14v-2a8 8 0 0116 0v2" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
        <path d="M19 19c0 1.5-2 2.5-5 2.5" />
      </svg>
    ),
  },
];

const PRINCIPLES = [
  {
    title: "Goal-Oriented",
    text: "Every step aligned with your business objectives.",
    icon: (
      <svg {...I}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Quality Assured",
    text: "Best practices, clean code and high standards.",
    icon: (
      <svg {...I}>
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5M9.8 9l1.6 1.6 3-3.2" />
      </svg>
    ),
  },
  {
    title: "On-Time Delivery",
    text: "Agile execution with transparency and on-time results.",
    icon: (
      <svg {...I}>
        <path d="M4 20V13M10 20V9M16 20v-5M22 20H2" />
        <path d="M5 8l5-4 4 3 6-4M16 3h4v4" />
      </svg>
    ),
  },
  {
    title: "Long-Term Partnership",
    text: "We grow with you and support your success.",
    icon: (
      <svg {...I}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
      </svg>
    ),
  },
];

/* One full sine period per column: continuous across columns and through every node.
 * The last column ends in an arrow head. */
function Wave({ last }: { last?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 top-1/2 hidden h-10 w-full -translate-y-1/2 overflow-visible lg:block"
    >
      <path
        d="M0 20 C16 -2 34 -2 50 20 C66 42 84 42 100 20"
        fill="none"
        stroke={RED}
        strokeOpacity="0.55"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
      {last && (
        <path
          d="M97 17 L103 20 L97 23"
          fill="none"
          stroke={RED}
          strokeOpacity="0.7"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function HireCakePhpProcess() {
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f8_60%,#ffffff_100%)] pb-14 pt-14 font-sans sm:pt-20 lg:pb-20"
    >
      <Container className="relative max-w-[1240px]">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="flex flex-col items-center gap-2">
            <span
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]"
              style={{ color: RED }}
            >
              <i aria-hidden className="h-px w-10" style={{ background: RED, opacity: 0.45 }} />
              Our CakePHP Development Process
              <i aria-hidden className="h-px w-10" style={{ background: RED, opacity: 0.45 }} />
            </span>
            <svg viewBox="0 0 24 20" className="h-4 w-5" aria-hidden>
              <path d="M2 8v5c0 2 4.5 3.5 10 3.5S22 15 22 13V8" fill="#d92b32" />
              <path d="M2 8v2.5c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V8" fill="#fff" opacity=".85" />
              <ellipse cx="12" cy="8" rx="10" ry="3.6" fill="#ee4a50" />
            </svg>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-playfair text-[34px] font-bold leading-[1.12] tracking-tight text-[#0f1a2e] sm:text-5xl lg:text-[50px]"
          >
            A process as solid as <span style={{ color: RED }}>Cake.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]"
          >
            We follow a proven methodology to deliver secure, scalable and high-performance
            CakePHP applications.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-12 lg:mt-14">
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE }}
            className="pointer-events-none absolute -left-16 -top-2 hidden w-[230px] lg:block xl:-left-20 xl:w-[245px]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={CAKE_IMAGE}
                alt=""
                width={1199}
                height={1312}
                sizes="270px"
                className="h-auto w-full select-none drop-shadow-[0_30px_40px_rgba(120,40,40,0.22)]"
              />
            </motion.div>
          </motion.div>

          <ol className="relative grid grid-cols-2 gap-x-0 gap-y-10 sm:grid-cols-3 lg:grid-cols-6 lg:pl-[22%]">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE }}
                className="relative flex flex-col items-center text-center"
              >
                {/* number + node on the wave */}
                <div className="relative flex w-full flex-col items-center">
                  <span
                    className="relative z-[2] mb-2 grid h-[18px] min-w-[22px] place-items-center rounded-full border bg-white px-1 text-[8.5px] font-bold"
                    style={{ color: RED, borderColor: "#f1c9cb" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex h-[76px] w-full items-center justify-center">
                    <Wave last={i === STEPS.length - 1} />
                    <span className="relative grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-[0_0_0_7px_rgba(255,255,255,0.8),0_18px_36px_-14px_rgba(217,43,50,0.5)] ring-1 ring-[#f3d3d5]">
                      <span
                        className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[#f6dcdd]"
                        style={{ color: RED, background: "linear-gradient(180deg,#fff,#fff6f6)" }}
                      >
                        {s.icon}
                      </span>
                    </span>
                  </div>
                </div>

                <h3 className="mt-5 px-2 text-[14px] font-bold text-[#0f1a2e]">{s.title}</h3>
                <p className="mt-2 max-w-[170px] px-2 text-[11px] leading-relaxed text-slate-500">{s.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Principles bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-12 overflow-hidden rounded-2xl border border-white bg-white/90 shadow-[0_24px_60px_-30px_rgba(80,30,30,0.35)] lg:ml-[10%] lg:mt-14"
        >
          <div className="grid items-center gap-y-6 px-5 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] lg:gap-x-6 lg:px-8">
            <div className="flex items-center gap-5">
              <span className="shrink-0 scale-90">
                <CakeMark />
              </span>
              <span aria-hidden className="hidden h-16 w-px bg-[#eadada] sm:block" />
              <div>
                <h3 className="font-playfair text-[20px] font-bold leading-tight text-[#0f1a2e]">
                  Built with process.
                  <br />
                  <span style={{ color: RED }}>Delivered with perfection.</span>
                </h3>
                <p className="mt-2 max-w-[260px] text-[11px] leading-relaxed text-slate-500">
                  Our structured approach ensures quality at every step and results that drive your
                  business forward.
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
              {PRINCIPLES.map((p, i) => (
                <li
                  key={p.title}
                  className={`flex flex-col items-start px-4 ${i > 0 ? "sm:border-l sm:border-[#eee4e4]" : ""}`}
                >
                  <span
                    className="mb-2.5 grid h-10 w-10 place-items-center rounded-full border border-[#f3d3d5] bg-[#fff6f6]"
                    style={{ color: RED }}
                  >
                    {p.icon}
                  </span>
                  <h4 className="text-[12px] font-bold text-[#0f1a2e]">{p.title}</h4>
                  <p className="mt-1 text-[10.5px] leading-snug text-slate-500">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
