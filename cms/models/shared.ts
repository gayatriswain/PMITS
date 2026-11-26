import { Schema } from "mongoose";

export const STATUSES = ["draft", "published"] as const;
export type PublishStatus = (typeof STATUSES)[number];

/** SEO block embedded in every public document (pages, services, blogs, portfolio...). */
export const SeoSchema = new Schema(
  {
    title: { type: String, trim: true, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 320 },
    canonical: { type: String, trim: true, maxlength: 500 },
    robotsIndex: { type: Boolean, default: true },
    robotsFollow: { type: Boolean, default: true },
    ogTitle: { type: String, trim: true, maxlength: 160 },
    ogDescription: { type: String, trim: true, maxlength: 320 },
    ogImage: { type: String, trim: true, maxlength: 500 },
    twitterCard: { type: String, enum: ["summary", "summary_large_image"], default: "summary_large_image" },
    /** Raw JSON-LD (validated as JSON before saving). */
    jsonLd: { type: String, maxlength: 20000 },
    faqSchema: { type: Boolean, default: false },
    breadcrumbs: [{ _id: false, label: { type: String, trim: true }, href: { type: String, trim: true } }],
  },
  { _id: false },
);

export const LinkSchema = new Schema(
  { label: { type: String, trim: true, maxlength: 120 }, href: { type: String, trim: true, maxlength: 500 } },
  { _id: false },
);

export const FaqSchema = new Schema(
  { question: { type: String, trim: true, required: true, maxlength: 300 }, answer: { type: String, trim: true, required: true, maxlength: 4000 } },
  { _id: false },
);

export const NoteSchema = new Schema(
  {
    body: { type: String, trim: true, required: true, maxlength: 4000 },
    author: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    authorName: { type: String, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const slugField = {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  maxlength: 200,
  match: [/^[a-z0-9]+(?:[-/][a-z0-9]+)*$/, "Use lowercase letters, numbers, hyphens (and / for nested paths)"] as [RegExp, string],
};
