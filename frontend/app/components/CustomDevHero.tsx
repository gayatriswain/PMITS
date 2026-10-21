"use client";

import { motion } from "framer-motion";
import Container from "./Container";

const TEAL = "#0d9488";

const PuzzleIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.611c-.941.941-2.469.941-3.408 0L8.73 19.73a.98.98 0 0 1-.276-.837c.07-.47.48-.802.925-.968a2.5 2.5 0 1 0-3.214-3.214c-.166-.446-.497-.855-.968-.925a.979.979 0 0 1-.837-.276L2.749 11.9c-.941-.941-.941-2.469 0-3.408l1.568-1.568c.23-.23.556-.338.878-.289.46.07.82.395 1.05.811a2.5 2.5 0 1 0 3.904-3.904c-.416-.23-.74-.59-.81-1.05a.98.98 0 0 1 .289-.878l1.61-1.611c.941-.941 2.469-.941 3.408 0l1.611 1.611c.23.23.338.556.289.878-.07.46-.395.82-.811 1.05a2.5 2.5 0 1 0 3.904 3.904c.23.416.59.74 1.05.81z"/>
  </svg>
);

const LayoutIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const SitemapIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="6" rx="1" />
    <path d="M12 8v4" />
    <path d="M4 16v-4h16v4" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="16" width="6" height="6" rx="1" />
    <rect x="16" y="16" width="6" height="6" rx="1" />
  </svg>
);

const LinkIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const SlidersIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 21v-7" />
    <path d="M4 10V3" />
    <path d="M12 21v-9" />
    <path d="M12 8V3" />
    <path d="M20 21v-5" />
    <path d="M20 12V3" />
    <path d="M1 14h6" />
    <path d="M9 8h6" />
    <path d="M17 16h6" />
  </svg>
);

const ChartIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
    <path d="M19 9v5" />
    <path d="M19 9h-5" />
  </svg>
);

const ShieldIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const LockIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const LayersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>;
const GrowthIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

const FeatureBox = ({ icon: Icon, title, desc, delay, align }: any) => (
  <motion.div
    initial={{ opacity: 0, x: align === "left" ? 20 : -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.6, delay }}
    className={`flex items-start gap-4 ${align === "left" ? "text-right flex-row-reverse" : "text-left"} w-full max-w-[280px]`}
  >
    <div className="shrink-0 flex items-center justify-center w-[52px] h-[52px] bg-white rounded-2xl shadow-[0_8px_30px_-8px_rgba(13,148,136,0.15)] border border-slate-50 relative z-10">
      <Icon />
    </div>
    <div className="pt-1">
      <h3 className="font-bold text-slate-800 text-[13px] mb-1.5">{title}</h3>
      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

const TrustItem = ({ icon, title, sub }: any) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 px-2 sm:px-6">
    <div className="shrink-0 bg-teal-50 w-10 h-10 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div className="text-center sm:text-left">
      <h4 className="font-bold text-slate-800 text-[12px] whitespace-nowrap">{title}</h4>
      <p className="text-[10px] text-slate-500 mt-0.5 whitespace-nowrap">{sub}</p>
    </div>
  </div>
);

import Image from 'next/image';

