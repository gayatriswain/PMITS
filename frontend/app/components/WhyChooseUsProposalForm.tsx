"use client";

import React from "react";
import { Rocket, Target, ShieldCheck, Clock, FileText, User, Mail, Phone, MapPin, Edit3, Lock, ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const DARK_GREEN = "#0a231f";
const INPUT_BG = "#061815";
const INPUT_BORDER = "#113a34";
const TEAL = "#0d9488";
const LIGHT_TEAL = "#2dd4bf";

export default function WhyChooseUsProposalForm() {
  return (
    <section className="py-24 bg-[#f8fafc] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-8">
          
          {/* Left Column: Content & Illustration */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between py-4">
            
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-100 bg-white mb-8 shadow-sm">
                <Rocket size={14} style={{ color: TEAL }} />
                <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: TEAL }}>
                  LET'S TURN YOUR IDEA INTO REALITY
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl md:text-[44px] font-black leading-[1.1] mb-6 text-[#0f2333] tracking-tight">
                Get My <br />
                <span className="relative inline-block" style={{ color: TEAL }}>
                  Free
                  {/* Swoosh Underline */}
                  <svg className="absolute w-full h-3 -bottom-1 left-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span> Proposal
              </h2>

              <p className="text-[14px] text-slate-600 font-medium mb-10 leading-relaxed max-w-md">
                Share a few details about your project and our experts will create a personalized roadmap to help your business grow faster.
              </p>

              {/* Bullet Points */}
              <div className="flex flex-col gap-6 mb-12">
                
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-teal-50 border border-teal-100">
                    <Target size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0f2333] mb-0.5">Tailored for You</h4>
                    <p className="text-[12px] text-slate-500 font-medium">A custom strategy aligned with your goals.</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-purple-50 border border-purple-100">
                    <Rocket size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0f2333] mb-0.5">Actionable & Clear</h4>
                    <p className="text-[12px] text-slate-500 font-medium">No fluff, just a clear plan that delivers results.</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-amber-50 border border-amber-100">
                    <ShieldCheck size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0f2333] mb-0.5">100% Confidential</h4>
                    <p className="text-[12px] text-slate-500 font-medium">Your information is safe with us.</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-blue-50 border border-blue-100">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0f2333] mb-0.5">Fast Response</h4>
                    <p className="text-[12px] text-slate-500 font-medium">We'll get back to you within 24 hours.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Illustration Placeholder (since no 3D asset is available) */}
            <div className="relative w-full h-[220px] bg-slate-200/50 rounded-2xl flex items-center justify-center mt-auto border border-slate-200">
              <div className="text-slate-400 font-medium text-sm text-center px-4">
                [ 3D Proposal Illustration Placeholder ] <br/>
                <span className="text-xs">Upload your 3D asset to the public folder</span>
              </div>
              
              {/* Floating Trusted Card */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-4 flex items-center gap-4 border border-slate-100 z-10">
                <div className="w-10 h-10 rounded-full bg-[#e6f4f1] flex items-center justify-center">
                  <UsersIcon className="text-teal-600" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Trusted by</p>
                  <h4 className="text-lg font-black text-[#0f2333] leading-none mb-1">100+</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">Businesses Worldwide</p>
                </div>
                <div className="ml-2 w-8 h-8 rounded bg-teal-50 flex items-end justify-between p-1">
                  <div className="w-1.5 h-3 bg-teal-300 rounded-sm"></div>
                  <div className="w-1.5 h-4 bg-teal-400 rounded-sm"></div>
                  <div className="w-1.5 h-6 bg-teal-500 rounded-sm"></div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: The Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-7/12 relative"
          >
            {/* The Form Container */}
            <div className="w-full bg-[#0a231f] rounded-[2rem] p-8 md:p-12 relative shadow-[0_30px_60px_rgba(10,35,31,0.3)] border border-[#113a34]">
              
              {/* Left Pointer (Arrow) pointing to the left column */}
              <div className="hidden lg:block absolute top-1/2 -left-4 w-8 h-8 bg-[#0a231f] border-b border-l border-[#113a34] rotate-45 -translate-y-1/2 rounded-bl-sm"></div>

              {/* Form Header */}
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-12 h-12 rounded-full bg-[#e6f4f1] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                  <FileText size={24} className="text-[#0a231f]" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-1">
                  Let's Build Something
                </h3>
                <h3 className="text-[32px] font-medium leading-tight" style={{ color: LIGHT_TEAL, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  Amazing Together!
                </h3>
                {/* Decorative Swirl under text */}
                <svg className="w-32 h-3 mt-1 opacity-80" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 25 0 50 10 T 100 10" fill="none" stroke={LIGHT_TEAL} strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* The Form */}
              <form className="flex flex-col gap-5">
                
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="relative w-full">
                    <User size={18} className="absolute left-4 top-[18px] text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="First Name*" 
                      required
                      className="w-full bg-[#061815] border border-[#113a34] rounded-xl py-4 pl-12 pr-4 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    />
                  </div>
                  <div className="relative w-full">
                    <User size={18} className="absolute left-4 top-[18px] text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Last Name*" 
                      required
                      className="w-full bg-[#061815] border border-[#113a34] rounded-xl py-4 pl-12 pr-4 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="relative w-full">
                    <Mail size={18} className="absolute left-4 top-[18px] text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="Business Email*" 
                      required
                      className="w-full bg-[#061815] border border-[#113a34] rounded-xl py-4 pl-12 pr-4 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    />
                  </div>
                  <div className="relative w-full">
                    <Phone size={18} className="absolute left-4 top-[18px] text-slate-400" />
                    <input 
                      type="tel" 
                      placeholder="Phone Number* (with country code)" 
                      required
                      className="w-full bg-[#061815] border border-[#113a34] rounded-xl py-4 pl-12 pr-4 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="relative w-full">
                  <MapPin size={18} className="absolute left-4 top-[18px] text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Your Location*" 
                    required
                    className="w-full bg-[#061815] border border-[#113a34] rounded-xl py-4 pl-12 pr-4 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#2dd4bf] transition-colors"
                  />
                </div>

                {/* Row 4 */}
                <div className="relative w-full">
                  <Edit3 size={18} className="absolute left-4 top-[18px] text-slate-400" />
                  <textarea 
                    placeholder="What's your biggest challenge right now? What's not working with your current digital presence?" 
                    required
                    rows={4}
                    className="w-full bg-[#061815] border border-[#113a34] rounded-xl py-4 pl-12 pr-4 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#2dd4bf] transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Divider Line */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-[#113a34]"></div>
                  </div>
                  <div className="relative bg-[#0a231f] px-4">
                    <span className="text-[#2dd4bf] font-serif italic text-sm">
                      No Commitment. Just Possibilities.
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#0d9488] to-[#2dd4bf] text-[#042f2e] font-black rounded-xl py-4 px-6 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-[0_10px_20px_rgba(45,212,191,0.2)] group"
                >
                  <div className="flex items-center gap-3">
                    <Rocket size={20} strokeWidth={2.5} />
                    <span className="text-[14px] uppercase tracking-wide">Send My Free Proposal</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#042f2e] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={16} className="text-[#2dd4bf]" strokeWidth={3} />
                  </div>
                </button>

                {/* Privacy Text */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Lock size={12} className="text-slate-400" />
                  <p className="text-[11px] text-slate-400 font-medium">
                    We respect your privacy. Your information is safe with us.
                  </p>
                </div>

              </form>

              {/* Top Right Dots Decoration */}
              <div className="absolute top-8 right-8 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
                ))}
              </div>

              {/* Bottom Right Squiggle Decoration */}
              <div className="absolute bottom-6 right-6 opacity-40 pointer-events-none hidden md:block">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round">
                  <path d="M20 80 Q 40 100 60 80 T 100 50" />
                  <polyline points="90 40 100 50 90 60" />
                </svg>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Inline UsersIcon component since we didn't import it at the top
function UsersIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}
