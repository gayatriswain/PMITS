"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { CakeMark } from "./HireCakePhpExpertise";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";

// Same contact details as the site footer. Change here if this page needs its own.
const PHONE = "+91 99999 88888";
const EMAIL = "hello@promanage.com";

const CAKE_IMAGE = "/Red Velvet Layer Cake Cutaway.webp";

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

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    industry: "Retail Industry",
    text: "Custom CakePHP solution with multi-vendor, product management and secure payments.",
    stats: [
      { value: "120%", label: "Increase in Sales" },
      { value: "99.9%", label: "Uptime Achieved" },
    ],
    icon: (
      <svg {...I}>
        <path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 001.5 1.2h8.1a1.5 1.5 0 001.5-1.1L20.5 8H6.2" />
        <circle cx="10" cy="19.5" r="1.3" />
        <circle cx="17" cy="19.5" r="1.3" />
      </svg>
    ),
  },
  {
    title: "Education Portal",
    industry: "Education Industry",
    text: "Learning management system with student portals, courses and real-time analytics.",
    stats: [
      { value: "70%", label: "Better Engagement" },
      { value: "3X", label: "Faster Performance" },
    ],
    icon: (
      <svg {...I}>
        <path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
      </svg>
    ),
  },
  {
    title: "Healthcare System",
    industry: "Healthcare Industry",
    text: "Secure patient management system with appointments, records and billing.",
    stats: [
      { value: "90%", label: "Process Efficiency" },
      { value: "100%", label: "Data Security" },
    ],
    icon: (
      <svg {...I}>
        <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
        <path d="M7.5 12h2.2l1.3-2.5 2 4.5 1.2-2h2.3" />
      </svg>
    ),
  },
];

// Plain text stand-ins: replace each with the client's real logo file in /public
const CLIENTS = [
  { name: "JOCKEY", cls: "font-black italic tracking-tight text-[20px]" },
  { name: "bigbasket", cls: "font-extrabold text-[19px]" },
  { name: "policybazaar", cls: "font-bold text-[17px]" },
  { name: "Berger", cls: "font-extrabold text-[21px]" },
  { name: "unicef", cls: "font-bold lowercase tracking-wide text-[20px]" },
];

