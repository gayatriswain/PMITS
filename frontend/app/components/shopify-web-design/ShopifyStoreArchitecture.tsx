"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DEEP_TEAL = "#0b3b35";

// Icons for left column features
const ChartUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

// Step Icons
const HomeIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0a302a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" fill="#75ae9c"/>
    <path d="M15 21V13H9v8" fill="#0a302a"/>
    <path d="M18 7v-3h-2" />
  </svg>
);
const GridIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0a302a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" fill="#0a302a" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" fill="#75ae9c" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" fill="#75ae9c" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" fill="#0a302a" />
  </svg>
);
const BagIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0a302a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l1 12H4L5 8z" fill="#0a302a" />
    <path d="M5 8h14l.3 4H4.7L5 8z" fill="#75ae9c" stroke="none" />
    <path d="M5 8h14l1 12H4L5 8z" />
    <path d="M9 8V5a3 3 0 0 1 6 0v3" />
  </svg>
);
const CartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0a302a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="20" r="1.5" fill="#0a302a" />
    <circle cx="18" cy="20" r="1.5" fill="#0a302a" />
    <path d="M2 3h3l2.5 12h11.5l2.5-9H6.5" fill="#75ae9c" />
  </svg>
);
const LockIcon = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0a302a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H13l-2-2H5a2 2 0 0 0-2 2z" fill="#0a302a" />
    <rect x="5" y="9" width="14" height="10" rx="1" fill="#75ae9c" />
    <path d="M3 12h18v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" fill="#0a302a" />
    <circle cx="17" cy="14" r="1" fill="#fff" stroke="none"/>
  </svg>
);

