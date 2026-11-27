"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, Boxes, Code2, Lock, MessageSquareText, Puzzle, Rocket, ShoppingCart, Sparkles, TrendingUp, Users, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#0b1530";
const TEAL = "#1596a8";
const EASE = [0.22, 1, 0.36, 1] as const;

const FACT_ICONS: LucideIcon[] = [Boxes, Puzzle, Sparkles];
const OUTCOME_ICONS: LucideIcon[] = [TrendingUp, Users, Lock, Rocket];

/** Case studies in the slider (add, remove and reorder them in the CMS). */
const cases__cms = [
  {
    category: "E-commerce Platform",
    title: "Scalable. Secure. Seamless.",
    description: "A feature-rich e-commerce platform built with Core PHP to deliver a smooth shopping experience, robust admin management and secure transactions.",
    image: "/hire-core-php/case-shopx.webp",
    facts: [
      { label: "Technology", value: "Core PHP, MySQL, JavaScript, Ajax" },
      { label: "Integrations", value: "Payment Gateway, Shipping API, ERP" },
      { label: "Key Features", value: "Product Management, Order Tracking, Reports" },
    ],
    outcomes: [
      { label: "Business Impact", text: "Streamlined operations and improved overall efficiency." },
      { label: "User Experience", text: "Intuitive interface for a seamless and engaging shopping journey." },
      { label: "Security", text: "Secure architecture ensuring safe transactions and customer data protection." },
      { label: "Scalability", text: "Built to scale effortlessly and handle growing business needs." },
    ],
  },
];

