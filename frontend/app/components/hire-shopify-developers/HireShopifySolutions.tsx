"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CreditCard,
  LayoutTemplate,
  Mail,
  MonitorSmartphone,
  Play,
  ShoppingCart,
  Store,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import Container from "../shared/Container";
import CountUp from "../shared/CountUp";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const display = { className: "font-heading" }; // global font from app/layout.tsx
const script = { className: "font-caveat" }; // global font from app/layout.tsx

const EASE = [0.22, 1, 0.36, 1] as const;
const GREEN = "#1f7a3f";
const DEEP = "#0e4d2f";
const INK = "#0c1f1a";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

type Feature = { title: string; text: string; icon: LucideIcon };

// Listed in reading order (left, right, left, right …) so numbers run .01 → .08 across each row.
const FEATURES__cms: Feature[] = [
  { title: "Contemporary & Unique Store Design", text: "You get a contemporary store that suits your business and personality.", icon: Store },
  { title: "Multi-Device Accessibility", text: "We provide fast and easy access to your ecommerce store to your customers on not just laptop but also tablet and smartphone.", icon: MonitorSmartphone },
  { title: "Custom Payment Solutions", text: "Customized application to receive payments from customers instantly with their credit and debit cards.", icon: CreditCard },
  { title: "Pleasurable Shopping Experience", text: "A pleasing UI to give a happy shopping experience to your customers on Shopify.", icon: ShoppingCart },
  { title: "Ready-to-Use Templates", text: "Readymade templates that you can improve on your own without hiring a graphic designer.", icon: LayoutTemplate },
  { title: "Smart Alerts & Notifications", text: "Alerts for notifications and emails.", icon: Bell },
  { title: "Effective Newsletter Service", text: "A highly effective newsletter service to get subscribers through offers and coupons.", icon: Mail },
  { title: "Highly Personalized Shop Design", text: "Highly personalized shop design where every design aspect has inputs and approvals from you.", icon: WandSparkles },
];