function MockupHomepage() {
  const $t = useCmsText();
  return (
    <div className="flex flex-col w-full h-full p-1.5 gap-1.5">
      <div className="flex-1 rounded-lg relative overflow-hidden flex flex-col items-start p-3 shadow-inner">
        {/* Full Background Image */}
        <img src={$t("ShopifyStoreArchitecture__t1", "/product1.webp")} alt={$t("ShopifyStoreArchitecture__t2", "Background")} className="absolute inset-0 w-full h-full object-cover z-0" />
        {/* Subtle white gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-0"></div>
        
        <h5 className="text-[12px] font-black text-[#0f2333] leading-tight z-10 relative">{$t("ShopifyStoreArchitecture__t3", "New Arrivals")}</h5>
        <p className="text-[7px] text-slate-700 font-medium mb-2 mt-1 z-10 relative">{rich($t("ShopifyStoreArchitecture__t4", "Curated picks for you"))}</p>
        <button className="bg-[#0b3b35] text-white text-[6px] font-bold px-3 py-1.5 rounded-[4px] shadow-md z-10 relative">{$t("ShopifyStoreArchitecture__t5", "Shop Now")}</button>
      </div>
      <div className="flex justify-between px-0.5 shrink-0">
        {[ 
          { i:$t("ShopifyStoreArchitecture__t6", "/product1.webp"), l:$t("ShopifyStoreArchitecture__t7", "Chairs") }, 
          { i:$t("ShopifyStoreArchitecture__t8", "/product2.webp"), l:$t("ShopifyStoreArchitecture__t9", "Tables") }, 
          { i:$t("ShopifyStoreArchitecture__t10", "/product3.webp"), l:$t("ShopifyStoreArchitecture__t11", "Lighting") }, 
          { i:$t("ShopifyStoreArchitecture__t12", "/product5.webp"), l:$t("ShopifyStoreArchitecture__t13", "Decor") } 
        ].map(x => (
          <div key={x.l} className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-[6px] border border-slate-100 overflow-hidden shadow-sm">
              <img src={x.i} alt={x.l} className="w-full h-full object-cover" />
            </div>
            <span className="text-[5px] font-bold text-slate-500">{x.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupCollections() {
  const $t = useCmsText();
  return (
    <div className="flex flex-col w-full h-full p-2">
      <div className="mb-1.5">
        <h5 className="text-[11px] font-black text-[#0f2333] leading-tight">{$t("ShopifyStoreArchitecture__t14", "Living Room")}</h5>
        <p className="text-[6px] text-slate-400 mt-1">{rich($t("ShopifyStoreArchitecture__t15", "42 items"))}</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5 flex-1">
        {[1,2,4,5].map(i => (
          <div key={i} className="bg-[#f4ece3] rounded-lg relative overflow-hidden shadow-sm">
            <img src={`/product${i}.webp`} alt={$t("ShopifyStoreArchitecture__t16", "Product")} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-2.5 shrink-0">
        <button className="w-full bg-[#0b3b35] text-white text-[6px] font-bold py-1.5 rounded-md shadow-sm">{$t("ShopifyStoreArchitecture__t17", "Explore Collection")}</button>
      </div>
    </div>
  );
}

function MockupProduct() {
  const $t = useCmsText();
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="flex-1 bg-[#f1f3f2] rounded-xl relative overflow-hidden mb-3 shrink-0 shadow-sm">
        <img src={$t("ShopifyStoreArchitecture__t18", "/product1.webp")} alt={$t("ShopifyStoreArchitecture__t19", "Modern Armchair")} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
        <div className="absolute top-2 left-2 bg-[#c6e1d5] px-2.5 py-1 rounded-[6px] flex items-center justify-center z-10">
          <span className="text-[6.5px] font-bold text-[#143d34] leading-none mt-[0.5px]">{$t("ShopifyStoreArchitecture__t20", "Best Seller")}</span>
        </div>
      </div>
      <div className="px-1 flex flex-col shrink-0">
        <h5 className="text-[12px] font-black text-[#0f2333] leading-tight">{$t("ShopifyStoreArchitecture__t21", "Modern Armchair")}</h5>
        <p className="text-[10px] font-extrabold text-[#0b3b35] mt-1">{rich($t("ShopifyStoreArchitecture__t22", "$249.00"))}</p>
        <div className="flex items-center gap-0.5 mt-1">
          {[1,2,3,4,5].map(i=><svg key={i} width="8" height="8" viewBox="0 0 24 24" fill="#8da379"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>)}
          <span className="text-[7px] text-slate-500 ml-1 font-medium">{$t("ShopifyStoreArchitecture__t23", "(128 reviews)")}</span>
        </div>
        <div className="mt-2.5">
          <p className="text-[7px] text-[#0f2333] font-bold mb-1">{rich($t("ShopifyStoreArchitecture__t24", "Color: "))}<span className="font-normal text-slate-500">{$t("ShopifyStoreArchitecture__t25", "Sage Green")}</span></p>
          <div className="flex gap-1.5 mt-1.5">
            <div className="w-4 h-4 rounded-full bg-[#e3dfd6] shadow-sm"></div>
            <div className="w-4 h-4 rounded-full bg-[#91a78d] shadow-sm"></div>
            <div className="w-4 h-4 rounded-full bg-[#6d917d] shadow-sm"></div>
            <div className="w-4 h-4 rounded-full bg-[#e3e6e4] shadow-sm"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 mb-0.5">
          <button className="flex-1 bg-[#0b3b35] text-white text-[8px] font-bold py-2 rounded-lg shadow-md">{$t("ShopifyStoreArchitecture__t26", "Add to Cart")}</button>
          <button className="w-8 h-8 bg-[#f0f7f5] border border-[#d6ebe4] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function MockupCart() {
  const $t = useCmsText();
  return (
    <div className="flex flex-col w-full h-full relative p-2.5">
      <h5 className="text-[12px] font-black text-[#0f2333] mb-3 mt-1.5">{$t("ShopifyStoreArchitecture__t27", "Your Cart ")}<span className="text-slate-400 font-semibold text-[10px] ml-0.5">{$t("ShopifyStoreArchitecture__t28", "(2)")}</span></h5>
      
      <div className="flex-1 flex flex-col gap-3">
        {/* Item 1 */}
        <div className="flex gap-2.5 items-start">
          <div className="w-[42px] h-[42px] rounded-[6px] bg-[#f4ece3] shrink-0 overflow-hidden shadow-sm">
             <img src={$t("ShopifyStoreArchitecture__t29", "/product1.webp")} alt={$t("ShopifyStoreArchitecture__t30", "Armchair")} className="w-full h-full object-cover mix-blend-multiply" />
          </div>
          <div className="flex-1 flex flex-col pt-0.5">
            <div className="flex justify-between items-start">
               <h6 className="text-[8.5px] font-bold text-[#0f2333]">{$t("ShopifyStoreArchitecture__t31", "Modern Armchair")}</h6>
               <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0f2333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <p className="text-[6.5px] text-slate-500 mt-0.5">{rich($t("ShopifyStoreArchitecture__t32", "Sage Green"))}</p>
            <p className="text-[8.5px] font-bold text-[#0f2333] mt-1">{rich($t("ShopifyStoreArchitecture__t33", "$249.00"))}</p>
            
            <div className="flex justify-between items-center mt-2.5">
               <p className="text-[8px] font-bold text-[#0f2333]">{rich($t("ShopifyStoreArchitecture__t34", "$249.00"))}</p>
               <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-2 py-0.5 rounded-[5px]">
                   <span className="text-[7px] text-slate-300 font-bold">-</span>
                   <span className="text-[7.5px] font-bold text-slate-600">{$t("ShopifyStoreArchitecture__t35", "1")}</span>
                   <span className="text-[7px] text-slate-300 font-bold">+</span>
                 </div>
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
               </div>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex gap-2.5 items-start mt-1">
          <div className="w-[42px] h-[42px] rounded-[6px] bg-[#f4ece3] shrink-0 overflow-hidden shadow-sm">
             <img src={$t("ShopifyStoreArchitecture__t36", "/product2.webp")} alt={$t("ShopifyStoreArchitecture__t37", "Side Table")} className="w-full h-full object-cover mix-blend-multiply" />
          </div>
          <div className="flex-1 flex flex-col pt-0.5">
            <div className="flex justify-between items-start">
               <h6 className="text-[8.5px] font-bold text-[#0f2333]">{$t("ShopifyStoreArchitecture__t38", "Wooden Side Table")}</h6>
               <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#0f2333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <p className="text-[6.5px] text-slate-500 mt-0.5">{rich($t("ShopifyStoreArchitecture__t39", "Natural"))}</p>
            <p className="text-[8.5px] font-bold text-[#0f2333] mt-1">{rich($t("ShopifyStoreArchitecture__t40", "$129.00"))}</p>
            
            <div className="flex justify-between items-center mt-2.5">
               <p className="text-[8px] font-bold text-[#0f2333]">{rich($t("ShopifyStoreArchitecture__t41", "$129.00"))}</p>
               <div className="flex items-center gap-2">
                 <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-2 py-0.5 rounded-[5px]">
                   <span className="text-[7px] text-slate-300 font-bold">-</span>
                   <span className="text-[7.5px] font-bold text-slate-600">{$t("ShopifyStoreArchitecture__t42", "1")}</span>
                   <span className="text-[7px] text-slate-300 font-bold">+</span>
                 </div>
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto shrink-0 border-t border-slate-100 pt-3">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9.5px] font-black text-[#0f2333]">{$t("ShopifyStoreArchitecture__t43", "Subtotal")}</span>
          <span className="text-[10px] font-black text-[#0f2333]">{$t("ShopifyStoreArchitecture__t44", "$378.00")}</span>
        </div>
        <button className="w-full bg-[#0b3b35] text-white text-[9px] font-bold py-2.5 rounded-[6px] shadow-sm">
          {$t("ShopifyStoreArchitecture__t45", "Checkout Securely")}</button>
      </div>
    </div>
  );
}

