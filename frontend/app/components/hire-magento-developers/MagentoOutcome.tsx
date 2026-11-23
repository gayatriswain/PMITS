"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, Emblem, Eyebrow, Icon, ease, fadeUp, heading, type IconName } from "../shared/MagentoShared";

const outcomes: { n: string; title: string; text: string; icon: IconName }[] = [
  { n: "01", title: "Faster Stores", text: "Optimized performance for speed that converts.", icon: "gauge" },
  { n: "02", title: "Smoother Journeys", text: "Seamless experiences that keep customers coming back.", icon: "cart" },
  { n: "03", title: "Smarter Operations", text: "Custom features and integrations that reduce manual work.", icon: "puzzle" },
  { n: "04", title: "Ready to Scale", text: "A future-ready architecture that grows with your business.", icon: "rocket" },
];

const doGet: { do: [string, string, IconName]; get: [string, string, IconName] }[] = [
  { do: ["Clean & Scalable Code", "Built for performance, security and flexibility.", "code"], get: ["Better Performance", "Faster load times and smooth store performance.", "trend"] },
  { do: ["Custom Development", "Features built around your business goals.", "puzzle"], get: ["Happier Customers", "Better experience, higher trust and repeat sales.", "users"] },
  { do: ["Seamless Integrations", "Connect tools, automate workflows and save time.", "sliders"], get: ["More Efficiency", "Less manual work and operational bottlenecks.", "clock"] },
  { do: ["Reliable Support", "Proactive maintenance and quick issue resolution.", "shieldCheck"], get: ["Sustainable Growth", "A store that’s ready for more traffic, products and markets.", "chart"] },
];

function OutcomeNode({ o, i }: { o: (typeof outcomes)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease }}
      className="group relative"
    >
      <span className={`absolute text-[40px] font-light leading-none text-slate-300/90 ${i === 0 ? "-left-1 top-[64px] lg:-left-12 lg:top-[38px]" : "-top-12 left-12"}`} aria-hidden>
        {o.n}
      </span>
      <div className="relative z-10 flex h-[58px] w-[58px] items-center justify-center rounded-full border border-slate-100 bg-white text-[#0d9488] shadow-[0_12px_28px_-14px_rgba(12,30,61,0.45)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#0d9488] group-hover:text-white">
        <Icon name={o.icon} className="h-7 w-7" />
      </div>
      <h3 className={`${heading.className} mt-4 text-sm font-bold uppercase tracking-wide text-[#0c1e3d]`}>{o.title}</h3>
      <p className="mt-1 max-w-[180px] text-[13px] leading-relaxed text-slate-500">{o.text}</p>
    </motion.div>
  );
}