/** "Real Projects. Real Impact." - Core PHP case-study slider with outcomes and a call to action. */
export default function HireCorePhpCaseStudy() {
  const $t = useCmsText();
  const cases = useCmsData("HireCorePhpCaseStudy__cases", cases__cms);
  const [index, setIndex] = useState(0);
  const total = cases.length;
  const i = total ? Math.min(index, total - 1) : 0;
  const c = cases[i];
  const go = (d: number) => total > 1 && setIndex((v) => (v + d + total) % total);
  if (!c) return null;

  return (
    <section className="relative overflow-hidden bg-[#f6f8fb] py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-[1300px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="max-w-[520px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.16em]" style={{ color: NAVY }}>{rich($t("HireCorePhpCaseStudy__t1m", "Success in <span class=\"text-[#1596a8]\">action</span>"))}</p>
            <i aria-hidden className="mt-2 block h-[2px] w-14 rounded-full bg-[#1596a8]/70" />
            <h2 className="text-h1 font-heading mt-5 font-bold leading-[1.05] tracking-[-0.02em]" style={{ color: NAVY }}>{rich($t("HireCorePhpCaseStudy__t3m", "<span class=\"block\">Real Projects.</span><span class=\"block text-[#1596a8]\">Real Impact.</span>"))}</h2>
            <p className="text-body mt-5 text-slate-600">{rich($t("HireCorePhpCaseStudy__t5", "We build Core PHP solutions that solve real business challenges and create lasting impact."))}</p>
          </motion.div>

          <div className="relative mt-10 grid gap-4 lg:mt-24 lg:grid-cols-[64px_1fr]">
            {/* slider rail */}
            <div className="hidden flex-col items-center rounded-2xl bg-white py-6 shadow-[0_12px_30px_-24px_rgba(11,21,48,0.5)] lg:flex">
              <span className="text-[12px] font-bold uppercase tracking-[0.18em] [writing-mode:vertical-rl] rotate-180" style={{ color: NAVY }}>{html($t("HireCorePhpCaseStudy__t6", "Case study"))}</span>
              <i aria-hidden className="my-4 block h-16 w-px bg-slate-200" />
              <button type="button" onClick={() => go(-1)} disabled={total < 2} aria-label={$t("HireCorePhpCaseStudy__t7", "Previous case study")} className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:opacity-40">
                <ArrowUp className="h-4 w-4" />
              </button>
              <span className="my-2 text-center text-[13px] font-bold" style={{ color: NAVY }}>
                {String(i + 1).padStart(2, "0")}
                <span className="block text-[11px] font-medium text-slate-400">/ {String(total).padStart(2, "0")}</span>
              </span>
              <button type="button" onClick={() => go(1)} disabled={total < 2} aria-label={$t("HireCorePhpCaseStudy__t8", "Next case study")} className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 disabled:opacity-40">
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>

            {/* case card */}
            <div className="relative rounded-[24px] bg-[linear-gradient(120deg,#081127,#0b1a36_60%,#0d1f3d)] p-6 pb-0 shadow-[0_30px_60px_-30px_rgba(8,17,39,0.75)] sm:p-9 sm:pb-0">
              <AnimatePresence mode="wait">
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }}>
                  {c.image && (
                    <div className="relative -mt-2 mb-6 lg:absolute lg:right-[-2%] lg:top-0 lg:mb-0 lg:mt-0 lg:w-[56%] lg:-translate-y-[47%]">
                      <Image src={c.image} alt={c.title} width={917} height={712} sizes="(min-width: 1024px) 700px, 100vw" className="h-auto w-full select-none" unoptimized={/^https?:\/\//.test(c.image)} />
                    </div>
                  )}
                  <div className="lg:max-w-[46%]">
                    <div className="flex items-start gap-5">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/5"><ShoppingCart className="h-8 w-8 text-white" /></span>
                      <div>
                        <p className="text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: "#3cc2d4" }}>{c.category}</p>
                        <h3 className="text-h4 font-heading mt-1 font-semibold text-white">{c.title}</h3>
                      </div>
                    </div>
                    <i aria-hidden className="ml-[84px] mt-5 block h-px w-24 bg-white/25" />
                    <p className="text-small mt-5 leading-relaxed text-white/80 sm:ml-[84px]">{c.description}</p>
                    <ul className="mt-7 grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
                      {c.facts?.map((f, k) => {
                        const Icon = FACT_ICONS[k % FACT_ICONS.length];
                        return (
                          <li key={k} className="flex gap-2.5 sm:px-3 sm:first:pl-0">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#3cc2d4]/40"><Icon className="h-4 w-4" style={{ color: "#3cc2d4" }} /></span>
                            <span>
                              <span className="block text-[11px] font-bold uppercase tracking-wide" style={{ color: "#3cc2d4" }}>{f.label}</span>
                              <span className="mt-1 block text-[12px] leading-snug text-white/80">{f.value}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {c.outcomes?.length > 0 && (
                    <ul className="relative z-10 mx-0 mt-8 grid translate-y-6 gap-5 rounded-2xl bg-white px-5 py-6 shadow-[0_20px_40px_-24px_rgba(8,17,39,0.6)] sm:grid-cols-2 lg:mx-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
                      {c.outcomes.map((o, k) => {
                        const Icon = OUTCOME_ICONS[k % OUTCOME_ICONS.length];
                        return (
                          <li key={k} className="flex gap-3 lg:px-4 lg:first:pl-1">
                            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full ring-1 ring-slate-200"><Icon className="h-6 w-6" style={{ color: NAVY }} /></span>
                            <span>
                              <span className="block text-[11px] font-bold uppercase tracking-wide" style={{ color: TEAL }}>{o.label}</span>
                              <span className="mt-1.5 block text-[12.5px] leading-snug text-slate-600">{o.text}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* call to action */}
          <motion.div
            className="mt-14 flex flex-col gap-5 rounded-2xl bg-[linear-gradient(110deg,#081127,#0b1d38)] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-9"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-[#3cc2d4]/40"><Code2 className="h-6 w-6" style={{ color: "#3cc2d4" }} /></span>
              <p className="text-h5 font-heading font-medium leading-snug text-white">
                {html($t("HireCorePhpCaseStudy__t9", "Have a project in mind?"))}
                <span className="block">{rich($t("HireCorePhpCaseStudy__t10m", "Let's build something <span class=\"text-[#3cc2d4]\">great together.</span>"))}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={$t("HireCorePhpCaseStudy__t12", "/contact")} className="group inline-flex items-center gap-3 rounded-lg bg-[linear-gradient(90deg,#0f7f94,#1aa6b8)] px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_12px_24px_-12px_rgba(26,166,184,0.8)]">
                {$t("HireCorePhpCaseStudy__t13", "Hire Core PHP Developers")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href={$t("HireCorePhpCaseStudy__t14", "/contact")} className="inline-flex items-center gap-3 rounded-lg border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/10">
                <MessageSquareText className="h-5 w-5" />
                {$t("HireCorePhpCaseStudy__t15", "Talk to an Expert")}
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
