"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUp, Gauge, ShoppingCart, TrendingUp, Users, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";
import { techLogo } from "./TechLogos";

const EASE = [0.22, 1, 0.36, 1] as const;
const NAVY = "#0d1b3e";
const BLUE = "#1a4fa8";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

const RESULT_ICONS: LucideIcon[] = [TrendingUp, ShoppingCart, Users, Gauge];

/** Case studies shown in the slider (add, remove and reorder them in the CMS). */
const projects__cms = [
  {
    name: "Mushrooms Culture",
    description: "A modern ASP.NET website for a premium organic mushrooms brand, blending e-commerce with storytelling.",
    image: "/aspnet/project-mushrooms.webp",
    link: "/portfolio",
    technologies: [".NET", "SQL", "Visual Studio"],
    results: [
      { value: "60%", label: "Increase in Organic Traffic" },
      { value: "45%", label: "Growth in Online Sales" },
      { value: "35%", label: "More User Engagement" },
      { value: "2.5x", label: "Faster Page Load Speed" },
    ],
  },
];

/** "Built on ASP.NET. Driven by results." - featured project slider with its results bar. */
export default function HireAspNetStories() {
  const $t = useCmsText();
  const projects = useCmsData("HireAspNetStories__projects", projects__cms);
  const [index, setIndex] = useState(0);
  const total = projects.length;
  const i = total ? Math.min(index, total - 1) : 0;
  const p = projects[i];
  const go = (d: number) => total > 1 && setIndex((v) => (v + d + total) % total);
  if (!p) return null;

  return (
    <section className="relative overflow-hidden bg-[#f1f3f7] pt-14 sm:pt-20">
      <Container className="relative max-w-[1300px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-4">
          {/* left column: heading + project details */}
          <div className="relative z-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
              <motion.p variants={fadeUp} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: NAVY }}>
                <i aria-hidden className="relative h-px w-7 bg-[#1a4fa8]"><b className="absolute -left-0.5 -top-[3px] h-[7px] w-[7px] rounded-full border-2 border-[#1a4fa8] bg-white" /></i>
                {html($t("HireAspNetStories__t1", "Our ASP.NET success stories"))}
              </motion.p>
              <h2 className="font-heading mt-6 font-extrabold uppercase leading-[0.98] tracking-[-0.01em]" style={{ color: NAVY }}>
                <motion.span variants={fadeUp} custom={1} className="text-h2 block">{html($t("HireAspNetStories__t2", "Built on"))}</motion.span>
                <motion.span variants={fadeUp} custom={2} className="text-h1 block bg-[linear-gradient(95deg,#1a3f8f,#1f6fd1_55%,#3aa0e6)] bg-clip-text py-1 text-transparent">
                  {html($t("HireAspNetStories__t3", "ASP.NET."))}
                </motion.span>
                <motion.span variants={fadeUp} custom={3} className="text-h3 block">{html($t("HireAspNetStories__t4", "Driven by results."))}</motion.span>
              </h2>
              <motion.p variants={fadeUp} custom={4} className="text-body mt-5 max-w-[300px] text-slate-600">
                {rich($t("HireAspNetStories__t5", "Real projects. Real impact. Powered by ASP.NET."))}
              </motion.p>
              <motion.i variants={fadeUp} custom={5} aria-hidden className="mt-5 block h-[3px] w-11 rounded-full" style={{ background: BLUE }} />
            </motion.div>

            <div className="mt-10 flex gap-6 sm:gap-8">
              {/* slider controls */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={total < 2}
                  aria-label={$t("HireAspNetStories__t6", "Previous project")}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-[0_10px_24px_-12px_rgba(13,27,62,0.45)] transition hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                  style={{ color: NAVY }}
                >
                  <ArrowUp className="h-5 w-5" />
                </button>
                <i aria-hidden className="my-2 block h-5 w-px bg-[#1a4fa8]/40" />
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 bg-white text-[20px] font-extrabold" style={{ borderColor: BLUE, color: NAVY }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-2 text-sm font-semibold text-slate-500">/ {String(total).padStart(2, "0")}</span>
                <i aria-hidden className="my-2 block h-5 w-px bg-[#1a4fa8]/40" />
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={total < 2}
                  aria-label={$t("HireAspNetStories__t7", "Next project")}
                  className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-[0_10px_24px_-12px_rgba(13,27,62,0.45)] transition hover:translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                  style={{ color: NAVY }}
                >
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  className="min-w-0 flex-1"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BLUE }}>{html($t("HireAspNetStories__t8", "Featured project"))}</p>
                  <i aria-hidden className="mt-2 block h-[2px] w-7 rounded-full" style={{ background: BLUE }} />
                  <h3 className="text-h4 font-heading mt-3 font-extrabold uppercase" style={{ color: NAVY }}>{p.name}</h3>
                  <p className="text-small mt-3 max-w-[330px] text-slate-600">{p.description}</p>
                  {p.technologies?.length > 0 && (
                    <>
                      <p className="mt-5 border-t border-slate-200 pt-4 text-[10.5px] font-bold uppercase tracking-[0.14em]" style={{ color: BLUE }}>
                        {html($t("HireAspNetStories__t9", "Technologies used"))}
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-6">
                        {p.technologies.map((t) => (
                          <li key={t} className="flex flex-col items-center gap-1.5 text-[11px] font-medium text-slate-600">
                            {techLogo(t, "h-9 w-9")}
                            {t}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {p.link && (
                    <Link
                      href={p.link}
                      className="group mt-6 inline-flex items-center gap-2 border-b-2 border-[#1a4fa8]/50 pb-1 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-[#1a4fa8]"
                      style={{ color: BLUE }}
                    >
                      {$t("HireAspNetStories__t10", "View case study")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* right: project visual */}
          <div className="relative -mx-5 lg:-mr-24 lg:ml-0 lg:mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={1290}
                    height={980}
                    sizes="(min-width: 1024px) 860px, 100vw"
                    className="h-auto w-full select-none [mask-image:linear-gradient(to_right,transparent,#000_8%)]"
                    unoptimized={/^https?:\/\//.test(p.image)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>

      {/* results bar */}
      <Container className="relative z-10 max-w-[1300px] pb-14 sm:pb-20">
        <AnimatePresence mode="wait">
          {p.results?.length > 0 && (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative -mt-4 overflow-hidden rounded-[22px] bg-[linear-gradient(100deg,#061a36,#0a2a55_55%,#071c3a)] px-6 py-8 shadow-[0_30px_60px_-30px_rgba(6,26,54,0.8)] sm:px-10 lg:-mt-16"
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#5fc8ff_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.12]" />
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,#3fb8ff,transparent)]" />
              <div className="relative grid gap-8 lg:grid-cols-[140px_1fr] lg:items-center">
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-white">{html($t("HireAspNetStories__t11", "The results"))}</p>
                  <i aria-hidden className="mt-2 block h-[2px] w-8 rounded-full bg-[#3fb8ff]" />
                </div>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-white/15">
                  {p.results.map((r, k) => {
                    const Icon = RESULT_ICONS[k % RESULT_ICONS.length];
                    return (
                      <li key={k} className="flex items-center gap-4 lg:px-6 lg:first:pl-0">
                        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#3fb8ff]/45 text-white shadow-[0_0_24px_-6px_rgba(63,184,255,0.6)]">
                          <Icon className="h-7 w-7" strokeWidth={1.6} />
                        </span>
                        <span>
                          <span className="text-h3 font-heading block font-bold leading-none text-[#4cc4ff]">{r.value}</span>
                          <span className="text-small mt-1.5 block text-white/85">{r.label}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
