"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, Globe2, Smile, Users, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const EASE = [0.22, 1, 0.36, 1] as const;
const BLUE = "#1f5fe0";
const NAVY = "#101b3d";

const STAT_ICONS: LucideIcon[] = [Users, Smile, Award, Globe2];

const stats__cms = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Years of Experience" },
  { value: "20+", label: "Industries Served" },
];

/** "Ready to build your next big thing with ASP.NET?" - .NET podium, CTA card and a 2x2 stats grid. */
export default function HireAspNetCta() {
  const $t = useCmsText();
  const stats = useCmsData("HireAspNetCta__stats", stats__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f8fe_0%,#f8fafc_100%)] py-12 sm:py-16">
      <Container className="relative max-w-[1240px]">
        <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.15fr_1fr] lg:gap-6">
          <motion.div
            className="relative mx-auto w-full max-w-[420px] lg:-ml-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={$t("HireAspNetCta__t1", "/aspnet/cta-platform.webp")}
                alt={$t("HireAspNetCta__t2", ".NET logo on a glowing podium")}
                width={648}
                height={460}
                sizes="(min-width: 1024px) 400px, 90vw"
                className="edge-fade h-auto w-full select-none mix-blend-multiply"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative rounded-[24px] border border-white bg-white/90 p-7 shadow-[0_30px_60px_-34px_rgba(16,27,61,0.4)] backdrop-blur sm:p-9"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <span className="inline-block rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-white" style={{ background: BLUE }}>
              {$t("HireAspNetCta__t3", "Let's build something great")}
            </span>
            <h2 className="text-h4 font-heading mt-5 font-bold leading-tight" style={{ color: NAVY }}>
              {$t("HireAspNetCta__t4", "Ready to build your next big thing with")}{" "}
              <span style={{ color: BLUE }}>{$t("HireAspNetCta__t5", "ASP.NET")}</span>?
            </h2>
            <i aria-hidden className="mt-4 block h-[3px] w-9 rounded-full" style={{ background: BLUE }} />
            <p className="text-small mt-4 max-w-[380px] text-slate-500">
              {rich($t("HireAspNetCta__t6", "Hire dedicated ASP.NET developers from ProManage and bring your ideas to life."))}
            </p>
            <Link
              href={$t("HireAspNetCta__t7", "#aspnet-contact")}
              className="group mt-6 inline-flex items-center gap-4 rounded-full py-2 pl-2 pr-7 text-[13px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_16px_30px_-14px_rgba(31,95,224,0.75)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: "linear-gradient(90deg,#0f2a8a,#1f5fe0)" }}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#0f2a8a" }}>
                <ArrowRight className="h-5 w-5" />
              </span>
              {$t("HireAspNetCta__t8", "Hire ASP.NET developers")}
            </Link>
          </motion.div>

          <ul className="grid grid-cols-2 divide-slate-200/80 [&>li:nth-child(-n+2)]:border-b [&>li:nth-child(-n+2)]:border-slate-200/80 [&>li:nth-child(odd)]:border-r [&>li:nth-child(odd)]:border-slate-200/80">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 px-3 py-6 sm:gap-4 sm:px-5"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#eaf0fd]" style={{ color: BLUE }}>
                    <Icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span>
                    <span className="text-h4 font-heading block font-bold leading-none" style={{ color: BLUE }}>{s.value}</span>
                    <span className="text-caption mt-1.5 block font-medium" style={{ color: NAVY }}>{s.label}</span>
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
