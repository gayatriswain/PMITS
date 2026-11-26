"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../shared/Container";
import { BC, CtaStrip, Eyebrow, Icon, Icon3D, ScreenOverlay, Sneaker, ease, fadeUp, heading, useSeen, useWidth, type Glyph3D } from "./BigCommerceShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const LAP_QUAD: [[number, number], [number, number], [number, number], [number, number]] = [[498, 250], [1072, 132], [1042, 692], [460, 700]];
const IW = BC.laptop.w, IH = BC.laptop.h;

const leftF__cms: { title: string; text: string; g: Glyph3D }[] = [
  { title: "Launch Faster", text: "Get your store up and running quickly with built-in features and ready-to-go tools.", g: "rocket" },
  { title: "Sell More", text: "Powerful marketing, SEO, and conversion tools help you attract more customers and boost sales.", g: "chart" },
  { title: "Scale Without Limits", text: "Handle more traffic, more orders, and more growth — without slowing down.", g: "globe" },
];
const rightF__cms: { title: string; text: string; g: Glyph3D }[] = [
  { title: "Enterprise Security", text: "Keep your business and customer data safe with industry-leading security and compliance.", g: "shield" },
  { title: "Work Your Way", text: "Flexible APIs and integrations let you connect the tools that work for you.", g: "puzzle" },
  { title: "Support You Can Rely On", text: "24/7 expert support from a team that’s here to help you succeed, every step of the way.", g: "headset" },
];

function Storefront() {
  const $t = useCmsText();
  const reduce = useReducedMotion();
  return (
    <div className="h-full w-full bg-white px-8 py-6">
      <div className="flex items-center justify-between">
        <p className={`text-body ${heading.className} font-bold tracking-tight text-[#0d1b45]`}><span className="font-extrabold">{$t("BigCommerceGrowth__t1", "BIG")}</span>{rich($t("BigCommerceGrowth__t2", "COMMERCE"))}</p>
        <div className="flex items-center gap-6 text-[15px] text-slate-600">
          <span>{$t("BigCommerceGrowth__t3", "Shop")}</span><span>{$t("BigCommerceGrowth__t4", "New in")}</span><span>{$t("BigCommerceGrowth__t5", "Best Sellers")}</span>
          <Icon name="cart" className="h-6 w-6 text-[#0d1b45]" />
        </div>
      </div>
      <div className="mt-12 flex items-center">
        <div className="w-[44%]">
          <p className={`${heading.className} text-[40px] font-bold italic leading-[1.1] text-[#0d1b45]`}>{rich($t("BigCommerceGrowth__t6", "Elevate Your"))}<br />{rich($t("BigCommerceGrowth__t7", "Store."))}</p>
          <span className="mt-6 inline-block rounded-full bg-[#2348e6] px-6 py-2.5 text-[15px] font-semibold text-white">{$t("BigCommerceGrowth__t8", "Shop Now")}</span>
        </div>
        <motion.div className="flex-1" animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-6, -3, -6] }} transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}>
          <Sneaker className="w-full" />
        </motion.div>
      </div>
    </div>
  );
}

