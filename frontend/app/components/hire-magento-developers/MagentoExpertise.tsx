"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { Emblem, Eyebrow, Icon, IMG, ease, fadeUp, heading, useSeen, type IconName } from "../shared/MagentoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

type Item = { text: string; icon: IconName };
const left__cms: Item[] = [
  { text: "Magento Design and Development", icon: "pen" },
  { text: "Vast research and development", icon: "search" },
  { text: "Fair and honest quote upfront", icon: "doc" },
  { text: "Zero downtime", icon: "clock" },
];
const right__cms: Item[] = [
  { text: "Services for all sectors of economy", icon: "users" },
  { text: "Customization of Magento extension", icon: "puzzle" },
  { text: "Authorization to source code", icon: "code" },
  { text: "Solid support round the clock", icon: "headset" },
];
const badges__cms: { label: [string, string]; icon: IconName }[] = [
  { label: ["Multi-Industry", "Experience"], icon: "diamond" },
  { label: ["Certified", "Developers"], icon: "users" },
  { label: ["Custom", "Solutions"], icon: "cog" },
  { label: ["Scalable", "Performance"], icon: "chart" },
];

/* Geometry from the design mock, in a 1640×560 stage.
   Icons (104 across) sit on an outer curve; each one is joined by a short line to an
   orange dot on the inner arc (circle centred on (820,270), r=382). */
