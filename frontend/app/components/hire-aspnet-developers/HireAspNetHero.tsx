"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
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

const wordV: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({ y: "0%", opacity: 1, transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE } }),
};

/* ------------------------------------------------------------------ */
/*  Tech icons (right cards)                                           */
/* ------------------------------------------------------------------ */
function CsIcon() {
  const $t = useCmsText();
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden>
      <defs>
        <linearGradient id="csG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a6fe0" />
          <stop offset="1" stopColor="#27358f" />
        </linearGradient>
      </defs>
      <path d="M24 3l17.5 10v22L24 45 6.5 35V13z" fill="url(#csG)" />
      <path d="M24 3l17.5 10L24 23 6.5 13z" fill="#fff" opacity="0.18" />
      <text x="24" y="31" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff" fontFamily="Inter, Arial, sans-serif">{$t("HireAspNetHero__t1", "C#")}</text>
    </svg>
  );
}
function CoreIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden>
      <defs>
        <linearGradient id="coreG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3aa6d6" />
          <stop offset="1" stopColor="#1a3f9a" />
        </linearGradient>
      </defs>
      <path d={"M 9 41 L 9 15 C 9 9, 16 8, 19 13 L 30 33 C 33 38, 39 37, 39 31 L 39 8"} stroke="url(#coreG)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SqlIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" fill="none" aria-hidden>
      <defs>
        <linearGradient id="sqlG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5c6f86" />
          <stop offset="0.5" stopColor="#b3c1d1" />
          <stop offset="1" stopColor="#5c6f86" />
        </linearGradient>
      </defs>
      <path d="M8 12v24c0 3.3 7.2 6 16 6s16-2.7 16-6V12" fill="url(#sqlG)" />
      <ellipse cx="24" cy="12" rx="16" ry="6" fill="#dfe8f1" stroke="#7a8da3" strokeWidth="1" />
      <path d="M8 21c0 3.3 7.2 6 16 6s16-2.7 16-6M8 30c0 3.3 7.2 6 16 6s16-2.7 16-6" stroke="#eef3f8" strokeWidth="1.6" opacity="0.9" />
      <path d="M12 12c3 1.8 7 2.6 12 2.6s9-.8 12-2.6" stroke="#2f7fd3" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function AzureIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden>
      <defs>
        <linearGradient id="azG1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4fb3ff" />
          <stop offset="1" stopColor="#1763d6" />
        </linearGradient>
      </defs>
      <path d="M17 6h10L10 42H2z" fill="url(#azG1)" />
      <path d="M27 6l17 36H17.5l6-10.5 8 5z" fill="#2a7de8" />
      <path d="M27 6l-9 20 9.5 8.5z" fill="#fff" opacity="0.18" />
    </svg>
  );
}

const CARDS__cms = [
  { label: "C#", icon: <CsIcon />, pos: { top: 0, left: 62 }, tilt: { rotateY: -24, rotateX: 9, rotateZ: 3 } },
  { label: "ASP.NET\nCore", icon: <CoreIcon />, pos: { top: 132, left: 10 }, tilt: { rotateY: -20, rotateX: 8, rotateZ: -3 } },
  { label: "SQL Server", icon: <SqlIcon />, pos: { top: 256, left: 70 }, tilt: { rotateY: -26, rotateX: 9, rotateZ: 4 } },
  { label: "Azure", icon: <AzureIcon />, pos: { top: 382, left: 16 }, tilt: { rotateY: -20, rotateX: 8, rotateZ: -4 } },
];

/* ------------------------------------------------------------------ */
/*  3D glass tile (front face + real side/bottom faces)                */
/* ------------------------------------------------------------------ */
const TILE = 124; // face size (px)
const DEPTH = 24; // slab thickness (px)

