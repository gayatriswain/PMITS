"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

/* =========================================================================
   ICONS
   ========================================================================= */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type IconProps = { className?: string };

const BuildingIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 9h5a1 1 0 0 1 1 1v11M2 21h20M8 8h2M8 12h2M8 16h2M17 13h1M17 17h1" />
  </svg>
);
const CapIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="m2 9 10-5 10 5-10 5Z" />
    <path d="M6 11.5V16c3 2.2 9 2.2 12 0v-4.5M22 9v6" />
  </svg>
);
const HeartPulseIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M12 20.5s-8-4.8-8-10.8A4.4 4.4 0 0 1 8.4 5.3c1.5 0 2.9.8 3.6 2 .7-1.2 2.1-2 3.6-2A4.4 4.4 0 0 1 20 9.7c0 6-8 10.8-8 10.8Z" />
    <path d="M6.5 12h3l1.5-2.5 2 5 1.5-2.5h3" />
  </svg>
);
const TruckIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M3 6.5h11V16H3ZM14 10h4l3 3v3h-7" />
    <circle cx="7.5" cy="18" r="1.7" />
    <circle cx="17" cy="18" r="1.7" />
  </svg>
);
const RupeeIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 8h7M8.5 11h7M10.5 8c3.6 0 3.6 3.6 0 3.6H8.5L14 16.5" />
  </svg>
);
const FactoryIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M3 21V10l5 3v-3l5 3V7l5-3v17M3 21h18M7 17h2M12 17h2M17 12h1" />
  </svg>
);
const PeopleIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M20.5 19a5 5 0 0 0-3.5-4.8" />
  </svg>
);
const RouteIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10Z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
);
const TargetIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
  </svg>
);
const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === "left" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
  </svg>
);

/* =========================================================================
   DATA
   ========================================================================= */

interface Industry {
  name: string; // selector label
  title: string; // featured heading
  desc: string;
  manages: string;
  workflow: string[];
  stat: string;
  statLabel: string;
  note: [string, string]; // handwritten annotation (two lines)
  Icon: (props: IconProps) => React.ReactElement;
  image: string;
  href: string;
}

const CRM_IMAGE = "/crm2-cutout.webp";

const industries__cms: Industry[] = [
  {
    name: "Real Estate CRM",
    title: "Real Estate CRM",
    desc: "A complete CRM for real estate businesses to manage leads, properties, site visits and deals in one place.",
    manages: "Leads, Properties, Site Visits, Deals & Client Communication",
    workflow: ["Capture", "Qualify", "Site Visit", "Deal", "Closing"],
    stat: "42%",
    statLabel: "Increase in Conversions",
    note: ["One CRM. All Your", "Real Estate Operations."],
    Icon: BuildingIcon,
    image: CRM_IMAGE,
    href: "#",
  },
  {
    name: "Education CRM",
    title: "Education CRM",
    desc: "A complete CRM for education institutes to manage enquiries, admissions, students and fees in one place.",
    manages: "Enquiries, Admissions, Students, Fees & Parent Communication",
    workflow: ["Enquiry", "Counselling", "Application", "Admission", "Enrolment"],
    stat: "38%",
    statLabel: "Increase in Admissions",
    note: ["One CRM. All Your", "Admission Operations."],
    Icon: CapIcon,
    image: CRM_IMAGE,
    href: "#",
  },
  {
    name: "Healthcare CRM",
    title: "Healthcare CRM",
    desc: "A complete CRM for healthcare providers to manage patients, appointments, follow-ups and records in one place.",
    manages: "Patients, Appointments, Follow-ups, Records & Reminders",
    workflow: ["Enquiry", "Appointment", "Visit", "Follow-up", "Retention"],
    stat: "45%",
    statLabel: "Fewer Missed Appointments",
    note: ["One CRM. All Your", "Patient Operations."],
    Icon: HeartPulseIcon,
    image: CRM_IMAGE,
    href: "#",
  },
  {
    name: "Logistics CRM",
    title: "Logistics CRM",
    desc: "A complete CRM for logistics companies to manage customers, quotes, shipments and deliveries in one place.",
    manages: "Customers, Quotes, Shipments, Fleet & Delivery Updates",
    workflow: ["Enquiry", "Quote", "Booking", "Dispatch", "Delivery"],
    stat: "30%",
    statLabel: "Faster Delivery Turnaround",
    note: ["One CRM. All Your", "Logistics Operations."],
    Icon: TruckIcon,
    image: CRM_IMAGE,
    href: "#",
  },
  {
    name: "Finance CRM",
    title: "Finance CRM",
    desc: "A complete CRM for finance firms to manage clients, applications, portfolios and compliance in one place.",
    manages: "Clients, Applications, Portfolios, Documents & Compliance",
    workflow: ["Lead", "KYC", "Proposal", "Onboarding", "Review"],
    stat: "35%",
    statLabel: "Faster Client Onboarding",
    note: ["One CRM. All Your", "Finance Operations."],
    Icon: RupeeIcon,
    image: CRM_IMAGE,
    href: "#",
  },
  {
    name: "Manufacturing CRM",
    title: "Manufacturing CRM",
    desc: "A complete CRM for manufacturers to manage dealers, quotes, orders and after-sales service in one place.",
    manages: "Dealers, Quotes, Orders, Inventory & Service Requests",
    workflow: ["Enquiry", "Quote", "Order", "Dispatch", "Service"],
    stat: "28%",
    statLabel: "Increase in Repeat Orders",
    note: ["One CRM. All Your", "Manufacturing Operations."],
    Icon: FactoryIcon,
    image: CRM_IMAGE,
    href: "#",
  },
];

