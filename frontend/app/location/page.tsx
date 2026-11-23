import Image from "next/image";
import Link from "next/link";
import Container from "../components/shared/Container";
import TrustedBar from "../components/shared/TrustedBar";
import IndustriesWeEmpower from "../components/location/IndustriesWeEmpower";
import RecentSuccessStories from "../components/location/RecentSuccessStories";
import WhyChooseUs from "../components/shared/WhyChooseUs";
import ClientStories from "../components/shared/ClientStories";
import FAQSection from "../components/shared/FAQSection";
import CtaSection from "../components/shared/CtaSection";
import {
  ArrowIcon,
  BriefcaseIcon,
  BuildingIcon,
  CartIcon,
  CheckIcon,
  ChevronDownIcon,
  ClockIcon,
  GearIcon,
  GridIcon,
  LockIcon,
  MailIcon,
  PencilIcon,
  PinIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  StarIcon,
  TrophyIcon,
  UserIcon,
  UsersIcon,
} from "../components/shared/icons";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DARK = "#0b3b35";
const ACCENT = "#ff6321";

const trustPoints = [
  { title: "Result Driven", sub: "Focused on measurable growth & ROI" },
  { title: "Transparent Process", sub: "Clear communication, no hidden surprises" },
  { title: "Growth Focused", sub: "Strategies that scale your business" },
];

const statHighlights = [
  { icon: GridIcon, value: "250+", label: "Projects Delivered" },
  { icon: ShieldCheckIcon, value: "10+", label: "Years of Excellence" },
  { icon: UsersIcon, value: "500+", label: "Happy Clients" },
];

const digitalServiceHighlights = [
  { icon: PinIcon, title: "Local Focus", desc: "Deep understanding of Noida market & customer behavior." },
  { icon: UsersIcon, title: "Business Growth", desc: "Solutions designed to generate leads, sales & growth." },
  { icon: TrophyIcon, title: "Proven Results", desc: "Transparent work. Measurable results. Long-term impact." },
];

const wpChecklist = [
  "Custom WordPress Website Design",
  "Theme Customization & Development",
  "Plugin Development & Integration",
  "WooCommerce Development",
  "Website Migration to WordPress",
  "Speed Optimization & Performance",
  "Security, Maintenance & Support",
];

const wpServiceCards = [
  {
    icon: SearchIcon,
    number: "01",
    title: "SEO Services",
    desc: "Rank higher on Google and attract the right customers in Noida.",
    cta: "Explore SEO",
    href: "/services/seo",
  },
  {
    icon: CartIcon,
    number: "02",
    title: "E-commerce Development",
    desc: "Build online stores that convert visitors into paying customers.",
    cta: "Explore E-commerce",
    href: "/services/ecommerce",
  },
  {
    icon: PencilIcon,
    number: "03",
    title: "Website Design",
    desc: "Beautiful, responsive and conversion-focused websites for businesses.",
    cta: "Explore Design",
    href: "/services/web-development",
  },
  {
    icon: GearIcon,
    number: "04",
    title: "Website Maintenance",
    desc: "Keep your website secure, updated and performing at its best.",
    cta: "Explore Maintenance",
    href: "/services/maintenance",
  },
];

const noidaLocations = [
  { name: "Sector 62", sub: "Noida" },
  { name: "Sector 18", sub: "Noida" },
  { name: "Sector 126", sub: "Noida" },
  { name: "Greater Noida", sub: "West" },
  { name: "Noida Extension", sub: "NCR" },
];

