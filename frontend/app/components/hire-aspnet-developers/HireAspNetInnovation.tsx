"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, BarChart3, Gauge, Lock, MessageSquareText, Scaling, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const EASE = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0d8a91";
const NAVY = "#0d1b3e";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

const FEATURE_ICONS: LucideIcon[] = [ShieldCheck, Scaling, Gauge];
const STAT_ICONS: LucideIcon[] = [Gauge, ShieldCheck, BarChart3, Lock, Users];

const features__cms = [{ label: "Secure" }, { label: "Scalable" }, { label: "High Performance" }];

const stats__cms = [
  { value: "2.5x", label: "Faster Development" },
  { value: "99.9%", label: "Application Uptime" },
  { value: "60%", label: "Better Performance" },
  { value: "100%", label: "Security Focused" },
  { value: "200+", label: "Projects Delivered" },
];

/** "Code that performs." - ASP.NET at the core of the tech stack, with headline numbers. */
export default function HireAspNetInnovation() {
  const $t = useCmsText();
  const features = useCmsData("HireAspNetInnovation__features", features__cms);
  const stats = useCmsData("HireAspNetInnovation__stats", stats__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f8fc_100%)] pb-10 pt-16 sm:pb-14 sm:pt-20">
      <Container className="relative max-w-[1300px]">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>
              <i aria-hidden className="h-[2px] w-10 bg-[#0d8a91]/70" />
              {html($t("HireAspNetInnovation__t1", "Built on innovation"))}
            </motion.p>
            <h2 className="text-h1 font-heading mt-6 font-extrabold uppercase leading-[1] tracking-[-0.01em]" style={{ color: NAVY }}>
              <motion.span variants={fadeUp} custom={1} className="block">{html($t("HireAspNetInnovation__t2", "Code that"))}</motion.span>
              <motion.span variants={fadeUp} custom={2} className="block bg-[linear-gradient(95deg,#0b6f78,#1596a5_55%,#0d8a91)] bg-clip-text pb-1 text-transparent">
                {html($t("HireAspNetInnovation__t3", "Performs."))}
              </motion.span>
            </h2>
            <motion.p variants={fadeUp} custom={3} className="text-body mt-6 max-w-[440px] text-slate-600">
              {rich($t("HireAspNetInnovation__t4", "ASP.NET at the core. Modern technologies around it. Extraordinary solutions for your business."))}
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap gap-4">
              <Link
                href={$t("HireAspNetInnovation__t5", "#aspnet-contact")}
                className="group inline-flex items-center gap-3 rounded-xl px-6 py-4 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_16px_30px_-16px_rgba(13,138,145,0.9)] transition-transform hover:-translate-y-0.5"
                style={{ backgroundImage: "linear-gradient(135deg,#0b6f78,#13a0a9)" }}
              >
                {$t("HireAspNetInnovation__t6", "Start a project")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={$t("HireAspNetInnovation__t7", "/contact")}
                className="group inline-flex items-center gap-3 rounded-xl border border-[#0d8a91]/45 bg-white px-6 py-4 text-[13px] font-bold uppercase tracking-[0.06em] transition-colors hover:border-[#0d8a91] hover:bg-[#f0fbfb]"
                style={{ color: NAVY }}
              >
                {$t("HireAspNetInnovation__t8", "Talk to an expert")}
                <MessageSquareText className="h-5 w-5" style={{ color: TEAL }} />
              </Link>
            </motion.div>
            <motion.ul variants={fadeUp} custom={5} className="mt-9 flex flex-wrap items-center gap-y-4 divide-x divide-slate-200">
              {features.map((f, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                return (
                  <li key={i} className="flex items-center gap-3 px-5 first:pl-0">
                    <Icon className="h-8 w-8 shrink-0" strokeWidth={1.5} style={{ color: TEAL }} />
                    <span className="max-w-[110px] text-[12px] font-bold uppercase leading-tight tracking-[0.06em]" style={{ color: NAVY }}>{f.label}</span>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          >
            <span aria-hidden className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(90,200,235,0.35),transparent_70%)] blur-2xl" />
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={$t("HireAspNetInnovation__t9", "/aspnet/core-orbit.webp")}
                alt={$t("HireAspNetInnovation__t10", "ASP.NET at the core of every solution, surrounded by C#, Azure, Entity Framework, Visual Studio, SQL Server and GitHub")}
                width={1067}
                height={713}
                sizes="(min-width: 1024px) 700px, 100vw"
                className="edge-fade relative h-auto w-full select-none mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* numbers */}
        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 grid grid-cols-2 gap-y-8 rounded-[24px] border border-slate-100 bg-white px-5 py-8 shadow-[0_24px_54px_-36px_rgba(13,27,62,0.45)] sm:grid-cols-3 sm:px-8 lg:grid-cols-5 lg:divide-x lg:divide-slate-200/80"
        >
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <li key={i} className="flex items-center gap-4 lg:justify-center lg:px-4">
                <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-full bg-[#f3f8fa] ring-1 ring-[#e2eef2]" style={{ color: TEAL }}>
                  <Icon className="h-8 w-8" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="text-h4 font-heading block font-bold leading-none" style={{ color: TEAL }}>{s.value}</span>
                  <span className="text-caption mt-1.5 block max-w-[110px] leading-snug text-slate-600">{s.label}</span>
                </span>
              </li>
            );
          })}
        </motion.ul>

        <div className="mt-10 text-center">
          <p className="text-small text-slate-600">{rich($t("HireAspNetInnovation__t11", "Ready to build powerful, scalable and future-ready solutions with ASP.NET?"))}</p>
          <div className="mt-3 flex items-center justify-center gap-5">
            <i aria-hidden className="hidden h-px w-24 bg-slate-300 sm:block lg:w-40" />
            <Link
              href={$t("HireAspNetInnovation__t12", "#aspnet-contact")}
              className="group inline-flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.14em] sm:text-[15px]"
              style={{ color: TEAL }}
            >
              {$t("HireAspNetInnovation__t13", "Let's build something amazing together")}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <i aria-hidden className="hidden h-px w-24 bg-slate-300 sm:block lg:w-40" />
          </div>
        </div>
      </Container>
    </section>
  );
}
