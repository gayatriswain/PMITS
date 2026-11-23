"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, Eyebrow, Icon, IMG, ease, fadeUp, heading, type IconName } from "../shared/MagentoShared";

const industries: { label: [string, string?]; icon: IconName; tint: string; color: string }[] = [
  { label: ["Retail &", "eCommerce"], icon: "cart", tint: "bg-teal-50", color: "text-[#0d9488]" },
  { label: ["Healthcare"], icon: "health", tint: "bg-cyan-50", color: "text-[#0e7490]" },
  { label: ["Real Estate"], icon: "building", tint: "bg-violet-50", color: "text-violet-600" },
  { label: ["Education"], icon: "cap", tint: "bg-orange-50", color: "text-orange-500" },
  { label: ["Finance"], icon: "bank", tint: "bg-teal-50", color: "text-[#0b5f5a]" },
];

/* Floating chips on the full-bleed image panel (percent of the panel, from the design mock). */
const chips: { text: [string, string]; icon: IconName; tint: string; pos: string; depth: number }[] = [
  { text: ["Magento Design and", "Development"], icon: "pen", tint: "bg-orange-50 text-orange-500", pos: "left-[21%] top-[12%]", depth: 10 },
  { text: ["Vast research and", "development"], icon: "search", tint: "bg-sky-50 text-sky-600", pos: "left-[5%] top-[28%]", depth: 14 },
  { text: ["Fair and honest", "quote upfront"], icon: "doc", tint: "bg-violet-50 text-violet-600", pos: "left-[2%] top-[38.5%]", depth: 8 },
  { text: ["Services for all", "sectors of economy"], icon: "users", tint: "bg-slate-100 text-[#0c1e3d]", pos: "right-[6%] top-[17%]", depth: -10 },
  { text: ["Customization", "of Magento extension"], icon: "puzzle", tint: "bg-orange-50 text-orange-500", pos: "right-[3%] top-[30%]", depth: -14 },
  { text: ["Authorization", "to source code"], icon: "code", tint: "bg-orange-50 text-orange-500", pos: "right-[4%] top-[42%]", depth: -8 },
  { text: ["Solid support", "round the clock"], icon: "headset", tint: "bg-orange-50 text-orange-600", pos: "right-[4%] top-[53%]", depth: -12 },
];

const badges: { label: [string, string]; icon: IconName }[] = [
  { label: ["Multi-Industry", "Experience"], icon: "diamond" },
  { label: ["Certified", "Developers"], icon: "users" },
  { label: ["Custom", "Solutions"], icon: "cog" },
  { label: ["Scalable", "Performance"], icon: "chart" },
];

