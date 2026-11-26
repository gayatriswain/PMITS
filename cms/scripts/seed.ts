/**
 * Idempotent content migration: copies the content that currently lives in the frontend code into
 * MongoDB. Every write is an upsert with $setOnInsert, so running it again NEVER overwrites
 * anything edited in the CMS - it only adds what is missing.
 *
 *   npm run seed
 *
 * Sources (all verbatim from the frontend, nothing invented):
 *   - pages + section order ......... lib/sections/pages.generated.json (scripts/generate-registry.ts)
 *   - section default content ....... lib/sections/registry.ts (copied from FAQSection, CtaSection, TrustedBar)
 *   - navigation .................... Header.tsx, ServicesMegaMenu.tsx, Footer.tsx
 *   - settings ...................... Header top bar + Footer
 *   - services ...................... ServicesMegaMenu.tsx (name, URL, short description, icon, badge)
 *   - careers ....................... CareerOpenPositions.tsx (6 openings)
 *   - blog cards .................... BlogGrid.tsx (seeded as DRAFTS: the site has cards but no article bodies)
 *   - testimonials .................. ClientStories.tsx (seeded as DRAFTS - see note in README)
 *   - media ......................... every image in frontend/public (registered, not copied)
 */
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { connect, disconnect } from "./_db";
import { Blog, BlogCategory, Career, Media, Navigation, Page, PageSection, Service, Testimonial, WebsiteSettings } from "../models";
import { GENERATED_PAGES, getSectionDef } from "../lib/sections/registry";

const counts: Record<string, { added: number; kept: number }> = {};
function tally(kind: string, upserted: boolean) {
  counts[kind] ??= { added: 0, kept: 0 };
  counts[kind][upserted ? "added" : "kept"]++;
}

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

/** Four routes have no `metadata` export today (they inherit "Create Next App"). */
const MISSING_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "ProManage IT Solution | Web Development, SEO & Digital Marketing",
    description: "Website development, SEO and digital marketing that help businesses attract, convert and grow.",
  },
  "/hosting": { title: "Hosting | ProManage", description: "Secure, fast and reliable hosting for business websites." },
  "/location": { title: "Location | ProManage", description: "Find ProManage IT Solution and the industries and businesses we work with." },
  "/web-software/website-development": {
    title: "Website Development Services | ProManage",
    description: "Strategy-led websites that attract the right audience, build trust and turn clicks into customers.",
  },
};

const PAGE_TITLES: Record<string, string> = { "/": "Home", "/hosting": "Hosting", "/location": "Location", "/web-software/website-development": "Website Development" };

