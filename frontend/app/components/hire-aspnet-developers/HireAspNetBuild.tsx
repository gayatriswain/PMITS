"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Rocket, Puzzle, RefreshCw, Target, ShieldCheck, ChartColumn, Gauge, Users, Plus, Check, Braces, Database } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const display = { className: "font-heading" }; // global font from app/layout.tsx

const EASE = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0d8a91";
const NAVY = "#16264d";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

/* ------------------------------------------------------------------ */
/*  Mock illustrations (built in code, no images)                      */
/* ------------------------------------------------------------------ */
function BuildMock({ reduce }: { reduce: boolean }) {
  const $t = useCmsText();
  const code = [
    [[$t("HireAspNetBuild__t1", "public class "), "#7aa7ff"], [$t("HireAspNetBuild__t2", "Startup"), "#7ee0d0"]],
    [["{", "#cbd5e1"]],
    [[$t("HireAspNetBuild__t3", "  public void "), "#7aa7ff"], [$t("HireAspNetBuild__t4", "Configure"), "#f2c879"], ["(", "#cbd5e1"]],
    [[$t("HireAspNetBuild__t5", "    IApplicationBuilder app"), "#cbd5e1"], [")", "#cbd5e1"]],
    [["  {", "#cbd5e1"]],
    [[$t("HireAspNetBuild__t6", "    app."), "#cbd5e1"], [$t("HireAspNetBuild__t7", "MapControllers"), "#f2c879"], ["();", "#cbd5e1"]],
    [[$t("HireAspNetBuild__t8", "    app."), "#cbd5e1"], [$t("HireAspNetBuild__t9", "Run"), "#f2c879"], ["();", "#cbd5e1"]],
    [["  }", "#cbd5e1"]],
    [["}", "#cbd5e1"]],
  ] as [string, string][][];

  return (
    <div className="relative h-full w-full">
      {/* dark editor */}
      <motion.div
        className="absolute right-2 top-0 w-[62%] rounded-xl bg-[#0f1b33] p-3 shadow-[0_24px_40px_-18px_rgba(15,27,51,0.7)]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="flex gap-1">
            <i className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
            <i className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
            <i className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
          </span>
          <span className="text-[8px] text-slate-500">{$t("HireAspNetBuild__t10", "C#")}</span>
        </div>
        <pre className="font-mono text-[8.5px] leading-[1.55]">
          {code.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
            >
              <span className="mr-2 select-none text-slate-600">{i + 1}</span>
              {line.map(([t, c], k) => (
                <span key={k} style={{ color: c }}>{t}</span>
              ))}
            </motion.div>
          ))}
          {!reduce && (
            <motion.span className="ml-4 inline-block h-2.5 w-[5px] bg-teal-300 align-middle" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          )}
        </pre>
      </motion.div>

      {/* new project window */}
      <motion.div
        className="absolute bottom-0 left-0 w-[46%] rounded-xl border border-slate-200 bg-white p-2.5 shadow-[0_20px_36px_-18px_rgba(22,38,77,0.45)]"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
      >
        <motion.div animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <div className="mb-2 flex gap-1">
            <i className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
            <i className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
            <i className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
          </div>
          <p className="text-[8px] text-slate-400">{rich($t("HireAspNetBuild__t11", "New Project"))}</p>
          <p className="mt-1 text-[10px] font-bold" style={{ color: NAVY }}>{rich($t("HireAspNetBuild__t12", "ASP.NET Core"))}</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <i className="h-8 rounded bg-slate-100" />
            <i className="h-8 rounded bg-slate-100" />
          </div>
          <span className="ml-auto mt-2 block w-fit rounded px-2 py-1 text-[8px] font-semibold text-white" style={{ background: TEAL }}>{$t("HireAspNetBuild__t13", "Launch")}</span>
        </motion.div>
      </motion.div>

      {/* .NET badge */}
      <motion.div
        className="absolute bottom-0 right-0 grid h-[76px] w-[76px] place-items-center rounded-2xl bg-white shadow-[0_18px_30px_-12px_rgba(22,38,77,0.5)]"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.9 }}
      >
        <motion.span
          className="grid h-[58px] w-[58px] place-items-center rounded-xl bg-gradient-to-br from-[#6b5ce7] to-[#4a3bb8] text-[15px] font-extrabold tracking-tight text-white"
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {$t("HireAspNetBuild__t14", ".NET")}</motion.span>
      </motion.div>
    </div>
  );
}

