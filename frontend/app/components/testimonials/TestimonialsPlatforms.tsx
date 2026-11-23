"use client";

import { Caveat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";

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

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.7) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const StarIcon = ({ size = 16, color = "#f59e0b" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
    <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" />
  </svg>
);
const ChatIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 5h16v11H9l-5 4Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </svg>
);
const ExternalIcon = ({ size = 14, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
const UsersIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M16 14.2a4.5 4.5 0 0 1 5.5 4.3" />
  </svg>
);
const StarLineIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />
  </svg>
);
const TrendIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />
  </svg>
);

/* Platform marks, drawn as simple lettermarks in each platform's colours */
const ClutchMark = () => (
  <span className="flex h-full w-full items-center justify-center rounded-full bg-[#17313b] text-[15px] font-bold tracking-tight text-white">
    Clutch
  </span>
);
const GoodFirmsMark = () => (
  <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1d6af2] text-[22px] font-black leading-none text-white">F</span>
  </span>
);
const UpworkMark = () => (
  <span className="flex h-full w-full items-center justify-center rounded-full bg-white text-[24px] font-bold tracking-tight text-[#14a800]">
    Up
  </span>
);
const TrustpilotMark = () => (
  <span className="flex h-full w-full items-center justify-center rounded-full bg-white">
    <StarIcon size={30} color="#00b67a" />
  </span>
);

type Platform = {
  name: string;
  Mark: () => React.ReactElement;
  score: string;
  sub: string;
  accent: string;
  href: string;
  stars: "five" | "one";
};

// placeholder figures from the design: swap in the real profile links and ratings before launch
const PLATFORMS: Platform[] = [
  { name: "Clutch", Mark: ClutchMark, score: "5.0", sub: "50+ reviews", accent: "#17313b", href: "https://clutch.co", stars: "five" },
  { name: "GoodFirms", Mark: GoodFirmsMark, score: "4.9", sub: "35+ reviews", accent: "#1d6af2", href: "https://www.goodfirms.co", stars: "five" },
  { name: "Upwork", Mark: UpworkMark, score: "100%", sub: "Job Success Score", accent: "#14a800", href: "https://www.upwork.com", stars: "one" },
  { name: "Trustpilot", Mark: TrustpilotMark, score: "4.8", sub: "80+ reviews", accent: "#00b67a", href: "https://www.trustpilot.com", stars: "five" },
];

const STATS = [
  { Icon: UsersIcon, value: "10K+", label: "Happy Clients" },
  { Icon: StarLineIcon, value: "4.8", suffix: "/5", label: "Average Rating" },
  { Icon: TrendIcon, value: "98%", label: "Client Satisfaction" },
  { Icon: ChatIcon, value: "1K+", label: "Positive Reviews" },
];

function PlatformCard({ p, i }: { p: Platform; i: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.12 }}
      className="relative pt-12"
    >
      {/* the platform's mark in a white disc, sitting on the card's top edge */}
      <span className="absolute left-1/2 top-0 z-10 h-[88px] w-[88px] -translate-x-1/2 rounded-full bg-white p-2 shadow-[0_14px_30px_-14px_rgba(13,27,51,0.45)] ring-1 ring-slate-100">
        <p.Mark />
      </span>
      <div className="h-full rounded-2xl border-t-[3px] bg-white px-5 pb-5 pt-14 shadow-[0_22px_44px_-26px_rgba(13,27,51,0.45)] ring-1 ring-slate-100" style={{ borderTopColor: p.accent }}>
        <h3 className="text-[19px] font-semibold" style={{ color: INK }}>
          {p.name}
        </h3>
        <p className="mt-3 flex items-center gap-2">
          <span className="text-[26px] font-bold leading-none" style={{ color: INK }}>
            {p.score}
          </span>
          <span className="flex gap-0.5" aria-label={p.stars === "five" ? `${p.score} out of 5 stars` : undefined}>
            {p.stars === "five" ? Array.from({ length: 5 }).map((_, k) => <StarIcon key={k} size={15} />) : <StarIcon size={20} color="#14a800" />}
          </span>
        </p>
        <p className="mt-2 text-[13px] text-slate-500">{p.sub}</p>
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-2.5 text-[12.5px] font-medium transition-colors hover:bg-slate-50"
          style={{ color: p.accent === "#17313b" ? INK : p.accent }}
        >
          View on {p.name}
          <ExternalIcon size={14} color={p.accent === "#17313b" ? INK : p.accent} />
        </a>
      </div>
    </motion.li>
  );
}

/* Glossy speech bubble, tilted a little like it's floating in space */
function Bubble({ children, className, tilt, delay }: { children: React.ReactNode; className: string; tilt: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
    >
      <div style={{ transform: tilt }}>{children}</div>
    </motion.div>
  );
}

