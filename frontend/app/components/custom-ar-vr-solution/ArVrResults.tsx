"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Building2, ShieldCheck, Target, TrendingUp, Users, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#0f1535";
const PURPLE = "#5b43e8";
const EASE = [0.22, 1, 0.36, 1] as const;

const STAT_ICONS: LucideIcon[] = [TrendingUp, Users, ShieldCheck, Target];

const stats__cms = [
  { value: "70%", label: "Faster Training Completion" },
  { value: "92%", label: "Improvement in Knowledge Retention" },
  { value: "60%", label: "Reduction in On-site Incidents" },
  { value: "3.5x", label: "Increase in User Engagement" },
];

function SidePanel({ side, label, image, icon: Icon }: { side: "l" | "r"; label: string; image: string; icon: LucideIcon }) {
  const left = side === "l";
  return (
    <motion.div
      className="hidden w-[23%] shrink-0 lg:block"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, x: left ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
    >
      <div
        className="overflow-hidden rounded-[22px] border border-white/80 bg-white/60 p-3 shadow-[0_30px_60px_-30px_rgba(15,21,53,0.45)] backdrop-blur"
        style={{ transform: `rotateY(${left ? 18 : -18}deg) rotateZ(${left ? 3 : -3}deg)` }}
      >
        <div className="flex items-center gap-3 px-2 pb-3 pt-1">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white shadow"><Icon className="h-5 w-5" style={{ color: PURPLE }} /></span>
          <span className="text-[12px] font-bold uppercase leading-tight tracking-wide" style={{ color: NAVY }}>{label}</span>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image src={image} alt={label} fill sizes="300px" className="object-cover" />
        </div>
      </div>
    </motion.div>
  );
}

/** "Step into our world of real impact." - VR headset showcase with headline results. */
export default function ArVrResults() {
  const $t = useCmsText();
  const stats = useCmsData("ArVrResults__stats", stats__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f3f1ef_0%,#efedec_100%)] py-16 lg:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_70%,rgba(255,255,255,0.8),transparent_70%)]" />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center">
          <p className="text-[13px] font-bold uppercase tracking-[0.22em]" style={{ color: PURPLE }}>{html($t("ArVrResults__t1", "Real results"))}</p>
          <i aria-hidden className="mx-auto mt-2 block h-[2px] w-8 rounded-full" style={{ background: PURPLE }} />
          <h2 className="text-h2 font-heading mt-4 font-bold leading-[1.1] tracking-[-0.02em]" style={{ color: NAVY }}>
            <span className="block">{html($t("ArVrResults__t2", "Step into our world"))}</span>
            <span className="block">{rich($t("ArVrResults__t3m", "of <span class=\"bg-[linear-gradient(90deg,#5b43e8,#7c5cf6)] bg-clip-text text-transparent\">real impact.</span>"))}</span>
          </h2>
          <p className="text-body mx-auto mt-4 max-w-[440px] text-slate-600">{rich($t("ArVrResults__t5", "Explore how immersive experiences drive measurable results in the real world."))}</p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <span aria-hidden className="relative block h-8 w-5 rounded-full border-2 border-slate-400">
              <motion.span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-slate-500" animate={reduce ? undefined : { y: [0, 8, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">{html($t("ArVrResults__t6", "Scroll to explore"))}</span>
          </div>
        </motion.div>

        <div className="relative mx-auto mt-8 flex max-w-[1300px] items-center justify-between gap-4">
          <SidePanel side="l" label={$t("ArVrResults__t7", "Product Visualization")} image={$t("ArVrResults__t8", "/ar-vr/results-car.webp")} icon={Box} />
          <motion.div
            className="relative w-full lg:w-[52%]"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={$t("ArVrResults__t9", "/ar-vr/results-headset.webp")}
                alt={$t("ArVrResults__t10", "VR headset showing an immersive training session")}
                width={1015}
                height={473}
                sizes="(min-width: 1024px) 680px, 100vw"
                className="edge-fade h-auto w-full select-none mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
          <SidePanel side="r" label={$t("ArVrResults__t11", "Architectural Visualization")} image={$t("ArVrResults__t12", "/ar-vr/results-house.webp")} icon={Building2} />
        </div>

        <ul className="mx-auto mt-10 grid max-w-[1100px] grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-slate-300/70">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <motion.li
                key={i}
                className="flex flex-col items-center px-3 text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }}
              >
                <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-[0_10px_24px_-12px_rgba(91,67,232,0.45)]"><Icon className="h-6 w-6" style={{ color: PURPLE }} /></span>
                <span className="text-h3 font-heading mt-3 font-bold" style={{ color: PURPLE }}>{s.value}</span>
                <span className="mt-1 max-w-[170px] text-small leading-snug text-slate-700">{s.label}</span>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