function Badges({ className = "" }: { className?: string }) {
  return (
    <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} className={className}>
      {badges.map((b, i) => (
        <motion.li
          key={b.label.join(" ")}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } } }}
          className={`group flex items-center justify-center gap-3 ${i > 0 ? "sm:border-l sm:border-slate-300/70" : ""}`}
        >
          <Icon name={b.icon} className="h-7 w-7 text-[#0c1e3d] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-[#0d9488]" />
          <span className="text-[13px] leading-tight text-[#0c1e3d]">
            {b.label[0]}
            <br />
            {b.label[1]}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function Chip({ c, i, mx, my, reduce }: { c: (typeof chips)[number]; i: number; mx: MotionValue<number>; my: MotionValue<number>; reduce: boolean | null }) {
  const x = useTransform(mx, (v) => v * c.depth);
  const y = useTransform(my, (v) => v * c.depth);
  return (
    <motion.div style={{ x, y }} className={`absolute z-10 ${c.pos}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 14 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/85 px-3.5 py-3 shadow-[0_14px_30px_-16px_rgba(12,30,61,0.35)] backdrop-blur-md"
        >
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${c.tint}`}>
            <Icon name={c.icon} className="h-5 w-5" />
          </span>
          <span className="text-[12.5px] font-medium leading-snug text-[#0c1e3d]">
            {c.text[0]}
            <br />
            {c.text[1]}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function MagentoIndustry() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useSpring(rx, { stiffness: 60, damping: 18 });
  const my = useSpring(ry, { stiffness: 60, damping: 18 });
  const imgX = useTransform(mx, (v) => v * -6);
  const imgY = useTransform(my, (v) => v * -6);

  useEffect(() => {
    if (reduce || !inView || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % industries.length), 2200);
    return () => clearInterval(t);
  }, [reduce, inView, hold]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-r from-white via-[#f6f9fa] to-[#e3eff2] py-12 sm:py-16 lg:py-20"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        rx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
        ry.set(((e.clientY - r.top) / r.height - 0.5) * 2);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {/* Desktop: showcase image as a full-bleed panel glued to the right edge, fading into the copy on the left */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block">
        <motion.div
          style={{ x: imgX, y: imgY }}
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1.03 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_100%),linear-gradient(to_bottom,transparent_0%,black_6%,black_92%,transparent_100%)] [mask-composite:intersect]"
        >
          <Image src={IMG.showcase.src} alt="Magento storefront on laptop and phone" fill sizes="56vw" className="object-cover object-[50%_42%]" />
        </motion.div>
        {/* soft white wash at the bottom so the badge row stays readable */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-white/85 to-transparent" />

        <motion.svg
          viewBox="0 0 300 110"
          className="absolute right-[5%] top-[3%] z-20 w-[250px] text-[#0c4a52]"
          aria-label="Industry Knowledge, Real Impact"
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
        >
          <text x="10" y="46" className="font-caveat" fontSize="32" fill="currentColor" transform="rotate(-10 10 46)">Industry Knowledge</text>
          <text x="80" y="82" className="font-caveat" fontSize="32" fill="currentColor" transform="rotate(-10 80 82)">Real Impact</text>
          <path d="M76 102 C140 92 210 78 296 48" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </motion.svg>

        <div className="pointer-events-auto">
          {chips.map((c, i) => (
            <Chip key={c.text.join(" ")} c={c} i={i} mx={mx} my={my} reduce={reduce} />
          ))}
        </div>

        <Badges className="pointer-events-auto absolute bottom-[4%] left-[12%] right-[4%] grid grid-cols-4 gap-0 rounded-2xl border border-white/80 bg-white/80 px-2 py-3.5 shadow-[0_18px_40px_-22px_rgba(12,30,61,0.4)] backdrop-blur-md" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:min-h-[680px] lg:grid-cols-[44%_1fr] lg:gap-10">
          {/* copy */}
          <div>
            <Eyebrow variant="line" align="left" className="tracking-[0.3em]">Industry focused expertise</Eyebrow>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`${heading.className} mt-5 text-[34px] font-bold leading-[1.1] tracking-tight text-[#0c1e3d] sm:text-5xl`}
            >
              Magento Developers Having
              <br />
              <span className="text-[#0d9488]">Industry Specific Expertise</span>
            </motion.h2>
            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-6 max-w-[600px] space-y-4 text-[15px] leading-relaxed text-slate-600">
              <p>
                When you choose ProManage IT Solution over its competitors, you get a unique benefit of hiring certified Magento developers having
                experience in your chosen niche. Yes, we have a team of very talented Magento developers coming from different backgrounds and
                industries. What this means is that besides hiring Magento developers on an hourly, monthly, or contractual basis, you also get
                industry specific experience in your Magento developers.
              </p>
              <p>
                No task is too big or challenging for our Magento developers as they have tons of experience behind them. We design, development of
                a mobile application, ecommerce portal, and upgrade of website from Magento 1 to Magento 2 is like another day in the office for
                our experienced Magento developers.
              </p>
            </motion.div>

            {/* industries */}
            <div
              className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5"
              onMouseLeave={() => setHold(false)}
            >
              {industries.map((it, i) => {
                const on = i === active;
                return (
                  <motion.button
                    key={it.label.join(" ")}
                    type="button"
                    onMouseEnter={() => { setHold(true); setActive(i); }}
                    onFocus={() => setActive(i)}
                    variants={fadeUp}
                    custom={i * 0.6 + 1}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className={`relative flex flex-col items-center overflow-hidden rounded-2xl border bg-white/90 px-2 pb-3 pt-4 text-center transition-all duration-300 ${
                      on ? "-translate-y-1.5 border-[#0d9488]/40 shadow-[0_18px_36px_-18px_rgba(13,148,136,0.55)]" : "border-slate-100 shadow-sm"
                    }`}
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full ${it.tint} ${it.color} transition-transform duration-300 ${on ? "scale-110" : ""}`}>
                      <Icon name={it.icon} className="h-6 w-6" />
                    </span>
                    <span className="mt-2 min-h-[32px] text-[12px] font-medium leading-tight text-[#0c1e3d]">
                      {it.label[0]}
                      {it.label[1] && (<><br />{it.label[1]}</>)}
                    </span>
                    <span className={`absolute bottom-1 right-2 text-xl font-bold transition-colors ${on ? "text-[#0d9488]/30" : "text-slate-200"}`}>0{i + 1}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href="#magento-proposal"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0b4f4c] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(11,79,76,0.8)] transition hover:-translate-y-0.5 hover:bg-[#0b5f5a]"
              >
                Hire Magento Developers
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#magento-proposal" className="group inline-flex items-center gap-3 text-sm font-semibold text-[#0c1e3d]">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
                  {!reduce && <span className="absolute inset-0 animate-ping rounded-full border border-[#0d9488]/40 [animation-duration:2.4s]" />}
                  <Icon name="play" className="ml-0.5 h-4 w-4 text-[#0c1e3d]" />
                </span>
                <span className="border-b border-[#0c1e3d]/30 pb-1 transition-colors group-hover:border-[#0d9488] group-hover:text-[#0d9488]">Talk to Our Experts</span>
              </Link>
            </motion.div>
          </div>

          {/* visual — mobile / tablet only (desktop uses the full-bleed panel above) */}
          <div className="relative lg:hidden">
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-[24px]">
              <Image src={IMG.showcase.src} alt="Magento storefront on laptop and phone" width={IMG.showcase.w} height={IMG.showcase.h} sizes="90vw" className="h-auto w-full" />
            </div>
            <Badges className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-0" />
          </div>
        </div>
      </Container>
    </section>
  );
}