export default function TestimonialsPlatforms() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f6f9fc] via-white to-[#f6f9fc] py-16 lg:py-20">
      {/* faint dotted arc sweeping over the cards */}
      <svg className="pointer-events-none absolute left-1/2 top-16 hidden h-[160px] w-[900px] -translate-x-[20%] lg:block" viewBox="0 0 900 160" fill="none" aria-hidden>
        <path d="M0 150C200 20 600 0 900 40" stroke="#bfdbfe" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
      </svg>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,330px)_1fr] lg:gap-8">
          {/* left copy, with the stars bubble under it */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="relative lg:pb-28">
            <motion.p variants={fadeUp} className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: TEAL }}>
              <ChatIcon size={17} />
              Loved Across Platforms
            </motion.p>
            <motion.h2 variants={fadeUp} className="mt-4 text-[40px] font-bold leading-[1.1] tracking-tight sm:text-[48px]">
              <span className="block" style={{ color: INK }}>
                Reviews That
              </span>
              <span style={{ color: TEAL }}>Speak for Us</span>
            </motion.h2>
            <motion.svg variants={fadeUp} className="mt-2" width="180" height="12" viewBox="0 0 180 12" fill="none" aria-hidden>
              <path d="M3 9C60 3 120 2 177 5" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
            </motion.svg>
            <motion.p variants={fadeUp} className="mt-5 text-[15px] leading-[1.7] text-slate-600">
              Real feedback from real platforms.
              <br />
              See why businesses trust and recommend <span className="font-semibold" style={{ color: TEAL }}>ProManage IT Solutions.</span>
            </motion.p>

            <Bubble className="left-[10%] top-[calc(100%-80px)] hidden lg:block" tilt="perspective(700px) rotateY(18deg) rotateZ(-8deg)" delay={0.6}>
              <span
                className="relative flex items-center gap-1 rounded-2xl bg-gradient-to-br from-white to-[#eef2f7] px-4 py-3"
                style={{ boxShadow: "inset 0 1px 0 #fff, 4px 6px 0 -1px #dbe3ee, 0 24px 40px -20px rgba(13,27,51,0.45)" }}
              >
                {Array.from({ length: 5 }).map((_, k) => (
                  <span key={k} className="drop-shadow-[0_2px_2px_rgba(180,83,9,0.45)]">
                    <StarIcon size={30} />
                  </span>
                ))}
                <span className="absolute -bottom-3 left-8 h-5 w-5 rotate-45 rounded-sm bg-[#eef2f7] shadow-[3px_3px_0_-1px_#dbe3ee]" />
              </span>
            </Bubble>
          </motion.div>

          {/* platform cards, the heart bubble above them, and the stats strip under */}
          <div className="relative">
            <Bubble className="-top-14 left-[46%] hidden lg:block" tilt="perspective(600px) rotateY(-18deg) rotateZ(10deg)" delay={0.9}>
              <span
                className="relative flex h-16 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7dd3fc] to-[#0ea5e9]"
                style={{ boxShadow: "inset 0 2px 0 rgba(255,255,255,0.6), 4px 6px 0 -1px #0284c7, 0 22px 36px -18px rgba(2,132,199,0.6)" }}
              >
                <svg width="32" height="30" viewBox="0 0 24 22" fill="#fff" aria-hidden>
                  <path d="M12 21S2 14.6 2 7.5A5 5 0 0 1 12 4.6 5 5 0 0 1 22 7.5C22 14.6 12 21 12 21Z" />
                </svg>
                <span className="absolute -bottom-2.5 left-4 h-5 w-5 rotate-45 rounded-sm bg-[#0ea5e9]" />
              </span>
            </Bubble>

            <ul className="relative grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
              {PLATFORMS.map((p, i) => (
                <PlatformCard key={p.name} p={p} i={i} />
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="relative mt-10 grid grid-cols-2 gap-y-6 rounded-2xl bg-white/90 px-4 py-5 shadow-[0_24px_50px_-26px_rgba(13,27,51,0.4)] ring-1 ring-slate-100 md:grid-cols-4 lg:ml-[14%]"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className={`flex items-center justify-center gap-3 px-3 ${i > 0 ? "md:border-l md:border-dashed md:border-slate-200" : ""}`}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-50">
                <s.Icon size={22} color={TEAL} />
              </span>
              <span className="leading-tight">
                <span className="block text-[22px] font-bold" style={{ color: INK }}>
                  {s.value}
                  {s.suffix && <span className="text-[16px] font-semibold text-slate-500">{s.suffix}</span>}
                </span>
                <span className="block text-[12.5px] text-slate-500">{s.label}</span>
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={`${caveat.className} relative mx-auto mt-8 w-fit text-[26px]`}
          style={{ color: INK }}
        >
          Trusted by businesses. Loved by clients.
          <svg className="absolute -bottom-1 right-0 h-2 w-1/2" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
            <path d="M2 6C30 2 70 1 98 4" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          </svg>
        </motion.p>
      </Container>
    </section>
  );
}
