"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

/* =========================================================================
   ICONS (solid, small — used inside the diagram nodes)
   ========================================================================= */

const BLUE = "#2563eb";
const GREEN = "#1fa855";
const SHEET_GREEN = "#14967f";
const TEAL = "#0f8a83";

const PersonIcon = ({ color = BLUE }: { color?: string }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="7.5" r="4" />
    <path d="M4 20.5c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5V21H4Z" />
  </svg>
);
const MailIcon = ({ color = BLUE }: { color?: string }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="14" rx="2" fill={color} />
    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
  </svg>
);
const PhoneIcon = ({ color = BLUE }: { color?: string }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
    <path d="M6.6 2.8c.5-.4 1.2-.3 1.6.2l2.2 3c.3.5.3 1.1-.1 1.5L8.8 8.9a12 12 0 0 0 6.3 6.3l1.4-1.5c.4-.4 1-.4 1.5-.1l3 2.2c.5.4.6 1.1.2 1.6l-1.5 2c-.6.8-1.7 1.2-2.7.9C10.6 18.7 5.3 13.4 3.7 7c-.3-1 .1-2.1.9-2.7Z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 32 32">
    <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Z" fill={GREEN} />
    <path
      d="M11.2 9.4c.3-.6.6-.6.9-.6h.8c.2 0 .6.1.8.6l1.1 2.7c.1.3 0 .6-.1.8l-.8 1c-.2.2-.2.4 0 .7a9 9 0 0 0 4.2 3.7c.3.1.5.1.7-.1l1.1-1.3c.2-.3.5-.3.8-.2l2.6 1.2c.3.2.5.3.5.5.1.4 0 1.6-.6 2.3-.6.7-1.9 1.3-3 1.2-1.8-.1-4.4-1-6.9-3.4-2.3-2.3-3.2-4.8-3.3-6.5 0-1.3.6-2.3 1.2-2.6Z"
      fill="#fff"
    />
  </svg>
);
const SheetIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <path d="M5.5 2h9l5 5v13.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 20.5v-17A1.5 1.5 0 0 1 5.5 2Z" fill={SHEET_GREEN} />
    <rect x="7.5" y="10" width="9" height="8" rx="0.6" fill="none" stroke="#fff" strokeWidth="1.3" />
    <path d="M7.5 13h9M7.5 15.5h9M11 10v8" stroke="#fff" strokeWidth="1.3" />
  </svg>
);
const ReportIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24">
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill={TEAL} />
    <path d="M7 17v-4M12 17V8M17 17v-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CodeLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none">
    <path d="M13 7 4 16l9 9" stroke="#2563eb" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m19 7 9 9-9 9" stroke="#14b8a6" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const XMark = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 3l6 6M9 3 3 9" />
  </svg>
);
const CheckMark = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="m2.5 6.3 2.3 2.2 4.7-5" />
  </svg>
);

const FaceIcon = ({ happy }: { happy: boolean }) => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="12" r="9.5" />
    <circle cx="9" cy="10" r="0.6" fill="currentColor" />
    <circle cx="15" cy="10" r="0.6" fill="currentColor" />
    <path d={happy ? "M8 14.5c2.2 2.4 5.8 2.4 8 0" : "M8 16.5c2.2-2.4 5.8-2.4 8 0"} />
  </svg>
);

/* =========================================================================
   DATA
   ========================================================================= */

interface DiagramNode {
  label: string;
  sub: string;
  icon: React.ReactNode;
}

// Order = clockwise from the top of the ring
const disconnectedNodes__cms: DiagramNode[] = [
  { label: "Lead Comes In", sub: "Website / Forms", icon: <PersonIcon /> },
  { label: "Email", sub: "Manual Entry", icon: <MailIcon /> },
  { label: "Spreadsheets", sub: "Scattered Data", icon: <SheetIcon /> },
  { label: "WhatsApp", sub: "Manual Follow-up", icon: <WhatsAppIcon /> },
  { label: "Calls", sub: "No Tracking", icon: <PhoneIcon /> },
];

const connectedNodes__cms: DiagramNode[] = [
  { label: "Lead Capture", sub: "Website / Forms", icon: <PersonIcon color={TEAL} /> },
  { label: "Email", sub: "Sync & Track", icon: <MailIcon color={TEAL} /> },
  { label: "Data & Reports", sub: "Real-time Insights", icon: <ReportIcon /> },
  { label: "WhatsApp", sub: "Integrated", icon: <WhatsAppIcon /> },
  { label: "Calls", sub: "Click to Call", icon: <PhoneIcon color={TEAL} /> },
];

const painPoints__cms = [
  "Leads are lost in follow-ups",
  "Important data is scattered everywhere",
  "Teams waste time on manual work",
];

