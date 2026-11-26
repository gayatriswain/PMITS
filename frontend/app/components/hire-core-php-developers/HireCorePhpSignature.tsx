"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";

/* =========================================================================
   SCALE BOX: lays children out at a fixed design size and scales them to the available width
   ========================================================================= */

function ScaleBox({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / width));
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", visibility: scale ? "visible" : "hidden" }}>
        {children}
      </div>
    </div>
  );
}

const Icon = ({ children, className = "w-5 h-5" }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const arrow = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const steps__cms = [
  {
    n: "01",
    title: "BUILD",
    desc: "Clean. Scalable. Future-ready code.",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
    x: 468,
    y: 238,
  },
  {
    n: "02",
    title: "TEST",
    desc: "Rigorous testing for performance & security.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.500 12.500 2.500 2.500 4.500-5" />
      </>
    ),
    x: 451,
    y: 349,
  },
  {
    n: "03",
    title: "DEPLOY",
    desc: "Smooth deployment. Continuous support.",
    icon: (
      <>
        <path d="M4.500 16.500c-1.500 1.260-2 5-2 5s3.740-.5 5-2c.710-.840.700-2.130-.090-2.910a2.180 2.180 0 0 0-2.910-.090z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.950A12.880 12.880 0 0 1 22 2c0 2.720-.780 7.500-6 11a22.350 22.350 0 0 1-4 2z" />
      </>
    ),
    x: 445,
    y: 456,
  },
];