/* =========================================================================
   MAIN SECTION
   ========================================================================= */

export default function CustomCrmIndustries() {
  const $t = useCmsText();
  const industries = useCmsData("CustomCrmIndustries__industries", industries__cms);
  const [index, setIndex] = useState(0);
  const total = industries.length;
  const active = industries[index];

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f5f9fa_100%)] py-14 sm:py-20 font-sans">
      <div className="absolute top-10 right-0 w-[640px] h-[520px] bg-cyan-100/50 rounded-full blur-[130px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="mx-auto w-[90%]">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-10 lg:gap-6 items-center">
          {/* ======================= LEFT: COPY ======================= */}
          <div className="relative z-20">
            <span className="text-[11px] sm:text-xs font-black tracking-[0.2em] text-[#0f8a83] uppercase">
              {$t("CustomCrmIndustries__t1", "Our Work. Real Impact.")}</span>
            <h2 className="text-h2 mt-4 font-extrabold tracking-tight text-[#0f2333]">
              {$t("CustomCrmIndustries__t2", "Custom CRMs.")}<br />
              <span className="text-[#0f8a83]">{$t("CustomCrmIndustries__t3", "Built for Every Business.")}</span>
            </h2>
            <p className="text-body mt-5 text-slate-600 max-w-md">
              {rich($t("CustomCrmIndustries__t4", "Explore how we've helped businesses streamline their processes, improve visibility and drive real growth."))}</p>

            {/* Featured CRM (swaps with the selector) */}
            <div className="mt-8 min-h-[330px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-[10.5px] font-black tracking-[0.2em] text-[#0f8a83] uppercase">{$t("CustomCrmIndustries__t5", "Featured CRM")}</span>
                  <div className="mt-2 flex items-center gap-4 flex-wrap">
                    <h3 className="text-h4 font-extrabold text-[#0f2333]">{active.title}</h3>
                    <span className="px-3 py-1 rounded-full border border-slate-300 text-xs font-semibold text-slate-600">
                      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-small mt-3 text-slate-600 max-w-md">{active.desc}</p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 max-w-[440px]">
                    <div>
                      <span className="w-10 h-10 rounded-full bg-[#e8f6f4] text-[#0f8a83] flex items-center justify-center">
                        <PeopleIcon />
                      </span>
                      <h4 className="mt-2.5 text-[13px] font-bold text-[#0f2333]">{$t("CustomCrmIndustries__t6", "What it manages")}</h4>
                      <p className="mt-1 text-[11.5px] text-slate-600 leading-snug">{active.manages}</p>
                    </div>
                    <div>
                      <span className="w-10 h-10 rounded-full bg-[#e8f6f4] text-[#0f8a83] flex items-center justify-center">
                        <RouteIcon />
                      </span>
                      <h4 className="mt-2.5 text-[13px] font-bold text-[#0f2333]">{$t("CustomCrmIndustries__t7", "Key Workflow")}</h4>
                      <p className="mt-1 text-[11.5px] text-slate-600 leading-snug">{active.workflow.join(" › ")}</p>
                    </div>
                    <div>
                      <span className="w-10 h-10 rounded-full bg-[#e8f6f4] text-[#0f8a83] flex items-center justify-center">
                        <TargetIcon />
                      </span>
                      <h4 className="mt-2.5 text-[13px] font-bold text-[#0f2333]">{$t("CustomCrmIndustries__t8", "The Result")}</h4>
                      <p className="mt-1 text-2xl font-extrabold text-[#0f8a83] leading-none">
                        {active.stat} <span className="text-base">↗</span>
                      </p>
                      <p className="mt-1 text-[11.5px] text-slate-600 leading-snug">{active.statLabel}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex items-center gap-3">
                    <Link
                      href={active.href}
                      className="inline-flex items-center px-7 py-3 rounded-full bg-[#0f6b6b] hover:bg-[#0f8a83] text-white text-sm font-semibold transition-colors"
                    >
                      {$t("CustomCrmIndustries__t9", "View Case Study")}</Link>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next CRM"
                      className="w-11 h-11 rounded-full border border-slate-300 text-[#0f2333] flex items-center justify-center hover:border-[#0f8a83] hover:text-[#0f8a83] transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ======================= RIGHT: IMAGE ======================= */}
          <div className="relative lg:w-[112%]">
            {/* Handwritten annotation */}
            <div className="hidden sm:block absolute right-[12%] -top-2 z-10 pointer-events-none select-none text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-caveat text-lg sm:text-xl font-bold leading-tight text-[#0f2333]"
                >
                  {active.note[0]}
                  <br />
                  <span className="text-[#0f8a83]">{active.note[1]}</span>
                </motion.div>
              </AnimatePresence>
              <svg className="w-12 h-10 text-[#0f2333] ml-auto -mr-6 mt-0.5" viewBox="0 0 60 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M46 4C34 6 18 14 14 36" />
                <path d="M8 29l6 8 8-6" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, scale: 0.97, x: 24 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={active.image}
                  alt={`${active.title} dashboard`}
                  width={1543}
                  height={1019}
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full h-auto select-none"
                  style={{ filter: "drop-shadow(0 28px 36px rgba(15,35,51,0.16))" }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ======================= INDUSTRY SELECTOR ======================= */}
        <div className="mt-8 lg:mt-4">
          <div className="relative rounded-3xl sm:rounded-full bg-white border border-slate-100 shadow-[0_22px_50px_-22px_rgba(15,35,51,0.28)] px-3 sm:px-5 py-4 flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous CRM"
              className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 text-[#0f2333] flex items-center justify-center hover:border-[#0f8a83] hover:text-[#0f8a83] transition-colors cursor-pointer"
            >
              <Chevron dir="left" />
            </button>

            <div className="flex-1 flex items-center overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {industries.map((item, i) => {
                const isActive = i === index;
                return (
                  <React.Fragment key={item.name}>
                    {i > 0 && (
                      <span aria-hidden className="hidden sm:flex flex-1 min-w-[16px] items-center justify-center gap-1.5 text-slate-300 -mt-6">
                        <span className="w-1 h-1 rounded-full bg-current" />
                        <span className="w-1 h-1 rounded-full bg-current" />
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-pressed={isActive}
                      className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[100px] sm:min-w-[116px] cursor-pointer group"
                    >
                      <span
                        className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "w-16 h-16 bg-[#e8f6f4] ring-2 ring-[#2dd4bf]/50 text-[#0f8a83]"
                            : "w-16 h-16 text-[#0f2333] group-hover:text-[#0f8a83]"
                        }`}
                      >
                        <item.Icon className="w-7 h-7" />
                      </span>
                      <span
                        className={`text-[12.5px] sm:text-[13px] whitespace-nowrap transition-colors ${
                          isActive ? "font-bold text-[#0f8a83]" : "font-medium text-[#0f2333] group-hover:text-[#0f8a83]"
                        }`}
                      >
                        {item.name}
                      </span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next CRM"
              className="flex-shrink-0 w-10 h-10 rounded-full border border-slate-200 text-[#0f2333] flex items-center justify-center hover:border-[#0f8a83] hover:text-[#0f8a83] transition-colors cursor-pointer"
            >
              <Chevron dir="right" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {industries.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${item.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index ? "w-5 bg-[#0f8a83]" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
