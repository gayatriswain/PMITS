"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";

export default function AgenticAiFeatures() {
  return (
    <section id="features-section" className="relative w-full bg-white py-10 sm:py-14 font-sans overflow-hidden">
      <Container>
        {/* Top Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-slate-700 uppercase">
            FEATURES
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-[1.12] text-[#0b1f4a]">
            Smarter Tools to
            <br />
            Accelerate Your Growth
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed">
            Explore powerful capabilities designed to simplify
            <br className="hidden sm:inline" /> workflows and boost team productivity.
          </p>
        </motion.div>

        {/* 2x2 Feature Cards Grid */}
        <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* CARD 1: Advanced Analytics Dashboard (Vibrant Sky Blue Gradient) */}
          <motion.div
            className="rounded-[28px] p-6 sm:p-7 bg-[linear-gradient(145deg,#38bdf8_0%,#60a5fa_45%,#bfdbfe_100%)] shadow-[0_20px_45px_-15px_rgba(37,99,235,0.25)] flex flex-col justify-between transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(37,99,235,0.35)] hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* 1. Image */}
            <div className="w-full flex items-center justify-center">
              <Image
                src="/feature-analytics-dashboard.png"
                alt="Advanced Analytics Dashboard"
                width={432}
                height={210}
                className="w-full h-auto rounded-2xl shadow-lg object-contain bg-white"
                priority
              />
            </div>
            
            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-[22px] font-black text-[#0b1f4a] tracking-tight">
                Advanced Analytics Dashboard
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-800 leading-relaxed font-normal">
                Turn raw data into clear insights with real-time reports, smart visualizations, and performance metrics.
              </p>
            </div>
          </motion.div>

          {/* CARD 2: Streamlined Relationship Organization */}
          <motion.div
            className="rounded-[28px] p-6 sm:p-7 bg-[#f8fafc] border border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(15,35,80,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {/* 1. Image */}
            <div className="w-full flex items-center justify-center">
              <Image
                src="/feature-relationship-crm.png"
                alt="Streamlined Relationship Organization"
                width={432}
                height={200}
                className="w-full h-auto rounded-2xl shadow-sm object-contain bg-white"
              />
            </div>

            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-[22px] font-black text-[#0b1f4a] tracking-tight">
                Streamlined Relationship Organization
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                Simplify how you manage connections with streamlined relationship organization — effortlessly.
              </p>
            </div>
          </motion.div>

          {/* CARD 3: Smart and Effortless Data Analysis */}
          <motion.div
            className="rounded-[28px] p-6 sm:p-7 bg-[#f8fafc] border border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(15,35,80,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {/* 1. Image */}
            <div className="w-full flex items-center justify-center">
              <Image
                src="/feature-data-analysis.png"
                alt="Smart and Effortless Data Analysis"
                width={592}
                height={418}
                className="w-full h-auto rounded-2xl shadow-sm object-contain bg-white"
              />
            </div>

            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-[22px] font-black text-[#0b1f4a] tracking-tight">
                Smart and Effortless Data Analysis
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                Experience smart and effortless data analysis with advanced AI tools that simplify insights, visualize patterns.
              </p>
            </div>
          </motion.div>

          {/* CARD 4: Intelligent Automated Task Planner */}
          <motion.div
            className="rounded-[28px] p-6 sm:p-7 bg-[#f8fafc] border border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(15,35,80,0.05)] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            {/* 1. Image */}
            <div className="w-full flex items-center justify-center">
              <Image
                src="/feature-task-planner.png"
                alt="Intelligent Automated Task Planner"
                width={532}
                height={418}
                className="w-full h-auto rounded-2xl shadow-sm object-contain bg-white"
              />
            </div>

            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-xl sm:text-[22px] font-black text-[#0b1f4a] tracking-tight">
                Intelligent Automated Task Planner
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-500 leading-relaxed">
                Boost efficiency with an intelligent automated task planner — effortlessly schedule, prioritize and manage.
              </p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
