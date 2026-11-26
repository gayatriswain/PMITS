"use client";
import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import Container from '../shared/Container';
import { useCmsText } from "@/components/cms/SectionContent";
import Link from "next/link";
import { rich } from "@/components/cms/rich";

// Matches the reference CodePen's technique (JonasBadalic/pen/rNErWw): the line isn't one
// continuous path — it's one straight `<path>` PER SEGMENT between consecutive points, each with
// its own stroke-dashoffset draw-in, staggered index-by-index. That's what makes it read as a
// snappy, cascading "connect the dots left-to-right" reveal instead of one slow continuous draw.
const SEGMENT_STAGGER = 0.125; // seconds between each segment starting (reference: 125ms)
const SEGMENT_DURATION = 0.28; // seconds each segment takes to draw (reference: 250ms)
const DOT_BASE_DELAY = 0.32; // a dot starts shortly after its segment begins (reference: 375ms)
const DOT_DURATION = 0.55;
const EASE_SNAP = [0.84, 0, 0.2, 1] as [number, number, number, number]; // reference's cubic-bezier

// Draw Dot Animation - syncs with the SVG clipPath wipe
const drawDot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    // The line takes 1.6s to travel 100% width.
    transition: { duration: 0.4, delay: (i * 0.2), type: "spring", stiffness: 300, damping: 20 }
  })
};

const fadeArea: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 1, duration: 1 }
  }
};

// One "M x1,y1 L x2,y2" path per segment, exactly like the reference builds its graph.
function buildSegments(points: [number, number][]) {
  const segments: string[] = [];
  for (let i = 1; i < points.length; i++) {
    const [x1, y1] = points[i - 1];
    const [x2, y2] = points[i];
    segments.push(`M${x1},${y1} L${x2},${y2}`);
  }
  return segments;
}

