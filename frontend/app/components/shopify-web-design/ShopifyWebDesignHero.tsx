"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const DEEP_TEAL = "#0f5c56";
const TEAL = "#0d9488";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

type IconProps = { size?: number; color?: string };
const svgBase = (size: number, color: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

const SearchIcon = ({ size = 14, color = "#fff" }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);
const BagIcon = ({ size = 14, color = "#94a3b8" }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
const CartIcon = ({ size = 14, color = "#94a3b8" }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="9" cy="20" r="1.3" fill={color} stroke="none" />
    <circle cx="18" cy="20" r="1.3" fill={color} stroke="none" />
    <path d="M2.5 3h2l2.2 11.5a2 2 0 0 0 2 1.6h8a2 2 0 0 0 2-1.6L21 7H6" />
  </svg>
);
const WindowIcon = ({ size = 14, color = "#94a3b8" }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M3.5 9h17" />
  </svg>
);

const STEPS__cms = [
  { label: "Discover", Icon: SearchIcon, active: true },
  { label: "Product", Icon: BagIcon, active: false },
  { label: "Cart", Icon: CartIcon, active: false },
  { label: "Checkout", Icon: WindowIcon, active: false },
];

const ScissorsIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <path d="M20 4 8.5 12M8.5 12 20 20M8 12H4" />
  </svg>
);
const CompassIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5Z" />
  </svg>
);
const PhoneIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
);
const ZapIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)} fill={color} stroke="none">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
);

const FEATURES__cms = [
  { label: "Clearer Navigation", Icon: ScissorsIcon },
  { label: "Better Product Discovery", Icon: CompassIcon },
  { label: "Mobile-First Experience", Icon: PhoneIcon },
  { label: "Frictionless Checkout", Icon: CartIcon },
];

function ShopifyBagIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6.5 8.5 5 20.5a1.5 1.5 0 0 0 1.5 1.7h11a1.5 1.5 0 0 0 1.5-1.7l-1.5-12Z" fill="#fff" />
      <path d="M6.5 8.5 5 20.5a1.5 1.5 0 0 0 1.5 1.7h11a1.5 1.5 0 0 0 1.5-1.7l-1.5-12H6.5Z" stroke={TEAL} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 8.5V6.8a3 3 0 0 1 6 0v1.7" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const ShieldStatIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M12 3 20 6.5V12c0 5-3.6 8-8 9-4.4-1-8-4-8-9V6.5Z" />
    <path d="M8.5 12 11 14.5l4.5-5" />
  </svg>
);
const BoltStatIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)} fill={color} stroke="none">
    <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
  </svg>
);
const TrendStatIcon = ({ size = 18, color = TEAL }: IconProps) => (
  <svg {...svgBase(size, color)}>
    <path d="M4 19 10 12 14 15 20 7" />
    <path d="M14 7h6v6" />
  </svg>
);

const TRUST_ROW__cms = [
  { label: "Conversion-Focused", sub: "Design", Icon: ShieldStatIcon },
  { label: "Shopify", sub: "Experts", Icon: ShopifyBagIconSmall },
  { label: "Fast Loading", sub: "Stores", Icon: BoltStatIcon },
  { label: "Scalable &", sub: "Future Ready", Icon: TrendStatIcon },
];

function ShopifyBagIconSmall({ size = 18 }: IconProps) {
  return <ShopifyBagIcon size={size} />;
}

