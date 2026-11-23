"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";
import { ArrowRight, DotGrid, Emblem, Eyebrow, Icon, IMG, ease, fadeUp, heading, type IconName } from "./MagentoShared";

type Model = { n: string; title: string; tag: string; points: string[]; icon: IconName; featured?: boolean };
const models: Model[] = [
  { n: "01", title: "Project-Based", tag: "For defined needs.", icon: "clipboard", points: ["Clear scope & deliverables", "Fixed timeline & budget", "Ideal for short-term projects"] },
  { n: "02", title: "Dedicated Developer", tag: "For ongoing progress.", icon: "devLaptop", featured: true, points: ["Work with one dedicated expert", "Flexible hours & priority support", "Best for continuous development"] },
  { n: "03", title: "Development Team", tag: "For big ambitions.", icon: "team", points: ["Multi-expert team on demand", "Scalable to match your growth", "Ideal for complex projects"] },
];

const helpSteps: { text: [string, string]; icon: IconName }[] = [
  { text: ["Share your", "requirements"], icon: "chat" },
  { text: ["We recommend the", "best engagement"], icon: "target" },
  { text: ["You focus on growth,", "we handle the rest"], icon: "rocket" },
];

/* Connecting line for the desktop row: x in 1740 units across the row, y in px from the row top. */
const ENG_PATH =
  "M-40 380 C -110 340, -110 260, -30 215 C 30 182, 90 158, 160 154 C 380 140, 620 100, 800 94 C 850 92, 890 92, 940 94 C 1120 100, 1360 140, 1580 154 C 1650 158, 1710 182, 1770 215 C 1850 260, 1850 340, 1780 380";