// Pentagon layout on a ring (radius in % of the square diagram)
const RING_R = 38;
const nodeAngle = (i: number) => -90 + i * 72;
const markerAngle = (i: number) => -90 + 36 + i * 72;
const polar = (angleDeg: number, r = RING_R) => {
  const a = (angleDeg * Math.PI) / 180;
  return { x: 50 + r * Math.cos(a), y: 50 + r * Math.sin(a) };
};

/* =========================================================================
   DIAGRAM
   ========================================================================= */

function RingDiagram({ variant }: { variant: "disconnected" | "connected" }) {
  const $t = useCmsText();
  const disconnectedNodes = useCmsData("CustomCrmChallenge__disconnectedNodes", disconnectedNodes__cms);
  const connectedNodes = useCmsData("CustomCrmChallenge__connectedNodes", connectedNodes__cms);
  const isConnected = variant === "connected";
  const nodes = isConnected ? connectedNodes : disconnectedNodes;

  return (
    <div className="relative w-full max-w-[400px] aspect-square mx-auto">
      {/* Dashed ring */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
        {isConnected ? (
          <motion.circle
            cx="50"
            cy="50"
            r={RING_R}
            stroke="#5cc8bf"
            strokeWidth="0.45"
            strokeDasharray="1.6 1.6"
            animate={{ strokeDashoffset: [0, -6.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        ) : (
          <circle cx="50" cy="50" r={RING_R} stroke="#b9c3cf" strokeWidth="0.45" strokeDasharray="1.6 1.6" />
        )}
      </svg>

      {/* Markers between nodes: red crosses (broken links) / teal checks (synced) */}
      {nodes.map((_, i) => {
        const m = polar(markerAngle(i));
        return (
          <motion.span
            key={i}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full flex items-center justify-center ${
              isConnected ? "bg-[#0f8a83] text-white ring-2 ring-white" : "bg-white text-[#ef4444] border-[1.5px] border-[#f87171]"
            }`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
          >
            {isConnected ? <CheckMark className="w-2.5 h-2.5" /> : <XMark className="w-2.5 h-2.5" />}
          </motion.span>
        );
      })}

      {/* Node cards */}
      {nodes.map((node, i) => {
        const p = polar(nodeAngle(i));
        return (
          <motion.div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[24%] min-w-[84px] rounded-xl bg-white border border-slate-100 shadow-[0_8px_22px_-10px_rgba(15,35,51,0.25)] px-1.5 py-3 flex flex-col items-center text-center"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
          >
            {node.icon}
            <span className="mt-2 text-[9.5px] font-extrabold tracking-[0.04em] uppercase text-[#0f2333] leading-tight">
              {node.label}
            </span>
            <span className="mt-0.5 text-[9px] text-slate-500 leading-tight">{node.sub}</span>
          </motion.div>
        );
      })}

      {/* Hub */}
      {isConnected ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[33%] aspect-square">
          <motion.div
            className="absolute -inset-2 rounded-full bg-[#14b8a6]/10"
            animate={{ scale: [1, 1.07, 1], opacity: [0.9, 0.45, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative w-full h-full rounded-full bg-white border border-[#8fdcd4] shadow-[0_10px_30px_-10px_rgba(15,138,131,0.45),inset_0_0_18px_rgba(20,184,166,0.12)] flex flex-col items-center justify-center text-center">
            <CodeLogo className="w-8 h-8" />
            <span className="mt-1 text-[13px] font-extrabold text-[#0f2333] uppercase">{html($t("CustomCrmChallenge__t1", "Your CRM"))}</span>
            <span className="mt-0.5 text-[9.5px] text-slate-500 leading-tight">{rich($t("CustomCrmChallenge__t2m", "Single Source<br>of Truth"))}</span>
          </div>
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[27%] aspect-square rounded-full bg-[radial-gradient(circle,#fff6f6_0%,#fde9e9_100%)] shadow-[0_0_0_6px_rgba(254,226,226,0.45)] flex flex-col items-center justify-center text-center">
          <span className="w-7 h-7 rounded-full border-2 border-[#ef4444] text-[#ef4444] flex items-center justify-center text-sm font-black">
            !
          </span>
          <span className="mt-1 text-[10px] font-extrabold text-[#0f2333] uppercase">{html($t("CustomCrmChallenge__t4", "Data Silos"))}</span>
          <span className="mt-0.5 text-[9px] text-slate-500 leading-tight">{rich($t("CustomCrmChallenge__t5m", "No Visibility<br>No Control"))}</span>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   MAIN SECTION
   ========================================================================= */

export default function CustomCrmChallenge() {
  const $t = useCmsText();
  const painPoints = useCmsData("CustomCrmChallenge__painPoints", painPoints__cms);
  return (
    <section className="relative w-full bg-white py-16 sm:py-20 font-sans">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ======================= LEFT: COPY ======================= */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-black tracking-[0.2em] text-[#0f8a83] uppercase">{html($t("CustomCrmChallenge__t7", "The Challenge"))}</span>
            <h2 className="text-h2 mt-3 font-extrabold tracking-tight text-[#0f2333]">{rich($t("CustomCrmChallenge__t8m", "Your business has its own way of working.<br><span class=\"text-[#0f8a83]\">But your tools don't.</span>"))}</h2>
            <p className="text-body mt-5 text-slate-600">
              {rich($t("CustomCrmChallenge__t10", "When your teams, data and processes live in different places, work slows down and opportunities slip away."))}</p>

            <ul className="mt-6 space-y-3.5">
              {painPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-slate-700">
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
                    <XMark />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            {/* Insight box */}
            <div className="mt-7 flex gap-3 rounded-xl bg-[#effaf8] border border-[#cdeee9] p-4">
              <svg className="w-6 h-6 flex-shrink-0 text-[#0f8a83]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6M10 21h4" />
                <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
              </svg>
              <p className="text-small text-slate-600">{rich($t("CustomCrmChallenge__t11m", "<span class=\"font-bold text-[#0f2333]\">Your problem isn't that you need another CRM.</span><br>Your problem is that your current tools don't work together."))}</p>
            </div>
          </motion.div>

          {/* ======================= RIGHT: COMPARISON CARD ======================= */}
          <motion.div
            className="lg:col-span-8 relative rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-25px_rgba(15,35,51,0.2)] overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Disconnected */}
              <div className="p-6 sm:p-7 bg-[#fafbfc] md:border-r border-b md:border-b-0 border-slate-200/70">
                <div className="text-center">
                  <h3 className="text-base font-extrabold tracking-[0.06em] text-[#0f2333] uppercase">{html($t("CustomCrmChallenge__t13", "Disconnected"))}</h3>
                  <p className="text-small mt-1 text-slate-700">{rich($t("CustomCrmChallenge__t14", "Tools don't talk. Data doesn't flow."))}</p>
                </div>
                <div className="mt-4">
                  <RingDiagram variant="disconnected" />
                </div>
                <div className="mt-5 flex items-center justify-center gap-2.5 rounded-lg bg-[#fdeeee] px-4 py-3 text-[13px] text-[#0f2333]">
                  <span className="text-[#ef4444]">
                    <FaceIcon happy={false} />
                  </span>
                  {html($t("CustomCrmChallenge__t15", "More manual work. More errors. Missed opportunities."))}</div>
              </div>

              {/* Connected */}
              <div className="p-6 sm:p-7 bg-[#fafbfc]">
                <div className="text-center">
                  <h3 className="text-base font-extrabold tracking-[0.06em] text-[#0f8a83] uppercase">{html($t("CustomCrmChallenge__t16", "Connected"))}</h3>
                  <p className="text-small mt-1 text-slate-700">{rich($t("CustomCrmChallenge__t17", "One CRM. Everything works together."))}</p>
                </div>
                <div className="mt-4">
                  <RingDiagram variant="connected" />
                </div>
                <div className="mt-5 flex items-center justify-center gap-2.5 rounded-lg bg-[#e6f6f4] px-4 py-3 text-[13px] text-[#0f766e]">
                  <span className="text-[#0f8a83]">
                    <FaceIcon happy />
                  </span>
                  {html($t("CustomCrmChallenge__t18", "Connected teams. Real-time data. More growth."))}</div>
              </div>
            </div>

            {/* VS badge on the divider */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0f766e] text-white text-sm font-bold items-center justify-center ring-4 ring-white shadow-[0_8px_20px_-6px_rgba(15,118,110,0.6)]">
              {html($t("CustomCrmChallenge__t19", "VS"))}</div>
          </motion.div>
        </div>

        {/* ======================= BOTTOM BANNER ======================= */}
        <motion.div
          className="mt-12 lg:mt-14 max-w-5xl mx-auto rounded-2xl bg-[linear-gradient(90deg,#eef8f7_0%,#f6fbfb_100%)] border border-[#d6efeb] px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="w-11 h-11 rounded-xl bg-[#0f5e63] text-white flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <div className="flex-1">
            <h4 className="text-h6 font-bold text-[#0f2333]">{html($t("CustomCrmChallenge__t20", "It's time to bring everything together."))}</h4>
            <p className="text-small mt-0.5 text-slate-600">{rich($t("CustomCrmChallenge__t21", "A custom CRM that fits the way you work, not the other way around."))}</p>
          </div>
          <Link
            href={$t("CustomCrmChallenge__t22", "#how-it-works")}
            className="group inline-flex items-center gap-3 sm:pl-6 sm:border-l border-[#cfe9e5] text-sm font-semibold text-[#0f8a83]"
          >
            {$t("CustomCrmChallenge__t23", "See how it works")}<span className="w-8 h-8 rounded-full border border-[#0f8a83] flex items-center justify-center group-hover:bg-[#0f8a83] group-hover:text-white transition-colors">
              →
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
