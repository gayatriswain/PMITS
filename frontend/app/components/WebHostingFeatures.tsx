"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, Rocket, Shield, Server, Headphones, ShieldCheck, CloudLightning, HelpCircle } from 'lucide-react';
import Container from './Container';

// Data for the radial features
const radialFeatures = [
  {
    id: 1,
    title: "Unexpected downtime?",
    desc: "We keep your website online and reliable.",
    icon: <Clock size={24} className="text-[#0f766e]" />,
    position: "top-[-20px] left-1/2 -translate-x-1/2",
    align: "text-left",
    flex: "flex-row",
    connector: "hidden",
    width: "w-[280px]"
  },
  {
    id: 2,
    title: "Slow website?",
    desc: "Optimized servers and caching for blazing fast performance.",
    icon: <Rocket size={24} className="text-[#0f766e]" />,
    position: "top-[15%] left-[-25%]",
    align: "text-right",
    flex: "flex-row-reverse",
    connector: "right-[-60px] top-1/2 w-[60px]"
  },
  {
    id: 3,
    title: "Growing traffic?",
    desc: "Easily scalable resources that grow with you.",
    icon: <Server size={24} className="text-[#0f766e]" />,
    position: "bottom-[35%] left-[-25%]",
    align: "text-right",
    flex: "flex-row-reverse",
    connector: "right-[-60px] top-1/2 w-[60px]"
  },
  {
    id: 4,
    title: "Security worries?",
    desc: "Advanced protection to keep your site safe from threats.",
    icon: <Shield size={24} className="text-[#0f766e]" />,
    position: "top-[15%] right-[-25%]",
    align: "text-left",
    flex: "flex-row",
    connector: "left-[-60px] top-1/2 w-[60px]"
  },
  {
    id: 5,
    title: "Something breaks?",
    desc: "Real experts, real fast support when you need it most.",
    icon: <Headphones size={24} className="text-[#0f766e]" />,
    position: "bottom-[35%] right-[-25%]",
    align: "text-left",
    flex: "flex-row",
    connector: "left-[-60px] top-1/2 w-[60px]"
  }
];

// Data for bottom features
const bottomFeatures = [
  {
    icon: <Rocket size={24} className="text-[#0f766e]" strokeWidth={1.5} />,
    title: "Blazing Fast",
    desc: "SSD Storage, LiteSpeed, and global CDN."
  },
  {
    icon: <ShieldCheck size={24} className="text-[#0f766e]" strokeWidth={1.5} />,
    title: "Rock Solid Security",
    desc: "SSL, Firewall, DDoS protection and malware scanning."
  },
  {
    icon: <CloudLightning size={24} className="text-[#0f766e]" strokeWidth={1.5} />,
    title: "Always Backed Up",
    desc: "Automated daily backups so you can restore anytime."
  },
  {
    icon: <Headphones size={24} className="text-[#0f766e]" strokeWidth={1.5} />,
    title: "Expert Support 24/7",
    desc: "Real people, ready to help anytime you need."
  }
];

export default function WebHostingFeatures() {
  return (
    <section className="pt-36 pb-24 bg-white overflow-x-hidden relative">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[32px] md:text-[40px] font-black text-[#0f2923] leading-[1.2] mb-4"
          >
            Hosting That Keeps<br />
            <span className="text-[#0f766e]">Your Website Performing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[16px] text-slate-600 font-medium"
          >
            Powerful infrastructure, real human support, and enterprise-grade security — so you can focus on growing your business.
          </motion.p>
        </div>

        {/* Center Illustration with Radial Features */}
        <div className="relative max-w-3xl mx-auto mt-16 mb-8 hidden md:block">
          
          {/* Background glowing rings */}
          <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-[100%] border border-[#14b8a6]/20 shadow-[0_0_80px_rgba(20,184,166,0.05)]"></div>
          <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-[100%] border border-[#14b8a6]/10"></div>
          
          {/* Center Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-full h-[450px] flex items-center justify-center mix-blend-multiply"
          >
            <Image 
              src="/web-hosting-2.png" 
              alt="Website Hosting Dashboard"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>

          {/* Radial Features */}
          {radialFeatures.map((feature, idx) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (idx * 0.1) }}
              className={`absolute ${feature.position} ${feature.width || 'w-[240px]'} z-20`}
            >
              <div className={`flex items-center gap-4 ${feature.flex}`}>
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-50 flex items-center justify-center shrink-0 relative">
                  {feature.icon}
                  {/* Decorative line connecting to center */}
                  <div className={`absolute -z-10 h-0 border-t border-dashed border-[#14b8a6]/40 ${feature.connector}`}></div>
                </div>
                
                {/* Text */}
                <div className={`${feature.align}`}>
                  <h4 className="text-[14px] font-bold text-[#0f766e] mb-1">{feature.title}</h4>
                  <p className="text-[12px] text-slate-600 leading-tight font-medium">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile fallback for features */}
        <div className="grid grid-cols-1 gap-6 mb-16 md:hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full h-[250px] mix-blend-multiply"
          >
            <Image src="/web-hosting-2.png" alt="Dashboard" fill className="object-contain" />
          </motion.div>
          
          {radialFeatures.map(f => (
             <div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0 border border-[#ccfbf1]">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0f766e] mb-1">{f.title}</h4>
                  <p className="text-[13px] text-slate-600 font-medium">{f.desc}</p>
                </div>
             </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-6 md:p-8 relative z-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bottomFeatures.map((item, i) => (
              <div key={i} className={`flex items-start gap-4 ${i !== 0 ? 'lg:border-l lg:border-slate-100 lg:pl-8' : ''}`}>
                <div className="w-12 h-12 rounded-full bg-[#f0fdfa] flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0f2923] mb-1">{item.title}</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