export default function GoogleAdsCaseStudy() {
  const $t = useCmsText();
  const [activeIndex, setActiveIndex] = useState(0);

  // Y coords for Cost Per Lead (grey) — gradually falls, no sharp jumps, so the smoothed curve
  // below has nothing sharp to overshoot around.
  const costY = [22, 27, 34, 42, 50, 59, 67, 74, 80];
  // Y coords for Leads (teal) — gradually rises, crossing the cost line around week 4-5.
  const leadsY = [82, 75, 67, 58, 48, 38, 28, 18, 8];

  const leadsPts: [number, number][] = leadsY.map((y, i) => [i * 12.5, y]);
  const costPts: [number, number][] = costY.map((y, i) => [i * 12.5, y]);
  const leadsSegments = buildSegments(leadsPts);
  const costSegments = buildSegments(costPts);
  // Straight-segment leads line, closed down to the bottom corners, for the gradient fill under it.
  const leadsAreaPath = `M${leadsPts[0][0]},${leadsPts[0][1]} ${leadsPts.slice(1).map(([x, y]) => `L${x},${y}`).join(" ")} L100,100 L0,100 Z`;

  return (
    <section className="py-20 bg-[#fafdfc] overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-caption text-[#00897b] font-bold tracking-widest uppercase mb-4">{rich($t("GoogleAdsCaseStudy__t1", "Real Results • Real Growth"))}</p>
          <h2 className="text-h2 font-bold text-[#132a43] mb-4 font-serif">
            {$t("GoogleAdsCaseStudy__t2", "Stories of Growth.")}<br />
            {$t("GoogleAdsCaseStudy__t3", "Backed by ")}<span className="text-[#00897b]">{$t("GoogleAdsCaseStudy__t4", "Real Results.")}</span>
          </h2>
          <p className="text-small text-slate-500 max-w-xl mx-auto">
            {rich($t("GoogleAdsCaseStudy__t5", "We help businesses turn ad spend into measurable growth through smart Google Ads strategies."))}</p>
        </div>

        {/* Carousel Area */}
        <div className="relative max-w-6xl mx-auto mb-16">
          
          {/* Navigation Arrows */}
          <button className="absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center z-20 text-slate-400 hover:text-slate-800 transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <button className="absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#004e48] rounded-full shadow-md flex items-center justify-center z-20 text-white hover:bg-[#003d38] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 flex flex-col lg:flex-row overflow-hidden relative z-10">
            
            {/* Left Panel - Info */}
            <div className="w-full lg:w-[35%] relative flex flex-col justify-between overflow-hidden bg-white">
              {/* Background structural setup */}
              <div className="absolute bottom-0 left-0 w-full h-[45%] z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent z-10"></div>
                <img src={$t("GoogleAdsCaseStudy__t6", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80")} alt={$t("GoogleAdsCaseStudy__t7", "Interior")} className="w-full h-full object-cover object-bottom" />
              </div>
              
              <div className="relative z-20 p-8 lg:p-10 h-full flex flex-col">
                <div>
                  <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 border border-teal-100 text-[#00897b] text-[10px] font-bold tracking-wider uppercase mb-8 shadow-sm">
                    <span>★</span> {$t("GoogleAdsCaseStudy__t8", "Featured Case Study")}</div>
                  
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-[#004e48] rounded-[1.25rem] flex items-center justify-center text-white shadow-[0_8px_16px_rgba(0,78,72,0.2)] shrink-0">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2M4 15V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7M9 22h6"/></svg>
                    </div>
                    
                    <div>
                      <p className="text-[#00897b] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 mt-1">{rich($t("GoogleAdsCaseStudy__t9", "Interior Design Studio"))}</p>
                      
                      <h3 className="text-h4 font-bold text-[#132a43] mb-4 font-serif relative z-30 tracking-tight">
                        {$t("GoogleAdsCaseStudy__t10", "Luxury Leads.")}<br />{$t("GoogleAdsCaseStudy__t11", "Lower Costs.")}</h3>
                      
                      <p className="text-small text-slate-600 mb-8 max-w-[260px] relative z-30 font-medium">
                        {rich($t("GoogleAdsCaseStudy__t12", "We helped a luxury interior design studio generate high-quality leads while reducing cost per lead by 40%."))}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 flex items-center gap-8 border-t border-slate-200/80">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <span className="text-[10px] font-bold tracking-wider uppercase">{$t("GoogleAdsCaseStudy__t13", "Industry")}</span>
                    </div>
                    <p className="text-small font-semibold text-[#1a2b3c]">{rich($t("GoogleAdsCaseStudy__t14", "Interior Design"))}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span className="text-[10px] font-bold tracking-wider uppercase">{$t("GoogleAdsCaseStudy__t15", "Duration")}</span>
                    </div>
                    <p className="text-small font-semibold text-[#1a2b3c]">{rich($t("GoogleAdsCaseStudy__t16", "3 Months"))}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Panel - Results & Chart */}
            <div className="w-full lg:w-[40%] bg-white p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between relative z-20">
              <div>
                <p className="text-caption flex items-center gap-2 text-[#132a43] font-bold tracking-widest uppercase mb-8">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="3"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                  {rich($t("GoogleAdsCaseStudy__t17", "The Results"))}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div>
                    <div className="w-12 h-12 bg-[#e0f2f1] rounded-2xl flex items-center justify-center text-[#00897b] mb-4">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h4 className="text-h4 font-bold text-[#00897b] mb-1">{$t("GoogleAdsCaseStudy__t18", "+186%")}</h4>
                    <p className="text-caption font-bold text-[#132a43] mb-1">{rich($t("GoogleAdsCaseStudy__t19", "Qualified Leads"))}</p>
                    <p className="text-[10px] text-slate-400">{rich($t("GoogleAdsCaseStudy__t20", "vs previous 3 months"))}</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 mb-4 border border-slate-100">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                    </div>
                    <h4 className="text-h4 font-bold text-[#132a43] mb-1">-40%</h4>
                    <p className="text-caption font-bold text-[#132a43] mb-1">{rich($t("GoogleAdsCaseStudy__t21", "Cost Per Lead"))}</p>
                    <p className="text-[10px] text-slate-400">{rich($t("GoogleAdsCaseStudy__t22", "vs previous 3 months"))}</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00897b] mb-4 border border-slate-100">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                    </div>
                    <h4 className="text-h4 font-bold text-[#00897b] mb-1">{$t("GoogleAdsCaseStudy__t23", "6.2x")}</h4>
                    <p className="text-caption font-bold text-[#132a43] mb-1">{rich($t("GoogleAdsCaseStudy__t24", "ROAS Improved"))}</p>
                    <p className="text-[10px] text-slate-400">{rich($t("GoogleAdsCaseStudy__t25", "vs previous 3 months"))}</p>
                  </div>
                </div>
              </div>

              {/* Animated Chart */}
              <div className="relative pt-4">
                <div className="flex items-center gap-6 mb-6 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#00897b] rounded-full"></span> {$t("GoogleAdsCaseStudy__t26", "Leads")}</div>
                  <div className="flex items-center gap-2"><span className="w-4 h-1 bg-[#a3b1c6] rounded-full"></span> {$t("GoogleAdsCaseStudy__t27", "Cost Per Lead")}</div>
                </div>
                
                <div className="relative w-full h-[140px]">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between border-b border-slate-100 pb-6">
                    <div className="w-full h-px bg-slate-100/60"></div>
                    <div className="w-full h-px bg-slate-100/60"></div>
                    <div className="w-full h-px bg-slate-100/60"></div>
                  </div>
                  
                  {/* SVG Container for Lines and Fill */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    
                    <defs>
                      {/* Gradient Fill for Leads */}
                      <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00897b" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00897b" stopOpacity="0" />
                      </linearGradient>

                      {/* ClipPath Wipe Animation */}
                      <clipPath id="wipeClip">
                        <motion.rect
                          x="0" y="-10" height="120"
                          initial={{ width: 0 }}
                          whileInView={{ width: 100 }}
                          transition={{ duration: 1.6, ease: "linear" }}
                          viewport={{once: true}}
                        />
                      </clipPath>
                    </defs>

                    {/* Group masked by the animated ClipPath */}
                    <g clipPath="url(#wipeClip)">
                      {/* Background Gradient Area */}
                      <path
                        d={leadsAreaPath}
                        fill="url(#gradientFill)"
                      />

                      {/* Cost Per Lead Line */}
                      {costSegments.map((seg, i) => (
                        <path
                          key={`cost-seg-${i}`}
                          d={seg}
                          fill="none" stroke="#a3b1c6" strokeWidth="2.5" strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      ))}

                      {/* Leads Line */}
                      {leadsSegments.map((seg, i) => (
                        <path
                          key={`leads-seg-${i}`}
                          d={seg}
                          fill="none" stroke="#00897b" strokeWidth="2.5" strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      ))}
                    </g>
                  </svg>

                  {/* Cost Dots (HTML divs for perfect circles) - Animated pop */}
                  {costY.map((y, i) => (
                    <motion.div
                      key={`cost-${i}`}
                      className="absolute bg-white rounded-full z-10"
                      style={{
                        left: `${i * 12.5}%`,
                        top: `${y}%`,
                        width: '8px',
                        height: '8px',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid #a3b1c6'
                      }}
                      variants={drawDot} custom={i} initial="hidden" whileInView="visible" viewport={{once: true}}
                    />
                  ))}

                  {/* Leads Dots - Animated pop */}
                  {leadsY.map((y, i) => (
                    <motion.div
                      key={`lead-${i}`}
                      className={`absolute bg-white rounded-full z-20`}
                      style={{
                        left: `${i * 12.5}%`,
                        top: `${y}%`,
                        width: i === 8 ? '12px' : '8px',
                        height: i === 8 ? '12px' : '8px',
                        transform: 'translate(-50%, -50%)',
                        border: `${i === 8 ? '3px' : '2px'} solid #00897b`
                      }}
                      variants={drawDot} custom={i} initial="hidden" whileInView="visible" viewport={{once: true}}
                    />
                  ))}

                  {/* Tooltip (Animated entry) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.5 }} viewport={{once: true}}
                    className="absolute right-0 top-[-25px] -translate-y-full transform bg-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] border border-slate-50 rounded-lg px-3 py-1.5 flex flex-col items-center z-30"
                  >
                    <span className="text-[#00897b] font-bold text-sm leading-tight">{$t("GoogleAdsCaseStudy__t28", "186")}</span>
                    <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">{$t("GoogleAdsCaseStudy__t29", "Leads")}</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-b border-r border-slate-50"></div>
                  </motion.div>

                  {/* X Axis labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>{$t("GoogleAdsCaseStudy__t30", "Week 1")}</span>
                    <span>{$t("GoogleAdsCaseStudy__t31", "Week 4")}</span>
                    <span>{$t("GoogleAdsCaseStudy__t32", "Week 8")}</span>
                    <span>{$t("GoogleAdsCaseStudy__t33", "Week 12")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Testimonial */}
            <div className="w-full lg:w-[25%] bg-[#fafdfc] p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center relative z-20">
              <div className="text-[#004e48] text-6xl font-serif leading-none mb-4 opacity-80">“</div>
              <p className="text-body text-[#132a43] mb-8 font-medium">
                {rich($t("GoogleAdsCaseStudy__t34", "\"ProManage delivered exactly what they promised. Our "))}<span className="text-[#00897b]">{$t("GoogleAdsCaseStudy__t35", "leads increased")}</span> {rich($t("GoogleAdsCaseStudy__t36", "and our "))}<span className="text-[#00897b]">{$t("GoogleAdsCaseStudy__t37", "cost finally went down.")}</span>"
              </p>
              
              <div className="w-10 h-px bg-slate-200 mb-6"></div>
              
              <div className="flex items-center gap-3">
                <img src={$t("GoogleAdsCaseStudy__t38", "https://i.pravatar.cc/150?img=11")} alt={$t("GoogleAdsCaseStudy__t39", "Rohit Bansal")} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                <div>
                  <h5 className="text-sm font-bold text-[#132a43]">{$t("GoogleAdsCaseStudy__t40", "Rohit Bansal")}</h5>
                  <p className="text-caption text-slate-500">{rich($t("GoogleAdsCaseStudy__t41", "Founder"))}</p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <span className="w-2 h-2 rounded-full bg-[#004e48]"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
          </div>
        </div>

        {/* Logos Bar */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 py-8 border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase shrink-0">
            {rich($t("GoogleAdsCaseStudy__t42", "Trusted by growing businesses"))}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 w-full md:w-auto overflow-hidden">
            <span className="font-sans text-sm font-semibold flex items-center gap-1.5"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>{$t("GoogleAdsCaseStudy__t43", "STUDIO OAK")}</span>
            <span className="font-sans text-sm font-bold tracking-tight">{$t("GoogleAdsCaseStudy__t44", "urban space")}<span className="font-light text-[9px] block">{$t("GoogleAdsCaseStudy__t45", "DESIGNS")}</span></span>
            <span className="font-serif text-sm">{$t("GoogleAdsCaseStudy__t46", "LUXE")}<span className="font-light text-[9px] block tracking-widest">{$t("GoogleAdsCaseStudy__t47", "INTERIORS")}</span></span>
            <span className="font-serif text-sm">{$t("GoogleAdsCaseStudy__t48", "HOME NEST")}<span className="font-light text-[8px] block tracking-widest">{$t("GoogleAdsCaseStudy__t49", "COLLECTION")}</span></span>
            <span className="font-sans text-sm font-light">{$t("GoogleAdsCaseStudy__t50", "DÉCOR")}<span className="font-bold text-[9px] block tracking-widest">{$t("GoogleAdsCaseStudy__t51", "CRAFT")}</span></span>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-6xl mx-auto mt-6 bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-[#f4f9f8] rounded-full flex items-center justify-center text-[#00897b] shrink-0 border border-teal-50">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="2 12 12 2 22 12"/></svg>
            </div>
            <div>
              <h3 className="text-h6 font-bold text-[#132a43]">
                {$t("GoogleAdsCaseStudy__t52", "Ready to see ")}<span className="text-[#00897b]">{$t("GoogleAdsCaseStudy__t53", "real results")}</span><br className="hidden sm:block"/> {$t("GoogleAdsCaseStudy__t54", "for your business?")}</h3>
            </div>
          </div>
          
          <div className="hidden lg:block text-sm text-slate-500 font-medium">
            {$t("GoogleAdsCaseStudy__t55", "Let's build a Google Ads strategy")}<br />{$t("GoogleAdsCaseStudy__t56", "that drives measurable growth.")}</div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto shrink-0">
            <Link href={$t("GoogleAdsCaseStudy__u2", "/testimonials")} className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#1a2b3c] border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              {$t("GoogleAdsCaseStudy__t57", "View More Case Studies")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href={$t("GoogleAdsCaseStudy__u1", "/contact")} className="w-full sm:w-auto px-6 py-3.5 bg-[#004e48] text-white rounded-lg text-sm font-bold hover:bg-[#003d38] transition-colors shadow-lg flex items-center justify-center gap-2">
              {$t("GoogleAdsCaseStudy__t58", "Get Free Strategy")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          
        </div>

      </Container>
    </section>
  );
}