/** 3D pedestal: a glossy icon bubble standing on a thick, glowing disc. */
function Pedestal({ m, i }: { m: Model; i: number }) {
  const reduce = useReducedMotion();
  const orange = !!m.featured;
  const W = orange ? 224 : 170; // disc width
  const B = orange ? 112 : 96; // bubble size
  const DH = orange ? 62 : 50; // disc ellipse height
  const T = B - 30; // where the disc's top face starts
  return (
    <div className="relative" style={{ width: W, height: T + DH + 14 }}>
      {/* disc thickness (side) */}
      <span
        aria-hidden
        className={`absolute inset-x-0 rounded-[50%] ${
          orange
            ? "bg-gradient-to-b from-[#ffe9dc] to-[#f6c4a6] shadow-[0_16px_30px_-8px_rgba(249,115,22,0.6)]"
            : "bg-gradient-to-b from-[#eef2f6] to-[#cfd9e1] shadow-[0_16px_28px_-8px_rgba(45,212,191,0.6)]"
        }`}
        style={{ top: T + 12, height: DH }}
      />
      {/* disc top face */}
      <span
        aria-hidden
        className={`absolute inset-x-0 rounded-[50%] border ${
          orange
            ? "border-[3px] border-orange-300/90 bg-[radial-gradient(ellipse_at_50%_45%,#ffffff,#fff4ec_60%,#ffe2cf)] shadow-[0_0_24px_rgba(251,146,60,0.45)]"
            : "border-white bg-[radial-gradient(ellipse_at_50%_45%,#ffffff,#f3f6f9_65%,#e4eaef)]"
        }`}
        style={{ top: T, height: DH }}
      />
      {orange && (
        <span aria-hidden className="absolute rounded-[50%] border-2 border-orange-200" style={{ top: T + DH * 0.18, height: DH * 0.64, left: "18%", right: "18%" }} />
      )}
      {/* glossy bubble */}
      <motion.span
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full p-[3px] ${
          orange ? "bg-gradient-to-b from-white via-orange-100 to-orange-300" : "bg-gradient-to-b from-white via-teal-50 to-[#5eead4]"
        } ${orange ? "shadow-[0_16px_30px_-10px_rgba(249,115,22,0.55)]" : "shadow-[0_16px_30px_-10px_rgba(13,148,136,0.55)]"}`}
        style={{ width: B, height: B }}
      >
        <span className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_28%,#ffffff,#f8fafc_55%,#e6edf3)] shadow-[inset_0_-8px_16px_rgba(148,163,184,0.25),inset_0_6px_10px_rgba(255,255,255,0.9)]">
          <span aria-hidden className="absolute left-[18%] top-[10%] h-[30%] w-[50%] rotate-[-20deg] rounded-full bg-white/80 blur-[6px]" />
          <Icon name={m.icon} className={`relative ${orange ? "h-[52%] w-[52%] text-[#5b2a12]" : "h-[50%] w-[50%] text-[#0c1e3d]"}`} />
        </span>
        {i === 0 && (
          <span className="absolute bottom-[6%] right-[2%] flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#0d9488] text-white shadow-md">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="m5 12 5 5 9-10" /></svg>
          </span>
        )}
      </motion.span>
    </div>
  );
}

function ModelCard({ m, i, active, onEnter }: { m: Model; i: number; active: boolean; onEnter: () => void }) {
  const reduce = useReducedMotion();
  const orange = !!m.featured;
  const side = i === 0 ? "left" : i === 2 ? "right" : "center";
  return (
    <motion.div
      onMouseEnter={onEnter}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease }}
      className="relative"
    >
      <motion.div animate={reduce ? undefined : { y: active ? -8 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="relative">
        {/* pedestal (offset to the outer side on desktop, like the mock) */}
        <div className={`relative z-10 flex justify-center ${side === "left" ? "lg:justify-start lg:pl-[6%]" : side === "right" ? "lg:justify-end lg:pr-[6%]" : ""}`}>
          <Pedestal m={m} i={i} />
        </div>

        {/* card */}
        <div
          className={`relative -mt-[42px] border px-7 pb-9 pt-[62px] backdrop-blur-md transition-shadow duration-500 ${
            orange
              ? "rounded-b-[26px] rounded-t-[150px] border-orange-200/90 bg-gradient-to-b from-white/70 via-white/90 to-[#fff8f3] shadow-[0_34px_70px_-34px_rgba(249,115,22,0.55)]"
              : `rounded-[26px] border-white bg-white/75 ${active ? "shadow-[0_34px_70px_-30px_rgba(13,148,136,0.5)]" : "shadow-[0_30px_60px_-34px_rgba(12,30,61,0.45)]"}`
          }`}
        >
          {!orange && (
            <span
              className={`mb-3 block text-[28px] font-bold leading-none text-[#0d9488] lg:absolute lg:mb-0 ${side === "left" ? "text-center lg:left-[62%] lg:top-[20px]" : "text-center lg:left-[8%] lg:top-[22px]"}`}
            >
              {m.n}
              <span className="mx-auto mt-2 block h-[2px] w-7 rounded bg-[#0d9488]/70 lg:mx-0" />
            </span>
          )}
          <div className={`${side === "left" ? "lg:pl-[22%]" : side === "right" ? "lg:pl-[2%]" : ""} ${orange ? "text-center" : "text-center lg:text-left"}`}>
            <h3 className={`${heading.className} text-lg font-bold uppercase tracking-wide text-[#0c1e3d] xl:text-xl`}>{m.title}</h3>
            <p className={`mt-1 text-sm font-medium xl:text-[15px] ${orange ? "text-orange-500" : "text-[#0d9488]"}`}>{m.tag}</p>
            <ul className={`mt-5 space-y-2.5 ${orange ? "mx-auto w-fit text-left" : "mx-auto w-fit text-left lg:mx-0"}`}>
              {m.points.map((p, k) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.15 + k * 0.08 }}
                  className="flex items-center gap-2.5 text-[13px] text-slate-700 xl:text-sm"
                >
                  <Icon name="check" className={`h-[18px] w-[18px] shrink-0 ${orange ? "text-orange-500" : "text-[#0d9488]"}`} />
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
          {orange && (
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-orange-400 px-7 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-[0_10px_22px_-6px_rgba(249,115,22,0.8)]">
              <span className="mag-anim pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.5)_50%,transparent_70%)] bg-[length:200%_100%]" style={{ animation: "magShine 2.8s linear infinite" }} />
              <span className="relative">Most Popular</span>
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MagentoEngage() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(1);

  return (
    <section className="relative overflow-hidden bg-[#f5f7fa] py-12 sm:py-16">
      <DotGrid className="left-[8%] top-16 hidden lg:grid" cols={6} rows={4} />
      <div aria-hidden className="pointer-events-none absolute right-[6%] top-14 hidden w-[180px] opacity-[0.06] grayscale lg:block">
        <Emblem sizes="180px" className="w-full drop-shadow-none" />
      </div>

      <Container className="relative">
        <div className="text-center">
          <Eyebrow>Flexible engagement</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${heading.className} mt-5 text-5xl font-bold tracking-tight text-[#0c1e3d] sm:text-6xl`}
          >
            Engage{" "}
            <span className="relative inline-block text-[#0d9488]">
              your way
              <svg aria-hidden className="absolute -bottom-3 left-0 w-full" viewBox="0 0 220 18" preserveAspectRatio="none" fill="none">
                <motion.path
                  d="M4 12 C 60 2, 150 2, 216 10"
                  stroke="#0b5f5a"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.5, ease }}
                />
              </svg>
            </span>
            <span className="text-[#0d9488]">.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mt-6 max-w-[460px] text-base text-slate-600 sm:text-lg">
            Different needs. Different goals. Choose the engagement model that fits your project best.
          </motion.p>
        </div>

        <div className="relative mx-auto mt-12 max-w-[1180px] sm:mt-14">
          {/* connecting line (desktop). x in 1740 units across the row, y in real px (svg is 440px tall). */}
          <svg aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-[440px] w-full overflow-visible lg:block" viewBox="0 0 1740 440" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="magEngLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#0d9488" />
                <stop offset="0.5" stopColor="#94a3b8" stopOpacity="0.7" />
                <stop offset="1" stopColor="#0d9488" />
              </linearGradient>
            </defs>
            <motion.path
              d={ENG_PATH}
              stroke="url(#magEngLine)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
            {!reduce && (
              <path d={ENG_PATH} stroke="#2dd4bf" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="14 216" vectorEffect="non-scaling-stroke" style={{ animation: "magFlow2 3.2s linear infinite" }} />
            )}
          </svg>
          {/* end dots + chevrons */}
          {[
            { cls: "left-[-2.3%]", k: 0 },
            { cls: "left-[102.3%]", k: 1 },
          ].map(({ cls, k }) => (
            <span key={k} aria-hidden className={`absolute top-[380px] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d9488] shadow-[0_0_0_4px_rgba(13,148,136,0.15)] lg:block ${cls}`}>
              {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#0d9488]/40 [animation-duration:2.2s]" />}
            </span>
          ))}
          <motion.span aria-hidden className="absolute left-[32%] top-[106px] hidden -rotate-[24deg] text-lg font-bold tracking-[-0.2em] text-[#0d9488] lg:block" animate={reduce ? undefined : { x: [0, 5, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.6, repeat: Infinity }}>
            ›››
          </motion.span>
          <motion.span aria-hidden className="absolute left-[67%] top-[106px] hidden rotate-[24deg] text-lg font-bold tracking-[-0.2em] text-[#0d9488] lg:block" animate={reduce ? undefined : { x: [0, 5, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}>
            ›››
          </motion.span>

          <div className="relative grid gap-12 md:grid-cols-3 md:gap-6 lg:gap-[4.5%]">
            {models.map((m, i) => (
              <div key={m.n} className={`relative ${m.featured ? "" : "lg:pt-[106px]"}`}>
                {m.featured && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-1 h-9 text-center text-[28px] font-bold leading-9 text-[#0d9488]"
                  >
                    {m.n}
                  </motion.p>
                )}
                <ModelCard m={m} i={i} active={active === i} onEnter={() => setActive(i)} />
              </div>
            ))}
          </div>
        </div>

        {/* Not sure banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto mt-14 max-w-[1100px] overflow-hidden rounded-[22px] bg-gradient-to-r from-[#0a1a33] via-[#0c1e3d] to-[#0b2a44] px-6 py-7 text-white shadow-[0_30px_60px_-30px_rgba(12,30,61,0.8)] md:px-10"
        >
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
            <div className="relative h-[120px] w-[180px] shrink-0">
              <span aria-hidden className="absolute bottom-3 left-1/2 h-10 w-40 -translate-x-1/2 rounded-[50%] bg-cyan-400/30 blur-xl" />
              <Image src={IMG.platform.src} alt="" width={IMG.platform.w} height={IMG.platform.h} sizes="180px" className="absolute bottom-[-14px] left-0 h-auto w-full" />
              <motion.div
                className="absolute bottom-[42px] left-1/2 w-[64px] -translate-x-1/2"
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Emblem sizes="64px" className="w-full" />
              </motion.div>
              {!reduce && [0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  aria-hidden
                  className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300"
                  style={{ left: `${15 + k * 35}%`, top: `${20 + (k % 2) * 30}%` }}
                  animate={{ opacity: [0, 1, 0], y: [0, -10, -20] }}
                  transition={{ duration: 2.4, delay: k * 0.7, repeat: Infinity }}
                />
              ))}
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h3 className={`${heading.className} text-2xl font-semibold`}>Not sure which fits?</h3>
              <p className={`${heading.className} text-xl font-medium text-[#2dd4bf]`}>We’ll help you find the right setup.</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:flex-nowrap lg:justify-start">
                {helpSteps.map((h) => (
                  <li key={h.text[0]} className="flex items-center gap-2.5 text-left text-xs leading-snug text-slate-300">
                    <Icon name={h.icon} className="h-6 w-6 text-slate-200" />
                    <span>
                      {h.text[0]}
                      <br />
                      {h.text[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              href="#magento-proposal"
              className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-xl border border-cyan-300/60 bg-gradient-to-r from-[#0e7490] to-[#0d9488] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_30px_-6px_rgba(45,212,191,0.7)] transition hover:-translate-y-0.5"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 transition-[left] duration-700 group-hover:left-[120%]" />
              Let’s find the right setup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
