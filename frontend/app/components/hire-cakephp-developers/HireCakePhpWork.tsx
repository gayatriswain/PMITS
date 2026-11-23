"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import Container from "../shared/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";
const INK = "#0f1a2e";
const CAKE_IMAGE = "/Red Velvet Layer Cake Cutaway.webp";

/** Size helper: the laptop screens are built in container-query units so the mock UI scales with the card. */
const cq = (n: number) => `${n}cqw`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.09 * i, ease: EASE } }),
};

/* ------------------------------------------------------------------ */
/*  small helpers                                                      */
/* ------------------------------------------------------------------ */
function Count({ to, prefix = "", suffix = "", decimals = 0 }: { to: number; prefix?: string; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [inView, reduce, to]);

  const text = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

function Bar({ w, color, delay = 0 }: { w: number; color: string; delay?: number }) {
  return (
    <span className="block overflow-hidden rounded-full bg-slate-200/80" style={{ height: cq(0.9) }}>
      <motion.span
        className="block h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${w}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 + delay, ease: EASE }}
      />
    </span>
  );
}

/** Laptop: dark bezel + screen (a size container) + metal base. */
function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[86%]">
      <div className="rounded-t-[10px] bg-[#1a1f29] p-[3px] pb-0 shadow-[0_22px_34px_-14px_rgba(0,0,0,0.45)]">
        <div className="aspect-[16/10] overflow-hidden rounded-t-[7px] bg-white [container-type:inline-size]">{children}</div>
      </div>
      <div className="-mx-[4%] h-[7px] rounded-b-[10px] bg-gradient-to-b from-[#d4d8de] to-[#9ca3af]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mock screens                                                       */
/* ------------------------------------------------------------------ */
function StoreScreen() {
  const nav = ["Women", "Men", "Kids", "Beauty", "Sale"];
  return (
    <div className="relative h-full w-full bg-[#f4f3f1] text-[#222]" style={{ fontSize: cq(2) }}>
      <div className="flex items-center justify-between" style={{ padding: `${cq(2)} ${cq(4)}` }}>
        <span className="font-bold tracking-[0.3em]" style={{ fontSize: cq(2.6) }}>LUXORA</span>
        <span className="flex text-[#555]" style={{ gap: cq(2.2) }}>
          {nav.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
        <span className="flex" style={{ gap: cq(1.4) }}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="rounded-full bg-[#333]/70" style={{ width: cq(1.6), height: cq(1.6) }} />
          ))}
        </span>
      </div>

      {/* hero */}
      <div className="absolute right-0 overflow-hidden" style={{ top: cq(7), width: "52%", height: cq(34) }}>
        <Image src="/case-luxera.jpg" alt="" fill sizes="200px" className="origin-[55%_58%] scale-[1.25] object-cover" style={{ objectPosition: "50% 58%" }} />
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-[#f4f3f1] via-transparent to-transparent"
        />
      </div>
      <div className="absolute" style={{ left: cq(4), top: cq(14) }}>
        <motion.p
          className="font-playfair leading-[1.05] text-[#111]"
          style={{ fontSize: cq(6.2) }}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          New
          <br />
          Collection
        </motion.p>
        <p className="text-[#666]" style={{ marginTop: cq(1.6), fontSize: cq(1.9) }}>Spring / Summer 2024</p>
        <span className="inline-block rounded-sm bg-[#111] text-white" style={{ marginTop: cq(2.4), padding: `${cq(1.1)} ${cq(2.8)}`, fontSize: cq(1.8) }}>
          Shop Now
        </span>
      </div>

      {/* products */}
      <div className="absolute grid grid-cols-3" style={{ left: cq(4), right: cq(4), bottom: cq(2.5), gap: cq(2) }}>
        {[
          <svg key="bag" viewBox="0 0 40 30" className="h-full"><path d="M8 11h24l2 16H6l2-16z" fill="#c9a889" /><path d="M14 11a6 6 0 0112 0" fill="none" stroke="#8a6d52" strokeWidth="1.6" /></svg>,
          <svg key="watch" viewBox="0 0 40 30" className="h-full"><rect x="16" y="2" width="8" height="26" rx="3" fill="#6b4a32" /><circle cx="20" cy="15" r="8.5" fill="#222" /><circle cx="20" cy="15" r="6.5" fill="#f1ede6" /><path d="M20 15V10M20 15l3 2" stroke="#222" strokeWidth="1" /></svg>,
          <svg key="glasses" viewBox="0 0 40 30" className="h-full"><path d="M5 12h13a2 2 0 012 2v3a4 4 0 01-4 4H9a4 4 0 01-4-4v-5zM22 14a2 2 0 012-2h11v5a4 4 0 01-4 4h-5a4 4 0 01-4-4v-3z" fill="#1d1d1d" /></svg>,
        ].map((icon, i) => (
          <motion.span
            key={i}
            className="flex items-center justify-center rounded-sm bg-[#e7e5e1]"
            style={{ height: cq(13), padding: cq(2) }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
          >
            {icon}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

function EduScreen() {
  const side = ["Dashboard", "Courses", "Live Classes", "Assignments", "Students", "Reports", "Settings"];
  const courses = [
    { n: "Web Development", w: 88, c: "#10b981", ic: "#e0f2f1" },
    { n: "UI / UX Design", w: 62, c: "#3b82f6", ic: "#e0ecff" },
    { n: "Database Systems", w: 75, c: "#14b8a6", ic: "#dcf5ee" },
  ];
  return (
    <div className="flex h-full w-full bg-[#f6f8fb] text-[#1f2937]" style={{ fontSize: cq(1.8) }}>
      <div className="h-full shrink-0 border-r border-slate-200 bg-white" style={{ width: cq(17), padding: cq(2) }}>
        <p className="flex items-center font-bold text-[#0d9488]" style={{ gap: cq(1), fontSize: cq(2.2), marginBottom: cq(2.4) }}>
          <span className="rounded-sm bg-[#0d9488]" style={{ width: cq(2.2), height: cq(2.2) }} />
          Learnova
        </p>
        {side.map((s, i) => (
          <p key={s} className={`rounded ${i === 0 ? "bg-[#e6f4f2] font-semibold text-[#0d9488]" : "text-slate-500"}`} style={{ padding: `${cq(0.9)} ${cq(1.2)}`, marginBottom: cq(0.5) }}>
            {s}
          </p>
        ))}
      </div>
      <div className="flex-1" style={{ padding: `${cq(2.4)} ${cq(2.8)}` }}>
        <p className="font-bold" style={{ fontSize: cq(3.4) }}>Hello, Alex</p>
        <p className="text-slate-400" style={{ fontSize: cq(1.6), marginBottom: cq(2) }}>Welcome back to your dashboard</p>
        <div className="grid grid-cols-3" style={{ gap: cq(1.6) }}>
          {[
            { l: "Enrolled Courses", v: 12 },
            { l: "Active Students", v: 860 },
            { l: "Live Classes", v: 8 },
          ].map((s) => (
            <div key={s.l} className="rounded-md border border-slate-200 bg-white" style={{ padding: cq(1.6) }}>
              <p className="text-slate-500" style={{ fontSize: cq(1.5) }}>{s.l}</p>
              <p className="font-bold" style={{ fontSize: cq(4) }}><Count to={s.v} /></p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.6fr_1fr]" style={{ marginTop: cq(2), gap: cq(1.6) }}>
          <div className="rounded-md border border-slate-200 bg-white" style={{ padding: cq(1.6) }}>
            <p className="font-semibold" style={{ marginBottom: cq(1.2) }}>Recent Courses</p>
            {courses.map((c, i) => (
              <div key={c.n} className="flex items-center" style={{ gap: cq(1.4), marginBottom: cq(1.2) }}>
                <span className="shrink-0 rounded" style={{ width: cq(4), height: cq(4), background: c.ic, boxShadow: `inset 0 0 0 ${cq(0.5)} ${c.c}33` }} />
                <span className="flex-1">
                  <span className="block" style={{ fontSize: cq(1.6), marginBottom: cq(0.6) }}>{c.n}</span>
                  <Bar w={c.w} color={c.c} delay={i * 0.15} />
                </span>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-slate-200 bg-white" style={{ padding: cq(1.6) }}>
            <p className="font-semibold" style={{ marginBottom: cq(1) }}>April 2024</p>
            <div className="grid grid-cols-7 text-center text-slate-500" style={{ gap: cq(0.5), fontSize: cq(1.3) }}>
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} className={i === 18 ? "rounded-full bg-[#0d9488] font-bold text-white" : ""}>{(i % 30) + 1}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HealthScreen() {
  const side = ["Dashboard", "Patients", "Appointments", "Doctors", "Billing", "Reports", "Settings"];
  const rows = [
    { n: "John Doe", d: "General Checkup", s: "Confirmed", ok: true },
    { n: "Sarah Smith", d: "Cardiology Consult", s: "Completed", ok: true },
    { n: "Robert Brown", d: "Cardiology", s: "Confirmed", ok: true },
    { n: "Emily Davis", d: "Dermatology", s: "Pending", ok: false },
  ];
  return (
    <div className="flex h-full w-full bg-[#f5f7f9] text-[#1f2937]" style={{ fontSize: cq(1.8) }}>
      <div className="h-full shrink-0 border-r border-slate-200 bg-white" style={{ width: cq(17), padding: cq(2) }}>
        <p className="flex items-center font-bold text-[#0f766e]" style={{ gap: cq(1), fontSize: cq(2.1), marginBottom: cq(2.4) }}>
          <span className="rounded-full bg-[#14b8a6]" style={{ width: cq(2.2), height: cq(2.2) }} />
          MediCare+
        </p>
        {side.map((s, i) => (
          <p key={s} className={`rounded ${i === 0 ? "bg-[#e4f3f1] font-semibold text-[#0f766e]" : "text-slate-500"}`} style={{ padding: `${cq(0.9)} ${cq(1.2)}`, marginBottom: cq(0.5) }}>
            {s}
          </p>
        ))}
      </div>
      <div className="flex-1" style={{ padding: `${cq(2.4)} ${cq(2.8)}` }}>
        <p className="font-bold" style={{ fontSize: cq(2.8), marginBottom: cq(1.6) }}>Patients Overview</p>
        <div className="grid grid-cols-4" style={{ gap: cq(1.4) }}>
          {[
            { l: "Total Patients", n: <Count to={2350} /> },
            { l: "Appointments", n: <Count to={320} /> },
            { l: "Completed", n: <Count to={285} /> },
            { l: "Revenue", n: <Count to={8.45} prefix="₹" suffix="L" decimals={2} /> },
          ].map((s) => (
            <div key={s.l} className="rounded-md border border-slate-200 bg-white" style={{ padding: cq(1.4) }}>
              <p className="text-slate-500" style={{ fontSize: cq(1.3) }}>{s.l}</p>
              <p className="font-bold" style={{ fontSize: cq(3) }}>{s.n}</p>
            </div>
          ))}
        </div>
        <div className="rounded-md border border-slate-200 bg-white" style={{ marginTop: cq(2), padding: cq(1.6) }}>
          <p className="font-semibold" style={{ marginBottom: cq(1.2) }}>Recent Appointments</p>
          {rows.map((r, i) => (
            <motion.div
              key={r.n}
              className="flex items-center border-t border-slate-100"
              style={{ padding: `${cq(1)} 0`, gap: cq(1.4) }}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
            >
              <span className="shrink-0 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" style={{ width: cq(3.4), height: cq(3.4) }} />
              <span className="flex-1 font-medium">{r.n}</span>
              <span className="flex-1 text-slate-400">{r.d}</span>
              <span className={`rounded-full ${r.ok ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`} style={{ padding: `${cq(0.4)} ${cq(1.4)}`, fontSize: cq(1.4) }}>
                {r.s}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  data                                                               */
/* ------------------------------------------------------------------ */
const ico = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-6 w-6" };

const WORK = [
  {
    title: "E-Commerce",
    sub: "CakePHP Development",
    screen: <StoreScreen />,
    icon: (
      <svg {...ico}>
        <path d="M5 8h14l-1.2 11.2a1.5 1.5 0 01-1.5 1.3H7.7a1.5 1.5 0 01-1.5-1.3L5 8z" />
        <path d="M9 8V6.5a3 3 0 016 0V8" />
      </svg>
    ),
  },
  {
    title: "Education",
    sub: "Custom Platform",
    screen: <EduScreen />,
    icon: (
      <svg {...ico}>
        <path d="M2.5 9.5L12 5l9.5 4.5L12 14 2.5 9.5z" />
        <path d="M6.5 11.7V16c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.3" />
        <path d="M21.5 9.5V15" />
      </svg>
    ),
  },
  {
    title: "Healthcare",
    sub: "Secure Applications",
    screen: <HealthScreen />,
    icon: (
      <svg {...ico}>
        <path d="M12 20.5s-8-4.7-8-10.4A4.6 4.6 0 0112 7.6a4.6 4.6 0 018 2.5c0 5.7-8 10.4-8 10.4z" />
        <path d="M6.5 12h3l1.5-2.5 2 5 1.5-2.5h3" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  section                                                            */
/* ------------------------------------------------------------------ */
export default function HireCakePhpWork() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fdf9f9_60%,#ffffff_100%)] py-14 sm:py-20">
      <Container className="relative max-w-[1240px]">
        {/* ----------------------------- header ----------------------------- */}
        <div className="relative min-h-[170px] sm:min-h-[210px]">
          {/* cake + orbit rings + sparks (top-right, partly cropped like the mock) */}
          <div aria-hidden className="pointer-events-none absolute -right-6 -top-28 hidden h-[360px] w-[360px] sm:block lg:right-6 lg:-top-32 lg:h-[420px] lg:w-[420px]">
            <svg viewBox="0 0 420 420" className="absolute inset-0 h-full w-full" fill="none">
              {[110, 150, 190].map((r, i) => (
                <motion.circle
                  key={r}
                  cx="210"
                  cy="210"
                  r={r}
                  stroke="#e9c9cb"
                  strokeWidth="1"
                  strokeOpacity={0.7 - i * 0.18}
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.3 + i * 0.25, ease: "easeInOut" }}
                />
              ))}
              <motion.circle
                cx="210"
                cy="210"
                r="150"
                stroke="#d92b32"
                strokeOpacity="0.35"
                strokeWidth="1.2"
                strokeDasharray="2 10"
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "210px 210px" }}
              />
            </svg>
            {[
              { l: "8%", t: "48%" },
              { l: "62%", t: "12%" },
              { l: "86%", t: "36%" },
              { l: "30%", t: "74%" },
            ].map((d, i) => (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-[#d92b32]"
                style={{ left: d.l, top: d.t }}
                animate={reduce ? undefined : { opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}
            <motion.div
              className="absolute left-1/2 top-[30%] w-[60%] -translate-x-1/2"
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <Image
                  src={CAKE_IMAGE}
                  alt=""
                  width={1351}
                  height={1164}
                  sizes="260px"
                  className="h-auto w-full select-none drop-shadow-[0_28px_34px_rgba(120,40,40,0.22)]"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="relative z-10">
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-[11px] font-bold uppercase tracking-[0.24em]"
              style={{ color: RED }}
            >
              Our Work
            </motion.span>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 font-playfair text-[34px] font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[52px]"
              style={{ color: INK }}
            >
              Built with <span style={{ color: RED }}>CakePHP.</span>
              <br />
              Built to perform.
            </motion.h2>
            <motion.span
              variants={fadeUp}
              custom={2}
              className="mt-6 block h-px w-10 origin-left"
              style={{ background: RED }}
            />
          </motion.div>
        </div>

        {/* ----------------------------- cards ------------------------------ */}
        <ul className="relative z-10 mt-8 grid gap-6 md:grid-cols-3 lg:gap-7">
          {WORK.map((w, i) => (
            <motion.li
              key={w.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: EASE }}
              className="group overflow-hidden rounded-[22px] border border-[#f0e6e6] bg-white shadow-[0_26px_50px_-30px_rgba(80,30,30,0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_34px_60px_-28px_rgba(217,43,50,0.35)]"
            >
              <div className="relative h-[250px] overflow-hidden bg-[linear-gradient(180deg,#e6e9ee_0%,#c8ced7_100%)] pt-7 sm:h-[272px]">
                <div className="origin-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <Laptop>{w.screen}</Laptop>
                </div>
                <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/10 to-transparent" />
              </div>

              <div className="flex items-center gap-4 px-6 py-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#fff1f1] text-[#d92b32] transition-colors duration-300 group-hover:bg-[#d92b32] group-hover:text-white">
                  {w.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-playfair text-[17px] font-bold leading-tight" style={{ color: INK }}>
                    {w.title}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-2 text-[12px] text-slate-500">
                    <span className="h-px w-5 shrink-0 transition-all duration-300 group-hover:w-8" style={{ background: RED }} />
                    <span className="truncate">{w.sub}</span>
                  </p>
                </div>
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <polyline points="14 6 20 12 14 18" />
                </svg>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* ------------------------------ CTA ------------------------------- */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border bg-white px-8 py-3.5 text-[13.5px] font-semibold transition-colors duration-300 hover:text-white active:scale-95"
            style={{ borderColor: RED, color: RED }}
          >
            <span aria-hidden className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" style={{ background: RED }} />
            <span className="relative">View More Case Studies</span>
            <svg viewBox="0 0 24 24" className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="14 6 20 12 14 18" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
