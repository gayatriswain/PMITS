"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, type Variants } from "framer-motion";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.1 * i, ease: EASE },
  }),
};

const I = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Artwork shown under each step. For now every step uses the same image; swap a step's
// `image` for its own file in /public when it is ready.
const STEP_IMAGE = "/Futuristic VR Sketchbook on Holographic Platform.webp";

type Step = {
  title: string;
  text: string;
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    title: "Discover",
    text: "We dive deep into your goals, audience, and challenges to define the right experience.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5L21 21M8 10.5h5M10.5 8v5" />
      </svg>
    ),
    image: STEP_IMAGE,
    imageAlt: "Sketchbook with VR concept drawings floating above a holographic platform",
  },
  {
    title: "Design",
    text: "We craft immersive concepts, interactions, and visual experiences that inspire.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M12 3l2.2 5.2L19.5 9l-4 3.7 1 5.3L12 15.2 7.5 18l1-5.3-4-3.7 5.3-.8L12 3z" />
      </svg>
    ),
    image: STEP_IMAGE,
    imageAlt: "Design screens on a holographic platform",
  },
  {
    title: "Develop",
    text: "We build high-performance AR/VR solutions using the latest technologies.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" />
      </svg>
    ),
    image: STEP_IMAGE,
    imageAlt: "Code editor on a holographic platform",
  },
  {
    title: "Deploy",
    text: "We launch and integrate seamlessly across platforms for maximum impact.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M14 4c3.5 0 6 2.5 6 6-3 1-5 3-6 6l-4-4c3-1 5-3 6-6" />
        <path d="M10 12l-4 1-2 3 4 1M12 14l-1 4-3 2-1-4M15 8.5h.01" />
      </svg>
    ),
    image: STEP_IMAGE,
    imageAlt: "Cloud launch on a holographic platform",
  },
  {
    title: "Optimize",
    text: "We analyze, iterate, and optimize to ensure continuous engagement and growth.",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M4 20V11M10 20V5M16 20v-7M22 20H2" />
      </svg>
    ),
    image: STEP_IMAGE,
    imageAlt: "Performance dashboard on a holographic platform",
  },
];

