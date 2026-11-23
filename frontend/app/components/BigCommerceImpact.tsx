"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";
import CountUp from "./CountUp";
import { BC, BrandRow, CtaStrip, Eyebrow, Icon, Swoosh, ease, fadeUp, heading, useSeen, type IconName } from "./BigCommerceShared";

/*
 * NOTE: the case study below is placeholder content ("Hearth & Haven" is a fictional brand and
 * the quote/person are illustrative). Replace with a real, approved client story before launch.
 */
const BRAND = "Hearth & Haven";

const results: { icon: IconName; value: React.ReactNode; label: [string, string] }[] = [
  { icon: "trend", value: <CountUp to={3.2} decimals={1} suffix="x" />, label: ["Revenue Growth", "in just 12 months"] },
  { icon: "cart", value: <CountUp to={2.7} decimals={1} suffix="x" />, label: ["Increase in", "Conversion Rate"] },
  { icon: "network", value: <CountUp to={40} suffix="%+" />, label: ["Growth in", "International Sales"] },
];

const brands = [
  { name: "Hearth & Haven", style: "font-serif italic text-xl" },
  { name: "NORTHPEAK", style: "font-black tracking-wider text-lg" },
  { name: "VELORA", style: "font-light tracking-[0.35em] text-lg" },
  { name: "Maple&Co", style: "font-bold text-xl" },
  { name: "SUMMIT", style: "font-serif tracking-[0.2em] text-lg" },
  { name: "◈ PAWSOME", style: "font-semibold tracking-wide text-lg" },
];

/* Chart milestones on the image's growth curve (image pixels). */
const milestones = [
  { x: 670, y: 742, label: "MONTH 1", sub: "Laying the foundation", drop: 1.8 },
  { x: 1060, y: 677, label: "MONTH 6", sub: "Strong momentum", drop: 5.5 },
  { x: 1516, y: 416, label: "MONTH 12", sub: "Breakout growth", drop: 20 },
];
const IW = BC.home.w, IH = BC.home.h;
const px = (x: number) => `${(x / IW) * 100}%`;
const py = (y: number) => `${(y / IH) * 100}%`;

