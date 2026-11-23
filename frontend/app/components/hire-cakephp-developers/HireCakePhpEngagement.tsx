"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import DottedMap from "dotted-map/without-countries";
import Container from "../shared/Container";
import WORLD_DOT_MAP from "../shared/worldDotMap";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";
const INK = "#0f1a2e";
const CAKE = "/Red Velvet Layer Cake Cutaway.webp";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.09 * i, ease: EASE } }),
};

const worldMap = new DottedMap({ map: JSON.parse(WORLD_DOT_MAP) });
const MAP_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  worldMap.getSVG({ shape: "circle", color: "#e3b9bb", radius: 0.32, backgroundColor: "transparent" }),
)}`;

const I = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

const Arrow = ({ cls = "h-4 w-4" }: { cls?: string }) => (
  <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14 6 20 12 14 18" />
  </svg>
);

const Tick = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-[#d92b32]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.2 12.3l2.5 2.5 4.8-5" />
  </svg>
);

/* ------------------------------ data ------------------------------ */
const PERKS = [
  {
    label: "No Hidden Costs",
    icon: (
      <svg {...I} className="h-4 w-4">
        <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" />
        <path d="M9 12h6" />
      </svg>
    ),
  },
  {
    label: "Quick Onboarding",
    icon: (
      <svg {...I} className="h-4 w-4">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M8.5 3v4M15.5 3v4" />
      </svg>
    ),
  },
  {
    label: "Risk-Free Start",
    icon: (
      <svg {...I} className="h-4 w-4">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.3 12.3l2.5 2.5 4.9-5.2" />
      </svg>
    ),
  },
];

const CHIPS = [
  {
    label: "CakePHP\nExperts",
    pos: "left-[4%] top-[8%]",
    d: "M 118 64 C 150 64, 160 100, 200 112",
    icon: (<svg {...I}><path d="M8.5 8L4 12l4.5 4M15.5 8L20 12l-4.5 4M13.5 5.5l-3 13" /></svg>),
  },
  {
    label: "Secure\nCode",
    pos: "left-[4%] top-[58%]",
    d: "M 118 214 C 150 214, 160 170, 205 150",
    icon: (<svg {...I}><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5M12 14.5v2" /></svg>),
  },
  {
    label: "Scalable\nSolutions",
    pos: "right-[4%] top-[2%]",
    d: "M 522 56 C 490 60, 480 96, 440 112",
    icon: (<svg {...I}><path d="M12 3c3.5 2 5 5.5 4.5 9.5L12 17l-4.5-4.5C7 8.5 8.5 5 12 3z" /><circle cx="12" cy="9.5" r="1.6" /><path d="M7.5 14.5L5 17l3-.5M16.5 14.5L19 17l-3-.5" /></svg>),
  },
  {
    label: "High\nPerformance",
    pos: "right-[0%] top-[52%]",
    d: "M 540 196 C 500 196, 485 160, 440 148",
    icon: (<svg {...I}><path d="M4.5 16.5a8 8 0 1115 0" /><path d="M12 14l4-4.5" /><circle cx="12" cy="14" r="1.2" /></svg>),
  },
];

const MODELS = [
  {
    num: "01",
    title: "Dedicated Developer",
    text: "Hire a dedicated CakePHP developer who works exclusively on your project as an extension of your team.",
    checks: ["Full-time resources", "Flexible monthly terms", "Direct communication", "Complete control"],
    cta: "Learn More",
    popular: false,
    icon: (
      <svg {...I} className="h-7 w-7">
        <circle cx="10" cy="8.5" r="3.6" />
        <path d="M3.5 20c.4-3.6 3-5.6 6.5-5.6 1.3 0 2.4.3 3.4.8" />
        <path d="M18 13.5l1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2-1.6-1.6 2.2-.3 1-2z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Dedicated Team",
    text: "A full-stack CakePHP team with the right skills to design, develop and scale your application.",
    checks: ["Cross-functional team", "Agile delivery", "Scalable resources", "Transparent workflow"],
    cta: "Discuss This Model",
    popular: true,
    icon: (
      <svg {...I} className="h-7 w-7">
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19.5c.3-3 2.7-4.8 5.5-4.8s5.2 1.8 5.5 4.8" />
        <circle cx="17" cy="9.5" r="2.4" />
        <path d="M16 14.8c2.4-.2 4.2 1.3 4.5 4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Project-Based",
    text: "Fixed scope, timeline and cost. Ideal for well-defined CakePHP projects and specific deliverables.",
    checks: ["Fixed price & timeline", "Quality assurance", "Milestone-based delivery", "On-time delivery"],
    cta: "Learn More",
    popular: false,
    icon: (
      <svg {...I} className="h-7 w-7">
        <path d="M5 4.5h8l5 5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 014 19.5v-14A1 1 0 015 4.5z" />
        <path d="M13 4.5v5h5M8 14h7M8 17.5h5" />
      </svg>
    ),
  },
];

const PROMISES = [
  { t: "No obligation, just expert advice", icon: (<svg {...I} className="h-4 w-4"><path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></svg>) },
  { t: "Strictly confidential information", icon: (<svg {...I} className="h-4 w-4"><circle cx="12" cy="12" r="3" /><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /></svg>) },
  { t: "We respect your time", icon: (<svg {...I} className="h-4 w-4"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>) },
];

const SELECT = ["Dedicated Developer", "Dedicated Team", "Project-Based", "Not sure yet"];

/* ------------------------------ form ------------------------------ */
type Status = "idle" | "submitting" | "success" | "error";

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="group relative block">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#d92b32]">{icon}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border border-[#eddcdc] bg-white py-2.5 pl-9 pr-3 text-[12.5px] text-slate-700 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#d92b32] focus:shadow-[0_0_0_3px_rgba(217,43,50,0.12)]";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const name = get("name");
    const email = get("email");

    if (!name) {
      setStatus("error");
      setMessage("Please tell us your name.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid work email.");
      return;
    }

    // The leads API stores one free-text "idea" (10–500 chars) + email, so fold the other fields into it.
    const parts = [
      `${name}${get("company") ? ` (${get("company")})` : ""}`,
      get("phone") && `Phone: ${get("phone")}`,
      get("hire") && `Wants to hire: ${get("hire")}`,
      get("project") && `Project: ${get("project")}`,
    ].filter(Boolean);
    const idea = `CakePHP page enquiry — ${parts.join(" · ")}`.slice(0, 500);

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email, source: "hire-cakephp-developers", website: get("website") }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof TypeError ? "We couldn't reach our server. Please try again or call us." : (err as Error).message,
      );
    }
  }

  const sending = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="contents">
      {/* honeypot: real users never see this */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      <div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field icon={<svg {...I} className="h-4 w-4"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.5-3.5 3.3-5.5 7-5.5s6.5 2 7 5.5" /></svg>}>
            <input name="name" placeholder="Full Name" autoComplete="name" className={inputCls} />
          </Field>
          <Field icon={<svg {...I} className="h-4 w-4"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></svg>}>
            <input name="email" type="email" placeholder="Work Email" autoComplete="email" className={inputCls} />
          </Field>
          <Field icon={<svg {...I} className="h-4 w-4"><rect x="4.5" y="4" width="15" height="16.5" rx="1.5" /><path d="M8.5 8h2M13.5 8h2M8.5 12h2M13.5 12h2M10 20.5v-3h4v3" /></svg>}>
            <input name="company" placeholder="Company Name" autoComplete="organization" className={inputCls} />
          </Field>
          <Field icon={<svg {...I} className="h-4 w-4"><path d="M6.5 4h3l1.5 4-2 1.3a10 10 0 005.7 5.7L16 13l4 1.5v3a2 2 0 01-2.2 2A15 15 0 014.5 6.2 2 2 0 016.5 4z" /></svg>}>
            <input name="phone" type="tel" placeholder="Phone Number" autoComplete="tel" className={inputCls} />
          </Field>
        </div>
        <div className="mt-3">
          <Field icon={<svg {...I} className="h-4 w-4"><circle cx="12" cy="12" r="8.5" /><path d="M12 8v4l2.5 1.5" /></svg>}>
            <select name="hire" defaultValue="" className={`${inputCls} appearance-none text-slate-500`}>
              <option value="" disabled>I want to hire for</option>
              {SELECT.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </Field>
        </div>
        <textarea
          name="project"
          rows={3}
          maxLength={300}
          placeholder="Tell us about your project..."
          className="mt-3 w-full resize-none rounded-md border border-[#eddcdc] bg-white px-3.5 py-2.5 text-[12.5px] text-slate-700 outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 focus:border-[#d92b32] focus:shadow-[0_0_0_3px_rgba(217,43,50,0.12)]"
        />
        <p role="status" aria-live="polite" className={`mt-2 min-h-[1.25rem] text-[12px] font-medium ${status === "error" ? "text-[#d92b32]" : "text-emerald-600"}`}>
          {status === "success" ? "Thank you! We'll get back to you within 24 hours." : message}
        </p>
      </div>

      <div className="flex flex-col justify-center lg:pl-6">
        <div>
          <SubmitButton sending={sending} />
        </div>
        <ul className="mt-5 space-y-3.5 lg:mt-6">
          {PROMISES.map((p, i) => (
            <motion.li
              key={p.t}
              className="flex items-center gap-2.5 text-[12px] font-medium text-slate-700"
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12 }}
            >
              <span className="text-[#d92b32]">{p.icon}</span>
              {p.t}
            </motion.li>
          ))}
        </ul>
      </div>
    </form>
  );
}

function SubmitButton({ sending }: { sending: boolean }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-md px-7 py-3 text-[13px] font-semibold text-white shadow-[0_14px_26px_-10px_rgba(217,43,50,0.85)] transition-transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
      style={{ background: RED }}
    >
      <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{sending ? "Sending…" : "Get Free Consultation"}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1"><Arrow /></span>
    </button>
  );
}

/* ------------------------------ section ------------------------------ */
export default function HireCakePhpEngagement() {
  const reduce = useReducedMotion();

  return (
    <section id="cakephp-contact" className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#fdf8f8_100%)] py-14 sm:py-20">
      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ top ------------------------------ */}
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]"
              style={{ color: RED }}
            >
              Engagement Models
              <i aria-hidden className="h-px w-9" style={{ background: RED, opacity: 0.45 }} />
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-5 font-playfair text-[34px] font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[50px]"
              style={{ color: INK }}
            >
              Hire the way
              <br />
              your <span style={{ color: RED }}>project</span> needs.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-slate-600">
              Flexible engagement models to match your goals, timeline and budget.
            </motion.p>
            <motion.ul variants={fadeUp} custom={3} className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {PERKS.map((p) => (
                <li key={p.label} className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                  <span className="text-[#d92b32]">{p.icon}</span>
                  {p.label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* cake + chips */}
          <div className="relative mx-auto hidden h-[270px] w-full max-w-[640px] sm:block">
            <svg viewBox="0 0 640 270" className="pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
              {[150, 205, 260].map((rx, i) => (
                <ellipse key={rx} cx="320" cy="170" rx={rx} ry={rx * 0.3} stroke="#efd3d4" strokeOpacity={0.9 - i * 0.25} />
              ))}
              {CHIPS.map((c, i) => (
                <g key={c.label}>
                  <motion.path
                    d={c.d}
                    stroke={RED}
                    strokeOpacity="0.6"
                    strokeWidth="1.3"
                    strokeDasharray="2 5"
                    strokeLinecap="round"
                    initial={{ pathLength: reduce ? 1 : 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15 }}
                  />
                </g>
              ))}
              {[
                [200, 112],
                [205, 150],
                [440, 112],
                [440, 148],
              ].map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="3" fill={RED} />
                  {!reduce && (
                    <circle cx={x} cy={y} r="3" fill={RED}>
                      <animate attributeName="r" values="3;9;3" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.55;0;0.55" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            <motion.div
              className="absolute left-1/2 top-[6%] w-[210px] -translate-x-1/2"
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
            >
              <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <Image src={CAKE} alt="" width={1351} height={1164} sizes="220px" className="h-auto w-full select-none drop-shadow-[0_26px_30px_rgba(120,40,40,0.22)]" />
              </motion.div>
            </motion.div>

            {CHIPS.map((c, i) => (
              <motion.div
                key={c.label}
                className={`absolute z-10 ${c.pos}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: EASE }}
              >
                <motion.div
                  className="flex h-[66px] w-[88px] flex-col items-center justify-center gap-1 rounded-xl bg-white text-center text-[#d92b32] shadow-[0_16px_30px_-14px_rgba(217,43,50,0.45)] ring-1 ring-[#f3e2e3]"
                  animate={reduce ? undefined : { y: [0, i % 2 ? 5 : -5, 0] }}
                  transition={{ duration: 4.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.07 }}
                >
                  {c.icon}
                  <span className="whitespace-pre-line text-[9px] font-semibold leading-tight text-slate-700">{c.label}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ----------------------------- models ----------------------------- */}
        <ul className="relative mt-10 grid gap-6 pt-2 md:grid-cols-3 lg:gap-8">
          {MODELS.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.12 * i, ease: EASE }}
              className={`group relative flex flex-col rounded-2xl border bg-white p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-2 ${
                m.popular
                  ? "border-[#e35b61] shadow-[0_30px_60px_-30px_rgba(217,43,50,0.5)]"
                  : "border-[#f0e6e6] shadow-[0_22px_50px_-32px_rgba(80,30,30,0.35)] hover:shadow-[0_30px_60px_-30px_rgba(217,43,50,0.35)]"
              }`}
            >
              {m.popular && (
                <motion.span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md px-4 py-1 text-[11px] font-semibold text-white"
                  style={{ background: RED }}
                  animate={reduce ? undefined : { y: [0, -2, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                >
                  Most Popular
                </motion.span>
              )}
              <div className="flex gap-5">
                <span className="grid h-[64px] w-[64px] shrink-0 place-items-center rounded-full border border-[#f3d3d5] bg-[#fff4f4] text-[#d92b32] transition-colors duration-300 group-hover:bg-[#d92b32] group-hover:text-white">
                  {m.icon}
                </span>
                <div>
                  <span className="text-[26px] font-light leading-none text-slate-300 transition-colors group-hover:text-[#e9a3a6]" style={m.popular ? { color: RED } : undefined}>
                    {m.num}
                  </span>
                  <h3 className="mt-1 font-playfair text-[19px] font-bold leading-tight" style={{ color: INK }}>{m.title}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">{m.text}</p>
                </div>
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5">
                {m.checks.map((c) => (
                  <li key={c} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <Tick />
                    {c}
                  </li>
                ))}
              </ul>
              <Link href="#cakephp-form" className="group/l mt-auto inline-flex items-center gap-2 pt-6 text-[12.5px] font-semibold" style={{ color: RED }}>
                {m.cta}
                <span className="transition-transform duration-300 group-hover/l:translate-x-1.5"><Arrow cls="h-3.5 w-3.5" /></span>
              </Link>

              {/* connector arrows between cards (desktop) */}
              {i < MODELS.length - 1 && (
                <span aria-hidden className="absolute -right-[1.15rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-[#f3d3d5] bg-white text-[#d92b32] shadow-md md:grid lg:-right-[1.35rem]">
                  <Arrow cls="h-3.5 w-3.5" />
                </span>
              )}
            </motion.li>
          ))}
        </ul>

        {/* ------------------------------ form panel ------------------------------ */}
        <motion.div
          id="cakephp-form"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-10 overflow-hidden rounded-3xl bg-[linear-gradient(120deg,#fdf0f0_0%,#fceaea_100%)] p-6 lg:p-9"
        >
          {/* dotted world map, pinned */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] opacity-80 lg:block [mask-image:linear-gradient(to_left,black_55%,transparent)]"
            style={{ backgroundImage: `url("${MAP_URI}")`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right center" }}
          />
          <span aria-hidden className="pointer-events-none absolute bottom-[18%] right-[11%] hidden lg:block">
            <span className="relative block h-4 w-4 rounded-full bg-[#d92b32] shadow-[0_0_0_5px_rgba(217,43,50,0.18)]">
              {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#d92b32]/60" />}
            </span>
          </span>

          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.25fr_0.85fr] lg:gap-10">
            <div>
              <h3 className="font-playfair text-[24px] font-bold leading-[1.2] sm:text-[27px]" style={{ color: INK }}>
                Ready to build something
                <br />
                amazing with <span style={{ color: RED }}>CakePHP?</span>
              </h3>
              <p className="mt-3 max-w-[260px] text-[12.5px] leading-relaxed text-slate-500">
                Let&apos;s discuss your idea and create a solution that drives real impact.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { t: "Response within", b: "24 Hours", icon: (<svg {...I}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>) },
                  { t: "Free Consultation", b: "& Project Estimate", icon: (<svg {...I}><path d="M4 6.5a2 2 0 012-2h8a2 2 0 012 2V11a2 2 0 01-2 2H9l-3 2.5V13a2 2 0 01-2-2V6.5z" /><path d="M17 9h1a2 2 0 012 2v4a2 2 0 01-2 2h-.5v2.5L14.5 17H11" /></svg>) },
                ].map((c) => (
                  <div key={c.t} className="flex items-center gap-2.5 rounded-lg bg-white/80 px-3 py-2 ring-1 ring-[#f3dcdc]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fdeeee] text-[#d92b32]">{c.icon}</span>
                    <p className="text-[10.5px] leading-tight text-slate-500">
                      {c.t}
                      <br />
                      <b className="text-[11px] text-slate-700">{c.b}</b>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
