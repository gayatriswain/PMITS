"use client";

import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useFitScale } from "../shared/useFitScale";
import { WooBadge } from "./WooHireHero";

const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0f5c56";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type IconProps = { size?: number; color?: string };
const base = (size: number, color: string, strokeWidth = 1.8) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const CartIcon = ({ size = 14, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="M3 4h2.5l2.2 11h10.8l2-8H7" />
    <circle cx="9.5" cy="19" r="1.3" />
    <circle cx="17" cy="19" r="1.3" />
  </svg>
);
const TrendIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...base(size, color, 2)}>
    <path d="m3 17 6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);
const ArrowIcon = ({ size = 16, color = DEEP_TEAL }: IconProps) => (
  <svg {...base(size, color, 2.2)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

/* ---------- Left visual: drawn on a 600×480 canvas and zoomed to fit ---------- */
const CANVAS_W = 600;
const CANVAS_H = 480;
const BLOB =
  "M70 118C64 52 170 22 300 34C430 46 548 58 560 182C572 306 520 424 382 446C244 468 92 452 58 340C36 268 76 196 70 118Z";
const SALES_BARS = [28, 42, 36, 58, 76];

function IntroVisual() {
  const { ref, scale } = useFitScale(CANVAS_W);
  return (
    <div ref={ref} className="relative w-full" style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}` }}>
      <div
        className="absolute left-0 top-0"
        style={{ width: CANVAS_W, height: CANVAS_H, zoom: scale || 1, visibility: scale ? "visible" : "hidden" }}
      >
        {/* Teal outline rings behind the blob */}
        <svg className="absolute inset-0" width={CANVAS_W} height={CANVAS_H} viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`} fill="none" aria-hidden>
          <path d={BLOB} transform="translate(-14 10) scale(1.04)" stroke={TEAL} strokeWidth="2.5" opacity="0.85" />
          <path d={BLOB} transform="translate(8 -6) scale(0.99)" stroke="#99f6e4" strokeWidth="1.2" opacity="0.7" />
        </svg>

        {/* Blob with the developer photo clipped inside */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0"
          style={{ clipPath: `path('${BLOB}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-[#eef3f5] to-slate-200" />
          <div className="absolute left-[20px] top-[48px] w-[560px]">
            <Image
              src="/woo-comm-image1.png"
              alt="WooCommerce developer working on an online store"
              width={588}
              height={424}
              sizes="560px"
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        {/* Dotted grid */}
        <svg className="absolute left-[548px] top-[236px]" width="48" height="96" viewBox="0 0 48 96" aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <circle key={i} cx={6 + (i % 4) * 12} cy={6 + Math.floor(i / 4) * 16} r="2" fill={TEAL} opacity="0.55" />
          ))}
        </svg>

        {/* Woo badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          className="absolute left-[208px] top-[6px] -rotate-6"
        >
          <WooBadge className="h-[52px] w-[92px] shadow-[0_15px_30px_-12px_rgba(127,84,179,0.6)]" text="text-[28px]" />
        </motion.div>

        {/* Built For Performance card */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          className="absolute left-[78px] top-[84px] w-[150px] rounded-xl border border-slate-100 bg-white px-3.5 py-3 shadow-[0_18px_35px_-18px_rgba(15,40,60,0.4)]"
        >
          <p className="flex items-start gap-2 text-[12px] font-bold leading-tight" style={{ color: NAVY }}>
            <span className="mt-px"><CartIcon /></span>
            Built For
            <br />
            Performance
          </p>
          <div className="mt-2 flex items-end justify-between gap-2">
            <p className="text-[10px] leading-snug text-slate-500">
              High speed. Better
              <br />
              experience. More sales.
            </p>
            <TrendIcon size={16} />
          </div>
        </motion.div>

        {/* Sales This Month card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="absolute left-[340px] top-[322px] w-[220px] rounded-2xl border border-slate-100 bg-white px-4 py-3.5 shadow-[0_25px_45px_-18px_rgba(15,40,60,0.45)]"
        >
          <p className="text-[11px] font-medium text-slate-500">Sales This Month</p>
          <div className="mt-1 flex items-end justify-between">
            <div>
              <p className="text-[22px] font-extrabold leading-none" style={{ color: NAVY }}>$48,750</p>
              <p className="mt-1.5 text-[13px] font-bold" style={{ color: TEAL }}>+28.5%</p>
            </div>
            <div className="flex h-[78px] items-end gap-1.5">
              {SALES_BARS.map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: h }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.9 + i * 0.1 }}
                  className="w-[11px] rounded-t-md"
                  style={{ background: `linear-gradient(180deg, ${TEAL}, ${i === SALES_BARS.length - 1 ? DEEP_TEAL : "#99e0d7"})` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function WooIntro() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-14 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Left: visual */}
          <IntroVisual />

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50/70 py-1 pl-1 pr-3.5 text-[11px] font-bold tracking-[0.08em] uppercase"
              style={{ color: DEEP_TEAL }}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white border border-teal-100">
                <CartIcon size={12} />
              </span>
              WooCommerce Experts You Can Trust
            </span>

            <h2
              className="mt-5 text-[34px] sm:text-[42px] lg:text-[46px] font-extrabold leading-[1.12] tracking-tight"
              style={{ color: NAVY }}
            >
              Dedicated
              <br />
              <span style={{ color: TEAL }}>Woo-Commerce</span>
              <br />
              Developers
            </h2>
            <span className="mt-5 block h-[3px] w-14 rounded-full" style={{ backgroundColor: TEAL }} />

            <p className="mt-6 max-w-[520px] text-[14.5px] leading-[1.8] text-slate-600">
              Do you have a WordPress website that you want to convert into an online store? Have you heard a lot about
              ecommerce plugin WooCommerce and have a desire to use it to add ecommerce functionality to your website? If
              yes, then you have come to the right place.
            </p>
            <p className="mt-4 max-w-[520px] text-[14.5px] leading-[1.8] text-slate-600">
              We are <span className="font-semibold" style={{ color: TEAL }}>ProManage IT Solution</span>, the most respected
              name in the world of WooCommerce.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 rounded-full py-2 pl-2 pr-7 text-[13.5px] font-bold uppercase tracking-[0.06em] text-white shadow-[0_15px_30px_-12px_rgba(13,148,136,0.7)] transition hover:-translate-y-0.5"
                style={{ background: `linear-gradient(90deg, ${DEEP_TEAL}, ${TEAL})` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
                Get My Free Proposal
              </Link>
              <div className="flex items-center gap-2.5">
                <svg width="30" height="14" viewBox="0 0 30 14" fill="none" aria-hidden>
                  <path d="M2 7h26M7 2 2 7l5 5M23 2l5 5-5 5" stroke={NAVY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className={`${caveat.className} text-[19px] leading-[1.1]`} style={{ color: NAVY }}>
                  Let&apos;s build your store
                  <br />
                  the{" "}
                  <span className="relative inline-block">
                    right
                    <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full" style={{ backgroundColor: TEAL }} />
                  </span>{" "}
                  way!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
