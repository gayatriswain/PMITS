import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  StarIcon,
  ArrowIcon,
  ChevronRightIcon,
  SendIcon,
  UsersIcon,
  TrendingUpIcon,
  HeartIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "./icons";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DARK_BG = "#0a1f33";
const DARK_CARD = "#0d2b46";

// every page on the site, grouped; "Industries" has no pages of its own yet, so its entries aren't links
const linkColumns: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/website-development" },
      { label: "App Development", href: "/services/app-development" },
      { label: "Custom Development", href: "/services/custom-development" },
      { label: "Shopify Web Design", href: "/services/shopify-web-design" },
      { label: "WooCommerce Developers", href: "/services/hire-woocommerce-developers" },
      { label: "Core PHP Developers", href: "/services/hire-core-php-developers" },
      { label: "CakePHP Developers", href: "/services/hire-cakephp-developers" },
      { label: "ASP.NET Developers", href: "/services/hire-aspnet-developers" },
      { label: "Shopify Developers", href: "/services/hire-shopify-developers" },
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "Google Ads", href: "/services/google-ads" },
      { label: "Animation & Graphic Design", href: "/services/animation-and-graphic-design" },
      { label: "Custom AR/VR Solution", href: "/services/custom-ar-vr-solution" },
    ],
  },
  {
    title: "SEO & Hosting",
    links: [
      { label: "SEO Services", href: "/seo" },
      { label: "AI SEO", href: "/ai-seo" },
      { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
      { label: "Hosting", href: "/hosting" },
      { label: "Web Hosting", href: "/services/web-hosting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Careers", href: "/career" },
      { label: "Location", href: "/location" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Industries",
    links: [
      "Real Estate",
      "Education",
      "Healthcare",
      "Manufacturing",
      "IT & Technology",
      "Retail & E-commerce",
      "Hospitality",
      "Startups & SMEs",
    ].map((label) => ({ label })),
  },
];

const stats = [
  { icon: UsersIcon, value: "500+", label: "Businesses Trusted" },
  { icon: StarIcon, value: "10+", label: "Years of Excellence" },
  { icon: TrendingUpIcon, value: "98%", label: "Client Satisfaction Rate" },
];

const clientLogos: { name: string; mark: "shield" | "wave" | "diamond" | "badge" | "text" }[] = [
  { name: "MAX Healthcare", mark: "shield" },
  { name: "AMAANAT HOSPITAL", mark: "text" },
  { name: "the better india", mark: "wave" },
  { name: "HomeLane", mark: "diamond" },
  { name: "tynor", mark: "wave" },
  { name: "policybazaar", mark: "badge" },
  { name: "GAURS", mark: "text" },
];

function ClientMark({ mark }: { mark: "shield" | "wave" | "diamond" | "badge" | "text" }) {
  if (mark === "text") return null;
  if (mark === "shield") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" />
      </svg>
    );
  }
  if (mark === "diamond") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 22 12 12 22 2 12Z" />
      </svg>
    );
  }
  if (mark === "badge") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="9" r="6" />
        <path d="m9 14-2 7 5-3 5 3-2-7" />
      </svg>
    );
  }
  return (
    <svg width="16" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 8c2-6 4-6 6 0s4 6 6 0 4-6 6 0 4 6 4 0" />
    </svg>
  );
}

