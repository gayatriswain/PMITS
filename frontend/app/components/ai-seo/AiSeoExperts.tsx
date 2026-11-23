"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bot, CheckCircle2, ClipboardCheck, Rocket, TrendingUp, Users } from "lucide-react";
import CountUp from "../shared/CountUp";
import { AI, FADE, H2, Hl, Pill, Spark, ease, heading, Inner, Panel } from "../shared/AiSeoShared";

const STEPS = [
  { Icon: Bot, title: "AI Agents Work 24/7", text: "Collect data, find insights and run thousands of checks in real-time.", c: "text-teal-600 bg-teal-50" },
  { Icon: Users, title: "SEO Experts Analyze", text: "Experts interpret the data, spot opportunities and build winning strategies.", c: "text-violet-600 bg-violet-50" },
  { Icon: ClipboardCheck, title: "Review & Refine", text: "Every recommendation is reviewed, refined and aligned with your business goals.", c: "text-sky-600 bg-sky-50" },
  { Icon: Rocket, title: "Implement & Optimize", text: "We implement at speed and continuously optimize for maximum impact.", c: "text-orange-500 bg-orange-50" },
  { Icon: TrendingUp, title: "Results That Grow", text: "Better rankings, more visibility, qualified traffic and higher business growth.", c: "text-teal-600 bg-teal-50" },
];

export default function AiSeoExperts() {
  return (
    <Panel inner="!bg-[#f5f7fb]">
      <Inner className="py-14 sm:py-16 lg:py-20 2xl:py-24">
        <div className="relative">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:items-center">
            <div className="min-w-0">
              <Pill>Powered by AI &amp; Human Expertise</Pill>
              <H2 className="mt-4 !text-[28px] sm:!text-[34px] lg:!text-[40px]">
                AI Works Faster.
                <br /> Experts Make It <Hl>Smarter.</Hl>
              </H2>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
                className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-600"
              >
                Our AI agents handle data, analysis and execution at scale. Our SEO experts add strategy, creativity and experience to deliver what truly drives growth.
              </motion.p>
            </div>

            {/* image with floating cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
              className="relative mx-auto w-full max-w-[520px] lg:row-span-2 lg:-my-6 lg:max-w-none 2xl:-mr-6"
            >
              <div className="relative aspect-[1.34]">
                <Image src={AI.robotHuman} alt="SEO expert working alongside an AI agent" fill sizes="(min-width:1024px) 480px, 90vw" className="object-contain mix-blend-multiply" style={FADE} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.6, ease }}
                className="absolute -bottom-3 right-0 w-[52%] max-w-[220px] sm:right-2"
              >
                <div className="ai-float rounded-2xl border border-white bg-white/95 p-3.5 shadow-[0_20px_40px_-20px_rgba(15,40,80,.45)]">
                  <p className="text-center text-xs font-bold text-[#0b1b33]">The Impact You Get</p>
                  <div className="mt-2 flex items-end gap-2">
                    <Spark className="h-12 flex-1" />
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500">Visibility Growth</p>
                      <p className={`${heading.className} text-2xl font-bold leading-none text-[#0f766e]`}>
                        +<CountUp to={180} suffix="%" />
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 rounded-lg bg-slate-50 py-1 text-center text-[10px] text-slate-500">in 6 Months ↑</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                className="absolute right-3 top-0 hidden rounded-xl border border-white bg-white/90 p-2.5 shadow-[0_14px_30px_-18px_rgba(15,40,80,.4)] sm:block"
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="flex items-center gap-1.5 py-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-500" />
                    <span className="h-1.5 rounded-full bg-slate-200" style={{ width: 42 - i * 8 }} />
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* steps */}
            <div className="relative grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-2.5">
              {STEPS.map(({ Icon, title, text, c }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="group relative rounded-2xl border border-slate-100 bg-white p-3.5 shadow-[0_14px_30px_-24px_rgba(15,40,80,.5)] transition duration-300 hover:-translate-y-1 hover:border-teal-100"
                >
                  <div className="flex items-center gap-2.5 lg:flex-col lg:text-center 2xl:flex-row 2xl:text-left">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${c}`}>
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </span>
                    <h3 className="text-[12.5px] font-bold leading-tight text-[#0b1b33]">{title}</h3>
                  </div>
                  <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-500 lg:text-center">{text}</p>
                  {i < STEPS.length - 1 && (
                    <span className="absolute -right-[9px] top-8 z-10 hidden text-sky-400 lg:block" aria-hidden>
                      <svg viewBox="0 0 16 10" className="h-2.5 w-4">
                        <path d="M0 5h12" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 2" className="ai-flow" />
                        <path d="M10 1.5L14 5l-4 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Inner>
    </Panel>
  );
}
