"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Code2, Cloud, Database, Building2, ShoppingCart, ShieldCheck, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const display = { className: "font-heading" }; // global font from app/layout.tsx

const EASE = [0.22, 1, 0.36, 1] as const;
const TEAL = "#0d8a91";
const NAVY = "#16264d";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: EASE } }),
};

type Item = { title: string; text: string; icon: LucideIcon };

const LEFT__cms: Item[] = [
  { title: "Custom Application Development", text: "High-performance ASP.NET Core applications tailored to your business goals.", icon: Code2 },
  { title: "API & Backend Engineering", text: "Secure, scalable APIs and robust backend systems that power your applications.", icon: Cloud },
  { title: "Legacy Modernization", text: "Upgrade legacy .NET applications to modern architectures for better performance and maintainability.", icon: Database },
];
const RIGHT__cms: Item[] = [
  { title: "Enterprise Solutions", text: "Complex, secure and feature-rich enterprise applications aligned with your workflows.", icon: Building2 },
  { title: "E-commerce Development", text: "Scalable e-commerce platforms with seamless integrations and exceptional performance.", icon: ShoppingCart },
  { title: "Maintenance & Optimization", text: "Ongoing support, performance tuning, security updates and continuous improvements.", icon: ShieldCheck },
];

/* ------------------------------ ecosystem logos ------------------------------ */
function MsLogo() {
  return (
    <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden>
      <rect x="2" y="2" width="13.500" height="13.500" fill="#f25022" />
      <rect x="16.500" y="2" width="13.500" height="13.500" fill="#7fba00" />
      <rect x="2" y="16.500" width="13.500" height="13.500" fill="#00a4ef" />
      <rect x="16.500" y="16.500" width="13.500" height="13.500" fill="#ffb900" />
    </svg>
  );
}
function CsLogo() {
  const $t = useCmsText();
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
      <defs>
        <linearGradient id="exCs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a6cf0" />
          <stop offset="1" stopColor="#3b2fa8" />
        </linearGradient>
      </defs>
      <path d="M24 3l17.500 10v22L24 45 6.500 35V13z" fill="url(#exCs)" />
      <text x="24" y="31" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">{$t("HireAspNetExpertise__t1", "C#")}</text>
    </svg>
  );
}
function CoreLogo() {
  return (
    <svg viewBox="0 0 64 36" className="h-8 w-14" fill="none" aria-hidden>
      <defs>
        <linearGradient id="exCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3aa6d6" />
          <stop offset="1" stopColor="#1a3f9a" />
        </linearGradient>
      </defs>
      <path d="M6 32V12c0-5 6-6 8.500-1.500L26 30c2.500 4 8 3 8-1.500V4M38 32V12c0-5 6-6 8.500-1.500L58 30" stroke="url(#exCore)" strokeWidth="5.500" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function EfLogo() {
  return (
    <span className={`${display.className} text-[34px] font-extrabold leading-none tracking-tight`} style={{ color: "#5b3fd0" }}>
      e<span style={{ color: "#8a63ff" }}>f</span>
    </span>
  );
}
function SqlLogo() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" fill="none" aria-hidden>
      <path d="M6 34C12 8 20 6 24 6s6 3 4 8c-3 7-9 6-8 12 .5 3 4 3 8 0" stroke="#c9302c" strokeWidth="2.500" strokeLinecap="round" />
      <path d="M10 30c4-12 10-18 22-20M14 34c5-10 10-14 20-16" stroke="#e05a4f" strokeWidth="1.800" strokeLinecap="round" opacity="0.8" />
      <circle cx="30" cy="10" r="2.500" fill="#c9302c" />
    </svg>
  );
}
function AzureLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden>
      <defs>
        <linearGradient id="exAz" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4fb3ff" />
          <stop offset="1" stopColor="#1763d6" />
        </linearGradient>
      </defs>
      <path d="M17 6h10L10 42H2z" fill="url(#exAz)" />
      <path d="M27 6l17 36H17.500l6-10.500 8 5z" fill="#2a7de8" />
    </svg>
  );
}

