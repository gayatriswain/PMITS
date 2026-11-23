"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Container from "./Container";
import { ArrowRight, Emblem, Eyebrow, Icon, IMG, ease, fadeUp, heading, type IconName } from "./MagentoShared";

type Card = { title: string; sub?: string; icon: IconName };
const leftCards: Card[] = [
  { title: "Proven track record", sub: "of timely completion of projects", icon: "stopwatch" },
  { title: "Customized and cost", sub: "effective solutions", icon: "database" },
  { title: "Daily reporting", icon: "report" },
];
const rightCards: Card[] = [
  { title: "Industry leaders", sub: "in Magento development", icon: "team" },
  { title: "Dedicated Magento developers", sub: "for your project", icon: "userCog" },
];

function ReasonCard({ c, on, onEnter, delay, from }: { c: Card; on: boolean; onEnter: () => void; delay: number; from: -1 | 1 }) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      initial={{ opacity: 0, x: from * 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease }}
      className={`group relative flex w-full items-center gap-4 overflow-hidden rounded-xl border bg-white px-5 py-4 text-left transition-all duration-300 ${
        on ? "border-[#0d9488]/30 shadow-[0_20px_40px_-22px_rgba(13,148,136,0.55)]" : "border-slate-100 shadow-[0_12px_30px_-24px_rgba(12,30,61,0.4)]"
      }`}
    >
      <span className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-[#0d9488] transition-transform duration-500 ${on ? "scale-y-100" : "scale-y-0"}`} />
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
          on ? "bg-[#0d9488] text-white" : "bg-[#0d9488]/10 text-[#0c1e3d]"
        }`}
      >
        <Icon name={c.icon} className="h-6 w-6" />
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold text-[#0c1e3d]">{c.title}</span>
        {c.sub && <span className="block text-[13px] text-slate-500">{c.sub}</span>}
      </span>
      <ArrowRight className={`h-4 w-4 shrink-0 transition-all duration-300 ${on ? "translate-x-1 text-[#0d9488]" : "text-slate-400"} group-hover:translate-x-1.5`} />
    </motion.button>
  );
}

export default function MagentoWhyUs() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const total = leftCards.length + rightCards.length;

  useEffect(() => {
    if (reduce || !inView || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 2300);
    return () => clearInterval(t);
  }, [reduce, inView, hold, total]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafb] to-white py-12 sm:py-16">
      {/* soft wave corners */}
      <svg aria-hidden className="pointer-events-none absolute -right-10 top-0 hidden w-[300px] text-[#ccecea] lg:block" viewBox="0 0 300 200" fill="none">
        <path d="M300 0v170C230 110 150 60 40 40 120 30 220 10 300 0Z" fill="currentColor" fillOpacity="0.55" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute -left-10 bottom-0 hidden w-[340px] text-[#ccecea] lg:block" viewBox="0 0 340 200" fill="none">
        <path d="M0 40c90 30 180 90 250 160H0V40Z" fill="currentColor" fillOpacity="0.45" />
      </svg>

      <Container className="relative">
        <div className="text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">The ProManage advantage</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${heading.className} mt-5 text-[30px] font-bold leading-tight tracking-tight text-[#0c1e3d] sm:text-[44px]`}
          >
            Why Hire Magento Developers from <span className="text-[#0d9488]">ProManage IT Solution</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-4 text-base text-slate-600 sm:text-lg">
            Partner with a team that understands Magento inside out and delivers real business value.
          </motion.p>
        </div>

        <div ref={ref} className="mt-10 grid items-center gap-8 sm:mt-14 lg:grid-cols-[1fr_340px_1fr] lg:gap-10" onMouseLeave={() => setHold(false)}>
          <div className="space-y-4">
            {leftCards.map((c, i) => (
              <ReasonCard key={c.title} c={c} on={active === i} onEnter={() => { setHold(true); setActive(i); }} delay={0.1 + i * 0.12} from={-1} />
            ))}
          </div>

          {/* centre */}
          <div className="relative mx-auto h-[300px] w-[300px] sm:h-[340px] sm:w-[340px]">
            <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 340 340" fill="none">
              <motion.circle
                cx="170" cy="150" r="140"
                stroke="#0d9488" strokeOpacity="0.35" strokeWidth="1.4" strokeDasharray="2 7" strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease }}
              />
            </svg>
            {/* orbiting dots */}
            {/* orbiting dots — box rotates around the dashed circle's centre (170,150 of 340) */}
            <div aria-hidden className="mag-anim absolute inset-0" style={{ animation: "magSpin 18s linear infinite", transformOrigin: "50% 44.12%" }}>
              {[
                ["50%", "2.94%"],
                ["91.18%", "44.12%"],
                ["50%", "85.29%"],
                ["8.82%", "44.12%"],
              ].map(([l, t]) => (
                <span
                  key={l + t}
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0d9488] shadow-[0_0_10px_rgba(13,148,136,0.8)]"
                  style={{ left: l, top: t }}
                />
              ))}
            </div>
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-[42%] h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(249,115,22,0.18),transparent)]"
              animate={reduce ? undefined : { scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 3.4, repeat: Infinity }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="absolute bottom-[2%] left-1/2 w-[250px] -translate-x-1/2"
            >
              <Image src={IMG.podium.src} alt="" width={IMG.podium.w} height={IMG.podium.h} sizes="250px" className="h-auto w-full" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="absolute left-1/2 top-[11%] w-[130px] -translate-x-1/2"
            >
              <motion.div animate={reduce ? undefined : { y: [0, -10, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                <Emblem sizes="150px" className="w-full" />
              </motion.div>
            </motion.div>
          </div>

          <div className="space-y-4">
            {rightCards.map((c, i) => (
              <ReasonCard
                key={c.title}
                c={c}
                on={active === leftCards.length + i}
                onEnter={() => { setHold(true); setActive(leftCards.length + i); }}
                delay={0.1 + i * 0.12}
                from={1}
              />
            ))}
            <motion.svg
              viewBox="0 0 260 100"
              className="ml-auto mt-4 hidden w-[230px] text-[#6b8a90] lg:block"
              aria-label="Your Magento Success Partner"
              initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
            >
              <text x="8" y="48" className="font-caveat" fontSize="26" fill="currentColor" transform="rotate(-14 8 48)">Your Magento</text>
              <text x="48" y="80" className="font-caveat" fontSize="26" fill="currentColor" transform="rotate(-14 48 80)">Success Partner</text>
              <path d="M40 96 C110 86 180 70 250 44" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </motion.svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
