"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useReducedMotion } from "framer-motion";
import { BC, Icon, ScreenOverlay, Sneaker, Swoosh, ease, fadeUp, heading, useSeen, useWidth, type IconName } from "./BigCommerceShared";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

/* Monitor screen corners in the image's natural pixels (TL, TR, BR, BL). */
const MON_QUAD: [[number, number], [number, number], [number, number], [number, number]] = [[445, 292], [1085, 252], [1068, 856], [400, 830]];
const IW = BC.monitor.w, IH = BC.monitor.h;

const points__cms: { title: string; text: string; icon: IconName }[] = [
  { title: "Everything You Need to Sell Online", text: "Storefront, checkout, payments, shipping, and more.", icon: "store" },
  { title: "Built for Growth", text: "From startups to global brands, scale without limits.", icon: "chart" },
  { title: "Easy to Use", text: "No complex setup. Launch and manage with ease.", icon: "bolt" },
  { title: "Open and Flexible", text: "Customize your store and integrate with the tools you love.", icon: "puzzle" },
];

/* Tiles around the monitor: [x, y] = top-left in image pixels, side for connector direction. */
const tiles__cms: { label: [string, string]; icon: IconName; x: number; y: number; side: "l" | "r" }[] = [
  { label: ["Beautiful", "Storefronts"], icon: "store", x: 190, y: 285, side: "l" },
  { label: ["Secure", "Payments"], icon: "lock", x: 190, y: 505, side: "l" },
  { label: ["Shipping", "Made Easy"], icon: "rocket", x: 190, y: 720, side: "l" },
  { label: ["Customer", "Management"], icon: "users", x: 1150, y: 250, side: "r" },
  { label: ["Powerful", "Analytics"], icon: "trend", x: 1150, y: 490, side: "r" },
  { label: ["100+", "Integrations"], icon: "grid", x: 1150, y: 720, side: "r" },
];
const TILE_W = 128, TILE_H = 150;

const menu__cms: { label: string; icon: IconName }[] = [
  { label: "Home", icon: "store" },
  { label: "Products", icon: "briefcase" },
  { label: "Orders", icon: "cart" },
  { label: "Customers", icon: "users" },
  { label: "Analytics", icon: "chart" },
  { label: "Marketing", icon: "rocket" },
  { label: "Apps", icon: "grid" },
  { label: "Settings", icon: "cog" },
];

function useCount(to: number, start: boolean, delay = 0) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!start || reduce) return;
    const c = animate(0, to, { duration: 1.6, delay, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [start, reduce, to, delay]);
  return v;
}

