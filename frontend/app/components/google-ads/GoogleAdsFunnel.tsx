
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../shared/Container';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
);
const ShoppingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
);
const YouTubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" /></svg>
);
const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const MonitorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
);
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

const NODES = [
  { id: '05', angle: -30, color: '#FBBC05' },
  { id: '06', angle: 0, color: '#4285F4' },
  { id: '04', angle: 30, color: '#7c4dff' },
  { id: '03', angle: 150, color: '#EA4335' },
  { id: '02', angle: 180, color: '#34A853' },
  { id: '01', angle: 210, color: '#00acc1' },
];

const EcosystemCircle = () => {
  const S = 340, cx = 170, cy = 170, outerR = 125;
  const arcs = [];
  for (let i = 0; i < NODES.length; i++) {
    const startNode = NODES[i];
    const endNode = NODES[(i + 1) % NODES.length];
    const startRad = (startNode.angle * Math.PI) / 180;
    const endRad = (endNode.angle * Math.PI) / 180;
    const gapRad = 0.08;
    const sRad = startRad + gapRad;
    const eRad = endRad - gapRad;
    const x1 = cx + outerR * Math.cos(sRad);
    const y1 = cy + outerR * Math.sin(sRad);
    const x2 = cx + outerR * Math.cos(eRad);
    const y2 = cy + outerR * Math.sin(eRad);
    let diff = endNode.angle - startNode.angle;
    if (diff < 0) diff += 360;
    const largeArcFlag = diff > 180 ? 1 : 0;
    arcs.push(
      <path key={`arc-${i}`} d={`M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2} ${y2}`} fill="none" stroke={startNode.color} strokeWidth="16" strokeLinecap="round" />
    );
  }
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
      <circle cx={cx} cy={cy} r={outerR + 14} fill="#f0f9fa" />
      {arcs}
      <circle cx={cx} cy={cy} r={95} fill="white" />
      <circle cx={cx} cy={cy} r={92} fill="white" stroke="#e8f0f2" strokeWidth="1.5" />
      {NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = cx + outerR * Math.cos(rad);
        const y = cy + outerR * Math.sin(rad);
        const lx = cx + (outerR + 25) * Math.cos(rad);
        const ly = cy + (outerR + 25) * Math.sin(rad);
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={lx} y2={ly} stroke={node.color} strokeWidth="2" strokeDasharray="4 3" />
            <circle cx={x} cy={y} r={10} fill="white" />
            <circle cx={x} cy={y} r={7} fill={node.color} />
          </g>
        );
      })}
      <foreignObject x={cx - 60} y={cy - 50} width="120" height="100">
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%' }}>
          <img src="/google-ads-icon.webp" alt="Google Ads" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '4px' }} />
          <span style={{ fontSize:'12px', fontWeight:700, color:'#132a43', textAlign:'center', lineHeight:1.3 }}>Google Ads<br/>Ecosystem</span>
        </div>
      </foreignObject>
    </svg>
  );
};

const LEFT_ITEMS = [
  { num: "01", title: "Search Ads", desc: "Capture high-intent customers actively searching for your products or services.", Icon: SearchIcon, color: "#00acc1", clip: "polygon(0 0, 100% 12%, 100% 88%, 0 100%)" },
  { num: "02", title: "Shopping Ads", desc: "Showcase your products to customers who are ready to buy.", Icon: ShoppingIcon, color: "#34A853", clip: "polygon(0 4%, 100% 10%, 100% 90%, 0 96%)" },
  { num: "03", title: "YouTube Ads", desc: "Build brand awareness and drive demand with engaging video advertising.", Icon: YouTubeIcon, color: "#EA4335", clip: "polygon(0 12%, 100% 4%, 100% 96%, 0 88%)" },
];

const RIGHT_ITEMS = [
  { num: "05", title: "Performance Max", desc: "Leverage AI to maximize conversions across all Google channels with one campaign.", Icon: StarIcon, color: "#FBBC05", clip: "polygon(0 12%, 100% 0, 100% 100%, 0 88%)" },
  { num: "06", title: "Display Ads", desc: "Reach your audience across millions of websites and apps they visit.", Icon: MonitorIcon, color: "#4285F4", clip: "polygon(0 10%, 100% 4%, 100% 96%, 0 90%)" },
  { num: "04", title: "Remarketing", desc: "Reconnect with visitors who showed interest and bring them back to convert.", Icon: UsersIcon, color: "#7c4dff", clip: "polygon(0 4%, 100% 12%, 100% 88%, 0 96%)" },
];

