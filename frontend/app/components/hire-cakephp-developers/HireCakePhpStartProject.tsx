"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";

const RED = "#d92b32";
const INK = "#0f1a2e";
const PEDESTAL = "/cakephp-pedestal-logo.png"; // transparent cut-out of the CakePHP logo (no baked-in labels or backdrop)
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------ 3 Options Data ------------------------------ */
const PROJECT_TYPES = [
  {
    id: "project",
    label1: "I have",
    label2: "a project",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 00-7 7c0 2.6 1.4 4.8 3.5 6h7c2.1-1.2 3.5-3.4 3.5-6a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: "developer",
    label1: "I need a",
    label2: "CakePHP developer",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    id: "existing",
    label1: "I have an",
    label2: "existing app",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2" />
      </svg>
    ),
  },
];

/* ------------------------------ Left 3 Mini Features ------------------------------ */
const MINI_FEATURES = [
  {
    title: "Secure",
    sub: "by default",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Blazing",
    sub: "performance",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l4-4" />
        <path d="M3.34 19a10 10 0 1117.32 0" />
      </svg>
    ),
  },
  {
    title: "Scalable",
    sub: "architecture",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

/* ------------------------------ Bottom Process Steps ------------------------------ */
const PROCESS_STEPS = [
  {
    title: "Understand",
    sub: "your goals",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d92b32]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="m19 5-4.5 4.5" />
        <path d="M19 8.5V5h-3.5" />
      </svg>
    ),
  },
  {
    title: "Build",
    sub: "clean, scalable\ncode",
    icon: (
      <span className="font-mono text-[14px] font-black tracking-tighter text-[#d92b32]">
        &lt;/&gt;
      </span>
    ),
  },
  {
    title: "Deliver",
    sub: "tested, deployed,\non time",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d92b32]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-3.05 11a22 22 0 01-3.95 2L12 15z" />
        <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Support",
    sub: "ongoing, always\nthere",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#d92b32]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0118 0v6" />
        <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
        <path d="M18 19a3 3 0 01-3 3h-1" />
      </svg>
    ),
  },
];

