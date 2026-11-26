"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";
import { useCmsText } from "@/components/cms/SectionContent";
import { rich } from "@/components/cms/rich";

const NAVY = "#132a43";

const TEAL = "#0d9488";

/** Moved out of app/web-software/website-development/page.tsx so its content can be edited in the CMS (markup unchanged). */
export default function WebsiteDevHero({ slot1 }: { slot1: ReactNode }) {
  const $t = useCmsText();
  return (
    <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 relative z-10">
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column Content */}
        <div className="max-w-xl">
          <h4 className="text-xs lg:text-sm font-bold tracking-[0.15em] uppercase mb-4" style={{ color: TEAL }}>
            {$t("WebsiteDevHero__t1", "WEBSITE DEVELOPMENT SERVICES")}</h4>

          <h1 className="text-h1 font-serif font-extrabold mb-5 tracking-tight">
            <span style={{ color: NAVY }}>{$t("WebsiteDevHero__t2", "We Build Websites")}<br />{$t("WebsiteDevHero__t3", "That Do More.")}</span><br />
            <span style={{ color: TEAL }}>{$t("WebsiteDevHero__t4", "So You Can Grow")}<br />{$t("WebsiteDevHero__t5", "Without Limits.")}</span>
          </h1>

          <p className="text-body text-slate-600 mb-10 max-w-lg font-medium">
            {rich($t("WebsiteDevHero__t6", "Strategy-led websites that attract the right audience, build trust and turn clicks into loyal customers."))}</p>

          <div className="flex flex-wrap items-center gap-6 mb-12">
            <Link
              href={$t("WebsiteDevHero__t7", "/contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition-transform hover:-translate-y-1 shadow-lg shadow-teal-500/30"
              style={{ backgroundColor: TEAL }}
            >
              {$t("WebsiteDevHero__t8", "Start Your Project")}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>

            <Link href={$t("WebsiteDevHero__t9", "/portfolio")} className="inline-flex items-center gap-3 group">
              <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-teal-100 text-teal-600 group-hover:bg-teal-50 transition-colors shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </span>
              <span className="font-bold text-sm" style={{ color: NAVY }}>
                {$t("WebsiteDevHero__t10", "See Our Work")}</span>
            </Link>
          </div>

          {/* Trusted By Section */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-200">
                  <Image src={$t("WebsiteDevHero__t11", "/image1.webp")} alt={$t("WebsiteDevHero__t12", "User")} fill className="object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-teal-50 flex items-center justify-center text-[11px] font-bold text-teal-700 shadow-sm z-10 relative">
                {$t("WebsiteDevHero__t13", "25+")}</div>
            </div>
            <p className="text-caption font-medium text-slate-500">
              {rich($t("WebsiteDevHero__t14", "Trusted by 250+"))}<br />{rich($t("WebsiteDevHero__t15", "businesses worldwide"))}</p>
          </div>
        </div>

        {/* Right Column Visual Composition */}
        <div className="relative w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
          {slot1}
        </div>
      </Container>
    </section>
  );
}
