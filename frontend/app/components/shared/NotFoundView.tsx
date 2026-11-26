"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Code2, Home, Megaphone, MessageSquareText, Search, Smartphone } from "lucide-react";
import Container from "./Container";

const NAVY = "#0f2333";
const TEAL = "#0d9488";
const DEEP = "#0b3b35";
const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { label: "Website Development", href: "/web-software/website-development", icon: Code2 },
  { label: "App Development", href: "/web-software/app-development", icon: Smartphone },
  { label: "SEO Services", href: "/seo", icon: Search },
  { label: "Digital Marketing", href: "/marketing-growth/google-ads", icon: Megaphone },
];

/** Animated 404 in the site's style: floating digits, orbiting dots and helpful links. */
export default function NotFoundView() {
  const reduce = !!useReducedMotion();
  const float = (d: number, delay: number) => (reduce ? {} : { animate: { y: [0, -d, 0] }, transition: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" as const } });

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f0fdfa_0%,#f8fafc_60%,#ffffff_100%)] py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#99f6e4]/30 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#c7d2fe]/30 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.06]" />

      <Container className="relative">
        <div className="mx-auto flex max-w-[780px] flex-col items-center text-center">
          {/* 404 with an orbit */}
          <div className="relative flex items-center justify-center">
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-[#0d9488]/30 sm:h-[340px] sm:w-[340px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#0d9488] shadow-[0_0_12px_rgba(13,148,136,0.8)]" />
                <span className="absolute -bottom-1 left-[20%] h-2 w-2 rounded-full bg-[#6366f1]" />
                <span className="absolute right-[6%] top-[30%] h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
              </motion.div>
            )}
            <div className="relative flex items-end font-heading text-[clamp(110px,20vw,200px)] font-extrabold leading-none tracking-[-0.06em]">
              <motion.span style={{ color: NAVY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <motion.span className="inline-block" {...float(10, 0)}>4</motion.span>
              </motion.span>
              <motion.span initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}>
                <motion.span
                  className="inline-block bg-[linear-gradient(135deg,#0d9488,#0b3b35)] bg-clip-text text-transparent"
                  {...(reduce ? {} : { animate: { rotate: [0, 8, -8, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } })}
                >
                  0
                </motion.span>
              </motion.span>
              <motion.span style={{ color: NAVY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
                <motion.span className="inline-block" {...float(10, 0.6)}>4</motion.span>
              </motion.span>
            </div>
          </div>

          <motion.p
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0d9488]/25 bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]"
            style={{ color: TEAL }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          >
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            Page not found
          </motion.p>
          <motion.h1
            className="text-h2 font-heading mt-4 font-bold tracking-[-0.02em]"
            style={{ color: NAVY }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            Looks like this page took a <span style={{ color: TEAL }}>wrong turn.</span>
          </motion.h1>
          <motion.p
            className="text-body mt-4 max-w-[520px] text-slate-600"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          >
            The page you&apos;re looking for may have moved or no longer exists. Let&apos;s get you back on track.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_14px_28px_-12px_rgba(11,59,53,0.7)] transition-transform hover:-translate-y-0.5"
              style={{ backgroundImage: `linear-gradient(135deg, ${TEAL}, ${DEEP})` }}
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-[14px] font-semibold transition-colors hover:border-[#0d9488]/50"
              style={{ color: NAVY }}
            >
              <MessageSquareText className="h-4 w-4" style={{ color: TEAL }} />
              Contact Us
            </Link>
            <button
              type="button"
              onClick={() => history.back()}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold text-slate-600 transition-colors hover:text-[#0d9488]"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </motion.div>
        </div>

        {/* popular pages */}
        <div className="mx-auto mt-14 max-w-[1000px]">
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>Popular pages</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((l, i) => (
              <motion.li key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: EASE }}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-3 rounded-2xl border border-white bg-white/90 p-4 shadow-[0_16px_36px_-26px_rgba(15,35,51,0.45)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(13,148,136,0.45)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#e6f6f4] transition-colors group-hover:bg-[#0d9488]">
                    <l.icon className="h-5 w-5 text-[#0d9488] transition-colors group-hover:text-white" />
                  </span>
                  <span className="flex-1 text-[14px] font-semibold" style={{ color: NAVY }}>{l.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#0d9488]" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