export default function MagentoOutcome() {
  const reduce = useReducedMotion();
  const [row, setRow] = useState<number | null>(null);

  return (
    <section className="relative bg-[#f5f7fa] py-12 sm:py-16">
      <Container>
        <div className="relative mx-auto max-w-[1180px] overflow-hidden rounded-[28px] bg-white px-6 py-10 shadow-[0_30px_70px_-50px_rgba(12,30,61,0.4)] sm:px-10 lg:px-14 lg:py-14">
          {/* heading */}
          <div className="max-w-[480px] lg:max-w-[400px] xl:max-w-[480px]">
            <Eyebrow variant="line" align="left" className="tracking-[0.12em]">The outcome</Eyebrow>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`${heading.className} mt-5 text-[40px] font-semibold leading-[1.05] tracking-tight text-[#0c1e3d] sm:text-[50px] lg:text-[44px] xl:text-[50px]`}
            >
              Real impact.
              <br />
              Measurable <span className="font-playfair italic text-[#0d9488]">growth.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-5 max-w-[370px] text-[15px] leading-relaxed text-slate-600">
              When expert Magento developers build your store the right way, everything starts working better.
            </motion.p>
          </div>

          {/* timeline */}
          <div className="relative mt-16 lg:mt-24">
            {/* centre emblem (desktop) */}
            <div className="pointer-events-none absolute left-1/2 top-[-150px] hidden h-[240px] w-[240px] -translate-x-1/2 lg:block">
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  aria-hidden
                  className="mag-anim absolute rounded-full border border-dashed border-[#0d9488]/25"
                  style={{ inset: `${k * 22}px`, animation: `magSpin ${30 - k * 8}s linear infinite ${k % 2 ? "reverse" : ""}` }}
                />
              ))}
              <motion.span
                aria-hidden
                className="absolute inset-[50px] rounded-full bg-[radial-gradient(closest-side,rgba(249,115,22,0.35),transparent)]"
                animate={reduce ? undefined : { scale: [0.9, 1.2, 0.9], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.3, ease }}
                className="absolute inset-[62px] flex items-center justify-center rounded-full bg-white shadow-[0_0_0_8px_rgba(249,115,22,0.06),0_18px_40px_-14px_rgba(249,115,22,0.55)]"
              >
                <Emblem sizes="70px" className="w-[66px]" />
              </motion.div>
            </div>

            {/* line */}
            <svg aria-hidden className="absolute left-0 right-0 top-[9px] hidden h-[30px] w-full lg:block" viewBox="0 0 1000 30" preserveAspectRatio="none" fill="none">
              <motion.path
                d="M30 20 H 405 C 440 20, 440 4, 470 4 M 530 4 C 560 4, 560 20, 595 20 H 970"
                stroke="#0d9488"
                strokeWidth="1.6"
                initial={reduce ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease }}
              />
            </svg>

            <div className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_220px_1fr_1fr] lg:gap-6">
              <OutcomeNode o={outcomes[0]} i={0} />
              <OutcomeNode o={outcomes[1]} i={1} />
              <div className="hidden lg:block" />
              <OutcomeNode o={outcomes[2]} i={2} />
              <OutcomeNode o={outcomes[3]} i={3} />
            </div>
          </div>

          {/* what we do / what you get */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative mt-12 rounded-2xl border border-slate-200/80 px-5 pb-6 pt-8 sm:px-8"
            onMouseLeave={() => setRow(null)}
          >
            <span className="absolute -top-3 left-[18%] rounded-md bg-[#0c1e3d] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">What we do</span>
            <span className="absolute -top-3 right-[18%] rounded-md bg-[#0d9488] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white md:right-auto md:left-[62%]">What you get</span>

            <div className="grid gap-0 md:grid-cols-[1fr_80px_1fr]">
              <ul className="divide-y divide-slate-100">
                {doGet.map((r, i) => (
                  <motion.li
                    key={r.do[0]}
                    onMouseEnter={() => setRow(i)}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`flex items-center gap-4 rounded-lg px-2 py-3 transition-colors ${row === i ? "bg-slate-50" : ""}`}
                  >
                    <Icon name={r.do[2]} className={`h-6 w-6 shrink-0 transition-colors ${row === i ? "text-[#0d9488]" : "text-[#0c1e3d]"}`} />
                    <span>
                      <span className="block text-sm font-semibold text-[#0c1e3d]">{r.do[0]}</span>
                      <span className="block text-xs text-slate-500">{r.do[1]}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="relative flex items-center justify-center py-4 md:py-0">
                <span aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px bg-slate-200 md:block" />
                <motion.span
                  animate={reduce ? undefined : { x: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-12 w-12 rotate-90 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0d9488] shadow-md md:rotate-0"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </div>

              <ul className="divide-y divide-slate-100">
                {doGet.map((r, i) => (
                  <motion.li
                    key={r.get[0]}
                    onMouseEnter={() => setRow(i)}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                    className={`flex items-center gap-4 rounded-lg px-2 py-3 transition-colors ${row === i ? "bg-[#0d9488]/[0.06]" : ""}`}
                  >
                    <Icon name={r.get[2]} className="h-6 w-6 shrink-0 text-[#0d9488]" />
                    <span>
                      <span className="block text-sm font-semibold text-[#0c1e3d]">{r.get[0]}</span>
                      <span className="block text-xs text-slate-500">{r.get[1]}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* dark CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#081a2e] via-[#0c1e3d] to-[#0a3340] px-6 py-6 text-white sm:px-8"
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
              <div className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center">
                <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
                  <motion.path
                    d="M50 4 L90 27 V73 L50 96 L10 73 V27 Z"
                    stroke="#2dd4bf"
                    strokeOpacity="0.6"
                    strokeWidth="1.5"
                    initial={reduce ? false : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4 }}
                  />
                </svg>
                <Emblem sizes="48px" className="w-[46px]" />
              </div>
              <h3 className={`${heading.className} text-2xl font-semibold leading-tight lg:max-w-[230px] lg:border-r lg:border-white/15 lg:pr-8`}>
                See what your Magento store <span className="text-[#2dd4bf]">could improve.</span>
              </h3>
              <p className="max-w-[260px] text-sm leading-relaxed text-slate-300">
                Tell us about your store and our Magento experts will review it and show you what’s possible.
              </p>
              <div className="flex flex-col items-center gap-2 lg:ml-auto">
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="#magento-proposal" className="group inline-flex items-center gap-2 rounded-lg bg-[#0d9488] px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-[#0fa597]">
                    Tell Us Your Challenge
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="#magento-proposal" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-white hover:bg-white/5">
                    <Icon name="calendar" className="h-4 w-4" />
                    Book a Consultation
                  </Link>
                </div>
                <p className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Icon name="shieldCheck" className="h-4 w-4 text-[#2dd4bf]" />
                  No obligation. 100% confidential.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