const perks__cms = [
  {
    title: "Expert Guidance",
    desc: "Work with experienced PHP professionals.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3.500" />
        <path d="M3 20v-1a5 5 0 0 1 5-5h2" />
        <path d="m17 12 1.200 2.500 2.800.4-2 2 .5 2.800L17 18.300 14.500 19.700l.5-2.800-2-2 2.800-.4Z" />
      </>
    ),
  },
  {
    title: "Flexible Engagement",
    desc: "Choose the model that fits your project.",
    icon: (
      <>
        <path d="m12 3 8 4.500v9L12 21l-8-4.500v-9Z" />
        <path d="m4 7.500 8 4.500 8-4.500M12 12v9" />
      </>
    ),
  },
  {
    title: "Confidential Discussion",
    desc: "Your ideas are safe with us.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

/* syntax-coloured lines for the light editor */
const kw = "text-[#2d6cdf]";
const fn = "text-[#0f8a83]";
const vr = "text-[#7c3aed]";
const code: { t: React.ReactNode; indent: number }[] = [
  { t: <><span className={kw}>class</span> <span className="text-[#0c1e3d]">ProManage {"{"}</span></>, indent: 0 },
  { t: <><span className={kw}>public function</span> <span className={fn}>build</span><span className="text-[#0c1e3d]">(</span><span className={vr}>$solution</span><span className="text-[#0c1e3d]">) {"{"}</span></>, indent: 1 },
  { t: <><span className={vr}>$plan</span> <span className="text-[#0c1e3d]">=</span> <span className={kw}>new</span> <span className={fn}>Strategy</span><span className="text-[#0c1e3d]">();</span></>, indent: 2 },
  { t: <><span className={vr}>$code</span> <span className="text-[#0c1e3d]">=</span> <span className={kw}>new</span> <span className={fn}>Solution</span><span className="text-[#0c1e3d]">();</span></>, indent: 2 },
  { t: <><span className={vr}>$result</span> <span className="text-[#0c1e3d]">=</span> <span className={vr}>$code</span><span className="text-[#0c1e3d]">-&gt;</span><span className={fn}>deliver</span><span className="text-[#0c1e3d]">();</span></>, indent: 2 },
  { t: <><span className={kw}>return</span> <span className={vr}>$result</span><span className="text-[#0c1e3d]">-&gt;</span><span className={fn}>success</span><span className="text-[#0c1e3d]">();</span></>, indent: 2 },
  { t: <span className="text-[#0c1e3d]">{"}"}</span>, indent: 1 },
  { t: <span className="text-[#0c1e3d]">{"}"}</span>, indent: 0 },
  { t: <>&nbsp;</>, indent: 0 },
  { t: <span className={kw}>?&gt;</span>, indent: 0 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Light glass editor window: teal disc and frosted slab sit behind it, php tile in front */
function LightCodeWindow({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <div className={`relative ${className}`} style={{ perspective: 1200 }}>
      {/* thin rings top-left, teal disc top-right, both behind the window */}
      <div className="absolute -left-[70px] -top-[50px] w-[300px] h-[300px] rounded-full border border-sky-100" />
      <div className="absolute -left-[40px] -top-[30px] w-[340px] h-[340px] rounded-full border border-sky-100/70" />
      <motion.div
        className="absolute -right-[110px] -top-[34px] w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#2bb3a6_0%,#17909a_50%,#1c86b0_100%)]"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
      />

      <div className="relative" style={{ transform: "rotateY(14deg) rotateX(2deg) rotateZ(-3deg)" }}>
        {/* frosted slab behind the window */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/80 bg-[linear-gradient(150deg,rgba(255,255,255,0.7),rgba(186,230,253,0.5))] backdrop-blur shadow-[0_20px_36px_-16px_rgba(60,140,200,0.5)]"
          initial={{ opacity: 0, x: 0, y: 0 }}
          whileInView={{ opacity: 1, x: 22, y: 16 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        />

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
        >
          <motion.div
            className="relative rounded-2xl bg-white border border-slate-100 shadow-[5px_7px_0_#d6e9f7,10px_14px_0_#bcdcf0,0_44px_60px_-24px_rgba(15,35,80,0.5)] overflow-hidden"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
          >
            {/* title bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[linear-gradient(90deg,#0a1f3d,#0d2b4d)]">
              <div className="flex gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[13px] font-semibold text-[#2dd4bf]">{$t("HireCorePhpSignature__t1", "<?php")}</span>
            </div>

            {/* code */}
            <div className="px-5 py-5 font-mono text-[12.5px] leading-[2.05]">
              {code.map((l, i) => (
                <motion.div
                  key={i}
                  className="flex"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.2 + i * 0.16 }}
                >
                  <span className="w-8 shrink-0 text-slate-300 select-none">{i + 1}</span>
                  <span style={{ paddingLeft: l.indent * 22 }} className="whitespace-nowrap">
                    {l.t}
                    {i === code.length - 1 && (
                      <motion.span className="inline-block w-[6px] h-[13px] ml-1 align-middle bg-[#0f8a83]" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                    )}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* php tile in front */}
        <motion.div
          className="absolute -right-[26px] -bottom-[34px]"
          initial={{ opacity: 0, y: 26, scale: 0.6 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            className="relative w-[128px] h-[100px] rounded-3xl bg-[linear-gradient(145deg,#ffffff,#e3effc)] border border-white shadow-[0_7px_0_#cfe0f7,0_14px_0_#b6cdf0,0_34px_44px_-14px_rgba(60,100,190,0.55),inset_0_-8px_14px_rgba(160,190,240,0.35)] flex items-center justify-center text-[#3f5fc4] text-[44px] font-black italic tracking-tight"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
          >
            php
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function CtaCard({ className = "" }: { className?: string }) {
  const $t = useCmsText();
  return (
    <div className={`rounded-2xl bg-white border border-slate-100 shadow-[0_22px_44px_-22px_rgba(15,35,80,0.28)] px-7 py-6 text-center ${className}`}>
      <div className="text-[20px] font-extrabold text-[#0c1e3d]">{$t("HireCorePhpSignature__t2", "Let's Build What's Next.")}</div>
      <Link
        href={$t("HireCorePhpSignature__t3", "#contact")}
        className="group mt-4 flex items-center justify-center gap-3 h-[46px] rounded-lg bg-[linear-gradient(90deg,#0f8a99,#1aa6a6)] text-white text-[13.5px] font-semibold shadow-[0_12px_24px_-10px_rgba(26,166,166,0.8)] hover:brightness-110 transition"
      >
        {$t("HireCorePhpSignature__t4", "Talk to a Core PHP Expert")}{arrow}
      </Link>
      <Link href={$t("HireCorePhpSignature__t5", "#what-you-can-build")} className="group mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0c1e3d] hover:text-[#0f8a83] transition-colors">
        {$t("HireCorePhpSignature__t6", "Explore Our Expertise")}<span className="text-[#0f8a83]">{arrow}</span>
      </Link>
    </div>
  );
}

function PerksBar({ className = "" }: { className?: string }) {
  const perks = useCmsData("HireCorePhpSignature__perks", perks__cms);
  return (
    <motion.div
      className={`rounded-3xl bg-white border border-slate-100 shadow-[0_22px_44px_-22px_rgba(15,35,80,0.25)] px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 sm:divide-x divide-slate-100 items-center ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {perks.map((p) => (
        <div key={p.title} className="flex items-center gap-4 sm:px-6 first:sm:pl-0">
          <span className="w-12 h-12 rounded-full bg-[#e8f4f6] text-[#0f7f8f] flex items-center justify-center shrink-0 [&_svg]:w-6 [&_svg]:h-6">
            <Icon>{p.icon}</Icon>
          </span>
          <div className="text-left">
            <div className="text-[14px] font-bold text-[#0c1e3d]">{p.title}</div>
            <div className="mt-1 text-[12px] text-slate-500 leading-snug">{p.desc}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function HireCorePhpSignature() {
  const $t = useCmsText();
  const steps = useCmsData("HireCorePhpSignature__steps", steps__cms);
  const subtitle = (
    <>
      {$t("HireCorePhpSignature__t7", "Core PHP expertise for businesses")}<br />
      {$t("HireCorePhpSignature__t8", "that need technology to work harder.")}</>
  );

  return (
    <section id="signature" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8fc_55%,#eef4fa_100%)] pt-10 sm:pt-14 pb-12 sm:pb-16">
      <Container className="relative z-10 max-w-[1320px] w-full">
        {/* ======================= DESKTOP: fixed 1100 x 690 canvas, scaled ======================= */}
        <div className="hidden lg:block">
          <ScaleBox width={1100} height={690}>
            <div className="relative w-[1100px] h-[690px]">
              {/* Header */}
              <motion.div
                className="absolute left-[50px] top-[34px]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-[12px] font-bold tracking-[0.22em] text-[#0f6f8f] uppercase">{$t("HireCorePhpSignature__t9", "The ProManage Signature")}</div>
                <div className="mt-3 w-9 h-[2px] rounded-full bg-[#0f8a83]" />
              </motion.div>
              <motion.h2
                className="absolute left-[50px] top-[92px] text-[46px] font-black tracking-tight leading-[1.1] whitespace-nowrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="text-[#0c1e3d]">{$t("HireCorePhpSignature__t10", "BUILT TO MOVE")}</span>
                <br />
                <span className="bg-gradient-to-r from-[#0f6f8f] to-[#1aa6a6] bg-clip-text text-transparent">{$t("HireCorePhpSignature__t11", "BUSINESS FORWARD.")}</span>
              </motion.h2>
              <motion.p
                className="absolute left-[50px] top-[206px] text-[15px] leading-[1.55] text-slate-600"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>

              <motion.div
                className="absolute left-[50px] top-[302px] w-[310px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <CtaCard />
              </motion.div>

              {/* Connectors between the step icons (icon column only, clear of the text) */}
              <svg className="absolute inset-0 w-[1100px] h-[690px] pointer-events-none" viewBox="0 0 1100 690" fill="none">
                {[
                  "M 468 268 C 456 284, 452 300, 451 317",
                  "M 451 379 C 448 395, 446 410, 445 425",
                ].map((d, i) => (
                  <g key={d}>
                    <motion.path
                      d={d}
                      stroke="#1aa6a6"
                      strokeOpacity="0.7"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 0.8 + i * 0.3, ease: "easeOut" }}
                    />
                  </g>
                ))}
                <circle cx="468" cy="268" r="3" fill="#1aa6a6" />
                <circle cx="451" cy="317" r="3" fill="#1aa6a6" />
                <circle cx="451" cy="379" r="3" fill="#1aa6a6" />
                <circle cx="445" cy="425" r="3" fill="#1aa6a6" />
              </svg>

              {/* Steps */}
              {steps.map((st, i) => (
                <motion.div
                  key={st.n}
                  className="absolute flex items-center gap-4"
                  style={{ left: st.x - 30, top: st.y - 30 }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.25 }}
                >
                  <motion.span
                    className="w-[60px] h-[60px] rounded-full bg-white border border-white shadow-[0_14px_26px_-10px_rgba(15,35,80,0.3),inset_0_0_0_3px_rgba(224,242,254,0.9)] text-[#0f7f8f] flex items-center justify-center shrink-0 [&_svg]:w-6 [&_svg]:h-6"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.6 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <Icon>{st.icon}</Icon>
                  </motion.span>
                  <div className="text-left w-[120px]">
                    <div className="text-[11px] font-bold text-[#0f8a83]">{st.n}</div>
                    <div className="text-[14px] font-extrabold tracking-[0.04em] text-[#0c1e3d] leading-tight">{st.title}</div>
                    <div className="mt-1 text-[10.5px] text-slate-500 leading-snug">{st.desc}</div>
                  </div>
                </motion.div>
              ))}

              <LightCodeWindow className="absolute left-[660px] top-[78px] w-[370px]" />

              <PerksBar className="absolute left-[99px] top-[560px] w-[874px]" />
            </div>
          </ScaleBox>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="lg:hidden">
          <div className="text-[11.5px] font-bold tracking-[0.22em] text-[#0f6f8f] uppercase">{$t("HireCorePhpSignature__t12", "The ProManage Signature")}</div>
          <div className="mt-3 w-9 h-[2px] rounded-full bg-[#0f8a83]" />
          <h2 className="text-h2 mt-5 font-black tracking-tight">
            <span className="text-[#0c1e3d]">{$t("HireCorePhpSignature__t13", "BUILT TO MOVE")}</span>
            <br />
            <span className="text-[#0f6f8f]">{$t("HireCorePhpSignature__t14", "BUSINESS FORWARD.")}</span>
          </h2>
          <p className="text-body mt-4 text-slate-600">{subtitle}</p>

          <CtaCard className="mt-6 max-w-sm" />

          <div className="mt-8 space-y-5 max-w-md">
            {steps.map((st) => (
              <div key={st.n} className="flex items-center gap-4">
                <span className="w-14 h-14 rounded-full bg-white shadow-[0_12px_22px_-10px_rgba(15,35,80,0.3)] text-[#0f7f8f] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6">{st.icon}</Icon>
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[#0f8a83]">{st.n}</div>
                  <div className="text-[14px] font-extrabold text-[#0c1e3d]">{st.title}</div>
                  <div className="text-[12px] text-slate-500 leading-snug">{st.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 mr-6 sm:mr-12 sm:ml-6">
            <LightCodeWindow className="w-full max-w-[380px] mx-auto" />
          </div>

          <PerksBar className="mt-14" />
        </div>
      </Container>
    </section>
  );
}
