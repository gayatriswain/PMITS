import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { FaqSchema, LinkSchema, NoteSchema, SeoSchema, STATUSES, slugField } from "./shared";

/**
 * Compile a model once per process. In development a hot reload re-runs this file: the old compiled
 * model is replaced so new schema fields are not silently dropped (Mongoose strict mode) until a restart.
 */
function model<T>(name: string, schema: Schema<T>): Model<T> {
  if (mongoose.models[name]) {
    if (process.env.NODE_ENV === "production") return mongoose.models[name] as Model<T>;
    mongoose.deleteModel(name);
  }
  return mongoose.model<T>(name, schema);
}

/* ------------------------------------------------------------------ */
/* Auth                                                                */
/* ------------------------------------------------------------------ */

export const ROLES = ["super_admin", "admin", "editor", "seo_manager", "lead_manager"] as const;
export type Role = (typeof ROLES)[number];

const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255, unique: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "editor", index: true },
    active: { type: Boolean, default: true },
    avatar: { type: String, trim: true },
    lastLoginAt: Date,
    failedLogins: { type: Number, default: 0 },
    lockedUntil: Date,
    passwordChangedAt: Date,
    resetTokenHash: { type: String, select: false },
    resetTokenExpires: { type: Date, select: false },
  },
  { timestamps: true },
);
export const AdminUser = model("AdminUser", AdminUserSchema);

const SessionSchema = new Schema(
  {
    tokenHash: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "AdminUser", required: true, index: true },
    expiresAt: { type: Date, required: true },
    ip: String,
    userAgent: String,
  },
  { timestamps: true },
);
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const Session = model("Session", SessionSchema);

/** Fixed-window counters for rate limiting (TTL cleaned). Works across serverless instances. */
const RateLimitSchema = new Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
});
RateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const RateLimit = model("RateLimit", RateLimitSchema);

/* ------------------------------------------------------------------ */
/* Pages & sections                                                    */
/* ------------------------------------------------------------------ */

const PageSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    /** Route path without leading slash: "" = home, "marketing-growth/local-seo". */
    slug: { ...slugField, required: false, default: "" },
    path: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, maxlength: 1000 },
    featuredImage: { type: String, trim: true },
    /** "coded" = existing hand-built page (sections map to React components); "builder" = CMS-composed page. */
    kind: { type: String, enum: ["coded", "builder"], default: "builder" },
    group: { type: String, trim: true, index: true },
    status: { type: String, enum: STATUSES, default: "draft", index: true },
    publishedAt: Date,
    seo: { type: SeoSchema, default: {} },
    /** Draft copy of title/seo/description edits not yet published. */
    draft: { type: Schema.Types.Mixed },
    hasUnpublishedChanges: { type: Boolean, default: false },
    updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true },
);
PageSchema.index({ title: "text", path: "text" });
export const Page = model("Page", PageSchema);

const PageSectionSchema = new Schema(
  {
    page: { type: Schema.Types.ObjectId, ref: "Page", required: true, index: true },
    /** Stable id, unique within the page, e.g. "hero". */
    key: { type: String, required: true, trim: true, maxlength: 80 },
    /** Registry component id, e.g. "LocalSeoHero" (see lib/sections/registry.ts). */
    component: { type: String, required: true, trim: true, maxlength: 80 },
    label: { type: String, trim: true, maxlength: 120 },
    order: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
    /** Published content (what visitors see). */
    content: { type: Schema.Types.Mixed, default: {} },
    /** Working copy; promoted to `content` on publish. */
    draftContent: { type: Schema.Types.Mixed },
    draftEnabled: Boolean,
    draftOrder: Number,
    hasUnpublishedChanges: { type: Boolean, default: false },
  },
  { timestamps: true },
);
PageSectionSchema.index({ page: 1, key: 1 }, { unique: true });
export const PageSection = model("PageSection", PageSectionSchema);

/* ------------------------------------------------------------------ */
/* Content collections                                                 */
/* ------------------------------------------------------------------ */

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 160 },
    slug: { ...slugField },
    category: { type: String, trim: true, index: true },
    pagePath: { type: String, trim: true },
    shortDescription: { type: String, trim: true, maxlength: 500 },
    description: { type: String, maxlength: 50000 },
    featuredImage: String,
    bannerImage: String,
    icon: { type: String, trim: true, maxlength: 60 },
    badge: { type: String, trim: true, maxlength: 20 },
    benefits: [{ type: String, trim: true, maxlength: 300 }],
    features: [{ _id: false, title: String, description: String, icon: String }],
    process: [{ _id: false, title: String, description: String }],
    technologies: [{ type: String, trim: true, maxlength: 80 }],
    faqs: [FaqSchema],
    cta: { title: String, text: String, label: String, href: String },
    relatedServices: [{ type: Schema.Types.ObjectId, ref: "Service" }],
    seo: { type: SeoSchema, default: {} },
    order: { type: Number, default: 0 },
    status: { type: String, enum: STATUSES, default: "draft", index: true },
  },
  { timestamps: true },
);
ServiceSchema.index({ slug: 1 }, { unique: true });
export const Service = model("Service", ServiceSchema);

const BlogCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { ...slugField },
    description: { type: String, trim: true, maxlength: 1000 },
    order: { type: Number, default: 0 },
    /** The "Uncategorized" category: can be edited, never deleted (see lib/services/blogCategories.ts). */
    isDefault: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);
BlogCategorySchema.index({ slug: 1 }, { unique: true });
export const BlogCategory = model("BlogCategory", BlogCategorySchema);

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 250 },
    slug: { ...slugField },
    excerpt: { type: String, trim: true, maxlength: 600 },
    content: { type: String, maxlength: 300000 },
    featuredImage: String,
    categories: [{ type: Schema.Types.ObjectId, ref: "BlogCategory", index: true }],
    tags: [{ type: String, trim: true, lowercase: true, maxlength: 60 }],
    author: { type: String, trim: true, maxlength: 120 },
    authorImage: String,
    readingTime: { type: Number, default: 1 },
    relatedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    seo: { type: SeoSchema, default: {} },
    schemaType: { type: String, enum: ["BlogPosting", "Article", "NewsArticle", "HowTo"], default: "BlogPosting" },
    status: { type: String, enum: ["draft", "scheduled", "published"], default: "draft", index: true },
    publishedAt: { type: Date, index: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);
BlogSchema.index({ slug: 1 }, { unique: true });
BlogSchema.index({ title: "text", excerpt: "text", tags: "text" });
export const Blog = model("Blog", BlogSchema);

const TestimonialSchema = new Schema(
  {
    clientName: { type: String, required: true, trim: true, maxlength: 120 },
    designation: { type: String, trim: true, maxlength: 120 },
    company: { type: String, trim: true, maxlength: 160 },
    image: String,
    content: { type: String, required: true, trim: true, maxlength: 3000 },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    videoUrl: { type: String, trim: true, maxlength: 500 },
    service: { type: String, trim: true, maxlength: 120 },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
    status: { type: String, enum: STATUSES, default: "draft", index: true },
  },
  { timestamps: true },
);
export const Testimonial = model("Testimonial", TestimonialSchema);

const PortfolioSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { ...slugField },
    client: { type: String, trim: true, maxlength: 200 },
    category: { type: String, trim: true, maxlength: 120, index: true },
    description: { type: String, maxlength: 20000 },
    challenge: { type: String, maxlength: 10000 },
    solution: { type: String, maxlength: 10000 },
    results: { type: String, maxlength: 10000 },
    technologies: [{ type: String, trim: true, maxlength: 80 }],
    featuredImage: String,
    gallery: [{ type: String }],
    projectUrl: { type: String, trim: true, maxlength: 500 },
    seo: { type: SeoSchema, default: {} },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: STATUSES, default: "draft", index: true },
  },
  { timestamps: true },
);
PortfolioSchema.index({ slug: 1 }, { unique: true });
export const Portfolio = model("Portfolio", PortfolioSchema);

const CareerSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { ...slugField },
    department: { type: String, trim: true, maxlength: 120, index: true },
    location: { type: String, trim: true, maxlength: 160 },
    employmentType: { type: String, enum: ["full-time", "part-time", "contract", "internship", "remote", "hybrid"], default: "full-time" },
    experience: { type: String, trim: true, maxlength: 80 },
    salaryRange: { type: String, trim: true, maxlength: 80 },
    description: { type: String, maxlength: 30000 },
    responsibilities: [{ type: String, trim: true, maxlength: 500 }],
    requirements: [{ type: String, trim: true, maxlength: 500 }],
    benefits: [{ type: String, trim: true, maxlength: 500 }],
    deadline: Date,
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "open", "closed"], default: "draft", index: true },
  },
  { timestamps: true },
);
CareerSchema.index({ slug: 1 }, { unique: true });
export const Career = model("Career", CareerSchema);

