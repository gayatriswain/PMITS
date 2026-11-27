"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, DotGrid, Emblem, EdgeChevrons, Eyebrow, Icon, IMG, ease, fadeUp, heading, useSeen, type IconName } from "../shared/MagentoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

type Svc = {
  n: string;
  title: [string, string];
  icon: IconName;
  x: number;
  y: number;
  label: "l" | "r" | "t";
  /** spoke: dot (next to the node) → end (at the bulb glass) */
  spoke: [number, number, number, number];
  text: string;
};

/* Geometry taken from the design mock, in a 1440×700 stage.
   Bulb: 270 wide centred on x=715, top y=150. Tablet: 615 wide centred on x=722, top y=470. Nodes are 120 across. */
const SW = 1440, SH = 700, NODE = 120;
const services__cms: Svc[] = [
  { n: "01", title: ["Magento Store", "Development"], icon: "store", x: 340, y: 298, label: "l", spoke: [430, 297, 556, 297], text: "End-to-end store builds — catalog, checkout, payments and shipping set up right." },
  { n: "02", title: ["Theme & Frontend", "Development"], icon: "layout", x: 490, y: 128, label: "l", spoke: [547, 177, 588, 205], text: "Pixel-perfect, mobile-first themes (Luma, Hyvä or custom) that load fast." },
  { n: "03", title: ["Custom", "Development"], icon: "code", x: 700, y: 67, label: "t", spoke: [703, 133, 705, 162], text: "Custom modules and business logic built to Magento coding standards." },
  { n: "04", title: ["Extension", "Development"], icon: "puzzle", x: 990, y: 128, label: "r", spoke: [920, 172, 858, 207], text: "Marketplace-grade extensions, or fixes and tweaks to the ones you already use." },
  { n: "05", title: ["Magento", "Integrations"], icon: "network", x: 1070, y: 298, label: "r", spoke: [980, 297, 872, 297], text: "ERP, CRM, PIM, payment and shipping integrations that keep data in sync." },
  { n: "06", title: ["Upgrade &", "Migration"], icon: "arrowUpBox", x: 430, y: 463, label: "l", spoke: [515, 434, 586, 392], text: "Magento 1 → 2 migrations and version upgrades without losing data or SEO." },
  { n: "07", title: ["Performance", "Optimization"], icon: "gauge", x: 1000, y: 463, label: "r", spoke: [912, 434, 845, 392], text: "Caching, indexing, image and query tuning for faster pages and better CWV." },
];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export default function MagentoServices() {
  const $t = useCmsText();
  const services = useCmsData("MagentoServices__services", services__cms);
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const inView = useSeen(stageRef, 0.35, false);
  const seen = useSeen(stageRef);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (reduce || !inView || hover) return;
    const t = setInterval(() => setActive((a) => (a + 1) % services.length), 2400);
    return () => clearInterval(t);
  }, [reduce, inView, hover]);

  return (
    <section className="relative overflow-hidden bg-[#f6f8fa] py-12 sm:py-16">
      <EdgeChevrons />
      <DotGrid className="left-[7%] top-[38%] hidden lg:grid" cols={4} rows={4} />
      <DotGrid className="right-[7%] top-[62%] hidden lg:grid" cols={4} rows={4} />

      <Container className="relative">
        <div className="text-center">
          <Eyebrow>{$t("MagentoServices__t1", "What your Magento developer can handle")}</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-h2 ${heading.className} mt-5 font-bold uppercase tracking-tight text-[#0c1e3d]`}
          >
            {$t("MagentoServices__t2", "7 ")}<span className="text-[#0d9488]">{html($t("MagentoServices__t3", "Services."))}</span>
            <br />
            {$t("MagentoServices__t4", "One Solution.")}</motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mt-4 text-slate-600">
            {rich($t("MagentoServices__t5", "Everything your store needs. Handled by Magento experts."))}</motion.p>
        </div>

        {/* Desktop stage */}
        <div
          ref={stageRef}
          className="relative mx-auto mt-24 hidden aspect-[1440/700] w-full max-w-[1240px] xl:block"
          onMouseLeave={() => setHover(false)}
        >
          {/* glow behind bulb */}
          <motion.div
            aria-hidden
            className="absolute rounded-full bg-[radial-gradient(closest-side,rgba(249,115,22,0.30),rgba(249,115,22,0.08)_55%,transparent)]"
            style={{ left: pct(715 - 210, SW), top: pct(300 - 210, SH), width: pct(420, SW), height: pct(420, SH) }}
            animate={reduce ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* orbit ellipse under the tablet */}
          <span aria-hidden className="absolute rounded-[50%] border border-[#0d9488]/15" style={{ left: pct(300, SW), top: pct(552, SH), width: pct(840, SW), height: pct(80, SH) }} />

          {/* tablet base */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease }}
            className="absolute"
            style={{ left: pct(722 - 307, SW), top: pct(436, SH), width: pct(615, SW) }}
          >
            <motion.div animate={reduce ? undefined : { opacity: [0.85, 1, 0.85] }} transition={{ duration: 2.4, repeat: Infinity }}>
              <Image src={IMG.tablet.src} alt="" width={IMG.tablet.w} height={IMG.tablet.h} sizes="560px" className="h-auto w-full" />
            </motion.div>
          </motion.div>

          {/* light beam from the tablet into the bulb */}
          <motion.span
            aria-hidden
            className="absolute rounded-full bg-gradient-to-t from-cyan-300/70 via-cyan-200/30 to-transparent blur-md"
            style={{ left: pct(715 - 30, SW), top: pct(500, SH), width: pct(60, SW), height: pct(90, SH) }}
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />

          {/* bulb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={seen ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="absolute"
            style={{ left: pct(715 - 135, SW), top: pct(150, SH), width: pct(270, SW) }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Image src={IMG.bulb.src} alt={$t("MagentoServices__t6", "Magento ideas light bulb")} width={IMG.bulb.w} height={IMG.bulb.h} sizes="240px" className="h-auto w-full drop-shadow-[0_0_28px_rgba(249,115,22,0.35)]" />
            </motion.div>
          </motion.div>

          {/* spokes: dot beside the node, short line towards the bulb */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${SW} ${SH}`} fill="none" aria-hidden>
            {services.map((s, i) => {
              const [x1, y1, x2, y2] = s.spoke;
              const on = i === active;
              return (
                <g key={s.n}>
                  <motion.line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#0d9488"
                    strokeOpacity={on ? 1 : 0.55}
                    strokeWidth={on ? 2.6 : 1.8}
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={seen ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                  />
                  {on && !reduce && (
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#5eead4" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 40" style={{ animation: "magFlow 0.9s linear infinite" }} />
                  )}
                  {on && !reduce && (
                    <circle cx={x1} cy={y1} r="6" fill="none" stroke="#14b8a6" strokeWidth="1.5" className="mag-anim" style={{ transformOrigin: `${x1}px ${y1}px`, animation: "magDotPing 1.6s ease-out infinite" }} />
                  )}
                  <motion.circle
                    cx={x1}
                    cy={y1}
                    r={on ? 7 : 5.5}
                    fill="#0d9488"
                    initial={reduce ? false : { scale: 0 }}
                    animate={seen ? { scale: 1 } : undefined}
                    transition={{ delay: 0.9 + i * 0.08, type: "spring", stiffness: 300 }}
                    style={{ transformOrigin: `${x1}px ${y1}px` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* nodes */}
          {services.map((s, i) => {
            const on = i === active;
            return (
              <motion.button
                key={s.n}
                type="button"
                onMouseEnter={() => { setHover(true); setActive(i); }}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={seen ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.09, type: "spring", stiffness: 200, damping: 16 }}
                className="absolute aspect-square"
                style={{ left: pct(s.x - NODE / 2, SW), top: pct(s.y - NODE / 2, SH), width: pct(NODE, SW) }}
                aria-pressed={on}
                aria-label={`${s.n} ${s.title.join(" ")}`}
              >
                <motion.span
                  animate={{ scale: on ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-white to-[#f4f7f9] shadow-[0_18px_34px_-16px_rgba(12,30,61,0.35),inset_0_-4px_10px_rgba(148,163,184,0.12)] ring-1 transition-colors ${
                    on ? "text-[#0d9488] ring-[#0d9488]/40" : "text-[#0d9488] ring-white"
                  }`}
                >
                  {on && !reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-full border-2 border-[#0d9488]/40"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 1.35, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                  <Icon name={s.icon} className="h-[46%] w-[46%]" />
                </motion.span>
                <span
                  className={`absolute ${s.label === "t" ? "bottom-[calc(100%+14px)] left-1/2 w-[220px] -translate-x-1/2 text-center" : `top-1/2 w-[170px] -translate-y-1/2 text-left ${s.label === "l" ? "right-[calc(100%+22px)]" : "left-[calc(100%+20px)]"}`}`}
                >
                  <span className={`block text-[22px] font-bold leading-none transition-colors ${on ? "text-[#0d9488]" : "text-[#0d9488]/85"}`}>{s.n}</span>
                  <span className="mt-1.5 block text-[15px] font-medium leading-snug text-[#0c1e3d]">
                    {s.title[0]}
                    {s.label === "t" ? " " : <br />}
                    {s.title[1]}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* active description */}
        <div className="mt-2 hidden justify-center xl:flex">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-small rounded-full border border-slate-200 bg-white/90 px-5 py-2 text-slate-600 shadow-sm"
              aria-live="polite"
            >
              <span className="font-semibold text-[#0d9488]">{services[active].n}</span>
              <span className="mx-2 text-slate-300">|</span>
              {services[active].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Mobile / tablet layout */}
        <div className="mt-8 xl:hidden">
          <div className="relative mx-auto w-[220px]">
            <motion.div animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative z-10 mx-auto w-[120px]">
              <Image src={IMG.bulb.src} alt={$t("MagentoServices__t7", "Magento ideas light bulb")} width={IMG.bulb.w} height={IMG.bulb.h} sizes="120px" className="h-auto w-full" />
            </motion.div>
            <Image src={IMG.tablet.src} alt="" width={IMG.tablet.w} height={IMG.tablet.h} sizes="220px" className="-mt-10 h-auto w-full" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.map((s, i) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d9488]/10 text-[#0d9488]">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="text-sm font-bold text-[#0d9488]">{s.n}</span>{" "}
                  <span className="text-sm font-semibold text-[#0c1e3d]">{s.title.join(" ")}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">{s.text}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* One platform banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto mt-10 flex max-w-[1100px] flex-col items-center gap-6 overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-r from-[#eef3f7] via-white to-[#eef5f5] px-6 py-6 sm:mt-12 md:flex-row md:gap-8 md:px-10"
        >
          <div className="relative h-[130px] w-[180px] shrink-0">
            {[0, 1, 2].map((r) => (
              <motion.span
                key={r}
                aria-hidden
                className="absolute left-1/2 top-[44%] rounded-full border border-[#0d9488]/20"
                style={{ width: 90 + r * 36, height: 90 + r * 36, translate: "-50% -50%" }}
                animate={reduce ? undefined : { opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 3, delay: r * 0.4, repeat: Infinity }}
              />
            ))}
            <Image src={IMG.podium.src} alt="" width={IMG.podium.w} height={IMG.podium.h} sizes="180px" className="absolute bottom-[-18px] left-0 h-auto w-full" />
            <motion.div
              className="absolute bottom-[34px] left-1/2 w-[62px] -translate-x-1/2"
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Emblem sizes="62px" className="w-full" />
            </motion.div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className={`text-h4 ${heading.className} font-semibold text-[#0c1e3d]`}>{rich($t("MagentoServices__t8m", "One platform. <span class=\"text-[#0d9488]\">Endless possibilities.</span>"))}</h3>
            <p className="text-body mt-2 max-w-[520px] text-slate-600">
              {rich($t("MagentoServices__t10", "Whether you’re building from scratch or improving an existing store, get Magento expertise aligned with what you need."))}</p>
          </div>
          <Link
            href={$t("MagentoServices__t11", "#magento-proposal")}
            className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-md bg-[#0c1e3d] px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/20 transition-[left] duration-700 group-hover:left-[120%]" />
            {$t("MagentoServices__t12", "Tell us your requirement")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
