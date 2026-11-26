"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

export default function AgenticAiFeatures() {
  const $t = useCmsText();
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
            {$t("AgenticAiFeatures__t1", "FEATURES")}</span>
          <h2 className="text-h2 mt-3 font-black tracking-tight text-[#0b1f4a]">
            {$t("AgenticAiFeatures__t2", "Smarter Tools to")}<br />
            {$t("AgenticAiFeatures__t3", "Accelerate Your Growth")}</h2>
          <p className="text-body mt-4 text-slate-500 max-w-xl mx-auto">
            {rich($t("AgenticAiFeatures__t4", "Explore powerful capabilities designed to simplify"))}<br className="hidden sm:inline" /> {rich($t("AgenticAiFeatures__t5", "workflows and boost team productivity."))}</p>
        </motion.div>

        {/* 2x2 Feature Cards Grid */}
        <div className="mt-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          
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
                src={$t("AgenticAiFeatures__t6", "/feature-analytics-dashboard.png")}
                alt={$t("AgenticAiFeatures__t7", "Advanced Analytics Dashboard")}
                width={432}
                height={210}
                className="w-full h-auto rounded-2xl shadow-lg object-contain bg-white"
                priority
              />
            </div>
            
            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-h5 font-black text-[#0b1f4a] tracking-tight">
                {$t("AgenticAiFeatures__t8", "Advanced Analytics Dashboard")}</h3>
              <p className="text-small mt-2 text-slate-800 font-normal">
                {rich($t("AgenticAiFeatures__t9", "Turn raw data into clear insights with real-time reports, smart visualizations, and performance metrics."))}</p>
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
                src={$t("AgenticAiFeatures__t10", "/feature-relationship-crm.png")}
                alt={$t("AgenticAiFeatures__t11", "Streamlined Relationship Organization")}
                width={432}
                height={200}
                className="w-full h-auto rounded-2xl shadow-sm object-contain bg-white"
              />
            </div>

            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-h5 font-black text-[#0b1f4a] tracking-tight">
                {$t("AgenticAiFeatures__t12", "Streamlined Relationship Organization")}</h3>
              <p className="text-small mt-2 text-slate-500">
                {rich($t("AgenticAiFeatures__t13", "Simplify how you manage connections with streamlined relationship organization — effortlessly."))}</p>
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
                src={$t("AgenticAiFeatures__t14", "/feature-data-analysis.png")}
                alt={$t("AgenticAiFeatures__t15", "Smart and Effortless Data Analysis")}
                width={592}
                height={418}
                className="w-full h-auto rounded-2xl shadow-sm object-contain bg-white"
              />
            </div>

            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-h5 font-black text-[#0b1f4a] tracking-tight">
                {$t("AgenticAiFeatures__t16", "Smart and Effortless Data Analysis")}</h3>
              <p className="text-small mt-2 text-slate-500">
                {rich($t("AgenticAiFeatures__t17", "Experience smart and effortless data analysis with advanced AI tools that simplify insights, visualize patterns."))}</p>
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
                src={$t("AgenticAiFeatures__t18", "/feature-task-planner.png")}
                alt={$t("AgenticAiFeatures__t19", "Intelligent Automated Task Planner")}
                width={532}
                height={418}
                className="w-full h-auto rounded-2xl shadow-sm object-contain bg-white"
              />
            </div>

            {/* 2. Title & 3. Description */}
            <div className="mt-4">
              <h3 className="text-h5 font-black text-[#0b1f4a] tracking-tight">
                {$t("AgenticAiFeatures__t20", "Intelligent Automated Task Planner")}</h3>
              <p className="text-small mt-2 text-slate-500">
                {rich($t("AgenticAiFeatures__t21", "Boost efficiency with an intelligent automated task planner — effortlessly schedule, prioritize and manage."))}</p>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