export default function LocationPage() {
  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden">
        <Container className="grid grid-cols-1 gap-14 py-16 lg:grid-cols-[0.82fr_1.25fr] lg:items-center lg:gap-8 lg:py-20">
          {/* Left column: copy */}
          <div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide"
              style={{ borderColor: "rgba(13,148,136,0.3)", color: TEAL, backgroundColor: "#e6f6f4" }}
            >
              <PinIcon /> NOIDA, NCR
            </span>

            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.15] sm:text-5xl" style={{ color: NAVY }}>
              Your Local
              <br />
              <span style={{ color: TEAL }}>Digital</span> Growth
              <br />
              Partner in Noida.
              <span
                className="ml-1 inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: ACCENT }}
              />
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              We build strategic websites, powerful SEO and complete digital solutions that help
              Noida businesses attract more customers and grow faster.
            </p>

            <div className="mt-6 flex flex-wrap items-start gap-4">
              {trustPoints.map((t) => (
                <div key={t.title} className="flex max-w-[145px] items-start gap-1.5">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                  >
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold" style={{ color: NAVY }}>
                      {t.title}
                    </p>
                    <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{t.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: DARK }}
              >
                Get Free Consultation <ArrowIcon />
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-1.5 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  <PlayIcon />
                </span>
                View Our Work
              </Link>
            </div>
          </div>

          {/* Portrait image with the consultation form layered in front of it (image height matches form height, 20px overlap) */}
          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:-ml-14 lg:flex lg:w-[calc(100%+3.5rem)] lg:max-w-none lg:items-stretch">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] lg:aspect-auto lg:w-auto lg:flex-1">
              <Image
                src="/about-us-main.png"
                alt="The ProManage team helping a Noida business grow"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 420px, 90vw"
              />
            </div>

            {/* Consultation form (same fields as the homepage form) */}
            <div className="relative z-10 mx-auto mt-8 w-full max-w-[360px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 lg:mt-0 lg:-ml-5 lg:w-[350px]">
              {/* Header band */}
              <div className="px-6 pb-10 pt-7" style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})` }}>
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>
                  Let&apos;s Talk
                </p>
                <h3 className="mt-2 text-2xl font-bold leading-snug text-white">Get a Free Consultation</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Share your details and our experts will get back to you shortly.
                </p>
              </div>

              {/* Card body overlapping the header */}
              <div className="relative -mt-6 rounded-t-3xl bg-white px-6 pb-6 pt-6">
                <form className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">
                    <UserIcon className="text-teal-600" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">
                    <MailIcon />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500">
                    <BriefcaseIcon />
                    <span className="flex-1 text-slate-400">What do you need help with?</span>
                    <ChevronDownIcon />
                  </label>

                  <button
                    type="submit"
                    className="mt-1 flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: DARK }}
                  >
                    Get Free Consultation <ArrowIcon />
                  </button>
                </form>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <LockIcon className="h-3.5 w-3.5 text-slate-400" /> Your information is safe with us.
                </p>

                <div
                  className="mt-4 flex items-center justify-between rounded-2xl px-4 py-3"
                  style={{ backgroundColor: "#e6f6f4" }}
                >
                  <div>
                    <p className="text-[11px] text-slate-500">Get a response within</p>
                    <p className="text-sm font-bold" style={{ color: TEAL }}>
                      24 Hours
                    </p>
                  </div>
                  <span style={{ color: TEAL }}>
                    <ClockIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust bar: ratings + key stats, spans the full width at the bottom of the hero */}
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 rounded-3xl bg-white px-6 py-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] ring-1 ring-slate-100 sm:px-8">
              <div className="flex items-center gap-2">
                <Image src="/Google_2015_logo.svg.webp" alt="Google" width={120} height={41} className="h-5 w-auto" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold" style={{ color: NAVY }}>
                      4.9
                    </span>
                    <span className="flex items-center gap-0.5 text-amber-400">
                      <StarIcon />
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">120+ Reviews</p>
                </div>
              </div>

              <span className="hidden h-10 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-2">
                <Image src="/clutch.png" alt="Clutch" width={779} height={256} className="h-6 w-auto" />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold" style={{ color: NAVY }}>
                      4.8
                    </span>
                    <span className="flex items-center gap-0.5 text-red-500">
                      <StarIcon />
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">50+ Reviews</p>
                </div>
              </div>

              {statHighlights.map((s) => (
                <div key={s.label} className="contents">
                  <span className="hidden h-10 w-px bg-slate-200 sm:block" />
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                    >
                      <s.icon />
                    </span>
                    <div>
                      <p className="text-sm font-bold" style={{ color: NAVY }}>
                        {s.value}
                      </p>
                      <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Client logos strip + digital services intro */}
      <section className="py-12 md:py-16">
        <Container>
        <div className="mx-auto lg:w-[90%]">
          <TrustedBar />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                style={{ color: TEAL }}
              >
                <span className="h-px w-5" style={{ backgroundColor: TEAL }} />
                Our Digital Services in Noida
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl" style={{ color: NAVY }}>
                Digital Solutions
                <br />
                That Drive Growth <span style={{ color: TEAL }}>in Noida</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
                From WordPress development to powerful SEO strategies, we provide end-to-end
                digital solutions tailored for businesses in Noida.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {digitalServiceHighlights.map((h) => (
                <div
                  key={h.title}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 p-4 text-center"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: "#e6f6f4", color: TEAL }}
                  >
                    <h.icon />
                  </span>
                  <p className="text-sm font-bold" style={{ color: NAVY }}>
                    {h.title}
                  </p>
                  <p className="text-xs leading-snug text-slate-500">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WordPress development focus */}
          <div className="relative mt-10 w-full rounded-[2rem] border border-slate-200/80 bg-slate-50/60 p-6 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.2)] sm:p-10">
            {/* Badge straddling the top border, masking the line right behind the text */}
            <span
              className="absolute left-1/2 top-0 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-white px-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: TEAL }}
            >
              <span
                className="h-1 w-10"
                style={{
                  backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1.5px)`,
                  backgroundSize: "7px 100%",
                  backgroundRepeat: "repeat-x",
                }}
              />
              What We Do Best
              <span
                className="h-1 w-10"
                style={{
                  backgroundImage: `radial-gradient(${TEAL} 1px, transparent 1.5px)`,
                  backgroundSize: "7px 100%",
                  backgroundRepeat: "repeat-x",
                }}
              />
            </span>

            <div className="mx-auto max-w-2xl pt-2 text-center">
              <h2 className="mt-3 font-serif text-2xl font-bold leading-snug sm:text-3xl" style={{ color: NAVY }}>
                WordPress Development Services <span style={{ color: TEAL }}>in Noida</span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                We build fast, secure, scalable and SEO-friendly WordPress websites that help
                businesses in Noida establish a strong online presence.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-start">
              {/* Left: WordPress focus card */}
              <div className="flex gap-4">
                <div className="hidden shrink-0 flex-col items-center gap-3 lg:flex">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    Our Core Focus
                  </span>
                  <span className="h-16 w-px bg-slate-200" />
                </div>
                <div>
                  <div className="relative h-28 w-28">
                    {/* Orbit ring with revolving dots */}
                    <div className="animate-orbit-spin absolute inset-0">
                      <span
                        className="absolute inset-0 rounded-full border border-dashed"
                        style={{ borderColor: "rgba(13,148,136,0.3)" }}
                      />
                      {[0, 120, 240].map((deg) => (
                        <span
                          key={deg}
                          className="absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: TEAL, transform: `rotate(${deg}deg) translateX(3.5rem)` }}
                        />
                      ))}
                    </div>

                    {/* Static WordPress badge */}
                    <Image
                      src="/wordpress-logo-svgrepo-com.png"
                      alt="WordPress"
                      width={64}
                      height={64}
                      className="absolute inset-0 m-auto h-16 w-16 rounded-full"
                    />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-snug" style={{ color: NAVY }}>
                    WordPress Development
                    <br />
                    <span style={{ color: TEAL }}>Services in Noida</span>
                  </h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {wpChecklist.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                          <CheckIcon className="h-2.5 w-2.5" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <Link
                      href="/contact"
                      className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: DARK }}
                    >
                      Discuss Your Project <ArrowIcon />
                    </Link>
                    <Link
                      href="/portfolio"
                      className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                      style={{ color: TEAL }}
                    >
                      View Our Work
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full border"
                        style={{ borderColor: TEAL }}
                      >
                        <PlusIcon className="h-2.5 w-2.5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: 2x2 service cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {wpServiceCards.map((c) => (
                  <div
                    key={c.title}
                    className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5"
                  >
                    <span
                      className="pointer-events-none absolute right-4 top-2 text-3xl font-extrabold text-slate-100"
                      aria-hidden
                    >
                      {c.number}
                    </span>
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})`, color: "#ffffff" }}
                    >
                      <c.icon />
                    </span>
                    <p className="mt-3 text-base font-bold" style={{ color: NAVY }}>
                      {c.title}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{c.desc}</p>
                    <Link
                      href={c.href}
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-80"
                      style={{ color: TEAL }}
                    >
                      {c.cta} <ArrowIcon />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Local presence across Noida & NCR */}
          <div className="mt-8 flex flex-col items-center gap-8 rounded-3xl border border-slate-100 bg-[#F4F8F9] p-[10px] shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)] lg:flex-row lg:gap-10">
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:w-48 lg:w-44">
              <Image src="/local area.png" alt="Noida skyline" fill className="object-cover" />
            </div>

            <div className="text-center lg:max-w-xs lg:shrink-0 lg:text-left">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: TEAL }}>
                Local Roots. Better Results.
              </p>
              <h3 className="mt-2 text-xl font-bold leading-snug" style={{ color: NAVY }}>
                Proudly Serving Businesses Across <span style={{ color: TEAL }}>Noida</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                We work with companies and startups in all major sectors and locations of Noida
                &amp; NCR.
              </p>
            </div>

            <span className="hidden h-20 w-px bg-slate-200 lg:block" />

            <div className="grid w-full flex-1 grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {noidaLocations.map((l) => (
                <div key={l.name} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
                    style={{ color: TEAL }}
                  >
                    <BuildingIcon />
                  </span>
                  <p className="text-xs font-bold" style={{ color: NAVY }}>
                    {l.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{l.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </Container>
      </section>
      <IndustriesWeEmpower />
      <RecentSuccessStories />
      <WhyChooseUs />
      <ClientStories />
      <FAQSection />
      <CtaSection />
    </div>
  );
}