export default function HireCakePhpStartProject() {
  const reduce = useReducedMotion();
  const [projectType, setProjectType] = useState<string>("project");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string>("");

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name) {
      setStatus("error");
      setFeedback("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const idea = `[CakePHP Start Project - ${projectType.toUpperCase()}] ${name} (${email}): ${message || "Interested in CakePHP development"}`;
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, idea }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      setFeedback("Thank you! Our CakePHP expert will contact you within 24 hours.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please email us directly or try again.");
    }
  }

  return (
    <section
      id="start-project"
      className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfe_100%)] py-16 sm:py-24 font-sans"
    >
      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ 3-COLUMN HERO GRID ------------------------------ */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1fr_0.98fr] xl:gap-10">
          {/* ----------------- Left Column ----------------- */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: RED }}>
                CAKEPHP EXPERTISE
              </span>
              <span className="h-[1.5px] w-7 opacity-60" style={{ background: RED }} />
            </div>

            <h2
              className="mt-4 text-[42px] font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-[50px] xl:text-[54px]"
              style={{ color: INK }}
            >
              Build it.
              <br />
              The <span style={{ color: RED }}>right</span>
              <br />
              way.
            </h2>

            <p className="mt-4 max-w-[320px] text-[13.5px] leading-relaxed text-slate-600">
              Premium CakePHP development that&apos;s{" "}
              <span className="font-semibold" style={{ color: RED }}>
                secure, scalable
              </span>{" "}
              and built to grow your ideas.
            </p>

            <span
              className="mt-3 block h-[2px] w-8 origin-left"
              style={{ background: RED }}
            />

            {/* 3 mini feature cards below */}
            <div className="mt-8 grid w-full max-w-[340px] grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
              {MINI_FEATURES.map((f) => (
                <div key={f.title} className="flex flex-col items-center text-center">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#fdeeee] text-[#d92b32]">
                    {f.icon}
                  </span>
                  <p className="mt-1.5 text-[11px] font-bold leading-tight" style={{ color: INK }}>
                    {f.title}
                  </p>
                  <p className="text-[9.5px] leading-tight text-slate-500">{f.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ----------------- Center Column: Code Editor + 3D Pedestal + Orbit Badges ----------------- */}
          <div className="relative mx-auto h-[480px] w-full max-w-[420px]">
            {/* 1. Code Editor Window (in background of pedestal) */}
            <div className="absolute top-0 z-0 w-full overflow-hidden rounded-[26px] border border-slate-100 bg-white/95 p-5 pb-16 shadow-[0_20px_50px_-20px_rgba(15,26,46,0.08)] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-100/90 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                </div>
                <div className="flex items-center gap-1.5 text-[12px] font-bold">
                  <span className="text-[#0f1a2e]">Cake</span>
                  <span className="text-[#d92b32]">PHP</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d92b32]" />
                </div>
              </div>
              <pre className="mt-3.5 font-mono text-[11.5px] leading-[1.65] text-slate-700">
                <code>
                  <span className="mr-3 select-none text-slate-300">1</span>  <span className="text-[#0066cc]">class</span> <span className="font-semibold text-[#0f1a2e]">UsersController</span> <span className="text-[#0066cc]">extends</span> <span className="font-semibold text-[#0f1a2e]">AppController</span> &#123;{"\n"}
                  <span className="mr-3 select-none text-slate-300">2</span>      <span className="text-[#0066cc]">public function</span> <span className="text-[#7c3aed]">index</span>() &#123;{"\n"}
                  <span className="mr-3 select-none text-slate-300">3</span>          <span className="text-[#0f1a2e]">$users</span> = <span className="text-[#0f1a2e]">$this</span>-&gt;Users-&gt;<span className="text-[#0066cc]">find</span>(<span className="font-medium text-[#d92b32]">&apos;all&apos;</span>);{"\n"}
                  <span className="mr-3 select-none text-slate-300">4</span>          <span className="text-[#0f1a2e]">$this</span>-&gt;<span className="text-[#0066cc]">set</span>(<span className="text-[#0066cc]">compact</span>(<span className="font-medium text-[#d92b32]">&apos;users&apos;</span>));{"\n"}
                  <span className="mr-3 select-none text-slate-300">5</span>      &#125;{"\n"}
                  <span className="mr-3 select-none text-slate-300">6</span>  &#125;
                </code>
              </pre>
            </div>

            {/* 2. Platform the logo stands on (drawn in CSS so it is crisp and has no image backdrop) */}
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-[330px] z-[5] h-[96px] w-[300px] -translate-x-1/2">
              <motion.span
                className="absolute -inset-x-[12%] inset-y-0 rounded-[50%] bg-[radial-gradient(ellipse,rgba(255,168,174,0.55)_0%,transparent_68%)] blur-md"
                animate={reduce ? undefined : { opacity: [0.65, 1, 0.65], scaleX: [0.96, 1.05, 0.96] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="absolute inset-x-[4%] top-[16%] h-[68%] rounded-[50%] border border-white bg-[linear-gradient(180deg,#ffffff_0%,#eeecf2_100%)] shadow-[0_22px_34px_-14px_rgba(15,26,46,0.28),inset_0_-3px_0_rgba(244,170,176,0.9)]" />
              <span className="absolute inset-x-[16%] top-[30%] h-[42%] rounded-[50%] border border-[#f3cfd2]/80" />
            </div>

            {/* 3. SVG Circular Orbit Ring */}
            <svg viewBox="0 0 420 280" className="pointer-events-none absolute left-0 top-[214px] z-10 h-[280px] w-full select-none" fill="none" aria-hidden>
              <path id="cakeStartOrbit" d="M 55 165 a 155 80 0 1 0 310 0 a 155 80 0 1 0 -310 0" stroke="#f3cfd2" strokeWidth="1.2" strokeDasharray="4 6" />
              {[
                [78, 118],
                [342, 118],
                [96, 214],
                [324, 214],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill="#d92b32" />
                  {!reduce && (
                    <circle cx={x} cy={y} r="3" fill="#d92b32" opacity="0.5">
                      <animate attributeName="r" values="3;10;3" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}
              {!reduce && (
                <circle r="4" fill="#ff5a5f" style={{ filter: "drop-shadow(0 0 6px rgba(255,90,95,0.9))" }}>
                  <animateMotion dur="12s" repeatCount="indefinite" path="M 55 165 a 155 80 0 1 0 310 0 a 155 80 0 1 0 -310 0" />
                </circle>
              )}
            </svg>

            {/* 4. The CakePHP logo, standing on the platform — kept below the last code line */}
            <div className="absolute left-1/2 top-[192px] z-20 -translate-x-1/2 select-none">
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={PEDESTAL}
                  alt="CakePHP logo"
                  width={390}
                  height={378}
                  sizes="220px"
                  className="h-auto w-[200px] select-none drop-shadow-[0_26px_26px_rgba(217,43,50,0.22)] sm:w-[216px]"
                  priority
                />
              </motion.div>
            </div>

            {/* 5. Three floating badges */}
            {/* Left: SECURE (Vertical Square Card) */}
            <div className="absolute bottom-24 left-1 z-30 flex h-[70px] w-[70px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-100/90 bg-white shadow-[0_12px_28px_-6px_rgba(15,26,46,0.12)] sm:bottom-28 sm:left-2 sm:h-[74px] sm:w-[74px]">
              <span className="text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-[#0f1a2e]">SECURE</span>
            </div>

            {/* Bottom: SCALABLE (Horizontal Pill Card) */}
            <div className="absolute -bottom-1 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-2xl border border-slate-100/90 bg-white px-4 py-2.5 shadow-[0_12px_28px_-6px_rgba(15,26,46,0.12)] sm:bottom-0">
              <span className="text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </span>
              <span className="text-[11px] font-extrabold tracking-wider text-[#0f1a2e]">SCALABLE</span>
            </div>

            {/* Right: FAST (Vertical Square Card) */}
            <div className="absolute bottom-24 right-1 z-30 flex h-[70px] w-[70px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-100/90 bg-white shadow-[0_12px_28px_-6px_rgba(15,26,46,0.12)] sm:bottom-28 sm:right-2 sm:h-[74px] sm:w-[74px]">
              <span className="text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-[#0f1a2e]">FAST</span>
            </div>
          </div>

          {/* ----------------- Right Column: "Start your project" Card ----------------- */}
          <div className="relative rounded-3xl border border-slate-100 bg-white p-6 pt-9 shadow-[0_24px_60px_-20px_rgba(15,26,46,0.08)] sm:p-7 sm:pt-9">
            {/* Top Floating CakePHP Badge */}
            <div className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-white shadow-lg ring-4 ring-[#fff5f5]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#fdeeee] text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <ellipse cx="12" cy="7" rx="8" ry="3" />
                  <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" />
                  <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" />
                </svg>
              </span>
            </div>

            <h3 className="text-center font-bold text-[22px] sm:text-[24px]" style={{ color: INK }}>
              Start your <span style={{ color: RED }}>project</span>
            </h3>

            <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              WHAT BRINGS YOU HERE?
            </p>

            {/* 3 Selectable Options */}
            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {PROJECT_TYPES.map((pt) => {
                const active = projectType === pt.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setProjectType(pt.id)}
                    className={`relative flex flex-col items-center rounded-xl border p-2.5 text-center transition-all duration-300 ${
                      active
                        ? "border-[#f8c9cb] bg-[#fffbfb] shadow-sm ring-1 ring-[#f8c9cb]"
                        : "border-slate-100 bg-white hover:border-[#f8c9cb] hover:bg-[#fffbfb]"
                    }`}
                  >
                    {active && (
                      <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#d92b32] text-white">
                        <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg transition-colors ${
                        active ? "text-[#d92b32]" : "text-slate-500"
                      }`}
                    >
                      {pt.icon}
                    </span>
                    <span className="mt-1 text-[10px] font-bold leading-tight" style={{ color: INK }}>
                      {pt.label1}
                      <br />
                      {pt.label2}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleFormSubmit} className="mt-4 flex flex-col gap-2.5">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 py-2.5 pl-9 pr-3 text-[12px] text-slate-800 placeholder-slate-400 transition-all focus:border-[#d92b32] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d92b32]"
                />
              </div>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-200/80 bg-slate-50/50 py-2.5 pl-9 pr-3 text-[12px] text-slate-800 placeholder-slate-400 transition-all focus:border-[#d92b32] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d92b32]"
                />
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Tell us a little about your project..."
                  className="w-full resize-none rounded-xl border border-slate-200/80 bg-slate-50/50 p-2.5 pr-8 text-[12px] text-slate-800 placeholder-slate-400 transition-all focus:border-[#d92b32] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#d92b32]"
                />
                <span className="pointer-events-none absolute right-3 top-3 text-slate-400">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </span>
              </div>

              {feedback && (
                <p className={`text-[11px] ${status === "success" ? "text-emerald-600" : "text-[#d92b32]"}`}>
                  {feedback}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d92b32] to-[#b91c22] py-3 text-[13px] font-bold text-white shadow-[0_12px_24px_-6px_rgba(217,43,50,0.65)] transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-60"
              >
                <span>{status === "loading" ? "Submitting..." : "Let's Build It"}</span>
                <span>→</span>
              </button>
            </form>

            {/* Bottom Security Note */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] font-medium text-slate-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>No spam. Just real conversations.</span>
            </div>
          </div>
        </div>

        {/* ------------------------------ BOTTOM PROCESS CAPSULE ------------------------------ */}
        <div className="mt-14 w-full overflow-hidden rounded-[28px] border border-slate-100/90 bg-white shadow-[0_16px_50px_-20px_rgba(15,26,46,0.08)]">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between">
            {/* Left Block */}
            <div className="flex items-center justify-between gap-6 px-6 py-4.5 lg:py-3.5 lg:pl-8 shrink-0">
              <div className="text-left">
                <p className="text-[13.5px] font-bold leading-[1.25] text-[#0f1a2e]">
                  From concept
                  <br />
                  to code.
                </p>
                <p className="mt-1 text-[12px] font-bold text-[#d92b32]">
                  We own the journey.
                </p>
              </div>
              <span aria-hidden className="hidden h-9 w-px bg-slate-200/90 lg:block" />
            </div>

            {/* 4 Process Steps */}
            <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-4 sm:gap-4 lg:flex-nowrap lg:gap-5 lg:px-2 lg:py-3.5">
              {PROCESS_STEPS.map((step, idx) => (
                <React.Fragment key={step.title}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-slate-100 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.06)] text-[#d92b32]">
                      {step.icon}
                    </span>
                    <div className="text-left leading-tight">
                      <p className="text-[12px] font-bold text-[#0f1a2e]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 whitespace-pre-line text-[10px] leading-[1.3] text-slate-500">
                        {step.sub}
                      </p>
                    </div>
                  </div>

                  {idx < PROCESS_STEPS.length - 1 && (
                    <span aria-hidden className="hidden text-slate-300 lg:inline-block px-1">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <polyline points="13 6 19 12 13 18" />
                      </svg>
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right Dark Red Card */}
            <div className="relative flex items-center justify-between gap-5 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,#ff2d3d_0%,#9e111a_42%,#2e0408_100%)] px-6 py-4.5 text-white lg:min-w-[275px] lg:rounded-l-[22px] lg:px-7 lg:py-3.5">
              <div className="flex flex-col text-left">
                <p className="text-[12px] font-medium leading-[1.3] text-white/95">
                  Your idea deserves
                </p>
                <p className="text-[12px] font-medium leading-[1.3] text-white/95">
                  the <span className="font-bold text-[#ff5a5f]">right</span> technology
                </p>
                <p className="text-[12px] font-medium leading-[1.3] text-white/95">
                  partner.
                </p>
              </div>
              <Link
                href="#start-project"
                aria-label="Start your project"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 bg-black/20 text-white/90 shadow-sm transition-transform hover:scale-105 hover:bg-black/35"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