const ECOSYSTEM__cms = [
  { label: ".NET 8", logo: <MsLogo /> },
  { label: "C#", logo: <CsLogo /> },
  { label: "ASP.NET Core", logo: <CoreLogo /> },
  { label: "Entity\nFramework", logo: <EfLogo /> },
  { label: "SQL Server", logo: <SqlLogo /> },
  { label: "Azure", logo: <AzureLogo /> },
];

/* ------------------------------ one side item ------------------------------ */
function SideItem({ item, side, i }: { item: Item; side: "l" | "r"; i: number }) {
  const Icon = item.icon;
  const left = side === "l";
  return (
    <motion.li
      className={`group flex items-start gap-4 ${left ? "" : "lg:flex-row-reverse lg:text-right"}`}
      initial={{ opacity: 0, x: left ? -28 : 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: EASE }}
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-[#0d8a91] shadow-[0_14px_28px_-14px_rgba(22,38,77,0.4)] ring-1 ring-[#e3eef2] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#0d8a91] group-hover:text-white">
        <Icon className="h-6 w-6" strokeWidth={1.6} />
      </span>
      <div className="max-w-[270px]">
        <h3 className="text-[14.5px] font-bold leading-snug" style={{ color: NAVY }}>{item.title}</h3>
        <p className="text-caption mt-1.5 text-slate-500">{item.text}</p>
      </div>
    </motion.li>
  );
}

/* ------------------------------ section ------------------------------ */
export default function HireAspNetExpertise() {
  const $t = useCmsText();
  const LEFT = useCmsData("HireAspNetExpertise__LEFT", LEFT__cms);
  const RIGHT = useCmsData("HireAspNetExpertise__RIGHT", RIGHT__cms);
  const ECOSYSTEM = useCmsData("HireAspNetExpertise__ECOSYSTEM", ECOSYSTEM__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fbfd_0%,#eef4f9_100%)] py-14 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_50%_at_50%_55%,rgba(180,225,240,0.5),transparent_72%)]" />

      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ header ------------------------------ */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mx-auto max-w-[760px] text-center">
          <motion.p variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: TEAL }}>
            <i aria-hidden className="h-px w-8 bg-[#0d8a91]/45 sm:w-14" />
            {rich($t("HireAspNetExpertise__t2", "Engineering excellence"))}<i aria-hidden className="h-px w-8 bg-[#0d8a91]/45 sm:w-14" />
          </motion.p>
          <h2 className={`text-h2 ${display.className} mt-5 font-extrabold tracking-[-0.02em]`} style={{ color: NAVY }}>
            {[
              <>{$t("HireAspNetExpertise__t3", "ASP.NET expertise")}</>,
              <>
                {$t("HireAspNetExpertise__t4", "built for")}{" "}
                <span className="bg-[linear-gradient(100deg,#0b6f78_10%,#18a8ae_45%,#0d8a91_75%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-[aspExShine_6s_linear_infinite]">{html($t("HireAspNetExpertise__t12", "real-world"))}</span> {$t("HireAspNetExpertise__t5", "impact.")}</>,
            ].map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="block"
                  variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE } } }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p variants={fadeUp} custom={3} className="text-body mx-auto mt-4 max-w-[600px] text-slate-600">
            {rich($t("HireAspNetExpertise__t6", "Our ASP.NET developers deliver secure, scalable and high-performance solutions tailored to your business and built for the future."))}</motion.p>
          <motion.span
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, delay: 0.5, ease: EASE } } }}
            className="mx-auto mt-5 block h-[3px] w-12 origin-center rounded-full"
            style={{ background: TEAL }}
          />
        </motion.div>

        {/* ------------------------------ 3-column stage ------------------------------ */}
        <div className="relative mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-[1fr_380px_1fr] lg:gap-6 xl:grid-cols-[1fr_420px_1fr]">
          {/* connecting arcs (desktop): one bracket per side, bulging toward the badge, with glowing end dots */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
              {[
                "M 29 13 C 39 22, 39 75, 29 84",
                "M 29.6 48.5 L 34.4 48.5",
                "M 71 13 C 61 22, 61 75, 71 84",
                "M 70.4 48.5 L 65.6 48.5",
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  stroke="#6fcfd8"
                  strokeOpacity="0.9"
                  strokeWidth="1.1"
                  vectorEffect="non-scaling-stroke"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.12 }}
                />
              ))}
            </svg>
            {[
              [29, 13],
              [31.4, 48.5],
              [29, 84],
              [71, 13],
              [68.6, 48.5],
              [71, 84],
            ].map(([x, y], i) => (
              <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
                <span className="relative block h-[7px] w-[7px] rounded-full bg-[#2fb5c1] shadow-[0_0_10px_3px_rgba(47,181,193,0.55)]">
                  {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-[#2fb5c1]/60" style={{ animationDelay: `${i * 0.5}s`, animationDuration: "2.6s" }} />}
                </span>
              </span>
            ))}
          </div>

          <ul className="relative z-10 space-y-9 lg:space-y-12">
            {LEFT.map((it, i) => (
              <SideItem key={it.title} item={it} side="l" i={i} />
            ))}
          </ul>

          {/* centre badge */}
          <div className="relative z-10 mx-auto w-full max-w-[340px] lg:max-w-none">
            <motion.span
              aria-hidden
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(80,210,240,0.5),transparent_68%)] blur-2xl"
              animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [0.95, 1.06, 0.95] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <motion.div animate={reduce ? undefined : { y: [0, -9, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                <Image
                  src={$t("HireAspNetExpertise__t7", "/aspnet-badge.webp")}
                  alt={$t("HireAspNetExpertise__t8", "ASP.NET")}
                  width={1310}
                  height={1200}
                  sizes="(min-width: 1280px) 420px, 340px"
                  className="relative h-auto w-full select-none drop-shadow-[0_30px_34px_rgba(30,110,170,0.28)]"
                />
              </motion.div>
            </motion.div>
          </div>

          <ul className="relative z-10 space-y-9 lg:space-y-12">
            {RIGHT.map((it, i) => (
              <SideItem key={it.title} item={it} side="r" i={i} />
            ))}
          </ul>
        </div>

        {/* ------------------------------ ecosystem bar ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 grid items-center gap-6 rounded-2xl border border-white bg-white/85 p-5 shadow-[0_24px_54px_-34px_rgba(22,38,77,0.45)] backdrop-blur-sm lg:grid-cols-[250px_1fr] lg:gap-8 lg:px-8"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: NAVY }}>{rich($t("HireAspNetExpertise__t9", "Built on the powerful"))}</p>
            <p className={`text-body ${display.className} mt-1 whitespace-nowrap font-extrabold`} style={{ color: TEAL }}>{rich($t("HireAspNetExpertise__t10m", "<span class=\"text-[#16264d]\">.NET</span> ECOSYSTEM"))}</p>
          </div>
          <ul className="grid grid-cols-3 gap-y-5 lg:grid-cols-6 lg:divide-x lg:divide-slate-200/80">
            {ECOSYSTEM.map((e, i) => (
              <motion.li
                key={e.label}
                className="group flex flex-col items-center gap-2 px-3 text-center"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <span className="flex h-11 items-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">{e.logo}</span>
                <span className="whitespace-pre-line text-[11.5px] font-medium leading-tight text-slate-600">{e.label}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>

      <style>{`
        @keyframes aspExShine { 0% { background-position: 0% 0; } 100% { background-position: -220% 0; } }
        @media (prefers-reduced-motion: reduce) { [class*="aspExShine"] { animation: none !important; } }
      `}</style>
    </section>
  );
}
