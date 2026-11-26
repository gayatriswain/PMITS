"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck, Home, Mail, MessageSquareText, Phone, Rocket, Search } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#0f2333";
const TEAL = "#0d9488";
const DEEP = "#0b3b35";
const EASE = [0.22, 1, 0.36, 1] as const;

const STEP_ICONS = [Search, CalendarCheck, Rocket];

const steps__cms = [
  { title: "We review your details", text: "An expert looks at your goals and current setup." },
  { title: "We get in touch", text: "Expect a call or email from us within 24 hours." },
  { title: "You get a clear plan", text: "A tailored roadmap with next steps and timelines." },
];

// confetti pieces: [left %, delay s, colour, size px, rotation]
const CONFETTI: [number, number, string, number, number][] = [
  [8, 0, "#0d9488", 10, 20], [16, 0.4, "#f59e0b", 8, -30], [24, 0.15, "#14b8a6", 12, 60], [33, 0.7, "#6366f1", 7, -15],
  [42, 0.25, "#f43f5e", 9, 45], [51, 0.55, "#0d9488", 11, -50], [60, 0.1, "#f59e0b", 8, 30], [68, 0.8, "#14b8a6", 10, -20],
  [76, 0.35, "#6366f1", 9, 70], [84, 0.6, "#f43f5e", 7, -40], [92, 0.2, "#0d9488", 10, 15],
];

export type ThankYouContact = { phone?: string; email?: string };

/** Thank-you page shown after any website form: animated confirmation, next steps and useful links. */
export default function ThankYouHero({ contact = {} }: { contact?: ThankYouContact }) {
  const $t = useCmsText();
  const steps = useCmsData("ThankYouHero__steps", steps__cms);
  const reduce = !!useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f0fdfa_0%,#f8fafc_55%,#ffffff_100%)] py-16 sm:py-24">
      {/* soft glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#99f6e4]/30 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#c7d2fe]/30 blur-[110px]" />

      {/* confetti */}
      {!reduce && (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[70%]">
          {CONFETTI.map(([left, delay, color, size, rot], i) => (
            <motion.span
              key={i}
              className="absolute top-0 rounded-[2px]"
              style={{ left: `${left}%`, width: size, height: size * 0.45, background: color }}
              initial={{ y: -40, opacity: 0, rotate: 0 }}
              animate={{ y: [-40, 520], opacity: [0, 1, 1, 0], rotate: [0, rot * 6] }}
              transition={{ duration: 3.6, delay: 0.3 + delay, ease: "easeIn", repeat: 1, repeatDelay: 0.4 }}
            />
          ))}
        </div>
      )}

      <Container className="relative">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          {/* animated check */}
          <div className="relative grid h-32 w-32 place-items-center">
            {!reduce &&
              [0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-[#0d9488]/40"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.7], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, delay: 0.6 + k * 0.8, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
            <motion.div
              className="relative grid h-28 w-28 place-items-center rounded-full shadow-[0_20px_45px_-15px_rgba(13,148,136,0.7)]"
              style={{ backgroundImage: `linear-gradient(135deg, ${TEAL}, ${DEEP})` }}
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 15, delay: 0.1 }}
            >
              <svg viewBox="0 0 52 52" className="h-14 w-14" fill="none" aria-hidden>
                <motion.path
                  d="M14 27 L23 36 L39 18"
                  stroke="#fff"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
          </div>

          <motion.p
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#0d9488]/25 bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]"
            style={{ color: TEAL }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            <span className="h-2 w-2 rounded-full bg-[#0d9488]" />
            {$t("ThankYouHero__t1", "Request received")}
          </motion.p>
          <motion.h1
            className="text-h1 font-heading mt-5 font-bold leading-[1.08] tracking-[-0.025em]"
            style={{ color: NAVY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
          >
            {$t("ThankYouHero__t2", "Thank you!")}
            <span className="block bg-[linear-gradient(100deg,#0b6f78,#18a8ae_50%,#0d9488)] bg-clip-text text-transparent">
              {$t("ThankYouHero__t3", "We've got your message.")}
            </span>
          </motion.h1>
          <motion.p
            className="text-body mt-5 max-w-[560px] text-slate-600"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
          >
            {rich($t("ThankYouHero__t4", "Our team will review your details and get back to you within 24 hours. A copy of your request is on its way to your inbox."))}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
          >
            <Link
              href={$t("ThankYouHero__t5", "/")}
              className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(11,59,53,0.7)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: `linear-gradient(135deg, ${TEAL}, ${DEEP})` }}
            >
              <Home className="h-4 w-4" />
              {$t("ThankYouHero__t6", "Back to Home")}
            </Link>
            <Link
              href={$t("ThankYouHero__t7", "/blog")}
              className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[14px] font-semibold transition-colors hover:border-[#0d9488]/50"
              style={{ color: NAVY }}
            >
              {$t("ThankYouHero__t8", "Read Our Insights")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* what happens next */}
        <div className="mx-auto mt-14 max-w-[1000px]">
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>{$t("ThankYouHero__t9", "What happens next")}</p>
          <ol className="relative mt-6 grid gap-5 md:grid-cols-3">
            <span aria-hidden className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-[#0d9488]/25 md:block" />
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <motion.li
                  key={i}
                  className="relative rounded-2xl border border-white bg-white/90 p-6 text-center shadow-[0_18px_40px_-28px_rgba(15,35,51,0.45)] backdrop-blur"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.15, ease: EASE }}
                >
                  <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#e6f6f4]">
                    <Icon className="h-7 w-7" style={{ color: TEAL }} />
                    <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white text-[11px] font-bold shadow" style={{ color: TEAL }}>
                      {i + 1}
                    </span>
                  </span>
                  <h2 className="mt-4 text-[16px] font-bold" style={{ color: NAVY }}>{s.title}</h2>
                  <p className="text-caption mt-1.5 text-slate-500">{s.text}</p>
                </motion.li>
              );
            })}
          </ol>
        </div>

        {/* urgent contact */}
        {(contact.phone || contact.email) && (
          <motion.div
            className="mx-auto mt-10 flex max-w-[1000px] flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 text-white sm:flex-row"
            style={{ backgroundImage: `linear-gradient(110deg, ${DEEP}, #0f5c56)` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6, ease: EASE }}
          >
            <p className="flex items-center gap-3 text-[15px] font-semibold">
              <MessageSquareText className="h-6 w-6 text-[#5eead4]" />
              {$t("ThankYouHero__t10", "Need something urgent? Talk to us right away.")}
            </p>
            <div className="flex flex-wrap gap-3">
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-medium transition-colors hover:bg-white/20">
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[14px] font-medium transition-colors hover:bg-white/20">
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
