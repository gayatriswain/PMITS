"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";

// Matches Tailwind's `sm` breakpoint (640px) — below it we're on a phone-sized viewport.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

const NAVY = "#132a43";
const ACCENT = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const headerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function OSlashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: "0.72em", height: "0.72em" }}
      className="inline-block -mb-[0.03em] mx-[0.01em] align-baseline"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="9.4" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

// `video` is optional — drop your own clip in /public and reference it here (e.g. "/ugc-1.mp4").
// Until then each tile falls back to its gradient so nothing is hotlinked from anywhere else.
type Tile = { views: string; from: string; to: string; video?: string };

const VIDEO_SRCS = ["/video1.mp4", "/video2.mp4", "/video3.mp4", "/video4.mp4"];

const COLUMNS_BASE: Tile[][] = [
  [
    { views: "1.2M views", from: "#f4a26b", to: "#c04f2c" },
    { views: "2.1M views", from: "#f0c9a0", to: "#c98a52" },
    { views: "1.7M views", from: "#e8e2d4", to: "#b3a891" },
    { views: "8.2M views", from: "#f6cf8f", to: "#d99a4e" },
  ],
  [
    { views: "1.2M views", from: "#3a3a40", to: "#17171a" },
    { views: "1.9M views", from: "#f2b559", to: "#c9722e" },
    { views: "1.8M views", from: "#eadfce", to: "#c2a97e" },
    { views: "3.1M views", from: "#7fae7a", to: "#345c33" },
  ],
  [
    { views: "900K views", from: "#a9c6e0", to: "#5c85ad" },
    { views: "1.2M views", from: "#f2b28a", to: "#c9603a" },
    { views: "1.8M views", from: "#f3d9a8", to: "#dcae6a" },
    { views: "2.4M views", from: "#8fb8d8", to: "#3f6b91" },
  ],
  [
    { views: "9.2M views", from: "#d8b4c8", to: "#a25e88" },
    { views: "5.2M views", from: "#c9d6a8", to: "#7a9450" },
    { views: "4.2M views", from: "#f0d9c0", to: "#c98f5a" },
    { views: "6.9M views", from: "#9ec9d8", to: "#4d8ca3" },
  ],
];

let videoCursor = 0;
const COLUMNS: Tile[][] = COLUMNS_BASE.map((col) =>
  col.map((tile) => ({ ...tile, video: VIDEO_SRCS[videoCursor++ % VIDEO_SRCS.length] }))
);

// Matches the reference's own numbers: perspective(1200px) rotateX(30deg) rotateZ(-2deg),
// 250px-wide cards, 20px gap/radius. Each column loops its set twice and travels by exactly
// one set's height (±50%) so it wraps seamlessly — and columns alternate direction (up/down),
// same as the source markup's alternating translateY signs, instead of all moving one way.
const DESKTOP_COLUMN_SPEEDS = [7, 8.5, 6, 7.5];
const MOBILE_COLUMN_SPEEDS = [11, 13, 9.5, 12];
const COLUMN_DIRECTIONS: (1 | -1)[] = [1, -1, 1, -1];

