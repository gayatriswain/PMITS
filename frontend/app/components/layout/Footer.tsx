import Link from "next/link";
import Image from "next/image";
import Container from "../shared/Container";
import { getCmsPage, getNavigation, getSettings } from "@/lib/cms";
import { clientLogos } from "../shared/TrustedBar";
import { socialIcon, socialLabel } from "../shared/socialIcons";
import { GLOBAL_PATH } from "@/components/cms/global-sections.data";
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
} from "../shared/icons";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DARK_BG = "#0a1f33";
const DARK_CARD = "#0d2b46";

// every page on the site, grouped; "Industries" has no pages of its own yet, so its entries aren't links
/** Built-in columns, used only when the CMS is unreachable (live columns: Admin → Navigation → footer). */
const linkColumns: { title: string; links: { label: string; href?: string }[] }[] = [
  {
    title: "Web & App",
    links: [
      { label: "Website Development", href: "/web-software/website-development" },
      { label: "App Development", href: "/web-software/app-development" },
      { label: "Custom Development", href: "/web-software/custom-development" },
      { label: "Custom CRM Solution", href: "/web-software/custom-crm-solution" },
      { label: "Shopify Web Design", href: "/web-software/shopify-web-design" },
      { label: "Web Hosting", href: "/web-software/web-hosting" },
    ],
  },
  {
    title: "Development",
    links: [
      { label: "WooCommerce Developers", href: "/hire-developer/hire-woocommerce-developers" },
      { label: "Core PHP Developers", href: "/hire-developer/hire-core-php-developers" },
      { label: "CakePHP Developers", href: "/hire-developer/hire-cakephp-developers" },
      { label: "ASP.NET Developers", href: "/hire-developer/hire-aspnet-developers" },
      { label: "Shopify Developers", href: "/hire-developer/hire-shopify-developers" },
      { label: "Magento Developers", href: "/hire-developer/hire-magento-developers" },
      { label: "BigCommerce Developers", href: "/hire-developer/hire-bigcommerce-developers" },
    ],
  },
  {
    title: "SEO",
    links: [
      { label: "SEO Services", href: "/seo" },
      { label: "AI SEO", href: "/marketing-growth/ai-seo" },
      { label: "E-commerce SEO", href: "/marketing-growth/ecommerce-seo" },
      { label: "Local SEO", href: "/marketing-growth/local-seo" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Why Choose Us", href: "/why-choose-us" },
      { label: "Careers", href: "/career" },
      { label: "Location", href: "/location" },
      { label: "Blog", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const stats = [
  { icon: UsersIcon, value: "500+", label: "Businesses Trusted" },
  { icon: StarIcon, value: "10+", label: "Years of Excellence" },
  { icon: TrendingUpIcon, value: "98%", label: "Client Satisfaction Rate" },
];



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

/** Columns, contact details and footer copy come from the CMS (Navigation "footer" + Settings). */
export default async function Footer() {
  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ];
  const [nav, settings, globalPage, ...legalPages] = await Promise.all([getNavigation("footer"), getSettings(), getCmsPage(GLOBAL_PATH), ...legalLinks.map((l) => getCmsPage(l.href))]);
  // A legal link shows only once that page is published in the CMS (Admin → Pages), so it never leads to a 404.
  const legal = legalLinks.map((l, i) => ({ ...l, label: legalPages[i]?.title || l.label })).filter((_, i) => legalPages[i]);
  const columns = nav?.items?.length
    ? nav.items.map((c) => ({ title: c.label, links: (c.children ?? []).map((l) => ({ label: l.label, href: l.href || undefined })) }))
    : linkColumns;
  const f = settings?.footer ?? {};
  // Settings → Social: any number of platforms; older sites still have the fixed four-field version
  const socials = settings?.socialLinks?.some((l) => l.url)
    ? settings.socialLinks.filter((l) => l.url).map((l) => ({ icon: socialIcon(l.platform), href: l.url!, label: socialLabel(l.platform, l.label) }))
    : settings?.socials
      ? socialLinks.map((sl) => ({ ...sl, href: settings.socials?.[sl.label.toLowerCase()] || "" })).filter((sl) => sl.href)
      : socialLinks;
  const statIcons = [UsersIcon, StarIcon, TrendingUpIcon];
  const statList = f.stats?.filter((s) => s.value || s.label).length
    ? f.stats.filter((s) => s.value || s.label).slice(0, 3).map((s, i) => ({ icon: statIcons[i], value: s.value ?? "", label: s.label ?? "" }))
    : stats;
  // Client logos are edited once in Admin → Global → Client logos slider (older sites: Settings → Client logos)
  const globalLogos = (globalPage?.sections.find((x) => x.key === "trusted-bar")?.content?.logos as { name?: string; image?: string }[] | undefined) ?? [];
  const logoSource = globalLogos.some((l) => l.image) ? globalLogos : settings?.clientLogos ?? [];
  const logos = logoSource.filter((l) => l.image).length
    ? logoSource.filter((l) => l.image).map((l) => {
        const known = clientLogos.find((k) => k.src === l.image);
        return known ? { ...known, name: l.name || known.name } : { name: l.name || "Client", src: l.image!, w: 150, h: 44, tall: false };
      })
    : clientLogos;
  const phone = settings?.contactPhone || "+91 99999 88888";
  const email = settings?.contactEmail || "hello@promanage.com";
  const address = settings?.address || "Sector 62, Noida, Uttar Pradesh 201309, India";
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
                src={settings?.footerLogo || "/pmits-text-logo4-2.webp"}
                alt="ProManage IT Solutions"
                width={315}
                height={80}
                className="h-12 w-auto"
              />
            </Link>

            <h3 className="text-h6 mt-6 font-semibold" style={{ color: NAVY }}>
              {f.headline || "Building Digital Experiences."}
              <br />
              <span style={{ color: TEAL }}>{f.accent || "Driving Real Growth."}</span>
            </h3>

            <p className="text-small mt-4 max-w-xs text-slate-600">
              {f.description ||
                "We help businesses in India and beyond build powerful digital presence, attract more customers and achieve measurable results that last."}
            </p>

            <div className="mt-6 h-px w-12" style={{ backgroundColor: TEAL }} />

            <div className="mt-6 flex flex-col gap-2">
              <ContactRow icon={PhoneIcon}><a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-teal-700">{phone}</a></ContactRow>
              <ContactRow icon={MailIcon}><a href={`mailto:${email}`} className="break-all transition-colors hover:text-teal-700">{email}</a></ContactRow>
              <ContactRow icon={PinIcon} align="start">
                {address}
              </ContactRow>
            </div>

            <div className="mt-8">
              <p className="text-caption font-semibold tracking-[0.2em] text-slate-500">FOLLOW US</p>
              <div className="mt-3 flex items-center gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
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
            {columns.map((col) => (
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
              <h4 className="text-h6 relative z-10 mt-6 font-semibold" style={{ color: NAVY }}>
                {f.ctaTitle || "Let's Grow Your Business Together"}
              </h4>
              <p className="text-small relative z-10 mt-3 text-slate-600">
                {f.ctaText || "Get expert strategies and digital solutions tailored to your business goals."}
              </p>
              <Link
                href={f.ctaHref || "/contact"}
                className="relative z-10 mt-6 flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                {f.ctaLabel || "Get a Free Consultation"} <ArrowIcon />
              </Link>

              <div className="flex-1" />

              <div className="relative z-10 mt-6 border-t border-teal-100 pt-5">
                <p className="text-caption font-medium text-slate-500">Google Rating</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-3xl font-bold" style={{ color: NAVY }}>
                    {f.googleRating || "4.8"}
                  </span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </span>
                </div>
                <p className="text-caption mt-1 text-slate-500">{f.reviewsText || "(120+ Reviews)"}</p>
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
                {statList.map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
                      style={{ borderColor: "rgba(20,184,166,0.4)", color: TEAL, backgroundColor: "rgba(20,184,166,0.08)" }}
                    >
                      <stat.icon />
                    </span>
                    <div>
                      <p className="text-body font-bold text-white">{stat.value}</p>
                      <p className="text-caption text-slate-300">{stat.label}</p>
                    </div>
                    {i < statList.length - 1 && <span className="ml-2 hidden h-10 w-px bg-white/10 sm:block" />}
                  </div>
                ))}
              </div>

              <div className="hidden h-12 w-px bg-white/10 lg:block" />

              <div className="min-w-0 flex-1">
                <p className="text-caption font-semibold tracking-[0.1em] text-slate-300">
                  {f.trustedText ?? "TRUSTED BY 500+ BUSINESSES ACROSS"}{" "}
                  <span style={{ color: TEAL }}>{f.trustedAccent ?? "INDIA & NCR"}</span>
                </p>
                {/* Same client logos and infinite marquee as the TrustedBar, shown in white on the dark band */}
                <div
                  className="relative mt-4 w-full min-w-0 overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
                    WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
                  }}
                >
                  <div className="animate-ticker-x flex w-max motion-reduce:animate-none" style={{ animationDuration: "32s" }}>
                    {[0, 1].map((copy) => (
                      <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
                        {logos.map((logo, li) => (
                          <li key={`${li}-${logo.name}`} className="shrink-0 pr-3">
                            <span className="flex h-14 w-[150px] items-center justify-center rounded-xl bg-white px-4 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.5)]">
                              <Image
                                src={logo.src}
                                alt={copy === 1 ? "" : logo.name}
                                width={logo.w}
                                height={logo.h}
                                unoptimized={/^https?:/.test(logo.src)}
                                className={`w-auto max-w-full transition duration-300 hover:scale-105 ${logo.tall ? "h-11" : "h-8"}`}
                              />
                            </span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
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
              <span>{f.copyright || "© 2024 ProManage. All rights reserved."}</span>
              {legal.length > 0 && (
                <>
                  <span className="hidden sm:inline">|</span>
                  <span className="flex items-center gap-3">
                    {legal.map((l, i) => (
                      <span key={l.href} className="flex items-center gap-3">
                        {i > 0 && <span>|</span>}
                        <Link href={l.href} className="hover:text-white">
                          {l.label}
                        </Link>
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>

            <span className="flex items-center gap-1.5">
              Made with <HeartIcon /> in {f.madeIn || "Noida"}
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
