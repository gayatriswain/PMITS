"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
};

const icons = {
  training: (
    <svg {...ICON_PROPS}>
      <path d="M2 9l10-5 10 5-10 5L2 9z" />
      <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
      <path d="M22 9v6" />
    </svg>
  ),
  product: (
    <svg {...ICON_PROPS}>
      <path d="M12 2.5l8.5 4.7v9.6L12 21.5l-8.5-4.7V7.2L12 2.5z" />
      <path d="M3.5 7.2L12 12l8.5-4.8M12 12v9.5" />
    </svg>
  ),
  architecture: (
    <svg {...ICON_PROPS}>
      <rect x="4" y="3" width="10" height="18" rx="1" />
      <path d="M14 9h6v12h-6M8 7h2M8 11h2M8 15h2" />
    </svg>
  ),
  ar: (
    <svg {...ICON_PROPS}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
  users: (
    <svg {...ICON_PROPS}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
    </svg>
  ),
  smile: (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14c.9 1.3 2 2 3.5 2s2.6-.7 3.5-2M9 9.5h0M15 9.5h0" />
    </svg>
  ),
  bolt: (
    <svg {...ICON_PROPS}>
      <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
    </svg>
  ),
};

type CardData = {
  icon: React.ReactNode;
  title: string;
  text: string;
  side: "left" | "right";
  delay: number;
};

const CARDS__cms: CardData[] = [
  {
    icon: icons.training,
    title: "Virtual Training",
    text: "Realistic simulations that improve learning outcomes and reduce training costs.",
    side: "left",
    delay: 0.15,
  },
  {
    icon: icons.product,
    title: "Product Visualization",
    text: "Photorealistic 3D & VR experiences that help customers see, customize and decide with confidence.",
    side: "left",
    delay: 0.3,
  },
  {
    icon: icons.architecture,
    title: "Architectural Visualization",
    text: "Walk through future spaces before they are built. Experience scale, design and detail like never before.",
    side: "right",
    delay: 0.2,
  },
  {
    icon: icons.ar,
    title: "AR Experiences",
    text: "Augmented experiences that blend digital content with the real world to engage and inform.",
    side: "right",
    delay: 0.35,
  },
];

const STATS__cms = [
  { icon: icons.users, value: 50, suffix: "K+", label: "Training Hours Delivered" },
  { icon: icons.product, value: 100, suffix: "+", label: "Projects Completed" },
  { icon: icons.smile, value: 1, suffix: "K+", label: "Happy Clients" },
  { icon: icons.bolt, value: 10, suffix: "+", label: "Industries Served" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 * i, ease: EASE },
  }),
};

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function SolutionCard({ icon, title, text, side, delay }: CardData) {
  const $t = useCmsText();
  const left = side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: left ? -60 : 60, scale: 0.96 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className="relative w-full"
    >
      {/* Point on the inner edge of the card, in the gap next to the artwork (desktop only) */}
      <span
        aria-hidden
        className={`pointer-events-none absolute top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 lg:flex ${
          left ? "-right-[26px]" : "-left-[26px]"
        }`}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7c6af6] opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#6d5ef5]" />
      </span>

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-start gap-3.5 rounded-2xl border border-white bg-white/90 p-4 lg:p-4 shadow-[0_18px_40px_-18px_rgba(79,70,229,0.35)] backdrop-blur"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white shadow-[0_8px_18px_-6px_rgba(91,67,232,0.6)]">
          {icon}
        </span>
        <div>
          <h3 className="text-[15px] font-bold leading-tight text-[#0f1535]">{title}</h3>
          <p className="text-caption mt-1.5 text-slate-500">{text}</p>
          <Link
            href={$t("ArVrSolutions__t1", "#contact-form")}
            className="group mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5b43e8] hover:text-[#4a35cc]"
          >
            {$t("ArVrSolutions__t2", "Explore")}<span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ArVrSolutions() {
  const $t = useCmsText();
  const CARDS = useCmsData("ArVrSolutions__CARDS", CARDS__cms);
  const STATS = useCmsData("ArVrSolutions__STATS", STATS__cms);
  return (
    <section
      id="solutions"
      className="relative w-full overflow-x-clip bg-gradient-to-b from-[#f4f5ff] via-white to-[#f4f5ff] pb-16 pt-14 sm:pt-20 lg:pb-24"
    >
      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="block text-[11px] font-bold uppercase tracking-[0.28em] text-[#6d5ef5]"
          >
            {$t("ArVrSolutions__t3", "What can we build for you?")}</motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-h2 mt-3 font-black tracking-tight text-[#0f1535]"
          >
            {$t("ArVrSolutions__t4", "Immersive Solutions.")}<br />
            {$t("ArVrSolutions__t5", "Real-World")}{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent">
              {$t("ArVrSolutions__t6", "Impact.")}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-body mx-auto mt-4 max-w-2xl text-slate-600"
          >
            {rich($t("ArVrSolutions__t7", "We design and develop custom AR/VR experiences that solve real challenges, drive engagement, and deliver measurable results."))}</motion.p>
          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href={$t("ArVrSolutions__t8", "#contact-form")}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#5b43e8] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-4px_rgba(91,67,232,0.45)] transition-colors duration-200 hover:bg-[#4a35cc] sm:px-7"
            >
              <span>{$t("ArVrSolutions__t9", "Explore All Solutions")}</span>
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={$t("ArVrSolutions__t10", "#showreel")}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d9d9f5] bg-white px-6 py-2.5 text-sm font-semibold text-[#0f1535] transition-colors duration-200 hover:border-[#5b43e8] hover:text-[#5b43e8] sm:px-7"
            >
              <span aria-hidden className="text-[#5b43e8]">▶</span>
              <span>{$t("ArVrSolutions__t11", "Watch Showreel")}</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stage: cards on both sides, artwork in the middle - nothing sits on top of the image */}
        <div className="mt-10 grid grid-cols-1 items-center gap-6 lg:mt-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,300px)] lg:gap-10">
          <div className="order-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:order-1 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-8">
            {CARDS.filter((c) => c.side === "left").map((c) => (
              <SolutionCard key={c.title} {...c} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.3, ease: EASE }}
            className="order-1 lg:order-2"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src={$t("ArVrSolutions__t12", "/ARVR2.png")}
                alt={$t("ArVrSolutions__t13", "Immersive futuristic world with a portal on a floating platform")}
                width={1779}
                height={884}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full select-none"
              />
            </motion.div>
          </motion.div>

          <div className="order-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-8">
            {CARDS.filter((c) => c.side === "right").map((c) => (
              <SolutionCard key={c.title} {...c} />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-y-6 rounded-3xl border border-white bg-white/95 px-4 py-6 shadow-[0_24px_50px_-20px_rgba(79,70,229,0.4)] sm:grid-cols-4 lg:mt-12 lg:px-8"
        >
          {STATS.map((st, i) => (
            <div
              key={st.label}
              className={`flex items-center gap-3 px-3 sm:px-4 ${
                i > 0 ? "sm:border-l sm:border-slate-200" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white">
                {st.icon}
              </span>
              <div>
                <div className="text-xl font-extrabold leading-none text-[#0f1535] sm:text-2xl">
                  <CountUp value={st.value} suffix={st.suffix} />
                </div>
                <div className="mt-1 text-[11px] leading-tight text-slate-500 sm:text-xs">
                  {st.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
