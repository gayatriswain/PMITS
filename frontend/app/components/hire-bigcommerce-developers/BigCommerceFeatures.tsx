"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, BC, DotGrid, Eyebrow, Icon, QUOTE_HREF, ease, fadeUp, heading, useSeen, type IconName } from "./BigCommerceShared";

/* Stage 900×400 (from the design). Icons are 74 across. */
const SW = 900, SH = 400, ICON = 74;
type F = { title: string; text: string; icon: IconName; x: number; y: number; side: "l" | "r" };
const feats: F[] = [
  { title: "Custom Storefronts", text: "Design unique, conversion-focused storefronts that reflect your brand and captivate customers.", icon: "store", x: 302, y: 60, side: "l" },
  { title: "Powerful Integrations", text: "Connect with 100+ apps and tools to streamline your workflow and extend your store’s capabilities.", icon: "puzzle", x: 230, y: 200, side: "l" },
  { title: "Scalable Infrastructure", text: "Enterprise-grade platform that grows with your business—no matter the size or scale.", icon: "grid", x: 268, y: 357, side: "l" },
  { title: "Secure & Reliable", text: "Bank-grade security with 99.99% uptime to keep your store and customer data always protected.", icon: "shieldCheck", x: 605, y: 60, side: "r" },
  { title: "Performance Optimized", text: "Lightning-fast load times and optimized performance for higher conversions.", icon: "gauge", x: 672, y: 200, side: "r" },
  { title: "Actionable Insights", text: "Real-time analytics and reports to track what matters and drive smarter growth.", icon: "chart", x: 630, y: 357, side: "r" },
];
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export default function BigCommerceFeatures() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref);
  const live = useSeen(ref, 0.3, false);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduce || !live || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % feats.length), 2300);
    return () => clearInterval(t);
  }, [reduce, live, hold]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f9fc] to-[#f1f5fa] py-12 sm:py-16">
      <DotGrid className="left-[3%] top-[30%] hidden xl:grid" cols={8} rows={10} />
      <DotGrid className="bottom-[16%] right-[3%] hidden xl:grid" cols={8} rows={6} />
      <Container className="relative">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">BigCommerce Development</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${heading.className} mt-5 text-[40px] font-bold leading-[1.05] tracking-tight text-[#0b1a4a] sm:text-6xl lg:text-[68px]`}
          >
            Build Commerce.
            <br />
            Scale <span className="text-[#0d8f9a]">Success.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-4 text-base text-slate-600 sm:text-lg">
            End-to-end BigCommerce development for stores that
            <br className="hidden sm:block" />{" "}
            <span className="font-semibold text-[#0d8f9a]">grow bigger, sell smarter, and scale faster.</span>
          </motion.p>
        </div>

        {/* desktop stage */}
        <div ref={ref} className="relative mx-auto mt-8 hidden aspect-[900/400] w-full max-w-[1120px] xl:block 2xl:max-w-[1260px]" onMouseLeave={() => setHold(false)}>
          {/* coding workspace inside its glowing ring (image 831 units wide at (72,-15)) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={seen ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.1, ease }}
            className="absolute [container-type:inline-size]"
            style={{ left: pct(72, SW), top: pct(-15, SH), width: pct(831, SW), aspectRatio: "1736 / 906" }}
          >
            <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_45.5%_52%,black_36%,transparent_56%)]">
              <Image src={BC.coding.src} alt="BigCommerce developer coding a storefront" fill sizes="1000px" className="object-contain" />
            </div>
            {/* wordmark on the blank monitor */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={seen ? { opacity: 1 } : undefined}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: "49.6%", top: "39%" }}
            >
              <svg viewBox="0 0 40 34" className="mx-auto mb-[0.3cqw] w-[2.2cqw]" aria-hidden>
                <path d="M4 32 36 2v30Z" fill="#0b1a4a" />
                <path d="M18 18h8a5 5 0 0 1 0 10h-8Z" fill="#fff" />
              </svg>
              <p className={`${heading.className} text-[1.25cqw] font-bold tracking-tight text-[#0b1a4a]`}>BIGCOMMERCE</p>
            </motion.div>
            {/* spinning arc over the ring */}
            {!reduce && (
              <svg viewBox="0 0 100 100" className="mag-anim absolute" style={{ left: "25.1%", top: "12.1%", width: "41.5%", aspectRatio: "1", animation: "magSpin 14s linear infinite" }} aria-hidden>
                <circle cx="50" cy="50" r="48.5" fill="none" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="18 286" strokeLinecap="round" />
              </svg>
            )}
          </motion.div>

          {/* connectors: dot by the title → icon */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${SW} ${SH}`} fill="none" aria-hidden>
            {feats.map((f, i) => {
              const s = f.side === "l" ? -1 : 1;
              const x1 = f.x + s * 50, y1 = f.y - 44, x2 = f.x + s * 26, y2 = f.y - 27;
              const on = i === active;
              return (
                <g key={f.title}>
                  <motion.path
                    d={`M${x1} ${y1} L${x2} ${y2}`}
                    stroke="#0d8f9a"
                    strokeOpacity={on ? 1 : 0.5}
                    strokeWidth={on ? 1.8 : 1.2}
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={seen ? { pathLength: 1 } : undefined}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  />
                  <circle cx={x1} cy={y1} r={on ? 4 : 3} fill="#0d8f9a" />
                </g>
              );
            })}
          </svg>

          {feats.map((f, i) => {
            const on = i === active;
            return (
              <motion.button
                key={f.title}
                type="button"
                onMouseEnter={() => { setHold(true); setActive(i); }}
                onFocus={() => setActive(i)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={seen ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.1, type: "spring", stiffness: 200, damping: 16 }}
                className="absolute aspect-square"
                style={{ left: pct(f.x - ICON / 2, SW), top: pct(f.y - ICON / 2, SH), width: pct(ICON, SW) }}
              >
                <span
                  className={`relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-white to-[#f3f7fb] shadow-[0_18px_34px_-16px_rgba(11,26,74,0.4)] ring-1 transition-all duration-300 ${
                    on ? "scale-110 text-[#0d8f9a] ring-[#0d8f9a]/40" : "text-[#0d8f9a] ring-white"
                  }`}
                >
                  {on && !reduce && <span className="absolute inset-0 animate-ping rounded-full border border-[#0d8f9a]/40 [animation-duration:1.8s]" />}
                  <Icon name={f.icon} className="h-[46%] w-[46%]" />
                </span>
                <span
                  className={`absolute w-[190px] ${f.side === "l" ? "right-[calc(100%+30px)] text-right" : "left-[calc(100%+30px)] text-left"}`}
                  style={{ top: "-62%" }}
                >
                  <span className={`${heading.className} block text-[17px] font-semibold transition-colors ${on ? "text-[#0d8f9a]" : "text-[#0b1a4a]"}`}>{f.title}</span>
                  <span className="mt-1.5 block text-[13px] leading-relaxed text-slate-600">{f.text}</span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* mobile / tablet */}
        <div className="mt-8 xl:hidden">
          <div className="relative mx-auto aspect-square w-[min(100%,380px)] overflow-hidden rounded-full border-4 border-cyan-200/70 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
            <Image src={BC.coding.src} alt="BigCommerce developer coding a storefront" fill sizes="380px" className="scale-[2.05] object-cover object-[46%_50%]" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feats.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i * 0.4} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex gap-4 rounded-2xl border border-white bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d8f9a]/10 text-[#0d8f9a]">
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className={`${heading.className} block font-semibold text-[#0b1a4a]`}>{f.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-slate-600">{f.text}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 flex flex-col items-center gap-5 xl:mt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            <Link href={QUOTE_HREF} className="group inline-flex items-center justify-center gap-8 rounded-md bg-[#0d8f9a] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_14px_30px_-14px_rgba(13,143,154,0.9)] transition hover:-translate-y-0.5 hover:bg-[#0b7c86]">
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={QUOTE_HREF} className="group inline-flex items-center justify-center gap-8 rounded-md border border-[#0d8f9a]/70 bg-white/70 px-9 py-3.5 text-[15px] font-semibold text-[#0d8f9a] transition hover:-translate-y-0.5 hover:bg-white">
              View Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="flex -space-x-2">
              {[
                ["RS", "from-amber-300 to-orange-400"],
                ["AK", "from-sky-300 to-blue-500"],
                ["NP", "from-teal-300 to-cyan-600"],
              ].map(([t, g]) => (
                <span key={t} className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br text-[10px] font-bold text-white ${g}`}>{t}</span>
              ))}
            </span>
            <span>Let’s build something <span className="font-semibold text-[#0d8f9a]">amazing</span> together.</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
