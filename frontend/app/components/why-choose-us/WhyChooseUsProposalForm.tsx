"use client";

import Image from "next/image";

import React, { useState } from "react";
import Honeypot from "@/components/cms/Honeypot";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
import { Rocket, Target, ShieldCheck, Clock, FileText, User, Mail, Phone, MapPin, Edit3, Lock, Send, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";
import { goToThankYou } from "@/lib/forms";

const TEAL = "#0d9488";
const MINT = "#5fd4bd";

export default function WhyChooseUsProposalForm() {
  const $t = useCmsText();
  const [hp, setHp] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Same contract as the other proposal forms: stored under Admin → Proposals.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) || "").trim();
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: v("firstName"),
          lastName: v("lastName"),
          email: v("email"),
          phone: v("phone"),
          location: v("location"),
          message: v("message"),
          source: "why-choose-us",
          website: hp,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      if (res.ok) {
      setSent(true);
      goToThankYou("why-choose-us");
    }
      else setError(json.error || json.message || "Something went wrong. Please try again.");
    } catch {
      setError("Could not reach the server. Please check your connection and try again.");
    }
    setSending(false);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#f6f7f8] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-8">
          
          {/* Left Column: Content & Illustration */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between py-4">
            
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-100 bg-white mb-8 shadow-sm">
                <Rocket size={14} style={{ color: TEAL }} />
                <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: TEAL }}>
                  {$t("WhyChooseUsProposalForm__t1", "LET'S TURN YOUR IDEA INTO REALITY")}</span>
              </div>

              {/* Heading */}
              <h2 className="text-h1 font-heading font-extrabold leading-[1.05] mb-7 text-[#0b1220] tracking-[-0.02em]">
                <span className="block">{$t("WhyChooseUsProposalForm__t2", "Get My")}</span>
                <span className="relative inline-block">
                  <span style={{ color: TEAL }}>{$t("WhyChooseUsProposalForm__t3", "Free")}</span> {$t("WhyChooseUsProposalForm__t4", "Proposal")}
                  {/* brush underline under "Proposal" */}
                  <svg aria-hidden className="absolute -bottom-3 left-[34%] h-4 w-[72%]" viewBox="0 0 200 16" preserveAspectRatio="none" fill="none">
                    <path d="M3 12C55 4 130 2 197 7" stroke="#0f5c56" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              <p className="text-body text-slate-600 mb-10 max-w-[440px] leading-relaxed">
                {rich($t("WhyChooseUsProposalForm__t5", "Share a few details about your project and our experts will create a personalized roadmap to help your business grow faster."))}</p>

              {/* Bullet Points */}
              <div className="flex flex-col gap-6 mb-12">
                
                {/* Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.35)] bg-[#e3f5f1] text-teal-600">
                    <Target size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0b1220] mb-1">{$t("WhyChooseUsProposalForm__t6", "Tailored for You")}</h4>
                    <p className="text-caption text-slate-500 font-medium">{rich($t("WhyChooseUsProposalForm__t7", "A custom strategy aligned with your goals."))}</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.35)] bg-[#efeafd] text-purple-600">
                    <Rocket size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0b1220] mb-1">{$t("WhyChooseUsProposalForm__t8", "Actionable & Clear")}</h4>
                    <p className="text-caption text-slate-500 font-medium">{rich($t("WhyChooseUsProposalForm__t9", "No fluff, just a clear plan that delivers results."))}</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.35)] bg-[#fdf1e4] text-amber-600">
                    <ShieldCheck size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0b1220] mb-1">{$t("WhyChooseUsProposalForm__t10", "100% Confidential")}</h4>
                    <p className="text-caption text-slate-500 font-medium">{rich($t("WhyChooseUsProposalForm__t11", "Your information is safe with us."))}</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_8px_18px_-10px_rgba(15,23,42,0.35)] bg-[#e6f0fb] text-blue-600">
                    <Clock size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0b1220] mb-1">{$t("WhyChooseUsProposalForm__t12", "Fast Response")}</h4>
                    <p className="text-caption text-slate-500 font-medium">{rich($t("WhyChooseUsProposalForm__t13", "We'll get back to you within 24 hours."))}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Illustration Placeholder (since no 3D asset is available) */}
            <div className="relative mt-auto w-full max-w-[575px]">
              <Image
                src={$t("WhyChooseUsProposalForm__t14", "/why-choose-us/proposal-illustration.webp")}
                alt={$t("WhyChooseUsProposalForm__t15", "Proposal clipboard with an envelope, a pen and a paper plane")}
                width={575}
                height={353}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="edge-fade h-auto w-full select-none mix-blend-multiply"
              />

              {/* Floating Trusted Card */}
              <div className="absolute bottom-[6%] right-0 bg-white rounded-xl shadow-[0_14px_34px_rgba(15,35,51,0.12)] p-4 flex items-center gap-4 border border-slate-100 z-10 lg:-right-6">
                <div className="w-10 h-10 rounded-full bg-[#e6f4f1] flex items-center justify-center">
                  <UsersIcon className="text-teal-600" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{rich($t("WhyChooseUsProposalForm__t16", "Trusted by"))}</p>
                  <h4 className="text-lg font-black text-[#0f2333] leading-none mb-1">{$t("WhyChooseUsProposalForm__t17", "100+")}</h4>
                  <p className="text-[10px] text-slate-500 font-semibold">{rich($t("WhyChooseUsProposalForm__t18", "Businesses Worldwide"))}</p>
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
            <div className="w-full bg-[linear-gradient(165deg,#0f403c_0%,#0c3431_50%,#0a2b29_100%)] rounded-[2rem] p-7 sm:p-10 md:p-12 relative shadow-[0_34px_70px_-20px_rgba(10,43,41,0.55)] border border-[#1b514c]">
              
              {/* Left Pointer (Arrow) pointing to the left column */}
              <div className="hidden lg:block absolute top-1/2 -left-[22px] w-11 h-11 bg-[#0c3633] border-b border-l border-[#1b514c] rotate-45 -translate-y-1/2 rounded-bl-xl"></div>

              {/* Form Header */}
              <div className="flex flex-col items-center text-center mb-10">
                <div className="relative mb-5">
                  <div className="w-16 h-16 rounded-full bg-[#d7f2ea] flex items-center justify-center shadow-[0_0_0_6px_rgba(215,242,234,0.12),0_0_24px_rgba(95,212,189,0.35)]">
                    <FileText size={28} className="text-[#0c3633]" strokeWidth={2} />
                  </div>
                  {/* sparkle strokes */}
                  <svg aria-hidden className="absolute -right-5 -top-2 h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#9fe6d6" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 14 L9 11" />
                    <path d="M8 6 L11 2" />
                    <path d="M13 12 L19 12" />
                  </svg>
                </div>
                <h3 className="text-h4 font-heading font-bold text-white mb-1">
                  {$t("WhyChooseUsProposalForm__t19", "Let's Build Something")}</h3>
                <h3 className="font-caveat text-[clamp(34px,3.2vw,48px)] font-semibold leading-none -rotate-2" style={{ color: MINT }}>
                  {$t("WhyChooseUsProposalForm__t20", "Amazing Together!")}</h3>
                {/* Decorative Swirl under text */}
                <svg aria-hidden className="w-44 h-3 mt-2" viewBox="0 0 160 12" preserveAspectRatio="none" fill="none">
                  <path d="M4 9C50 2 110 1 156 6" stroke={MINT} strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </div>

              {/* The Form */}
              {sent ? (
                <div className="rounded-2xl border border-[#113a34] bg-[#061815] px-6 py-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#0d9488]/20 text-[#2dd4bf] flex items-center justify-center text-xl font-bold">✓</div>
                  <h4 className="mt-4 text-lg font-bold text-white">{$t("WhyChooseUsProposalForm__t21", "Thank you! Your proposal request is in.")}</h4>
                  <p className="text-small mt-1.5 text-slate-400">{rich($t("WhyChooseUsProposalForm__t22", "Our team will get back to you within 24 hours."))}</p>
                </div>
              ) : (
              <form className="relative flex flex-col gap-5" onSubmit={handleSubmit}>
                <Honeypot value={hp} onChange={setHp} />
                
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="relative w-full">
                    <User size={18} className="pointer-events-none absolute left-4 top-[20px] text-white/80" />
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder={$t("WhyChooseUsProposalForm__t23", "First Name*")} 
                      required
                      className="w-full bg-white/[0.04] border border-white/20 rounded-xl py-[18px] pl-12 pr-4 text-[14px] text-white placeholder:text-white/75 hover:border-white/30 focus:outline-none focus:border-[#5fd4bd] focus:bg-white/[0.07] transition-colors"
                    />
                  </div>
                  <div className="relative w-full">
                    <User size={18} className="pointer-events-none absolute left-4 top-[20px] text-white/80" />
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder={$t("WhyChooseUsProposalForm__t24", "Last Name*")} 
                      required
                      className="w-full bg-white/[0.04] border border-white/20 rounded-xl py-[18px] pl-12 pr-4 text-[14px] text-white placeholder:text-white/75 hover:border-white/30 focus:outline-none focus:border-[#5fd4bd] focus:bg-white/[0.07] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="relative w-full">
                    <Mail size={18} className="pointer-events-none absolute left-4 top-[20px] text-white/80" />
                    <input 
                      type="email" 
                      name="email"
                      placeholder={$t("WhyChooseUsProposalForm__t25", "Business Email*")} 
                      required
                      className="w-full bg-white/[0.04] border border-white/20 rounded-xl py-[18px] pl-12 pr-4 text-[14px] text-white placeholder:text-white/75 hover:border-white/30 focus:outline-none focus:border-[#5fd4bd] focus:bg-white/[0.07] transition-colors"
                    />
                  </div>
                  <div className="relative w-full">
                    <Phone size={18} className="pointer-events-none absolute left-4 top-[20px] text-white/80" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder=" "
                      aria-label={`${$t("WhyChooseUsProposalForm__t26", "Phone Number*")} ${$t("WhyChooseUsProposalForm__t33", "(with country code)")}`}
                      required
                      className="peer w-full bg-white/[0.04] border border-white/20 rounded-xl py-[18px] pl-12 pr-4 text-[14px] text-white placeholder:text-white/75 hover:border-white/30 focus:outline-none focus:border-[#5fd4bd] focus:bg-white/[0.07] transition-colors"
                    />
                    <span aria-hidden className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-[14px] leading-tight text-white/75 peer-[:not(:placeholder-shown)]:hidden">
                      {$t("WhyChooseUsProposalForm__t26", "Phone Number*")}
                      <span className="block text-[12px] text-white/55">{$t("WhyChooseUsProposalForm__t33", "(with country code)")}</span>
                    </span>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="relative w-full">
                  <MapPin size={18} className="pointer-events-none absolute left-4 top-[20px] text-white/80" />
                  <input 
                    type="text" 
                    name="location"
                      placeholder={$t("WhyChooseUsProposalForm__t27", "Your Location*")} 
                    required
                    className="w-full bg-white/[0.04] border border-white/20 rounded-xl py-[18px] pl-12 pr-4 text-[14px] text-white placeholder:text-white/75 hover:border-white/30 focus:outline-none focus:border-[#5fd4bd] focus:bg-white/[0.07] transition-colors"
                  />
                </div>

                {/* Row 4 */}
                <div className="relative w-full">
                  <Edit3 size={18} className="pointer-events-none absolute left-4 top-[20px] text-white/80" />
                  <textarea 
                    name="message"
                    maxLength={1000}
                    placeholder={$t("WhyChooseUsProposalForm__t28", "What's your biggest challenge right now? What's not working with your current digital presence?")} 
                    required
                    rows={4}
                    className="w-full bg-white/[0.04] border border-white/20 rounded-xl py-[18px] pl-12 pr-4 text-[14px] text-white placeholder:text-white/75 hover:border-white/30 focus:outline-none focus:border-[#5fd4bd] focus:bg-white/[0.07] transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Divider Line */}
                <div className="my-3 flex items-center gap-4">
                  <span aria-hidden className="h-px flex-1 border-t border-dashed border-white/25" />
                  <span className="font-caveat whitespace-nowrap text-[clamp(20px,1.8vw,26px)]" style={{ color: MINT }}>
                    {$t("WhyChooseUsProposalForm__t29", "No Commitment. Just Possibilities.")}
                  </span>
                  <span aria-hidden className="h-px flex-1 border-t border-dashed border-white/25" />
                </div>

                {error && <p role="alert" className="text-caption font-semibold text-rose-300">{error}</p>}

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={sending}
                  className="group relative w-full overflow-hidden rounded-xl bg-[linear-gradient(90deg,#11827a_0%,#2fb7a3_55%,#b4efe0_100%)] py-[18px] pl-4 pr-14 sm:pl-6 sm:pr-16 text-white shadow-[0_16px_34px_-12px_rgba(47,183,163,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-70 flex items-center justify-center"
                >
                  <span aria-hidden className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <div className="relative flex items-center gap-2.5 sm:gap-4">
                    <Send size={22} strokeWidth={2} />
                    <span className="text-[clamp(14px,1.3vw,19px)] font-bold uppercase tracking-[0.03em]">{sending ? $t("WhyChooseUsProposalForm__t30", "Sending...") : $t("WhyChooseUsProposalForm__t31", "Send My Free Proposal")}</span>
                  </div>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0a2b29] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight size={20} className="text-white" strokeWidth={2.5} />
                  </div>
                </button>

                {/* Privacy Text */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Lock size={13} className="text-white/70" />
                  <p className="text-[12.5px] text-white/75">
                    {rich($t("WhyChooseUsProposalForm__t32", "We respect your privacy. Your information is safe with us."))}</p>
                </div>

              </form>
              )}

              {/* Top Right Dots Decoration */}
              <div className="absolute top-8 right-8 grid grid-cols-4 gap-2 opacity-20 pointer-events-none">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-white"></div>
                ))}
              </div>

              {/* Bottom Right Squiggle Decoration */}
              <div className="absolute bottom-5 right-6 opacity-80 pointer-events-none hidden md:block">
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="#5fd4bd" strokeWidth="3" strokeLinecap="round">
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
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
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