const JobApplicationSchema = new Schema(
  {
    career: { type: Schema.Types.ObjectId, ref: "Career", index: true },
    jobTitle: { type: String, trim: true, maxlength: 200 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255 },
    phone: { type: String, trim: true, maxlength: 30 },
    portfolioUrl: { type: String, trim: true, maxlength: 500 },
    resume: { type: Schema.Types.ObjectId, ref: "Media" },
    coverLetter: { type: String, trim: true, maxlength: 5000 },
    status: { type: String, enum: ["new", "reviewing", "shortlisted", "interview", "rejected", "hired"], default: "new", index: true },
    notes: [NoteSchema],
  },
  { timestamps: true },
);
export const JobApplication = model("JobApplication", JobApplicationSchema);

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    designation: { type: String, trim: true, maxlength: 120 },
    bio: { type: String, trim: true, maxlength: 2000 },
    image: String,
    socials: { linkedin: String, twitter: String, github: String, website: String },
    order: { type: Number, default: 0 },
    status: { type: String, enum: STATUSES, default: "draft", index: true },
  },
  { timestamps: true },
);
export const TeamMember = model("TeamMember", TeamMemberSchema);

const MediaSchema = new Schema(
  {
    filename: { type: String, required: true, trim: true },
    originalName: { type: String, trim: true },
    url: { type: String, required: true, trim: true },
    provider: { type: String, enum: ["local", "cloudinary", "external"], default: "local" },
    storageKey: { type: String, trim: true },
    mimeType: { type: String, required: true },
    size: { type: Number, default: 0 },
    width: Number,
    height: Number,
    alt: { type: String, trim: true, maxlength: 300 },
    title: { type: String, trim: true, maxlength: 200 },
    folder: { type: String, trim: true, default: "general", index: true },
    /** Public assets that already live in frontend/public (registered, not uploaded). */
    isFrontendAsset: { type: Boolean, default: false },
    /** Private uploads (e.g. CVs) are never listed publicly. */
    private: { type: Boolean, default: false },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true },
);
MediaSchema.index({ filename: "text", title: "text", alt: "text" });
MediaSchema.index({ url: 1 }, { unique: true });
export const Media = model("Media", MediaSchema);

/** Recursive navigation tree. */
const NavItemSchema = new Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 120 },
    href: { type: String, trim: true, maxlength: 500, default: "" },
    description: { type: String, trim: true, maxlength: 200 },
    icon: { type: String, trim: true, maxlength: 60 },
    badge: { type: String, trim: true, maxlength: 20 },
    accent: { type: String, trim: true, maxlength: 20 },
    external: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
  },
  { _id: true },
);
NavItemSchema.add({ children: [NavItemSchema] });

const NavigationSchema = new Schema(
  {
    /** "header" | "services" (mega menu) | "footer" | "footer-bottom" ... */
    key: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    items: [NavItemSchema],
  },
  { timestamps: true },
);
export const Navigation = model("Navigation", NavigationSchema);

/* ------------------------------------------------------------------ */
/* Enquiries                                                           */
/* ------------------------------------------------------------------ */

export const LEAD_STATUSES = ["new", "contacted", "in_progress", "qualified", "converted", "not_interested", "closed"] as const;

const LeadSchema = new Schema(
  {
    formType: { type: String, required: true, trim: true, maxlength: 60, index: true },
    source: { type: String, trim: true, maxlength: 200, index: true },
    sourceUrl: { type: String, trim: true, maxlength: 500 },
    name: { type: String, trim: true, maxlength: 160 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255, index: true },
    phone: { type: String, trim: true, maxlength: 30 },
    company: { type: String, trim: true, maxlength: 200 },
    website: { type: String, trim: true, maxlength: 300 },
    service: { type: String, trim: true, maxlength: 160 },
    budget: { type: String, trim: true, maxlength: 80 },
    message: { type: String, trim: true, maxlength: 5000 },
    /** Any extra form fields, stored verbatim (strings only). */
    details: { type: Map, of: String },
    utm: { source: String, medium: String, campaign: String, term: String, content: String },
    status: { type: String, enum: LEAD_STATUSES, default: "new", index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "AdminUser", index: true },
    notes: [NoteSchema],
    ipHash: { type: String, select: false },
    userAgent: { type: String, maxlength: 400 },
  },
  { timestamps: true },
);
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ name: "text", email: "text", message: "text", company: "text" });
export const Lead = model("Lead", LeadSchema);

const ProposalSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 100 },
    lastName: { type: String, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 255, index: true },
    phone: { type: String, trim: true, maxlength: 30 },
    location: { type: String, trim: true, maxlength: 150 },
    message: { type: String, trim: true, maxlength: 2000 },
    source: { type: String, trim: true, maxlength: 200 },
    utm: { source: String, medium: String, campaign: String, term: String, content: String },
    status: { type: String, enum: LEAD_STATUSES, default: "new", index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    notes: [NoteSchema],
    ipHash: { type: String, select: false },
  },
  { timestamps: true },
);
ProposalSchema.index({ createdAt: -1 });
export const Proposal = model("Proposal", ProposalSchema);

