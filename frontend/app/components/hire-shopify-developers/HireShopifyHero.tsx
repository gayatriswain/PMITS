"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useFitScale } from "../shared/useFitScale";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const NAVY = "#0c1f1a";
const GREEN = "#1f7a3f";
const DEEP = "#0e4d2f";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const Icon = ({ children, className = "w-6 h-6" }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const features__cms = [
  {
    label: "Low-Code/No-Code\nPlatform Utilisation",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6M14 4l-4 16" />,
  },
  {
    label: "Shopify Headless\nE-commerce Development",
    icon: (
      <>
        <path d="M4 9 5.500 4h13L20 9" />
        <path d="M4 9a2.700 2.700 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0A2.700 2.700 0 0 0 20 9" />
        <path d="M5 12v8h14v-8M10 20v-4h4v4" />
      </>
    ),
  },
  {
    label: "SEO-Friendly\nStore Creation",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 15v-3M11 15V9M15 15v-5" />
        <path d="M7 8h3" />
      </>
    ),
  },
  {
    label: "Setting Up and\nConfiguring a Shopify Store",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900 7 7M17 17l2.100 2.100M4.900 19.100 7 17M17 7l2.100-2.100" />
      </>
    ),
  },
];

const trust__cms = [
  {
    a: "Free",
    b: "Consultation",
    icon: (
      <>
        <path d="M21 12a8 8 0 0 1-11.500 7.200L4 21l1.800-5.500A8 8 0 1 1 21 12Z" />
        <path d="M9 11h.01M12.500 11h.01M16 11h.01" />
      </>
    ),
  },
  {
    a: "Quick",
    b: "Response",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    a: "No",
    b: "Obligation",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

function Heading({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <h1 className={`font-black tracking-tight ${className}`} style={{ color: NAVY }}>
      {$t("HireShopifyHero__t1", "Hire")}{" "}
      <span className="bg-gradient-to-r from-[#2f9e4f] to-[#0e5a33] bg-clip-text text-transparent">{$t("HireShopifyHero__t2", "Shopify")}</span>
      <br />
      {$t("HireShopifyHero__t3", "Developers")}</h1>
  );
}

const copy = "Power up your online business using the skills of industry-certified Shopify developers having diverse experiences and deep eCommerce insights.";

function Buttons({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <Link
        href={$t("HireShopifyHero__t4", "#contact")}
        className="group inline-flex items-center justify-center gap-3 h-[50px] px-8 rounded-full bg-[linear-gradient(90deg,#0b4a2c,#1b6b3f)] text-white text-[15px] font-semibold shadow-[0_16px_28px_-10px_rgba(14,77,47,0.75)] hover:brightness-110 transition whitespace-nowrap"
      >
        {$t("HireShopifyHero__t5", "Get My Free Proposal")}<svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
      <Link href={$t("HireShopifyHero__t6", "#contact")} className="group inline-flex items-center gap-3 whitespace-nowrap">
        <span className="relative w-[50px] h-[50px] rounded-full bg-white border border-slate-100 shadow-[0_12px_24px_-10px_rgba(15,35,30,0.35)] flex items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-emerald-300"
            animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <svg viewBox="0 0 24 24" className="w-4 h-4 ml-0.5" fill={NAVY}>
            <path d="M8 5.500v13l11-6.500Z" />
          </svg>
        </span>
        <span className="text-[15px] font-semibold" style={{ color: NAVY }}>
          {$t("HireShopifyHero__t7", "Talk to Our Experts")}</span>
      </Link>
    </div>
  );
}

function TrustRow({ className = "" }: { className?: string }) {
  const trust = useCmsData("HireShopifyHero__trust", trust__cms);
  return (
    <div className={`flex items-center divide-x divide-slate-200 ${className}`}>
      {trust.map((t, i) => (
        <div key={t.a} className={`flex items-center gap-2.5 ${i ? "pl-6" : ""} ${i < trust.length - 1 ? "pr-6" : ""}`}>
          <span className="text-[#1f6b45] [&_svg]:w-[26px] [&_svg]:h-[26px]">
            <Icon>{t.icon}</Icon>
          </span>
          <span className="text-[13px] leading-tight font-medium text-slate-600">
            {t.a}
            <br />
            {t.b}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HireShopifyHero() {
  const $t = useCmsText();
  const features = useCmsData("HireShopifyHero__features", features__cms);
  const { ref, scale } = useFitScale(1240);

  return (
    <section className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#f3faf5_0%,#fbfdfb_45%,#ffffff_100%)]">
      {/* soft green wash behind the artwork */}
      <div className="absolute right-[-120px] top-[-160px] w-[760px] h-[760px] rounded-full bg-[radial-gradient(circle,rgba(190,230,200,0.55)_0%,rgba(225,245,232,0.3)_50%,transparent_72%)] pointer-events-none" />

      <Container className="relative z-10 max-w-[1320px]">
        {/* ======================= DESKTOP: fixed 1240 x 815 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <div ref={ref} className="relative w-full" style={{ aspectRatio: "1240 / 815" }}>
            <div style={{ width: 1240, height: 815, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }} className="relative">
              {/* ---------- artwork ---------- */}
              <div className="absolute" style={{ left: 630, top: 110, width: 510 }}>
                <Image src={$t("HireShopifyHero__t8", "/shopify developer.webp")} alt={$t("HireShopifyHero__t9", "Shopify developer building an online store")} width={800} height={824} priority sizes="510px" className="w-full h-auto select-none drop-shadow-[0_30px_40px_rgba(15,60,40,0.14)]" />
              </div>

              {/* handwritten: Build Sell Grow */}
              <motion.div
                className={`${caveat.className} absolute text-[30px] leading-[1.02] font-semibold -rotate-[8deg]`}
                style={{ left: 1068, top: 14, color: DEEP }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                {$t("HireShopifyHero__t10", "Build")}<br />
                {$t("HireShopifyHero__t11", "Sell")}<br />
                {$t("HireShopifyHero__t12", "Grow")}</motion.div>
              <svg className="absolute pointer-events-none" style={{ left: 1128, top: 14 }} width="80" height="80" viewBox="0 0 80 80" fill="none">
                <motion.path
                  d="M6 22 C 30 6, 56 14, 62 50"
                  stroke={DEEP}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 1.5 }}
                />
                <motion.path d="M50 44 L62 52 L68 38" stroke={DEEP} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }} />
              </svg>

              {/* handwritten: More than just a store + growth arrow */}
              <svg className="absolute pointer-events-none" style={{ left: 1050, top: 612 }} width="120" height="100" viewBox="0 0 120 100" fill="none">
                <motion.path
                  d="M6 92 L38 62 L56 74 L108 22"
                  stroke="#2f9e4f"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                />
                <motion.path d="M84 20 L110 20 L106 46" stroke="#2f9e4f" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4 }} />
              </svg>
              <motion.div
                className={`${caveat.className} absolute text-[24px] leading-[1.05] font-semibold -rotate-[14deg]`}
                style={{ left: 1118, top: 668, color: DEEP }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 2 }}
              >
                {$t("HireShopifyHero__t13", "More")}<br />
                {$t("HireShopifyHero__t14", "than just a store.")}</motion.div>

              {/* ---------- copy ---------- */}
              <motion.div className="absolute left-[35px] top-[66px] w-[470px]" variants={stagger} initial="hidden" animate="show">
                <motion.div variants={fadeUp} className="flex items-center gap-3 text-[11.5px] font-medium tracking-[0.2em] uppercase text-slate-500">
                  <span className="w-12 h-px bg-slate-300" />
                  {$t("HireShopifyHero__t15", "Ecommerce Experts, Real Results")}<span className="w-12 h-px bg-slate-300" />
                </motion.div>

                <motion.div variants={fadeUp} className="mt-5">
                  <Heading className="text-[70px] leading-[1.04]" />
                </motion.div>

                <motion.p variants={fadeUp} className="text-body mt-7 text-slate-600 w-[430px]">
                  {copy}
                </motion.p>

                <motion.div variants={fadeUp} className="mt-9 grid grid-cols-4 gap-x-2 w-[480px]">
                  {features.map((f, i) => (
                    <div key={f.label} className="flex flex-col items-start">
                      <motion.span
                        className="w-[52px] h-[52px] rounded-2xl bg-[#e4f3e8] text-[#1f7a3f] flex items-center justify-center shadow-[0_10px_20px_-12px_rgba(20,100,60,0.5)] [&_svg]:w-6 [&_svg]:h-6"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                      >
                        <Icon>{f.icon}</Icon>
                      </motion.span>
                      <span className="mt-3 text-[11.5px] leading-snug text-slate-600 whitespace-pre-line">{f.label}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-9">
                  <Buttons />
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8">
                  <TrustRow />
                </motion.div>
              </motion.div>

              {/* signature */}
              <motion.div
                className={`${caveat.className} absolute left-[36px] top-[696px] text-[40px] leading-[1.05] font-semibold -rotate-[8deg]`}
                style={{ color: DEEP }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                {$t("HireShopifyHero__t16", "Your Shopify Store")}<br />
                <span className="ml-8">{$t("HireShopifyHero__t17", "Our Expertise.")}</span>
              </motion.div>
              <svg className="absolute pointer-events-none" style={{ left: 74, top: 778 }} width="230" height="26" viewBox="0 0 230 26" fill="none">
                <motion.path d="M4 20 C 60 18, 150 10, 224 3" stroke="#2f9e4f" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 2.2 }} />
              </svg>
            </div>
          </div>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden py-10 sm:py-14">
          <div className="flex items-center gap-3 text-[11px] font-medium tracking-[0.18em] uppercase text-slate-500">
            <span className="w-8 h-px bg-slate-300" />
            {$t("HireShopifyHero__t18", "Ecommerce Experts, Real Results")}</div>
          <Heading className="mt-4 text-5xl sm:text-6xl leading-[1.05]" />
          <p className="text-body mt-5 text-slate-600 max-w-lg">{copy}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-[#e4f3e8] text-[#1f7a3f] flex items-center justify-center shrink-0">
                  <Icon>{f.icon}</Icon>
                </span>
                <span className="text-[11.5px] leading-snug text-slate-600 whitespace-pre-line">{f.label}</span>
              </div>
            ))}
          </div>

          <Buttons className="mt-7 flex-wrap" />
          <TrustRow className="mt-6 flex-wrap gap-y-3" />

          <div className="mt-10 max-w-[480px] mx-auto">
            <Image src={$t("HireShopifyHero__t19", "/shopify developer.webp")} alt={$t("HireShopifyHero__t20", "Shopify developer building an online store")} width={800} height={824} priority className="w-full h-auto" />
          </div>

          <div className={`${caveat.className} mt-4 text-3xl font-semibold`} style={{ color: DEEP }}>
            {$t("HireShopifyHero__t21", "Your Shopify Store")}<br />
            <span className="ml-6">{$t("HireShopifyHero__t22", "Our Expertise.")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