export default function BigCommerceImpact() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.25);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f8fe] to-[#eef3fc] py-12 sm:py-16">
      <Container className="relative">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">Real brands. Real results.</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${heading.className} mt-5 text-[38px] font-bold leading-[1.08] tracking-tight text-[#0b1a4a] sm:text-5xl lg:text-[60px]`}
          >
            Your Growth.
            <br />
            Our{" "}
            <span className="relative inline-block text-[#2348e6]">
              Real Impact.
              <Swoosh className="-bottom-2 left-0 h-3 w-[60%]" />
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-5 text-base text-slate-600 sm:text-lg">
            See how businesses like yours scale higher with BigCommerce.
          </motion.p>
        </div>

        <div className="mt-10 grid items-center gap-10 xl:grid-cols-[0.62fr_1fr] xl:gap-8">
          {/* story */}
          <div>
            <motion.span variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="inline-block rounded-full bg-gradient-to-r from-[#2348e6] to-[#3b6cf6] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
              Success story
            </motion.span>
            <motion.p variants={fadeUp} custom={0.5} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-4 font-serif text-[34px] italic leading-none text-[#1f2937]">
              {BRAND}
              <span className="ml-1 align-top text-[10px] not-italic tracking-[0.3em] text-slate-500">HOME</span>
            </motion.p>
            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-3 max-w-[340px] text-[15px] text-slate-600">
              From inspiration to impact—scaling globally with BigCommerce.
            </motion.p>
            <ul className="mt-6 grid grid-cols-3 border-t border-slate-200 pt-6">
              {results.map((r, i) => (
                <motion.li key={r.label[0]} variants={fadeUp} custom={1.5 + i * 0.4} initial="hidden" whileInView="show" viewport={{ once: true }} className={`group px-3 first:pl-0 ${i > 0 ? "border-l border-slate-200" : ""}`}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white text-[#2348e6] shadow-[0_10px_22px_-12px_rgba(35,72,230,0.6)] transition-transform group-hover:-translate-y-1">
                    <Icon name={r.icon} className="h-6 w-6" />
                  </span>
                  <p className={`${heading.className} mt-3 text-[26px] font-bold text-[#1d3fd8]`}>{r.value}</p>
                  <p className="text-[12.5px] leading-snug text-slate-600">
                    <span className="font-medium text-[#0b1a4a]">{r.label[0]}</span>
                    <br />
                    {r.label[1]}
                  </p>
                </motion.li>
              ))}
            </ul>
            <motion.figure
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-7 max-w-[420px] rounded-2xl border border-white bg-white/90 p-5 shadow-[0_20px_44px_-28px_rgba(11,26,74,0.45)]"
            >
              <div className="flex gap-4">
                <span className="font-serif text-5xl leading-none text-[#2348e6]">“</span>
                <blockquote className="text-[14px] leading-relaxed text-slate-700">
                  BigCommerce gave us the flexibility, performance, and scalability to take our brand to the next level globally.
                </blockquote>
              </div>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-amber-300 text-sm font-bold text-white">EM</span>
                <span>
                  <span className="block text-sm font-semibold text-[#0b1a4a]">Elena Marsh</span>
                  <span className="block text-xs text-slate-500">Founder &amp; Creative Director</span>
                </span>
              </figcaption>
            </motion.figure>
          </div>

          {/* showcase */}
          <div ref={ref} className="relative mx-auto aspect-[1753/897] w-full max-w-[860px] [container-type:inline-size] 2xl:max-w-[980px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={seen ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1, ease }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_56%_58%_at_50%_50%,black_78%,transparent_100%)]">
                <Image src={BC.home.src} alt={`${BRAND} storefront on tablet and phone`} fill sizes="(min-width:1280px) 860px, 92vw" className="object-contain" />
              </div>

              {/* tablet header */}
              <div className="absolute flex items-center justify-between" style={{ left: px(480), top: py(80), width: px(760), height: py(60) }}>
                <span className="font-serif text-[1.55cqw] italic text-[#1f2937]">{BRAND}</span>
                <span className="flex items-center gap-[1.4cqw] text-[0.62cqw] font-medium tracking-wider text-slate-600">
                  <span>SHOP</span><span>COLLECTIONS</span><span>ABOUT US</span><span>SALE</span>
                  <Icon name="search" className="h-[1cqw] w-[1cqw]" />
                  <Icon name="cart" className="h-[1cqw] w-[1cqw]" />
                </span>
              </div>
              {/* tablet hero */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={seen ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="absolute"
                style={{ left: px(500), top: py(215) }}
              >
                <p className={`${heading.className} text-[2cqw] font-medium leading-[1.2] text-[#1f2937]`}>Timeless Style.<br />Inspired Living.</p>
                <span className="mt-[1cqw] inline-block rounded-full bg-[#1f2937] px-[1.2cqw] py-[0.45cqw] text-[0.6cqw] font-semibold tracking-wider text-white">SHOP NOW</span>
              </motion.div>
              {/* category labels */}
              {[
                ["FURNITURE", 570],
                ["BED & BATH", 750],
                ["DÉCOR", 935],
                ["LIGHTING", 1122],
              ].map(([t, x]) => (
                <span key={t} className="absolute -translate-x-1/2 text-[0.55cqw] font-semibold tracking-wider text-slate-600" style={{ left: px(x as number), top: py(628) }}>{t}</span>
              ))}
              {/* phone */}
              <div className="absolute flex items-center justify-between text-[#1f2937]" style={{ left: px(212), top: py(282), width: px(196) }}>
                <span className="text-[0.9cqw]">☰</span>
                <span className="font-serif text-[0.8cqw] italic">{BRAND}</span>
                <Icon name="cart" className="h-[0.9cqw] w-[0.9cqw]" />
              </div>
              <p className={`${heading.className} absolute text-[0.95cqw] font-medium leading-[1.2] text-[#1f2937]`} style={{ left: px(218), top: py(345) }}>Timeless Style.<br />Inspired Living.</p>
              <p className="absolute text-[0.75cqw] font-semibold text-[#1f2937]" style={{ left: px(222), top: py(565) }}>Best Sellers</p>

              {/* milestones */}
              {milestones.map((m, i) => (
                <div key={m.label} className="absolute" style={{ left: px(m.x), top: py(m.y) }}>
                  {!reduce && <span className="mag-anim absolute h-[1.4cqw] w-[1.4cqw] rounded-full border-2 border-blue-500" style={{ animation: `magPing 2.2s ease-out ${i * 0.5}s infinite` }} />}
                  <span className="absolute border-l border-dashed border-blue-400/60" style={{ top: "0.6cqw", height: `${m.drop}cqw` }} />
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={seen ? { opacity: 1, y: 0 } : undefined}
                    transition={{ delay: 1 + i * 0.3 }}
                    className="absolute w-[14cqw] -translate-x-1/2 text-center"
                    style={{ top: `${m.drop + 0.6}cqw` }}
                  >
                    <span className="block text-[1.05cqw] font-bold tracking-wider text-[#2348e6]">{m.label}</span>
                    <span className="block text-[0.95cqw] text-slate-600">{m.sub}</span>
                  </motion.span>
                </div>
              ))}
              {/* 12-month bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={seen ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
                className="absolute w-[10%] rounded-2xl border border-white bg-white/95 py-[0.8cqw] text-center shadow-[0_18px_36px_-18px_rgba(35,72,230,0.6)]"
                style={{ left: px(1310), top: py(60) }}
              >
                <span className="mx-auto block w-fit rounded-full bg-blue-50 px-[0.7cqw] text-[0.6cqw] font-bold tracking-wider text-[#2348e6]">12 MONTHS</span>
                <span className={`${heading.className} mt-[0.3cqw] block text-[2.4cqw] font-bold text-[#1d3fd8]`}>3.2x</span>
                <span className="block text-[0.75cqw] leading-tight text-slate-600">Revenue<br />Growth</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2348e6]">
            <span className="h-px w-10 bg-[#2348e6]/50" /> Trusted by growing brands worldwide <span className="h-px w-10 bg-[#2348e6]/50" />
          </p>
          <BrandRow brands={brands} className="mt-5" />
        </div>

        <div className="mt-10">
          <CtaStrip
            dark
            title="Ready to Make Your"
            accent="Growth Happen?"
            text="Join thousands of brands turning potential into performance with BigCommerce."
            checks={[
              { icon: "check", label: "No credit card required" },
              { icon: "bolt", label: "Setup in minutes" },
              { icon: "clock", label: "Cancel anytime" },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
