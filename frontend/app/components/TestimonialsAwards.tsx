"use client";

import Image from "next/image";
import { Caveat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const INK = "#0d1b33";
const TEAL = "#0e7490";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/* Half a laurel wreath: a stem curving up and out, with pointed leaves in pairs either side of it that
   shrink towards the tip. Drawn for the left side; the right one is mirrored. */
const STEM = { p0: [24, 38], c: [4, 30], p1: [9, 3] };
const LEAF = "M0 0C2.6-2.4 2.6-6.6 0-9.5C-2.6-6.6-2.6-2.4 0 0Z";
const LEAVES = [0.12, 0.3, 0.48, 0.66, 0.84].flatMap((t, i) => {
  const u = 1 - t;
  const x = u * u * STEM.p0[0] + 2 * u * t * STEM.c[0] + t * t * STEM.p1[0];
  const y = u * u * STEM.p0[1] + 2 * u * t * STEM.c[1] + t * t * STEM.p1[1];
  const dx = 2 * u * (STEM.c[0] - STEM.p0[0]) + 2 * t * (STEM.p1[0] - STEM.c[0]);
  const dy = 2 * u * (STEM.c[1] - STEM.p0[1]) + 2 * t * (STEM.p1[1] - STEM.c[1]);
  const along = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // leaf's tip pointing along the stem
  const size = 1.3 - i * 0.08;
  // rounded so the server and the browser print identical numbers (atan2 can differ in the last digits)
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return [
    { x: r2(x), y: r2(y), r: r2(along - 50), size: r2(size) },
    { x: r2(x), y: r2(y), r: r2(along + 45), size: r2(size * 0.85) },
  ];
});

function Laurel({ color, flip }: { color: string; flip?: boolean }) {
  return (
    <svg width="28" height="40" viewBox="0 0 28 40" fill="none" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <path d={`M${STEM.p0} Q${STEM.c} ${STEM.p1}`} stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {LEAVES.map((l, i) => (
        <path key={i} d={LEAF} fill={color} transform={`translate(${l.x} ${l.y}) rotate(${l.r}) scale(${l.size})`} />
      ))}
      {/* a single leaf capping the tip */}
      <path d={LEAF} fill={color} transform={`translate(${STEM.p1}) rotate(12) scale(0.95)`} />
    </svg>
  );
}

const AWARDS = [
  { src: "/client-testimonial3.webp", alt: "Clutch Top Web Developers 2024 badge", title: "Top Web Developers", by: "Clutch", year: "2024", color: "#1d4ed8" },
  { src: "/client-testimonial4.webp", alt: "GoodFirms Top Digital Marketing Company badge", title: "Top Digital Marketing Company", by: "GoodFirms", year: "2023", color: "#2563eb" },
  { src: "/client-testimonial5.webp", alt: "Upwork Top Rated Plus Agency badge", title: "Top Rated Plus Agency", by: "Upwork", year: "2024", color: "#15803d" },
  { src: "/client-testimonial6.webp", alt: "The Manifest Most Reviewed Company badge", title: "Most Reviewed Company", by: "The Manifest", year: "2024", color: "#be123c" },
];

function AwardCard({ a, i }: { a: (typeof AWARDS)[number]; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.12 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* thin ring round the badge, with coloured dots at its top and sides */}
      <div className="relative flex h-[200px] w-[200px] items-center justify-center">
        {/* faint full ring, with a coloured arc over its top half that fades out towards the side dots */}
        <svg className="absolute inset-0" width="200" height="200" viewBox="0 0 200 200" fill="none" aria-hidden>
          <defs>
            <linearGradient id={`award-arc-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={a.color} stopOpacity="0" />
              <stop offset="30%" stopColor={a.color} stopOpacity="0.9" />
              <stop offset="70%" stopColor={a.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={a.color} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`award-ring-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="45%" stopColor="#e2e8f0" />
              <stop offset="90%" stopColor="#e2e8f0" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* the faint ring fades away towards the bottom */}
          <circle cx="100" cy="100" r="99" stroke={`url(#award-ring-${i})`} strokeWidth="1" />
          <motion.path
            d="M1 100A99 99 0 0 1 199 100"
            stroke={`url(#award-arc-${i})`}
            strokeWidth="1.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.12 }}
          />
        </svg>
        <span className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-4 ring-white" style={{ backgroundColor: a.color }} aria-hidden />
        <span className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: a.color }} aria-hidden />
        <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ backgroundColor: a.color }} aria-hidden />
        <div className="relative h-[160px] w-[160px]">
          <Image src={a.src} alt={a.alt} fill sizes="160px" className="object-contain mix-blend-multiply" />
        </div>
      </div>
      <h3 className="-mt-4 whitespace-nowrap text-[16px] font-bold leading-snug" style={{ color: INK }}>
        {a.title}
      </h3>
      <p className="mt-0.5 text-[14px] font-medium" style={{ color: a.color }}>
        {a.by}
      </p>
      <span className="mt-2 h-[2px] w-6 rounded-full" style={{ backgroundColor: a.color, opacity: 0.6 }} />
      <p className="mt-1.5 flex items-center gap-3 text-[18px] font-bold" style={{ color: INK }}>
        <Laurel color={a.color} />
        {a.year}
        <Laurel color={a.color} flip />
      </p>
    </motion.li>
  );
}

export default function TestimonialsAwards() {
  return (
    <section id="client-stories" className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f7fafc] to-white pb-12 pt-16 lg:pb-14 lg:pt-20">
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <motion.p variants={fadeUp} className="text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
              Recognition &amp; Awards
            </motion.p>
            <motion.span variants={fadeUp} className="mt-2 block h-[2px] w-10 rounded-full" style={{ backgroundColor: TEAL }} />
            <motion.h2 variants={fadeUp} className="mt-5 text-[40px] font-bold leading-[1.08] tracking-tight sm:text-[56px]" style={{ color: INK }}>
              Milestones that
              <br />
              <span style={{ color: TEAL }}>Reflect Our</span> Mission.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-6 max-w-[440px] text-[16px] leading-[1.7] text-slate-600">
              Every award is a reflection of our commitment to deliver excellence, innovation and impact.
            </motion.p>
            <motion.svg variants={fadeUp} className="mt-4" width="60" height="10" viewBox="0 0 60 10" fill="none" aria-hidden>
              <path d="M2 7c6-5 10-5 14 0s8 5 14 0 10-5 14 0 8 5 14 0" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
            </motion.svg>
          </motion.div>

          {/* trophy photo, its edges melting into the page all round, with the script note over its right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="relative"
            style={{ aspectRatio: "1411 / 752" }}
          >
            <Image
              src="/client-testimonial2.webp"
              alt="A glass star trophy on a podium, with award icons round it"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_75%)]"
            />
            <p
              className={`${caveat.className} absolute right-[2%] top-[14%] -rotate-6 text-right text-[26px] leading-[1.05] sm:text-[32px]`}
              style={{ color: INK }}
            >
              Recognized.
              <br />
              Trusted.
              <br />
              <span className="relative">
                Chosen.
                <svg className="absolute -bottom-2 left-0 h-2 w-full" viewBox="0 0 80 8" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 6C25 2 55 1 78 3" stroke={TEAL} strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </p>
          </motion.div>
        </div>

        <div className="relative mt-8">
          <ul className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {AWARDS.map((a, i) => (
              <AwardCard key={a.by} a={a} i={i} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
