"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "./Container";
import { CtaStrip, Eyebrow, Grad, Icon3D, Swoosh, fadeUp, heading, useSeen, type Glyph3D } from "./BigCommerceShared";

const steps: { n: string; title: string; text: string; g: Glyph3D }[] = [
  { n: "01", title: "Launch Faster", text: "Get your store up and running quickly with built-in features.", g: "rocket" },
  { n: "02", title: "Sell More", text: "Powerful marketing, SEO, and conversion tools help you drive more sales.", g: "chart" },
  { n: "03", title: "Scale Without Limits", text: "Handle more traffic, more orders, and more growth — without slowing down.", g: "globe" },
  { n: "04", title: "Enterprise Security", text: "Keep your business and customer data safe with industry-leading security.", g: "shield" },
  { n: "05", title: "Work Your Way", text: "Flexible APIs and integrations let you connect the tools that work for you.", g: "puzzle" },
  { n: "06", title: "Support You Can Rely On", text: "24/7 expert support from a team that’s here to help you succeed.", g: "headset" },
];

/* Wave in a 1200×150 box: crests over each icon (column centres), troughs between. */
const WAVE = (() => {
  let d = "M0 112";
  for (let i = 0; i < 6; i++) {
    const cx = 100 + i * 200;
    d += ` C ${cx - 60} 112, ${cx - 70} 18, ${cx} 18 S ${cx + 60} 112, ${cx + 100} 112`;
  }
  return d;
})();

export default function BigCommerceBenefits() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeen(ref, 0.3);
  const live = useSeen(ref, 0.3, false);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduce || !live || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, [reduce, live, hold]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f8fe] to-[#eef3fd] py-12 sm:py-16">
      <Container className="relative">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">Big benefits for your business</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`${heading.className} mt-5 text-[36px] font-bold leading-[1.1] tracking-tight text-[#0b1a4a] sm:text-5xl lg:text-[54px]`}
          >
            More Power. More Growth.
            <br />
            <Grad>
              More{" "}
              <span className="relative inline-block">
                Success.
                <Swoosh className="-bottom-2 left-0 h-3 w-[90%]" />
              </span>
            </Grad>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mx-auto mt-5 max-w-[520px] text-base text-slate-600">
            BigCommerce gives you the tools and flexibility to grow your business, delight your customers, and stay ahead of the competition.
          </motion.p>
        </div>

        <div ref={ref} className="relative mt-12" onMouseLeave={() => setHold(false)}>
          {/* wave (lg+) */}
          <svg className="pointer-events-none absolute inset-x-0 top-0 hidden h-[150px] w-full lg:block" viewBox="0 0 1200 150" preserveAspectRatio="none" fill="none" aria-hidden>
            <defs>
              <linearGradient id="bcWave" x1="0" x2="1">
                <stop offset="0" stopColor="#2348e6" />
                <stop offset="0.5" stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0d8f9a" />
              </linearGradient>
            </defs>
            <motion.path
              d={WAVE}
              stroke="url(#bcWave)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? false : { opacity: 0 }}
              animate={seen ? { opacity: 1 } : undefined}
              transition={{ duration: 1 }}
            />
            {!reduce && (
              <path d={WAVE} stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" strokeDasharray="16 214" vectorEffect="non-scaling-stroke" style={{ animation: "magFlow2 2.4s linear infinite" }} />
            )}
          </svg>
          <span aria-hidden className="absolute left-0 top-[112px] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2348e6] lg:block" />
          <span aria-hidden className="absolute right-0 top-[112px] hidden h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#0d8f9a] lg:block" />

          <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <motion.li
                  key={s.n}
                  onMouseEnter={() => { setHold(true); setActive(i); }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={seen ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
                  className={`flex flex-col items-center px-4 text-center relative ${i > 0 ? "lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:top-[170px] lg:before:w-px lg:before:bg-slate-200" : ""}`}
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
                    className="relative z-10 mt-4"
                  >
                    <Icon3D g={s.g} size={110} active={on} />
                  </motion.div>
                  <p className={`mt-6 flex items-center gap-2 text-xl font-bold transition-colors ${on ? "text-[#2348e6]" : "text-[#2348e6]/80"}`}>
                    <span className="text-[10px] tracking-[0.2em] text-[#2348e6]/50">•</span>
                    {s.n}
                    <span className="text-[10px] tracking-[0.2em] text-[#2348e6]/50">••</span>
                  </p>
                  <h3 className={`${heading.className} mt-2 text-[16px] font-semibold text-[#0b1a4a]`}>{s.title}</h3>
                  <p className="mt-2 max-w-[200px] text-[13px] leading-relaxed text-slate-600">{s.text}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="mt-12">
          <CtaStrip
            title="Ready to Build Something"
            accent="Amazing?"
            text="Join thousands of successful brands building their future with BigCommerce."
            checks={[
              { icon: "check", label: "No credit card required" },
              { icon: "bolt", label: "Setup in minutes" },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
