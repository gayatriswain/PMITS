"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Container from "./Container";
import { useFitScale } from "./useFitScale";

const NAVY = "#132a43";
const PURPLE = "#7f54b3";
const PURPLE_DARK = "#5b3a8c";
const PURPLE_SOFT = "#f3edfa";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
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

const WpIcon = ({ size = 16, color = "#fff" }: IconProps) => (
  <svg {...base(size, color, 1.8)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="m6 8.5 3.2 9 2.8-7 2.8 7 3.2-9M5 8.5h3M10.5 8.5h3M16 8.5h3" />
  </svg>
);
const CartIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 1.9)}>
    <path d="M3 4h2.5l2.2 11h10.8l2-8H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="17" cy="19" r="1.3" />
  </svg>
);
const TrendIcon = ({ size = 30, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);
const UsersIcon = ({ size = 18, color = PURPLE }: IconProps) => (
  <svg {...base(size, color, 1.9)}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14.2c2.6.5 4.5 2.8 4.5 5.8" />
  </svg>
);
const BoxIcon = ({ size = 22, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9Z" />
    <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
  </svg>
);
const RocketIcon = ({ size = 22, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);
const ShieldIcon = ({ size = 22, color = PURPLE }: IconProps) => (
  <svg {...base(size, color)}>
    <path d="M12 3 19.5 6V11.5C19.5 16.8 16 20 12 21.5 8 20 4.5 16.8 4.5 11.5V6Z" />
    <path d="m8.7 12.2 2.2 2.1 4.4-4.8" />
  </svg>
);
const Star = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="#f5b301">
    <path d="M12 2.5 14.9 8.6 21.5 9.3 16.6 13.8 18 20.4 12 17 6 20.4 7.4 13.8 2.5 9.3 9.1 8.6Z" />
  </svg>
);

const FEATURES = [
  { Icon: BoxIcon, title: "Scalable Stores", desc: "Grow Without Limits" },
  { Icon: RocketIcon, title: "Higher Sales", desc: "Smart Shopping Experience" },
  { Icon: UsersIcon, title: "Happy Customers", desc: "Trust & Loyalty" },
  { Icon: ShieldIcon, title: "Secure & Reliable", desc: "Built for Business" },
];

/* ---------- Product illustrations for the store mockup ---------- */
export function Handbag() {
  return (
    <svg viewBox="0 0 80 70" className="h-full w-full" aria-hidden>
      <path d="M26 24c0-10 6-16 14-16s14 6 14 16" fill="none" stroke="#8a5a3b" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M12 26h56l-5 38H17Z" fill="#c8956b" />
      <path d="M12 26h56l-1 8H13Z" fill="#b5835b" />
      <rect x="35" y="36" width="10" height="6" rx="1.5" fill="#e6c18f" />
    </svg>
  );
}
export function Watch() {
  return (
    <svg viewBox="0 0 40 60" className="h-full w-full" aria-hidden>
      <rect x="13" y="2" width="14" height="56" rx="5" fill="#2b2f36" />
      <rect x="8" y="17" width="24" height="26" rx="7" fill="#1b1e23" />
      <rect x="11" y="20" width="18" height="20" rx="5" fill="#3a4250" />
    </svg>
  );
}
export function ShoppingBag() {
  return (
    <svg viewBox="0 0 120 130" className="h-full w-full drop-shadow-[0_18px_20px_rgba(91,58,140,0.35)]" aria-hidden>
      <defs>
        <linearGradient id="wpBagFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b58ce6" />
          <stop offset="100%" stopColor="#7f54b3" />
        </linearGradient>
        <linearGradient id="wpBagSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8f63c4" />
          <stop offset="100%" stopColor="#5b3a8c" />
        </linearGradient>
      </defs>
      <path d="M38 40c0-18 8-28 20-28s20 10 20 28" fill="none" stroke="#5b3a8c" strokeWidth="5" strokeLinecap="round" />
      <path d="M86 36 104 44 100 118 84 124Z" fill="url(#wpBagSide)" />
      <path d="M18 36h68l-2 88H14Z" fill="url(#wpBagFront)" />
      <path d="M18 36h68l-1 10H17Z" fill="#c9a6ef" opacity="0.6" />
    </svg>
  );
}

export function CardboardBox() {
  return (
    <svg viewBox="0 0 110 100" className="h-full w-full drop-shadow-[0_16px_18px_rgba(90,60,30,0.3)]" aria-hidden>
      <path d="M8 34 55 20 102 34 55 48Z" fill="#e2b77f" />
      <path d="M8 34 55 48v48L8 82Z" fill="#c9965c" />
      <path d="M55 48 102 34v48L55 96Z" fill="#b5824b" />
      <path d="M30 27 77 41v10l-8 2V44L22 30Z" fill="#f0d3a6" opacity="0.8" />
    </svg>
  );
}

/* ---------- Left visual: 620×440 canvas, zoomed to fit ---------- */
const CANVAS_W = 620;
const CANVAS_H = 440;

function PoweredVisual() {
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* Laptop store mockup with Woo badge, bag and box */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute left-[64px] top-[30px] w-[556px]"
        >
          <Image
            src="/WooCommerce1.webp"
            alt="WooCommerce online store on a laptop"
            width={1503}
            height={1047}
            sizes="(min-width: 1024px) 620px, 100vw"
            className="h-auto w-full"
          />
        </motion.div>

        {/* More Sales card */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          className="absolute left-[14px] top-[96px] flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-[0_18px_35px_-18px_rgba(30,20,60,0.4)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: PURPLE_SOFT }}>
            <CartIcon />
          </span>
          <div className="leading-tight">
            <p className="text-[12px] font-bold" style={{ color: NAVY }}>More Sales</p>
            <p className="text-[9.5px] text-slate-500">Higher Conversions</p>
          </div>
          <TrendIcon />
        </motion.div>

        {/* Happy Customers card */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
          className="absolute left-[30px] top-[214px] flex items-center gap-2.5 rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-[0_18px_35px_-18px_rgba(30,20,60,0.4)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: PURPLE_SOFT }}>
            <UsersIcon />
          </span>
          <div className="leading-tight">
            <p className="text-[12px] font-bold" style={{ color: NAVY }}>
              Happy
              <br />
              Customers
            </p>
            <p className="mt-0.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function WooPowered() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-white via-[#fbf9fe] to-[#f5f0fb] py-14 sm:py-16 lg:py-20">
      {/* decorative curves, top right */}
      <svg className="pointer-events-none absolute right-0 top-0 h-56 w-72 opacity-60" viewBox="0 0 280 220" fill="none" aria-hidden>
        <path d="M60 0C90 90 180 120 280 110" stroke="#d9c6f2" strokeWidth="1.5" />
        <path d="M120 0C140 60 200 80 280 70" stroke="#e7dbf7" strokeWidth="1.2" />
      </svg>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-12 items-center">
          <PoweredVisual />

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-purple-100 py-1 pl-1 pr-3.5 text-[12.5px] font-semibold"
              style={{ backgroundColor: PURPLE_SOFT, color: PURPLE_DARK }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: PURPLE }}>
                <WpIcon size={14} />
              </span>
              WooCommerce Powered
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold leading-[1.15] tracking-tight"
              style={{ color: NAVY }}
            >
              Build Powerful Online Stores
              <br />
              with{" "}
              <span className="relative inline-block" style={{ color: PURPLE }}>
                WooCommerce
                <svg className="pointer-events-none absolute -bottom-2.5 left-0 h-3 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M3 9C60 3 140 2 197 6" fill="none" stroke={PURPLE} strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-7 max-w-[600px] text-[14.5px] leading-[1.8] text-slate-600">
              If WooCommerce is creating a buzz because of its ability as an ecommerce plugin, the developers at ProManage IT
              Solution are regarded as the best WooCommerce developers. We have a long list of happy and satisfied clients
              enjoying high amount of sales from their ecommerce websites with our help.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 max-w-[600px] text-[14.5px] leading-[1.8] text-slate-600">
              With your WooCommerce enabled WordPress website, you will be able to handle large amount of traffic and sales.
            </motion.p>

            <motion.ul variants={stagger} className="mt-8 grid grid-cols-2 xl:grid-cols-4 gap-3">
              {FEATURES.map((f) => (
                <motion.li
                  key={f.title}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 rounded-xl border border-purple-100/70 bg-white/80 px-3 py-3 shadow-[0_12px_25px_-20px_rgba(91,58,140,0.5)] transition hover:-translate-y-0.5 hover:border-purple-200"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: PURPLE_SOFT }}>
                    <f.Icon />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[12.5px] font-bold" style={{ color: NAVY }}>{f.title}</span>
                    <span className="mt-0.5 block text-[10.5px] text-slate-500">{f.desc}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
