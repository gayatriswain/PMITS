"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

// --- Premium Animated 2D Illustration Components ---

const PaintbrushIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Paint Splash */}
    <motion.path 
      d="M14 36c-2 2-6 2-8 0s-2-6 0-8l4-4 8 8-4 4z" 
      fill="#0d9488" 
      animate={{ scale: isHovered ? 1.1 : 1 }} 
      transition={{ type: "spring" }}
    />
    {/* Brush Handle */}
    <path d="M42 6c-2-2-6-2-8 0L19 21l8 8 15-15c2-2 2-6 0-8z" fill="#0b3b35" />
    {/* Metal Ferrule */}
    <path d="M19 21l8 8-4 4-8-8 4-4z" fill="#cbd5e1" />
    {/* Highlights */}
    <path d="M38 10l-12 12" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
    <motion.circle cx="10" cy="38" r="2" fill="#14b8a6" animate={{ y: isHovered ? [0, -5, 0] : 0, opacity: isHovered ? [0, 1, 0] : 0 }} transition={{ repeat: Infinity, duration: 1 }} />
    <motion.circle cx="16" cy="42" r="1.5" fill="#14b8a6" animate={{ y: isHovered ? [0, -8, 0] : 0, opacity: isHovered ? [0, 1, 0] : 0 }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} />
  </motion.svg>
);

const ThemeIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Browser Base */}
    <rect x="4" y="6" width="40" height="34" rx="4" fill="#f1f5f9" />
    {/* Header */}
    <path d="M4 10a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v6H4v-6z" fill="#0b3b35" />
    <circle cx="10" cy="10" r="2" fill="#ef4444" />
    <circle cx="16" cy="10" r="2" fill="#f59e0b" />
    <circle cx="22" cy="10" r="2" fill="#10b981" />
    {/* Content Blocks */}
    <motion.rect x="8" y="20" width="12" height="16" rx="2" fill="#0d9488" animate={{ y: isHovered ? -2 : 0 }} />
    <motion.rect x="24" y="20" width="16" height="6" rx="2" fill="#94a3b8" animate={{ y: isHovered ? -1 : 0 }} transition={{ delay: 0.1 }} />
    <motion.rect x="24" y="30" width="10" height="6" rx="2" fill="#cbd5e1" animate={{ y: isHovered ? -1 : 0 }} transition={{ delay: 0.2 }} />
  </motion.svg>
);

const UserHeartIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* User Base */}
    <motion.path d="M24 24c-5.5 0-10-4.5-10-10S18.5 4 24 4s10 4.5 10 10-4.5 10-10 10z" fill="#0b3b35" />
    <motion.path d="M8 44v-4c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v4H8z" fill="#0b3b35" animate={{ y: isHovered ? -2 : 0 }} />
    {/* Heart */}
    <motion.path 
      d="M38 12c-2.2 0-4 1.8-4 4 0 4.4 7 10 7 10s7-5.6 7-10c0-2.2-1.8-4-4-4-1.3 0-2.5.6-3 1.5-.5-.9-1.7-1.5-3-1.5z" 
      fill="#10b981" 
      animate={{ scale: isHovered ? [1, 1.25, 1] : 1, rotate: isHovered ? [0, -10, 10, 0] : 0 }}
      transition={{ duration: 0.6 }}
    />
  </motion.svg>
);

const ShoppingBagIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Back Bag (White/Gray) */}
    <motion.path d="M22 16h16l4 24H26l-4-24z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" strokeLinejoin="round" />
    <path d="M28 16v-4c0-3.3 2.7-6 6-6s6 2.7 6 6v4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    {/* Front Bag (Green) */}
    <motion.path 
      d="M10 18h16l2 24H8l-2-24z" 
      fill="#0d9488" 
      animate={{ y: isHovered ? -4 : 0, rotate: isHovered ? -3 : 0 }}
    />
    <path d="M14 18v-4c0-2.2 1.8-4 4-4s4 1.8 4 4v4" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
    <motion.path d="M12 28h10" stroke="#ccfbf1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
  </motion.svg>
);

const AppIntegrationIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Shopify Bag Style */}
    <motion.path 
      d="M10 16h28l-2 26H12L10 16z" 
      fill="#95bf47" 
      animate={{ y: isHovered ? -3 : 0, scale: isHovered ? 1.05 : 1 }}
    />
    <path d="M18 16v-5c0-3.3 2.7-6 6-6s6 2.7 6 6v5" stroke="#5c7a29" strokeWidth="3" strokeLinecap="round" />
    {/* S inside Bag */}
    <motion.path 
      d="M27 24c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 2 3 3-3 1.3-3 3 1.3 3 3 3 3-1.3 3-3" 
      stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      animate={{ strokeDasharray: isHovered ? ["0, 30", "30, 0"] : "30, 0" }}
      transition={{ duration: 0.5 }}
    />
  </motion.svg>
);

const SpeedometerIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Arc Background */}
    <path d="M6 34a18 18 0 0 1 36 0" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
    {/* Colored Arc */}
    <motion.path 
      d="M6 34a18 18 0 0 1 28-14" 
      stroke="#0d9488" strokeWidth="6" strokeLinecap="round"
      animate={{ strokeDasharray: isHovered ? "40, 100" : "50, 100" }}
    />
    {/* Ticks */}
    <path d="M12 24l-3-2M24 16v-4M36 24l3-2" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    {/* Needle Base */}
    <circle cx="24" cy="34" r="4" fill="#0b3b35" />
    {/* Needle */}
    <motion.line 
      x1="24" y1="34" x2="16" y2="20" 
      stroke="#ef4444" strokeWidth="3" strokeLinecap="round"
      initial={{ rotate: -15, transformOrigin: "24px 34px" }}
      animate={{ rotate: isHovered ? 45 : -15 }}
      transition={{ type: "spring", stiffness: 150 }}
    />
  </motion.svg>
);

const SeoIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Glass Rim */}
    <motion.circle 
      cx="20" cy="20" r="14" 
      stroke="#0b3b35" strokeWidth="4" fill="#ccfbf1"
      animate={{ scale: isHovered ? 1.05 : 1 }}
    />
    {/* Shine */}
    <path d="M12 16a8 8 0 0 1 8-8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    {/* Handle */}
    <motion.path 
      d="M30 30l10 10" 
      stroke="#0d9488" strokeWidth="8" strokeLinecap="round" 
      animate={{ x: isHovered ? 2 : 0, y: isHovered ? 2 : 0 }}
    />
    <path d="M30 30l4 4" stroke="#0f766e" strokeWidth="8" strokeLinecap="round" />
  </motion.svg>
);

const HeadsetIcon = ({ isHovered }: { isHovered: boolean }) => (
  <motion.svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    {/* Headband */}
    <motion.path 
      d="M8 26v-6c0-8.8 7.2-16 16-16s16 7.2 16 16v6" 
      stroke="#0b3b35" strokeWidth="4" strokeLinecap="round" 
      animate={{ scaleY: isHovered ? 1.05 : 1, transformOrigin: "bottom" }}
    />
    {/* Earpads */}
    <rect x="4" y="22" width="8" height="16" rx="4" fill="#0d9488" />
    <rect x="36" y="22" width="8" height="16" rx="4" fill="#0d9488" />
    {/* Mic Boom */}
    <motion.path 
      d="M38 34v4c0 3.3-2.7 6-6 6H24" 
      stroke="#0b3b35" strokeWidth="3" strokeLinecap="round"
      animate={{ rotate: isHovered ? [0, 5, -5, 0] : 0, transformOrigin: "38px 34px" }}
    />
    <circle cx="22" cy="44" r="3" fill="#14b8a6" />
  </motion.svg>
);

