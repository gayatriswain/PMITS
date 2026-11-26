import { z } from "zod";

/* ---------- building blocks ---------- */
const trimmed = (max: number) => z.string().trim().max(max);
const opt = (max: number) => trimmed(max).optional().or(z.literal("").transform(() => undefined));
export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Slug is required")
  .max(200)
  .regex(/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens");
/** Internal path ("/x/y"), absolute http(s) URL, mailto/tel, or a #hash. Blocks javascript: etc. */
export const href = z
  .string()
  .trim()
  .max(500)
  .refine((v) => v === "" || /^(\/[^\s]*|#[^\s]*|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)$/i.test(v), "Use a path like /contact or a full https:// URL");
const url = href;
const objectId = z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id");
const stringList = (max = 300) => z.array(trimmed(max)).max(100).default([]);
const jsonText = z
  .string()
  .max(20000)
  .optional()
  .refine((v) => {
    if (!v || !v.trim()) return true;
    try {
      JSON.parse(v);
      return true;
    } catch {
      return false;
    }
  }, "JSON-LD must be valid JSON");

export const seoSchema = z
  .object({
    title: opt(160),
    description: opt(320),
    canonical: url.optional(),
    robotsIndex: z.boolean().default(true),
    robotsFollow: z.boolean().default(true),
    ogTitle: opt(160),
    ogDescription: opt(320),
    ogImage: url.optional(),
    twitterCard: z.enum(["summary", "summary_large_image"]).default("summary_large_image"),
    jsonLd: jsonText,
    faqSchema: z.boolean().default(false),
    breadcrumbs: z.array(z.object({ label: trimmed(120), href })).max(10).default([]),
  })
  .partial()
  .default({});

const faq = z.object({ question: trimmed(300).min(1), answer: trimmed(4000).min(1) });
const publish = z.enum(["draft", "published"]).default("draft");

/* ---------- resources ---------- */
export const pageSchema = z.object({
  title: trimmed(200).min(1, "Title is required"),
  slug: z.string().trim().toLowerCase().max(200).regex(/^$|^[a-z0-9]+(?:[-/][a-z0-9]+)*$/, "Use lowercase letters, numbers, hyphens and /").default(""),
  description: opt(1000),
  featuredImage: url.optional(),
  group: opt(60),
  status: publish,
  seo: seoSchema,
});

export const serviceSchema = z.object({
  name: trimmed(160).min(1, "Name is required"),
  slug,
  category: opt(60),
  pagePath: href.optional(),
  shortDescription: opt(500),
  description: z.string().max(50000).optional(),
  featuredImage: url.optional(),
  bannerImage: url.optional(),
  icon: opt(60),
  badge: opt(20),
  benefits: stringList(),
  features: z.array(z.object({ title: trimmed(160), description: trimmed(1000).optional(), icon: opt(60) })).max(40).default([]),
  process: z.array(z.object({ title: trimmed(160), description: trimmed(1000).optional() })).max(30).default([]),
  technologies: stringList(80),
  faqs: z.array(faq).max(50).default([]),
  cta: z.object({ title: opt(200), text: opt(500), label: opt(80), href: href.optional() }).partial().default({}),
  relatedServices: z.array(objectId).max(12).default([]),
  seo: seoSchema,
  order: z.coerce.number().int().min(0).max(10000).default(0),
  status: publish,
});

export const blogCategorySchema = z.object({
  name: trimmed(120).min(1, "Name is required"),
  slug,
  description: opt(1000),
  order: z.coerce.number().int().min(0).max(10000).default(0),
});

export const blogSchema = z
  .object({
    title: trimmed(250).min(1, "Title is required"),
    slug,
    excerpt: opt(600),
    content: z.string().max(300000).default(""),
    featuredImage: url.optional(),
    categories: z.array(objectId).max(10).default([]),
    tags: z.array(trimmed(60).toLowerCase()).max(30).default([]),
    author: opt(120),
    authorImage: url.optional(),
    readingTime: z.coerce.number().int().min(1).max(240).optional(),
    relatedBlogs: z.array(objectId).max(10).default([]),
    seo: seoSchema,
    schemaType: z.enum(["BlogPosting", "Article", "NewsArticle", "HowTo"]).default("BlogPosting"),
    status: z.enum(["draft", "scheduled", "published"]).default("draft"),
    publishedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
  })
  .refine((b) => b.status !== "scheduled" || (b.publishedAt && b.publishedAt.getTime() > Date.now()), {
    message: "Scheduled posts need a future publish date",
    path: ["publishedAt"],
  });

export const testimonialSchema = z.object({
  clientName: trimmed(120).min(1, "Client name is required"),
  designation: opt(120),
  company: opt(160),
  image: url.optional(),
  content: trimmed(3000).min(1, "Testimonial is required"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  videoUrl: url.optional(),
  service: opt(120),
  order: z.coerce.number().int().min(0).max(10000).default(0),
  featured: z.boolean().default(false),
  status: publish,
});

export const portfolioSchema = z.object({
  name: trimmed(200).min(1, "Project name is required"),
  slug,
  client: opt(200),
  category: opt(120),
  description: z.string().max(20000).optional(),
  challenge: z.string().max(10000).optional(),
  solution: z.string().max(10000).optional(),
  results: z.string().max(10000).optional(),
  technologies: stringList(80),
  featuredImage: url.optional(),
  gallery: z.array(url).max(40).default([]),
  projectUrl: url.optional(),
  seo: seoSchema,
  order: z.coerce.number().int().min(0).max(10000).default(0),
  featured: z.boolean().default(false),
  status: publish,
});

export const careerSchema = z.object({
  title: trimmed(200).min(1, "Job title is required"),
  slug,
  department: opt(120),
  location: opt(160),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship", "remote", "hybrid"]).default("full-time"),
  experience: opt(80),
  salaryRange: opt(80),
  description: z.string().max(30000).optional(),
  responsibilities: stringList(500),
  requirements: stringList(500),
  benefits: stringList(500),
  deadline: z.coerce.date().optional(),
  order: z.coerce.number().int().min(0).max(10000).default(0),
  status: z.enum(["draft", "open", "closed"]).default("draft"),
});

export const teamSchema = z.object({
  name: trimmed(120).min(1, "Name is required"),
  designation: opt(120),
  bio: opt(2000),
  image: url.optional(),
  socials: z.object({ linkedin: url.optional(), twitter: url.optional(), github: url.optional(), website: url.optional() }).partial().default({}),
  order: z.coerce.number().int().min(0).max(10000).default(0),
  status: publish,
});

const navItem: z.ZodType<NavItemInput> = z.lazy(() =>
  z.object({
    label: trimmed(120).min(1, "Label is required"),
    href: href.default(""),
    description: opt(200),
    icon: opt(60),
    badge: opt(20),
    accent: opt(20),
    external: z.boolean().default(false),
    visible: z.boolean().default(true),
    children: z.array(navItem).max(60).default([]),
  }),
);
export type NavItemInput = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  badge?: string;
  accent?: string;
  external: boolean;
  visible: boolean;
  children: NavItemInput[];
};
export const navigationSchema = z.object({ name: trimmed(120).min(1), items: z.array(navItem).max(80) });

export const settingsSchema = z
  .object({
    siteName: opt(120),
    tagline: opt(200),
    logo: url.optional(),
    footerLogo: url.optional(),
    favicon: url.optional(),
    contactEmail: z.string().trim().email().max(255).optional().or(z.literal("")),
    contactPhone: opt(40),
    address: opt(300),
    shortLocation: opt(120),
    workingHours: opt(120),
    socials: z.object({ linkedin: url.optional(), instagram: url.optional(), facebook: url.optional(), youtube: url.optional(), twitter: url.optional() }).partial(),
    socialLinks: z
      .array(z.object({ platform: z.string().trim().regex(/^[a-z]{1,20}$/, "Choose a platform"), url: url.refine((v) => v !== "", "Enter the profile link"), label: opt(60) }))
      .max(20),
    headerCta: z.object({ label: opt(60), href: href.optional() }).partial(),
    topBar: z.object({ phone: opt(40), email: z.string().trim().email().max(255).optional().or(z.literal("")), location: opt(80), onlineText: opt(80), ratingText: opt(80), consultationText: opt(80), chatLabel: opt(40), chatHref: href.optional() }).partial(),
    footer: z
      .object({
        headline: opt(120), accent: opt(120), description: opt(600), copyright: opt(200), madeIn: opt(80), googleRating: opt(10), reviewsText: opt(60),
        ctaTitle: opt(120), ctaText: opt(300), ctaLabel: opt(60), ctaHref: href.optional(),
        trustedText: opt(120), trustedAccent: opt(80),
        stats: z.array(z.object({ value: opt(20), label: opt(60) })).max(4),
      })
      .partial(),
    clientLogos: z.array(z.object({ name: trimmed(120).min(1, "Name is required"), image: url.refine((v) => v !== "", "Choose a logo image") })).max(40),
    defaultSeo: z.object({ title: opt(160), titleTemplate: opt(160), description: opt(320), ogImage: url.optional() }).partial(),
    analytics: z
      .object({
        googleAnalyticsId: z.string().trim().regex(/^$|^G-[A-Z0-9]{4,12}$/, "Format: G-XXXXXXX").optional(),
        googleTagManagerId: z.string().trim().regex(/^$|^GTM-[A-Z0-9]{4,10}$/, "Format: GTM-XXXXXX").optional(),
        metaPixelId: z.string().trim().regex(/^$|^[0-9]{6,20}$/, "Digits only").optional(),
      })
      .partial(),
    notificationEmails: z.array(z.string().trim().email()).max(10),
  })
  .partial();

const emailList = z.array(z.string().trim().toLowerCase().email("Invalid email address")).max(20);
const optEmail = z.string().trim().toLowerCase().email("Invalid email address").max(255).optional().or(z.literal(""));

export const mailSettingsSchema = z
  .object({
    enabled: z.boolean(),
    host: z.string().trim().max(255).regex(/^$|^[a-zA-Z0-9.-]+$/, "Host name only, e.g. smtp.gmail.com"),
    port: z.coerce.number().int().min(1).max(65535),
    encryption: z.enum(["tls", "ssl", "none"]),
    username: z.string().trim().max(255),
    /** Only sent when changing it. Empty = keep the saved password. */
    password: z.string().max(500).optional(),
    clearPassword: z.boolean().optional(),
    fromName: opt(120),
    fromEmail: optEmail,
    replyTo: optEmail,
    to: emailList,
    cc: emailList,
    bcc: emailList,
    subjectPrefix: opt(80),
    events: z.object({ leads: z.boolean(), proposals: z.boolean(), applications: z.boolean() }).partial(),
    autoReply: z.object({ enabled: z.boolean(), subject: opt(200), body: opt(3000) }).partial(),
  })
  .partial()
  .superRefine((d, ctx) => {
    if (d.enabled && !d.host) ctx.addIssue({ code: "custom", path: ["host"], message: "SMTP host is required when email is on" });
    if (d.enabled && !d.fromEmail) ctx.addIssue({ code: "custom", path: ["fromEmail"], message: "From email is required when email is on" });
    if (d.enabled && !d.to?.length) ctx.addIssue({ code: "custom", path: ["to"], message: "Add at least one recipient" });
  });

/** Test: unsaved form values may be sent so the admin can check them before saving. */
export const mailTestSchema = z.object({
  to: z.string().trim().toLowerCase().email("Enter the email address to send the test to"),
  config: mailSettingsSchema.optional(),
});

export const userCreateSchema = z.object({
  name: trimmed(120).min(1, "Name is required"),
  email: z.string().trim().toLowerCase().email().max(255),
  role: z.enum(["super_admin", "admin", "editor", "seo_manager", "lead_manager"]),
  password: z.string().min(10).max(128),
  active: z.boolean().default(true),
});
export const userUpdateSchema = userCreateSchema.partial().extend({ password: z.string().min(10).max(128).optional().or(z.literal("")) });

export const leadUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "in_progress", "qualified", "converted", "not_interested", "closed"]).optional(),
  assignedTo: objectId.nullable().optional(),
  note: trimmed(4000).min(1).optional(),
});

export const mediaUpdateSchema = z.object({ alt: opt(300), title: opt(200), folder: opt(60) });

export const sectionSaveSchema = z.object({
  sections: z
    .array(
      z.object({
        id: objectId.optional(),
        key: z.string().trim().min(1).max(80).regex(/^[a-z0-9-]+$/),
        component: z.string().trim().min(1).max(80),
        label: opt(120),
        enabled: z.boolean(),
        content: z.record(z.string(), z.unknown()).default({}),
      }),
    )
    .max(60),
});