/** A hand-written line that "draws" itself under the script text. */
function Swoosh({ d, className = "" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 140 16" className={className} fill="none" aria-hidden>
      <motion.path
        d={d}
        stroke={GREEN}
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function HireShopifySolutions() {
  const $t = useCmsText();
  const FEATURES = useCmsData("HireShopifySolutions__FEATURES", FEATURES__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f1f9f3_55%,#eaf5ed_100%)] py-14 sm:py-20">
      {/* soft background shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_8%_55%,rgba(180,230,195,0.5),transparent_70%),radial-gradient(ellipse_35%_40%_at_95%_20%,rgba(190,235,205,0.35),transparent_70%)]" />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-24 top-[26%] hidden h-[520px] w-[520px] rounded-full border border-[#cfe8d6] lg:block"
        animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <span aria-hidden className="pointer-events-none absolute -left-10 top-[34%] hidden h-[400px] w-[400px] rounded-full border border-[#dcefe1] lg:block" />

      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ header ------------------------------ */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="relative mx-auto max-w-[760px] text-center">
          <motion.p variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-slate-500 sm:text-[11px]">
            <i aria-hidden className="h-px w-8 bg-slate-300 sm:w-12" />
            {rich($t("HireShopifySolutions__t1", "Design "))}<span className="text-slate-300">|</span> {rich($t("HireShopifySolutions__t2", "Customize "))}<span className="text-slate-300">|</span> {rich($t("HireShopifySolutions__t3", "Convert"))}<i aria-hidden className="h-px w-8 bg-slate-300 sm:w-12" />
          </motion.p>

          <h2 className={`text-h2 ${display.className} mt-5 font-extrabold tracking-[-0.02em]`} style={{ color: INK }}>
            {[
              { t: $t("HireShopifySolutions__t4", "Totally Customized and Attractive"), g: false },
              { t: $t("HireShopifySolutions__t5", "Shopify Solutions"), g: true },
            ].map((l, i) => (
              <span key={l.t} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.8, delay: 0.12 + i * 0.12, ease: EASE } } }}
                >
                  {l.g ? (
                    <span className="bg-[linear-gradient(100deg,#0e4d2f_10%,#2f9a52_50%,#1f7a3f_80%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-[shopSolShine_6s_linear_infinite]">
                      {l.t}
                    </span>
                  ) : (
                    l.t
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p variants={fadeUp} custom={3} className="text-body mx-auto mt-4 max-w-[600px] text-slate-600">
            {rich($t("HireShopifySolutions__t6", "Our Shopify developers, after years of designing stores for customers, know what it takes to come up with the latest and visually appealing storefronts."))}</motion.p>

          {/* script note, top-right (desktop) */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className={`${script.className} absolute -right-[18%] -top-1 hidden w-[150px] rotate-[8deg] text-left text-[22px] leading-[1.05] lg:block xl:-right-[22%]`}
            style={{ color: DEEP }}
          >
            {$t("HireShopifySolutions__t7", "More")}<br />
            {$t("HireShopifySolutions__t8", "Sales")}<br />
            {$t("HireShopifySolutions__t9", "Bigger")}<br />
            {$t("HireShopifySolutions__t10", "Possibilities")}<Swoosh d="M2 12C40 14 90 8 138 2" className="-ml-1 mt-0.5 h-3 w-[140px]" />
          </motion.div>
        </motion.div>

        {/* ------------------------------ body ------------------------------ */}
        <div className="mt-10 grid items-start gap-8 lg:mt-12 lg:grid-cols-[250px_1fr] lg:gap-8 xl:grid-cols-[280px_1fr]">
          {/* ---------- left: bag on a podium ---------- */}
          <div className="relative mx-auto hidden w-full max-w-[280px] lg:block">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className={`${script.className} absolute -top-2 left-1 z-10 w-[110px] -rotate-[10deg] text-[22px] leading-[1.05]`}
              style={{ color: DEEP }}
            >
              {$t("HireShopifySolutions__t11", "Ideas")}<br />
              <span className="ml-3 inline-block">into</span>
              <br />
              <span className="ml-5 inline-block">{$t("HireShopifySolutions__t12", "Impact")}</span>
              <Swoosh d="M2 10C30 14 70 10 100 3" className="mt-0.5 h-3 w-[100px]" />
            </motion.div>

            <div className="relative mt-14 h-[350px]">
              {/* podium */}
              <motion.div
                aria-hidden
                className="absolute bottom-[34px] left-1/2 h-[92px] w-[250px] -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <span className="absolute inset-x-[-6%] bottom-[-14px] h-[70px] rounded-[50%] bg-[radial-gradient(ellipse,rgba(120,200,145,0.45)_0%,transparent_70%)] blur-md" />
                <span className="absolute inset-x-0 bottom-0 h-[70px] rounded-[50%] border border-white bg-gradient-to-b from-white to-[#dfeee3] shadow-[0_24px_36px_-14px_rgba(14,77,47,0.35)]" />
                <span className="absolute inset-x-[10%] bottom-[14px] h-[50px] rounded-[50%] border border-[#d3e8d9] bg-gradient-to-b from-[#f7fcf8] to-[#e4f2e8]" />
              </motion.div>

              {/* the bag */}
              <motion.div
                className="absolute bottom-[78px] left-1/2 w-[225px] -translate-x-[46%]"
                initial={{ opacity: 0, y: 40, rotate: -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.15, ease: EASE }}
              >
                <motion.div animate={reduce ? undefined : { y: [0, -9, 0], rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                  <Image src={$t("HireShopifySolutions__t13", "/shopify.webp")} alt={$t("HireShopifySolutions__t14", "Shopify")} width={256} height={256} sizes="200px" className="h-auto w-full select-none drop-shadow-[0_26px_26px_rgba(31,122,63,0.3)]" />
                </motion.div>
              </motion.div>

              {/* stat card */}
              <motion.div
                className="absolute bottom-0 left-[-4px] w-[172px] rounded-2xl border border-white/80 bg-white/75 p-3.5 shadow-[0_22px_40px_-20px_rgba(14,77,47,0.45)] backdrop-blur-md"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                <motion.div animate={reduce ? undefined : { y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
                  <p className={`${display.className} text-[26px] font-extrabold leading-none`} style={{ color: INK }}>
                    <CountUp to={500} suffix="+" />
                  </p>
                  <p className="text-caption mt-1 font-semibold" style={{ color: DEEP }}>{rich($t("HireShopifySolutions__t15", "Stores Built"))}</p>
                  <p className="text-[10.5px] text-slate-500">{rich($t("HireShopifySolutions__t16", "Helping brands grow with Shopify"))}</p>
                </motion.div>
              </motion.div>
            </div>

            <p className="mt-5 flex items-center gap-3 text-[9.5px] font-semibold uppercase leading-snug tracking-[0.22em] text-slate-500">
              <i aria-hidden className="h-px w-6 bg-slate-300" />
              <span>
                {$t("HireShopifySolutions__t17", "Scalable Stores")}<br />
                {$t("HireShopifySolutions__t18", "Happier Customers")}</span>
            </p>
          </div>

          {/* ---------- right: feature grid + CTAs ---------- */}
          <div>
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.li
                    key={f.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.65, delay: 0.06 * i, ease: EASE }}
                    className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-[#e3efe6] bg-white/85 p-4 pr-12 shadow-[0_14px_34px_-24px_rgba(14,77,47,0.45)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#9ed1ac] hover:shadow-[0_24px_44px_-22px_rgba(31,122,63,0.5)]"
                  >
                    <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-[#3fae5c] to-[#1f7a3f] transition-transform duration-500 group-hover:scale-y-100" />
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#e6f4ea] text-[#1f7a3f] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#1f7a3f] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-bold leading-snug" style={{ color: INK }}>{f.title}</h3>
                      <p className="text-caption mt-1.5 text-slate-500">{f.text}</p>
                    </div>
                    <span className="absolute right-3.5 top-3 text-[13px] font-medium tabular-nums text-slate-300 transition-colors duration-300 group-hover:text-[#1f7a3f]">
                      {$t("HireShopifySolutions__t19", ".0")}{i + 1}
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
            >
              <Link
                href={$t("HireShopifySolutions__t20", "#contact")}
                className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full px-8 text-[13.5px] font-semibold text-white shadow-[0_16px_28px_-12px_rgba(14,77,47,0.9)] transition-transform hover:-translate-y-0.5 active:scale-95"
                style={{ background: `linear-gradient(180deg,#2a8a4a,${DEEP})` }}
              >
                <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{$t("HireShopifySolutions__t21", "Get My Free Proposal")}</span>
                <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href={$t("HireShopifySolutions__t22", "#contact")} className="group inline-flex items-center gap-3 text-[13px] font-semibold" style={{ color: INK }}>
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-[#111] text-white transition-transform duration-300 group-hover:scale-110">
                  {!reduce && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#111]/30" />}
                  <Play className="relative ml-0.5 h-3.5 w-3.5 fill-current" />
                </span>
                <span className="border-b border-slate-400 pb-0.5 transition-colors group-hover:border-[#1f7a3f] group-hover:text-[#1f7a3f]">{$t("HireShopifySolutions__t23", "Talk to Our Shopify Experts")}</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>

      <style>{`
        @keyframes shopSolShine { 0% { background-position: 0% 0; } 100% { background-position: -220% 0; } }
        @media (prefers-reduced-motion: reduce) { [class*="shopSolShine"] { animation: none !important; } }
      `}</style>
    </section>
  );
}
