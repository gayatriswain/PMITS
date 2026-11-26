"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

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

type Card = {
  title: string;
  text: string;
  icon: React.ReactNode;
  /** Background artwork in /public. Cards without one use `fallback` (a gradient). */
  image?: string;
  fallback: string;
};

const CARDS: Card[] = [
  {
    title: "Virtual Training",
    text: "Realistic simulations that enhance learning, improve performance and reduce training costs.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <path d="M2 9l10-5 10 5-10 5L2 9z" />
        <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5M22 9v6" />
      </svg>
    ),
    fallback: "from-[#2b2190] via-[#3a2db0] to-[#150f4d]",
  },
  {
    title: "Product Visualization",
    text: "Photorealistic 3D & VR experiences that help customers see, customize and decide with confidence.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <path d="M12 2.5l8.5 4.7v9.6L12 21.5l-8.5-4.7V7.2L12 2.5z" />
        <path d="M3.5 7.2L12 12l8.5-4.8M12 12v9.5" />
      </svg>
    ),
    image: "/arvr2.webp",
    fallback: "from-[#1d2a8f] to-[#0c1240]",
  },
  {
    title: "AR Experiences",
    text: "Augmented experiences that blend digital content with the real world to engage, inform and inspire.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <path d="M12 3l7 4v8l-7 4-7-4V7l7-4z" />
        <path d="M12 11l7-4M12 11L5 7M12 11v8" />
      </svg>
    ),
    image: "/arvr1.webp",
    fallback: "from-[#3b5bdb] to-[#1b1f6b]",
  },
  {
    title: "Architectural Visualization",
    text: "Walk through future spaces before they are built with realistic AR/VR walkthroughs and detailed visualization.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <rect x="4" y="3" width="10" height="18" rx="1" />
        <path d="M14 9h6v12h-6M8 7h2M8 11h2M8 15h2" />
      </svg>
    ),
    fallback: "from-[#0f5b7a] via-[#123e74] to-[#0a1740]",
  },
  {
    title: "Interactive Experiences",
    text: "Engaging interactive solutions for events, games, marketing and immersive brand storytelling.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <rect x="2.5" y="7" width="19" height="11" rx="5.5" />
        <path d="M7.5 10.5v4M5.5 12.5h4M15.5 11.5h.01M18 13.5h.01" />
      </svg>
    ),
    fallback: "from-[#6a2fc4] via-[#4c2398] to-[#25104f]",
  },
];

const FEATURES__cms = [
  {
    title: "Tailored Solutions",
    text: "Custom-built experiences aligned with your goals.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M17 14.2c2.4 0 4 1.7 4 4.3" />
      </svg>
    ),
  },
  {
    title: "Immersive Technology",
    text: "Leveraging the latest AR/VR tech for maximum impact.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <path d="M12 2.5l8 3v6c0 4.8-3.3 8.4-8 10-4.7-1.6-8-5.2-8-10v-6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </svg>
    ),
  },
  {
    title: "Scalable & Future-Ready",
    text: "Solutions that grow with your business.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <path d="M14 4c3.5 0 6 2.5 6 6-3 1-5 3-6 6l-4-4c3-1 5-3 6-6" />
        <path d="M10 12l-4 1-2 3 4 1M12 14l-1 4-3 2-1-4" />
      </svg>
    ),
  },
  {
    title: "Measurable Impact",
    text: "Real insights and analytics to drive better outcomes.",
    icon: (
      <svg {...I} className="h-5 w-5">
        <path d="M4 20V11M10 20V5M16 20v-7M22 20H2" />
      </svg>
    ),
  },
];

/* ---------- Circular carousel ----------
 * The five cards stand on a ring seen from the inside: the centre card is the farthest, the
 * outer ones come towards the viewer and turn in towards the middle (perspective makes them
 * bigger). Moving the carousel changes which card owns which slot; each card animates to its
 * slot, while the platform with the VR user stays fixed in the middle.
 * Slot values are fractions of the stage width: x = sideways, z = towards the viewer. */
const N = CARDS.length;
const CARD_H = 0.30; // card height
const PERSPECTIVE = 1.7;
const GAP_PX = 10; // visible space between neighbouring cards
// Per ring position: z = towards the viewer, r = turn (deg), w = card width (centre is wider)
const RING = {
  centre: { z: 0, r: 0, w: 0.28 },
  inner: { z: 0.03, r: 32, w: 0.185 },
  outer: { z: 0.1, r: 50, w: 0.185 },
};

// Where a card's left/right edge lands on screen (stage-width units) once perspective is applied
function projectedEdges(x: number, z: number, rDeg: number, w: number) {
  const r = (rDeg * Math.PI) / 180;
  const half = w / 2;
  const P = PERSPECTIVE;
  return [
    ((x - half * Math.cos(r)) * P) / (P - (z + half * Math.sin(r))),
    ((x + half * Math.cos(r)) * P) / (P - (z - half * Math.sin(r))),
  ];
}

