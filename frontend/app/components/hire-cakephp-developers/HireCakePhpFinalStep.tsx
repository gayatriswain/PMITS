"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const EASE = [0.22, 1, 0.36, 1] as const;
const RED = "#d92b32";
const INK = "#0f1a2e";
const PEDESTAL = "/cakephp-pedestal-clean.png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: EASE },
  }),
};

/* ------------------------------ action options ------------------------------ */
const ACTIONS__cms = [
  {
    id: "discuss",
    title: "Discuss My Idea",
    sub: "Talk to our CakePHP expert",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: "requirements",
    title: "Share Requirements",
    sub: "Upload your requirements",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: "call",
    title: "Schedule a Call",
    sub: "Pick a time that works for you",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    id: "guidance",
    title: "Need Guidance?",
    sub: "Our experts are here to help",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14v-2a8 8 0 0116 0v2" />
        <rect x="2" y="14" width="4" height="6" rx="2" />
        <rect x="18" y="14" width="4" height="6" rx="2" />
        <path d="M20 20v1a2 2 0 01-2 2h-4" />
      </svg>
    ),
  },
];

export default function HireCakePhpFinalStep() {
  const $t = useCmsText();
  const ACTIONS = useCmsData("HireCakePhpFinalStep__ACTIONS", ACTIONS__cms);
  const reduce = useReducedMotion();
  const [selectedAction, setSelectedAction] = useState<string>("discuss");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfe_100%)] py-16 sm:py-24">
      <Container className="relative max-w-[1240px]">
        {/* ------------------------------ TOP 3-COLUMN MAIN STAGE ------------------------------ */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1.15fr] xl:gap-12">
          {/* Col 1: Left Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col items-start"
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: RED }}>
                {$t("HireCakePhpFinalStep__t1", "FINAL STEP")}</span>
              <span className="h-[1.5px] w-7 opacity-60" style={{ background: RED }} />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-h2 mt-4 font-playfair font-bold tracking-tight"
              style={{ color: INK }}
            >
              {$t("HireCakePhpFinalStep__t2", "Ready to build")}<br />
              something
              <br />
              <span style={{ color: RED }}>{$t("HireCakePhpFinalStep__t3", "extraordinary?")}</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-small mt-4 max-w-[340px] text-slate-600"
            >
              {rich($t("HireCakePhpFinalStep__t4", "Share your idea with our CakePHP experts and let's turn it into a powerful solution."))}</motion.p>

            {/* Red swoosh scribble */}
            <motion.div variants={fadeUp} custom={3} className="mt-5 text-[#d92b32]">
              <svg
                viewBox="0 0 110 20"
                className="h-5 w-24 select-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M4 14c26-10 65-12 102-4-34 4-68 8-96 9 22-1 56-1 76-5" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Col 2: Center Pedestal with CakePHP & Orbit Badges */}
          <div className="relative mx-auto flex h-[360px] w-full max-w-[380px] items-center justify-center sm:h-[400px]">
            {/* SVG Orbit Ring and Connector */}
            <svg
              viewBox="0 0 380 400"
              className="pointer-events-none absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden
            >
              {/* Central faint dashed orbit */}
              <circle
                cx="190"
                cy="200"
                r="125"
                stroke="#f0d5d7"
                strokeWidth="1.2"
                strokeDasharray="3 6"
              />
              <circle
                cx="190"
                cy="200"
                r="150"
                stroke="#f9eaea"
                strokeWidth="0.8"
                strokeDasharray="2 6"
              />

              {/* Accent dots on the orbit */}
              <circle cx="102" cy="112" r="2.8" fill={RED} />
              <circle cx="278" cy="112" r="2.8" fill={RED} />
              <circle cx="152" cy="320" r="2.8" fill={RED} />
              <circle cx="292" cy="235" r="2.8" fill={RED} />

              {/* Red curved dashed connector arrow pointing from orbit to right card */}
              <path
                d="M 275 160 C 310 135, 345 145, 376 150"
                stroke="#d92b32"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                fill="none"
              />
              {/* Arrowhead */}
              <polygon points="378,150 371,146 371,154" fill="#d92b32" />
            </svg>

            {/* Central 3D Pedestal & Cake Logo */}
            <motion.div
              className="relative z-10 select-none"
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={PEDESTAL}
                  alt={$t("HireCakePhpFinalStep__t5", "CakePHP Architecture")}
                  width={210}
                  height={195}
                  sizes="210px"
                  className="relative h-auto w-[185px] select-none drop-shadow-[0_24px_34px_rgba(217,43,50,0.18)] sm:w-[205px]"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Badge 1: Top-Right "Secure by design" */}
            <motion.div
              className="absolute right-4 top-10 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2 shadow-[0_12px_26px_-8px_rgba(15,26,46,0.1)] ring-1 ring-slate-100"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#fdeeee] text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6L12 3z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-[11px] font-bold leading-tight" style={{ color: INK }}>{rich($t("HireCakePhpFinalStep__t6", "Secure"))}</p>
                <p className="text-[9.5px] leading-tight text-slate-500">{rich($t("HireCakePhpFinalStep__t7", "by design"))}</p>
              </div>
            </motion.div>

            {/* Badge 2: Mid-Left "Built for performance" */}
            <motion.div
              className="absolute -left-2 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center rounded-2xl bg-white px-3 py-2 text-center shadow-[0_12px_26px_-8px_rgba(15,26,46,0.1)] ring-1 ring-slate-100"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#fdeeee] text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-3.05 11a22 22 0 01-3.95 2L12 15z" />
                </svg>
              </span>
              <p className="mt-1 text-[10.5px] font-bold leading-tight" style={{ color: INK }}>{rich($t("HireCakePhpFinalStep__t8", "Built for"))}</p>
              <p className="text-[9.5px] leading-tight text-slate-500">performance</p>
            </motion.div>

            {/* Badge 3: Bottom-Right "Developed to scale" */}
            <motion.div
              className="absolute bottom-8 right-6 z-20 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2 shadow-[0_12px_26px_-8px_rgba(15,26,46,0.1)] ring-1 ring-slate-100"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#fdeeee] text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="14" width="4" height="7" rx="1" />
                  <rect x="10" y="8" width="4" height="13" rx="1" />
                  <rect x="17" y="3" width="4" height="18" rx="1" />
                </svg>
              </span>
              <div className="text-left">
                <p className="text-[11px] font-bold leading-tight" style={{ color: INK }}>{rich($t("HireCakePhpFinalStep__t9", "Developed"))}</p>
                <p className="text-[9.5px] leading-tight text-slate-500">{rich($t("HireCakePhpFinalStep__t10", "to scale"))}</p>
              </div>
            </motion.div>
          </div>

          {/* Col 3: Right Card "What would you like to do?" */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
            className="relative rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_24px_60px_-20px_rgba(15,26,46,0.08)] sm:p-7"
          >
            <h3 className="text-h5 font-playfair font-bold" style={{ color: INK }}>
              {$t("HireCakePhpFinalStep__t11", "What would ")}<span style={{ color: RED }}>you</span> {$t("HireCakePhpFinalStep__t12", "like to do?")}</h3>

            {/* 4 Action Cards */}
            <div className="mt-5 flex flex-col gap-3">
              {ACTIONS.map((act) => {
                const active = selectedAction === act.id;
                return (
                  <Link
                    key={act.id}
                    href={$t("HireCakePhpFinalStep__t13", "#cakephp-contact")}
                    onClick={() => setSelectedAction(act.id)}
                    className={`group flex items-center justify-between rounded-2xl border p-3.5 transition-all duration-300 ${
                      active
                        ? "border-[#f8c9cb] bg-[#fffbfb] shadow-[0_8px_20px_-6px_rgba(217,43,50,0.14)] ring-1 ring-[#f8c9cb]"
                        : "border-slate-100 bg-white hover:border-[#f8c9cb] hover:bg-[#fffbfb] hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
                          active
                            ? "bg-[#fdeeee] text-[#d92b32]"
                            : "bg-slate-50 text-slate-500 group-hover:bg-[#fdeeee] group-hover:text-[#d92b32]"
                        }`}
                      >
                        {act.icon}
                      </span>
                      <div className="text-left">
                        <p className="text-small font-bold" style={{ color: INK }}>
                          {act.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-tight text-slate-500">
                          {act.sub}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[13px] transition-transform duration-300 group-hover:translate-x-1 ${
                        active ? "text-[#d92b32]" : "text-slate-400 group-hover:text-[#d92b32]"
                      }`}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Security Guarantee Note */}
            <div className="mt-4 flex items-center justify-center gap-1.5 pt-1 text-[11px] font-medium text-slate-400">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <span>{$t("HireCakePhpFinalStep__t14", "No spam. Just real conversations.")}</span>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------ BOTTOM CAPSULE BANNER ------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-slate-100 bg-white p-4 px-6 shadow-[0_16px_40px_-20px_rgba(0,0,0,0.06)] md:flex-row md:rounded-full lg:px-9"
        >
          {/* Left: Red Plane Button + Dashed Loop Trail + Text */}
          <div className="flex items-center gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#d92b32] text-white shadow-[0_8px_18px_-4px_rgba(217,43,50,0.55)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" />
              </svg>
            </span>

            {/* Loop trail SVG */}
            <svg viewBox="0 0 50 24" className="hidden h-6 w-12 text-[#e3a3a6] md:block" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.5 3.5">
              <path d="M 4 12 C 16 2, 28 22, 46 12" />
            </svg>

            <div>
              <p className="text-body font-playfair font-bold" style={{ color: INK }}>
                {rich($t("HireCakePhpFinalStep__t15", "Let's build it "))}<span style={{ color: RED }}>{$t("HireCakePhpFinalStep__t16", "the right way.")}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {rich($t("HireCakePhpFinalStep__t17", "Simple conversation. Real solutions."))}</p>
            </div>
          </div>

          {/* Vertical Divider */}
          <span aria-hidden className="hidden h-10 w-px bg-slate-200 md:block" />

          {/* Right: Avatars + Safe Note + Pulsing Heart */}
          <div className="flex items-center gap-5">
            {/* Team Avatars */}
            <div className="flex items-center -space-x-2">
              <Image
                src={$t("HireCakePhpFinalStep__t18", "/customer-avatar.jpg")}
                alt={$t("HireCakePhpFinalStep__t19", "ProManage Team Member")}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <Image
                src={$t("HireCakePhpFinalStep__t20", "/ravi-sharma-avatar.jpg")}
                alt={$t("HireCakePhpFinalStep__t21", "ProManage CakePHP Specialist")}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
              <Image
                src={$t("HireCakePhpFinalStep__t22", "/agent-live-avatar.png")}
                alt={$t("HireCakePhpFinalStep__t23", "ProManage Technical Lead")}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm"
              />
            </div>

            <p className="text-caption font-medium text-slate-600">
              {rich($t("HireCakePhpFinalStep__t24", "Your idea is safe"))}<br className="hidden sm:inline" /> {rich($t("HireCakePhpFinalStep__t25", "with us."))}</p>

            {/* Red Heart with subtle ripple ring */}
            <div className="relative grid h-9 w-9 place-items-center">
              <span className="absolute inset-0 rounded-full border border-red-300/60 opacity-60 animate-ping" />
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fdeeee] text-[#d92b32]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
