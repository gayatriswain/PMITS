"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const caveat = { className: "font-caveat" }; // global font from app/layout.tsx

const NAVY = "#0c1f1a";
const DEEP = "#0e4d2f";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* =========================================================================
   Little 3D-style green illustrations, one per card (viewBox 140 x 110)
   ========================================================================= */

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5cc46f" />
        <stop offset="1" stopColor="#1a7a3e" />
      </linearGradient>
      <linearGradient id={`${id}d`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2f8f4f" />
        <stop offset="1" stopColor="#0e4d2f" />
      </linearGradient>
      <radialGradient id={`${id}p`}>
        <stop offset="0" stopColor="#d6efdc" />
        <stop offset="1" stopColor="#d6efdc" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Platform({ id }: { id: string }) {
  return <ellipse cx="70" cy="98" rx="56" ry="10" fill={`url(#${id}p)`} />;
}

function Bag({ id, x, y, s = 1 }: { id: string; x: number; y: number; s?: number }) {
  const $t = useCmsText();
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M17 24v-6a10 10 0 0 1 20 0v6" stroke="#0e4d2f" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <path d="M5 24h44l3 54a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" fill={`url(#${id}g)`} />
      <path d="M5 24h44l.6 8H4.400Z" fill="#fff" opacity="0.18" />
      <text x="27" y="64" textAnchor="middle" fill="#fff" fontSize="34" fontWeight="800" fontStyle="italic" fontFamily="system-ui, sans-serif">{$t("ShopifyExpertise__t1", "S")}</text>
    </g>
  );
}