function GlassTile({ children, tilt }: { children: React.ReactNode; tilt: { rotateY: number; rotateX: number; rotateZ: number } }) {
  const face = "absolute rounded-[24px]";
  return (
    <div className="relative" style={{ width: TILE, height: TILE, perspective: 900 }}>
      {/* soft contact shadow */}
      <span aria-hidden className="absolute -bottom-6 left-[12%] h-8 w-[86%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(40,80,130,0.28),transparent_70%)] blur-md" />
      <div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d", transform: `rotateY(${tilt.rotateY}deg) rotateX(${tilt.rotateX}deg) rotateZ(${tilt.rotateZ}deg)` }}
      >
        {/* back face */}
        <span aria-hidden className={`${face} inset-0 bg-[#dbe6f1]/70`} style={{ transform: `translateZ(${-DEPTH / 2}px)` }} />
        {/* right edge */}
        <span
          aria-hidden
          className="absolute top-[10px] rounded-[6px] bg-[linear-gradient(180deg,#ffffff_0%,#d5e2ef_45%,#b9cde0_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)]"
          style={{ left: TILE - DEPTH / 2, width: DEPTH, height: TILE - 20, transform: "rotateY(90deg)" }}
        />
        {/* bottom edge */}
        <span
          aria-hidden
          className="absolute left-[10px] rounded-[6px] bg-[linear-gradient(90deg,#e9f0f7_0%,#c6d6e6_60%,#b3c7db_100%)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]"
          style={{ top: TILE - DEPTH / 2, height: DEPTH, width: TILE - 20, transform: "rotateX(-90deg)" }}
        />
        {/* front glass face */}
        <div
          className={`${face} inset-0 flex flex-col items-center justify-center gap-2 overflow-hidden border border-white/90 ring-1 ring-[#9fdbe6]/40 bg-[linear-gradient(145deg,rgba(255,255,255,0.97)_0%,rgba(242,247,252,0.92)_45%,rgba(222,233,244,0.88)_100%)] text-center shadow-[inset_0_2px_0_rgba(255,255,255,1),inset_0_-10px_22px_rgba(150,180,210,0.25),inset_10px_0_18px_rgba(255,255,255,0.6)]`}
          style={{ transform: `translateZ(${DEPTH / 2}px)` }}
        >
          {/* glossy reflection */}
          <span aria-hidden className="pointer-events-none absolute -left-1/4 -top-1/2 h-[120%] w-[70%] rotate-[28deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.75),transparent)]" />
          <span aria-hidden className="pointer-events-none absolute inset-x-3 top-1 h-px bg-white" />
          <span className="relative">{children}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Podium with the glass </> (public/aspnet-podium.webp)                       */
/* ------------------------------------------------------------------ */
function Podium({ reduce }: { reduce: boolean }) {
  const $t = useCmsText();
  return (
    <div className="relative mx-auto aspect-[762/328] w-[min(540px,94vw)]">
      {/* cyan glow on the floor */}
      <motion.span
        aria-hidden
        className="absolute inset-x-[2%] bottom-[2%] h-[34%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(80,215,235,0.55)_0%,transparent_68%)] blur-xl"
        animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scaleX: [0.94, 1.06, 0.94] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* ripples spreading from the podium */}
      {!reduce && (
        <svg viewBox="0 0 540 232" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden>
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx="270" cy="196" rx="200" ry="30" stroke="#6fd3e0" strokeWidth="1.2" opacity="0">
              <animate attributeName="rx" values="215;330" dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
              <animate attributeName="ry" values="32;62" dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.55;0" dur="4.5s" begin={`${i * 1.5}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </svg>
      )}
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, y: 36, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={$t("HireAspNetHero__t2", "/aspnet-podium.webp")}
            alt={$t("HireAspNetHero__t3", "Glass code symbol on a glowing podium")}
            width={762}
            height={328}
            sizes="(min-width: 640px) 540px, 94vw"
            priority
            className="h-full w-full select-none drop-shadow-[0_30px_34px_rgba(30,110,150,0.25)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature icons                                                      */
/* ------------------------------------------------------------------ */
const fi = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-[22px] w-[22px]" };

const FEATURES__cms = [
  { a: "Secure & Reliable", b: "Applications", icon: (<svg {...fi}><path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></svg>) },
  { a: "Scalable for", b: "Growth", icon: (<svg {...fi}><path d="M12 3c3.5 2 5 5.5 4.5 9.5L12 17l-4.5-4.5C7 8.5 8.5 5 12 3z" /><circle cx="12" cy="9.5" r="1.6" /><path d="M7.5 14.5L5 17l3-.5M16.5 14.5L19 17l-3-.5M10.5 19.5L12 22l1.5-2.5" /></svg>) },
  { a: "On-Time", b: "Delivery", icon: (<svg {...fi}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>) },
  { a: "Flexible", b: "Engagement", icon: (<svg {...fi}><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19.5c.3-3 2.7-4.8 5.5-4.8s5.2 1.8 5.5 4.8" /><circle cx="17" cy="9.5" r="2.4" /><path d="M16 14.8c2.4-.2 4.2 1.3 4.5 4" /></svg>) },
];

// deterministic sparkles (avoid hydration mismatch from Math.random)
const SPARKS = [
  { l: "4%", t: "72%", s: 3 }, { l: "9%", t: "82%", s: 2 }, { l: "16%", t: "66%", s: 2 }, { l: "22%", t: "88%", s: 3 },
  { l: "30%", t: "76%", s: 2 }, { l: "70%", t: "84%", s: 2 }, { l: "78%", t: "72%", s: 3 }, { l: "86%", t: "90%", s: 2 },
  { l: "93%", t: "78%", s: 3 }, { l: "62%", t: "92%", s: 2 }, { l: "38%", t: "94%", s: 2 }, { l: "12%", t: "52%", s: 2 },
];

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function HireAspNetHero() {
  const $t = useCmsText();
  const CARDS = useCmsData("HireAspNetHero__CARDS", CARDS__cms);
  const FEATURES = useCmsData("HireAspNetHero__FEATURES", FEATURES__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#eef3f9] pb-8 pt-9 sm:pt-11">
      {/* ------------------------- background (public/aspnet-bg.webp: ribbon "N" + light waves) ------------------------- */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={reduce ? { scale: 1 } : { scale: [1.06, 1, 1.06] }}
        transition={reduce ? { duration: 0 } : { duration: 26, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={$t("HireAspNetHero__t4", "/aspnet-bg.webp")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
          style={{ objectPosition: "left 30%" }}
        />
      </motion.div>
      {/* keeps the headline area bright and readable */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_52%_60%_at_50%_34%,rgba(255,255,255,0.72),rgba(255,255,255,0)_72%)]" />
      {/* light that sweeps over the ribbon */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-[16%] h-[46%] w-[26%] rounded-[50%] bg-[radial-gradient(ellipse,rgba(190,240,255,0.55),transparent_70%)] mix-blend-screen blur-2xl"
          animate={{ x: ["-10%", "70%", "-10%"], opacity: [0, 0.9, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* sparkles */}
      {SPARKS.map((p, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-[#7fd3dc]"
          style={{ left: p.l, top: p.t, width: p.s * 2, height: p.s * 2 }}
          animate={reduce ? undefined : { opacity: [0.15, 0.9, 0.15], y: [0, -6, 0] }}
          transition={{ duration: 3 + (i % 4) * 0.7, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}

      {/* ------------------------- content ------------------------- */}
      <Container className="relative z-10 max-w-[1400px]">
        {/* tech cards: thick 3D glass tiles, anchored to the container edge */}
        <div aria-hidden className="pointer-events-none absolute right-2 top-0 z-[2] hidden h-[520px] w-[200px] lg:block xl:right-6">
          {CARDS.map((c, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={c.pos}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: EASE }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, i % 2 ? 7 : -7, 0] }}
                transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <GlassTile tilt={c.tilt}>
                  <span className="flex flex-col items-center gap-2">
                    <span className="scale-[1.25]">{c.icon}</span>
                    <span className="mt-1 whitespace-pre-line text-[12px] font-semibold leading-tight" style={{ color: NAVY }}>
                      {c.label}
                    </span>
                  </span>
                </GlassTile>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <motion.div initial="hidden" animate="show" className="flex items-center gap-3">
            <motion.i variants={fadeUp} custom={0} aria-hidden className="h-px w-8 bg-[#0d8a91]/50 sm:w-14" />
            <motion.span variants={fadeUp} custom={0} className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.26em] sm:text-[12px]" style={{ color: NAVY }}>
              <span style={{ color: TEAL }} className="font-mono text-[13px] font-black tracking-tighter">
                &lt;/&gt;
              </span>
              {html($t("HireAspNetHero__t5", "ASP.NET Development"))}</motion.span>
            <motion.i variants={fadeUp} custom={0} aria-hidden className="h-px w-8 bg-[#0d8a91]/50 sm:w-14" />
          </motion.div>

          <h1 className={`text-h1 ${display.className} mt-5 font-extrabold tracking-[-0.02em]`} aria-label="Hire ASP.NET Developers">
            <motion.span initial="hidden" animate="show" className="block">
              {[
                { w: $t("HireAspNetHero__t6", "Hire"), c: NAVY },
                { w: $t("HireAspNetHero__t7", "ASP.NET"), c: "" },
                { w: $t("HireAspNetHero__t8", "Developers"), c: NAVY },
              ].map((x, i) => (
                <span key={x.w} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                  <motion.span variants={wordV} custom={i} className="block will-change-transform">
                    {x.c ? (
                      <span style={{ color: x.c }}>{x.w}</span>
                    ) : (
                      <span className="bg-[linear-gradient(100deg,#0b6f78_10%,#18a8ae_45%,#0d8a91_75%)] bg-[length:220%_100%] bg-clip-text text-transparent animate-[aspShine_6s_linear_infinite]">
                        {x.w}
                      </span>
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={5}
            className="text-body mt-5 max-w-[600px] text-slate-600"
          >
            {rich($t("HireAspNetHero__t9", "Skilled ASP.NET developers to build secure, scalable and high-performance web applications that drive your business forward."))}</motion.p>

          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={6} className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href={$t("HireAspNetHero__t10", "#aspnet-contact")}
              className="group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-lg px-7 text-[14px] font-semibold text-white shadow-[0_16px_30px_-12px_rgba(13,138,145,0.8)] transition-all hover:-translate-y-0.5 active:scale-95"
              style={{ background: "linear-gradient(180deg,#139aa1,#0c7f87)" }}
            >
              <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{html($t("HireAspNetHero__t11", "Hire ASP.NET Developers"))}</span>
              <svg viewBox="0 0 24 24" className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </Link>
            <Link
              href={$t("HireAspNetHero__t12", "/contact")}
              className="group inline-flex h-12 items-center gap-3 rounded-lg border bg-white/60 px-7 text-[14px] font-semibold backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white active:scale-95"
              style={{ borderColor: "#5fc0c4", color: TEAL }}
            >
              {$t("HireAspNetHero__t13", "Talk to an Expert")}<svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="4" y1="12" x2="20" y2="12" />
                <polyline points="14 6 20 12 14 18" />
              </svg>
            </Link>
          </motion.div>

          <motion.ul initial="hidden" animate="show" variants={fadeUp} custom={7} className="mt-7 flex flex-wrap items-center justify-center gap-y-4">
            {FEATURES.map((f, i) => (
              <li key={f.a} className={`group flex items-center gap-3 px-5 text-left ${i ? "sm:border-l sm:border-slate-300/60" : ""}`}>
                <motion.span
                  className="text-[#16264d] transition-colors duration-300 group-hover:text-[#0d8a91]"
                  animate={reduce ? undefined : { y: [0, -2, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {f.icon}
                </motion.span>
                <span className="text-[11px] leading-tight text-slate-600">
                  {f.a}
                  <br />
                  {f.b}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* podium */}
        <div className="relative mt-2 sm:mt-4">
          <Podium reduce={reduce} />
        </div>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={9}
          className="text-caption mt-1 flex items-center justify-center gap-3 text-slate-600"
        >
          <span aria-hidden className="hidden h-px w-20 bg-gradient-to-r from-transparent to-[#0d8a91]/50 sm:block" />
          <span className="flex gap-0.5 text-[11px]" style={{ color: TEAL }} aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span key={i} animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }} transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}>
                ★
              </motion.span>
            ))}
          </span>
          {rich($t("HireAspNetHero__t14", "Trusted by "))}<strong className="font-semibold" style={{ color: NAVY }}>{html($t("HireAspNetHero__t15", "200+"))}</strong> {rich($t("HireAspNetHero__t16", "Businesses Worldwide"))}<span aria-hidden className="hidden h-px w-20 bg-gradient-to-l from-transparent to-[#0d8a91]/50 sm:block" />
        </motion.p>
      </Container>

      <style>{`
        @keyframes aspShine { 0% { background-position: 0% 0; } 100% { background-position: -220% 0; } }
        @media (prefers-reduced-motion: reduce) { [class*="aspShine"] { animation: none !important; } }
      `}</style>
    </section>
  );
}
