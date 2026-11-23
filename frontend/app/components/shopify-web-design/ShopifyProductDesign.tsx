"use client";

import React from "react";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import Link from "next/link";

const TEAL = "#0d9488";
const NAVY = "#0f2333";

/* ── Icons ── */
const StarIcon = ({ filled = true }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "#e2e8f0"}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const CheckCircle = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
  </svg>
);
const StarBadgeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const SliderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    <circle cx="8" cy="6" r="2" fill={TEAL} /><circle cx="16" cy="12" r="2" fill={TEAL} /><circle cx="10" cy="18" r="2" fill={TEAL} />
  </svg>
);
const CursorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
  </svg>
);
const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const ShieldCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const CartIcon2 = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function ShopifyProductDesign() {
  return (
    <section className="py-10 sm:py-12 lg:py-14 bg-white overflow-hidden">
      <Container>
        {/* ── Main 2-column: Left text | Right visual ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 xl:gap-16 items-center">

          {/* ════ LEFT: Text content ════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mb-5" style={{ color: TEAL }}>
              Product Experience
              <svg width="12" height="12" viewBox="0 0 24 24" fill={TEAL}><path d="M12 2c0 4.5 4.5 9 9 9-4.5 0-9 4.5-9 9 0-4.5-4.5-9-9-9 4.5 0 9-4.5 9-9z"/></svg>
            </div>

            <h2 className="text-[34px] md:text-[40px] font-black leading-[1.08] mb-4" style={{ color: NAVY }}>
              We Design the Moment Before{" "}
              <span style={{ color: TEAL }}>"Add to Cart."</span>
            </h2>

            {/* teal accent dash */}
            <div className="w-10 h-1.5 rounded-full mb-5" style={{ background: TEAL }} />

            <p className="text-[15px] text-slate-500 leading-relaxed mb-10 max-w-[280px]">
              Every element on your product page is designed to{" "}
              <span className="font-bold text-[#0f2333]">build confidence</span>{" "}
              and <span className="font-bold text-[#0f2333]">drive action.</span>
            </p>

            {/* 3 stat icons */}
            <div className="flex gap-7">
              {[
                { icon: <TrendIcon />, label: "Higher\nConversions" },
                { icon: <ShieldCheckIcon />, label: "Stronger\nTrust" },
                { icon: <CartIcon2 />, label: "More\nSales" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-xl bg-[#f0fdfa] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 text-center whitespace-pre-line leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ════ RIGHT: Left callouts + Mockup + Right callouts ════ */}
          <div className="flex items-center gap-3 xl:gap-4">

            {/* Left callout cards with RIGHT-pointing connectors */}
            <div className="hidden lg:flex flex-col gap-4 shrink-0 w-[210px]">
              {[
                { icon: <ImageIcon />, title: "High Quality Imagery", desc: "Show products in the best light." },
                { icon: <StarBadgeIcon />, title: "Social Proof & Reviews", desc: "Build trust with real customer feedback." },
                { icon: <ShieldIcon />, title: "Trust Badges", desc: "Reassure and remove hesitation." },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-0"
                >
                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl border border-slate-100 shadow-[0_4px_18px_rgba(0,0,0,0.07)] p-2.5 flex items-start gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#f0fdfa] flex items-center justify-center shrink-0">{c.icon}</div>
                    <div>
                      <p className="text-[10px] font-bold text-[#0f2333] leading-tight">{c.title}</p>
                      <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                  {/* Dashed connector pointing RIGHT → mockup */}
                  <div className="flex items-center shrink-0 ml-1">
                    <div className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: TEAL, background: "white" }}/>
                    <svg width="32" height="2" viewBox="0 0 32 2">
                      <line x1="0" y1="1" x2="32" y2="1" stroke={TEAL} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Center: Product Mockup ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 min-w-0 max-w-[540px] mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.11)] border border-slate-100 overflow-hidden">

                {/* Browser nav */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-white">
                  <span className="text-[12px] font-black tracking-widest text-[#0f2333]">LUMEN</span>
                  <div className="flex gap-3 text-[8px] font-medium text-slate-400">
                    {["Shop","Best Sellers","About","Journal"].map(n=><span key={n}>{n}</span>)}
                  </div>
                  <div className="flex gap-2">
                    {[0,1,2].map(i=>(
                      <div key={i} className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-slate-300"/>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product body */}
                <div className="flex p-3 gap-4">

                  {/* Main image container */}
                  <div className="relative shrink-0 overflow-hidden rounded-xl" style={{width: 220, height: 320}}>
                    <img
                      src="/images/lumen-serum.jpg"
                      alt="Lumen Hydrating Face Serum"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Floating Elements Container */}
                    <div className="absolute top-4 left-3 flex flex-col items-start gap-1">
                      
                      {/* BEST SELLER badge */}
                      <div className="bg-white px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex items-center justify-center z-10 relative">
                        <span className="text-[8px] font-black text-[#0f2333] tracking-wide uppercase">BEST SELLER</span>
                      </div>

                      {/* Thumbnail Strip */}
                      <div className="flex flex-col gap-1.5 relative z-0">
                        {[0, 1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-[12px] bg-white p-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center">
                            <div className="w-full h-full rounded-[8px] overflow-hidden">
                              <img src="/images/lumen-serum.jpg" alt="" className="w-full h-full object-cover"/>
                            </div>
                          </div>
                        ))}
                        <div className="w-10 h-10 rounded-[12px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex items-center justify-center">
                          <span className="text-[12px] text-[#0f2333] font-black">+4</span>
                        </div>
                      </div>

                    </div>

                    {/* Zoom icon */}
                    <div className="absolute bottom-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0f2333" strokeWidth="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/></svg>
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="flex-1 py-1 pr-1 flex flex-col justify-between overflow-hidden" style={{minWidth:0}}>
                    <div>
                      <h3 className="text-[14px] font-black text-[#0f2333] leading-tight mb-1.5">Hydrating Face Serum</h3>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-1.5">
                        {[1,2,3,4].map(i=><StarIcon key={i} filled/>)}
                        <StarIcon filled={false}/>
                        <span className="text-[7.5px] text-slate-400 ml-1">(125 reviews)</span>
                      </div>

                      <p className="text-[17px] font-black text-[#0f2333] mb-2">$49.00</p>
                      <p className="text-[8px] text-slate-400 leading-snug mb-2.5">Deeply hydrates and nourishes for radiant, healthy-looking skin.</p>

                      {/* Benefits */}
                      <div className="space-y-1.5 mb-3">
                        {["Free shipping on orders $50+","30-day returns","Secure checkout"].map(t=>(
                          <div key={t} className="flex items-center gap-1.5">
                            <CheckCircle/><span className="text-[8px] text-slate-500">{t}</span>
                          </div>
                        ))}
                      </div>

                      {/* Size */}
                      <p className="text-[8px] font-bold text-slate-500 mb-1">Size</p>
                      <div className="flex gap-1 mb-3">
                        {["30 ml","60 ml","120 ml"].map((s,i)=>(
                          <button key={s} className={`text-[7px] font-bold px-2 py-0.5 rounded-md border transition-colors ${i===0?'border-[#0d9488] text-[#0d9488] bg-[#f0fdfa]':'border-slate-200 text-slate-400'}`}>{s}</button>
                        ))}
                      </div>

                      {/* Quantity */}
                      <p className="text-[8px] font-bold text-slate-500 mb-1">Quantity</p>
                      <div className="flex items-center gap-2 mb-3">
                        <button className="w-5 h-5 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 text-[11px] font-bold">−</button>
                        <span className="text-[11px] font-bold text-[#0f2333]">1</span>
                        <button className="w-5 h-5 rounded-md border border-slate-200 flex items-center justify-center text-slate-400 text-[11px] font-bold">+</button>
                      </div>
                    </div>

                    {/* CTA */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <button className="flex-1 bg-[#0d9488] text-white text-[9px] font-bold py-2 rounded-lg flex items-center justify-center gap-1.5">
                          Add to Cart
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        </button>
                        <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </button>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"/>
                        <p className="text-[7px] text-slate-400">People are viewing this right now</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right feature cards with dashed connectors */}
            <div className="hidden lg:flex flex-col gap-4 shrink-0 w-[210px]">
              {[
                { icon: <TagIcon />, title: "Clear Value Proposition", desc: "Communicate benefits in a glance." },
                { icon: <SliderIcon />, title: "Variants & Options", desc: "Make choices simple and seamless." },
                { icon: <CursorIcon />, title: "Strong CTA", desc: "Guide users to take action with confidence." },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  className="flex items-center gap-0"
                >
                  {/* Dashed connector line + dot */}
                  <div className="flex items-center shrink-0">
                    <svg width="36" height="2" viewBox="0 0 36 2">
                      <line x1="0" y1="1" x2="30" y2="1" stroke={TEAL} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5"/>
                    </svg>
                    <div className="w-2.5 h-2.5 rounded-full border-2 shrink-0" style={{ borderColor: TEAL, background: "white" }}/>
                  </div>
                  {/* Card */}
                  <div className="flex-1 bg-white rounded-xl border border-slate-100 shadow-[0_4px_18px_rgba(0,0,0,0.07)] p-2.5 flex items-start gap-2 ml-1.5">
                    <div className="w-7 h-7 rounded-lg bg-[#f0fdfa] flex items-center justify-center shrink-0">{c.icon}</div>
                    <div>
                      <p className="text-[10px] font-bold text-[#0f2333] leading-tight">{c.title}</p>
                      <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{c.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mt-16 lg:mt-24 rounded-[20px] bg-[#f4fcf9] border border-[#dff3eb] py-4 px-6 sm:py-5 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-sm"
        >
          {/* Left Graphic */}
          <div className="relative shrink-0 flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center">
            <img src="/shopify2.png" alt="Shopify" className="w-full h-full object-contain" />
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-[22px] sm:text-[26px] font-extrabold leading-tight tracking-tight" style={{ color: NAVY }}>
              Want a product page that <span style={{ color: TEAL }}>sells for you?</span>
            </h3>
            <p className="text-[13px] sm:text-[14px] text-slate-600 mt-2 font-medium max-w-md mx-auto lg:mx-0">
              Get a free audit of your store&apos;s product experience.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 mt-5">
              {[
                "Expert UX Review",
                "Conversion Insights",
                "Actionable Improvements"
              ].map((label) => (
                <span key={label} className="flex items-center gap-2">
                  <span className="flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: TEAL }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span className="text-[11px] font-bold text-[#0f2333] tracking-wide">{label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(6,78,59,0.5)] transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              style={{ backgroundColor: "#064e3b" }}
            >
              Get Free Product Page Audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <div className="flex items-center gap-2 mr-1">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="h-[22px] w-[22px] rounded-full ring-[1.5px] ring-[#f4fcf9] bg-slate-200 shadow-sm" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-600">Trusted by 100+ Shopify store owners</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
