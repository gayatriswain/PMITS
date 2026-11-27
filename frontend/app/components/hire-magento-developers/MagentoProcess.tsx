"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { ArrowRight, Eyebrow, Icon, fadeUp, heading, type IconName } from "../shared/MagentoShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const steps__cms: { title: [string, string]; text: string; icon: IconName }[] = [
  { title: ["Book a Free", "Consultation"], text: "Anyone with a Magento development project can book a free consultation with one of our representatives.", icon: "chat" },
  { title: ["Discussion with", "Our Business Analyst"], text: "On the scheduled day and time, the business analyst from ProManage IT Solution visits your company and discusses your Magento development needs.", icon: "calendar" },
  { title: ["Receive a Detailed", "Proposal"], text: "On the basis of this meeting, we prepare a proposal containing terms and condition and deadlines for the project.", icon: "docCheck" },
  { title: ["Proposal Acceptance", ""], text: "Once this proposal is accepted, ProManage IT Solution sets the ball rolling and our Magento developers get down to work.", icon: "handshake" },
  { title: ["Our Developers", "Get to Work"], text: "Our developers start building, with daily updates so you always know where your project stands.", icon: "browserCode" },
];

export default function MagentoProcess() {
  const $t = useCmsText();
  const steps = useCmsData("MagentoProcess__steps", steps__cms);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (reduce || !inView || hold) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [reduce, inView, hold]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fafb] to-[#f1f6f8] py-12 sm:py-16">
      <svg aria-hidden className="pointer-events-none absolute -left-16 top-0 hidden w-[280px] text-[#d6eeee] lg:block" viewBox="0 0 280 180" fill="none">
        <path d="M0 0h280C200 30 110 80 0 170V0Z" fill="currentColor" fillOpacity="0.5" />
      </svg>

      <Container className="relative">
        <div className="mx-auto max-w-[1000px] text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">{$t("MagentoProcess__t1", "Hiring process")}</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-h2 ${heading.className} mt-5 font-bold tracking-tight text-[#0c1e3d]`}
          >
            {$t("MagentoProcess__t2", "The Hiring Process is ")}<span className="text-[#0d9488]">{html($t("MagentoProcess__t3", "Simple and Straightforward"))}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mt-5 text-slate-600">
            {rich($t("MagentoProcess__t4", "We have kept the process of hiring Magento developers very easy and simple for our clients. Anyone with a Magento development project can book a free consultation with one of our representatives. On the scheduled day and time, the business analyst from ProManage IT Solution visits your company and discusses your Magento development needs. On the basis of this meeting, we prepare a proposal containing terms and condition and deadlines for the project. Once this proposal is accepted, ProManage IT Solution sets the ball rolling and our Magento developers get down to work."))}</motion.p>
        </div>

        <div ref={ref} className="relative mt-10 sm:mt-14" onMouseLeave={() => setHold(false)}>
          {/* wavy dashed connectors (desktop) — 5 columns → bubble centres at 10/30/50/70/90 % */}
          <svg aria-hidden className="pointer-events-none absolute left-0 right-0 top-0 hidden h-[104px] w-full lg:block" viewBox="0 0 1000 104" preserveAspectRatio="none" fill="none">
            {[0, 1, 2, 3].map((i) => {
              const x0 = 100 + i * 200 + 56, x1 = 300 + i * 200 - 56;
              const d = `M${x0} 52 C ${x0 + 30} 92, ${x1 - 50} 84, ${x1 - 26} 64 S ${x1} 52, ${x1} 52`;
              const done = i < active;
              return (
                <g key={i}>
                  <motion.path
                    d={d}
                    stroke={done ? "#0d9488" : "#94a3b8"}
                    strokeOpacity={done ? 0.8 : 0.55}
                    strokeWidth="1.4"
                    strokeDasharray="4 5"
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15 }}
                  />
                  {i === active && !reduce && (
                    <path d={d} stroke="#2dd4bf" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="6 42" style={{ animation: "magFlow 1.2s linear infinite" }} />
                  )}
                </g>
              );
            })}
          </svg>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <motion.li
                  key={s.title.join(" ")}
                  onMouseEnter={() => { setHold(true); setActive(i); }}
                  variants={fadeUp}
                  custom={i * 0.7}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="relative flex flex-col items-center text-center"
                >
                  <span
                    aria-hidden
                    className={`absolute left-[4%] top-[-6px] text-5xl font-bold tracking-tight transition-colors duration-500 lg:left-[-2%] ${on ? "text-[#0d9488]/25" : "text-slate-200/90"}`}
                  >
                    {html($t("MagentoProcess__t5", "0"))}{i + 1}
                  </span>
                  <span className="relative">
                    <span
                      className={`relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white shadow-[0_16px_36px_-18px_rgba(12,30,61,0.45)] ring-[10px] transition-all duration-500 ${
                        on ? "-translate-y-1.5 ring-[#0d9488]/15" : "ring-[#0d9488]/[0.06]"
                      }`}
                    >
                      <span className={`flex h-[78px] w-[78px] items-center justify-center rounded-full transition-colors duration-500 ${on ? "bg-[#0d9488] text-white" : "bg-[#e9f6f5] text-[#0c1e3d]"}`}>
                        <motion.span animate={on && !reduce ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }} transition={{ duration: 0.7 }}>
                          <Icon name={s.icon} className="h-9 w-9" />
                        </motion.span>
                      </span>
                      {on && !reduce && <span className="absolute inset-[-10px] animate-ping rounded-full border border-[#0d9488]/30 [animation-duration:2s]" />}
                    </span>
                    {/* connector dots on either side */}
                    {i > 0 && <span className="absolute left-[-14px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[#0d9488] lg:block" />}
                    {i < steps.length - 1 && <span className="absolute right-[-14px] top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[#0d9488] lg:block" />}
                  </span>
                  <h3 className={`${heading.className} mt-6 text-[17px] font-semibold leading-snug text-[#0c1e3d]`}>
                    {s.title[0]}
                    {s.title[1] && (<><br />{s.title[1]}</>)}
                  </h3>
                  <p className="text-small mt-2 max-w-[230px] text-slate-500">{s.text}</p>
                  <span className={`mt-3 h-[2px] rounded bg-[#0d9488] transition-all duration-500 ${on ? "w-10 opacity-100" : "w-4 opacity-30"}`} />
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="relative mt-12 flex flex-col items-center gap-6 lg:flex-row lg:justify-center">
          <motion.svg
            viewBox="0 0 170 80"
            className="hidden w-[150px] text-[#0c4a52] lg:absolute lg:left-0 lg:top-1/2 lg:block lg:-translate-y-1/2"
            aria-label="From Idea to Impact"
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.3, ease: "easeInOut" }}
          >
            <text x="4" y="30" className="font-caveat" fontSize="24" fill="currentColor" transform="rotate(-12 4 30)">{$t("MagentoProcess__t6", "From")}</text>
            <text x="8" y="58" className="font-caveat" fontSize="24" fill="currentColor" transform="rotate(-12 8 58)">{$t("MagentoProcess__t7", "Idea to Impact")}</text>
            <path d="M20 74 C70 70 120 58 165 42" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </motion.svg>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href={$t("MagentoProcess__t8", "#magento-proposal")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#0b4f4c] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(11,79,76,0.8)] transition hover:-translate-y-0.5 hover:bg-[#0b5f5a]"
            >
              {$t("MagentoProcess__t9", "Hire Magento Developers")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={$t("MagentoProcess__t10", "#magento-proposal")} className="group inline-flex items-center gap-3 text-sm font-semibold text-[#0c1e3d]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-transform group-hover:scale-110">
                <Icon name="play" className="ml-0.5 h-4 w-4" />
              </span>
              <span className="border-b border-[#0d9488] pb-1 group-hover:text-[#0d9488]">{html($t("MagentoProcess__t11", "Talk to Our Experts"))}</span>
            </Link>
          </motion.div>

          <p className="hidden text-right text-[10px] font-semibold uppercase leading-relaxed tracking-[0.25em] text-slate-400 lg:absolute lg:right-0 lg:top-1/2 lg:block lg:-translate-y-1/2">
            <span className="mr-3 inline-block h-px w-8 align-middle bg-slate-300" />
            {rich($t("MagentoProcess__t12", "Your ecommerce"))}<br />
            {rich($t("MagentoProcess__t13", "growth partner"))}</p>
        </div>
      </Container>
    </section>
  );
}