export default function ShopifyWhatWeOffer() {
  const $t = useCmsText();
  const OFFERS = [
    { id: "01", title: $t("ShopifyWhatWeOffer__t1", "Custom Shopify\nDesign"), desc: $t("ShopifyWhatWeOffer__t2", "Unique, conversion-focused designs that reflect your brand and drive results."), icon: PaintbrushIcon },
    { id: "02", title: $t("ShopifyWhatWeOffer__t3", "Theme\nCustomization"), desc: $t("ShopifyWhatWeOffer__t4", "Premium themes customized to fit your business needs perfectly."), icon: ThemeIcon },
    { id: "03", title: $t("ShopifyWhatWeOffer__t5", "Conversion-Focused\nUX"), desc: $t("ShopifyWhatWeOffer__t6", "Designed to guide customers, build trust and increase conversions."), icon: UserHeartIcon },
    { id: "04", title: $t("ShopifyWhatWeOffer__t7", "Product & Collection\nArchitecture"), desc: $t("ShopifyWhatWeOffer__t8", "Smart structure that helps customers find and buy easily."), icon: ShoppingBagIcon },
    { id: "05", title: $t("ShopifyWhatWeOffer__t9", "Shopify App\nIntegration"), desc: $t("ShopifyWhatWeOffer__t10", "Powerful integrations to extend your store's functionality."), icon: AppIntegrationIcon },
    { id: "06", title: $t("ShopifyWhatWeOffer__t11", "Performance\nOptimization"), desc: $t("ShopifyWhatWeOffer__t12", "Faster store speeds for better experience and higher rankings."), icon: SpeedometerIcon },
    { id: "07", title: $t("ShopifyWhatWeOffer__t13", "Shopify SEO\nFoundations"), desc: $t("ShopifyWhatWeOffer__t14", "SEO-ready structure to help your store get discovered."), icon: SeoIcon },
    { id: "08", title: $t("ShopifyWhatWeOffer__t15", "Ongoing Support\n& Growth"), desc: $t("ShopifyWhatWeOffer__t16", "Continuous support to help your store grow and scale."), icon: HeadsetIcon },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="w-full bg-[#fcfdfd] py-20 px-4 md:px-8 border-t border-slate-100 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <span className="text-[12px] font-black tracking-widest text-[#0d9488] uppercase">{html($t("ShopifyWhatWeOffer__t17", "What We Offer"))}</span>
            <div className="flex items-center gap-1 opacity-60">
              <span className="w-4 h-[1.5px] bg-[#0d9488]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
              <span className="w-4 h-[1.5px] bg-[#0d9488]" />
            </div>
          </div>
          
          <h2 className="text-h2 font-black text-[#0f2333] mb-4">{rich($t("ShopifyWhatWeOffer__t18m", "More Than a <span class=\"text-[#0d9488]\">Beautiful Store.</span>"))}</h2>
          <p className="text-body text-slate-500 font-medium">
            {rich($t("ShopifyWhatWeOffer__t20", "We design high-performing Shopify stores that attract, engage and convert."))}</p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Horizontal connecting line (dashed) for desktop */}
          <div className="hidden xl:block absolute top-[44px] left-[6%] right-[6%] h-[2px] border-t-[2px] border-dashed border-[#c6e3d8] z-0"></div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-x-4 gap-y-12"
          >
            {OFFERS.map((offer) => {
              const [isHovered, setIsHovered] = useState(false);
              const Icon = offer.icon;
              
              return (
                <motion.div 
                  key={offer.id} 
                  variants={itemVariants}
                  className="flex flex-col items-center text-center relative z-10 group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  
                  {/* Icon Circle */}
                  <motion.div 
                    animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -8 : 0 }}
                    className="w-[88px] h-[88px] rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-6 relative border border-slate-50"
                  >
                    <Icon isHovered={isHovered} />
                    
                    {/* Glow effect on hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute inset-0 rounded-full bg-[#0d9488]/5 -z-10"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Number Badge */}
                  <div className="px-3 py-1 bg-[#eaf5f2] rounded-full mb-4 transition-colors duration-300 group-hover:bg-[#0d9488]">
                    <span className="text-[11px] font-bold text-[#0b3b35] transition-colors duration-300 group-hover:text-white">{offer.id}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] font-bold text-[#0f2333] mb-3 whitespace-pre-line leading-tight h-[40px] flex items-center justify-center transition-colors duration-300 group-hover:text-[#0d9488]">
                    {offer.title}
                  </h3>

                  {/* Description */}
                  <p className="text-caption text-slate-500 font-medium px-2">
                    {offer.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