const CentralIsometric = () => {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center perspective-[1200px] -mt-6 sm:mt-0">
      {/* Background Orbits Mask Wrapper to fade only from the top */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 32%, black 42%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 32%, black 42%, black 100%)'
        }}
      >
        {/* Background Orbits (3D Tilted for isometric perspective) */}
        <div
          className="w-full h-full flex items-center justify-center mt-[10px] sm:mt-[20px]"
          style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}
        >
          <svg className="w-[600px] h-[600px] opacity-40 overflow-visible" viewBox="0 0 600 600">
          {/* A perfect circle that becomes an isometric ellipse in 3D */}
          <circle cx="300" cy="300" r="240" fill="none" stroke="#0d9488" strokeWidth="1.5" />

          {/* Connection Points (Nodes) on the orbit */}
          {/* Left Side (Top to Bottom) */}
          <circle cx="60" cy="300" r="8" fill="#0d9488" />     {/* Top-Left (180 deg) */}
          <circle cx="130" cy="470" r="8" fill="#0d9488" />    {/* Middle-Left (135 deg) */}
          <circle cx="300" cy="540" r="8" fill="#0d9488" />    {/* Bottom-Left (90 deg) */}

          {/* Right Side (Top to Bottom) */}
          <circle cx="300" cy="60" r="8" fill="#0d9488" />     {/* Top-Right (270 deg) */}
          <circle cx="470" cy="130" r="8" fill="#0d9488" />    {/* Middle-Right (315 deg) */}
          <circle cx="540" cy="300" r="8" fill="#0d9488" />    {/* Bottom-Right (0 deg) */}
        </svg>
        </div>
      </motion.div>

      {/* 3D Group Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center w-full h-full"
      >
        <div
          className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] flex items-center justify-center"
          style={{
            transform: 'rotateX(60deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Base Platform Extrusion (Slices) */}
          {Array.from({ length: 48 }).map((_, i) => (
            <div
              key={`base-${i}`}
              className="absolute inset-0 rounded-[48px] sm:rounded-[56px]"
              style={{
                backgroundColor: i === 47 ? '#ffffff' : `hsl(210, 20%, ${96 - (48-i)*0.25}%)`,
                transform: `translateZ(${i - 48}px)`,
                boxShadow: i === 0 ? '0 40px 100px rgba(13,148,136, 0.45), 0 10px 40px rgba(13,148,136, 0.25), 0 0 60px rgba(13,148,136, 0.2)' : 'none'
              }}
            />
          ))}

          {/* Base Platform Top Surface */}
          <div
            className="absolute inset-0 bg-white rounded-[48px] sm:rounded-[56px] overflow-hidden flex items-center justify-center"
            style={{ transform: 'translateZ(0px)' }}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100/50" />
          </div>

          {/* Physically correct cast shadow of the Teal Block onto the White Base */}
          <div
            className="absolute w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-[28px] sm:rounded-[36px] pointer-events-none"
            style={{
              transform: 'translateZ(1px)',
              boxShadow: '0 30px 40px rgba(13,148,136, 0.4), 0 10px 20px rgba(13,148,136, 0.2)'
            }}
          />

          {/* Solid Glowing Block Extrusion (Animated as a Button Press) */}
          <motion.div
            initial={{ z: 10 }}
            whileInView={{ z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Teal Block Slices */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`teal-${i}`}
                className="absolute w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-[28px] sm:rounded-[36px]"
                style={{
                  backgroundColor: i === 19 ? '#5eead4' : `hsl(175, 75%, ${42 - (20-i)*0.8}%)`,
                  transform: `translateZ(${i - 20}px)`
                }}
              />
            ))}

            {/* Teal Block Top Surface (Glossy Realistic) */}
            <div
              className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-[28px] sm:rounded-[36px] overflow-hidden flex items-center justify-center"
              style={{
                transform: 'translateZ(0px)',
                transformStyle: 'preserve-3d',
                background: 'linear-gradient(135deg, #4fd1c5 0%, #28a096 100%)',
                boxShadow: 'inset 2px 4px 12px rgba(255, 255, 255, 0.9), inset -2px -4px 12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.5)'
              }}
            >
              {/* Top Curved Glass Reflection */}
              <div className="absolute top-0 left-0 w-full h-[55%] bg-gradient-to-b from-white/70 to-white/5 rounded-b-[60%] opacity-90 blur-[0.5px] pointer-events-none" />

              {/* Diagonal Gloss Sheen */}
              <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />

              {/* 3D Code Symbol Slices */}
              <div className="relative flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={`text-${i}`}
                    className="absolute font-black text-[56px] sm:text-[64px] leading-none"
                    style={{
                      transform: `translateZ(${i * 1.5}px) rotateZ(-45deg) rotateX(-50deg)`,
                      color: i === 7 ? 'white' : '#0d9488',
                      WebkitTextStroke: i === 7 ? '1px rgba(255,255,255,0.9)' : 'none',
                      textShadow: i === 7 ? '0 8px 16px rgba(0,0,0,0.2)' : 'none'
                    }}
                  >
                    &lt;/&gt;
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Perfectly aligned curved text sitting on the 3D base side-wall */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-[24px] sm:mt-[24px] w-[260px] sm:w-[300px] pointer-events-none z-20">
          <svg viewBox="0 0 300 150" className="w-full h-auto overflow-visible">
            {/* Mathematically precise isometric contour for a rounded square */}
            <path id="curve" d="M 10,20 L 115,72 Q 150,90 185,72 L 290,20" fill="transparent" />
            <text className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.4em] fill-teal-800 uppercase" style={{ filter: 'drop-shadow(0px 1px 0px rgba(255,255,255,0.7))' }}>
              <textPath href="#curve" startOffset="50%" textAnchor="middle">Built Exactly Your Way</textPath>
            </text>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default function CustomDevHero() {
  return (
    <section className="relative w-full bg-[#f8fafc] pt-20 pb-16 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-100/30 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-100/30 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Header Content */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm border border-teal-100 text-[10px] font-bold tracking-widest text-teal-700 uppercase mb-6"
          >
            <span className="text-teal-500 font-black text-sm">&lt;/&gt;</span> CUSTOM DEVELOPMENT
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-6"
          >
            Your Vision, Our Code.<br />
            100% Custom. <span className="text-teal-600 relative inline-block">100% Yours.<svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-300 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 8 Q 50 0 100 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto font-medium"
          >
            We build fully custom web applications and software solutions designed around your business, your workflow, and your future.
          </motion.p>
        </div>

        {/* Orbit Layout Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-12 my-16 lg:my-24 max-w-7xl mx-auto relative px-4 xl:px-0">

          {/* Connecting Lines for Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            {/* We will rely on the central isometric svg circles, but could add specific svg lines here if needed */}
          </div>

          {/* Left Features */}
          <div className="flex flex-col gap-6 sm:gap-6 w-full lg:w-[320px] relative z-10">
            <FeatureBox align="left" icon={PuzzleIcon} delay={2.0} title="Custom Features" desc="Only the features you need, built the way you want." />
            <FeatureBox align="left" icon={LayoutIcon} delay={2.4} title="Custom Design" desc="Pixel-perfect UI/UX that represents your brand." />
            <FeatureBox align="left" icon={SitemapIcon} delay={2.8} title="Custom Workflows" desc="Built around your process, not the other way around." />
          </div>

          {/* Central Graphic */}
          <div className="flex justify-center w-full lg:w-auto relative z-0 lg:scale-110 my-8 lg:my-0 -mt-[20px] lg:-mt-[40px]">
            <CentralIsometric />
          </div>

          {/* Right Features */}
          <div className="flex flex-col gap-6 sm:gap-6 w-full lg:w-[320px] relative z-10 items-end lg:items-start">
            <FeatureBox align="right" icon={LinkIcon} delay={2.2} title="Seamless Integrations" desc="Connect with any system, API, or third-party tools." />
            <FeatureBox align="right" icon={SlidersIcon} delay={2.6} title="Complete Control" desc="Full flexibility to customize, manage, and extend." />
            <FeatureBox align="right" icon={ChartIcon} delay={3.0} title="Built to Scale" desc="Future-ready architecture that grows with your business." />
          </div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-24 w-full bg-white rounded-3xl p-6 sm:py-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 relative z-20"
        >
          <div className="flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between items-center sm:items-start gap-y-8 gap-x-4 sm:divide-x sm:divide-slate-100">
            <TrustItem icon={<ShieldIcon />} title="100% Custom Built" sub="Built For You, Not for Everyone" />
            <TrustItem icon={<LockIcon />} title="Secure & Reliable" sub="Enterprise Grade Security" />
            <TrustItem icon={<LayersIcon />} title="Modern & Scalable" sub="Future-Ready Architecture" />
            <TrustItem icon={<GrowthIcon />} title="Built to Growth" sub="Long-Term Success" />
            <TrustItem icon={<UsersIcon />} title="Trusted Partner" sub="We Grow With You" />
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
