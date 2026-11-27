"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Award, Clock3, Code2, Gauge, Globe2, ShieldCheck, TrendingUp, Trophy, Users, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const EASE = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0d8a91";
const NAVY = "#16264d";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

const VALUE_ICONS: LucideIcon[] = [ShieldCheck, Gauge, TrendingUp, Code2, Users, Clock3];
const STAT_ICONS: LucideIcon[] = [Users, Trophy, Award, Globe2];

const values__cms = [
  { title: "Secure by Design", text: "We build robust, secure and compliant applications from the ground up." },
  { title: "High Performance", text: "Optimized solutions that deliver speed, scalability and reliability." },
  { title: "Scalable Growth", text: "Future-ready architecture that grows with your business." },
  { title: "Clean & Maintainable Code", text: "Well-structured, testable code that's easy to maintain and extend." },
  { title: "Collaborative Partnership", text: "Transparent communication and agile collaboration at every step." },
  { title: "On-Time Delivery", text: "We respect deadlines and ensure quality is never compromised." },
];

const stats__cms = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "10+", label: "Years of Experience" },
  { value: "20+", label: "Industries Served" },
];

/** "More than code. Delivering business value." - six value columns, a stats card and the glass .NET ribbon. */
export default function HireAspNetWhyUs() {
  const $t = useCmsText();
  const values = useCmsData("HireAspNetWhyUs__values", values__cms);
  const stats = useCmsData("HireAspNetWhyUs__stats", stats__cms);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f9fc_0%,#f1f4f9_100%)] pt-16 sm:pt-24">
      <Container className="relative max-w-[1240px]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto max-w-[780px] text-center">
          <motion.p variants={fadeUp} className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: TEAL }}>
            <i aria-hidden className="relative h-px w-10 bg-[#0d8a91]/50 sm:w-16"><b className="absolute -left-0.5 -top-[2px] h-[5px] w-[5px] rounded-full bg-[#0d8a91]" /></i>
            {html($t("HireAspNetWhyUs__t1", "Why businesses choose us"))}
            <i aria-hidden className="relative h-px w-10 bg-[#0d8a91]/50 sm:w-16"><b className="absolute -right-0.5 -top-[2px] h-[5px] w-[5px] rounded-full bg-[#0d8a91]" /></i>
          </motion.p>
          <h2 className="text-h2 font-heading mt-5 font-extrabold tracking-[-0.02em]" style={{ color: NAVY }}>
            <motion.span variants={fadeUp} custom={1} className="block">{html($t("HireAspNetWhyUs__t2", "More than code."))}</motion.span>
            <motion.span variants={fadeUp} custom={2} className="block">{rich($t("HireAspNetWhyUs__t3m", "Delivering <span class=\"bg-[linear-gradient(100deg,#0b6f78,#18a8ae_55%,#0d8a91)] bg-clip-text text-transparent\">business value.</span>"))}</motion.span>
          </h2>
          <motion.p variants={fadeUp} custom={3} className="text-body mx-auto mt-5 max-w-[560px] text-slate-600">
            {rich($t("HireAspNetWhyUs__t5", "Our ASP.NET developers combine deep technical expertise with a business-first approach to build solutions that matter."))}
          </motion.p>
          <motion.span variants={fadeUp} custom={4} aria-hidden className="mx-auto mt-5 flex w-fit items-center gap-1.5">
            <i className="h-[3px] w-9 rounded-full" style={{ background: TEAL }} />
            <i className="h-[3px] w-[3px] rounded-full" style={{ background: TEAL }} />
          </motion.span>
        </motion.div>

        {/* six value columns */}
        <ul className="mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:mt-14 xl:grid-cols-6 xl:divide-x xl:divide-slate-200/80">
          {values.map((v, i) => {
            const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
            return (
              <motion.li
                key={i}
                className="group flex flex-col items-center px-2 text-center sm:px-5"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              >
                <span className="grid h-[76px] w-[76px] place-items-center rounded-full bg-white text-[#0d8a91] shadow-[0_18px_34px_-18px_rgba(22,38,77,0.45),inset_0_-4px_10px_rgba(13,138,145,0.06)] ring-1 ring-white transition-all duration-300 group-hover:-translate-y-1.5 group-hover:bg-[#0d8a91] group-hover:text-white">
                  <Icon className="h-8 w-8" strokeWidth={1.7} />
                </span>
                <h3 className="text-small mt-6 min-h-[2.6em] font-bold leading-snug sm:text-[16px]" style={{ color: NAVY }}>{v.title}</h3>
                <i aria-hidden className="mt-2 block h-[2px] w-7 rounded-full transition-all duration-300 group-hover:w-12" style={{ background: TEAL }} />
                <p className="text-caption mt-4 max-w-[220px] leading-relaxed text-slate-500">{v.text}</p>
              </motion.li>
            );
          })}
        </ul>
      </Container>

      {/* stats card over the glass .NET ribbon */}
      <div className="relative mt-14 lg:mt-16">
        <Container className="relative z-10 max-w-[1040px]">
          <motion.ul
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="grid grid-cols-2 gap-y-8 rounded-[28px] border border-white/90 bg-white/70 px-4 py-8 shadow-[0_30px_60px_-36px_rgba(22,38,77,0.4)] backdrop-blur-md sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-slate-200/80 lg:py-10"
          >
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <li key={i} className="flex flex-col items-center text-center">
                  <Icon className="h-7 w-7" strokeWidth={1.6} style={{ color: TEAL }} />
                  <p className="text-h3 font-heading mt-2 font-extrabold tracking-tight" style={{ color: TEAL }}>{s.value}</p>
                  <p className="text-small mt-1 font-medium" style={{ color: NAVY }}>{s.label}</p>
                </li>
              );
            })}
          </motion.ul>
        </Container>
        <div className="relative -mt-10 sm:-mt-14 lg:-mt-20">
          <Image
            src={$t("HireAspNetWhyUs__t6", "/aspnet/why-ribbon.webp")}
            alt={$t("HireAspNetWhyUs__t7", "Glass .NET ribbon on a glowing platform")}
            width={1918}
            height={235}
            sizes="100vw"
            className="h-auto min-h-[120px] w-full select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,black_35%)]"
          />
        </div>
      </div>
    </section>
  );
}
