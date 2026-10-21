"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function EcommerceSeoLayers() {
  return (
    <section className="bg-[#fafdfc] py-24 relative overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-slate-200"></div>
            <span className="text-[#00897b] text-xs font-bold tracking-[0.2em] uppercase">How We Optimize</span>
            <div className="h-[1px] w-12 bg-slate-200"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-[#132a43] mb-6 font-serif tracking-tight">
            Your Store Has Layers.<br />
            <span className="text-[#00897b]">We Optimize Every One.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            From search intent to site structure, we optimize every layer of your store so search engines understand it and shoppers love it.
          </p>
        </div>

        {/* Main Diagram Area */}
        <div className="relative flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-12 mb-20">
          
          {/* Left Cards */}
          <div className="w-full xl:w-[320px] flex flex-col gap-6 relative z-20 shrink-0">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex gap-4 relative z-10">
              <svg className="absolute hidden xl:block top-1/2 left-[100%] w-[50px] h-[120px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 0 20 L 15 20 Q 25 20 25 30 L 25 90 Q 25 100 35 100 L 50 100" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="0" cy="20" r="4" fill="#0d9488" />
                <circle cx="50" cy="100" r="4" fill="#0d9488" />
              </svg>
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-[#132a43] font-bold text-[15px] mb-2 leading-tight">1. Search Intent<br/>& Keyword Research</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We analyze what your ideal customers search for and target high-intent keywords that drive sales.</p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex gap-4 relative z-10">
              <svg className="absolute hidden xl:block top-1/2 left-[100%] w-[50px] h-[40px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 0 20 L 50 20" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="0" cy="20" r="4" fill="#16a34a" />
                <circle cx="50" cy="20" r="4" fill="#16a34a" />
              </svg>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 border border-green-100 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-[#132a43] font-bold text-[15px] mb-2 leading-tight">2. Product & Category SEO</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We optimize titles, descriptions, attributes, tags and category pages to rank higher and convert better.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex gap-4 relative z-10">
              <svg className="absolute hidden xl:block bottom-1/2 left-[100%] w-[50px] h-[120px] pointer-events-none z-0" style={{ transform: 'translate(0px, 20px)', overflow: 'visible' }}>
                <path d="M 0 100 L 15 100 Q 25 100 25 90 L 25 30 Q 25 20 35 20 L 50 20" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="0" cy="100" r="4" fill="#2563eb" />
                <circle cx="50" cy="20" r="4" fill="#2563eb" />
              </svg>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-[#132a43] font-bold text-[15px] mb-2 leading-tight">3. Technical SEO</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We improve site speed, mobile experience, indexing, crawlability and fix technical issues that hold rankings back.</p>
              </div>
            </div>
          </div>

          {/* Center Mockup */}
          <div className="w-full max-w-[600px] bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden relative z-10 flex flex-col shrink-0">
            {/* Browser Header */}
            <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6 bg-white/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#00897b] rounded flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <span className="font-bold text-[#132a43] text-sm">YourStore</span>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-[11px] font-bold text-slate-500">
                <span className="text-[#00897b]">Shop</span>
                <span>Categories</span>
                <span>New Arrivals</span>
                <span>Sale</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              </div>
            </div>

            {/* Product Layout */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8 relative bg-white">
              {/* Product Image */}
              <div className="w-full sm:w-1/2 flex flex-col gap-4">
                <div className="text-[9px] font-bold text-slate-400 flex items-center gap-2 mb-2">
                  <span>Home</span>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <span>Men</span>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <span>Jackets</span>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                  <span className="text-slate-600">Performance Jacket</span>
                </div>
                <div className="aspect-[4/3] bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 p-4">
                  <img src="/red-jacket.jpg" alt="Jacket" className="w-full h-full object-contain mix-blend-multiply" style={{ filter: 'hue-rotate(150deg)' }} />
                </div>
                <div className="flex gap-2 justify-between">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`aspect-square w-[22%] bg-slate-50 rounded-lg border ${i===1 ? 'border-[#00897b]' : 'border-slate-100'} p-1`}>
                      <img src="/red-jacket.jpg" alt="Thumb" className="w-full h-full object-contain mix-blend-multiply opacity-80" style={{ filter: 'hue-rotate(150deg)' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full sm:w-1/2 flex flex-col justify-center">
                <div className="inline-flex bg-green-50 text-green-700 text-[8px] font-bold px-2 py-1 rounded border border-green-100 self-start mb-3">Best Seller</div>
                <h3 className="text-[17px] font-bold text-[#132a43] leading-tight mb-0.5">Men's Performance Jacket</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                  <span className="text-[9px] text-slate-500 font-medium ml-1">(230 reviews)</span>
                </div>
                
                <div className="flex items-center gap-4 mb-3 pb-3 border-b border-slate-100">
                  <span className="text-[22px] font-bold text-[#132a43]">$129.00</span>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-green-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> In Stock
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[7px] text-slate-500 font-bold mb-4">
                  <div className="flex items-center gap-1 whitespace-nowrap"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> Lightweight</div>
                  <div className="flex items-center gap-1 leading-tight whitespace-nowrap"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg> <span>Water Resistant</span></div>
                  <div className="flex items-center gap-1 whitespace-nowrap"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg> Breathable</div>
                </div>

                <button className="w-full bg-[#00605a] hover:bg-[#004e48] text-white py-2 rounded-lg font-bold text-[9px] flex items-center justify-center gap-2 mb-3 shadow-[0_4px_14px_rgba(0,137,123,0.3)]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  Add to Cart
                </button>

                <div className="flex items-center gap-4 justify-center text-[7px] font-bold text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> Free Shipping</div>
                  <div className="flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Easy Returns</div>
                </div>

                <div className="grid grid-cols-3 gap-2 border border-slate-200 rounded-xl p-3 mt-2">
                  <div>
                    <p className="text-[7px] text-slate-400 font-bold mb-1">Category</p>
                    <p className="text-[8px] font-bold text-slate-700">Men &gt; Jackets</p>
                  </div>
                  <div>
                    <p className="text-[7px] text-slate-400 font-bold mb-1">Material</p>
                    <p className="text-[8px] font-bold text-slate-700">Polyester Blend</p>
                  </div>
                  <div>
                    <p className="text-[7px] text-slate-400 font-bold mb-1">Tags</p>
                    <p className="text-[8px] font-bold text-slate-700 leading-tight">Running, Outdoor, Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Schema Code Block Overlay at Bottom */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 font-mono text-[9px] sm:text-[10px] text-slate-500 relative flex justify-between items-center z-10">
              <pre className="whitespace-pre-wrap leading-relaxed">
{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Men's Performance Jacket",
  "aggregateRating": { "ratingValue": "4.9", "reviewCount": "230" },
  "offers": { "price": "129.00", "availability": "InStock" }
}`}
              </pre>
              <div className="bg-white px-3 py-2 rounded shadow-sm border border-slate-100 flex flex-col items-center gap-1">
                <span className="font-sans font-bold text-[10px] text-[#132a43] text-center leading-tight">Schema<br/>Markup</span>
                <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Cards */}
          <div className="w-full xl:w-[320px] flex flex-col gap-6 relative z-20 shrink-0">
            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex gap-4 relative z-10">
              <svg className="absolute hidden xl:block top-1/2 right-[100%] w-[50px] h-[120px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 50 20 L 35 20 Q 25 20 25 30 L 25 90 Q 25 100 15 100 L 0 100" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="50" cy="20" r="4" fill="#a855f7" />
                <circle cx="0" cy="100" r="4" fill="#a855f7" />
              </svg>
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-[#132a43] font-bold text-[15px] mb-2 leading-tight">4. Schema &<br/>Rich Results</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We implement structured data so your products get rich results, ratings and more visibility in search.</p>
              </div>
            </div>
            
            {/* Card 5 */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex gap-4 relative z-10">
              <svg className="absolute hidden xl:block top-1/2 right-[100%] w-[50px] h-[40px] pointer-events-none z-0" style={{ transform: 'translate(0px, -20px)', overflow: 'visible' }}>
                <path d="M 50 20 L 0 20" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="50" cy="20" r="4" fill="#f97316" />
                <circle cx="0" cy="20" r="4" fill="#f97316" />
              </svg>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c2410c" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-[#132a43] font-bold text-[15px] mb-2 leading-tight">5. Image & Shopping Optimization</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We optimize images, file names, alt text and product feeds to improve visibility in Google Images and Shopping.</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 flex gap-4 relative z-10">
              <svg className="absolute hidden xl:block bottom-1/2 right-[100%] w-[50px] h-[120px] pointer-events-none z-0" style={{ transform: 'translate(0px, 20px)', overflow: 'visible' }}>
                <path d="M 50 100 L 35 100 Q 25 100 25 90 L 25 30 Q 25 20 15 20 L 0 20" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="50" cy="100" r="4" fill="#0d9488" />
                <circle cx="0" cy="20" r="4" fill="#0d9488" />
              </svg>
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 relative z-10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0f766e" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <div className="relative z-10">
                <h4 className="text-[#132a43] font-bold text-[15px] mb-2 leading-tight">6. Internal Linking &<br/>Site Structure</h4>
                <p className="text-xs text-slate-500 leading-relaxed">We build a strong internal linking structure that helps search engines discover and rank your most important pages.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Horizontal Bar */}
        <div className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div>
              <h5 className="font-bold text-[13px] text-[#132a43] mb-0.5">Stronger Structure</h5>
              <p className="text-[11px] text-slate-500">Search engines can crawl, understand and trust your store.</p>
            </div>
          </div>

          <div className="hidden lg:block text-slate-300"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></div>

          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="2.5"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>
            </div>
            <div>
              <h5 className="font-bold text-[13px] text-[#132a43] mb-0.5">Better Visibility</h5>
              <p className="text-[11px] text-slate-500">Your products rank higher across more searches.</p>
            </div>
          </div>

          <div className="hidden lg:block text-slate-300"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></div>

          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div>
              <h5 className="font-bold text-[13px] text-[#132a43] mb-0.5">Qualified Shoppers</h5>
              <p className="text-[11px] text-slate-500">You attract people who are ready to compare and buy.</p>
            </div>
          </div>

          <div className="hidden lg:block text-slate-300"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg></div>

          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00897b" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <div>
              <h5 className="font-bold text-[13px] text-[#132a43] mb-0.5">More Sales</h5>
              <p className="text-[11px] text-slate-500">More visibility. More clicks. More revenue for your business.</p>
            </div>
          </div>

          <div className="shrink-0 mt-4 md:mt-0">
            <button className="bg-[#00605a] hover:bg-[#004e48] text-white px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors">
              See What We Optimize <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