function MockupCheckout() {
  const $t = useCmsText();
  return (
    <div className="flex flex-col w-full h-full relative p-1.5">
      <div className="flex flex-col items-center pt-2 mb-4">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2.5" className="mb-1"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        <h5 className="text-[12px] font-black text-[#0f2333]">{$t("ShopifyStoreArchitecture__t46", "Secure Checkout")}</h5>
        <p className="text-[8px] text-slate-400 mt-1 font-medium">{rich($t("ShopifyStoreArchitecture__t47", "You're almost there!"))}</p>
      </div>
      
      {/* Progress */}
      <div className="flex justify-between items-center px-2.5 mb-5 relative">
        <div className="absolute top-1.5 left-6 right-6 h-[1.5px] bg-[#e6f4f1] z-0"></div>
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-[#c6e3d8] flex items-center justify-center shadow-sm"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg></div>
          <span className="text-[7.5px] font-bold text-[#0f2333]">{$t("ShopifyStoreArchitecture__t48", "Information")}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-[#c6e3d8] flex items-center justify-center shadow-sm"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg></div>
          <span className="text-[7.5px] font-bold text-[#0f2333]">{$t("ShopifyStoreArchitecture__t49", "Shipping")}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-[#c6e3d8] flex items-center justify-center shadow-sm"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="3.5"><polyline points="20 6 9 17 4 12" /></svg></div>
          <span className="text-[7.5px] font-bold text-[#0f2333]">{$t("ShopifyStoreArchitecture__t50", "Payment")}</span>
        </div>
      </div>
      
      {/* Fields */}
      <div className="flex flex-col gap-2.5 px-2 flex-1">
        <div className="border border-slate-100 rounded-[8px] flex justify-between items-center bg-white shadow-sm px-2.5 py-2">
          <span className="text-[8.5px] text-[#475569] font-medium">{$t("ShopifyStoreArchitecture__t51", "Contact")}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="border border-slate-100 rounded-[8px] flex justify-between items-center bg-white shadow-sm px-2.5 py-2">
          <span className="text-[8.5px] text-[#475569] font-medium">{$t("ShopifyStoreArchitecture__t52", "Shipping Address")}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="border border-slate-100 rounded-[8px] flex justify-between items-center bg-white shadow-sm px-2.5 py-2">
          <span className="text-[8.5px] text-[#475569] font-medium">{$t("ShopifyStoreArchitecture__t53", "Payment Method")}</span>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
      
      <div className="mt-auto px-2 pb-2">
        <button className="w-full bg-[#0b3b35] text-white text-[9.5px] font-bold py-2.5 rounded-[6px] mb-2 shadow-sm">{$t("ShopifyStoreArchitecture__t54", "Place Order")}</button>
        <div className="flex items-center justify-center gap-1.5">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          <span className="text-[7.5px] text-slate-500 font-medium">{$t("ShopifyStoreArchitecture__t55", "SSL Secured • 256-bit Encryption")}</span>
        </div>
      </div>
    </div>
  );
}


const STEPS__cms = [
  { id: "01", icon: <HomeIcon />, title: "Homepage", desc: "Make a great\nfirst impression", Mockup: MockupHomepage },
  { id: "02", icon: <GridIcon />, title: "Collections", desc: "Help shoppers\nfind faster", Mockup: MockupCollections },
  { id: "03", icon: <BagIcon />, title: "Product", desc: "Build confidence\nto buy", Mockup: MockupProduct },
  { id: "04", icon: <CartIcon />, title: "Cart", desc: "Keep it simple\nand clear", Mockup: MockupCart },
  { id: "05", icon: <LockIcon />, title: "Checkout", desc: "Smooth, secure\nand seamless", Mockup: MockupCheckout },
];

export default function ShopifyStoreArchitecture() {
  const $t = useCmsText();
  const STEPS = useCmsData("ShopifyStoreArchitecture__STEPS", STEPS__cms);
  return (
    <section className="relative w-full bg-[#fcfdfd] py-16 overflow-hidden border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8 xl:gap-12">
          
          {/* Left Column */}
          <div className="w-full xl:w-[320px] shrink-0 text-center xl:text-left pt-0 xl:pt-16">
            <div className="flex items-center justify-center xl:justify-start gap-2 mb-4">
              <span className="w-5 h-0.5" style={{ backgroundColor: TEAL }} />
              <span className="text-[10px] font-extrabold tracking-widest text-[#0b3b35] uppercase">{$t("ShopifyStoreArchitecture__t56", "Store Architecture")}</span>
            </div>
            
            <h2 className="text-h2 font-black mb-4" style={{ color: NAVY }}>
              {$t("ShopifyStoreArchitecture__t57", "A Better Store Starts With ")}<span style={{ color: TEAL }}>{$t("ShopifyStoreArchitecture__t58", "Better Structure.")}</span>
            </h2>
            
            <p className="text-small text-slate-600 font-medium mb-8 max-w-lg mx-auto xl:mx-0">
              {rich($t("ShopifyStoreArchitecture__t59", "We design the entire shopping journey with purpose and conversion in mind. Every step is crafted to guide customers from discovery to purchase—seamlessly."))}</p>
            
            <Link
              href={$t("ShopifyStoreArchitecture__t60", "/contact")}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              style={{ backgroundColor: DEEP_TEAL }}
            >
              {$t("ShopifyStoreArchitecture__t61", "See How We Design Stores")}<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Feature Mini-cards */}
            <div className="hidden xl:flex items-stretch mt-12">
              {[
                { icon: <ChartUpIcon />, text: $t("ShopifyStoreArchitecture__t62", "Better Experience\nMore Conversions") },
                { icon: <ShieldIcon />, text: $t("ShopifyStoreArchitecture__t63", "Built for Trust\nand Credibility") },
                { icon: <RocketIcon />, text: $t("ShopifyStoreArchitecture__t64", "Ready to Scale\nand Grow") },
              ].map((f, i) => (
                <div key={i} className={`flex flex-col items-start gap-2 w-[115px] ${i > 0 ? "border-l border-[#dcedeb] pl-4 ml-4" : ""}`}>
                  <div className="text-[#0b3b35]">{f.icon}</div>
                  <span className="text-[9px] font-bold text-[#132a43] leading-[1.4] whitespace-pre-line">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Horizontal Flow - Scaled Down) */}
          <div className="flex-1 w-full relative">
            
            {/* Top Badge */}
            <div className="flex justify-center mb-8 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e6f4f1] border border-[#ccede5]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span className="text-[9px] font-black tracking-widest text-[#0b3b35] uppercase">{$t("ShopifyStoreArchitecture__t65", "The Shopping Journey We Design")}</span>
                <span className="w-3 h-[1.5px] bg-[#0d9488] ml-1" />
              </div>
            </div>


            <div className="flex flex-wrap md:flex-nowrap justify-center xl:justify-start items-start gap-3 md:gap-4 lg:gap-5 relative z-10 w-full max-w-[1100px]">
              {STEPS.map((step, index) => (
                <div key={step.id} className="relative flex flex-col items-center w-[180px] md:w-[200px] xl:w-[220px] shrink-0">
                  
                  {/* Connectors (Top) */}

                  {/* Step Number & Connector Line */}
                  <div className="flex flex-col items-center mb-1.5 z-20 relative">
                    <div className="w-7 h-7 rounded-full bg-white border border-[#75ae9c] flex items-center justify-center shadow-sm z-10">
                      <span className="text-[10px] font-black text-[#0a302a]">{step.id}</span>
                    </div>
                    <div className="w-[1.5px] h-2 bg-[#75ae9c] -mt-0.5" />
                  </div>

                  {/* Step Icon */}
                  <div className="w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shadow-[0_8px_20px_rgb(0,0,0,0.06)] mb-4 z-20 relative">
                    <div className="scale-[0.9]">{step.icon}</div>
                  </div>

                  {/* Step Title & Desc */}
                  <h4 className="text-[13px] font-bold text-[#0b3b35] mb-1">{step.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium text-center whitespace-pre-line leading-snug mb-6">
                    {step.desc}
                  </p>

                  {/* Mockups */}
                  <div className={`w-full bg-white border border-slate-100 rounded-[16px] shadow-[0_4px_20px_rgb(0,0,0,0.04)] p-1.5 relative ${step.id === "05" ? "h-[360px] xl:h-[390px]" : step.id === "03" || step.id === "02" ? "h-[320px] xl:h-[340px]" : step.id === "04" ? "h-[330px] xl:h-[360px]" : "h-[260px] xl:h-[280px]"}`}>
                    
                    {/* Small anchor dot connecting to the wavy line */}
                    <div className="hidden md:flex absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white items-center justify-center shadow-sm border border-slate-100 z-20">
                       <div className="w-1 h-1 rounded-full bg-[#0d9488]" />
                    </div>

                    <div className="w-full h-full bg-white rounded-[12px] border border-slate-50 overflow-hidden relative">
                       <step.Mockup />
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Results Banner */}
        <div className="mt-16 w-full bg-white border border-slate-100 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-8 flex flex-col xl:flex-row items-center gap-8 xl:gap-12 relative z-20">
          
          {/* Left Text */}
          <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 w-full">
            <div className="w-[80px] h-[80px] shrink-0 bg-[#eaf5f2] rounded-2xl flex items-center justify-center shadow-inner">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            </div>
            <div>
              <h3 className="text-h5 font-black text-[#0f2333] mb-2">{$t("ShopifyStoreArchitecture__t66", "Better Structure. Better Flow. Better Results.")}</h3>
              <p className="text-small font-medium text-slate-500 max-w-lg mx-auto sm:mx-0">
                {rich($t("ShopifyStoreArchitecture__t67", "A well-structured store improves user experience, builds trust, and increases conversions at every step of the journey."))}</p>
            </div>
          </div>

          {/* Stats Divider */}
          <div className="hidden xl:block w-[1px] h-[60px] bg-slate-200 shrink-0"></div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full xl:w-auto shrink-0 justify-center">
            {/* Stat 1 */}
            <div className="flex items-center gap-4">
               <div className="w-11 h-11 rounded-full bg-[#f0f7f5] flex items-center justify-center shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
               </div>
               <div>
                 <p className="text-[26px] font-black text-[#0b3b35] leading-none mb-1">{rich($t("ShopifyStoreArchitecture__t68", "2.5x"))}</p>
                 <p className="text-[9px] font-bold text-[#0f2333] leading-snug">{rich($t("ShopifyStoreArchitecture__t69", "Higher Conversion"))}<br/>{rich($t("ShopifyStoreArchitecture__t70", "with Better Structure"))}</p>
               </div>
            </div>

            <div className="hidden sm:block w-[1px] h-[40px] bg-slate-200 shrink-0"></div>

            {/* Stat 2 */}
            <div className="flex items-center gap-4">
               <div className="w-11 h-11 rounded-full bg-[#f0f7f5] flex items-center justify-center shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
               </div>
               <div>
                 <p className="text-[26px] font-black text-[#0b3b35] leading-none mb-1">35%</p>
                 <p className="text-[9px] font-bold text-[#0f2333] leading-snug">{rich($t("ShopifyStoreArchitecture__t71", "Increase in AOV with"))}<br/>{rich($t("ShopifyStoreArchitecture__t72", "Optimized Flow"))}</p>
               </div>
            </div>

            <div className="hidden sm:block w-[1px] h-[40px] bg-slate-200 shrink-0"></div>

            {/* Stat 3 */}
            <div className="flex items-center gap-4">
               <div className="w-11 h-11 rounded-full bg-[#f0f7f5] flex items-center justify-center shrink-0">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b3b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               </div>
               <div>
                 <p className="text-[26px] font-black text-[#0b3b35] leading-none mb-1">60%</p>
                 <p className="text-[9px] font-bold text-[#0f2333] leading-snug">{rich($t("ShopifyStoreArchitecture__t73", "Fewer Drop-offs with"))}<br/>{rich($t("ShopifyStoreArchitecture__t74", "Seamless Checkout"))}</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
