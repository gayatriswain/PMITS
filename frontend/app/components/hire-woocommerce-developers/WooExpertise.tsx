"use client";

import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useFitScale } from "../shared/useFitScale";
import { WooBadge } from "./WooHireHero";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const PURPLE_LINE = "#9b7cc7";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.6) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ---------- Service icons ---------- */
const MigrateIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="2.5" y="3.5" width="15" height="12" rx="1.5" />
    <path d="M2.5 7h15M5 5.2h.01M7 5.2h.01" />
    <path d="M13 13.5h2l1.2 5.5h4.5l1-4h-6" />
    <circle cx="17" cy="21" r=".8" />
    <circle cx="20.5" cy="21" r=".8" />
  </svg>
);
const ThemeIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="2.5" y="4" width="17" height="12" rx="1.5" />
    <path d="M8 20h6M11 16v4M6 8h5M6 11h3" />
    <path d="m21.5 3-6 7-1.5.5.5-1.5 6-7Z" />
  </svg>
);
const SupportIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => {
  const $t = useCmsText();
  return ((
  <svg {...base(size, color)}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="12" width="4" height="6" rx="1.5" />
    <rect x="17.5" y="12" width="4" height="6" rx="1.5" />
    <path d="M19.5 18a3 3 0 0 1-3 3H14" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill={color} stroke="none">{$t("WooExpertise__t1", "24")}</text>
  </svg>
));
};
const WebAppIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="2.5" y="3.5" width="17" height="14" rx="1.5" />
    <path d="M2.5 7h17M8 10.5 6 12.5l2 2M12 10.5l2 2-2 2" />
    <circle cx="18.5" cy="18.5" r="2.5" />
    <path d="M18.5 14.8v1.2M18.5 21v1.2M14.8 18.5H16M21 18.5h1.2" />
  </svg>
);
const PsdIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => {
  const $t = useCmsText();
  return ((
  <svg {...base(size, color)}>
    <path d="M13.5 2.5H5a1 1 0 0 0-1 1v17a1 1 0 0 0 1 1h8" />
    <path d="M13.5 2.5 18 7v3M13.5 2.5V7H18" />
    <text x="8.5" y="14" textAnchor="middle" fontSize="5" fontWeight="800" fill={color} stroke="none">{$t("WooExpertise__t2", "PSD")}</text>
    <rect x="13" y="13" width="9" height="8" rx="1" />
    <path d="m13.5 20 3-3 2 2 1.5-1.5 2 2" />
  </svg>
));
};
const PluginIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4h-4a2 2 0 1 0-4 0H4v-4a2 2 0 1 0 0-4Z" />
    <circle cx="19" cy="5" r="3" />
    <path d="M19 3.6v2.8M17.6 5h2.8" />
  </svg>
);
const PaymentIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <rect x="2.5" y="5" width="16" height="11" rx="1.5" />
    <path d="M2.5 8.5h16M5.5 12.5h4" />
    <path d="M18 12.5 22 14v2.7c0 2.3-1.7 3.7-4 4.6-2.3-.9-4-2.3-4-4.6V14Z" fill="#fff" />
    <path d="m16.4 17 1.2 1.1 2-2.1" />
  </svg>
);
const ShippingIcon = ({ size = 30, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M7 11.5S3 7.8 3 5a4 4 0 0 1 8 0c0 2.8-4 6.5-4 6.5Z" />
    <circle cx="7" cy="5" r="1.4" />
    <path d="M10 13h7v6h-7ZM17 15h2.5l2 2v2H17" />
    <circle cx="12.5" cy="20" r="1.3" />
    <circle cx="19" cy="20" r="1.3" />
  </svg>
);

/* ---------- Strip icons ---------- */
const ShieldIcon = ({ size = 34, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const RocketIcon = ({ size = 34, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
  </svg>
);
const GrowthIcon = ({ size = 34, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M4 21h17" />
    <rect x="5" y="15" width="3" height="4" rx="0.6" />
    <rect x="10.5" y="12" width="3" height="7" rx="0.6" />
    <rect x="16" y="9" width="3" height="10" rx="0.6" />
    <path d="m4 11 5-4 4 2.5L20 3M16 3h4v4" />
  </svg>
);
const HeadsetIcon = ({ size = 34, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 1.5)}>
    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.5" />
    <rect x="17" y="13" width="4" height="6" rx="1.5" />
    <path d="M19 19a3 3 0 0 1-3 3h-3" />
  </svg>
);

const SERVICES__cms = [
  { Icon: MigrateIcon, title: ["Swift migration to", "WooCommerce platform"] },
  { Icon: ThemeIcon, title: ["Theme development for", "WooCommerce platform"] },
  { Icon: SupportIcon, title: ["Full support and maintenance", "on WooCommerce platform"] },
  { Icon: WebAppIcon, title: ["Web application", "development"] },
  { Icon: PsdIcon, title: ["PSD files converted to a", "fabulous WooCommerce website"] },
  { Icon: PluginIcon, title: ["Customized plugin", "development"] },
  { Icon: PaymentIcon, title: ["Integration of payment", "gateway into your website"] },
  { Icon: ShippingIcon, title: ["Development of", "shipping methods"] },
];

const PROMISES__cms = [
  { Icon: ShieldIcon, title: "Secure & Reliable", desc: "Your store is in safe hands." },
  { Icon: RocketIcon, title: "High Performance", desc: "Built for speed and growth." },
  { Icon: GrowthIcon, title: "Scalable for Business Growth", desc: "Solutions that grow with your business." },
  { Icon: HeadsetIcon, title: "Always Here to Support", desc: "We're here anytime you need us." },
];

/* ---------- Desktop diagram: 1200×540 canvas ---------- */
const CANVAS_W = 1200;
const CANVAS_H = 540;
const HUB = { x: 600, y: 260, r: 160 };
// Scale of the hub artwork (cart, window, tiles) inside the ring
const HUB_ART_SCALE = 0.8;
const ROW_Y = [80, 200, 320, 440];
// Where each left connector meets the ring (right side is mirrored)
const LEFT_END = ROW_Y.map((y) => {
  const dy = (y - HUB.y) * 0.75;
  return { x: Math.round(HUB.x - Math.sqrt(HUB.r * HUB.r - dy * dy)), y: Math.round(HUB.y + dy) };
});
// Connector paths: from the text block to the hub's outer ring
const PATHS = [
  ...ROW_Y.map((y, i) => {
    const e = LEFT_END[i];
    return `M330 ${y} C ${330 + (e.x - 330) * 0.55} ${y}, ${e.x - (e.x - 330) * 0.45} ${e.y}, ${e.x} ${e.y}`;
  }),
  ...ROW_Y.map((y, i) => {
    const e = { x: CANVAS_W - LEFT_END[i].x, y: LEFT_END[i].y };
    const sx = CANVAS_W - 330;
    return `M${sx} ${y} C ${sx - (sx - e.x) * 0.55} ${y}, ${e.x + (sx - e.x) * 0.45} ${e.y}, ${e.x} ${e.y}`;
  }),
];
const ENDS = [...LEFT_END, ...LEFT_END.map((e) => ({ x: CANVAS_W - e.x, y: e.y }))];

const HUB_IN = 0.2;
const LINE_START = 0.7;
const LINE_STEP = 0.18;
const LINE_DUR = 0.7;
// Order the 8 connectors so they appear alternating left/right, top to bottom
const ORDER = [0, 4, 1, 5, 2, 6, 3, 7];
const delayFor = (i: number) => LINE_START + ORDER.indexOf(i) * LINE_STEP;

const lineV: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: LINE_DUR, delay: delayFor(i), ease: "easeInOut" }, opacity: { duration: 0.01, delay: delayFor(i) } },
  }),
};
const endDotV: Variants = {
  hidden: { scale: 0 },
  show: (i: number) => ({ scale: [0, 1.6, 1], transition: { duration: 0.45, delay: delayFor(i) + LINE_DUR - 0.1 } }),
};
const startDotV: Variants = {
  hidden: { scale: 0 },
  show: (i: number) => ({ scale: 1, transition: { duration: 0.3, delay: delayFor(i) } }),
};
const itemV: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: i < 4 ? -24 : 24 }),
  show: (i: number) => ({ opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE, delay: delayFor(i) } }),
};

