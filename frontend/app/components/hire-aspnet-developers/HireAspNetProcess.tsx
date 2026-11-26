"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ClipboardList, Code2, Headset, Rocket, ShieldCheck, UserSearch, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const EASE = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0d8a91";
const NAVY = "#101b3d";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

const STEP_ICONS: LucideIcon[] = [UserSearch, ClipboardList, Code2, ShieldCheck, Rocket, Headset];
// teal -> indigo, one colour per step
const STEP_COLORS = ["#0d8a91", "#0f8a9a", "#1b7fa6", "#2f6fb4", "#4a5fc0", "#6a4fcb"];

const steps__cms = [
  { title: "Discover", text: "Understand your goals and challenges." },
  { title: "Plan", text: "Define the right approach and roadmap." },
  { title: "Build", text: "Craft secure, scalable and clean solutions." },
  { title: "Test", text: "Ensure quality, performance and reliability." },
  { title: "Deploy", text: "Launch smoothly and efficiently." },
  { title: "Support", text: "Support, optimize and help you grow." },
];

/** "Simple Steps. Powerful Results." - intro + glossy ribbon, then six connected steps. */
export default function HireAspNetProcess() {
  const $t = useCmsText();
  const steps = useCmsData("HireAspNetProcess__steps", steps__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f6f8fe_100%)] py-12 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#c7d3ea_1px,transparent_1px)] [background-size:22px_22px] opacity-30 [mask-image:radial-gradient(ellipse_40%_30%_at_30%_70%,black,transparent)]" />
      <Container className="relative max-w-[1240px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="relative z-10">
            <motion.p variants={fadeUp} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>
              <i aria-hidden className="h-px w-10 bg-[#0d8a91]/60" />
              {$t("HireAspNetProcess__t1", "Our ASP.NET development process")}
            </motion.p>
            <h2 className="text-h1 font-heading mt-6 font-extrabold leading-[1.05] tracking-[-0.025em]" style={{ color: NAVY }}>
              <motion.span variants={fadeUp} custom={1} className="block">{$t("HireAspNetProcess__t2", "Simple Steps.")}</motion.span>
              <motion.span variants={fadeUp} custom={2} className="block">
                <span className="bg-[linear-gradient(100deg,#0b6f78,#18a8ae)] bg-clip-text text-transparent">{$t("HireAspNetProcess__t3", "Powerful")}</span>{" "}
                {$t("HireAspNetProcess__t4", "Results.")}
              </motion.span>
            </h2>
            <motion.p variants={fadeUp} custom={3} className="text-body mt-6 max-w-[470px] text-slate-600">
              {rich($t("HireAspNetProcess__t5", "From concept to long-term success – we build, deploy and evolve ASP.NET solutions that drive real impact."))}
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="mt-9">
              <Link
                href={$t("HireAspNetProcess__t6", "#aspnet-contact")}
                className="group inline-flex items-center rounded-full border border-[#0d8a91]/45 bg-white pr-7 text-[13px] font-bold uppercase tracking-[0.06em] shadow-[0_14px_30px_-20px_rgba(16,27,61,0.5)] transition-colors hover:border-[#0d8a91]"
                style={{ color: NAVY }}
              >
                <span className="mr-5 grid h-[52px] w-[52px] place-items-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1" style={{ background: NAVY }}>
                  <ArrowRight className="h-5 w-5" />
                </span>
                {$t("HireAspNetProcess__t7", "Hire ASP.NET developers")}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative -mx-5 lg:-mr-16 lg:ml-0"
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={$t("HireAspNetProcess__t8", "/aspnet/process-ribbon.webp")}
                alt={$t("HireAspNetProcess__t9", "Glossy ASP.NET ribbon rising like a growth arrow")}
                width={1461}
                height={1077}
                sizes="(min-width: 1024px) 680px, 100vw"
                className="edge-fade h-auto w-full select-none mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* six steps joined by wavy connectors */}
        <ol className="relative mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:mt-6 lg:grid-cols-6">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length];
            const color = STEP_COLORS[i % STEP_COLORS.length];
            const next = STEP_COLORS[(i + 1) % STEP_COLORS.length];
            return (
              <motion.li
                key={i}
                className="group relative flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
              >
                {i < steps.length - 1 && (
                  <svg aria-hidden viewBox="0 0 120 24" preserveAspectRatio="none" className="absolute left-[calc(50%+48px)] top-[34px] hidden h-6 w-[calc(100%-80px)] lg:block" fill="none">
                    <defs>
                      <linearGradient id={`aspStep${i}`} x1="0" x2="1">
                        <stop offset="0" stopColor={color} />
                        <stop offset="1" stopColor={next} />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M2 12 C 30 0, 50 0, 60 12 S 90 24, 118 12"
                      stroke={`url(#aspStep${i})`}
                      strokeWidth="1.4"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.4 + i * 0.15 }}
                    />
                    <circle cx="2" cy="12" r="2.2" fill={color} />
                    <circle cx="118" cy="12" r="2.2" fill={next} />
                  </svg>
                )}
                <span
                  className="grid h-[84px] w-[84px] place-items-center rounded-full bg-white shadow-[0_18px_34px_-20px_rgba(16,27,61,0.45)] ring-1 ring-slate-100 transition-transform duration-300 group-hover:-translate-y-1.5"
                  style={{ color }}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.6} />
                </span>
                <span className="text-h5 font-heading mt-5 font-bold" style={{ color }}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-small mt-1 font-bold uppercase tracking-[0.08em]" style={{ color: NAVY }}>{s.title}</h3>
                <i aria-hidden className="mt-3 block h-[2px] w-7 rounded-full" style={{ background: color }} />
                <p className="text-caption mt-3 max-w-[180px] text-slate-500">{s.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