function FeatureItem({ f, i, side }: { f: (typeof leftF__cms)[number]; i: number; side: "l" | "r" }) {
  return (
    <motion.li
      variants={fadeUp}
      custom={i * 0.5 + (side === "r" ? 0.3 : 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="group relative flex items-start gap-5"
    >
      <span className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
        <Icon3D g={f.g} size={84} />
      </span>
      <span className="pt-2">
        <span className={`${heading.className} block text-[17px] font-semibold text-[#0b1a4a]`}>{f.title}</span>
        <span className="mt-1.5 block text-[13.5px] leading-relaxed text-slate-600">{f.text}</span>
      </span>
      {/* connector towards the laptop */}
      <span aria-hidden className={`absolute top-[42px] hidden h-px w-10 border-t border-dashed border-[#2348e6]/40 xl:block ${side === "l" ? "-right-12" : "-left-12"}`}>
        <span className={`absolute -top-[3.5px] h-[7px] w-[7px] rounded-full bg-[#0d8f9a] ${side === "l" ? "-right-1" : "-left-1"}`} />
      </span>
    </motion.li>
  );
}

export default function BigCommerceGrowth() {
  const $t = useCmsText();
  const leftF = useCmsData("BigCommerceGrowth__leftF", leftF__cms);
  const rightF = useCmsData("BigCommerceGrowth__rightF", rightF__cms);
  const reduce = useReducedMotion();
  const [boxRef, boxW] = useWidth<HTMLDivElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const seen = useSeen(stageRef, 0.25);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f9fe] via-[#f3f6fd] to-[#eef3fc] py-12 sm:py-16">
      <Container className="relative">
        <div className="mx-auto max-w-[860px] text-center">
          <Eyebrow variant="line" className="tracking-[0.3em]">{$t("BigCommerceGrowth__t9", "The BigCommerce difference")}</Eyebrow>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className={`text-h2 ${heading.className} mt-5 font-bold tracking-tight text-[#0b1a4a]`}
          >
            {$t("BigCommerceGrowth__t10", "Built for ")}<span className="text-[#2348e6]">{$t("BigCommerceGrowth__t11", "Growth.")}</span>
            <br />
            {$t("BigCommerceGrowth__t12", "Designed for ")}<span className="bg-gradient-to-r from-[#0d8f9a] to-[#14b1b8] bg-clip-text text-transparent">{$t("BigCommerceGrowth__t13", "Results.")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mx-auto mt-5 max-w-[620px] text-slate-600">
            {rich($t("BigCommerceGrowth__t14", "BigCommerce combines enterprise-grade features with unmatched flexibility so you can focus on what matters most—"))}<span className="font-semibold text-[#2348e6]">{$t("BigCommerceGrowth__t15", "growing your business.")}</span>
          </motion.p>
        </div>

        <div className="mt-10 grid items-center gap-10 xl:grid-cols-[1fr_1.65fr_1fr] xl:gap-10">
          <ul className="order-2 space-y-8 xl:order-1">
            {leftF.map((f, i) => <FeatureItem key={f.title} f={f} i={i} side="l" />)}
          </ul>

          {/* laptop */}
          <div ref={stageRef} className="order-1 xl:order-2">
            <div ref={boxRef} className="relative mx-auto aspect-[1543/1019] w-full max-w-[720px] 2xl:max-w-[820px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={seen ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 1, ease }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_55%_55%_at_50%_50%,black_75%,transparent_100%)]">
                  <Image src={BC.laptop.src} alt={$t("BigCommerceGrowth__t16", "Growing BigCommerce storefront on a laptop")} fill sizes="(min-width:1280px) 640px, 92vw" className="object-contain" />
                </div>
                <ScreenOverlay imgW={IW} quad={LAP_QUAD} boxW={620} boxH={480} scale={boxW}>
                  <Storefront />
                </ScreenOverlay>
              </motion.div>

              {/* rising arrow */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${IW} ${IH}`} fill="none" aria-hidden>
                <defs>
                  <linearGradient id="bcArrow" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0" stopColor="#1d3fd8" />
                    <stop offset="0.6" stopColor="#2f7cf6" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                  <filter id="bcArrowGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                </defs>
                <motion.path
                  d="M560 840 C 820 820, 1000 640, 1120 330"
                  stroke="#60a5fa"
                  strokeOpacity="0.45"
                  strokeWidth="60"
                  strokeLinecap="round"
                  filter="url(#bcArrowGlow)"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={seen ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                />
                <motion.path
                  d="M560 840 C 820 820, 1000 640, 1120 330"
                  stroke="url(#bcArrow)"
                  strokeWidth="46"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={seen ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                />
                <motion.path
                  d="M1040 330 L1150 200 L1215 360 Z"
                  fill="#22d3ee"
                  initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                  animate={seen ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ delay: 1.9, duration: 0.4 }}
                  style={{ transformOrigin: "1130px 300px" }}
                />
              </svg>

              {/* floating "Total Sales" card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={seen ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 1.1, duration: 0.7, ease }}
                className="absolute left-[6%] top-[52%] w-[21%]"
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-xl border border-white bg-white/90 p-[6%] shadow-[0_18px_36px_-18px_rgba(35,72,230,0.6)] backdrop-blur"
                >
                  <p className="text-[clamp(7px,0.7vw,10px)] text-slate-500">{rich($t("BigCommerceGrowth__t17", "Total Sales"))}</p>
                  <p className={`${heading.className} text-[clamp(11px,1.2vw,17px)] font-bold text-[#0b1a4a]`}>{rich($t("BigCommerceGrowth__t18", "$58,645"))}</p>
                  <p className="text-[clamp(7px,0.65vw,9px)] font-semibold text-emerald-600">{rich($t("BigCommerceGrowth__t19", "▲ 23%"))}</p>
                  <svg viewBox="0 0 80 28" className="mt-1 w-full" aria-hidden>
                    <motion.path
                      d="M0 24 L12 20 L22 22 L34 12 L46 16 L58 6 L70 10 L80 2"
                      stroke="#2348e6"
                      strokeWidth="2"
                      fill="none"
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={seen ? { pathLength: 1 } : undefined}
                      transition={{ delay: 1.5, duration: 1.2 }}
                    />
                  </svg>
                </motion.div>
              </motion.div>

              {/* small floating bubbles */}
              {[
                { cls: "left-[18%] top-[10%]", icon: "chart" as const, d: 0 },
                { cls: "right-[14%] top-[13%]", icon: "users" as const, d: 0.8 },
              ].map((b) => (
                <motion.span
                  key={b.cls}
                  className={`absolute flex h-[9%] w-[6%] items-center justify-center rounded-full border border-white bg-white/90 text-[#2348e6] shadow-[0_12px_24px_-12px_rgba(35,72,230,0.6)] ${b.cls}`}
                  animate={reduce ? undefined : { y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: b.d }}
                >
                  <Icon name={b.icon} className="h-1/2 w-1/2" />
                </motion.span>
              ))}
            </div>
          </div>

          <ul className="order-3 space-y-8">
            {rightF.map((f, i) => <FeatureItem key={f.title} f={f} i={i} side="r" />)}
          </ul>
        </div>

        <div className="mt-12">
          <CtaStrip
            tile="square"
            title={$t("BigCommerceGrowth__t20", "Ready to Take Your Business to the")}
            accent="Next Level?"
            text={$t("BigCommerceGrowth__t21", "Join thousands of successful brands building their future with BigCommerce.")}
            checks={[
              { icon: "briefcase", label: $t("BigCommerceGrowth__t22", "No credit card required") },
              { icon: "bolt", label: $t("BigCommerceGrowth__t23", "Setup in minutes") },
              { icon: "clock", label: $t("BigCommerceGrowth__t24", "Cancel anytime") },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