// Find the x of a right-hand card whose projected left edge sits `target` from the centre
function solveX(target: number, c: { z: number; r: number; w: number }) {
  let lo = 0;
  let hi = 1;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (projectedEdges(mid, c.z, -c.r, c.w)[0] < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// Slot positions for a stage of width `W` px, so the gap is GAP_PX whatever the screen size
function buildSlots(W: number) {
  const g = GAP_PX / W;
  const x1 = solveX(RING.centre.w / 2 + g, RING.inner);
  const innerRight = projectedEdges(x1, RING.inner.z, -RING.inner.r, RING.inner.w)[1];
  const x2 = solveX(innerRight + g, RING.outer);
  const at = (x: number, c: { z: number; r: number; w: number }, side: 1 | -1) => ({
    x: x * side,
    z: c.z,
    r: c.r * -side,
    w: c.w,
  });
  const slots: Record<number, { x: number; z: number; r: number; w: number }> = {
    [-2]: at(x2, RING.outer, -1),
    [-1]: at(x1, RING.inner, -1),
    0: at(0, RING.centre, 1),
    1: at(x1, RING.inner, 1),
    2: at(x2, RING.outer, 1),
  };
  return slots;
}
const slotOf = (i: number, active: number) => ((((i - active + 2) % N) + N) % N) - 2;

function CardFace({ c }: { c: Card }) {
  const $t = useCmsText();
  return (
    <>
      {/* clipped card face */}
      <div
        className={`absolute inset-0 overflow-hidden rounded-[26px] bg-gradient-to-b ${c.fallback} shadow-[0_30px_60px_-28px_rgba(40,30,140,0.7)] ring-1 ring-white/20`}
      >
        {c.image && (
          <Image
            src={c.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 80vw"
            className="select-none object-cover object-bottom"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(140,120,255,0.55),transparent_60%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-[#120c4a]/85 via-[#120c4a]/45 to-transparent"
        />
        {!c.image && (
          <div
            aria-hidden
            className="absolute -bottom-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-white/20 shadow-[0_0_80px_20px_rgba(150,130,255,0.35)]"
          />
        )}
      </div>

      {/* content */}
      <div className="relative z-[2] flex h-full flex-col p-4 sm:p-5">
        <span className="mb-2.5 grid h-9 w-9 place-items-center rounded-lg border border-white/30 bg-white/15 text-white backdrop-blur">
          <span className="[&>svg]:h-[18px] [&>svg]:w-[18px]">{c.icon}</span>
        </span>
        <h3
          className="text-[14px] font-extrabold uppercase leading-tight tracking-wide text-white"
        >
          {c.title}
        </h3>
        <p
          className="mt-2 text-[11.5px] leading-snug text-white/80"
        >
          {c.text}
        </p>
        <Link
          href={$t("ArVrShowcase__t1", "#contact-form")}
          className="group/link mt-2.5 inline-flex w-fit items-center gap-1 text-[12px] font-semibold text-white"
        >
          {$t("ArVrShowcase__t2", "Explore")}<span aria-hidden className="transition-transform duration-300 group-hover/link:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </>
  );
}

const ARROW =
  "absolute top-1/2 z-40 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[#d9d9f5] bg-white/90 text-[#5b43e8] shadow-[0_10px_24px_-10px_rgba(91,67,232,0.55)] backdrop-blur transition hover:bg-[#5b43e8] hover:text-white";

export default function ArVrShowcase() {
  const $t = useCmsText();
  const FEATURES = useCmsData("ArVrShowcase__FEATURES", FEATURES__cms);
  const [wide, setWide] = useState(false);
  // cur = card in the centre (AR Experiences at first); prev = the one before, to spot wrap-arounds
  const [nav, setNav] = useState({ cur: 2, prev: 2 });
  const active = nav.cur;
  const setActive = (next: number | ((a: number) => number)) =>
    setNav((n) => ({ cur: typeof next === "function" ? next(n.cur) : next, prev: n.cur }));
  const [paused, setPaused] = useState(false);
  const [stageW, setStageW] = useState(1200);
  const stageRef = useRef<HTMLDivElement>(null);

  // The curved layout only applies when the cards sit side by side
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => setStageW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wide]);

  // Autoplay (off for reduced motion, and while hovered/focused)
  useEffect(() => {
    if (!wide || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % N), 4500);
    return () => clearInterval(t);
  }, [wide, paused]);

  const slots = CARDS.map((_, i) => slotOf(i, active));
  // A card wrapping from one end to the other jumps instead of sliding across the others
  const jumped = CARDS.map((_, i) => Math.abs(slotOf(i, nav.cur) - slotOf(i, nav.prev)) > 2);

  const go = (d: number) => setActive((a) => (a + d + N) % N);
  const cardH = stageW * CARD_H;
  const slotPos = buildSlots(stageW);
  const stageH = cardH * 1.15 + stageW * 0.08; // room for the nearest (largest) cards

  return (
    <section
      id="showcase"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f4f5ff] via-white to-[#f4f5ff] pb-14 pt-14 sm:pt-20 lg:pb-20"
    >
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
            {$t("ArVrShowcase__t3", "What we create")}</motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-h2 mt-3 font-black tracking-tight text-[#0f1535]"
          >
            {$t("ArVrShowcase__t4", "Powerful AR/VR Solutions")}<br />
            {$t("ArVrShowcase__t5", "That Drive")}{" "}
            <span className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] bg-clip-text text-transparent">
              {$t("ArVrShowcase__t6", "Real Results.")}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-body mx-auto mt-4 max-w-2xl text-slate-600"
          >
            {rich($t("ArVrShowcase__t7", "From training and simulation to visualisation and interactive experiences, we build immersive solutions that solve real challenges and unlock new possibilities."))}</motion.p>
          <motion.div variants={fadeUp} custom={3} className="mt-5">
            <Link
              href={$t("ArVrShowcase__t8", "#contact-form")}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#d9d9f5] bg-white px-5 py-2 text-[13px] font-semibold text-[#0f1535] transition-colors duration-200 hover:border-[#5b43e8] hover:text-[#5b43e8]"
            >
              {$t("ArVrShowcase__t9", "Explore All Solutions")}<span className="grid h-5 w-5 place-items-center rounded-full bg-[#5b43e8] text-[8px] text-white">
                ▶
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Carousel */}
        {wide ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: EASE }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="relative mt-10"
            role="region"
            aria-roledescription="carousel"
            aria-label="AR/VR solutions"
          >
            <button type="button" aria-label="Previous solution" onClick={() => go(-1)} className={`${ARROW} left-0`}>
              <svg {...I} className="h-5 w-5">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" aria-label="Next solution" onClick={() => go(1)} className={`${ARROW} right-0`}>
              <svg {...I} className="h-5 w-5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={stageRef}
              className="relative mx-auto w-full max-w-[1392px]"
              style={{ height: stageH, perspective: stageW * PERSPECTIVE }}
            >
              {CARDS.map((c, i) => {
                const sl = slots[i];
                const cfg = slotPos[sl];
                return (
                  <motion.div
                    key={c.title}
                    initial={false}
                    animate={{ x: cfg.x * stageW, z: cfg.z * stageW, rotateY: cfg.r }}
                    transition={jumped[i] ? { duration: 0 } : { duration: 0.8, ease: EASE }}
                    // zero-size anchor at the stage centre: the card turns around its own middle
                    style={{ left: "50%", top: "50%", width: 0, height: 0, zIndex: 10 - Math.abs(sl) }}
                    className="absolute"
                  >
                    <motion.div
                      initial={false}
                      animate={{ width: cfg.w * stageW }}
                      transition={jumped[i] ? { duration: 0 } : { duration: 0.8, ease: EASE }}
                      style={{ height: cardH, top: -cardH / 2 }}
                      onClickCapture={(e) => {
                        if (sl !== 0) {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                      aria-roledescription="slide"
                      aria-label={`${c.title} (${i + 1} of ${N})`}
                      className={`absolute left-0 -translate-x-1/2 ${sl !== 0 ? "cursor-pointer" : ""}`}
                    >
                      <CardFace c={c} />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Fixed in the middle: the VR user on the platform, in front of the centre card */}
              <Image
                src={$t("ArVrShowcase__t10", "/arvr-platform.webp")}
                alt={$t("ArVrShowcase__t11", "Person in a VR headset on a glowing platform")}
                width={1543}
                height={1000}
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="pointer-events-none absolute left-1/2 z-[30] h-auto max-w-none -translate-x-1/2 select-none"
                style={{ width: stageW * 0.27, bottom: (stageH - cardH) / 2 - stageW * 0.05 }}
              />
            </div>

            <div className="mt-2 flex items-center justify-center gap-2.5">
              {CARDS.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  aria-label={`Show ${c.title}`}
                  aria-current={i === active}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-7 bg-[#5b43e8]" : "w-2 bg-[#cfcaf5] hover:bg-[#a99bf8]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          /* Small screens: plain swipeable row */
          <ul className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4">
            {CARDS.map((c) => (
              <li key={c.title} className="relative h-[420px] w-[78%] max-w-[320px] shrink-0 snap-center">
                <CardFace c={c} />
              </li>
            ))}
          </ul>
        )}

        {/* Feature bar */}
        <motion.ul
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-8 grid gap-y-6 rounded-[26px] border border-white bg-white/75 px-4 py-6 shadow-[0_30px_70px_-35px_rgba(91,67,232,0.45)] backdrop-blur sm:grid-cols-2 lg:mt-6 lg:grid-cols-4 lg:px-6"
        >
          {FEATURES.map((f, i) => (
            <li
              key={f.title}
              className={`flex items-center gap-3.5 px-3 ${
                i > 0 ? "lg:border-l lg:border-[#e6e3f7]" : ""
              }`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#7c5cf6] to-[#4f46e5] text-white shadow-[0_10px_22px_-8px_rgba(91,67,232,0.6)]">
                {f.icon}
              </span>
              <div>
                <h3 className="text-[13.5px] font-bold text-[#0f1535]">{f.title}</h3>
                <p className="text-caption mt-0.5 text-slate-500">{f.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
