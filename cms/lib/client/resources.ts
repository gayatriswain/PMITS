import type { FieldDef } from "@/components/admin/fields";

/** ref: the cell holds ids of another resource, shown by name (e.g. blog categories). */
export type Column = { key: string; label: string; kind?: "text" | "status" | "date" | "image" | "bool" | "list" | "refs"; className?: string; ref?: { resource: string; labelKey: string } };
/** A list filter; `from` loads its options from another resource (value = id). */
export type Filter = { key: string; label: string; options: { value: string; label: string }[]; from?: { resource: string; labelKey: string } };
export type ResourceUI = {
  name: string;
  label: string;
  singular: string;
  description: string;
  titleKey: string;
  columns: Column[];
  filters?: Filter[];
  fields: FieldDef[];
  /** Sidebar of the edit form (status, ordering...). */
  side: FieldDef[];
  defaults: Record<string, unknown>;
  viewUrl?: (d: Record<string, unknown>) => string | null;
  /** Convert between the API shape and the form shape when they differ. */
  toForm?: (d: Record<string, unknown>) => Record<string, unknown>;
  toApi?: (d: Record<string, unknown>) => Record<string, unknown>;
};

const status = (opts = ["draft", "published"]): FieldDef => ({
  name: "status",
  label: "Status",
  type: "select",
  required: true,
  options: opts.map((o) => ({ value: o, label: o[0].toUpperCase() + o.slice(1) })),
});
const order: FieldDef = { name: "order", label: "Display order", type: "number", help: "Lower numbers show first." };
const seo: FieldDef = { name: "seo", label: "SEO", type: "seo" };
const statusFilter = (opts = ["draft", "published"]) => ({ key: "status", label: "Status", options: [{ value: "", label: "All statuses" }, ...opts.map((o) => ({ value: o, label: o[0].toUpperCase() + o.slice(1) }))] });

const SERVICE_CATS = [
  { value: "web-and-software", label: "Web & Software" },
  { value: "design-and-innovation", label: "Design & Innovation" },
  { value: "marketing-and-growth", label: "Marketing & Growth" },
  { value: "hire-developers", label: "Hire Developers" },
];