async function seedPages() {
  for (const g of GENERATED_PAGES) {
    const meta = g.title ? { title: g.title, description: g.description } : MISSING_META[g.path] ?? { title: g.path, description: "" };
    const title = PAGE_TITLES[g.path] ?? meta.title.split("|")[0].replace(/\s+-\s+.*$/, "").trim();
    const slug = g.path === "/" ? "" : g.path.slice(1);
    const group = g.global ? "global" : g.path === "/" ? "main" : slug.includes("/") ? slug.split("/")[0] : "main";
    const res = await Page.updateOne(
      { path: g.path },
      {
        $setOnInsert: {
          path: g.path,
          slug,
          title,
          description: meta.description,
          kind: "coded",
          group,
          status: "published",
          publishedAt: new Date(),
          // the global-sections page is not a real URL: keep it out of search and the sitemap
          seo: { title: meta.title, description: meta.description, robotsIndex: !g.global, robotsFollow: !g.global },
        },
      },
      { upsert: true },
    );
    tally("pages", res.upsertedCount > 0);
    const page = await Page.findOne({ path: g.path }, "_id").lean();
    for (const [i, s] of g.sections.entries()) {
      const def = getSectionDef(s.component);
      const r = await PageSection.updateOne(
        { page: page!._id, key: s.key },
        { $setOnInsert: { component: s.component, label: s.label, order: i, enabled: true, content: def && !def.generated ? def.defaults : {} } },
        { upsert: true },
      );
      tally("sections", r.upsertedCount > 0);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Navigation (Header.tsx, ServicesMegaMenu.tsx, Footer.tsx)           */
/* ------------------------------------------------------------------ */

type Item = { label: string; href?: string; description?: string; icon?: string; badge?: string; accent?: string; external?: boolean; children?: Item[] };

const SERVICE_GROUPS: (Item & { children: Item[] })[] = [
  {
    label: "Web & Software", description: "Build it right", accent: "teal", children: [
      { label: "Website Development", href: "/web-software/website-development", description: "Fast, secure business websites", icon: "Globe" },
      { label: "App Development", href: "/web-software/app-development", description: "iOS, Android & cross-platform apps", icon: "Smartphone" },
      { label: "Custom Development", href: "/web-software/custom-development", description: "Tailor-made web software", icon: "Code2" },
      { label: "Custom CRM Solution", href: "/web-software/custom-crm-solution", description: "CRM built around your sales flow", icon: "LayoutDashboard" },
      { label: "Shopify Web Design", href: "/web-software/shopify-web-design", description: "Online stores that convert", icon: "ShoppingBag" },
      { label: "Web Hosting", href: "/web-software/web-hosting", description: "Reliable, secure hosting", icon: "Server" },
    ],
  },
  {
    label: "Design & Innovation", description: "Stand out", accent: "indigo", children: [
      { label: "UI/UX Design", href: "/design-innovation/ui-ux-design", description: "Interfaces people love to use", icon: "PenTool" },
      { label: "Animation & Graphic Design", href: "/design-innovation/animation-and-graphic-design", description: "Motion and brand visuals", icon: "Film" },
      { label: "Custom AR/VR Solution", href: "/design-innovation/custom-ar-vr-solution", description: "Immersive 3D experiences", icon: "Glasses" },
      { label: "Custom Agentic AI Solution", href: "/design-innovation/custom-agentic-ai-solution", description: "Autonomous AI workflows", icon: "Bot", badge: "AI" },
    ],
  },
  {
    label: "Marketing & Growth", description: "Get found", accent: "amber", children: [
      { label: "Digital Marketing", href: "/marketing-growth/digital-marketing", description: "Full-funnel growth campaigns", icon: "TrendingUp" },
      { label: "Social Media Marketing", href: "/marketing-growth/social-media-marketing", description: "Content that builds community", icon: "Share2" },
      { label: "Google Ads", href: "/marketing-growth/google-ads", description: "High-intent paid traffic", icon: "Target" },
      { label: "AI SEO", href: "/marketing-growth/ai-seo", description: "Rank in search and AI answers", icon: "Sparkles", badge: "New" },
      { label: "E-commerce SEO", href: "/marketing-growth/ecommerce-seo", description: "More organic sales for stores", icon: "ShoppingCart" },
      { label: "Local SEO", href: "/marketing-growth/local-seo", description: "Get found by nearby customers", icon: "MapPin", badge: "New" },
    ],
  },
  {
    label: "Hire Developers", description: "Scale your team", accent: "rose", children: [
      { label: "Hire WooCommerce Developers", href: "/hire-developer/hire-woocommerce-developers", description: "Store experts on demand", icon: "Store" },
      { label: "Hire Core PHP Developers", href: "/hire-developer/hire-core-php-developers", description: "Clean, scalable PHP", icon: "Code" },
      { label: "Hire CakePHP Developers", href: "/hire-developer/hire-cakephp-developers", description: "Secure CakePHP applications", icon: "Cake" },
      { label: "Hire ASP.NET Developers", href: "/hire-developer/hire-aspnet-developers", description: "Enterprise-grade .NET apps", icon: "Cpu", badge: "New" },
      { label: "Hire Shopify Developers", href: "/hire-developer/hire-shopify-developers", description: "Custom Shopify builds", icon: "ShoppingBag" },
      { label: "Hire Magento Developers", href: "/hire-developer/hire-magento-developers", description: "Scalable Magento stores", icon: "Hexagon" },
      { label: "Hire BigCommerce Developers", href: "/hire-developer/hire-bigcommerce-developers", description: "BigCommerce builds that grow", icon: "Package" },
    ],
  },
];

const HEADER: Item[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Location", href: "/location" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
];

/** Footer columns: Web & App, Development (hire developers), SEO, Company. Editable in Admin → Navigation → footer. */
const FOOTER: Item[] = [
  {
    label: "Web & App", children: [
      ["Website Development", "/web-software/website-development"],
      ["App Development", "/web-software/app-development"],
      ["Custom Development", "/web-software/custom-development"],
      ["Custom CRM Solution", "/web-software/custom-crm-solution"],
      ["Shopify Web Design", "/web-software/shopify-web-design"],
      ["Web Hosting", "/web-software/web-hosting"],
    ].map(([label, href]) => ({ label, href })),
  },
  {
    label: "Development", children: [
      ["WooCommerce Developers", "/hire-developer/hire-woocommerce-developers"],
      ["Core PHP Developers", "/hire-developer/hire-core-php-developers"],
      ["CakePHP Developers", "/hire-developer/hire-cakephp-developers"],
      ["ASP.NET Developers", "/hire-developer/hire-aspnet-developers"],
      ["Shopify Developers", "/hire-developer/hire-shopify-developers"],
      ["Magento Developers", "/hire-developer/hire-magento-developers"],
      ["BigCommerce Developers", "/hire-developer/hire-bigcommerce-developers"],
    ].map(([label, href]) => ({ label, href })),
  },
  {
    label: "SEO", children: [
      ["SEO Services", "/seo"],
      ["AI SEO", "/marketing-growth/ai-seo"],
      ["E-commerce SEO", "/marketing-growth/ecommerce-seo"],
      ["Local SEO", "/marketing-growth/local-seo"],
    ].map(([label, href]) => ({ label, href })),
  },
  {
    label: "Company", children: [
      ["Home", "/"],
      ["Who We Are", "/who-we-are"],
      ["Why Choose Us", "/why-choose-us"],
      ["Careers", "/career"],
      ["Location", "/location"],
      ["Blog", "/blog"],
      ["Contact Us", "/contact"],
    ].map(([label, href]) => ({ label, href })),
  },
];

const withDefaults = (items: Item[]): Item[] => items.map((i) => ({ href: "", external: false, visible: true, ...i, children: withDefaults(i.children ?? []) } as Item));

async function seedNavigation() {
  for (const [key, name, items] of [
    ["header", "Header menu", HEADER],
    ["services", "Services mega menu", SERVICE_GROUPS],
    ["footer", "Footer columns", FOOTER],
  ] as const) {
    const r = await Navigation.updateOne({ key }, { $setOnInsert: { key, name, items: withDefaults(items as Item[]) } }, { upsert: true });
    tally("navigation", r.upsertedCount > 0);
  }
}

/* ------------------------------------------------------------------ */
/* Settings (Header top bar + Footer)                                  */
/* ------------------------------------------------------------------ */

async function seedSettings() {
  const r = await WebsiteSettings.updateOne(
    { key: "global" },
    {
      $setOnInsert: {
        key: "global",
        siteName: "ProManage IT Solution",
        logo: "/pmits-text-logo4-2.webp",
        footerLogo: "/pmits-text-logo4-2.webp",
        contactEmail: "hello@promanage.com",
        contactPhone: "+91 99999 88888",
        address: "Sector 62, Noida, Uttar Pradesh 201309, India",
        shortLocation: "Noida, India",
        socials: { linkedin: "https://linkedin.com", instagram: "https://instagram.com", facebook: "https://facebook.com", youtube: "https://youtube.com" },
        headerCta: { label: "Get Free Quote", href: "/contact" },
        topBar: {
          phone: "(555) 123-4567",
          email: "hello@promanage.com",
          location: "New York, NY",
          onlineText: "We're online now!",
          ratingText: "4.9/5 (200+ reviews)",
          consultationText: "Free 30-min consultation",
          chatLabel: "Live Chat",
          chatHref: "/contact",
        },
        footer: {
          headline: "Building Digital Experiences.",
          accent: "Driving Real Growth.",
          description: "We help businesses in India and beyond build powerful digital presence, attract more customers and achieve measurable results that last.",
          copyright: "© 2024 ProManage. All rights reserved.",
          madeIn: "Noida",
          googleRating: "4.8",
          reviewsText: "(120+ Reviews)",
          ctaTitle: "Let's Grow Your Business Together",
          ctaText: "Get expert strategies and digital solutions tailored to your business goals.",
          ctaLabel: "Get a Free Consultation",
          ctaHref: "/contact",
          trustedText: "TRUSTED BY 500+ BUSINESSES ACROSS",
          trustedAccent: "INDIA & NCR",
          stats: [
            { value: "500+", label: "Businesses Trusted" },
            { value: "10+", label: "Years of Excellence" },
            { value: "98%", label: "Client Satisfaction Rate" },
          ],
        },
        clientLogos: [
          ["Max Healthcare", "max-healthcare"], ["Danube Properties", "danube-properties"], ["The Better India", "the-better-india"], ["HomeLane", "homelane"],
          ["Tynor", "tynor"], ["Policybazaar", "policybazaar"], ["Bikanervala", "bikanervala"],
        ].map(([name, f]) => ({ name, image: `/clients/${f}.svg` })),
        defaultSeo: {
          title: "ProManage IT Solution",
          titleTemplate: "%s",
          description: "Website development, SEO and digital marketing that help businesses grow.",
        },
        notificationEmails: [],
      },
    },
    { upsert: true },
  );
  tally("settings", r.upsertedCount > 0);
}

/* ------------------------------------------------------------------ */
/* Services, careers, blog cards, testimonials                         */
/* ------------------------------------------------------------------ */

async function seedServices() {
  let order = 0;
  for (const g of SERVICE_GROUPS) {
    const category = g.label.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");
    for (const s of g.children) {
      const slug = s.href!.split("/").pop()!;
      const hasPage = GENERATED_PAGES.some((p) => p.path === s.href);
      const r = await Service.updateOne(
        { slug },
        {
          $setOnInsert: {
            name: s.label, slug, category, pagePath: s.href, shortDescription: s.description, icon: s.icon, badge: s.badge,
            order: order++, status: hasPage ? "published" : "draft",
          },
        },
        { upsert: true },
      );
      tally("services", r.upsertedCount > 0);
    }
  }
}

const JOBS = [
  ["UI/UX Designer", "Design", "2 - 4 Yrs"],
  ["Frontend Developer", "Development", "2 - 5 Yrs"],
  ["Backend Developer", "Development", "2 - 5 Yrs"],
  ["Digital Marketing Executive", "Marketing", "1 - 3 Yrs"],
  ["Project Manager", "Operations", "3 - 6 Yrs"],
  ["Technical Support Engineer", "Support", "1 - 4 Yrs"],
];

async function seedCareers() {
  for (const [i, [title, department, experience]] of JOBS.entries()) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const r = await Career.updateOne(
      { slug },
      { $setOnInsert: { title, slug, department, experience, location: "Gurugram", employmentType: "hybrid", order: i, status: "open" } },
      { upsert: true },
    );
    tally("careers", r.upsertedCount > 0);
  }
}

const BLOG_CARDS: [string, string, string, string, string][] = [
  ["AI Overviews & Organic Traffic: What the Data Really Shows", "AI & GEO", "2026-05-20", "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop", "6"],
  ["Ecommerce SEO in 2026: 10 Strategies That Actually Work", "SEO", "2026-05-18", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", "7"],
  ["Product Page SEO: The Complete Optimization Checklist", "Ecommerce", "2026-05-16", "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", "5"],
  ["Local SEO for Ecommerce Brands: Rank Locally, Sell Globally", "Local SEO", "2026-05-14", "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop", "6"],
  ["Core Web Vitals & SEO: The Real Impact on Rankings", "Web & UX", "2026-05-12", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", "8"],
  ["From Traffic to Revenue: Building a Growth System That Scales", "Digital Growth", "2026-05-10", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", "8"],
  ["Google's March 2026 Core Update: Key Takeaways for Websites", "SEO", "2026-05-08", "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop", "7"],
  ["GEO vs Traditional SEO: What's Different and Why It Matters", "AI & GEO", "2026-05-06", "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=800&auto=format&fit=crop", "6"],
  ["Scaling Content Production Without Losing Quality", "Digital Growth", "2026-05-04", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", "5"],
  ["Optimizing Google Business Profiles in 2026", "Local SEO", "2026-05-02", "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop", "4"],
];

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function seedBlogs() {
  const cats = new Map<string, unknown>();
  for (const [i, name] of [...new Set(BLOG_CARDS.map((b) => b[1]))].entries()) {
    const slug = slugify(name);
    const r = await BlogCategory.updateOne({ slug }, { $setOnInsert: { name, slug, order: i } }, { upsert: true });
    tally("blogCategories", r.upsertedCount > 0);
    cats.set(name, (await BlogCategory.findOne({ slug }, "_id").lean())!._id);
  }
  for (const [title, cat, date, image, minutes] of BLOG_CARDS) {
    const slug = slugify(title);
    const r = await Blog.updateOne(
      { slug },
      {
        $setOnInsert: {
          title, slug, categories: [cats.get(cat)], featuredImage: image, readingTime: Number(minutes),
          // The site only has a card for these posts - no article body - so they start as drafts.
          status: "draft", publishedAt: new Date(date), content: "",
          seo: { title: `${title} | ProManage Blog` },
        },
      },
      { upsert: true },
    );
    tally("blogs (draft)", r.upsertedCount > 0);
  }
}

const TESTIMONIALS = [
  ["Isabelle Hart", "Founder", "Aurelia", "ProManage didn't just build us a website, they built a booking engine. Online reservations climbed within the first two months of launch."],
  ["Dr. Samuel Reyes", "Practice Director", "VitalCare", "They understood the sensitivity of our industry from day one. The new site is fast, accessible, and patient inquiries have nearly doubled."],
  ["Owen Whitfield", "VP Marketing", "Skyline Group", "From strategy to execution, every detail was intentional. We finally have a digital presence that matches the scale of our projects."],
  ["Priya Nandakumar", "Co-Founder", "Havenly", "Our online showroom went from an afterthought to our biggest lead source. The team made the whole process feel effortless."],
  ["Derek Lomax", "Studio Owner", "NovaFit", "Working with ProManage felt like adding a growth team overnight. Class bookings and site traffic both climbed within the first quarter."],
  ["Camille Torres", "Broker", "Marbella Realty", "They understood our brand voice better than we did and brought it to life in a way that exceeded expectations. Ten out of ten."],
];

async function seedTestimonials() {
  for (const [i, [clientName, designation, company, content]] of TESTIMONIALS.entries()) {
    const r = await Testimonial.updateOne(
      { clientName, company },
      // Drafts: these look like design placeholders; publish only once confirmed as real clients.
      { $setOnInsert: { clientName, designation, company, content, rating: 5, order: i, status: "draft" } },
      { upsert: true },
    );
    tally("testimonials (draft)", r.upsertedCount > 0);
  }
}

/* ------------------------------------------------------------------ */
/* Media: register images that already ship with the website           */
/* ------------------------------------------------------------------ */

const IMG = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const MIME: Record<string, string> = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", webp: "image/webp", avif: "image/avif", gif: "image/gif", svg: "image/svg+xml" };

async function seedMedia() {
  const root = path.resolve(process.cwd(), "../frontend/public");
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((n) => {
      const p = path.join(dir, n);
      return statSync(p).isDirectory() ? walk(p) : IMG.test(n) ? [p] : [];
    });
  for (const file of walk(root)) {
    const rel = "/" + path.relative(root, file).replace(/\\/g, "/");
    // Skip design reference folders: top-level folders with a space in the name ("AI Seo", "dot net",
    // "why choose us", "all pages image"…) hold the Figma exports the pages were built from, not site images.
    if (/^\/[^/]* [^/]*\//.test(rel)) continue;
    const ext = path.extname(file).slice(1).toLowerCase();
    const folder = rel.split("/").length > 2 ? rel.split("/")[1].toLowerCase().replace(/[^a-z0-9-]/g, "-") : "website";
    const r = await Media.updateOne(
      { url: encodeURI(rel) },
      { $setOnInsert: { filename: path.basename(file), originalName: path.basename(file), url: encodeURI(rel), provider: "external", mimeType: MIME[ext], size: statSync(file).size, title: path.basename(file, path.extname(file)), folder, isFrontendAsset: true } },
      { upsert: true },
    );
    tally("media (website images)", r.upsertedCount > 0);
  }
}

async function main() {
  await connect();
  await seedSettings();
  await seedNavigation();
  await seedPages();
  await seedServices();
  await seedCareers();
  await seedBlogs();
  await seedTestimonials();
  await seedMedia();
  // Make sure indexes exist (unique slugs, TTLs, text search).
  const models = [Blog, BlogCategory, Career, Media, Navigation, Page, PageSection, Service, Testimonial, WebsiteSettings];
  for (const m of models) await m.syncIndexes();
  console.table(counts);
  await disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await disconnect().catch(() => {});
  process.exit(1);
});
