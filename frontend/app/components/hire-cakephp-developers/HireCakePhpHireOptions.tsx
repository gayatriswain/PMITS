"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";

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
  className: "h-5 w-5",
};

type Plan = {
  title: string;
  tag: string;
  text: string;
  points: string[];
  cta: string;
  icon: React.ReactNode;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    title: "CakePHP Developer",
    tag: "Backend Expert",
    text: "Skilled in building robust backend applications and RESTful APIs.",
    points: [
      "Core CakePHP Development",
      "MVC Architecture",
      "Database Design & Optimization",
      "API Development & Integration",
    ],
    cta: "Hire Developer",
    icon: (
      <svg {...I}>
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
      </svg>
    ),
  },
  {
    title: "Full-Stack Developer",
    tag: "End-to-End Expert",
    text: "Handle both front-end and backend to deliver complete web solutions.",
    points: [
      "CakePHP + PHP + MySQL",
      "JavaScript, jQuery, AJAX",
      "HTML, CSS, Bootstrap",
      "Third-party Integrations",
    ],
    cta: "Hire Full-Stack Developer",
    featured: true,
    icon: (
      <svg {...I}>
        <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" />
        <path d="M3 12l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />
      </svg>
    ),
  },
  {
    title: "CakePHP Specialist",
    tag: "Optimization Expert",
    text: "Expertise in optimizing, migrating and maintaining complex applications.",
    points: [
      "Application Migration",
      "Performance Optimization",
      "Code Refactoring",
      "Maintenance & Support",
    ],
    cta: "Hire Specialist",
    icon: (
      <svg {...I}>
        <path d="M14.5 6.5a4 4 0 00-5.2 5.2L3.5 17.5a1.8 1.8 0 002.5 2.5l5.8-5.8a4 4 0 005.2-5.2l-2.5 2.5-2-.5-.5-2 2.5-2.5z" />
      </svg>
    ),
  },
];

