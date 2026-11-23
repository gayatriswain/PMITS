"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../shared/Container";
import { ServicesMegaPanel, ServicesMobileList } from "./ServicesMegaMenu";
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
} from "../shared/icons";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", dropdown: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Location", href: "/location" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
];

const BRAND = "#0b3b35";

export default function Header() {
  const pathname = usePathname();
  // "open" is stored as the path it was opened on, so navigating anywhere closes both menus without an effect
  const [mobileOpenAt, setMobileOpenAt] = useState<string | null>(null);
  const [servicesOpenAt, setServicesOpenAt] = useState<string | null>(null);
  const mobileOpen = mobileOpenAt === pathname;
  const servicesOpen = servicesOpenAt === pathname;
  const setMobileOpen = useCallback((open: boolean) => setMobileOpenAt(open ? pathname : null), [pathname]);
  const setServicesOpen = useCallback((open: boolean) => setServicesOpenAt(open ? pathname : null), [pathname]);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // hover intent: a short delay stops the panel flickering while the pointer travels from the trigger to the panel
  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }, [setServicesOpen]);
  const closeMega = useCallback(
    (delay = 140) => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => setServicesOpen(false), delay);
    },
    [setServicesOpen],
  );
  const closeAll = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(false);
    setMobileOpen(false);
  }, [setServicesOpen, setMobileOpen]);

  // Escape closes the panel
  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [servicesOpen, mobileOpen, closeAll]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* soft backdrop while the services panel is open */}
      <AnimatePresence>
        {servicesOpen && (
          <motion.div
            key="mega-backdrop"
            aria-hidden
            className="pointer-events-none fixed inset-0 -z-10 hidden bg-slate-900/15 backdrop-blur-[2px] lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

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
      <div className="relative border-b border-black/5 bg-white">
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
                  onMouseEnter={openMega}
                  onMouseLeave={() => closeMega()}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMega(0);
                  }}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 font-sans text-sm font-medium transition-colors hover:text-teal-700 ${
                      servicesOpen ? "text-teal-700" : "text-zinc-700"
                    }`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    aria-controls="services-mega"
                    onClick={() => (servicesOpen ? closeAll() : openMega())}
                  >
                    {link.label} <ChevronDownIcon className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* panel is as wide as its content and centred under the nav row (the top padding bridges the hover gap) */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        id="services-mega"
                        key="mega"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-50 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-2"
                      >
                        <div className="rounded-2xl border border-black/5 bg-white shadow-[0_30px_60px_-24px_rgba(11,59,53,0.4)]">
                          <ServicesMegaPanel pathname={pathname} onNavigate={closeAll} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              onClick={() => setMobileOpen(!mobileOpen)}
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
        <div className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-black/5 bg-white lg:hidden">
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
                    <ChevronDownIcon className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        key="m-services"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ServicesMobileList pathname={pathname} onNavigate={closeAll} />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
