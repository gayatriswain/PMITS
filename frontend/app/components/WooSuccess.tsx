"use client";

import Link from "next/link";
import { Caveat } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import DottedMap from "dotted-map/without-countries";
import Container from "./Container";
import WORLD_DOT_MAP from "./data/worldDotMap";
import { useFitScale } from "./useFitScale";
import { WooBadge } from "./WooHireHero";
import { Handbag } from "./WooPowered";
import { Hoodie, Plant, Sneaker } from "./WooWhyHire";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const PURPLE = "#7f54b3";
const PURPLE_DARK = "#5b3a8c";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
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

const ShieldIcon = ({ size = 22, color = TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const AwardIcon = ({ size = 22, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <circle cx="12" cy="9" r="6" />
    <path d="m12 6.5.9 1.8 2 .3-1.4 1.4.3 2-1.8-1-1.8 1 .3-2-1.4-1.4 2-.3Z" />
    <path d="M8.5 14 7 21l5-2.5 5 2.5-1.5-7" />
  </svg>
);
const CartIcon = ({ size = 22, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 1.9)}>
    <path d="M3 4h2.5l2.2 11h10.8l2-8H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="17" cy="19" r="1.3" />
  </svg>
);
const TrendIcon = ({ size = 34, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 1.8)}>
    <path d="m2 18 6-6 4 3 9-9" />
    <path d="M15 6h6v6" />
  </svg>
);
const GlobeIcon = ({ size = 18, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 1.8)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
  </svg>
);
const HeartIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);
const BagIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 1.9)}>
    <path d="M5 8h14l-1 13H6Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
const BarsIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M5 20v-5M10 20V10M15 20v-7M20 20V5" />
  </svg>
);
const RocketIcon = ({ size = 26, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 1.6)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  </svg>
);
const ArrowIcon = ({ size = 15, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);
const StoreGlobeIcon = () => (
  <svg width="74" height="64" viewBox="0 0 74 64" fill="none" aria-hidden>
    <rect x="4" y="6" width="46" height="34" rx="4" fill="#fff" stroke={TEAL} strokeWidth="2" />
    <path d="M4 14h46" stroke={TEAL} strokeWidth="2" />
    <path d="M16 22h3l2.5 10h12l2-7H20" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="35" r="1.4" fill={TEAL} />
    <circle cx="32" cy="35" r="1.4" fill={TEAL} />
    <circle cx="54" cy="44" r="15" fill="#fff" stroke={TEAL} strokeWidth="2" />
    <path d="M39 44h30M54 29c4 4 6 9 6 15s-2 11-6 15c-4-4-6-9-6-15s2-11 6-15Z" stroke={TEAL} strokeWidth="1.8" />
  </svg>
);

/* ---------------- Top-right: laptop + growth cards (620×360 canvas) ---------------- */
const TOP_W = 620;
const TOP_H = 360;

const PRODUCTS = [
  { Art: Hoodie, cls: "h-[52px] w-[52px]" },
  { Art: Sneaker, cls: "h-[34px] w-[66px]" },
  { Art: Handbag, cls: "h-[48px] w-[54px]" },
];

function GrowthCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className="flex w-[160px] items-end justify-between rounded-2xl bg-white px-4 py-3 shadow-[0_20px_40px_-20px_rgba(15,40,60,0.4)] ring-1 ring-slate-100"
    >
      <div>
        <p className="text-[12px] font-semibold" style={{ color: NAVY }}>{label}</p>
        <p className="mt-0.5 text-[22px] font-extrabold" style={{ color: TEAL }}>{value}</p>
      </div>
      <TrendIcon />
    </motion.div>
  );
}

