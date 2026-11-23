"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Container from "./Container";

export default function AnimationCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "3D Motion Graphics",
    budget: "$2,500 - $5,000",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact-form" className="relative w-full bg-[#f8fafc] py-20 sm:py-28 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-teal-100/40 rounded-full blur-[140px] pointer-events-none -z-0" />

      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(13,148,136,0.12)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Information Panel */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2e35] via-[#0d3b44] to-[#122b3e] text-white p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-extrabold tracking-widest uppercase mb-6">
                  START YOUR PROJECT
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug mb-4">
                  Ready to Bring Your Brand to Life with Motion?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8">
                  Share your vision with us. We’ll analyze your goals and deliver a detailed concept proposal, timeline, and accurate quote within 24 hours.
                </p>

                {/* Direct Points */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                      ✓
                    </div>
                    <span>Free creative direction discovery session</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                      ✓
                    </div>
                    <span>Transparent fixed milestones &amp; deliverables</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-200">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400">
                      ✓
                    </div>
                    <span>4K master render + all aspect ratios included</span>
                  </div>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="pt-6 border-t border-white/10 space-y-2">
                <p className="text-xs text-slate-300">
                  <span className="text-teal-400 font-semibold">Direct Email:</span>{" "}
                  hello@promanage.biz
                </p>
                <p className="text-xs text-slate-300">
                  <span className="text-teal-400 font-semibold">Call or WhatsApp:</span>{" "}
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 p-8 sm:p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-teal-50 text-[#0d9488] rounded-full flex items-center justify-center text-2xl font-black mb-4">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h4>
                  <p className="text-slate-500 text-sm max-w-sm">
                    Your inquiry has been received. Our creative team will review your project details and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Primary Service
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 transition-all bg-white"
                      >
                        <option>3D Motion Graphics</option>
                        <option>2D Explainer Video</option>
                        <option>Brand Identity &amp; Logo</option>
                        <option>Ad Creatives &amp; Motion Ads</option>
                        <option>UI/UX &amp; Product Visuals</option>
                        <option>Complete Creative Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 transition-all bg-white"
                    >
                      <option>&lt; $1,500 (Quick Motion / Single Asset)</option>
                      <option>$1,500 - $3,000 (Standard Video / Brand Kit)</option>
                      <option>$3,000 - $6,000 (3D Cinematic / Full Explainer)</option>
                      <option>$6,000+ (Comprehensive Brand Campaign)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tell us about your project
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Give us a brief overview of what you'd like to create, references, or timeline..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#0d9488] focus:ring-2 focus:ring-teal-100 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#0d9488] hover:bg-[#0b7a70] text-white font-bold text-sm tracking-wide shadow-lg shadow-teal-700/25 transition-all duration-300 hover:shadow-xl hover:shadow-teal-700/40 hover:-translate-y-0.5"
                  >
                    Send Project Inquiry →
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