function StoreMockup() {
  const $t = useCmsText();
  return (
    // Both cards float directly over the tablet, side by side, large and centered-low — matching
    // the reference layout. Positioned with `left` + fixed px (not `right`), which keeps them
    // safely inside this wrapper (and so inside the page's own container) on every screen size.
    <div className="relative w-full max-w-[460px]">
      {/* Tablet frame */}
      <div className="rounded-2xl border-[6px] border-[#0e1117] bg-white shadow-[0_35px_70px_-25px_rgba(15,23,42,0.35)] overflow-hidden">
        {/* Storefront nav */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100">
          <span className="text-[13px] font-bold tracking-widest" style={{ color: NAVY }}>{html($t("ShopifyWebDesignHero__t1", "PURELY"))}</span>
          <div className="hidden sm:flex items-center gap-4 text-[10.5px] font-medium text-slate-500">{rich($t("ShopifyWebDesignHero__t2m", "<span>Shop</span><span>Collections</span><span>About</span><span>Blog</span>"))}</div>
          <div className="flex items-center gap-3 text-slate-500">
            <SearchIcon size={13} color="#64748b" />
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c0-4 3.4-7 7.5-7s7.5 3 7.5 7" /></svg>
            <CartIcon size={13} color="#64748b" />
          </div>
        </div>

        {/* Storefront banner */}
        <div className="relative h-[260px] sm:h-[320px]">
          <Image src={$t("ShopifyWebDesignHero__t6", "/case-urban.webp")} alt="" fill sizes="560px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/35 to-transparent" />
          <div className="absolute left-4 sm:left-6 top-[18%] max-w-[180px]">
            <div className="mb-2 flex items-center gap-2 rounded-full bg-white/80 px-2.5 py-1 w-fit">
              <span className="w-6 border-t" style={{ borderColor: TEAL }} />
            </div>
            <h3 className="text-h6 font-serif font-bold" style={{ color: NAVY }}>{html($t("ShopifyWebDesignHero__t7", "Summer Collection"))}</h3>
            <p className="text-[10px] text-slate-600 mt-1.5">{rich($t("ShopifyWebDesignHero__t8", "New arrivals. Natural comfort."))}</p>
            <span className="mt-3 inline-block rounded-md px-3.5 py-1.5 text-[10px] font-semibold text-white" style={{ backgroundColor: TEAL }}>{html($t("ShopifyWebDesignHero__t9", "Shop Now"))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopifyWebDesignHero() {
  const $t = useCmsText();
  const STEPS = useCmsData("ShopifyWebDesignHero__STEPS", STEPS__cms);
  const FEATURES = useCmsData("ShopifyWebDesignHero__FEATURES", FEATURES__cms);
  const TRUST_ROW = useCmsData("ShopifyWebDesignHero__TRUST_ROW", TRUST_ROW__cms);
  const [activeStep, setActiveStep] = useState(0);

  const handleViewportEnter = () => {
    setActiveStep(0);
    // Sync with Tablet Mockup (starts at 0.2s)
    setTimeout(() => setActiveStep(1), 400);  
    // Sync with 2nd visual: Product Card (starts at 1.2s)
    setTimeout(() => setActiveStep(2), 1200); 
    // Sync with 3rd visual: Cart Popup (starts at 2.2s)
    setTimeout(() => setActiveStep(3), 2200); 
  };

  return (
    <section className="relative w-full bg-white pt-10 pb-6 sm:pb-8 lg:pt-14 lg:pb-10 overflow-x-clip">

      <Container>



        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-16 sm:gap-20 lg:gap-10 items-center">
          {/* Left content */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.h1 variants={fadeUp} className="text-h1 font-serif font-bold tracking-tight" style={{ color: NAVY }}>
              {$t("ShopifyWebDesignHero__t10", "A Shopify Store")}<br />
              <span style={{ color: TEAL }}>{html($t("ShopifyWebDesignHero__t11", "Built to Sell."))}</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-body text-slate-600 mt-5 max-w-md">
              {rich($t("ShopifyWebDesignHero__t12", "We design fast, intuitive Shopify stores that turn product discovery into confident purchases."))}</motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-7">
              <Link
                href={$t("ShopifyWebDesignHero__t13", "/contact")}
                className="group inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_15px_30px_-12px_rgba(15,92,86,0.6)] transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: DEEP_TEAL }}
              >
                {$t("ShopifyWebDesignHero__t14", "Get My Shopify Strategy")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href={$t("ShopifyWebDesignHero__t15", "/portfolio")}
                className="inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 bg-white border border-slate-300 text-[14px] font-semibold transition-colors hover:border-slate-400"
                style={{ color: NAVY }}
              >
                {$t("ShopifyWebDesignHero__t16", "See Our Shopify Work")}</Link>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-x-6 gap-y-3.5 mt-9">
              {FEATURES.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4" }}>
                    <f.Icon />
                  </span>
                  <span className="text-[12.5px] font-medium text-slate-600">{f.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-9">
              <Image src={$t("ShopifyWebDesignHero__t17", "/shopify.webp")} alt={$t("ShopifyWebDesignHero__t18", "Shopify")} width={32} height={32} className="object-contain" />
              <div>
                <p className="text-small font-bold" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignHero__t19", "Built on Shopify."))}</p>
                <p className="text-[11px] text-slate-400">{rich($t("ShopifyWebDesignHero__t20", "Designed for Growth."))}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div 
            onViewportEnter={handleViewportEnter}
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex flex-col items-center justify-center lg:items-start -mt-10 w-full pb-8 lg:pb-16"
          >
            
            {/* Stepper inside right visual */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="flex items-center justify-center w-full mb-8 lg:mb-10 lg:pl-6 max-w-[460px]"
            >
              <div className="flex items-start gap-1.5 sm:gap-2">
                {STEPS.map((step, i) => {
                  const isActive = i <= activeStep;
                  return (
                  <div key={step.label} className="flex items-start gap-1.5 sm:gap-2">
                    {i > 0 && (
                      <div className="relative w-6 sm:w-10 mt-[14px]">
                        <div className="absolute w-full border-t-[1.5px] border-dashed border-slate-200" />
                        <motion.div 
                          className="absolute left-0 top-0 border-t-[1.5px] border-solid"
                          style={{ borderColor: TEAL }}
                          initial={{ width: "0%" }}
                          animate={{ width: isActive ? "100%" : "0%" }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1.5 w-[56px]">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full transition-all duration-[800ms]"
                        style={isActive ? { backgroundColor: TEAL, borderColor: TEAL, borderWidth: "1.5px" } : { backgroundColor: "#fff", borderColor: "#e2e8f0", borderWidth: "1.5px" }}
                      >
                        <step.Icon size={13} color={isActive ? "#fff" : "#94a3b8"} />
                      </span>
                      <span className="text-[9.5px] font-semibold text-center transition-colors duration-[800ms]" style={{ color: isActive ? TEAL : "#94a3b8" }}>{step.label}</span>
                    </div>
                  </div>
                )})}
              </div>
            </motion.div>

            {/* Tablet Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              className="w-full flex justify-center lg:justify-start"
            >
              <StoreMockup />
            </motion.div>

            {/* Combined Cards — inside container, right of mockup */}
            <div className="hidden lg:flex absolute right-0 top-[66%] -translate-y-1/2 items-end z-20 pointer-events-none">

              {/* Product card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 40, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.6, ease: EASE, delay: 1.2 }}
                className="relative z-10 w-[185px] xl:w-[200px] rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.28)] border border-slate-100 overflow-hidden pointer-events-auto"
              >
                <div className="relative h-[190px] xl:h-[210px]">
                  <Image src={$t("ShopifyWebDesignHero__t21", "/case-luxera.webp")} alt="" fill sizes="200px" className="object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-caption font-bold" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignHero__t22", "Linen Wrap Dress"))}</p>
                  <p className="text-[11px] font-semibold mt-0.5" style={{ color: TEAL }}>{rich($t("ShopifyWebDesignHero__t23", "$89.00"))}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-[8px] text-slate-400">{html($t("ShopifyWebDesignHero__t24", "Size"))}</span>
                    {[$t("ShopifyWebDesignHero__t25", "S"), $t("ShopifyWebDesignHero__t26", "M"), $t("ShopifyWebDesignHero__t27", "L")].map((s) => (
                      <span key={s} className={`flex h-4 w-4 items-center justify-center rounded text-[7px] font-semibold ${s === "M" ? "text-white" : "text-slate-500 border border-slate-200"}`} style={s === "M" ? { backgroundColor: TEAL } : undefined}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[8px] text-slate-400 mr-0.5">{html($t("ShopifyWebDesignHero__t28", "Color"))}</span>
                    {["#4d5f4a", "#8c8c8c", "#d8cbb8"].map((c, i) => (
                      <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c, boxShadow: i === 0 ? `0 0 0 1.5px #fff, 0 0 0 2.5px ${TEAL}` : undefined }} />
                    ))}
                  </div>
                  <div className="mt-2 space-y-1.5">
                    <div className="rounded-lg py-1.5 text-center text-[9px] font-semibold text-white" style={{ backgroundColor: NAVY }}>{html($t("ShopifyWebDesignHero__t29", "Add to Cart"))}</div>
                    <div className="rounded-lg py-1.5 text-center text-[9px] font-semibold border border-slate-200" style={{ color: NAVY }}>{html($t("ShopifyWebDesignHero__t30", "Buy it now"))}</div>
                  </div>
                </div>
              </motion.div>

              {/* Cart popup card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, x: 40, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.6, ease: EASE, delay: 2.2 }}
                className="relative z-20 w-[150px] xl:w-[165px] rounded-2xl bg-white shadow-[0_20px_50px_-12px_rgba(15,23,42,0.28)] border border-slate-100 p-3 -ml-6 pointer-events-auto"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-bold" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignHero__t31", "Your Cart (2)"))}</p>
                  <span className="text-slate-300 text-[9px]">✕</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded">
                      <Image src={$t("ShopifyWebDesignHero__t32", "/case-luxera.webp")} alt="" fill sizes="28px" className="object-cover" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold truncate" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignHero__t33", "Linen Wrap Dress"))}</p>
                      <p className="text-[7.5px] text-slate-400">{rich($t("ShopifyWebDesignHero__t34", "$89.00"))}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded" style={{ backgroundColor: "#e6f6f4" }}>
                      <BagIcon size={12} color={TEAL} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold truncate" style={{ color: NAVY }}>{rich($t("ShopifyWebDesignHero__t35", "Canvas Tote Bag"))}</p>
                      <p className="text-[7.5px] text-slate-400">{rich($t("ShopifyWebDesignHero__t36", "$39.00"))}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">{rich($t("ShopifyWebDesignHero__t37m", "<span class=\"text-[8px] text-slate-500\">Subtotal</span><span class=\"text-[9px] font-bold text-[#132a43]\">$128.00</span>"))}</div>
                <div className="mt-2 rounded-lg py-1.5 text-center text-[8px] font-semibold text-white" style={{ backgroundColor: TEAL }}>{html($t("ShopifyWebDesignHero__t39", "Checkout Securely"))}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 mt-8 sm:mt-10 lg:mt-8 pt-6 border-t border-slate-100"
        >
          {TRUST_ROW.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <item.Icon />
              <span className="text-[12.5px] font-semibold text-slate-600">
                <span style={{ color: TEAL }}>{item.label}</span> {item.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