function TopVisual() {
  const { ref, scale } = useFitScale(TOP_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${TOP_W} / ${TOP_H}` }}>
      <div className="absolute left-0 top-0" style={{ width: TOP_W, height: TOP_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}>
        {/* orbit arc + dots */}
        <svg className="absolute inset-0" width={TOP_W} height={TOP_H} viewBox={`0 0 ${TOP_W} ${TOP_H}`} fill="none" aria-hidden>
          <path d="M60 60C160 -10 360 -20 470 40" stroke="#cbd5e1" strokeWidth="1.2" />
          <circle cx="60" cy="60" r="4" fill={TEAL} />
          {Array.from({ length: 15 }).map((_, i) => (
            <circle key={i} cx={530 + (i % 5) * 14} cy={14 + Math.floor(i / 5) * 14} r="2" fill="#cbd5e1" />
          ))}
        </svg>
        <div className="absolute left-[120px] top-[40px] h-[300px] w-[380px] rounded-full bg-teal-50 blur-3xl" />

        {/* plant */}
        <div className="absolute left-[34px] top-[66px] h-[200px] w-[130px]"><Plant /></div>

        {/* laptop */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute left-[118px] top-[30px] w-[360px]"
          style={{ perspective: "1200px" }}
        >
          <div style={{ transform: "rotateY(-14deg) rotateX(3deg)", transformOrigin: "right center" }}>
            <div className="rounded-[16px] bg-gradient-to-b from-slate-200 to-slate-300 p-[8px] shadow-[0_40px_60px_-30px_rgba(15,40,60,0.45)]">
              <div className="aspect-[16/10.5] overflow-hidden rounded-[9px] bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <WooBadge className="h-[18px] w-[34px] rounded-[5px]" text="text-[10px]" />
                    <span className="text-[11px] font-extrabold tracking-tight" style={{ color: NAVY }}>COMMERCE</span>
                  </span>
                  <svg {...base(13, "#64748b", 2)}><path d="M3 4h2.5l2.2 11h10.8l2-8H7" /></svg>
                </div>
                <div className="mt-3 flex gap-2">
                  <span className="flex w-4 flex-col gap-2 pt-1">
                    {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-3 rounded-full bg-slate-200" />)}
                  </span>
                  <div className="grid flex-1 grid-cols-3 gap-2">
                    {PRODUCTS.map((p, i) => (
                      <div key={i} className="rounded-lg border border-slate-100 p-1.5">
                        <div className="flex h-[66px] items-center justify-center rounded-md bg-slate-50">
                          <div className={p.cls}><p.Art /></div>
                        </div>
                        <p className="mt-1.5 text-[7px] tracking-[0.15em]" style={{ color: NAVY }}>★★★★<span className="text-slate-300">★</span></p>
                        <span className="mt-1 block h-1 w-3/4 rounded-full bg-slate-200" />
                        <span className="mt-1.5 block h-2.5 rounded-[3px]" style={{ backgroundColor: PURPLE }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative -mt-0.5 ml-[-6%] h-[14px] w-[112%] rounded-b-[16px] rounded-t-[3px] bg-gradient-to-b from-slate-100 to-slate-300 shadow-[0_22px_26px_-14px_rgba(15,40,60,0.45)]" />
          </div>
        </motion.div>

        {/* purple cart tile */}
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          className="absolute left-[118px] top-[244px] flex h-[62px] w-[62px] items-center justify-center rounded-2xl shadow-[0_18px_30px_-12px_rgba(91,58,140,0.6)]"
          style={{ background: `linear-gradient(135deg, #a07fd0, ${PURPLE_DARK})` }}
        >
          <CartIcon size={30} />
        </motion.span>

        <div className="absolute left-[452px] top-[66px]"><GrowthCard label="Traffic" value="+146%" delay={0.45} /></div>
        <div className="absolute left-[452px] top-[178px]"><GrowthCard label="Sales" value="+230%" delay={0.6} /></div>
      </div>
    </div>
  );
}

/* ---------------- Middle-right: dotted world map with Woo hub ---------------- */
// Real world map from dotted-map (precomputed grid in ./data/worldDotMap).
const worldMap = new DottedMap({ map: JSON.parse(WORLD_DOT_MAP) });
const MAP_UNITS_W = worldMap.image.width;
const MAP_UNITS_H = worldMap.image.height;
const MAP_W = 560;
const MAP_PX = MAP_W / MAP_UNITS_W;
const MAP_H = Math.round(MAP_UNITS_H * MAP_PX);
const MAP_SVG_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  worldMap.getSVG({ shape: "circle", color: "#a7dcd3", radius: 0.32, backgroundColor: "transparent" })
)}`;

// Layout around the hub (fractions of the map box), matching the reference design.
const HUB_C = { x: MAP_W * 0.5, y: MAP_H * 0.45 };
// Sample portraits for the mockup — replace with your own team/client photos in /public.
const PEOPLE = [
  { x: 0.14, y: 0.3, src: "https://randomuser.me/api/portraits/women/44.jpg", name: "Client" },
  { x: 0.49, y: 0.06, src: "https://randomuser.me/api/portraits/men/32.jpg", name: "Client" },
  { x: 0.77, y: 0.3, src: "https://randomuser.me/api/portraits/women/65.jpg", name: "Client" },
  { x: 0.12, y: 0.66, src: "https://randomuser.me/api/portraits/men/75.jpg", name: "Client" },
  { x: 0.5, y: 0.86, src: "https://randomuser.me/api/portraits/women/68.jpg", name: "Client" },
  { x: 0.84, y: 0.76, src: "https://randomuser.me/api/portraits/men/46.jpg", name: "Client" },
];
const ICONS = [
  { x: 0.24, y: 0.18, Icon: HeartIcon, bg: PURPLE },
  { x: 0.87, y: 0.18, Icon: BagIcon, bg: TEAL },
  { x: 0.23, y: 0.78, Icon: GlobeIcon, bg: TEAL },
  { x: 0.95, y: 0.6, Icon: BarsIcon, bg: TEAL },
];
const px = (f: { x: number; y: number }) => ({ x: f.x * MAP_W, y: f.y * MAP_H });

function Person({ src, name }: { src: string; name: string }) {
  return (
    <span className="relative flex flex-col items-center">
      <span className="block h-[54px] w-[54px] overflow-hidden rounded-full bg-slate-100 ring-[3px] ring-white shadow-[0_14px_24px_-10px_rgba(15,40,60,0.5)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- remote sample portrait */}
        <img src={src} alt={name} width={54} height={54} className="h-full w-full object-cover" loading="lazy" />
      </span>
      <span className="mt-1 h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent" style={{ borderTopColor: TEAL }} />
    </span>
  );
}

function MapVisual() {
  const { ref, scale } = useFitScale(MAP_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="absolute left-0 top-0"
        style={{ width: MAP_W, height: MAP_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- inline generated SVG */}
        <img src={MAP_SVG_URI} alt="" aria-hidden className="absolute inset-0 h-full w-full" />

        {/* orbit + connector lines */}
        <svg className="absolute inset-0 overflow-visible" width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`} fill="none" aria-hidden>
          <motion.ellipse
            cx={HUB_C.x}
            cy={HUB_C.y + 4}
            rx={MAP_W * 0.36}
            ry={MAP_H * 0.39}
            stroke={TEAL}
            strokeWidth="1.2"
            strokeDasharray="4 5"
            variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 0.6, transition: { duration: 1.4, ease: "easeInOut", delay: 0.3 } } }}
          />
          {PEOPLE.map((p, i) => {
            const a = px(p);
            const mx = (a.x + HUB_C.x) / 2 + (a.y < HUB_C.y ? -20 : 20);
            const my = (a.y + HUB_C.y) / 2;
            return (
              <motion.path
                key={i}
                d={`M${a.x} ${a.y + 24} Q ${mx} ${my} ${HUB_C.x} ${HUB_C.y}`}
                stroke={TEAL}
                strokeWidth="1"
                strokeDasharray="3 5"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 0.45, transition: { duration: 0.9, delay: 0.6 + i * 0.1 } } }}
              />
            );
          })}
        </svg>

        {/* Woo hub with soft glow + pulse */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: HUB_C.x, top: HUB_C.y }}>
          <span className="absolute left-1/2 top-1/2 h-[190px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-2xl" />
          <motion.span
            animate={{ scale: [1, 1.25], opacity: [0.3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-purple-200"
          />
          <motion.span
            variants={{ hidden: { scale: 0.6, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: EASE } } }}
            className="relative flex h-[118px] w-[150px] items-center justify-center rounded-full bg-white shadow-[0_25px_50px_-20px_rgba(91,58,140,0.45)] ring-[10px] ring-white/70"
          >
            <WooBadge className="h-[52px] w-[94px] rounded-[12px]" text="text-[30px]" />
          </motion.span>
        </div>

        {/* people */}
        {PEOPLE.map((p, i) => {
          const a = px(p);
          return (
            <motion.div
              key={p.src}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: a.x, top: a.y }}
              variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE, delay: 0.7 + i * 0.1 } } }}
            >
              <Person src={p.src} name={p.name} />
            </motion.div>
          );
        })}

        {/* icon bubbles */}
        {ICONS.map((c, i) => {
          const a = px(c);
          return (
            <motion.span
              key={i}
              className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-[0_10px_20px_-8px_rgba(13,94,86,0.55)]"
              style={{ left: a.x, top: a.y, backgroundColor: c.bg }}
              variants={{ hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE, delay: 1 + i * 0.1 } } }}
            >
              <c.Icon size={18} />
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

const Hl = ({ children, color = TEAL }: { children: React.ReactNode; color?: string }) => (
  <span className="font-semibold" style={{ color }}>{children}</span>
);

export default function WooSuccess() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-10 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <motion.p variants={fadeUp} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>
              Built for growth. Backed by experts.
              <span className="h-px w-10 bg-teal-300" />
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold leading-[1.08] tracking-tight"
              style={{ color: NAVY }}
            >
              Your Success,
              <br />
              Our{" "}
              <span className="relative inline-block" style={{ color: DEEP_TEAL }}>
                Commitment.
                <svg className="pointer-events-none absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                  <motion.path
                    d="M3 9C60 3 140 2 197 6"
                    fill="none"
                    stroke={PURPLE}
                    strokeWidth="3"
                    strokeLinecap="round"
                    variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.8, delay: 0.4 } } }}
                  />
                </svg>
              </span>
            </motion.h2>

            <ol className="relative mt-8 flex flex-col gap-6">
              <span className="absolute left-[23px] top-12 bottom-12 w-px bg-gradient-to-b from-teal-200 to-purple-200" aria-hidden />
              <motion.li variants={fadeUp} className="relative flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-teal-50">
                  <ShieldIcon />
                </span>
                <p className="text-[14px] leading-[1.8] text-slate-600">
                  There are many WooCommerce developers available on the web. These developers claim to have expertise on this
                  WordPress plugin for ecommerce. However, making tall claims is one thing and providing support in your
                  WooCommerce journey is another thing. But when you hire developers from ProManage IT Solution, you can{" "}
                  <Hl>relax and breathe easy.</Hl>
                </p>
              </motion.li>
              <motion.li variants={fadeUp} className="relative flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-100 bg-purple-50">
                  <AwardIcon />
                </span>
                <p className="text-[14px] leading-[1.8] text-slate-600">
                  This is because our past track record in WooCommerce development is there for everyone to see and compare
                  with other companies. You will be happy with the efforts of our WooCommerce developers when you see a{" "}
                  <Hl color={PURPLE}>large amount of traffic</Hl> coming to your website and <Hl color={PURPLE}>sales generated</Hl> by
                  the online store.
                </p>
              </motion.li>
            </ol>
          </motion.div>

          <TopVisual />
        </div>

        {/* Middle card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] items-center gap-8 rounded-[28px] bg-gradient-to-r from-[#f0f8f6] to-[#f6fbfa] px-6 py-8 sm:px-10"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <span className="flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_15px_35px_-20px_rgba(13,94,86,0.45)]">
              <StoreGlobeIcon />
            </span>
            <p className="text-[14.5px] leading-[1.85] text-slate-700">
              <span className="font-bold" style={{ color: NAVY }}>Why share your profits</span> from business with giant ecommerce
              platforms like Amazon or Shopify when you can <Hl>create and run your own online store</Hl> and also attract
              customers to it? WooCommerce is an open source plugin for ecommerce platform. Give ProManage IT Solution a chance
              to become a <Hl color={PURPLE}>silent partner</Hl> in your WooCommerce journey. Our WooCommerce development services
              are <Hl>loved by clients</Hl> in diverse industries across the globe.
            </p>
          </div>
          <div className="mx-auto w-full max-w-[460px]">
            <MapVisual />
          </div>
        </motion.div>

        {/* Bottom CTA pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto -mt-6 relative flex max-w-[960px] flex-col md:flex-row items-center gap-5 md:gap-7 rounded-[22px] bg-white px-6 py-5 shadow-[0_25px_55px_-30px_rgba(15,40,60,0.4)] ring-1 ring-slate-100"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-50">
            <RocketIcon />
          </span>
          <p className="text-[19px] sm:text-[21px] font-bold text-center md:text-left" style={{ color: NAVY }}>
            Let&apos;s Build Something{" "}
            <span className={`${caveat.className} relative inline-block text-[30px]`} style={{ color: PURPLE }}>
              Amazing
              <svg className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
                <path d="M2 6C30 2 70 2 98 4" fill="none" stroke={PURPLE} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Together!
          </p>
          <span className="hidden md:block h-10 w-px bg-slate-200" />
          <p className="flex-1 text-center md:text-left text-[13px] leading-snug text-slate-600">
            Partner with us for a successful WooCommerce journey.
          </p>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-4 rounded-full py-2 pl-7 pr-2 text-[15px] font-semibold text-white shadow-[0_18px_35px_-14px_rgba(91,58,140,0.7)] transition hover:-translate-y-0.5"
            style={{ background: `linear-gradient(90deg, ${PURPLE}, ${TEAL})` }}
          >
            Get Started Today
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
              <ArrowIcon />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
