"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import CountUp from "../shared/CountUp";
import { ArrowRight, Eyebrow, Icon, QUOTE_HREF, ease, fadeUp, heading, type IconName } from "./BigCommerceShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/* Brands that run on the BigCommerce platform, shown as plain-text wordmarks (not logos). */
const platformBrands__cms: { name: string; cls: string }[] = [
  { name: "PAIGE", cls: "font-black tracking-[-0.02em] text-[26px] text-[#111]" },
  { name: "BEN & JERRY’S", cls: "rounded-full border-2 border-[#3b2412] bg-[#f5e3c6] px-3 py-0.5 text-[13px] font-black italic text-[#3b2412]" },
  { name: "Skullcandy", cls: "font-extrabold tracking-tight text-[22px] text-[#111]" },
  { name: "TOMS", cls: "bg-[#a9d7ef] px-3 py-0.5 text-[22px] font-medium tracking-wide text-[#1f3d55]" },
  { name: "MOLTON BROWN", cls: "!whitespace-normal max-w-[90px] text-center font-serif text-[17px] leading-[1.05] text-[#111]" },
  { name: "TED BAKER", cls: "font-serif text-[16px] tracking-[0.35em] text-[#111]" },
];

const stats__cms: { icon: IconName; value: React.ReactNode; label: [string, string] }[] = [
  { icon: "store", value: <CountUp to={60000} suffix="+" />, label: ["Active Stores", "and Counting"] },
  { icon: "network", value: <CountUp to={120} suffix="+" />, label: ["Countries", "Globally"] },
  { icon: "users", value: "Millions", label: ["of Shoppers Served", "Worldwide"] },
  { icon: "shieldCheck", value: <CountUp to={99.99} decimals={2} suffix="%" />, label: ["Platform Uptime", "You Can Rely On"] },
];

/** Dotted "continent" blob used as the world-map decoration. */
function DotMap({ className = "", seed = 1 }: { className?: string; seed?: number }) {
  const dots: [number, number][] = [];
  let s = seed * 9301;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let y = 0; y < 26; y++) {
    for (let x = 0; x < 40; x++) {
      const nx = x / 40, ny = y / 26;
      const blob1 = (nx - 0.28) ** 2 / 0.06 + (ny - 0.35) ** 2 / 0.08 < 1;
      const blob2 = (nx - 0.38) ** 2 / 0.02 + (ny - 0.78) ** 2 / 0.05 < 1;
      const blob3 = (nx - 0.72) ** 2 / 0.07 + (ny - 0.4) ** 2 / 0.09 < 1;
      if ((blob1 || blob2 || blob3) && rnd() > 0.12) dots.push([x, y]);
    }
  }
  return (
    <svg viewBox="0 0 400 260" className={`pointer-events-none ${className}`} aria-hidden>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r="2.2" fill="#7cc4e8" opacity="0.55" />
      ))}
    </svg>
  );
}

export default function BigCommerceTrusted() {
  const $t = useCmsText();
  const platformBrands = useCmsData("BigCommerceTrusted__platformBrands", platformBrands__cms);
  const stats = useCmsData("BigCommerceTrusted__stats", stats__cms);
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-12 sm:py-16">
      <Container className="relative">
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow variant="line" className="tracking-[0.25em]">{$t("BigCommerceTrusted__t1", "Trusted by 60,000+ businesses worldwide")}</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-h2 ${heading.className} mt-5 font-bold tracking-tight text-[#0b1a4a]`}
          >
            {$t("BigCommerceTrusted__t2", "Powering ")}<span className="text-[#0d8f9a]">{$t("BigCommerceTrusted__t3", "60,000+")}</span> {$t("BigCommerceTrusted__t4", "Stores")}<br />
            {$t("BigCommerceTrusted__t5", "Across the Globe")}</motion.h2>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-3 block h-[3px] w-12 rounded bg-[#0d8f9a]"
          />
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mx-auto mt-4 max-w-[560px] text-slate-600">
            {rich($t("BigCommerceTrusted__t6", "From startups to global enterprises, BigCommerce empowers brands of all sizes to build, grow, and succeed online."))}</motion.p>
        </div>

        {/* brand strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto mt-10 max-w-[1100px] overflow-hidden rounded-2xl border border-white bg-white px-4 py-7 shadow-[0_24px_50px_-34px_rgba(11,26,74,0.45)]"
        >
          <div className="flex w-max items-center md:w-full">
            {/* marquee on small screens, static evenly spaced row from md up */}
            <ul className="mag-anim flex w-max items-center max-md:[animation:bcMarquee_26s_linear_infinite] md:w-full md:justify-between">
              {[...platformBrands, ...platformBrands].map((b, i) => (
                <li key={i} className={`flex shrink-0 items-center px-8 md:px-0 ${i >= platformBrands.length ? "md:hidden" : ""} ${i % platformBrands.length > 0 ? "md:border-l md:border-slate-200" : ""} md:flex-1 md:justify-center md:px-3`}>
                  <span className={`select-none whitespace-nowrap transition duration-300 hover:scale-105 ${b.cls}`}>{b.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* stats */}
        <div className="relative mx-auto mt-10 max-w-[1100px]">
          <DotMap className="absolute -left-10 top-0 hidden w-[260px] lg:block" seed={2} />
          <DotMap className="absolute -right-10 top-0 hidden w-[260px] scale-x-[-1] lg:block" seed={5} />
          <ul className="relative mx-auto grid max-w-[720px] grid-cols-2 gap-y-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.li
                key={s.label[0]}
                variants={fadeUp}
                custom={i * 0.6}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`group flex flex-col items-center px-3 text-center ${i > 0 ? "md:border-l md:border-slate-200" : ""}`}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-100 bg-white text-[#0d8f9a] shadow-[0_10px_24px_-14px_rgba(13,143,154,0.6)] transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
                <p className={`${heading.className} mt-3 text-2xl font-bold text-[#0b1a4a]`}>{s.value}</p>
                <p className="text-small text-slate-600">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </p>
              </motion.li>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <Link href={QUOTE_HREF} className="group inline-flex items-center gap-3 text-[15px] font-semibold text-[#0d8f9a]">
              {$t("BigCommerceTrusted__t7", "See all customer stories")}<span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0d8f9a] text-white transition-transform group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