export default function HireCakePhpResults() {
  return (
    <section
      id="results"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f8_55%,#ffffff_100%)] pb-14 pt-14 font-sans sm:pt-20 lg:pb-20"
    >
      <Container className="relative max-w-[1240px]">
        {/* eyebrow */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]"
            style={{ color: RED }}
          >
            <i aria-hidden className="h-px w-10" style={{ background: RED, opacity: 0.45 }} />
            Real CakePHP Results
            <i aria-hidden className="h-px w-10" style={{ background: RED, opacity: 0.45 }} />
          </motion.span>
          <motion.div variants={fadeUp} custom={1} className="flex items-center gap-3" aria-hidden>
            <i className="h-px w-16" style={{ background: RED, opacity: 0.3 }} />
            <svg viewBox="0 0 24 20" className="h-4 w-5">
              <path d="M2 8v5c0 2 4.5 3.5 10 3.5S22 15 22 13V8" fill="#d92b32" />
              <path d="M2 8v2.5c0 2 4.5 3.5 10 3.5s10-1.5 10-3.5V8" fill="#fff" opacity=".85" />
              <ellipse cx="12" cy="8" rx="10" ry="3.6" fill="#ee4a50" />
            </svg>
            <i className="h-px w-16" style={{ background: RED, opacity: 0.3 }} />
          </motion.div>
        </motion.div>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-6">
          {/* ------------------------- left: copy + project cards ------------------------- */}
          <div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
              <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-playfair text-[36px] font-bold leading-[1.1] tracking-tight text-[#0f1a2e] sm:text-5xl lg:text-[52px]"
              >
                Real Projects.
                <br />
                Real <span style={{ color: RED }}>CakePHP</span> Impact<span style={{ color: RED }}>.</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                className="mt-4 max-w-md text-sm leading-relaxed text-slate-600 sm:text-[15px]"
              >
                We build secure, scalable and high-performance applications that help businesses
                grow.
              </motion.p>
            </motion.div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE }}
                  className="group flex flex-col rounded-2xl border border-[#f0e6e6] bg-white p-4 shadow-[0_18px_44px_-26px_rgba(80,30,30,0.3)] transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f3d3d5] bg-[#fff6f6] text-[#d92b32] transition-colors duration-300 group-hover:border-[#d92b32] group-hover:bg-[#d92b32] group-hover:text-white">
                      {p.icon}
                    </span>
                    <div>
                      <h3 className="text-[13px] font-bold leading-tight text-[#0f1a2e]">{p.title}</h3>
                      <p className="mt-0.5 text-[10.5px] font-semibold" style={{ color: RED }}>
                        {p.industry}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-slate-500">{p.text}</p>
                  <hr className="my-3 mt-auto border-[#f0e6e6]" />
                  <div className="flex items-stretch">
                    {p.stats.map((s, k) => (
                      <div key={s.label} className={k ? "ml-3 border-l border-[#f0e6e6] pl-3" : ""}>
                        <p className="text-[20px] font-extrabold leading-none" style={{ color: RED }}>
                          {s.value}
                        </p>
                        <p className="mt-1 whitespace-nowrap text-[9.5px] leading-tight text-slate-500">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ------------------------------- right: cake ------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: 0.15, ease: EASE }}
            className="relative mx-auto w-full max-w-[520px] lg:-mt-4 lg:max-w-none lg:translate-y-1"
          >
            <div
              aria-hidden
              className="absolute -right-2 top-0 hidden h-24 w-20 opacity-60 [background-image:radial-gradient(#e9b9bb_1.2px,transparent_1.4px)] [background-size:12px_12px] lg:block"
            />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,205,205,0.4)_0%,transparent_70%)]"
            />
            <motion.div
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src={CAKE_IMAGE}
                alt="Two-tier red velvet cake with a slice cut out"
                width={1351}
                height={1164}
                sizes="(min-width: 1024px) 480px, 90vw"
                className="mx-auto h-auto w-full max-w-[520px] select-none drop-shadow-[0_36px_46px_rgba(120,40,40,0.2)]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ------------------------------- trusted by ------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-10 rounded-3xl border border-white bg-white/90 px-5 py-6 shadow-[0_24px_60px_-32px_rgba(80,30,30,0.35)] lg:px-8"
        >
          <div className="grid items-center gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
            <div className="flex items-center gap-4">
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-white shadow-[0_14px_30px_-12px_rgba(217,43,50,0.55)] ring-1 ring-[#f3d3d5]">
                <span className="scale-[0.62]">
                  <CakeMark />
                </span>
              </span>
              <div>
                <h3 className="font-playfair text-[20px] font-bold leading-tight text-[#0f1a2e]">
                  Trusted by businesses
                  <br />
                  <span style={{ color: RED }}>across industries.</span>
                </h3>
                <p className="mt-1.5 max-w-[250px] text-[11px] leading-relaxed text-slate-500">
                  Long-term partnerships built on trust, quality and results.
                </p>
              </div>
            </div>

            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
              {CLIENTS.map((c) => (
                <li key={c.name} className={`text-slate-500 ${c.cls}`}>
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ------------------------------- CTA bar ------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-5 rounded-3xl border border-[#f4dcdc] bg-[#fffafa] px-5 py-5 shadow-[0_20px_50px_-32px_rgba(80,30,30,0.3)] lg:px-8"
        >
          <div className="grid items-center gap-5 lg:grid-cols-[auto_auto_1fr] lg:gap-8">
            <div className="flex items-center gap-4">
              <Image
                src={CAKE_IMAGE}
                alt=""
                width={1351}
                height={1164}
                sizes="96px"
                className="h-auto w-[86px] select-none drop-shadow-[0_14px_16px_rgba(120,40,40,0.2)]"
              />
              <div>
                <h3 className="text-[17px] font-bold leading-tight text-[#0f1a2e]">Have a project in mind?</h3>
                <p className="mt-1 text-[12px] text-slate-500">Let&apos;s build something amazing with CakePHP.</p>
              </div>
            </div>

            <Link
              href="#contact"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-lg px-6 text-sm font-semibold text-white shadow-[0_14px_28px_-10px_rgba(217,43,50,0.7)] transition hover:brightness-110"
              style={{ background: RED }}
            >
              Let&apos;s Talk About Your Project
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
              <li>
                <a href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} className="group flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#f3d3d5] bg-white text-[#d92b32] transition-colors group-hover:bg-[#d92b32] group-hover:text-white">
                    <svg {...I} className="h-4 w-4">
                      <path d="M5 4h3.5l1.7 4-2.2 1.4a11 11 0 005.6 5.6L15 12.8l4 1.7V18a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold text-slate-400">Call Us</span>
                    <span className="block text-[12.5px] font-semibold text-[#0f1a2e]">{PHONE}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="group flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[#f3d3d5] bg-white text-[#d92b32] transition-colors group-hover:bg-[#d92b32] group-hover:text-white">
                    <svg {...I} className="h-4 w-4">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3.5 7l8.5 6 8.5-6" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold text-slate-400">Email Us</span>
                    <span className="block text-[12.5px] font-semibold text-[#0f1a2e]">{EMAIL}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