function ExtendMock({ reduce }: { reduce: boolean }) {
  const $t = useCmsText();
  const LINE = "M0 58 C14 54 22 46 38 48 S62 30 80 34 S104 52 124 36 S160 12 182 22 S206 8 220 4";
  return (
    <div className="relative h-full w-full">
      {/* dashboard window */}
      <motion.div
        className="absolute left-[4%] right-[2%] top-3 h-[150px] rounded-xl border border-slate-200 bg-white p-3 shadow-[0_22px_38px_-20px_rgba(22,38,77,0.45)]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      >
        <div className="mb-2.5 flex items-center gap-1">
          <i className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <i className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <i className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          <i className="ml-2 h-1.5 w-20 rounded bg-slate-200" />
        </div>
        <p className="text-[10px] font-bold" style={{ color: NAVY }}>{rich($t("HireAspNetBuild__t15", "Product Dashboard"))}</p>
        <div className="relative mt-1.5 flex gap-1.5">
          {/* y-axis */}
          <div className="flex h-[78px] flex-col justify-between pt-0.5 text-[6.5px] leading-none text-slate-300">
            {[100, 80, 60, 40, 20].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <svg viewBox="0 0 220 70" className="h-[78px] flex-1" fill="none" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="extArea2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={TEAL} stopOpacity="0.22" />
                <stop offset="1" stopColor={TEAL} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[8, 22, 36, 50, 64].map((y) => (
              <line key={y} x1="0" y1={y} x2="220" y2={y} stroke="#eef2f6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ))}
            <motion.path
              d={`${LINE} L220 70 L0 70Z`}
              fill="url(#extArea2)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            <motion.path
              d={LINE}
              stroke={TEAL}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* + Add Feature, hanging off the top-right corner */}
      <motion.span
        className="absolute -top-1 right-[-4px] flex items-center gap-1 rounded-md px-3 py-2 text-[9.5px] font-semibold text-white shadow-[0_12px_22px_-8px_rgba(13,138,145,0.7)]"
        style={{ background: TEAL }}
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <Plus className="h-3 w-3" /> {$t("HireAspNetBuild__t16", "Add Feature")}</motion.span>

      {/* chips sit on the lower part of the dashboard */}
      <motion.div
        className="absolute bottom-[26px] left-[10%] flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-[0_16px_28px_-14px_rgba(22,38,77,0.5)]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 1 }}
      >
        <motion.span className="flex items-center gap-2.5" animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <Braces className="h-5 w-5" style={{ color: TEAL }} />
          <span className="text-[8.5px] leading-tight text-slate-500">
            <b className="block text-[9.5px]" style={{ color: NAVY }}>{$t("HireAspNetBuild__t17", "New Module")}</b>
            {$t("HireAspNetBuild__t18", "Integration")}</span>
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute bottom-[14px] left-[50%] flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-[0_16px_28px_-14px_rgba(22,38,77,0.5)]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 1.15 }}
      >
        <motion.span className="flex items-center gap-2.5" animate={reduce ? undefined : { y: [0, 4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <Database className="h-5 w-5" style={{ color: TEAL }} />
          <span className="text-[8.5px] leading-tight text-slate-500">
            <b className="block text-[9.5px]" style={{ color: NAVY }}>{$t("HireAspNetBuild__t19", "API")}</b>
            {$t("HireAspNetBuild__t20", "Connection")}</span>
        </motion.span>
      </motion.div>

      <motion.span
        className="absolute bottom-[6px] right-[2%] grid h-10 w-10 place-items-center rounded-full text-white shadow-[0_12px_22px_-8px_rgba(13,138,145,0.8)]"
        style={{ background: TEAL }}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.4 }}
      >
        <Plus className="h-5 w-5" />
      </motion.span>
    </div>
  );
}

function ModernizeMock({ reduce }: { reduce: boolean }) {
  const $t = useCmsText();
  return (
    <div className="relative h-full w-full">
      {/* flowing teal lines under the cards */}
      <svg aria-hidden viewBox="0 0 320 150" className="absolute -left-6 bottom-[-10px] h-[78%] w-[115%]" fill="none" preserveAspectRatio="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M0 ${96 + i * 7} C70 ${62 + i * 5}, 150 ${132 - i * 6}, 320 ${58 + i * 7}`}
            stroke="#8fd3da"
            strokeOpacity={0.75 - i * 0.12}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.4 + i * 0.12 }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute left-0 top-0 w-[60%] rounded-lg bg-[#0f1a30] p-3.5 text-white shadow-[0_24px_40px_-18px_rgba(15,27,51,0.8)]"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      >
        <p className="text-[11px] font-semibold">{rich($t("HireAspNetBuild__t21", "Legacy System"))}</p>
        <p className="mt-2 text-[9px] text-slate-300">{rich($t("HireAspNetBuild__t22", ".NET Framework"))}</p>
        <span className="mt-2 block h-[5px] overflow-hidden rounded-full bg-white/15">
          <motion.span
            className="block h-full rounded-full bg-gradient-to-r from-[#3d9be0] to-[#5fd0e6]"
            initial={{ width: 0 }}
            whileInView={{ width: "36%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.8, ease: EASE }}
          />
        </span>
        <p className="mt-2 flex justify-between text-[7.5px] text-slate-400">
          <span>{$t("HireAspNetBuild__t23", "Slow")}</span>
          <span>{$t("HireAspNetBuild__t24", "Heavy")}</span>
          <span className="text-right leading-tight">{$t("HireAspNetBuild__t25", "Hard to")}<br />{$t("HireAspNetBuild__t26", "Scale")}</span>
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-[-4px] right-[-6px] w-[52%] rounded-xl bg-white px-4 py-4 text-center shadow-[0_26px_44px_-16px_rgba(22,38,77,0.5)]"
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
      >
        <motion.div animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
          <p className="text-[9.5px] text-slate-500">{rich($t("HireAspNetBuild__t27", "Modernized with"))}</p>
          <p className="text-small font-extrabold" style={{ color: NAVY }}>{rich($t("HireAspNetBuild__t28", "ASP.NET Core"))}</p>
          <motion.span
            className="relative mx-auto mt-3 grid h-11 w-11 place-items-center rounded-full text-white"
            style={{ background: "linear-gradient(145deg,#0f9aa0,#0b6f78)" }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 13, delay: 1.3 }}
          >
            {!reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full opacity-25" style={{ background: TEAL }} />}
            <Check className="relative h-6 w-6" strokeWidth={3} />
          </motion.span>
          <p className="mt-3 text-[9px] text-slate-500">{rich($t("HireAspNetBuild__t29", "Faster. Secure. Scalable."))}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const CARDS__cms = [
  {
    num: "01",
    title: "Build",
    icon: Rocket,
    q: "Launching something new?",
    text: "End-to-end ASP.NET development to turn your idea into a powerful and scalable web application.",
    Mock: BuildMock,
  },
  {
    num: "02",
    title: "Extend",
    icon: Puzzle,
    q: "Have an existing product?",
    text: "Add skilled ASP.NET developers to extend features, integrate systems and accelerate your product roadmap.",
    Mock: ExtendMock,
  },
  {
    num: "03",
    title: "Modernize",
    icon: RefreshCw,
    q: "Working with legacy .NET?",
    text: "Upgrade outdated applications to modern ASP.NET Core for better performance, security and long-term reliability.",
    Mock: ModernizeMock,
  },
];

const PROMISES__cms = [
  { a: "Secure", b: "by design", icon: ShieldCheck },
  { a: "Scalable", b: "by architecture", icon: ChartColumn },
  { a: "Optimized", b: "for performance", icon: Gauge },
  { a: "Supported", b: "beyond delivery", icon: Users },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function HireAspNetBuild() {
  const $t = useCmsText();
  const CARDS = useCmsData("HireAspNetBuild__CARDS", CARDS__cms);
  const PROMISES = useCmsData("HireAspNetBuild__PROMISES", PROMISES__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f4f8fb_0%,#f8fbfd_100%)] py-14 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(255,255,255,0.9),transparent_70%)]" />

      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ header ------------------------------ */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto max-w-[720px] text-center">
          <motion.p variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: TEAL }}>
            <i aria-hidden className="h-px w-8 bg-[#0d8a91]/45 sm:w-14" />
            {rich($t("HireAspNetBuild__t30", "Built around your goals"))}<i aria-hidden className="h-px w-8 bg-[#0d8a91]/45 sm:w-14" />
          </motion.p>
          <h2 className={`text-h2 ${display.className} mt-5 font-extrabold tracking-[-0.02em]`} style={{ color: NAVY }}>
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <motion.span
                className="block"
                variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.8, delay: 0.1, ease: EASE } } }}
              >
                {$t("HireAspNetBuild__t31", "What do you want to")}{" "}
                <span className="bg-[linear-gradient(100deg,#0b6f78_10%,#18a8ae_45%,#0d8a91_75%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-[aspBuildShine_6s_linear_infinite]">{$t("HireAspNetBuild__t32", "build?")}</span>
              </motion.span>
            </span>
          </h2>
          <motion.p variants={fadeUp} custom={2} className="text-body mx-auto mt-4 max-w-[560px] text-slate-600">
            {rich($t("HireAspNetBuild__t33", "From new products to legacy modernization, our ASP.NET developers help you build solutions that are secure, scalable and future-ready."))}</motion.p>
          <motion.span
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, delay: 0.5, ease: EASE } } }}
            className="mx-auto mt-5 block h-[3px] w-12 origin-center rounded-full"
            style={{ background: TEAL }}
          />
        </motion.div>

        {/* ------------------------------ cards ------------------------------ */}
        <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.li
                key={c.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: 0.12 * i, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white bg-white/80 p-6 shadow-[0_26px_50px_-34px_rgba(22,38,77,0.45)] backdrop-blur-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_34px_60px_-30px_rgba(13,138,145,0.5)]"
              >
                {/* dotted accent */}
                <span aria-hidden className="pointer-events-none absolute bottom-24 left-4 h-24 w-12 opacity-50 [background-image:radial-gradient(#9ed6da_1.1px,transparent_1.3px)] [background-size:11px_11px]" />

                <div className="flex items-center gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#bfe3e6] bg-white text-[13px] font-semibold text-[#0d8a91] transition-colors duration-300 group-hover:bg-[#0d8a91] group-hover:text-white">
                    {c.num}
                  </span>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-[#16264d] shadow-[0_10px_22px_-10px_rgba(22,38,77,0.4)] ring-1 ring-slate-100 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-3">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className={`text-h5 ${display.className} font-bold tracking-[-0.01em]`} style={{ color: NAVY }}>{c.title}</h3>
                </div>

                <p className="text-small mt-5 font-semibold" style={{ color: TEAL }}>{c.q}</p>
                <p className="text-caption mt-2 max-w-[300px] text-slate-600">{c.text}</p>

                <div className="relative mt-5 h-[220px] sm:h-[230px]">
                  <c.Mock reduce={reduce} />
                </div>
              </motion.li>
            );
          })}
        </ul>

        {/* ------------------------------ bottom bar ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-6 grid items-center gap-5 rounded-2xl border border-white bg-white/90 p-5 shadow-[0_22px_50px_-34px_rgba(22,38,77,0.4)] lg:grid-cols-[1.1fr_1.6fr] lg:gap-8 lg:px-7"
        >
          <div className="flex items-center gap-4">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#e2f2f3]" style={{ color: TEAL }}>
              {!reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#0d8a91]/15" />}
              <Target className="relative h-7 w-7" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="text-[15px] font-bold" style={{ color: NAVY }}>{$t("HireAspNetBuild__t34", "Focused on your success")}</h3>
              <p className="text-caption mt-1 max-w-[300px] text-slate-500">
                {rich($t("HireAspNetBuild__t35", "We align the right ASP.NET expertise with your business goals to deliver measurable impact, faster."))}</p>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-4 border-slate-200 sm:grid-cols-4 lg:border-l lg:pl-8">
            {PROMISES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.li
                  key={p.a}
                  className="group flex items-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#e2f2f3] text-[#0d8a91] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0d8a91] group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-[12px] leading-tight text-slate-500">
                    <b className="block text-[13px] font-bold" style={{ color: NAVY }}>{p.a}</b>
                    {p.b}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </Container>

      <style>{`
        @keyframes aspBuildShine { 0% { background-position: 0% 0; } 100% { background-position: -220% 0; } }
        @media (prefers-reduced-motion: reduce) { [class*="aspBuildShine"] { animation: none !important; } }
      `}</style>
    </section>
  );
}