const socialLinks = [
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

function ContactRow({
  icon: Icon,
  children,
  align = "center",
}: {
  icon: React.ComponentType;
  children: React.ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div className={`flex gap-3 text-sm text-slate-600 ${align === "start" ? "items-start" : "items-center"}`}>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ backgroundColor: "#e6f6f4", color: TEAL }}
      >
        <Icon />
      </span>
      <span className={align === "start" ? "pt-1.5" : ""}>{children}</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <Container className="pb-24 pt-16">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-[1.05fr_2.75fr_1fr]">
          {/* Brand column */}
          <div className="relative">
            {/* decorative dotted grid */}
            <div
              className="pointer-events-none absolute -right-8 top-0 hidden h-20 w-20 opacity-40 md:block"
              style={{
                backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1px)`,
                backgroundSize: "10px 10px",
              }}
            />

            <Link href="/" className="inline-block">
              <Image
                src="/pmits-text-logo4-2.webp"
                alt="ProManage IT Solutions"
                width={315}
                height={80}
                className="h-12 w-auto"
              />
            </Link>

            <h3 className="mt-6 text-xl font-semibold leading-snug" style={{ color: NAVY }}>
              Building Digital Experiences.
              <br />
              <span style={{ color: TEAL }}>Driving Real Growth.</span>
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
              We help businesses in India and beyond build powerful digital presence, attract more customers and
              achieve measurable results that last.
            </p>

            <div className="mt-6 h-px w-12" style={{ backgroundColor: TEAL }} />

            <div className="mt-6 flex flex-col gap-2">
              <ContactRow icon={PhoneIcon}>+91 99999 88888</ContactRow>
              <ContactRow icon={MailIcon}>hello@promanage.com</ContactRow>
              <ContactRow icon={PinIcon} align="start">
                Sector 62, Noida, Uttar Pradesh 201309, India
              </ContactRow>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">FOLLOW US</p>
              <div className="mt-3 flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-teal-600 hover:text-teal-600"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
            {linkColumns.map((col) => (
              <div key={col.title}>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: TEAL }} />
                  <h4 className="text-xs font-bold tracking-[0.15em]" style={{ color: NAVY }}>
                    {col.title.toUpperCase()}
                  </h4>
                </div>
                <div className="mt-1 h-px w-5" style={{ backgroundColor: TEAL }} />
                <ul className="mt-4 flex flex-col gap-6">
                  {col.links.map(({ label, href }) => (
                    <li key={label}>
                      {href ? (
                        <Link
                          href={href}
                          className="flex items-center gap-1 text-sm text-slate-600 transition-colors hover:text-teal-700"
                        >
                          <ChevronRightIcon />
                          {label}
                        </Link>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-slate-600">
                          <ChevronRightIcon />
                          {label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA card */}
          <div className="h-full">
            <div
              className="relative flex  flex-col overflow-hidden rounded-2xl p-6 shadow-sm"
              style={{ background: "linear-gradient(160deg, #eafbf8 0%, #f4fbfa 60%, #ffffff 100%)" }}
            >
              {/* decorative dotted grid */}
              <div
                className="pointer-events-none absolute -right-6 -top-2 h-24 w-24 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1px)`,
                  backgroundSize: "10px 10px",
                }}
              />

              {/* decorative radiating rings behind the icon */}
              <svg
                className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-teal-500/20"
                viewBox="0 0 200 200"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="70" cy="70" r="30" stroke="currentColor" />
                <circle cx="70" cy="70" r="50" stroke="currentColor" opacity="0.7" />
                <circle cx="70" cy="70" r="70" stroke="currentColor" opacity="0.45" />
                <circle cx="70" cy="70" r="90" stroke="currentColor" opacity="0.25" />
              </svg>

              <span
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: TEAL }}
              >
                <SendIcon />
              </span>
              <h4 className="relative z-10 mt-6 text-xl font-semibold leading-snug" style={{ color: NAVY }}>
                Let&apos;s Grow Your Business Together
              </h4>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-600">
                Get expert strategies and digital solutions tailored to your business goals.
              </p>
              <Link
                href="/contact"
                className="relative z-10 mt-6 flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Get a Free Consultation <ArrowIcon />
              </Link>

              <div className="flex-1" />

              <div className="relative z-10 mt-6 border-t border-teal-100 pt-5">
                <p className="text-xs font-medium text-slate-500">Google Rating</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-3xl font-bold" style={{ color: NAVY }}>
                    4.8
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">(120+ Reviews)</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Dark section: stats card sits absolute at its top edge, pulled up so it straddles the boundary above */}
      <div className="relative" style={{ backgroundColor: DARK_BG }}>
        <div className="absolute inset-x-0 top-0 z-10 -translate-y-16">
          <Container>
            <div
              className="flex flex-col gap-8 rounded-2xl border border-white/10 p-8 shadow-xl lg:flex-row lg:items-center lg:justify-between"
              style={{ backgroundColor: DARK_CARD }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: "rgba(20,184,166,0.4)", color: TEAL, backgroundColor: "rgba(20,184,166,0.08)" }}
                    >
                      <stat.icon />
                    </span>
                    <div>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-300">{stat.label}</p>
                    </div>
                    {i < stats.length - 1 && <span className="ml-2 hidden h-10 w-px bg-white/10 sm:block" />}
                  </div>
                ))}
              </div>

              <div className="hidden h-12 w-px bg-white/10 lg:block" />

              <div>
                <p className="text-xs font-semibold tracking-[0.1em] text-slate-300">
                  TRUSTED BY 500+ BUSINESSES ACROSS <span style={{ color: TEAL }}>INDIA &amp; NCR</span>
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                  {clientLogos.map(({ name, mark }) => (
                    <span key={name} className="flex items-center gap-1.5 text-sm font-bold text-slate-300/90">
                      <span style={{ color: TEAL }}>
                        <ClientMark mark={mark} />
                      </span>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Copyright bar */}
        <Container className="pb-8 pt-[460px] sm:pt-48 lg:pt-32">
          {/* decorative dots + waves + icon */}
          <div className="relative flex items-center justify-center">
            <div
              className="hidden h-16 flex-1 opacity-30 md:block"
              style={{
                backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1px)`,
                backgroundSize: "14px 14px",
                maskImage: "linear-gradient(to right, transparent, black 40%, black 60%, transparent)",
              }}
            />

            <div className="relative flex h-16 w-full max-w-md shrink-0 items-center justify-center md:w-[420px]">
              <svg
                className="absolute inset-0 h-full w-full text-teal-500/25"
                viewBox="0 0 420 64"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <circle cx="210" cy="32" r="20" stroke="currentColor" />
                <circle cx="210" cy="32" r="30" stroke="currentColor" opacity="0.5" />
                <path d="M0 20c60-16 110 32 170 16" stroke="currentColor" />
                <path d="M0 46c60 14 110-30 170-14" stroke="currentColor" opacity="0.6" />
                <path d="M420 20c-60-16-110 32-170 16" stroke="currentColor" />
                <path d="M420 46c-60 14-110-30-170-14" stroke="currentColor" opacity="0.6" />
              </svg>
              <span
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-xl font-bold"
                style={{ borderColor: "rgba(20,184,166,0.4)", color: TEAL, backgroundColor: "rgba(20,184,166,0.1)" }}
              >
                &lt;&gt;
              </span>
              <div
                className="pointer-events-none absolute bottom-0 h-2 w-32 rounded-full blur-lg"
                style={{ backgroundColor: "rgba(20,184,166,0.55)" }}
              />
            </div>

            <div
              className="hidden h-16 flex-1 opacity-30 md:block"
              style={{
                backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1px)`,
                backgroundSize: "14px 14px",
                maskImage: "linear-gradient(to left, transparent, black 40%, black 60%, transparent)",
              }}
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4 text-xs text-slate-400 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
              <span>© 2024 ProManage. All rights reserved.</span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-3">
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
                <span>|</span>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
                <span>|</span>
                <Link href="/refund" className="hover:text-white">
                  Refund Policy
                </Link>
              </span>
            </div>

            <span className="flex items-center gap-1.5">
              Made with <HeartIcon /> in Noida
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