function ServiceItem({ i }: { i: number }) {
  const SERVICES = useCmsData("WooExpertise__SERVICES", SERVICES__cms);
  const s = SERVICES[i];
  return (
    <div className="flex items-center gap-4">
      <span className="group relative flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full bg-white shadow-[0_14px_30px_-16px_rgba(15,40,60,0.4)] ring-1 ring-slate-100 transition-transform duration-300 hover:scale-105">
        <span className="absolute inset-[6px] rounded-full border border-dashed border-teal-100" />
        <s.Icon />
      </span>
      <div>
        <p className="text-body font-extrabold" style={{ color: TEAL }}>{String(i + 1).padStart(2, "0")}</p>
        <p className="text-small font-semibold" style={{ color: NAVY }}>
          {s.title[0]}
          <br />
          {s.title[1]}
        </p>
      </div>
    </div>
  );
}

function CartArt() {
  return (
    <svg viewBox="0 0 160 130" className="h-full w-full drop-shadow-[0_14px_14px_rgba(13,94,86,0.25)]" aria-hidden>
      <defs>
        <linearGradient id="weCart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f5c56" />
        </linearGradient>
      </defs>
      <path d="M6 14h22l18 74h86" fill="none" stroke="url(#weCart)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 32h118l-14 46H44Z" fill="url(#weCart)" />
      <g stroke="#e6fffb" strokeWidth="3" opacity="0.9">
        <path d="M40 48h104M44 63h96" />
        <path d="M62 34l4 42M86 34v42M110 34l-4 42M132 34l-8 42" />
      </g>
      <circle cx="58" cy="108" r="11" fill="#0f3d3a" />
      <circle cx="58" cy="108" r="4.5" fill="#99f6e4" />
      <circle cx="118" cy="108" r="11" fill="#0f3d3a" />
      <circle cx="118" cy="108" r="4.5" fill="#99f6e4" />
    </svg>
  );
}