export const RESOURCE_UI: Record<string, ResourceUI> = {
  services: {
    name: "services",
    label: "Services",
    singular: "service",
    description: "Every service the company offers, with its benefits, process, FAQs and SEO.",
    titleKey: "name",
    columns: [
      { key: "name", label: "Service" },
      { key: "category", label: "Category" },
      { key: "pagePath", label: "Page URL", className: "font-mono text-xs" },
      { key: "order", label: "Order" },
      { key: "status", label: "Status", kind: "status" },
    ],
    filters: [statusFilter(), { key: "category", label: "Category", options: [{ value: "", label: "All categories" }, ...SERVICE_CATS] }],
    fields: [
      { name: "name", label: "Service name", type: "text", required: true, max: 160, half: true },
      { name: "slug", label: "Slug", type: "slug", from: "name", required: true, half: true },
      { name: "shortDescription", label: "Short description", type: "textarea", max: 500, help: "Shown in menus and cards." },
      { name: "description", label: "Full description", type: "richtext" },
      { name: "featuredImage", label: "Featured image", type: "image" },
      { name: "bannerImage", label: "Banner image", type: "image" },
      { name: "benefits", label: "Benefits", type: "textlist" },
      { name: "features", label: "Features", type: "list", fields: [{ name: "title", label: "Title", type: "text", max: 160 }, { name: "description", label: "Description", type: "textarea", max: 1000 }, { name: "icon", label: "Icon name (lucide)", type: "text", max: 60 }] },
      { name: "process", label: "Process steps", type: "list", fields: [{ name: "title", label: "Step", type: "text", max: 160 }, { name: "description", label: "Description", type: "textarea", max: 1000 }] },
      { name: "technologies", label: "Technologies", type: "tags" },
      { name: "faqs", label: "FAQs", type: "list", fields: [{ name: "question", label: "Question", type: "text", max: 300 }, { name: "answer", label: "Answer", type: "textarea", max: 4000 }] },
      seo,
    ],
    side: [
      status(),
      { name: "category", label: "Category", type: "select", options: SERVICE_CATS },
      { name: "pagePath", label: "Page URL", type: "url", placeholder: "/marketing-growth/local-seo" },
      { name: "icon", label: "Menu icon (lucide name)", type: "text", max: 60, placeholder: "Globe" },
      { name: "badge", label: "Badge", type: "text", max: 20, placeholder: "New" },
      order,
      { name: "relatedServices", label: "Related services", type: "relation", relation: { resource: "services", labelKey: "name", multiple: true } },
    ],
    defaults: { status: "draft", order: 0, benefits: [], features: [], process: [], technologies: [], faqs: [], relatedServices: [], seo: { robotsIndex: true, robotsFollow: true } },
    viewUrl: (d) => (d.pagePath as string) || null,
  },
  blogs: {
    name: "blogs",
    label: "Blogs",
    singular: "blog post",
    description: "Articles for the blog. Drafts and scheduled posts are not visible on the website.",
    titleKey: "title",
    columns: [
      { key: "featuredImage", label: "", kind: "image" },
      { key: "title", label: "Post" },
      { key: "categories", label: "Categories", kind: "refs", ref: { resource: "blog-categories", labelKey: "name" } },
      { key: "author", label: "Author" },
      { key: "publishedAt", label: "Publish date", kind: "date" },
      { key: "status", label: "Status", kind: "status" },
    ],
    filters: [
      statusFilter(["draft", "scheduled", "published"]),
      { key: "categories", label: "Category", options: [{ value: "", label: "All categories" }], from: { resource: "blog-categories", labelKey: "name" } },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true, max: 250 },
      { name: "slug", label: "Slug", type: "slug", from: "title", required: true, help: "The post URL becomes /blog/your-slug" },
      { name: "excerpt", label: "Excerpt", type: "textarea", max: 600, help: "Short summary for cards and search results." },
      { name: "content", label: "Content", type: "richtext", placeholder: "Start writing…" },
      seo,
    ],
    side: [
      status(["draft", "scheduled", "published"]),
      { name: "publishedAt", label: "Publish date", type: "datetime", help: "For scheduled posts, the time it goes live." },
      { name: "featuredImage", label: "Featured image", type: "image" },
      { name: "categories", label: "Categories", type: "relation", relation: { resource: "blog-categories", labelKey: "name", multiple: true } },
      { name: "tags", label: "Tags", type: "tags" },
      { name: "author", label: "Author", type: "text", max: 120 },
      { name: "readingTime", label: "Reading time (min)", type: "number", help: "Leave empty to calculate automatically." },
      { name: "featured", label: "Featured post", type: "boolean" },
      { name: "schemaType", label: "Schema type", type: "select", required: true, options: ["BlogPosting", "Article", "NewsArticle", "HowTo"].map((v) => ({ value: v, label: v })) },
      { name: "relatedBlogs", label: "Related posts", type: "relation", relation: { resource: "blogs", labelKey: "title", multiple: true } },
    ],
    defaults: { status: "draft", content: "", tags: [], categories: [], relatedBlogs: [], schemaType: "BlogPosting", featured: false, seo: { robotsIndex: true, robotsFollow: true } },
    viewUrl: (d) => (d.status === "published" ? `/blog/${d.slug}` : null),
  },
  "blog-categories": {
    name: "blog-categories",
    label: "Blog categories",
    singular: "category",
    description: "Categories used to group blog posts.",
    titleKey: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "slug", label: "Slug", className: "font-mono text-xs" },
      { key: "order", label: "Order" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 120, half: true },
      { name: "slug", label: "Slug", type: "slug", from: "name", required: true, half: true },
      { name: "description", label: "Description", type: "textarea", max: 1000 },
    ],
    side: [order],
    defaults: { order: 0 },
  },
  testimonials: {
    name: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    description: "Client reviews. Only publish real, approved testimonials.",
    titleKey: "clientName",
    columns: [
      { key: "image", label: "", kind: "image" },
      { key: "clientName", label: "Client" },
      { key: "company", label: "Company" },
      { key: "rating", label: "Rating" },
      { key: "featured", label: "Featured", kind: "bool" },
      { key: "status", label: "Status", kind: "status" },
    ],
    filters: [statusFilter()],
    fields: [
      { name: "clientName", label: "Client name", type: "text", required: true, max: 120, half: true },
      { name: "designation", label: "Designation", type: "text", max: 120, half: true },
      { name: "company", label: "Company", type: "text", max: 160, half: true },
      { name: "service", label: "Service used", type: "text", max: 120, half: true },
      { name: "content", label: "Testimonial", type: "textarea", required: true, max: 3000 },
      { name: "image", label: "Photo", type: "image" },
      { name: "videoUrl", label: "Video URL", type: "url", placeholder: "https://…" },
    ],
    side: [status(), { name: "rating", label: "Rating", type: "select", required: true, options: [5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} star${n > 1 ? "s" : ""}` })) }, { name: "featured", label: "Featured", type: "boolean" }, order],
    defaults: { status: "draft", rating: "5", order: 0, featured: false },
  },
  portfolio: {
    name: "portfolio",
    label: "Portfolio",
    singular: "project",
    description: "Case studies and projects.",
    titleKey: "name",
    columns: [
      { key: "featuredImage", label: "", kind: "image" },
      { key: "name", label: "Project" },
      { key: "client", label: "Client" },
      { key: "category", label: "Category" },
      { key: "status", label: "Status", kind: "status" },
    ],
    filters: [statusFilter()],
    fields: [
      { name: "name", label: "Project name", type: "text", required: true, max: 200, half: true },
      { name: "slug", label: "Slug", type: "slug", from: "name", required: true, half: true },
      { name: "client", label: "Client / company", type: "text", max: 200, half: true },
      { name: "category", label: "Category", type: "text", max: 120, half: true },
      { name: "description", label: "Project description", type: "richtext" },
      { name: "challenge", label: "Challenge", type: "textarea", max: 10000 },
      { name: "solution", label: "Solution", type: "textarea", max: 10000 },
      { name: "results", label: "Results", type: "textarea", max: 10000, help: "Only real, measurable outcomes." },
      { name: "technologies", label: "Technologies", type: "tags" },
      { name: "gallery", label: "Gallery", type: "list", maxItems: 40, fields: [{ name: "url", label: "Image", type: "image" }] },
      seo,
    ],
    side: [status(), { name: "featuredImage", label: "Featured image", type: "image" }, { name: "projectUrl", label: "Live project URL", type: "url" }, { name: "featured", label: "Featured", type: "boolean" }, order],
    defaults: { status: "draft", order: 0, technologies: [], gallery: [], featured: false, seo: { robotsIndex: true, robotsFollow: true } },
    toForm: (d) => ({ ...d, gallery: ((d.gallery as string[]) ?? []).map((url) => ({ url })) }),
    toApi: (d) => ({ ...d, gallery: ((d.gallery as { url?: string }[]) ?? []).map((g) => g.url).filter(Boolean) }),
  },
  careers: {
    name: "careers",
    label: "Careers",
    singular: "job opening",
    description: "Open positions shown on the Career page. Applications appear under Job applications.",
    titleKey: "title",
    columns: [
      { key: "title", label: "Job title" },
      { key: "department", label: "Department" },
      { key: "location", label: "Location" },
      { key: "employmentType", label: "Type" },
      { key: "status", label: "Status", kind: "status" },
    ],
    filters: [statusFilter(["draft", "open", "closed"])],
    fields: [
      { name: "title", label: "Job title", type: "text", required: true, max: 200, half: true },
      { name: "slug", label: "Slug", type: "slug", from: "title", required: true, half: true },
      { name: "department", label: "Department", type: "text", max: 120, half: true },
      { name: "location", label: "Location", type: "text", max: 160, half: true },
      { name: "experience", label: "Experience", type: "text", max: 80, half: true, placeholder: "2 - 4 Yrs" },
      { name: "salaryRange", label: "Salary range (optional)", type: "text", max: 80, half: true },
      { name: "description", label: "Job description", type: "richtext" },
      { name: "responsibilities", label: "Responsibilities", type: "textlist" },
      { name: "requirements", label: "Requirements", type: "textlist" },
      { name: "benefits", label: "Benefits", type: "textlist" },
    ],
    side: [
      status(["draft", "open", "closed"]),
      { name: "employmentType", label: "Employment type", type: "select", required: true, options: ["full-time", "part-time", "contract", "internship", "remote", "hybrid"].map((v) => ({ value: v, label: v })) },
      { name: "deadline", label: "Application deadline", type: "date" },
      order,
    ],
    defaults: { status: "draft", employmentType: "full-time", order: 0, responsibilities: [], requirements: [], benefits: [] },
  },
  team: {
    name: "team",
    label: "Team",
    singular: "team member",
    description: "Team member profiles.",
    titleKey: "name",
    columns: [
      { key: "image", label: "", kind: "image" },
      { key: "name", label: "Name" },
      { key: "designation", label: "Designation" },
      { key: "order", label: "Order" },
      { key: "status", label: "Status", kind: "status" },
    ],
    filters: [statusFilter()],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, max: 120, half: true },
      { name: "designation", label: "Designation", type: "text", max: 120, half: true },
      { name: "bio", label: "Short bio", type: "textarea", max: 2000 },
      { name: "image", label: "Photo", type: "image" },
      { name: "linkedin", label: "LinkedIn URL", type: "url", half: true },
      { name: "twitter", label: "X / Twitter URL", type: "url", half: true },
      { name: "github", label: "GitHub URL", type: "url", half: true },
      { name: "website", label: "Website", type: "url", half: true },
    ],
    side: [status(), order],
    defaults: { status: "draft", order: 0 },
    toForm: (d) => ({ ...d, ...((d.socials as object) ?? {}) }),
    toApi: ({ linkedin, twitter, github, website, ...d }) => ({ ...d, socials: { linkedin, twitter, github, website } }),
  },
};

export const RESOURCE_NAMES = Object.keys(RESOURCE_UI);