const SW = 1640, SH = 560, CX = 820, CY = 270, R = 382, ICON = 104;
const ICONS_L: [number, number][] = [[350, 95], [303, 215], [318, 335], [355, 455]];
const ICONS_R: [number, number][] = ICONS_L.map(([x, y]) => [SW - x - 0, y]);
const arcX = (side: -1 | 1, y: number) => CX + side * Math.sqrt(R * R - (y - CY) * (y - CY));
const arcPath = (side: -1 | 1) => `M ${arcX(side, 0)} 0 A ${R} ${R} 0 0 ${side === -1 ? 0 : 1} ${arcX(side, 540)} 540`;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export default function MagentoExpertise() {
  const $t = useCmsText();
  const left = useCmsData("MagentoExpertise__left", left__cms);
  const right = useCmsData("MagentoExpertise__right", right__cms);
  const badges = useCmsData("MagentoExpertise__badges", badges__cms);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const inView = useSeen(ref, 0.3, false);
  const seen = useSeen(ref);
  const [active, setActive] = useState(0); // 0..7 (left 0-3, right 4-7)
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduce || !inView || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % 8), 1900);
    return () => clearInterval(t);
  }, [reduce, inView, hold]);

  const all = [...left.map((it, i) => ({ ...it, side: -1 as const, row: i, idx: i })), ...right.map((it, i) => ({ ...it, side: 1 as const, row: i, idx: i + 4 }))];

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[52%] h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(241,245,249,1),rgba(255,255,255,0))]" />
      <Container className="relative">
        <div className="mx-auto max-w-[900px] text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">{$t("MagentoExpertise__t1", "Industry focused expertise")}</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-h2 ${heading.className} mt-5 font-bold tracking-tight text-[#0c1e3d]`}
          >
            {$t("MagentoExpertise__t2", "Magento Developers Having")}<br />
            <span className="text-[#0d9488]">{html($t("MagentoExpertise__t3", "Industry Specific Expertise"))}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mx-auto mt-5 max-w-[760px] text-slate-600">
            {rich($t("MagentoExpertise__t4", "When you choose ProManage IT Solution over its competitors, you get a unique benefit of hiring certified Magento developers having experience in your chosen niche. Yes, we have a team of very talented Magento developers coming from different backgrounds and industries. What this means is that besides hiring Magento developers on an hourly, monthly, or contractual basis, you also get industry specific experience in your Magento developers."))}</motion.p>
        </div>

        {/* Desktop radial stage */}
        <div ref={ref} className="relative mx-auto mt-8 hidden aspect-[1640/560] w-full max-w-[1240px] xl:block" onMouseLeave={() => setHold(false)}>
          {/* concentric halo circles behind the emblem */}
          {[300, 230].map((r, k) => (
            <motion.span
              key={r}
              aria-hidden
              className={`absolute rounded-full border ${k ? "border-slate-200/80 bg-gradient-to-b from-white to-slate-50/60" : "border-slate-100"}`}
              style={{ left: pct(CX - r, SW), top: pct(250 - r, SH), width: pct(2 * r, SW), height: pct(2 * r, SH) }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={seen ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 1.1, delay: k * 0.15, ease }}
            />
          ))}
          <span aria-hidden className="mag-anim absolute rounded-full border border-dashed border-orange-300/40" style={{ left: pct(CX - 200, SW), top: pct(250 - 200, SH), width: pct(400, SW), height: pct(400, SH), animation: "magSpin 50s linear infinite" }} />

          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${SW} ${SH}`} fill="none" aria-hidden>
            <defs>
              <linearGradient id="magArcFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#cbd5e1" stopOpacity="0" />
                <stop offset="0.15" stopColor="#cbd5e1" />
                <stop offset="0.85" stopColor="#cbd5e1" />
                <stop offset="1" stopColor="#cbd5e1" stopOpacity="0" />
              </linearGradient>
            </defs>
            {([-1, 1] as const).map((side) => (
              <g key={side}>
                <motion.path
                  d={arcPath(side)}
                  stroke="url(#magArcFade)"
                  strokeWidth="1.6"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={seen ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.4, ease }}
                />
                {!reduce && (
                  <circle r="4" fill="#f97316" opacity="0.9">
                    <animateMotion dur="6s" repeatCount="indefinite" path={arcPath(side)} keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
                  </circle>
                )}
              </g>
            ))}
            {all.map((it) => {
              const [ix, iy] = (it.side === -1 ? ICONS_L : ICONS_R)[it.row];
              const dy = [105, 224, 333, 435][it.row];
              const dx = arcX(it.side, dy);
              const sx = ix - it.side * (ICON / 2 + 6); // start just outside the icon, on the side facing the emblem
              const mx = (sx + dx) / 2;
              const on = it.idx === active;
              return (
                <g key={it.text}>
                  <motion.path
                    d={`M ${sx} ${iy} C ${mx} ${iy}, ${mx} ${dy}, ${dx} ${dy}`}
                    stroke={on ? "#f97316" : "#fdba74"}
                    strokeOpacity={on ? 1 : 0.7}
                    strokeWidth={on ? 2.2 : 1.4}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={seen ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.6, delay: 0.7 + it.row * 0.1 }}
                  />
                  {on && !reduce && (
                    <circle cx={dx} cy={dy} r="7" fill="none" stroke="#f97316" strokeWidth="1.5" className="mag-anim" style={{ transformOrigin: `${dx}px ${dy}px`, animation: "magDotPing 1.6s ease-out infinite" }} />
                  )}
                  <motion.circle
                    cx={dx}
                    cy={dy}
                    r={on ? 7.5 : 6}
                    fill="#f97316"
                    stroke="#fff"
                    strokeWidth="2"
                    initial={reduce ? false : { scale: 0 }}
                    animate={seen ? { scale: 1 } : undefined}
                    transition={{ delay: 1 + it.row * 0.1, type: "spring", stiffness: 300 }}
                    style={{ transformOrigin: `${dx}px ${dy}px` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* orange glow ring + podium */}
          <motion.span
            aria-hidden
            className="absolute rounded-[50%] shadow-[0_0_30px_6px_rgba(251,146,60,0.35),inset_0_0_18px_rgba(251,146,60,0.35)]"
            style={{ left: pct(CX - 235, SW), top: pct(450, SH), width: pct(470, SW), height: pct(80, SH), border: "2px solid rgba(251,146,60,0.85)" }}
            animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={seen ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, ease }}
            className="absolute"
            style={{ left: pct(CX - 338, SW), top: pct(246, SH), width: pct(677, SW) }}
          >
            <Image src={IMG.podium.src} alt="" width={IMG.podium.w} height={IMG.podium.h} sizes="520px" className="h-auto w-full" />
          </motion.div>
          <motion.span
            aria-hidden
            className="absolute rounded-full bg-[radial-gradient(closest-side,rgba(249,115,22,0.25),transparent)]"
            style={{ left: pct(CX - 220, SW), top: pct(20, SH), width: pct(440, SW), height: pct(440, SH) }}
            animate={reduce ? undefined : { scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={seen ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="absolute"
            style={{ left: pct(CX - 157, SW), top: pct(48, SH), width: pct(315, SW) }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Emblem sizes="240px" className="w-full" />
            </motion.div>
          </motion.div>

          {/* icons + labels */}
          {all.map((it) => {
            const [ix, iy] = (it.side === -1 ? ICONS_L : ICONS_R)[it.row];
            const on = it.idx === active;
            return (
              <motion.button
                key={it.text}
                type="button"
                onMouseEnter={() => { setHold(true); setActive(it.idx); }}
                onFocus={() => setActive(it.idx)}
                initial={{ opacity: 0, x: it.side * 30 }}
                animate={seen ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.6, delay: 0.5 + it.row * 0.1, ease }}
                className="absolute aspect-square"
                style={{ left: pct(ix - ICON / 2, SW), top: pct(iy - ICON / 2, SH), width: pct(ICON, SW) }}
              >
                <span
                  className={`relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-white to-[#fdf7f3] shadow-[0_16px_30px_-14px_rgba(12,30,61,0.3),inset_0_-3px_8px_rgba(251,146,60,0.08)] ring-1 transition-all duration-300 ${
                    on ? "scale-110 text-orange-500 ring-orange-300" : "text-orange-500 ring-white"
                  }`}
                >
                  {on && !reduce && <span className="absolute inset-0 animate-ping rounded-full border border-orange-300 [animation-duration:1.6s]" />}
                  <Icon name={it.icon} className="h-[48%] w-[48%]" />
                </span>
                <span
                  className={`absolute top-1/2 w-[165px] -translate-y-1/2 text-[14px] leading-snug transition-colors ${
                    it.side === -1 ? "right-[calc(100%+18px)] text-right" : "left-[calc(100%+18px)] text-left"
                  } ${on ? "font-semibold text-[#0c1e3d]" : "text-[#1e293b]"}`}
                >
                  {it.text}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile list */}
        <div className="mt-8 xl:hidden">
          <div className="relative mx-auto h-[180px] w-[220px]">
            <Image src={IMG.podium.src} alt="" width={IMG.podium.w} height={IMG.podium.h} sizes="220px" className="absolute bottom-0 h-auto w-full" />
            <motion.div animate={reduce ? undefined : { y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute left-1/2 top-0 w-[100px] -translate-x-1/2">
              <Emblem sizes="100px" className="w-full" />
            </motion.div>
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[...left, ...right].map((it, i) => (
              <motion.li key={it.text} variants={fadeUp} custom={i * 0.4} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <Icon name={it.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm text-[#0c1e3d]">{it.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mt-10 grid max-w-[640px] grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0">
          {badges.map((b, i) => (
            <motion.li
              key={b.label.join(" ")}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.1 } } }}
              className={`flex items-center justify-center gap-3 ${i > 0 ? "sm:border-l sm:border-slate-200" : ""}`}
            >
              <Icon name={b.icon} className="h-6 w-6 text-[#0d9488]" />
              <span className="text-xs leading-tight text-slate-600">
                {b.label[0]}
                <br />
                {b.label[1]}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
