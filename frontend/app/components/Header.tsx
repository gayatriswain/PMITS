"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Container from "./Container";
import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
  ChatIcon,
  StarIcon,
  BoltIcon,
  ArrowIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
} from "./icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About Us", href: "/about" },
  { label: "Location", href: "/location" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
];

const serviceLinks = [
  { label: "Website Development", href: "/website-development" },
  { label: "App Development", href: "/services/app-development" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "AI SEO", href: "/ai-seo" },
  { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
  { label: "Web Hosting", href: "/services/web-hosting" },
  { label: "Shopify Web Design", href: "/services/shopify-web-design" },
  { label: "Custom Development", href: "/services/custom-development" },
];

const BRAND = "#0b3b35";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="hidden text-white lg:block" style={{ backgroundColor: BRAND }}>
        <Container className="flex items-center justify-between py-2 text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+15551234567" className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
              <PhoneIcon /> (555) 123-4567
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a href="mailto:hello@promanage.com" className="flex items-center gap-1.5 text-white/90 transition-colors hover:text-white">
              <MailIcon /> hello@promanage.com
            </a>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-white/90">
              <PinIcon /> New York, NY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> We&apos;re online now!
            </span>
            <span className="flex items-center gap-1">
              <span className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span className="text-white/90">4.9/5 (200+ reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/90">
              <ClockIcon /> Free 30-min consultation
            </span>
            <Link
              href="/contact"
              className="flex items-center gap-1.5 rounded-full border border-white/30 px-3 py-1 transition-colors hover:bg-white/10"
            >
              <ChatIcon /> Live Chat
            </Link>
          </div>
        </Container>
      </div>

      {/* Main nav */}
      <div className="border-b border-black/5 bg-white">
        <Container className="flex items-center justify-between py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/pmits-text-logo4-2.webp"
              alt="ProManage IT Solutions"
              width={215}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className="flex items-center gap-1 font-sans text-sm font-medium text-zinc-700 transition-colors hover:text-teal-700"
                    aria-expanded={servicesOpen}
                  >
                    {link.label} <ChevronDownIcon className={servicesOpen ? "rotate-180" : ""} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute left-0 top-full w-56 rounded-lg border border-black/5 bg-white py-2 shadow-lg">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-teal-700"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-zinc-700 transition-colors hover:text-teal-700"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/quote"
              className="hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:flex"
              style={{ backgroundColor: BRAND }}
            >
              <BoltIcon /> Get Free Quote <ArrowIcon />
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-zinc-700 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-black/5 bg-white lg:hidden">
          <Container className="py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-left font-sans text-sm font-medium text-zinc-700"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                  >
                    {link.label}
                    <ChevronDownIcon className={mobileServicesOpen ? "rotate-180" : ""} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="ml-3 flex flex-col border-l border-black/10 pl-3">
                      {serviceLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="rounded-lg px-2 py-2 text-sm text-zinc-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-zinc-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3 text-sm text-zinc-600">
              <a href="tel:+15551234567" className="flex items-center gap-2">
                <PhoneIcon /> (555) 123-4567
              </a>
              <a href="mailto:hello@promanage.com" className="flex items-center gap-2">
                <MailIcon /> hello@promanage.com
              </a>
            </div>

            <Link
              href="/quote"
              className="mt-3 flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND }}
              onClick={() => setMobileOpen(false)}
            >
              <BoltIcon /> Get Free Quote
            </Link>
          </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
