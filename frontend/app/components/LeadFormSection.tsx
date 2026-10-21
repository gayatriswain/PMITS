"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Clock, ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function LeadFormSection() {
  return (
    <section className="pt-8 pb-24 bg-white relative font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');
        .font-handwriting { font-family: 'Dancing Script', cursive; }
      `}</style>
      
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        
        {/* Main Banner Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[24px] overflow-hidden relative shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #02231c 0%, #063d33 70%, #0d6d5a 100%)"
          }}
        >
          {/* Subtle Background Glow/Texture */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 md:gap-14 p-8 md:p-14 items-center relative z-10">
            
            {/* Left Content */}
            <div>
              <div className="text-[#14b8a6] text-[11px] font-bold tracking-[0.15em] uppercase mb-4">Let's Grow Together</div>
              
              <h2 className="text-4xl md:text-[52px] font-black text-white leading-[1.05] mb-6 tracking-tight">
                Ready to Grow<br/>Your Store?
              </h2>
              
              <p className="text-[17px] md:text-[19px] text-white/90 mb-10 font-medium">
                <span className="text-[#34d399]">Give us your store.</span> We'll show you<br className="hidden md:block" /> where SEO can take it.
              </p>
              
              {/* Trust Features */}
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <div className="flex gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center shrink-0">
                    <Rocket size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-[13px] font-bold mb-1">Free SEO Strategy</h4>
                    <p className="text-teal-50/60 text-[11px] leading-relaxed">A custom plan for your store, free of cost.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-[13px] font-bold mb-1">Quick Turnaround</h4>
                    <p className="text-teal-50/60 text-[11px] leading-relaxed">Get your report within 2-3 business days.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full border border-teal-500/40 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-white text-[13px] font-bold mb-1">No Sales Pitch</h4>
                    <p className="text-teal-50/60 text-[11px] leading-relaxed">We'll review your store before we recommend anything.</p>
                  </div>
                </div>
              </div>
              
              {/* Handwriting Text */}
              <div className="relative inline-block mt-4">
                <p 
                  className="text-[#fde047] text-[28px] md:text-[34px] font-handwriting tracking-wide leading-tight relative z-10"
                  style={{ textShadow: "2px 4px 6px rgba(0, 0, 0, 0.4)" }}
                >
                  We'll review your store before we recommend anything.
                </p>
                {/* Custom Brush Underline */}
                <svg className="absolute w-[80%] h-[12px] -bottom-0 left-[10%] text-[#fde047] z-0" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q100,0 200,6 Q100,3 0,5 Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            
            {/* Right Form Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full"
            >
              <form 
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                }}
              >
                
                {/* Form Field */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0f2923] mb-1.5">Your Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter your name" 
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors placeholder:text-slate-400"
                  />
                </div>
                
                {/* Form Field */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0f2923] mb-1.5">Work Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your work email" 
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors placeholder:text-slate-400"
                  />
                </div>
                
                {/* Form Field */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0f2923] mb-1.5">Store / Website URL <span className="text-red-500">*</span></label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://yourstore.com" 
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-800 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors placeholder:text-slate-400"
                  />
                </div>
                
                {/* Form Field */}
                <div>
                  <label className="block text-[11px] font-bold text-[#0f2923] mb-1.5">Monthly Revenue (Optional)</label>
                  <select 
                    defaultValue=""
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-600 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] transition-colors bg-white appearance-none"
                  >
                    <option value="" disabled>Select range</option>
                    <option value="0-10k">$0 - $10k</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k+">$100k+</option>
                  </select>
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full bg-[#0f766e] hover:bg-[#0c5a54] text-white font-bold rounded-lg py-3.5 mt-2 flex items-center justify-center gap-2 transition-colors text-[14px]"
                >
                  Get My Free SEO Strategy
                  <ArrowRight size={16} />
                </button>
                
                {/* Footer Note */}
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-slate-500 font-medium">
                  <Lock size={10} className="text-slate-400" />
                  <span>Free consultation</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                  <span>No obligation</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                  <span>Confidential</span>
                </div>
                
              </form>
            </motion.div>
            
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