const PERKS = [
  {
    title: "Dedicated Resource",
    text: "100% focused on your project",
    icon: (
      <svg {...I}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
      </svg>
    ),
  },
  {
    title: "Flexible Engagement",
    text: "Hourly, part-time or project-based",
    icon: (
      <svg {...I}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Transparent Process",
    text: "Daily updates with full visibility",
    icon: (
      <svg {...I}>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="2.8" />
      </svg>
    ),
  },
  {
    title: "Risk-Free Trial",
    text: "Start with a risk-free trial period",
    icon: (
      <svg {...I}>
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

function Check() {
  return (
    <span
      aria-hidden
      className="mt-[3px] grid h-[14px] w-[14px] shrink-0 place-items-center rounded-full"
      style={{ background: "#fde8e9", color: RED }}
    >
      <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5l2.2 2.2L9.5 3.8" />
      </svg>
    </span>
  );
}

export default function HireCakePhpHireOptions() {
  return (
    <section
      id="hire-options"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f8_55%,#ffffff_100%)] pb-14 pt-14 font-sans sm:pt-20 lg:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-10%] top-[20%] hidden h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,205,205,0.4)_0%,transparent_68%)] lg:block"
      />

      <Container className="relative max-w-[1240px]">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]"
            style={{ color: RED }}
          >
            <i aria-hidden className="h-px w-8" style={{ background: RED, opacity: 0.5 }} />
            Hire the Right Expertise
            <i aria-hidden className="h-px w-8" style={{ background: RED, opacity: 0.5 }} />
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 font-playfair text-[34px] font-bold leading-[1.12] tracking-tight text-[#0f1a2e] sm:text-5xl lg:text-[50px]"
          >
            Hire <span style={{ color: RED }}>CakePHP</span> Developers
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]"
          >
            Choose the ideal CakePHP expertise for your project and scale your development
            capacity as your business grows.
          </motion.p>
        </motion.div>

        <div className="relative mt-12 lg:mt-14">
          {/* cake peeking in from the left edge */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE }}
            className="pointer-events-none absolute -left-24 top-[-2%] hidden w-[300px] lg:block xl:-left-28 xl:w-[340px]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/Photorealistic Red Velvet Cake Slice.webp"
                alt=""
                width={1199}
                height={1312}
                sizes="340px"
                className="h-auto w-full select-none drop-shadow-[0_30px_40px_rgba(120,40,40,0.22)]"
              />
            </motion.div>
          </motion.div>

          {/* Plans */}
          <div className="relative lg:pl-[20%]">
            <ul className="grid items-stretch gap-5 md:grid-cols-3">
              {PLANS.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.75, delay: 0.1 * i, ease: EASE }}
                  className={`relative flex flex-col rounded-2xl bg-white p-6 ${
                    p.featured
                      ? "border-2 shadow-[0_30px_60px_-26px_rgba(217,43,50,0.45)] md:-mt-3 md:pb-8"
                      : "border border-[#eee4e4] shadow-[0_18px_44px_-26px_rgba(80,30,30,0.3)]"
                  }`}
                  style={p.featured ? { borderColor: RED } : undefined}
                >
                  {p.featured && (
                    <span
                      className="absolute right-4 top-0 -translate-y-1/2 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white shadow-md"
                      style={{ background: RED }}
                    >
                      ★ Most Popular
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
                      style={{ color: RED, borderColor: "#f3d3d5", background: "#fff6f6" }}
                    >
                      {p.icon}
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold leading-tight text-[#0f1a2e]">{p.title}</h3>
                      <p
                        className="mt-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em]"
                        style={{ color: RED }}
                      >
                        {p.tag}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-[12.5px] leading-relaxed text-slate-500">{p.text}</p>
                  <hr className="my-4 border-[#f0e6e6]" />

                  <ul className="mb-6 flex-1 space-y-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-[12.5px] text-slate-700">
                        <Check />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#contact"
                    className={`group inline-flex h-11 items-center justify-center gap-2.5 rounded-lg px-5 text-[13px] font-semibold transition ${
                      p.featured
                        ? "text-white shadow-[0_14px_28px_-10px_rgba(217,43,50,0.7)] hover:brightness-110"
                        : "border border-[#e6d3d4] bg-white text-[#0f1a2e] hover:border-[#d92b32] hover:text-[#d92b32]"
                    }`}
                    style={p.featured ? { background: RED } : undefined}
                  >
                    {p.cta}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Perks + help box */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-8 grid gap-4 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_24px_60px_-32px_rgba(80,30,30,0.35)] lg:grid-cols-[1fr_auto] lg:items-center"
            >
              <ul className="grid grid-cols-2 gap-y-4 sm:grid-cols-4">
                {PERKS.map((f, i) => (
                  <li
                    key={f.title}
                    className={`flex items-start gap-2.5 px-3 ${i > 0 ? "sm:border-l sm:border-[#eee4e4]" : ""}`}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border"
                      style={{ color: RED, borderColor: "#f3d3d5", background: "#fff6f6" }}
                    >
                      {f.icon}
                    </span>
                    <div>
                      <h4 className="text-[11.5px] font-bold leading-tight text-[#0f1a2e]">{f.title}</h4>
                      <p className="mt-0.5 text-[10.5px] leading-snug text-slate-500">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div
                className="rounded-xl border px-4 py-3 lg:w-[280px]"
                style={{ borderColor: "#f1c9cb", background: "#fff8f8" }}
              >
                <h4 className="text-[12.5px] font-bold leading-snug text-[#0f1a2e]">
                  Need help choosing the right developer?
                </h4>
                <p className="mt-1 text-[10.5px] leading-snug text-slate-500">
                  Our experts will help you find the perfect fit for your project.
                </p>
                <Link
                  href="#contact"
                  className="group mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold"
                  style={{ color: RED }}
                >
                  Get a Free Consultation
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
