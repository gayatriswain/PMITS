"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  PenLine,
  UploadCloud,
  ShieldCheck,
  CheckCircle2,
  Send,
  Users,
  Target,
  Heart,
  X,
  ChevronDown,
  FileText,
} from "lucide-react";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

const INK = "#0a1f2c";
const TEAL = "#00a8b5";
const DEEP_TEAL = "#008f9c";

export default function CareerSendProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    currentRole: "",
    skills: "",
    message: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      currentRole: "",
      skills: "",
      message: "",
    });
    setResumeFile(null);
    setIsSubmitted(false);
  };

  return (
    <section
      id="send-profile"
      className="relative w-full overflow-hidden pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-28 lg:pb-36"
      style={{
        backgroundImage: "url('/career4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fallback & soft ambient tint over background */}
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      <Container className="relative z-10">
        <div className="w-full lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ========================================================
              LEFT COLUMN: Header, Pitch & "Why send us your profile?" Card
              ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-2">
            {/* Tag / Eyebrow with dots */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-3"
            >
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-[#008f9c] uppercase flex items-center gap-1.5">
                <span className="text-amber-500/80 font-normal">· · ·</span>
                DON&apos;T SEE YOUR ROLE?
                <span className="text-amber-500/80 font-normal">· · ·</span>
              </span>
            </motion.div>

            {/* Headline with Caveat script font */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Radiating Sparkles on top left */}
              <svg
                className="absolute -top-6 -left-4 w-7 h-7 text-[#00a8b5] pointer-events-none hidden sm:block"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M5 12L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 6L3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 5L12 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>

              <h2
                className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.15]"
                style={{ color: INK }}
              >
                Maybe we haven&apos;t
                <span className="block">created it yet.</span>
              </h2>

              <span
                className={`${caveat.className} block text-4xl sm:text-5xl lg:text-[54px] font-bold leading-tight mt-1`}
                style={{ color: DEEP_TEAL }}
              >
                But we&apos;re looking for you.
              </span>
            </motion.div>

            {/* Subtitle & Dashed Flying Arrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-4"
            >
              <p className="text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-[420px]">
                Great people build great companies.
                <br />
                Send us your details and let&apos;s{" "}
                <strong className="text-[#008f9c] font-bold">create something amazing</strong> together.
              </p>

              {/* Dashed hand-drawn loop arrow pointing to the right form card */}
              <div className="absolute right-0 -bottom-8 hidden md:block pointer-events-none select-none">
                <svg width="80" height="50" viewBox="0 0 90 60" fill="none">
                  <path
                    d="M 5 25 C 25 15, 60 5, 55 35 C 50 55, 30 45, 35 30 C 40 18, 70 20, 82 40"
                    stroke="#00a8b5"
                    strokeWidth="1.8"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                  {/* Arrowhead */}
                  <path
                    d="M 75 38 L 84 41 L 83 31"
                    stroke="#00a8b5"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* ========================================================
                "Why send us your profile?" Card with Envelope Graphic
                ======================================================== */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-7 shadow-[0_16px_40px_-10px_rgba(10,31,44,0.08)] border border-slate-150/80 relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                
                {/* Left: Envelope Vector Graphic */}
                <div className="sm:col-span-5 flex items-center justify-center relative">
                  <div className="relative w-[150px] h-[130px] flex items-center justify-center">
                    {/* Glowing halo behind envelope */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-100/60 via-teal-50/70 to-emerald-50/30 blur-md pointer-events-none" />

                    {/* Flying Paper Plane with looped dashed trail */}
                    <svg
                      className="absolute -top-1 -right-1 w-20 h-16 pointer-events-none overflow-visible"
                      viewBox="0 0 70 50"
                      fill="none"
                    >
                      <path
                        d="M 10 38 C 22 38, 38 42, 42 28 C 46 16, 32 10, 36 4 C 40 0, 52 2, 60 8"
                        stroke="#00a8b5"
                        strokeWidth="1.4"
                        strokeDasharray="3 3"
                        opacity="0.8"
                      />
                      <g transform="translate(56, 5) rotate(25) scale(0.7)">
                        <polygon points="0,0 20,8 8,20 5,10" fill="#00a8b5" />
                        <polygon points="5,10 20,8 8,20" fill="#008f9c" />
                      </g>
                    </svg>

                    {/* CV Document emerging from envelope */}
                    <div className="absolute top-2 w-[100px] h-[75px] rounded-t-lg bg-white shadow-sm p-2 flex flex-col gap-1.5 border border-slate-100 z-0">
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-teal-50 flex items-center justify-center text-[#00a8b5]">
                          <User size={10} strokeWidth={2.5} />
                        </div>
                        <div className="w-10 h-1 rounded-full bg-slate-200" />
                      </div>
                      <div className="w-full h-1 rounded-full bg-slate-100" />
                      <div className="w-4/5 h-1 rounded-full bg-slate-100" />
                      <div className="w-2/3 h-1 rounded-full bg-slate-100" />
                    </div>

                    {/* Teal Envelope Body */}
                    <div className="relative z-10 w-[124px] h-[78px] rounded-b-xl bg-gradient-to-b from-[#008f9c] to-[#04616d] shadow-lg flex items-center justify-center border-t border-teal-400/40 mt-4">
                      {/* Envelope Flap Creases */}
                      <div className="absolute inset-x-0 top-0 h-0 border-t-[32px] border-t-teal-700/50 border-x-[62px] border-x-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 h-0 border-b-[44px] border-b-[#03525c] border-x-[62px] border-x-transparent pointer-events-none rounded-b-xl" />

                      {/* ProManage "P" Logo */}
                      <div className="relative z-20 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center mt-1">
                        <span className="text-[15px] font-black tracking-tighter text-[#008f9c]">
                          P
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Points List */}
                <div className="sm:col-span-7 flex flex-col gap-3.5">
                  {/* Card Title with sparkle */}
                  <div className="relative">
                    <h3 className="text-[15px] font-bold text-[#0a1f2c] flex items-center gap-1.5">
                      Why send us your profile?
                      <svg className="w-3.5 h-3.5 text-[#008f9c]" viewBox="0 0 16 16" fill="none">
                        <path d="M3 11L1 8M6 7L5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </h3>
                    <div className="w-8 h-[2px] bg-[#00a8b5] rounded-full mt-1" />
                  </div>

                  {/* Item 1: We're always growing */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-50 border border-cyan-150 flex items-center justify-center shrink-0 text-[#008f9c] mt-0.5">
                      <Users size={14} strokeWidth={2.4} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0a1f2c] leading-tight">
                        We&apos;re always growing
                      </h4>
                      <p className="text-[11.5px] text-slate-500 leading-snug mt-0.5">
                        New roles open up regularly.
                      </p>
                    </div>
                  </div>

                  {/* Item 2: The right match matters */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-150 flex items-center justify-center shrink-0 text-[#008f9c] mt-0.5">
                      <Target size={14} strokeWidth={2.4} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0a1f2c] leading-tight">
                        The right match matters
                      </h4>
                      <p className="text-[11.5px] text-slate-500 leading-snug mt-0.5">
                        We&apos;ll reach out when the perfect opportunity comes along.
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Your skills can inspire */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center shrink-0 text-[#008f9c] mt-0.5">
                      <Heart size={14} strokeWidth={2.4} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#0a1f2c] leading-tight">
                        Your skills can inspire
                      </h4>
                      <p className="text-[11.5px] text-slate-500 leading-snug mt-0.5">
                        You might be the missing piece we didn&apos;t know we needed.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Handwritten callout at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6"
            >
              <p
                className={`${caveat.className} text-[26px] sm:text-[30px] font-bold leading-tight`}
                style={{ color: INK }}
              >
                Your next big opportunity could{" "}
                <span className="text-[#008f9c] underline decoration-[#00a8b5] decoration-2 underline-offset-4">
                  start here!
                </span>
              </p>
            </motion.div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: "Send Us Your Profile" Interactive Form Card
              ======================================================== */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[32px] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_22px_60px_-15px_rgba(10,31,44,0.12)] border border-teal-100/70 relative"
            >
              {/* Card Header with circular icon */}
              <div className="flex items-start gap-4 mb-7">
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#008f9c] to-[#04616d] text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-700/20">
                  <Send size={22} strokeWidth={2.2} className="rotate-12 translate-x-0.5 -translate-y-0.5" />
                </div>
                <div>
                  <div className="relative inline-block">
                    <h3 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-[#0a1f2c]">
                      Send Us Your Profile
                    </h3>
                    <svg
                      className="absolute -top-1.5 -right-5 w-4 h-4 text-[#008f9c]"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path d="M3 11L1 8M6 7L5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-1">
                    Fill in your details and upload your resume. We&apos;ll be in touch!
                  </p>
                </div>
              </div>

              {/* Form Content / Success Message */}
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 px-6 text-center flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-200 text-[#008f9c] flex items-center justify-center shadow-lg mb-4">
                      <CheckCircle2 size={36} strokeWidth={2.4} />
                    </div>
                    <h4 className="text-2xl font-bold text-[#0a1f2c]">Profile Submitted!</h4>
                    <p className="text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
                      Thank you for sharing your profile. Our talent team will review your qualifications and reach out if there&apos;s a great match!
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-6 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                    >
                      Submit Another Profile
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5">
                    
                    {/* Row 1: Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                          Full Name
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <User size={15} />
                          </span>
                          <input
                            type="text"
                            required
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g. John Doe"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Mail size={15} />
                          </span>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="e.g. john@example.com"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Phone Number & Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                          Phone Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Phone size={15} />
                          </span>
                          <input
                            type="tel"
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. +91 98765 43210"
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                          Experience
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <Briefcase size={15} />
                          </span>
                          <select
                            required
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all appearance-none cursor-pointer"
                          >
                            <option value="">Select your experience</option>
                            <option value="Fresher / 0-1 Yrs">Fresher (0 - 1 Yrs)</option>
                            <option value="1 - 3 Yrs">1 - 3 Yrs</option>
                            <option value="3 - 5 Yrs">3 - 5 Yrs</option>
                            <option value="5 - 8 Yrs">5 - 8 Yrs</option>
                            <option value="8+ Yrs">8+ Yrs</option>
                          </select>
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                            <ChevronDown size={14} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Current Role / Most Recent Role */}
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                        Current Role / Most Recent Role
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Briefcase size={15} />
                        </span>
                        <input
                          type="text"
                          name="currentRole"
                          value={formData.currentRole}
                          onChange={handleInputChange}
                          placeholder="e.g. UI/UX Designer"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 4: Skills / Expertise (optional) */}
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                        Skills / Expertise (optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                          <Sparkles size={15} />
                        </span>
                        <input
                          type="text"
                          name="skills"
                          value={formData.skills}
                          onChange={handleInputChange}
                          placeholder="e.g. Figma, React, Node.js, UI Design"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 5: Tell us about yourself */}
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                        Tell us about yourself
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-slate-400">
                          <PenLine size={15} />
                        </span>
                        <textarea
                          rows={3}
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Share a bit about your background, your passion, and what excites you."
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#fbfdfd] hover:border-slate-300 focus:bg-white focus:border-[#008f9c] focus:ring-2 focus:ring-teal-100 outline-none text-xs sm:text-[13px] text-[#0a1f2c] transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Row 6: Upload Resume Dropzone */}
                    <div>
                      <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
                        Upload Resume
                      </label>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />

                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`rounded-2xl border-2 border-dashed p-3.5 sm:p-4 transition-all flex items-center justify-between cursor-pointer group ${
                          isDragging
                            ? "border-[#008f9c] bg-teal-50/50"
                            : resumeFile
                            ? "border-teal-400 bg-teal-50/30"
                            : "border-slate-250 bg-slate-50/60 hover:bg-teal-50/20 hover:border-[#008f9c]"
                        }`}
                      >
                        {resumeFile ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-teal-100 text-[#008f9c] flex items-center justify-center">
                                <FileText size={18} />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-[#0a1f2c] line-clamp-1">
                                  {resumeFile.name}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setResumeFile(null);
                              }}
                              className="w-7 h-7 rounded-full bg-slate-200/80 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-150 flex items-center justify-center text-[#008f9c] group-hover:scale-105 transition-transform">
                                <UploadCloud size={18} />
                              </div>
                              <div className="text-left">
                                <p className="text-xs sm:text-[13px] text-slate-700">
                                  Drag &amp; drop your file here or{" "}
                                  <span className="text-[#008f9c] font-bold underline decoration-[#00a8b5] underline-offset-2">
                                    browse
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="text-right text-[10.5px] sm:text-[11px] text-slate-400 font-medium leading-tight">
                              <div>PDF, DOC, DOCX</div>
                              <div>(Up to 5MB)</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Row 7: Action Row: Button + Trust Badge */}
                    <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center justify-between sm:justify-start gap-4 px-7 py-3 rounded-full bg-gradient-to-r from-[#008f9c] via-[#04616d] to-[#06242f] hover:from-[#007b86] hover:to-[#021b22] text-white font-bold text-[13px] sm:text-sm shadow-[0_12px_28px_-6px_rgba(0,143,156,0.4)] hover:shadow-[0_16px_34px_-6px_rgba(0,143,156,0.5)] transition-all cursor-pointer disabled:opacity-70"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Submit Profile"}</span>
                        <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110">
                          <Send size={13} className="translate-x-0.5 -translate-y-0.5" />
                        </span>
                      </button>

                      {/* Trust Badge */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-[#008f9c] shrink-0">
                          <ShieldCheck size={18} strokeWidth={2.2} />
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          <p className="font-semibold text-slate-700">Your information is safe with us.</p>
                          <p>We respect your privacy.</p>
                        </div>
                      </div>
                    </div>

                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
