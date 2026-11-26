import "server-only";
import type { Model } from "mongoose";
import type { ZodType } from "zod";
import { Blog, BlogCategory, Career, Portfolio, Service, TeamMember, Testimonial } from "@/models";
import {
  blogCategorySchema,
  blogSchema,
  careerSchema,
  portfolioSchema,
  serviceSchema,
  teamSchema,
  testimonialSchema,
} from "@/lib/validation/schemas";
import type { Permission } from "@/lib/permissions";
import { readingTimeMinutes, sanitizeRichText } from "@/lib/sanitize";
import { tags } from "@/lib/revalidate";
import { beforeCategoryDelete, withDefaultCategory } from "@/lib/services/blogCategories";
import { HttpError } from "@/lib/api";

type Doc = Record<string, unknown>;

export type ResourceConfig = {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: Model<any>;
  schema: ZodType;
  search: string[];
  filters: string[];
  defaultSort: string;
  perms: { read: Permission; write: Permission; publish: Permission; delete: Permission };
  /** Field that, when changed to the public value, counts as publishing. */
  statusField?: string;
  publicStatuses?: string[];
  prepare?: (data: Doc, existing?: Doc | null) => Doc;
  /** Async step after `prepare` (e.g. database lookups). */
  prepareAsync?: (data: Doc) => Promise<Doc>;
  /** Runs before deleting; throw an HttpError to refuse. */
  beforeDelete?: (id: string) => Promise<void>;
  revalidate: (doc: Doc) => string[];
  publicPath?: (doc: Doc) => string | null;
};

const content = { read: "content.read", write: "content.write", publish: "content.publish", delete: "content.delete" } as const;

export const RESOURCES: Record<string, ResourceConfig> = {
  services: {
    name: "services",
    label: "Services",
    model: Service,
    schema: serviceSchema,
    search: ["name", "slug", "shortDescription"],
    filters: ["status", "category"],
    defaultSort: "order",
    perms: content,
    statusField: "status",
    publicStatuses: ["published"],
    prepare: (d) => ({ ...d, description: sanitizeRichText(d.description as string) }),
    revalidate: (d) => [tags.collection("services"), tags.item("services", String(d.slug)), tags.nav("services"), tags.sitemap],
    publicPath: (d) => (d.pagePath as string) || null,
  },
  blogs: {
    name: "blogs",
    label: "Blogs",
    model: Blog,
    schema: blogSchema,
    search: ["title", "slug", "excerpt", "author"],
    filters: ["status", "categories", "featured"],
    defaultSort: "-publishedAt",
    perms: content,
    statusField: "status",
    publicStatuses: ["published"],
    prepare: (d) => {
      const html = sanitizeRichText(d.content as string);
      const out: Doc = { ...d, content: html, readingTime: (d.readingTime as number) || readingTimeMinutes(html) };
      // A published post opens as its own page, so it needs an article body (otherwise visitors land on an empty page).
      if (out.status === "published" && !html.replace(/<[^>]*>/g, "").trim()) {
        throw new HttpError(422, "Add the article content before publishing (or keep it as a draft).", { content: "Required to publish" });
      }
      if (out.status === "published" && !out.publishedAt) out.publishedAt = new Date();
      return out;
    },
    // a post always has a category: none chosen -> "Uncategorized"
    prepareAsync: (d) => withDefaultCategory(d),
    revalidate: (d) => [tags.collection("blogs"), tags.item("blogs", String(d.slug)), tags.page("/blog"), tags.sitemap],
    publicPath: (d) => `/blog/${d.slug}`,
  },
  "blog-categories": {
    name: "blog-categories",
    label: "Blog categories",
    model: BlogCategory,
    schema: blogCategorySchema,
    search: ["name", "slug"],
    filters: [],
    defaultSort: "order",
    perms: content,
    // the default category can't be deleted; a deleted category's posts move to it
    beforeDelete: beforeCategoryDelete,
    revalidate: () => [tags.collection("blogs"), tags.collection("blog-categories"), tags.page("/blog"), tags.sitemap],
  },
  testimonials: {
    name: "testimonials",
    label: "Testimonials",
    model: Testimonial,
    schema: testimonialSchema,
    search: ["clientName", "company", "content"],
    filters: ["status", "featured"],
    defaultSort: "order",
    perms: content,
    statusField: "status",
    publicStatuses: ["published"],
    revalidate: () => [tags.collection("testimonials"), tags.page("/testimonials"), tags.page("/")],
  },
  portfolio: {
    name: "portfolio",
    label: "Portfolio",
    model: Portfolio,
    schema: portfolioSchema,
    search: ["name", "client", "category"],
    filters: ["status", "category", "featured"],
    defaultSort: "order",
    perms: content,
    statusField: "status",
    publicStatuses: ["published"],
    prepare: (d) => ({ ...d, description: sanitizeRichText(d.description as string) }),
    revalidate: (d) => [tags.collection("portfolio"), tags.item("portfolio", String(d.slug)), tags.sitemap],
    publicPath: (d) => `/portfolio/${d.slug}`,
  },
  careers: {
    name: "careers",
    label: "Careers",
    model: Career,
    schema: careerSchema,
    search: ["title", "department", "location"],
    filters: ["status", "department", "employmentType"],
    defaultSort: "order",
    perms: content,
    statusField: "status",
    publicStatuses: ["open"],
    prepare: (d) => ({ ...d, description: sanitizeRichText(d.description as string) }),
    revalidate: () => [tags.collection("careers"), tags.page("/career")],
  },
  team: {
    name: "team",
    label: "Team",
    model: TeamMember,
    schema: teamSchema,
    search: ["name", "designation"],
    filters: ["status"],
    defaultSort: "order",
    perms: content,
    statusField: "status",
    publicStatuses: ["published"],
    revalidate: () => [tags.collection("team")],
  },
};

export function getResource(name: string): ResourceConfig | null {
  return Object.prototype.hasOwnProperty.call(RESOURCES, name) ? RESOURCES[name] : null;
}