function Gear({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <g>
      {teeth.map((a) => (
        <rect key={a} x={cx - r * 0.2} y={cy - r * 1.18} width={r * 0.4} height={r * 0.4} rx={r * 0.08} fill={fill} transform={`rotate(${a} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill="#fff" />
    </g>
  );
}

function IconSetup() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-full">
      <Defs id="s1" />
      <Platform id="s1" />
      <Bag id="s1" x={40} y={4} s={1.1} />
      <Gear cx={104} cy={78} r={11} fill="#1a7a3e" />
    </svg>
  );
}

function IconDesign() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-full">
      <Defs id="s2" />
      <Platform id="s2" />
      <rect x="20" y="16" width="100" height="70" rx="8" fill="#fff" stroke="#cfe6d6" strokeWidth="1.5" />
      <path d="M20 24a8 8 0 0 1 8-8h84a8 8 0 0 1 8 8v8H20Z" fill="url(#s2d)" />
      <circle cx="29" cy="24" r="2" fill="#fff" opacity="0.8" />
      <circle cx="36" cy="24" r="2" fill="#fff" opacity="0.6" />
      <rect x="28" y="42" width="30" height="8" rx="2" fill="#cfe6d6" />
      <rect x="28" y="56" width="30" height="5" rx="2" fill="#e2efe6" />
      <rect x="28" y="66" width="22" height="5" rx="2" fill="#e2efe6" />
      <rect x="66" y="40" width="46" height="36" rx="4" fill="url(#s2g)" opacity="0.9" />
      <path d="m70 72 12-14 10 10 8-8 8 12Z" fill="#fff" opacity="0.7" />
      <path d="M96 62 108 82l3-8 8-2Z" fill="#0e4d2f" />
    </svg>
  );
}

function IconMigration() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-full">
      <Defs id="s3" />
      <Platform id="s3" />
      <Bag id="s3" x={14} y={30} s={0.8} />
      <Bag id="s3" x={80} y={26} s={0.9} />
      <path d="M44 22 C 58 2, 94 2, 104 20" stroke="#0e4d2f" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="m98 12 7 9-11 2Z" fill="#0e4d2f" />
      <path d="M98 40 C 84 58, 56 58, 46 44" stroke="#2f8f4f" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0" />
    </svg>
  );
}

function IconTheme() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-full">
      <Defs id="s4" />
      <Platform id="s4" />
      <rect x="18" y="20" width="84" height="62" rx="8" fill="url(#s4d)" />
      <rect x="18" y="20" width="84" height="12" rx="6" fill="#fff" opacity="0.25" />
      <circle cx="27" cy="26" r="2" fill="#fff" />
      <circle cx="34" cy="26" r="2" fill="#fff" opacity="0.7" />
      <path d="m44 50-10 9 10 9M66 50l10 9-10 9M60 46l-8 26" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M118 22 90 62" stroke="#8a5a2b" strokeWidth="6" strokeLinecap="round" />
      <path d="M118 22 90 62" stroke="#d9a066" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 58c-8 2-12 10-10 18 8 0 16-4 18-12Z" fill="url(#s4g)" />
    </svg>
  );
}

function IconTasks() {
  return (
    <svg viewBox="0 0 140 110" className="w-full h-full">
      <Defs id="s5" />
      <Platform id="s5" />
      <rect x="30" y="12" width="66" height="80" rx="8" fill="#fff" stroke="#cfe6d6" strokeWidth="1.5" />
      <rect x="48" y="8" width="30" height="10" rx="4" fill="url(#s5d)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="40" y={30 + i * 18} width="9" height="9" rx="2" fill={i < 2 ? "url(#s5g)" : "none"} stroke="#2f8f4f" strokeWidth="1.5" />
          {i < 2 && <path d={`m42 ${34.500 + i * 18} 2.200 2.200 3.800-4.400`} stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <rect x="54" y={31 + i * 18} width="34" height="5" rx="2" fill="#cfe6d6" />
          <rect x="54" y={38 + i * 18} width="22" height="3" rx="1.500" fill="#e2efe6" />
        </g>
      ))}
      <Gear cx={104} cy={72} r={13} fill="#1a7a3e" />
    </svg>
  );
}

function IconApp() {
  const $t = useCmsText();
  return (
    <svg viewBox="0 0 140 110" className="w-full h-full">
      <Defs id="s6" />
      <Platform id="s6" />
      <path d="M52 40h36M70 52v18M44 74 30 82M96 74l14 8" stroke="#6fc487" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 14 94 28v26L70 68 46 54V28Z" fill="url(#s6g)" />
      <path d="M70 14 94 28 70 42 46 28Z" fill="#fff" opacity="0.3" />
      <path d="M70 42v26L46 54V28Z" fill="#000" opacity="0.08" />
      <text x="70" y="56" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="800" fontStyle="italic" fontFamily="system-ui, sans-serif">{$t("ShopifyExpertise__t2", "S")}</text>
      <path d="M22 70 36 78v14L22 100 8 92V78Z" fill="url(#s6d)" />
      <path d="M118 70 132 78v14l-14 8-14-8V78Z" fill="url(#s6d)" />
      <path d="M22 70 36 78 22 86 8 78Z" fill="#fff" opacity="0.25" />
      <path d="M118 70 132 78 118 86 104 78Z" fill="#fff" opacity="0.25" />
    </svg>
  );
}

const cards__cms = [
  {
    n: "01",
    title: "Set up Shopify store",
    Icon: IconSetup,
    desc: "Complete Shopify store setup from the theme customization, page creation, content upload, and payment gateway integration quickly and inexpensively as much as possible. Our Shopify experts are skilled and experienced enough to set up your responsive and intuitive eCommerce store on the Shopify platform.",
  },
  {
    n: "02",
    title: "Shopify store design and development",
    Icon: IconDesign,
    desc: "Need a customized eCommerce store with additional functionality and personalize UI design. Our team of proficient Shopify designers and developers can design and develop an online eCommerce store that fits with industry standards and customer demands. We are ready to implement what you plan.",
  },
  {
    n: "03",
    title: "Shopify migration",
    Icon: IconMigration,
    desc: "Already an owner of the eCommerce website on a different e-commerce platform that doesn't perform adequately. So, want to migrate it to Shopify. Our developers can migrate your store from any e-commerce platform to Shopify with no data loss. We have migrated 100+ websites to Shopify flawlessly.",
  },
  {
    n: "04",
    title: "Shopify theme development",
    Icon: IconTheme,
    desc: "We have expertise in Shopify theme development. Our UX/UI designers and developers build responsive, user-friendly, fast, and engaging Shopify themes. Hire us today to build customize Shopify themes for your store.",
  },
  {
    n: "05",
    title: "Shopify small tasks & tweaks",
    Icon: IconTasks,
    desc: "Hire a Shopify expert on an hourly and individual task basis, you don't need to spend that much on a single Shopify small task and tweak. You can hire one of our experts for various small designing, and development tasks.",
  },
  {
    n: "06",
    title: "Shopify app development",
    Icon: IconApp,
    desc: "Need to add extended functionality and additional features to your Shopify store for that, you need a personalized Shopify app. We have Shopify app developers or programmers that can build easily integrated applications.",
  },
];

export default function ShopifyExpertise() {
  const $t = useCmsText();
  const cards = useCmsData("ShopifyExpertise__cards", cards__cms);
  return (
    <section id="expertise" className="relative w-full overflow-hidden font-sans bg-[linear-gradient(180deg,#f3faf5_0%,#fafdfb_50%,#f1f9f4_100%)] py-12 sm:py-16">
      {/* faint organic waves */}
      <svg className="absolute left-0 top-0 w-[420px] h-[300px] pointer-events-none opacity-70" viewBox="0 0 420 300" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M -20 ${40 + i * 16} C 120 ${10 + i * 20}, 220 ${120 + i * 10}, 440 ${70 + i * 18}`} stroke="#dcefe2" strokeWidth="1" />
        ))}
      </svg>
      <svg className="absolute right-0 bottom-0 w-[460px] h-[300px] pointer-events-none opacity-70" viewBox="0 0 460 300" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M -20 ${230 + i * 16} C 120 ${200 + i * 14}, 260 ${280 - i * 10}, 480 ${190 + i * 12}`} stroke="#dcefe2" strokeWidth="1" />
        ))}
      </svg>

      <Container className="relative z-10 max-w-[1320px]">
        {/* corner handwriting */}
        <motion.div
          className={`${caveat.className} hidden lg:block absolute right-8 top-0 text-[26px] leading-[1.05] font-semibold -rotate-[8deg] text-right`}
          style={{ color: DEEP }}
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {html($t("ShopifyExpertise__t3", "More"))}<br />
          {html($t("ShopifyExpertise__t4", "Sales, Happier"))}<br />
          {html($t("ShopifyExpertise__t5", "Customers"))}<svg className="mt-1 ml-auto" width="150" height="16" viewBox="0 0 150 16" fill="none">
            <motion.path d="M2 12 C 40 12, 100 8, 146 2" stroke="#2f9e4f" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 1 }} />
          </svg>
        </motion.div>

        {/* header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.28em] uppercase text-slate-500">
            <span className="w-12 h-px bg-slate-300" />
            {html($t("ShopifyExpertise__t6", "What we do best"))}<span className="w-12 h-px bg-slate-300" />
          </div>
          <h2 className="text-h2 mt-3 font-black tracking-tight" style={{ color: NAVY }}>{rich($t("ShopifyExpertise__t7m", "Our <span class=\"bg-gradient-to-r from-[#2f9e4f] to-[#0e5a33] bg-clip-text text-transparent\">Shopify</span> Expertise"))}</h2>
          <p className="text-body mt-3 text-slate-600">{rich($t("ShopifyExpertise__t10", "We Build Beautiful Shopify Websites That Engage Your Audience."))}</p>
        </motion.div>

        {/* cards */}
        <motion.div
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {cards.map((c) => (
            <motion.article
              key={c.n}
              variants={rise}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-white/85 backdrop-blur border border-white shadow-[0_24px_44px_-26px_rgba(15,70,45,0.35)] hover:shadow-[0_30px_50px_-24px_rgba(15,90,50,0.45)] transition-shadow p-6 flex flex-col"
            >
              <span className="absolute left-5 top-5 px-3 py-1 rounded-full bg-[#e4f3e8] text-[11.5px] font-semibold text-slate-600">{c.n}</span>

              <div className="mx-auto w-[150px] h-[120px] transition-transform duration-500 group-hover:scale-105">
                <c.Icon />
              </div>

              <h3 className="mt-3 text-[18px] font-extrabold leading-snug" style={{ color: NAVY }}>
                {c.title}
              </h3>
              <p className="text-small mt-3 text-slate-600">{c.desc}</p>

              <div className="mt-auto pt-5 flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="12" x2="19" y2="12" />
                  <polyline points="13 6 19 12 13 18" />
                </svg>
                <span className="h-px w-8 bg-[#2f9e4f] transition-all duration-300 group-hover:w-16" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* footer handwriting + tag */}
        <div className="mt-8 flex items-end justify-between gap-4">
          <motion.div
            className={`${caveat.className} text-[26px] leading-[1.05] font-semibold -rotate-[6deg]`}
            style={{ color: DEEP }}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {html($t("ShopifyExpertise__t11", "Built for"))}<br />
            {html($t("ShopifyExpertise__t12", "What's Next"))}<svg className="mt-1" width="120" height="14" viewBox="0 0 120 14" fill="none">
              <motion.path d="M2 11 C 30 11, 80 7, 116 2" stroke="#2f9e4f" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4 }} />
            </svg>
          </motion.div>
          <div className="hidden sm:flex items-center gap-3 text-[9.5px] font-medium tracking-[0.22em] uppercase text-slate-400">
            <span className="w-10 h-px bg-slate-300" />
            {html($t("ShopifyExpertise__t13", "Your ecommerce"))}<br />
            {html($t("ShopifyExpertise__t14", "growth partner"))}</div>
        </div>
      </Container>
    </section>
  );
}
