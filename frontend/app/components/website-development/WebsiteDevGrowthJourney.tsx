"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";

const NAVY = "#132a43";
const TEAL = "#1b8a80";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/* Feature strip                                                       */
/* ------------------------------------------------------------------ */

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: TEAL,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES = [
  {
    title: "Right Strategy",
    text: "A website built around your business goals.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12 L20 4 M17 4 H20 V7" />
      </svg>
    ),
  },
  {
    title: "Better Experience",
    text: "Happy users who stay longer and engage more.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21 C4 16 8 14 12 14 C16 14 20 16 20 21" />
      </svg>
    ),
  },
  {
    title: "More Conversions",
    text: "Designed to turn visitors into loyal customers.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20 V14 M9 20 V11 M14 20 V13 M19 20 V8" />
        <path d="M4 10 L9 6 L14 8 L20 3 M16 3 H20 V7" />
      </svg>
    ),
  },
  {
    title: "Future Ready",
    text: "Secure, scalable and easy to grow with your business.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 L20 6 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V6 Z" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" />
      </svg>
    ),
  },
  {
    title: "Measurable Growth",
    text: "Data-driven improvements that deliver real results.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 3 V21 H21" />
        <path d="M7 16 L11 11 L14 14 L20 6 M16 6 H20 V10" />
      </svg>
    ),
  },
];

export default function WebsiteDevGrowthJourney() {
  return (
    <section className="relative w-full bg-[#F5F7F8] pt-6 pb-14 lg:pt-8 lg:pb-20 overflow-hidden">
      <Container>
        {/* Feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="bg-white rounded-2xl shadow-[0_10px_30px_-15px_rgba(15,40,60,0.15)] border border-slate-100 p-5 lg:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))_minmax(0,1.15fr)] gap-5 lg:gap-0 items-center"
        >
          {FEATURES.map((f) => (
            <div key={f.title} className="flex items-start gap-3 lg:px-4 lg:border-r border-slate-100">
              <span className="shrink-0 w-11 h-11 rounded-full bg-[#F1F4F6] flex items-center justify-center">{f.icon}</span>
              <div>
                <h3 className="text-[13px] font-bold mb-1" style={{ color: NAVY }}>{f.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-1 lg:ml-4 rounded-xl bg-[#F1F4F6] p-4">
            <span className="block font-serif text-2xl leading-none mb-1" style={{ color: TEAL }}>&ldquo;</span>
            <p className="text-[12px] text-slate-600 leading-relaxed">
              We build websites that don&apos;t just look good — they grow your business.
            </p>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
