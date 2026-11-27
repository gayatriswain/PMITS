"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, Bell, Box, ChevronRight, CreditCard, LayoutTemplate, Megaphone, Play, Puzzle, Search, type LucideIcon } from "lucide-react";
import Container from "../shared/Container";
import { useCmsData, useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const INK = "#0b1220";
const GREEN = "#0f7a4e";
const TEAL = "#139b8c";
const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: LucideIcon[] = [Box, Search, Megaphone, BarChart3, LayoutTemplate, Bell, Puzzle, CreditCard];

const items__cms = [
  { title: "Multipurpose Shopify Apps", text: "A multipurpose application for your business to perform various functions inside Shopify." },
  { title: "SEO Optimized Solutions", text: "A totally customized solution for search engine optimization of your store on Shopify." },
  { title: "Campaign Management", text: "Running your campaigns for PPC and Adwords." },
  { title: "High-Converting Landing Pages", text: "Landing pages to divert traffic to your Shopify store." },
  { title: "Ready-to-Use Templates", text: "Readymade templates that you can improve on your own without hiring a graphic designer." },
  { title: "Smart Alerts & Notifications", text: "Alerts for notifications and emails." },
  { title: "Essential Plugin Integration", text: "Important plugins that can be easily integrated with your store on Shopify." },
  { title: "Secure Payment Setup", text: "Payment processing system on Shopify where you can take payments made through PayPal, credit and debit cards, and net banking." },
];

/** "What Can You Expect From Our Shopify Developers" - eight deliverables next to a store mock-up. */
export default function HireShopifyExpect() {
  const $t = useCmsText();
  const items = useCmsData("HireShopifyExpect__items", items__cms);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f7fbf9_0%,#f2f8f6_100%)] py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }}>
            <p className="flex items-center gap-4 text-[13px] font-medium uppercase tracking-[0.22em]" style={{ color: TEAL }}>
              <i aria-hidden className="h-px w-10 bg-current" />
              {html($t("HireShopifyExpect__t1", "More than just development"))}
              <i aria-hidden className="h-px w-10 bg-current" />
            </p>
            <h2 className="text-h2 font-heading mt-5 font-extrabold leading-[1.08] tracking-[-0.02em]" style={{ color: INK }}>{rich($t("HireShopifyExpect__t2m", "<span class=\"block\">What Can You Expect From</span><span class=\"block bg-[linear-gradient(90deg,#0f7a6e,#18a99a)] bg-clip-text text-transparent\">Our Shopify Developers</span>"))}</h2>
            <p className="text-small mt-5 leading-relaxed text-slate-600">
              {rich($t("HireShopifyExpect__t4", "Shopify is a very popular Canadian ecommerce platform. Anyone can use this platform to set up shop on the web and start selling his products and services. Shopify provides more value for money than Amazon and more and more businesses are getting attracted to it. You are most welcome if you have come here in search of a qualified and experienced Shopify developer. We are Promanage IT Solution, the most popular and much loved Shopify development company. Our Shopify solutions have helped many clients and their businesses have become success stories on this ecommerce platform."))}
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {items.map((it, i) => {
                const Icon = ICONS[i % ICONS.length];
                return (
                  <motion.li
                    key={i}
                    className="group flex items-start gap-3.5 rounded-2xl border border-white bg-white/80 p-3.5 shadow-[0_10px_28px_-22px_rgba(11,18,32,0.4)] transition-shadow hover:shadow-[0_16px_34px_-20px_rgba(15,122,78,0.35)]"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e6f5ef] transition-colors group-hover:bg-[#d4efe4]">
                      <Icon className="h-6 w-6" style={{ color: GREEN }} strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-bold leading-snug" style={{ color: INK }}>{it.title}</span>
                      <span className="mt-1 block text-[12.5px] leading-snug text-slate-600">{it.text}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                href={$t("HireShopifyExpect__t5", "#contact")}
                className="inline-flex items-center gap-3 rounded-full bg-[linear-gradient(90deg,#0f7a4e,#139b6b)] px-8 py-4 text-[16px] font-semibold text-white shadow-[0_14px_28px_-14px_rgba(15,122,78,0.8)] transition-transform hover:-translate-y-0.5"
              >
                {$t("HireShopifyExpect__t6", "Get My Free Proposal")}
                <ChevronRight className="h-5 w-5" />
              </Link>
              <Link href={$t("HireShopifyExpect__t7", "/contact")} className="group flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-md transition-transform group-hover:scale-105"><Play className="h-4 w-4 fill-current" style={{ color: INK }} /></span>
                <span className="border-b-2 border-[#139b8c]/60 pb-0.5 text-[15px] font-medium" style={{ color: INK }}>{html($t("HireShopifyExpect__t8", "Talk to Our Shopify Experts"))}</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <Image
                src={$t("HireShopifyExpect__t9", "/hire-shopify/expect-store.webp")}
                alt={$t("HireShopifyExpect__t10", "Shopify store on a laptop with a sales chart and the Shopify logo")}
                width={713}
                height={870}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="edge-fade ml-auto h-auto w-full max-w-[620px] select-none mix-blend-multiply"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
