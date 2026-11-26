"use client";
import React, { useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

const noopSubscribe = () => () => {};

const SLIDES__cms = [
  {
    id: 0,
    company: "TechHive",
    headline: "Premium Sound. Zero Limits.",
    subHeadline: "High-performance wireless headphones built for every moment.",
    tag: "ELECTRONICS",
    image: "/headphones.jpg",
    title: "From Low Visibility to Category Leader",
    desc: "We restructured, optimized and scaled their store visibility—driving qualified traffic and real revenue.",
    challenge: "Low rankings for high-intent keywords. Poor category structure and product visibility.",
    approach: "Category & product SEO, technical optimization, content strategy, internal linking & schema.",
    outcome: "Significant growth in organic traffic, revenue and top rankings within 6 months.",
    beforeTraffic: "2.1K",
    afterTraffic: "5.6K",
    trafficIncrease: "+167%",
    revIncrease: "+142%",
    transIncrease: "+153%",
    rankIncrease: "2.3x",
    quote: "Promanage didn't just bring us traffic. They brought the right buyers. Revenue has never been better.\"",
    authorName: "Rohan Mehta",
    authorTitle: "Founder, TechHive",
    duration: "6 Months",
    industry: "Electronics",
    tabTitle: "TECHHIVE"
  },
  {
    id: 1,
    company: "Urban Outfitters",
    headline: "Urban Style. Modern Vibe.",
    subHeadline: "Trendsetting apparel and lifestyle products for the modern generation.",
    tag: "FASHION",
    image: "/headphones.jpg",
    title: "Dominating Non-Branded Search",
    desc: "We captured high-intent shoppers searching for generic fashion terms by optimizing collection pages.",
    challenge: "High reliance on paid ads. Low visibility for non-branded, high-volume apparel keywords.",
    approach: "Extensive keyword clustering, collection page optimization, and high-authority link building.",
    outcome: "Reduced CPA by 40% while doubling organic revenue in less than 8 months.",
    beforeTraffic: "12.4K",
    afterTraffic: "38.2K",
    trafficIncrease: "+208%",
    revIncrease: "+245%",
    transIncrease: "+210%",
    rankIncrease: "3.5x",
    quote: "Our organic sales have skyrocketed. The SEO strategy is the best investment we've made.\"",
    authorName: "Sarah Jenkins",
    authorTitle: "VP Marketing, Urban",
    duration: "8 Months",
    industry: "Fashion",
    tabTitle: "URBAN OUTFITTERS"
  },
  {
    id: 2,
    company: "Luxe Living",
    headline: "Modern Elegance. Ultimate Comfort.",
    subHeadline: "Premium handcrafted furniture for contemporary living spaces.",
    tag: "HOME DECOR",
    image: "/headphones.jpg",
    title: "Scaling a Competitive D2C Brand",
    desc: "We helped a rising furniture brand break through the noise in a highly saturated organic market.",
    challenge: "Struggling to rank against established giants. Thin content on product pages.",
    approach: "Content gap analysis, rich snippet implementation, and a robust strategy for educational terms.",
    outcome: "Captured top 3 positions for key product categories and massive traffic growth.",
    beforeTraffic: "3.5K",
    afterTraffic: "14.2K",
    trafficIncrease: "+305%",
    revIncrease: "+180%",
    transIncrease: "+165%",
    rankIncrease: "4.1x",
    quote: "They understood our brand and executed a strategy that put us on the map organically.\"",
    authorName: "Priya Sharma",
    authorTitle: "CMO, Luxe Living",
    duration: "10 Months",
    industry: "Furniture",
    tabTitle: "LUXE LIVING"
  }
];

export default function EcommerceSeoResults() {
  const $t = useCmsText();
  const SLIDES = useCmsData("EcommerceSeoResults__SLIDES", SLIDES__cms);
  // true only in the browser (the chart measures the DOM); the rest of the section renders on the server too
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [activeSlide, setActiveSlide] = useState(0);


  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  
  const currentData = SLIDES[activeSlide];

  // Dynamic Chart Data Generation (Split into Before and After)
  const beforeVal = parseFloat(currentData.beforeTraffic.replace('K', '')) * 1000;
  const afterVal = parseFloat(currentData.afterTraffic.replace('K', '')) * 1000;
  const points: { index: number; before: number | null; after: number | null }[] = [];
  
  // Generate 10 points before SEO
  for (let i = 0; i <= 9; i++) {
    const val = beforeVal + (Math.sin(i * 1.5) * beforeVal * 0.15); 
    points.push({ index: i, before: val, after: null });
  }
  
  // Shared point to connect them seamlessly
  const connectionVal = points[9].before ?? beforeVal;
  points[9].after = connectionVal;

  // Generate 10 points after SEO
  for (let i = 10; i < 20; i++) {
    const progress = (i - 9) / 10; // 0.1 to 1.0
    // Curve upwards
    const trend = connectionVal + (afterVal - connectionVal) * Math.pow(progress, 1.5);
    const val = trend + (Math.cos(i * 2) * afterVal * 0.05);
    points.push({ index: i, before: null, after: val });
  }
  
  // Motion Variants
  const slideVariants: Variants = {
    enter: { opacity: 0, y: 20, filter: "blur(4px)" },
    center: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      filter: "blur(4px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const itemVariants: Variants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const chartData = points;

  const chartConfig = {
    before: {
      label: $t("EcommerceSeoResults__t1", "Before SEO"),
      color: "#94a3b8",
    },
    after: {
      label: $t("EcommerceSeoResults__t2", "After SEO"),
      color: "#0d9488",
    },
  } satisfies ChartConfig;

  return (
    <section className="pt-8 pb-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1640px] mx-auto relative z-10 px-5">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-slate-300 w-12"></div>
            <span className="text-teal-700 font-bold tracking-widest text-sm uppercase">{$t("EcommerceSeoResults__t3", "Proven Results")}</span>
            <div className="h-px bg-slate-300 w-12"></div>
          </div>
          <h2 className="text-h2 font-extrabold text-[#132a43] mb-4 tracking-tight">
            {$t("EcommerceSeoResults__t4", "Real Stores. Real Results. ")}<br />
            <span className="text-teal-700">{$t("EcommerceSeoResults__t5", "Verifiable Growth.")}</span>
          </h2>
          <p className="text-body text-slate-600 font-medium">
            {rich($t("EcommerceSeoResults__t6", "We help eCommerce brands turn SEO into "))}<span className="text-teal-700 relative inline-block">{$t("EcommerceSeoResults__t7", "measurable business impact.")}<svg className="absolute w-full h-2 -bottom-1 left-0 text-teal-300 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 2" stroke="currentColor" strokeWidth="2" fill="none"/></svg></span>
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <div onClick={prevSlide} className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center z-20 cursor-pointer hover:bg-slate-50 transition-colors hidden xl:flex">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#132a43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </div>
          <div onClick={nextSlide} className="absolute top-1/2 -right-6 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center z-20 cursor-pointer hover:bg-slate-50 transition-colors hidden xl:flex">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#132a43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden"
          >
            <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlide} 
              variants={slideVariants}
              initial="enter" 
              animate="center" 
              exit="exit" 
              className="p-2 pt-2"
            >
              <div className="flex flex-col lg:flex-row">
                
                {/* Left Column: Mockup */}
                <motion.div variants={itemVariants} className="lg:w-[35%] p-4">
                  <div className="bg-[#09090b] rounded-2xl h-full p-8 text-white relative overflow-hidden flex flex-col min-h-[450px]">
                    <div className="flex justify-between items-center mb-12 relative z-10 gap-4">
                      <div className="font-bold text-lg tracking-tight truncate mr-auto">{currentData.company}</div>
                      <div className="flex gap-2 xl:gap-4 text-[10px] xl:text-[11px] font-medium text-slate-400 hidden sm:flex shrink-0">
                        <span className="text-white hover:text-white cursor-pointer transition-colors">{$t("EcommerceSeoResults__t8", "Shop")}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{$t("EcommerceSeoResults__t9", "Categories")}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{$t("EcommerceSeoResults__t10", "Deals")}</span>
                        <span className="hover:text-white cursor-pointer transition-colors">{$t("EcommerceSeoResults__t11", "Support")}</span>
                      </div>
                      <div className="flex gap-3 text-slate-400 shrink-0">
                        <svg className="cursor-pointer hover:text-white transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <svg className="cursor-pointer hover:text-white transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                      </div>
                    </div>
                    
                    <div className="relative z-10 max-w-[200px] my-auto">
                      <h3 className="text-h4 font-bold mb-4" dangerouslySetInnerHTML={{ __html: currentData.headline.replace('.', '.<br/>') }}></h3>
                      <p className="text-small text-slate-400 mb-6">{currentData.subHeadline}</p>
                      <button className="bg-white text-black px-6 py-2.5 rounded-full text-[13px] font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors">
                        {$t("EcommerceSeoResults__t12", "SHOP NOW ")}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </button>
                    </div>

                    <div className="absolute bottom-6 left-6 z-10">
                      <div className="bg-white text-black px-3 py-1.5 rounded flex items-center gap-2 text-[11px] font-bold tracking-wider">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                        {currentData.tag}
                      </div>
                    </div>

                    {/* Headphone Image Background */}
                    <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-[350px] h-[350px] z-0">
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#09090b] z-10"></div>
                      <img src={currentData.image} alt={currentData.company} className="w-full h-full object-cover rounded-full mix-blend-lighten opacity-90" />
                    </div>
                  </div>
                </motion.div>

                {/* Middle Column: Info */}
                <motion.div variants={itemVariants} className="lg:w-[27%] p-8 lg:p-10 lg:pl-6 border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div className="text-teal-600 font-bold text-[13px] tracking-widest uppercase mb-4">{currentData.company}</div>
                  <h3 className="text-h5 font-bold text-[#132a43] mb-4">{currentData.title}</h3>
                  <p className="text-small text-slate-500 mb-8">
                    {currentData.desc}
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#132a43] mb-1">{$t("EcommerceSeoResults__t13", "The Challenge")}</h4>
                        <p className="text-small text-slate-500">{currentData.challenge}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#132a43] mb-1">{$t("EcommerceSeoResults__t14", "Our Approach")}</h4>
                        <p className="text-small text-slate-500">{currentData.approach}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="3"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[#132a43] mb-1">{$t("EcommerceSeoResults__t15", "The Outcome")}</h4>
                        <p className="text-small text-slate-500">{currentData.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: Metrics & Graph */}
                <motion.div variants={itemVariants} className="lg:w-[38%] p-8 lg:p-10 lg:px-7 flex flex-col">
                  <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-6">{$t("EcommerceSeoResults__t16", "Organic Traffic")}</div>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div>
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{$t("EcommerceSeoResults__t17", "Before SEO")}</div>
                      <div className="text-3xl font-bold text-slate-800">{currentData.beforeTraffic}</div>
                      <div className="text-[12px] text-slate-400">{$t("EcommerceSeoResults__t18", "visits / month")}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-teal-600 uppercase tracking-wider mb-1">{$t("EcommerceSeoResults__t19", "After SEO")}</div>
                      <div className="text-3xl font-bold text-teal-700">{currentData.afterTraffic}</div>
                      <div className="text-[12px] text-slate-400">{$t("EcommerceSeoResults__t20", "visits / month")}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-2xl font-bold text-teal-600">{currentData.trafficIncrease}</div>
                      <div className="text-[12px] font-medium text-teal-700">{$t("EcommerceSeoResults__t21", "Increase")}</div>
                    </div>
                  </div>

                  {/* Shadcn Area Chart - Split Design */}
                  <div className="relative mt-2 mb-8">
                    {/* Vertical Split Line */}
                    <div className="absolute left-[50%] top-2 bottom-8 border-l border-dashed border-slate-200 z-0"></div>

                    {mounted ? (
                    <ChartContainer config={chartConfig} className="h-[140px] w-full">
                      <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                          left: -30,
                          right: -30,
                          top: 10,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient id="fillBefore" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#cbd5e1" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#cbd5e1" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="fillAfter" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0d9488" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#0d9488" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                          dataKey="before"
                          type="monotone"
                          fill="url(#fillBefore)"
                          stroke="var(--color-before)"
                          strokeWidth={2.5}
                          dot={{ r: 3, fill: "white", stroke: "var(--color-before)", strokeWidth: 2 }}
                          activeDot={{ r: 5, fill: "var(--color-before)" }}
                          isAnimationActive={true}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                        <Area
                          dataKey="after"
                          type="monotone"
                          fill="url(#fillAfter)"
                          stroke="var(--color-after)"
                          strokeWidth={2.5}
                          dot={{ r: 3, fill: "white", stroke: "var(--color-after)", strokeWidth: 2 }}
                          activeDot={{ r: 5, fill: "var(--color-after)" }}
                          isAnimationActive={true}
                          animationDuration={2000}
                          animationEasing="ease-out"
                        />
                      </AreaChart>
                    </ChartContainer>
                    ) : (
                      <div className="h-[140px] w-full" aria-hidden />
                    )}

                    {/* X-Axis Labels Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 flex text-[10px] font-bold uppercase tracking-wider px-2">
                      <div className="w-1/2 text-slate-400 text-left">{$t("EcommerceSeoResults__t22", "Before SEO")}</div>
                      <div className="w-1/2 text-[#0d9488] text-left pl-2">{$t("EcommerceSeoResults__t23", "After 6 Months")}</div>
                    </div>
                  </div>

                  {/* 3 Mini Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 xl:gap-3">
                    <div className="bg-white rounded-[1rem] p-3 border border-slate-100 shadow-sm flex items-center gap-2.5 xl:gap-3 justify-center sm:justify-start">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#0f766e] text-[18px] xl:text-[20px] leading-none mb-1">{currentData.revIncrease}</div>
                        <div className="text-[9.5px] xl:text-[10.5px] text-[#132a43] font-semibold leading-[1.2]">{$t("EcommerceSeoResults__t24", "Organic")}<br/>{$t("EcommerceSeoResults__t25", "Revenue")}</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-[1rem] p-3 border border-slate-100 shadow-sm flex items-center gap-2.5 xl:gap-3 justify-center sm:justify-start">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#0f766e] text-[18px] xl:text-[20px] leading-none mb-1">{currentData.transIncrease}</div>
                        <div className="text-[9.5px] xl:text-[10.5px] text-[#132a43] font-semibold leading-[1.2]">{$t("EcommerceSeoResults__t26", "Transactions")}</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-[1rem] p-3 border border-slate-100 shadow-sm flex items-center gap-2.5 xl:gap-3 justify-center sm:justify-start">
                      <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-[#0f766e] text-[18px] xl:text-[20px] leading-none mb-1">{currentData.rankIncrease}</div>
                        <div className="text-[9.5px] xl:text-[10.5px] text-[#132a43] font-semibold leading-[1.2]">{$t("EcommerceSeoResults__t27", "Top 10")}<br/>{$t("EcommerceSeoResults__t28", "Rankings")}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Row: Testimonial */}
              <motion.div variants={itemVariants} className="border-t border-slate-100 bg-[#f8fafc] py-5 px-8 flex items-center justify-between rounded-b-[2rem]">
                
                {/* Quote and Text */}
                <div className="flex gap-4 items-start flex-1 pr-6">
                  <div className="text-[#0f766e] font-serif text-[54px] leading-[0.6] pt-4 mt-2 font-black tracking-tighter shrink-0">“</div>
                  <p className="text-small text-[#132a43] font-semibold max-w-[280px]">
                    {currentData.quote}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-px h-12 bg-slate-200 shrink-0"></div>
                
                {/* Profile */}
                <div className="flex items-center gap-3 px-8 shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-200">
                    <img src={$t("EcommerceSeoResults__t29", "https://i.pravatar.cc/150?img=11")} alt={$t("EcommerceSeoResults__t30", "Rohan Mehta")} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-[#132a43] text-[13px] mb-0.5">{currentData.authorName}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{currentData.authorTitle}</div>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="w-px h-12 bg-slate-200 shrink-0"></div>
                
                {/* Duration */}
                <div className="flex items-center gap-3 px-8 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#0f766e] uppercase tracking-widest mb-1">{$t("EcommerceSeoResults__t31", "Duration")}</div>
                    <div className="font-bold text-[#132a43] text-[12px]">{currentData.duration}</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-12 bg-slate-200 shrink-0"></div>

                {/* Industry */}
                <div className="flex items-center gap-3 pl-8 shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2"><path d="m15 5 4 4"/><path d="M13 14 8.5 9.5a2.12 2.12 0 0 0-3 0l-1 1a2.12 2.12 0 0 0 0 3l4.5 4.5a2.12 2.12 0 0 0 3 0l1-1a2.12 2.12 0 0 0 0-3Z"/><path d="M17.5 15 15 17.5a2.12 2.12 0 0 1-3 0l-6-6"/><path d="M17.5 15 22 10.5a2.12 2.12 0 0 0 0-3l-1-1a2.12 2.12 0 0 0-3 0L13.5 11"/></svg>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#0f766e] uppercase tracking-widest mb-1">{$t("EcommerceSeoResults__t32", "Industry")}</div>
                    <div className="font-bold text-[#132a43] text-[12px]">{currentData.industry}</div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Logos Bar (Carousel indicators) */}
        <div className="flex flex-wrap justify-center items-center gap-12 mt-12 mb-12 text-[#132a43]">
          {SLIDES.map((slide, index) => (
            <div key={slide.id} onClick={() => setActiveSlide(index)} className={`font-bold text-[14px] tracking-wide cursor-pointer transition-colors ${activeSlide === index ? 'border-b-2 border-[#132a43] pb-1 text-[#132a43]' : 'text-slate-400 hover:text-slate-600'}`}>
              {slide.tabTitle}
            </div>
          ))}
          <div className="font-bold text-[16px] tracking-wide text-slate-400 flex flex-col items-center hover:text-slate-600 cursor-pointer transition-colors leading-none">
            {$t("EcommerceSeoResults__t33", "GearUp")}<span className="text-[8px] tracking-[0.2em] mt-1 font-medium">{$t("EcommerceSeoResults__t34", "SPORTS")}</span>
          </div>
          <div className="font-bold text-[16px] tracking-wide text-slate-400 flex flex-col items-center hover:text-slate-600 cursor-pointer transition-colors leading-none">
            {$t("EcommerceSeoResults__t35", "BabyNest")}<span className="text-[8px] tracking-[0.2em] mt-1 font-medium">{$t("EcommerceSeoResults__t36", "BABY & KIDS")}</span>
          </div>
          <div className="font-bold text-[16px] tracking-wide text-slate-400 flex flex-col items-center hover:text-slate-600 cursor-pointer transition-colors leading-none">
            {$t("EcommerceSeoResults__t37", "BookWagon")}<span className="text-[8px] tracking-[0.2em] mt-1 font-medium">{$t("EcommerceSeoResults__t38", "BOOKS & MORE")}</span>
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0f766e] rounded-2xl p-6 px-10 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden"
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-14 h-14 rounded-full border border-teal-500/50 flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
            </div>
            <div>
              <h4 className="text-h6 text-white font-bold mb-1">{$t("EcommerceSeoResults__t39", "Your store can be next.")}</h4>
              <p className="text-small text-teal-100">{rich($t("EcommerceSeoResults__t40", "Let's build your growth story together."))}</p>
            </div>
          </div>
          
          <Link href={$t("EcommerceSeoResults__u1", "/contact")} className="mt-6 md:mt-0 relative z-10 bg-white text-teal-900 px-8 py-3.5 rounded-xl font-bold text-sm flex items-center gap-3 hover:bg-slate-50 transition-colors shadow-sm">
            {$t("EcommerceSeoResults__t41", "Get My Free SEO Strategy ")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