/** Kept for compatibility with the old Express /api/tasks endpoint. */
const TaskSchema = new Schema(
  { title: { type: String, required: true, trim: true, maxlength: 255 }, status: { type: String, trim: true, maxlength: 50, default: "pending" } },
  { timestamps: true },
);
export const Task = model("Task", TaskSchema);

/* ------------------------------------------------------------------ */
/* Settings & audit                                                    */
/* ------------------------------------------------------------------ */

const WebsiteSettingsSchema = new Schema(
  {
    key: { type: String, default: "global", unique: true },
    siteName: { type: String, trim: true, default: "ProManage IT Solution" },
    tagline: { type: String, trim: true },
    logo: String,
    footerLogo: String,
    favicon: String,
    contactEmail: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    address: { type: String, trim: true },
    shortLocation: { type: String, trim: true },
    workingHours: { type: String, trim: true },
    socials: { linkedin: String, instagram: String, facebook: String, youtube: String, twitter: String },
    /** Any number of social profiles (Settings -> Social); replaces the fixed `socials` fields above. */
    socialLinks: [{ _id: false, platform: String, url: String, label: String }],
    headerCta: { type: LinkSchema, default: {} },
    topBar: {
      phone: String,
      email: String,
      location: String,
      onlineText: String,
      ratingText: String,
      consultationText: String,
      chatLabel: String,
      chatHref: String,
    },
    footer: {
      headline: String, accent: String, description: String, copyright: String, madeIn: String, googleRating: String, reviewsText: String,
      ctaTitle: String, ctaText: String, ctaLabel: String, ctaHref: String,
      trustedText: String, trustedAccent: String,
      stats: [{ _id: false, value: String, label: String }],
    },
    /** Client logos shown in the footer's "Trusted by" strip. */
    clientLogos: [{ _id: false, name: String, image: String }],
    defaultSeo: {
      title: String,
      titleTemplate: String,
      description: String,
      ogImage: String,
    },
    analytics: { googleAnalyticsId: String, googleTagManagerId: String, metaPixelId: String },
    notificationEmails: [{ type: String, trim: true, lowercase: true }],
  },
  { timestamps: true },
);
export const WebsiteSettings = model("WebsiteSettings", WebsiteSettingsSchema);

/** Outgoing email (SMTP) and who receives website enquiries. The password is stored encrypted and never returned by the API. */
const MailSettingsSchema = new Schema(
  {
    key: { type: String, default: "smtp", unique: true },
    enabled: { type: Boolean, default: false },
    host: { type: String, trim: true },
    port: { type: Number, default: 587 },
    encryption: { type: String, enum: ["tls", "ssl", "none"], default: "tls" },
    username: { type: String, trim: true },
    passwordEnc: { type: String, select: false },
    fromName: { type: String, trim: true },
    fromEmail: { type: String, trim: true, lowercase: true },
    replyTo: { type: String, trim: true, lowercase: true },
    to: [{ type: String, trim: true, lowercase: true }],
    cc: [{ type: String, trim: true, lowercase: true }],
    bcc: [{ type: String, trim: true, lowercase: true }],
    subjectPrefix: { type: String, trim: true },
    events: {
      leads: { type: Boolean, default: true },
      proposals: { type: Boolean, default: true },
      applications: { type: Boolean, default: true },
    },
    autoReply: {
      enabled: { type: Boolean, default: false },
      subject: { type: String, trim: true },
      body: { type: String, trim: true },
    },
    lastTest: { at: Date, ok: Boolean, message: String, by: String },
  },
  { timestamps: true },
);
export const MailSettings = model("MailSettings", MailSettingsSchema);

const ActivityLogSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "AdminUser", index: true },
    userName: String,
    action: { type: String, required: true, trim: true, maxlength: 60 },
    entity: { type: String, required: true, trim: true, maxlength: 60, index: true },
    entityId: String,
    summary: { type: String, trim: true, maxlength: 500 },
    ip: String,
    /** "City, Region, Country" from the hosting provider's geo headers (empty when unknown / local). */
    location: String,
    /** "Chrome on Windows" etc. */
    device: String,
    /** Admin page the user opened (action "view"). */
    path: String,
    /** What changed: field label + value before and after (trimmed). */
    changes: [{ _id: false, field: String, before: String, after: String }],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);
ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ user: 1, createdAt: -1 });
export const ActivityLog = model("ActivityLog", ActivityLogSchema);

export type LeadDoc = InferSchemaType<typeof LeadSchema>;
export type PageDoc = InferSchemaType<typeof PageSchema>;
export { LinkSchema };