function Tile({ tile }: { tile: Tile }) {
  return (
    <div
      className="relative w-[190px] sm:w-[250px] h-[243px] sm:h-[320px] shrink-0 rounded-[20px] overflow-hidden"
      style={!tile.video ? { background: `linear-gradient(155deg, ${tile.from}, ${tile.to})` } : undefined}
    >
      {tile.video ? (
        <video src={tile.video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover bg-[#333]" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
      )}
      <span className="absolute left-3 bottom-3 rounded-full bg-white px-2 py-1 text-[12px] font-medium tracking-tight text-black">
        {tile.views}
      </span>
    </div>
  );
}

const GRID_ROW_HEIGHT = "h-[640px] sm:h-[760px]";

function MarqueeColumn({ tiles, duration, direction }: { tiles: Tile[]; duration: number; direction: 1 | -1 }) {
  // Tiles are looped 3x (not 2x) so a column's total content is always well taller than the
  // viewport even after the rotate+scale bleed — no gap of bare background can ever scroll into view.
  // The rotateX + overflow-hidden live on THIS SAME element (not split across parent/child) — that's
  // the fix. Previously the rotation was on a shared ancestor and the clipping was on a descendant;
  // a 3D-transformed ancestor forces any descendant with overflow-hidden to flatten into its own
  // separate plane, which is what fragmented every card last time. Co-locating both on one element
  // avoids that entirely: it clips its own content in its own already-rotated space, no breakage.
  // All four columns share one `perspective` from their common parent and use the same rotateX +
  // bottom transform-origin, so they still read as one continuous tilted plane, not four disjoint ones.
  const looped = [...tiles, ...tiles, ...tiles];
  return (
    <div
      className={`relative w-[190px] sm:w-[250px] ${GRID_ROW_HEIGHT} overflow-hidden`}
      style={{ transform: "rotateX(30deg) rotateZ(-4deg)", transformOrigin: "bottom center" }}
    >
      <motion.div
        className="flex flex-col gap-3.5 sm:gap-5"
        animate={{ y: direction === 1 ? ["0%", "-33.333%"] : ["-33.333%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {looped.map((tile, i) => (
          <Tile key={i} tile={tile} />
        ))}
      </motion.div>
    </div>
  );
}

const PLATFORMS = [
  {
    label: "Snapchat",
    href: "#",
    bg: "#FFFC00",
    fg: "#111",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c3 0 5 2.2 5 5.3 0 1 0 2.2-.2 3.1.6.3 1.4.4 1.9.4.5 0 .9.3.9.8 0 .7-.9 1.1-1.7 1.4-.3.1-.6.3-.6.5 0 .4.9 1.6 2.7 2 .3.1.5.3.4.7-.2.9-2.1 1.3-3 1.4-.1.3-.2.8-.3 1.1-.1.3-.3.4-.6.4-.4 0-.9-.1-1.6-.1-.8 0-1.2.6-2.9.6s-2.1-.6-2.9-.6c-.7 0-1.2.1-1.6.1-.3 0-.5-.1-.6-.4-.1-.3-.2-.8-.3-1.1-.9-.1-2.8-.5-3-1.4-.1-.4.1-.6.4-.7 1.8-.4 2.7-1.6 2.7-2 0-.2-.3-.4-.6-.5-.8-.3-1.7-.7-1.7-1.4 0-.5.4-.8.9-.8.5 0 1.3-.1 1.9-.4C7 9.5 7 8.3 7 7.3 7 4.2 9 2 12 2Z" /></svg>
    ),
  },
  {
    label: "Tiktok",
    href: "#",
    bg: "#000",
    fg: "#fff",
    icon: (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 2c.4 2.5 2 4.2 4.7 4.4v3.3c-1.6.1-3.1-.4-4.7-1.4v6.6c0 3.7-3 6.6-6.7 6.6S3.1 18.6 3.1 14.9c0-3.6 2.9-6.6 6.5-6.6.3 0 .7 0 1 .1v3.4c-.3-.1-.6-.2-1-.2-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2 3.3-1.4 3.3-3.2V2Z" /></svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    bg: "linear-gradient(135deg,#f58529,#dd2a7b,#8134af)",
    fg: "#fff",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    bg: "#000",
    fg: "#fff",
    icon: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6Zm-1.2 18h1.7L6.4 4H4.6Z" /></svg>
    ),
  },
  {
    label: "Youtube",
    href: "#",
    bg: "#FF0000",
    fg: "#fff",
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
        <path d="M10.5 9.5 L15 12 L10.5 14.5 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function SocialMediaMarketingContentGrid() {
  const isMobile = useIsMobile();
  const columnSpeeds = isMobile ? MOBILE_COLUMN_SPEEDS : DESKTOP_COLUMN_SPEEDS;

  return (
    <section className="relative w-full bg-white py-16 lg:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm mb-6"
          >
            UGC &middot; Short-form &middot; Creator marketing
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-sans text-[38px] sm:text-6xl lg:text-[64px] font-black uppercase tracking-tight leading-[1.05]"
            style={{ color: NAVY }}
          >
            <span className="block">Content That</span>
            <span className="block">
              St<OSlashIcon />ps The{" "}
              <span
                className="inline-flex items-center rounded-full px-5 sm:px-7 py-0.5 sm:py-1 text-white"
                style={{ backgroundColor: ACCENT }}
              >
                Scroll.
              </span>
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 max-w-lg text-sm md:text-[15px] text-slate-500 leading-relaxed">
            We turn real people into your best sales team. Authentic UGC that stops the scroll, earns trust, and converts &mdash; built on data, not gut feelings.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-slate-900 bg-white pl-2 pr-5 py-2 text-[13px] font-bold transition-transform hover:-translate-y-0.5"
              style={{ color: NAVY }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition-transform group-hover:rotate-45">
                <ArrowUpRightIcon />
              </span>
              Start growing
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Content grid — rotateX (applied per-column, see MarqueeColumn) tapers the top inward
          toward a vanishing point, all columns sharing one `perspective` here so they read as a
          single continuous tilted plane. Bottom-anchored (items-end) to match each column's own
          bottom transform-origin. Faded on all four sides (top/bottom via mask-image, left/right
          via overlay gradients) so the grid dissolves into the page instead of reading as a
          separate boxed section. Columns alternate scroll direction and loop continuously (tripled
          content, see MarqueeColumn) so no bare gap ever appears mid-scroll. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mt-12 lg:mt-16 h-[480px] sm:h-[600px] w-full overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center" style={{ perspective: "1200px" }}>
          <div className="flex gap-3.5 sm:gap-5 justify-center">
            {COLUMNS.map((col, ci) => (
              <MarqueeColumn
                key={ci}
                tiles={col}
                duration={columnSpeeds[ci % columnSpeeds.length]}
                direction={COLUMN_DIRECTIONS[ci % COLUMN_DIRECTIONS.length]}
              />
            ))}
          </div>
        </div>
        {/* left/right fade so the sides melt into the white page too, not just top/bottom */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-white to-transparent z-10" />
      </motion.div>

      <Container>
        {/* Platforms — horizontal marquee (see .animate-ticker-x in globals.css), faded on the
            left/right edges so it melts into the page, and paused on hover via plain CSS
            (:hover { animation-play-state: paused }) so it freezes in place instead of jumping. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative z-10 mt-10 flex flex-col items-center text-center"
        >
          <p className="text-[12px] font-medium text-slate-500 mb-4">Your audience is everywhere. So are we.</p>
          <div className="relative w-[40%] mx-auto overflow-hidden">
            <div className="flex w-max items-center gap-2.5 animate-ticker-x">
              {[...PLATFORMS, ...PLATFORMS].map((p, i) => (
                <a
                  key={i}
                  href={p.href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white pl-1.5 pr-3 py-1.5 text-[11px] font-semibold shadow-sm transition-colors hover:border-slate-300"
                  style={{ color: NAVY }}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: p.bg, color: p.fg }}
                  >
                    {p.icon}
                  </span>
                  {p.label}
                </a>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