export default function GoogleAdsFunnel() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-10 bg-[#00acc1]"></span>
            <span className="text-[#00acc1] text-xs font-bold tracking-widest uppercase">How We Do It</span>
            <span className="h-px w-10 bg-[#00acc1]"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#132a43] leading-tight mb-5 font-serif">
            A Full-Funnel Approach<br />Across <span className="text-[#00acc1]">Google.</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm lg:text-base leading-relaxed">
            We combine the power of all Google Ads networks<br className="hidden md:block" />
            to attract, engage and convert your ideal customers at every stage.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 w-full relative z-0">
          {/* LEFT cards */}
          <div className="flex flex-col gap-8 w-full lg:w-[32%] z-10 items-end">
            {LEFT_ITEMS.slice(0, 2).map((item, i) => {
              const positionClass = ['lg:translate-x-4', 'lg:translate-x-12'][i];
              return (
                <motion.div
                  key={item.num} initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative flex items-center w-full lg:w-[95%] mb-2 lg:mb-0 z-10 ${positionClass}`}
                >
                  <div className="w-full relative" style={{ filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.08))' }}>
                    <div 
                      className="bg-white py-6 flex flex-col items-start pl-16 xl:pl-20 pr-6 transition-all duration-300 hover:scale-[1.02]"
                      style={{ clipPath: item.clip, height: '100%' }}
                    >
                      <span className="text-sm font-extrabold tracking-wider mb-1" style={{ color: item.color }}>{item.num}</span>
                      <h3 className="text-lg font-bold text-[#132a43] mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                      <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: item.color, opacity: 0.5 }}></div>
                    </div>
                  </div>
                  <div
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-[4px] border-[#fbfdfd] shadow-xl z-20 hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: item.color, color: 'white' }}
                  >
                    <item.Icon />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER */}
          <div className="flex-none flex items-center justify-center py-8 lg:py-0 w-[340px] z-0">
            <motion.div initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative flex items-center justify-center">
              <EcosystemCircle />
            </motion.div>
          </div>

          {/* RIGHT cards */}
          <div className="flex flex-col gap-8 w-full lg:w-[32%] z-10 items-start">
            {RIGHT_ITEMS.slice(0, 2).map((item, i) => {
              const positionClass = ['lg:-translate-x-4', 'lg:-translate-x-12'][i];
              return (
                <motion.div
                  key={item.num} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative flex items-center w-full lg:w-[95%] ml-10 lg:ml-0 mb-2 lg:mb-0 z-10 ${positionClass}`}
                >
                  <div className="w-full relative" style={{ filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.08))' }}>
                    <div 
                      className="bg-white py-6 flex flex-col items-start pl-16 xl:pl-20 pr-6 transition-all duration-300 hover:scale-[1.02]"
                      style={{ clipPath: item.clip, height: '100%' }}
                    >
                      <span className="text-sm font-extrabold tracking-wider mb-1" style={{ color: item.color }}>{item.num}</span>
                      <h3 className="text-lg font-bold text-[#132a43] mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                      <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: item.color, opacity: 0.5 }}></div>
                    </div>
                  </div>
                  <div
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-[4px] border-[#fbfdfd] shadow-xl z-20 hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: item.color, color: 'white' }}
                  >
                    <item.Icon />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 w-full max-w-4xl mx-auto relative z-10 mt-8 lg:-mt-2">
          {[LEFT_ITEMS[2], RIGHT_ITEMS[2]].map((item, i) => {
            const delay = i === 0 ? 0.3 : 0.45;
            const translateX = i === 0 ? 'lg:translate-x-12' : 'lg:-translate-x-12';
            return (
              <motion.div
                key={item.num} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.6 }}
                className={`relative flex items-center w-full lg:w-[46%] ml-10 lg:ml-0 z-10 ${translateX}`}
              >
                <div className="w-full relative" style={{ filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.08))' }}>
                  <div 
                    className="bg-white py-6 flex flex-col items-start pl-16 xl:pl-20 pr-6 transition-all duration-300 hover:scale-[1.02]"
                    style={{ clipPath: item.clip, height: '100%' }}
                  >
                    <span className="text-sm font-extrabold tracking-wider mb-1" style={{ color: item.color }}>{item.num}</span>
                    <h3 className="text-lg font-bold text-[#132a43] mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{item.desc}</p>
                    <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: item.color, opacity: 0.5 }}></div>
                  </div>
                </div>
                <div
                  className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-[4px] border-[#fbfdfd] shadow-xl z-20 hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: item.color, color: 'white' }}
                >
                  <item.Icon />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