function Dashboard({ seen }: { seen: boolean }) {
  const $t = useCmsText();
  const menu = useCmsData("BigCommerceAllInOne__menu", menu__cms);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduce || !seen) return;
    const t = setInterval(() => setActive((a) => (a + 1) % menu.length), 1600);
    return () => clearInterval(t);
  }, [reduce, seen]);
  const sales = useCount(58645, seen, 0.6);
  const orders = useCount(1248, seen, 0.75);
  const customers = useCount(3682, seen, 0.9);
  const stat = [
    { label: $t("BigCommerceAllInOne__t1", "Total Sales"), value: `$${sales.toLocaleString("en-US")}`, d: "↑ 23%", path: "M0 30 L12 24 L22 27 L34 16 L46 20 L58 10 L70 14 L84 4" },
    { label: $t("BigCommerceAllInOne__t2", "Orders"), value: orders.toLocaleString("en-US"), d: "↑ 18%", path: "M0 28 L14 26 L24 18 L36 22 L48 12 L60 16 L72 8 L84 10" },
    { label: $t("BigCommerceAllInOne__t3", "Customers"), value: customers.toLocaleString("en-US"), d: "↑ 31%", path: "M0 32 L12 28 L26 22 L38 24 L50 14 L62 12 L74 8 L84 2" },
  ];
  return (
    <div className="flex h-full w-full bg-[#f6f8fc] font-sans">
      {/* sidebar */}
      <div className="flex w-[140px] flex-col bg-[#0d1b45] px-3 py-5 text-white">
        <svg viewBox="0 0 40 34" className="mb-6 ml-2 h-7 w-8" aria-hidden><path d="M4 32 36 2v30Z" fill="#fff" /><path d="M18 18h8a5 5 0 0 1 0 10h-8Z" fill="#0d1b45" /></svg>
        <ul className="relative space-y-1">
          {menu.map((m, i) => (
            <li key={m.label} className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px]">
              {/* no layoutId here: layout animations mis-measure inside the matrix3d-transformed screen */}
              <span className={`absolute inset-0 rounded-lg bg-gradient-to-r from-[#2348e6] to-[#3b6cf6] transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`} />
              <Icon name={m.icon} className="relative h-5 w-5" />
              <span className="relative">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* main */}
      <div className="flex flex-1 flex-col px-6 py-5">
        <div className="flex items-center justify-between">
          <p className={`text-body ${heading.className} font-bold tracking-tight text-[#0d1b45]`}>{rich($t("BigCommerceAllInOne__t4m", "<span class=\"font-extrabold\">BIG</span>COMMERCE"))}</p>
          <div className="flex items-center gap-5 text-[13px] text-slate-600">
            {[$t("BigCommerceAllInOne__t6", "Products"), $t("BigCommerceAllInOne__t7", "Orders"), $t("BigCommerceAllInOne__t8", "Customers"), $t("BigCommerceAllInOne__t9", "Analytics")].map((t) => <span key={t}>{t}</span>)}
            <span className="relative text-[#0d1b45]">
              <Icon name="cart" className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2348e6] text-[10px] font-bold text-white">{html($t("BigCommerceAllInOne__t10", "3"))}</span>
            </span>
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <div className="flex-1">
            <p className={`${heading.className} text-[34px] font-bold leading-[1.1] text-[#0d1b45]`}>{rich($t("BigCommerceAllInOne__t11", "Your Store."))}</p>
            <p className={`${heading.className} text-[34px] font-bold leading-[1.1] text-[#0d6fa0]`}>{rich($t("BigCommerceAllInOne__t12", "Your Way."))}</p>
            <p className="text-small mt-3 text-slate-500">{rich($t("BigCommerceAllInOne__t13m", "Powerful features. Seamless operations.<br>Endless opportunities."))}</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#0d6f8a] px-4 py-2 text-[13px] font-semibold text-white">{html($t("BigCommerceAllInOne__t15", "Start Selling →"))}</span>
          </div>
          <div className="w-[200px] rounded-xl bg-white p-3 shadow-sm">
            <div className="flex h-[120px] items-center justify-center rounded-lg bg-gradient-to-br from-slate-50 to-slate-100">
              <motion.div animate={reduce ? undefined : { y: [0, -5, 0], rotate: [-4, -2, -4] }} transition={{ duration: 3, repeat: Infinity }}>
                <Sneaker className="w-[170px]" />
              </motion.div>
            </div>
            <div className="mt-2 flex items-center justify-between">{rich($t("BigCommerceAllInOne__t16m", "<span class=\"text-[15px] font-bold text-[#0d1b45]\">$129.99</span><span class=\"text-[12px] font-semibold text-[#2348e6]\">Add to Cart</span>"))}</div>
          </div>
        </div>
        <div className="mt-5 grid flex-1 grid-cols-3 gap-3">
          {stat.map((s, i) => (
            <div key={s.label} className="rounded-xl bg-white p-3 shadow-sm">
              <p className="text-caption text-slate-500">{s.label}</p>
              <p className={`text-body ${heading.className} mt-1 font-bold text-[#0d1b45]`}>{s.value}</p>
              <p className="text-[11px] font-semibold text-emerald-600">{s.d}</p>
              <svg viewBox="0 0 84 34" className="mt-1 h-10 w-full" aria-hidden>
                <motion.path
                  d={s.path}
                  stroke="#2348e6"
                  strokeWidth="2.2"
                  fill="none"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={seen ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.4, delay: 0.8 + i * 0.2 }}
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BigCommerceAllInOne() {
  const $t = useCmsText();
  const points = useCmsData("BigCommerceAllInOne__points", points__cms);
  const tiles = useCmsData("BigCommerceAllInOne__tiles", tiles__cms);
  const reduce = useReducedMotion();
  const [boxRef, boxW] = useWidth<HTMLDivElement>();
  const stageRef = useRef<HTMLDivElement>(null);
  const seen = useSeen(stageRef, 0.25);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f3f6fd] via-[#f5f8fe] to-[#eaf0fb] py-12 sm:py-16">
      <svg aria-hidden className="pointer-events-none absolute -left-24 bottom-0 hidden h-[420px] w-[420px] text-white lg:block" viewBox="0 0 200 200"><circle cx="60" cy="140" r="120" fill="currentColor" opacity="0.6" /></svg>
      <div className="relative mx-auto w-full max-w-[1640px] px-5">
        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
          {/* copy */}
          <div>
            <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-caption flex items-center gap-3 font-semibold uppercase tracking-[0.25em] text-[#0d8f9a]">
              <span className="h-px w-8 bg-[#0d8f9a]" /> {rich($t("BigCommerceAllInOne__t18", "Simple. Powerful. Built for growth."))}</motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`text-h2 ${heading.className} mt-5 font-bold tracking-tight text-[#0b1a4a]`}
            >
              {$t("BigCommerceAllInOne__t19", "Everything You Need")}<br />
              {$t("BigCommerceAllInOne__t20", "to Sell More.")}<br />
              <span className="bg-gradient-to-r from-[#2348e6] to-[#0d8f9a] bg-clip-text text-transparent">
                {html($t("BigCommerceAllInOne__t21", "All in"))}{" "}
                <span className="relative inline-block">
                  {html($t("BigCommerceAllInOne__t22", "One"))}<Swoosh className="-bottom-2 left-0 h-3 w-full" color="#0d8f9a" />
                </span>{" "}
                {html($t("BigCommerceAllInOne__t23", "Place."))}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-body mt-6 max-w-[440px] text-slate-600">{rich($t("BigCommerceAllInOne__t24m", "BigCommerce is the <span class=\"font-semibold text-[#2348e6]\">all-in-one ecommerce platform</span> that helps you build, run, and grow a better online business — without limits."))}</motion.p>
            <ul className="mt-8 max-w-[480px] divide-y divide-slate-200">
              {points.map((p, i) => (
                <motion.li key={p.title} variants={fadeUp} custom={2.5 + i * 0.5} initial="hidden" whileInView="show" viewport={{ once: true }} className="group flex items-start gap-5 py-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white bg-white text-[#2348e6] shadow-[0_10px_24px_-14px_rgba(35,72,230,0.6)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className={`${heading.className} block text-[17px] font-semibold text-[#0b1a4a]`}>{p.title}</span>
                    <span className="mt-1 block text-sm text-slate-600">{p.text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* monitor */}
          <div ref={stageRef} className="relative">
            <div ref={boxRef} className="relative mx-auto aspect-[1314/1197] w-full max-w-[760px] 2xl:max-w-[860px]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={seen ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, ease }}
                className="absolute inset-0"
              >
                <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_52%_52%_at_50%_50%,black_78%,transparent_100%)]">
                  <Image src={BC.monitor.src} alt={$t("BigCommerceAllInOne__t27", "BigCommerce dashboard on a monitor")} fill sizes="(min-width:1024px) 760px, 92vw" className="object-contain" />
                </div>
                <ScreenOverlay imgW={IW} quad={MON_QUAD} boxW={680} boxH={600} scale={boxW} className="rounded-[14px]">
                  <Dashboard seen={seen} />
                </ScreenOverlay>
              </motion.div>

              {/* connectors + tiles (sm and up) */}
              <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox={`0 0 ${IW} ${IH}`} fill="none" aria-hidden>
                {tiles.map((t, i) => {
                  const y = t.y + TILE_H / 2;
                  const x1 = t.side === "l" ? t.x + TILE_W : t.x;
                  const x2 = t.side === "l" ? 405 : 1085;
                  return (
                    <g key={i}>
                      <motion.path
                        d={`M${x1} ${y} L${x2} ${y + (t.side === "l" ? 6 : -6)}`}
                        stroke="#3b82f6"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeDasharray="5 6"
                        initial={reduce ? false : { pathLength: 0 }}
                        animate={seen ? { pathLength: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                      />
                      <circle cx={x2} cy={y + (t.side === "l" ? 6 : -6)} r="6" fill="#22d3ee" />
                    </g>
                  );
                })}
              </svg>
              {tiles.map((t, i) => (
                <motion.div
                  key={t.label.join(" ")}
                  initial={{ opacity: 0, scale: 0.7, x: t.side === "l" ? -20 : 20 }}
                  animate={seen ? { opacity: 1, scale: 1, x: 0 } : undefined}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease }}
                  className="absolute hidden sm:block"
                  style={{ left: `${(t.x / IW) * 100}%`, top: `${(t.y / IH) * 100}%`, width: `${(TILE_W / IW) * 100}%` }}
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 3.6 + (i % 3) * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    whileHover={{ scale: 1.08 }}
                    className="flex flex-col items-center rounded-2xl border border-white bg-white/90 px-1 py-3 text-center shadow-[0_16px_32px_-18px_rgba(35,72,230,0.5)] backdrop-blur"
                  >
                    <Icon name={t.icon} className="h-[clamp(20px,2.4vw,30px)] w-[clamp(20px,2.4vw,30px)] text-[#2348e6]" />
                    <span className="mt-1.5 text-[clamp(9px,0.8vw,11.5px)] font-semibold leading-tight text-[#0b1a4a]">
                      {t.label[0]}
                      <br />
                      {t.label[1]}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