function Hub() {
  const size = HUB.r * 2;
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE, delay: HUB_IN } },
      }}
      className="absolute"
      style={{ left: HUB.x - HUB.r, top: HUB.y - HUB.r, width: size, height: size }}
    >
      {/* soft white glow (no hard edge) */}
      <div
        className="absolute inset-[-10px] rounded-full"
        style={{ background: "radial-gradient(circle, #ffffff 0%, #ffffff 48%, rgba(255,255,255,0.75) 62%, rgba(255,255,255,0) 72%)" }}
      />
      <div className="absolute inset-[70px] rounded-full shadow-[0_40px_70px_-30px_rgba(13,94,86,0.35)]" />

      {/* single dashed ring that fades toward the bottom, slowly rotating */}
      <motion.svg
        className="absolute inset-0 overflow-visible"
        viewBox={`0 0 ${size} ${size}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="weRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={TEAL} stopOpacity="0.9" />
            <stop offset="55%" stopColor={TEAL} stopOpacity="0.35" />
            <stop offset="100%" stopColor={TEAL} stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <circle cx={HUB.r} cy={HUB.r} r={HUB.r - 1} fill="none" stroke="url(#weRing)" strokeWidth="1.4" strokeDasharray="4 6" />
      </motion.svg>

      {/* hub artwork, scaled down around the centre */}
      <div className="absolute inset-0" style={{ transform: `scale(${HUB_ART_SCALE})`, transformOrigin: "50% 50%" }}>
      <div className="absolute" style={{ left: HUB.r - 200, top: HUB.r - 200, width: 400, height: 400 }}>
      {/* browser window behind the cart */}
      <div className="absolute left-[64px] top-[118px] h-[170px] w-[272px] rounded-2xl border border-slate-200/70 bg-white/70 p-3 shadow-[0_20px_40px_-30px_rgba(15,40,60,0.35)]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: i === 0 ? "#5eead4" : "#cbd5e1" }} />)}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 opacity-70">
          {Array.from({ length: 8 }).map((_, i) => <span key={i} className="h-[46px] rounded-md bg-slate-100" />)}
        </div>
      </div>

      {/* Woo badge + stem to the cart */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[160px] top-[86px] flex flex-col items-center"
      >
        <WooBadge className="h-[46px] w-[82px] rounded-[10px] shadow-[0_8px_0_#5b3a8c]" text="text-[25px]" />
        <span className="mt-2.5 h-[22px] w-[2px] rounded-full" style={{ backgroundColor: PURPLE_LINE }} />
      </motion.div>

      {/* cart */}
      <div className="absolute left-[112px] top-[158px] h-[146px] w-[180px]"><CartArt /></div>

      {/* check tile */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        className="absolute left-[72px] top-[256px] flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-[0_14px_22px_-8px_rgba(13,94,86,0.6)]"
        style={{ backgroundColor: TEAL }}
      >
        <svg {...base(24, "#fff", 2.6)}><path d="m5 12 4.5 4.5L19 7" /></svg>
      </motion.span>

      {/* stars pill */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        className="absolute left-[262px] top-[232px] flex items-center gap-1 rounded-lg bg-white px-2.5 py-2 shadow-[0_12px_22px_-10px_rgba(15,40,60,0.45)] ring-1 ring-slate-100"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={DEEP_TEAL}>
            <path d="M12 2.5 14.9 8.6 21.5 9.3 16.6 13.8 18 20.4 12 17 6 20.4 7.4 13.8 2.5 9.3 9.1 8.6Z" />
          </svg>
        ))}
      </motion.span>

      {/* chart card */}
      <motion.span
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute left-[222px] top-[300px] flex h-[58px] w-[78px] items-end justify-center gap-1.5 rounded-xl bg-white pb-2.5 shadow-[0_14px_24px_-10px_rgba(15,40,60,0.45)] ring-1 ring-slate-100"
      >
        {[12, 18, 25, 32].map((h) => <span key={h} className="w-[7px] rounded-sm" style={{ height: h, backgroundColor: TEAL }} />)}
      </motion.span>
      </div>
      </div>
    </motion.div>
  );
}

function ExpertiseDiagram() {
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* connectors */}
        <svg className="absolute inset-0" width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} fill="none" aria-hidden>
          {PATHS.map((d, i) => (
            <g key={i}>
              <motion.path d={d} variants={lineV} custom={i} stroke="#b8c2cd" strokeWidth="1.2" strokeLinecap="round" />
              {/* small teal dot at the service end */}
              <motion.circle
                cx={i < 4 ? 330 : CANVAS_W - 330}
                cy={ROW_Y[i % 4]}
                r="3"
                fill={TEAL}
                variants={startDotV}
                custom={i}
              />
            </g>
          ))}
        </svg>

        <Hub />

        {/* pointers where each line meets the ring */}
        <svg className="pointer-events-none absolute inset-0" width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} fill="none" aria-hidden>
          {ENDS.map((e, i) => (
            <motion.g key={i} variants={endDotV} custom={i} style={{ transformOrigin: `${e.x}px ${e.y}px` }}>
              <circle cx={e.x} cy={e.y} r="9" fill={TEAL} opacity="0.15" />
              <circle cx={e.x} cy={e.y} r="5.5" fill="#fff" stroke={TEAL} strokeWidth="2" />
              <circle cx={e.x} cy={e.y} r="2.4" fill={NAVY} />
            </motion.g>
          ))}
        </svg>

        {/* left items */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} variants={itemV} custom={i} className="absolute left-0 -translate-y-1/2" style={{ top: ROW_Y[i] }}>
            <ServiceItem i={i} />
          </motion.div>
        ))}
        {/* right items */}
        {[4, 5, 6, 7].map((i) => (
          <motion.div
            key={i}
            variants={itemV}
            custom={i}
            className="absolute -translate-y-1/2"
            style={{ top: ROW_Y[i - 4], left: CANVAS_W - 330 + 22 }}
          >
            <ServiceItem i={i} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function WooExpertise() {
  const $t = useCmsText();
  const SERVICES = useCmsData("WooExpertise__SERVICES", SERVICES__cms);
  const PROMISES = useCmsData("WooExpertise__PROMISES", PROMISES__cms);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f8fcfb] to-[#eef8f6] pt-14 pb-16 sm:pt-16 lg:pt-20">
      {/* dotted corner accents */}
      <svg className="pointer-events-none absolute left-6 top-10 opacity-50" width="90" height="70" viewBox="0 0 90 70" aria-hidden>
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={i} cx={5 + (i % 6) * 16} cy={5 + Math.floor(i / 6) * 14} r="1.8" fill="#cbd5e1" />
        ))}
      </svg>
      {/* teal waves at the bottom */}
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none" aria-hidden>
        <path d="M0 90C240 40 420 140 720 100S1200 30 1440 80V160H0Z" fill="#d7f1ec" opacity="0.7" />
        <path d="M0 120C300 80 520 160 820 125S1240 70 1440 110V160H0Z" fill="#c2ebe4" opacity="0.6" />
      </svg>

      <Container>
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="relative mx-auto flex max-w-[900px] flex-col items-center text-center"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.12em]"
            style={{ color: DEEP_TEAL }}
          >
            <span className="h-px w-12 bg-teal-400" />
            <span className="h-1.5 w-1.5 rotate-45 bg-teal-500" />
            {html($t("WooExpertise__t3", "Our WooCommerce Expertise"))}<span className="h-1.5 w-1.5 rotate-45 bg-teal-500" />
            <span className="h-px w-12 bg-teal-400" />
          </motion.div>
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            className="text-h2 mt-4 font-extrabold tracking-tight"
            style={{ color: NAVY }}
          >
            {$t("WooExpertise__t4", "What you can expect from our")}</motion.h2>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            className={`${caveat.className} relative mt-1 text-[44px] sm:text-[58px] lg:text-[68px] font-bold leading-none`}
            style={{ color: TEAL }}
          >
            {rich($t("WooExpertise__t5", "WooCommerce developers"))}<svg className="pointer-events-none absolute -right-9 -top-1 hidden sm:block" width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden>
              <path d="M5 22 13 15M15 19l13-4M12 9l3-7" stroke={TEAL} strokeWidth="2.4" strokeLinecap="round" />
            </svg>
            <svg className="pointer-events-none absolute -bottom-4 left-[16%] h-4 w-[70%]" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden>
              <motion.path
                d="M3 12C90 2 210 2 297 8"
                fill="none"
                stroke={TEAL}
                strokeWidth="3.5"
                strokeLinecap="round"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease: "easeInOut", delay: 0.4 } } }}
              />
            </svg>
          </motion.p>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
            className="text-body mt-9 max-w-[560px] text-slate-600"
          >
            {rich($t("WooExpertise__t6", "End-to-end solutions tailored to your business needs to create powerful, secure & high-performing online stores."))}</motion.p>
        </motion.div>

        {/* Diagram (desktop) */}
        <div className="relative mt-8 hidden lg:block">
          <ExpertiseDiagram />
        </div>

        {/* Simple list (mobile / tablet) */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden"
        >
          {SERVICES.map((_, i) => (
            <motion.li
              key={i}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            >
              <ServiceItem i={i} />
            </motion.li>
          ))}
        </motion.ul>

        {/* Promise strip */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="relative mx-auto mt-10 grid max-w-[1080px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-[24px] bg-white/95 px-4 py-2 shadow-[0_25px_55px_-30px_rgba(13,94,86,0.45)] ring-1 ring-teal-50"
        >
          {PROMISES.map((p, i) => (
            <motion.li
              key={p.title}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              className={`flex items-center gap-4 px-5 py-5 ${i > 0 ? "lg:border-l lg:border-slate-100" : ""}`}
            >
              <p.Icon />
              <div>
                <p className="text-small font-bold" style={{ color: DEEP_TEAL }}>{p.title}</p>
                <p className="text-caption mt-0.5 text-slate-500">{p.desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
