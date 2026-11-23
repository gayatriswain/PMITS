"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  User,
  Server,
  Database,
  ArrowRight,
  Bug,
  RefreshCcw,
  Bell,
  Headset,
  ShieldCheck,
  MonitorSmartphone,
  Zap,
} from 'lucide-react';
import Container from '../shared/Container';

export default function WebHostingSecurity() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <Container>

        {/* ── Top Two-Column Layout ── */}
        {/* Needs real room for the floating cards beside the browser mockup, so the 2-column
            layout only kicks in at xl (1280px+) rather than lg — below that there just isn't
            enough width for both the browser and the side cards without them overlapping. */}
        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-12 xl:gap-16 items-center">

          {/* ── LEFT: Text & Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-1.5 text-[#0f766e] text-[11px] font-bold tracking-widest uppercase mb-4">
              SECURITY YOU CAN TRUST <ShieldCheck size={14} />
            </div>

            <h2 className="text-[38px] md:text-[46px] font-black text-[#0f2923] leading-[1.05] mb-5">
              Protected Before<br />
              <span className="text-[#0f766e]">Problems Happen.</span>
            </h2>

            <p className="text-slate-500 text-[15px] leading-relaxed mb-10 max-w-sm">
              Enterprise-grade security that works quietly in the background, so your website stays protected while you focus on your business.
            </p>

            {/* Protection Toggle Card */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-[13px] font-bold text-[#0f2923]">Protection</span>
                  <span className="bg-[#10b981] text-white text-[10px] font-black px-2 py-0.5 rounded">ON</span>
                </div>
                <div className="w-11 h-6 bg-[#10b981] rounded-full relative shadow-inner cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-[#10b981]/30 bg-[#f0fdf9] flex items-center justify-center shrink-0">
                  <Lock size={17} className="text-[#10b981]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#0f2923]">Your website is secure</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">All protection layers are active</p>
                </div>
              </div>
            </div>

            {/* Flow Diagram Card */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100">
              <div className="flex items-center justify-between gap-2">
                {[
                  { icon: <User size={16} className="text-[#0f766e]" />, label: 'Visitor', sub: 'User requests\nyour website' },
                  { arrow: true },
                  { icon: <Shield size={16} className="text-[#10b981]" />, label: 'Firewall', sub: 'We block threats\nand bad bots', highlight: true },
                  { arrow: true },
                  { icon: <Server size={16} className="text-[#0f766e]" />, label: 'Your Website', sub: 'Delivers fast and\nsecurely' },
                  { arrow: true },
                  { icon: <ShieldCheck size={16} className="text-[#0f766e]" />, label: 'Protected Data', sub: 'Your data stays\nsafe and private' },
                ].map((item, i) =>
                  item.arrow ? (
                    <ArrowRight key={i} size={12} className="text-[#a7f3d0] shrink-0" />
                  ) : (
                    <div key={i} className="flex flex-col items-center text-center gap-1.5 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${item.highlight ? 'bg-[#f0fdf9] border border-[#10b981]/30' : 'bg-[#f8fcfb]'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[#0f2923] leading-tight">{item.label}</p>
                        <p className="text-[8px] text-slate-400 mt-0.5 leading-tight whitespace-pre-line">{item.sub}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Big Graphic ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex items-center justify-center w-full max-w-[880px] mx-auto"
            style={{ height: 600, overflow: 'visible' }}
          >
            {/* SVG background: rings + shield + connector lines — fixed absolute fill. Every
                coordinate here is in the same 0-600 viewBox space that the HTML cards below use
                (as %), so the connector dots always line up with the cards regardless of how wide
                this box actually renders. */}
            <svg
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <defs>
                <radialGradient id="shieldFill" cx="50%" cy="38%" r="65%">
                  <stop offset="0%" stopColor="#f0fdfa" />
                  <stop offset="60%" stopColor="#e3f6f0" />
                  <stop offset="100%" stopColor="#d5f0e8" />
                </radialGradient>
              </defs>

              {/* Outer dashed ring */}
              <circle cx="300" cy="300" r="265" stroke="#0f766e" strokeWidth="1.2" fill="none" strokeDasharray="5 9" opacity="0.18" />
              {/* Middle dashed ring */}
              <circle cx="300" cy="300" r="200" stroke="#0f766e" strokeWidth="1" fill="none" strokeDasharray="4 8" opacity="0.15" />

              {/* ── SOFT FILLED SHIELD ── a proven shield silhouette (Lucide's "shield" icon
                  path, the same shape used for the ShieldCheck icons elsewhere on this page)
                  scaled up and centered, instead of a hand-tuned curve that wasn't rendering as
                  a recognizable shield. */}
              <g transform="translate(300,300) scale(19) translate(-12,-12.5)">
                <path
                  d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
                  fill="url(#shieldFill)"
                  stroke="#0f766e"
                  strokeWidth="1.2"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.95"
                />
              </g>

              {/* Connector: top card → shield */}
              <line x1="300" y1="85" x2="300" y2="118" stroke="#0f766e" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.35" />
              <circle cx="300" cy="85" r="6" fill="#0f766e" opacity="0.15" />
              <circle cx="300" cy="85" r="3" fill="#10b981" opacity="0.8" />

              {/* Connector: bottom card → shield */}
              <line x1="300" y1="478" x2="300" y2="512" stroke="#0f766e" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.35" />
              <circle cx="300" cy="512" r="6" fill="#0f766e" opacity="0.15" />
              <circle cx="300" cy="512" r="3" fill="#10b981" opacity="0.8" />

              {/* Connector: left card → shield */}
              <line x1="150" y1="270" x2="90" y2="270" stroke="#0f766e" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.35" />
              <circle cx="90" cy="270" r="6" fill="#0f766e" opacity="0.15" />
              <circle cx="90" cy="270" r="3" fill="#10b981" opacity="0.8" />

              {/* Connector: right card → shield */}
              <line x1="450" y1="270" x2="510" y2="270" stroke="#0f766e" strokeWidth="1.2" strokeDasharray="3 5" opacity="0.35" />
              <circle cx="510" cy="270" r="6" fill="#0f766e" opacity="0.15" />
              <circle cx="510" cy="270" r="3" fill="#10b981" opacity="0.8" />
            </svg>

            {/* ── Center Browser Mockup ── */}
            <div className="relative z-10 w-full max-w-[420px] bg-white rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.10)] border border-slate-100 overflow-hidden">

              {/* Browser titlebar */}
              <div className="h-9 bg-[#1c2a3a] flex items-center px-4 gap-3 relative shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 h-5 w-52 bg-[#263547] rounded flex items-center justify-center gap-1.5 px-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                  <span className="text-[9px] text-slate-300 font-medium tracking-wide">yourwebsite.com</span>
                </div>
              </div>

              {/* Browser inner page */}
              <div className="bg-white p-5">
                {/* Nav row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[13px] font-black text-[#0f2923]">YourWebsite</span>
                  <div className="flex gap-4 text-[9px] font-medium text-[#10b981]">
                    <span>Home</span><span>About</span><span>Services</span><span>Blog</span><span>Contact</span>
                  </div>
                </div>

                {/* Content row */}
                <div className="grid grid-cols-[1fr_180px] gap-4 items-start">
                  <div>
                    <h3 className="text-[22px] font-black text-[#0f2923] leading-tight mb-2">
                      We Build Websites<br />That <span className="text-[#0f766e]">Drive Results.</span>
                    </h3>
                    <p className="text-[10px] text-slate-400 mb-5">Fast. Secure. Reliable.</p>
                    <button className="bg-[#10b981] hover:bg-[#0d9f6e] text-white text-[10px] font-bold py-2 px-5 rounded transition-colors">
                      Get Started
                    </button>
                  </div>

                  {/* Realistic glass building SVG */}
                  <div className="rounded-xl overflow-hidden bg-gradient-to-b from-sky-200 to-sky-400 relative" style={{ height: 140 }}>
                    {/* Sky gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100"></div>
                    {/* Building body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[78%] bg-gradient-to-b from-[#4a6fa5] to-[#3a5580] rounded-t-sm overflow-hidden">
                      {/* Glass grid */}
                      <div className="grid grid-cols-6 grid-rows-5 gap-[1px] p-[3px] w-full h-full">
                        {[...Array(30)].map((_, i) => (
                          <div
                            key={i}
                            className="rounded-[1px]"
                            style={{
                              background: i % 7 === 0
                                ? 'rgba(255,255,255,0.35)'
                                : i % 3 === 0
                                  ? 'rgba(135,190,235,0.45)'
                                  : 'rgba(100,160,220,0.3)',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>

              {/* Protected banner inside browser */}
              <div className="mx-4 mb-4 mt-1 bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100 p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#10b981]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={15} className="text-[#10b981]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#0f2923]">Your website is protected</p>
                  <p className="text-[9px] text-slate-400">All security layers are active and monitoring 24/7</p>
                </div>
              </div>
            </div>

            {/* ── TOP floating card: SSL Encryption ── */}
            <motion.div
              className="absolute z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-3.5 flex items-center gap-3"
              style={{ top: '2%', left: '50%', transform: 'translateX(-50%)', width: 230 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center shrink-0">
                <Lock size={17} className="text-white" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#0f2923]">SSL Encryption</p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Encrypt every connection<br />with SSL certificates.</p>
              </div>
            </motion.div>

            {/* ── LEFT floating card: Firewall Protection ── */}
            <motion.div
              className="absolute z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-3.5"
              style={{ left: '4%', top: '38%', transform: 'translateY(-50%)', width: 180 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#0f766e] flex items-center justify-center shrink-0">
                  <Server size={16} className="text-white" />
                </div>
                <p className="text-[12px] font-bold text-[#0f2923] leading-tight">Firewall<br />Protection</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Advanced firewall blocks malicious traffic and attacks.</p>
            </motion.div>

            {/* ── RIGHT floating card: Malware Protection ── */}
            <motion.div
              className="absolute z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-3.5"
              style={{ right: '4%', top: '38%', transform: 'translateY(-50%)', width: 180 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#0f766e] flex items-center justify-center shrink-0">
                  <Bug size={16} className="text-white" />
                </div>
                <p className="text-[12px] font-bold text-[#0f2923] leading-tight">Malware<br />Protection</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Continuous scanning and monitoring keeps your site clean.</p>
            </motion.div>

            {/* ── BOTTOM floating card: Daily Backups ── */}
            <motion.div
              className="absolute z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-3.5 flex items-center gap-3"
              style={{ bottom: '2%', left: '50%', transform: 'translateX(-50%)', width: 240 }}
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center shrink-0">
                <RefreshCcw size={17} className="text-white" />
              </div>
              <div>
                <p className="text-[12px] font-bold text-[#0f2923]">Daily Backups</p>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Automatic daily backups<br />so you can recover anytime.</p>
              </div>
            </motion.div>

            {/* ── BOTTOM-LEFT floating card: Protected Data ── */}
            <motion.div
              className="absolute z-20 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-slate-100 p-3.5"
              style={{ left: '0%', bottom: '8%', width: 170 }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-[#0f766e] flex items-center justify-center shrink-0">
                  <Database size={16} className="text-white" />
                </div>
                <p className="text-[12px] font-bold text-[#0f2923] leading-tight">Protected Data</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">Your data stays safe and private.</p>
            </motion.div>

          </motion.div>
        </div>

        {/* ── Bottom Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-[#f8fafc] rounded-3xl p-6 md:p-8 border border-slate-100 flex flex-col xl:flex-row items-center justify-between gap-8"
        >
          {/* Left */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-full bg-[#0f766e] flex items-center justify-center shadow-[0_8px_24px_rgba(15,118,110,0.25)]">
                <ShieldCheck size={28} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#0f766e]/20 scale-125"></div>
              <div className="absolute inset-0 rounded-full border border-[#0f766e]/10 scale-[1.6]"></div>
            </div>
            <div>
              <p className="text-[15px] font-semibold text-[#0f2923] mb-1">
                Your website shouldn't need a security expert watching it every minute.
              </p>
              <p className="text-[20px] font-black text-[#0f766e]">
                We keep watch. <span className="text-[#10b981]">You keep growing.</span>
              </p>
            </div>
          </div>

          {/* Right feature pills */}
          <div className="flex flex-wrap items-center gap-5 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
            {[
              { icon: <MonitorSmartphone size={18} className="text-[#0f766e]" />, title: '24/7 Monitoring', sub: 'Always watching\nfor threats.' },
              { icon: <Zap size={18} className="text-[#10b981] fill-[#10b981]" />, title: 'Instant Alerts', sub: 'We act fast and\nkeep you informed.' },
              { icon: <Headset size={18} className="text-[#0f766e]" />, title: 'Human Support', sub: 'Real people ready\nto help you.' },
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#0f2923]">{item.title}</p>
                    <p className="text-[10px] text-slate-500 leading-tight whitespace-pre-line mt-0.5">{item.sub}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="hidden sm:block w-px h-10 bg-slate-100"></div>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