const STATS = [
  {
    value: 50,
    suffix: "K+",
    label: "Training Hours Delivered",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
      </svg>
    ),
  },
  {
    value: 100,
    suffix: "+",
    label: "Projects Completed",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M12 2.5l8.5 4.7v9.6L12 21.5l-8.5-4.7V7.2L12 2.5z" />
        <path d="M3.5 7.2L12 12l8.5-4.8M12 12v9.5" />
      </svg>
    ),
  },
  {
    value: 1,
    suffix: "K+",
    label: "Happy Clients",
    icon: (
      <svg {...I} className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <path d="M8.5 14c.9 1.3 2 2 3.5 2s2.6-.7 3.5-2M9 9.5h0M15 9.5h0" />
      </svg>
    ),
  },
  {
    value: 10,
    suffix: "+",
    label: "Industries Served",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" />
      </svg>
    ),
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction Rate",
    icon: (
      <svg {...I} className="h-6 w-6">
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
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

/* Connector from this step's node to the next one (desktop only). `dy` is how much lower
 * (+) or higher (-) the next node sits, so the line always lands on its centre. */
const SEG_COLORS: [string, string][] = [
  ["#8b7cf6", "#6d4df0"],
  ["#6d4df0", "#8b7cf6"],
  ["#7c5cf6", "#5b43e8"],
  ["#5b9bf6", "#7c5cf6"],
];

function Segment({ index, dy }: { index: number; dy: number }) {
  const [c1, c2] = SEG_COLORS[index] ?? SEG_COLORS[0];
  const id = `approach-seg-${index}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 80"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-1/2 top-1/2 hidden h-20 w-full -translate-y-1/2 overflow-visible lg:block"
      style={{ top: "calc(50% + 0px)" }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={c1} stopOpacity="0.15" />
          <stop offset="0.45" stopColor={c1} />
          <stop offset="0.8" stopColor={c2} />
          <stop offset="1" stopColor={c2} stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <path
        d={`M0 40 C30 72 60 62 100 ${40 + dy}`}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

// Reveal timing (seconds): each step starts STEP_GAP after the previous one
const STEP_GAP = 0.14;
const textV: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (d: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: EASE } }),
};
const nodeV: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: (d: number = 0) => ({ opacity: 1, scale: 1, transition: { duration: 0.45, delay: d, ease: EASE } }),
};
const fadeV: Variants = {
  hidden: { opacity: 0 },
  show: (d: number = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: d } }),
};
const imageV: Variants = {
  hidden: { opacity: 0, y: 90, scale: 0.55 },
  show: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

export default function ArVrApproach() {
  // One-after-another reveal only makes sense when the steps sit side by side (lg+)
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="approach"
      className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f5f5ff] to-[#f4f5ff] pb-14 pt-16 sm:pt-20 lg:pb-20"
    >
      {/* soft arc behind the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 hidden h-[560px] w-[1500px] -translate-x-1/2 rounded-[50%] border border-[#e3e0fa] lg:block"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
          maskImage: "linear-gradient(to bottom, #000 0%, transparent 70%)",
        }}
      />

      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="block text-[11px] font-bold uppercase tracking-[0.28em] text-[#6d5ef5]"
          >
            Our Approach
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 text-3xl font-black leading-[1.1] tracking-tight text-[#0f1535] sm:text-4xl lg:text-[48px]"
          >
            From Imagination
            <br />
            to Immersive{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Reality.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base"
          >
            A proven process that transforms your ideas into engaging AR/VR experiences
            that drive real results.
          </motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-5">
            <Link
              href="#showreel"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d9d9f5] bg-white px-5 py-2 text-[13px] font-semibold text-[#0f1535] transition-colors duration-200 hover:border-[#5b43e8] hover:text-[#5b43e8]"
            >
              See How It Works
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#5b43e8] text-[8px] text-white">
                ▶
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Steps: on desktop they reveal one after another (text, node, then artwork) */}
        <ol className="mt-12 grid gap-x-0 gap-y-14 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {STEPS.map((s, i) => {
            const d = wide ? i * STEP_GAP : 0;
            return (
              <motion.li
                key={s.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
                variants={{ hidden: {}, show: {} }}
                className="flex flex-col"
              >
                <motion.div
                  variants={textV}
                  custom={d}
                  className="mx-auto w-full max-w-[200px] text-left"
                >
                  <span className="bg-gradient-to-b from-[#b4a6ff] to-[#5b43e8] bg-clip-text text-[30px] font-extrabold leading-none text-transparent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[17px] font-bold text-[#0f1535]">{s.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-slate-600">{s.text}</p>
                </motion.div>

                {/* node on the wave */}
                <div className="relative mt-7 flex h-[68px] items-center justify-center">
                  <motion.div variants={fadeV} custom={d + 0.25} className="absolute inset-0">
                    {i < STEPS.length - 1 && <Segment index={i} dy={0} />}
                    {i < STEPS.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[calc(50%+46px)] top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#7c5cf6] lg:block"
                      />
                    )}
                    {i > 0 && (
                      <span
                        aria-hidden
                        className="absolute right-[calc(50%+46px)] top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#7c5cf6] lg:block"
                      />
                    )}
                  </motion.div>
                  <motion.span
                    variants={nodeV}
                    custom={d + 0.12}
                    className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-white/80 text-[#5b43e8] shadow-[0_0_0_7px_rgba(255,255,255,0.75),0_14px_34px_-8px_rgba(91,67,232,0.55)]"
                  >
                    <span className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[#e3dffb] bg-gradient-to-b from-white to-[#f1eeff]">
                      {s.icon}
                    </span>
                  </motion.span>
                </div>

                {/* artwork: rises from below and grows */}
                <motion.div
                  variants={imageV}
                  custom={d + 0.2}
                  style={{ transformOrigin: "50% 100%" }}
                  className="relative mx-auto mt-6 aspect-[4/3.4] w-full max-w-[260px]"
                >
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 240px, 60vw"
                    className="select-none object-contain"
                  />
                </motion.div>
              </motion.li>
            );
          })}
        </ol>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-12 grid grid-cols-2 gap-y-6 rounded-[28px] border border-white bg-white/70 px-4 py-6 shadow-[0_30px_70px_-35px_rgba(91,67,232,0.45)] backdrop-blur sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:px-6"
        >
          {STATS.map((st, i) => (
            <div
              key={st.label}
              className={`flex items-center justify-center gap-3 px-3 ${
                i > 0 ? "lg:border-l lg:border-[#e6e3f7]" : ""
              }`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#eeeafe] text-[#5b43e8]">
                {st.icon}
              </span>
              <div>
                <p className="text-xl font-black leading-none text-[#0f1535] sm:text-2xl">
                  <CountUp value={st.value} suffix={st.suffix} />
                </p>
                <p className="mt-1 text-[11.5px] leading-tight text-slate-500">{st.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
