import "server-only";
import { createHash } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Blog, Career, Media, Page, PageSection, Portfolio, Service, TeamMember, Testimonial, WebsiteSettings } from "@/models";
import { HttpError, escapeRegex, listParams } from "@/lib/api";
import { env } from "@/lib/env";
import { randomToken } from "@/lib/security";
import { logActivity } from "@/lib/activity";
import { mediaUpdateSchema } from "@/lib/validation/schemas";
import type { SessionUser } from "@/lib/auth";

const IMAGE_MAX = 8 * 1024 * 1024;
const DOC_MAX = 10 * 1024 * 1024;

/** Detect the real type from the first bytes - never trust the browser-provided MIME or extension. */
function sniff(buf: Buffer): { mime: string; ext: string; kind: "image" | "document" } | null {
  const hex = buf.subarray(0, 12).toString("hex");
  if (hex.startsWith("ffd8ff")) return { mime: "image/jpeg", ext: "jpg", kind: "image" };
  if (hex.startsWith("89504e470d0a1a0a")) return { mime: "image/png", ext: "png", kind: "image" };
  if (hex.startsWith("47494638")) return { mime: "image/gif", ext: "gif", kind: "image" };
  if (buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return { mime: "image/webp", ext: "webp", kind: "image" };
  if (buf.subarray(4, 12).toString() === "ftypavif") return { mime: "image/avif", ext: "avif", kind: "image" };
  if (buf.subarray(0, 5).toString() === "%PDF-") return { mime: "application/pdf", ext: "pdf", kind: "document" };
  // .docx is a zip; accepted only together with the right extension (checked by caller).
  if (hex.startsWith("504b0304")) return { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", ext: "docx", kind: "document" };
  const head = buf.subarray(0, 512).toString("utf8").trimStart().toLowerCase();
  if (head.startsWith("<svg") || (head.startsWith("<?xml") && head.includes("<svg"))) return { mime: "image/svg+xml", ext: "svg", kind: "image" };
  return null;
}

function assertSafeSvg(buf: Buffer) {
  const s = buf.toString("utf8").toLowerCase();
  if (/<script|on[a-z]+\s*=|javascript:|<foreignobject|<iframe|<embed|<object/.test(s)) {
    throw new HttpError(422, "This SVG contains scripts or embedded content and was rejected.");
  }
}

/* ---------------- storage adapters ---------------- */

/** Public files go to ./public/uploads (served as static files); private ones to ./storage/private. */
async function storeLocal(buf: Buffer, ext: string, folder: string, privateFile = false) {
  const d = new Date();
  const name = `${folder}-${randomToken(9)}.${ext}`;
  const sub = path.posix.join(String(d.getFullYear()), String(d.getMonth() + 1).padStart(2, "0"), name);
  if (privateFile) {
    const rel = path.posix.join("private", sub);
    const abs = path.join(process.cwd(), "storage", rel);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, buf);
    return { url: "", storageKey: rel, provider: "local" as const };
  }
  const rel = path.posix.join("uploads", sub);
  const abs = path.join(process.cwd(), "public", rel);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, buf);
  return { url: `${env.appUrl}/${rel}`, storageKey: rel, provider: "local" as const };
}

export function privateFilePath(storageKey: string) {
  if (!/^private\/[0-9]{4}\/[0-9]{2}\/[a-z0-9-]+-[A-Za-z0-9_-]+\.[a-z]{2,4}$/.test(storageKey)) return null;
  return path.join(process.cwd(), "storage", storageKey);
}

async function storeCloudinary(buf: Buffer, mime: string, folder: string) {
  const { cloudName, apiKey, apiSecret } = env.cloudinary;
  if (!cloudName || !apiKey || !apiSecret) throw new HttpError(500, "Cloudinary is selected but CLOUDINARY_* variables are missing.");
  const timestamp = Math.floor(Date.now() / 1000);
  const params = `folder=promanage/${folder}&timestamp=${timestamp}`;
  const signature = createHash("sha1").update(params + apiSecret).digest("hex");
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(buf)], { type: mime }));
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", `promanage/${folder}`);
  form.append("signature", signature);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, { method: "POST", body: form });
  const json = (await res.json()) as { secure_url?: string; public_id?: string; resource_type?: string; error?: { message: string } };
  if (!res.ok || !json.secure_url) throw new HttpError(502, `Upload to Cloudinary failed: ${json.error?.message ?? res.status}`);
  return { url: json.secure_url, storageKey: `${json.resource_type}:${json.public_id}`, provider: "cloudinary" as const };
}

async function removeStored(doc: { provider?: string | null; storageKey?: string | null }) {
  try {
    if (doc.provider === "local" && doc.storageKey && doc.storageKey.startsWith("uploads/")) {
      await unlink(path.join(process.cwd(), "public", doc.storageKey));
    } else if (doc.provider === "local" && doc.storageKey && doc.storageKey.startsWith("private/")) {
      const p = privateFilePath(doc.storageKey);
      if (p) await unlink(p);
    } else if (doc.provider === "cloudinary" && doc.storageKey) {
      const { cloudName, apiKey, apiSecret } = env.cloudinary;
      const [type, publicId] = doc.storageKey.split(":");
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = createHash("sha1").update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`).digest("hex");
      const form = new FormData();
      form.append("public_id", publicId);
      form.append("api_key", apiKey);
      form.append("timestamp", String(timestamp));
      form.append("signature", signature);
      await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type || "image"}/destroy`, { method: "POST", body: form });
    }
  } catch (err) {
    console.warn("[media] could not remove stored file", (err as Error).message);
  }
}

/* ---------------- service ---------------- */

export async function uploadMedia(user: SessionUser | null, file: File, opts: { folder?: string; alt?: string; title?: string; privateFile?: boolean; documentsOnly?: boolean }) {
  if (!file || typeof file.arrayBuffer !== "function") throw new HttpError(422, "No file received");
  const buf = Buffer.from(await file.arrayBuffer());
  const type = sniff(buf);
  if (!type) throw new HttpError(415, "Unsupported file. Upload JPG, PNG, WebP, AVIF, GIF, SVG, PDF or DOCX.");
  const origExt = path.extname(file.name || "").toLowerCase().replace(".", "");
  if (type.ext === "docx" && origExt !== "docx") throw new HttpError(415, "Unsupported file type.");
  if (opts.documentsOnly && type.kind !== "document") throw new HttpError(415, "Please upload a PDF or DOCX file.");
  if (type.kind === "image" && buf.length > IMAGE_MAX) throw new HttpError(413, "Images must be 8 MB or smaller.");
  if (type.kind === "document" && buf.length > DOC_MAX) throw new HttpError(413, "Documents must be 10 MB or smaller.");
  if (type.ext === "svg") assertSafeSvg(buf);
  const folder = (opts.folder || (type.kind === "image" ? "images" : "documents")).replace(/[^a-z0-9-]/gi, "").slice(0, 40) || "general";

  // Private files (CVs) are always kept out of the public CDN folder listing.
  const stored = env.mediaProvider === "cloudinary" && !opts.privateFile ? await storeCloudinary(buf, type.mime, folder) : await storeLocal(buf, type.ext, folder, opts.privateFile);
  await connectDB();
  const id = new Media()._id;
  if (opts.privateFile) stored.url = `${env.appUrl}/api/admin/files/${id}`;
  const doc = await Media.create({
    _id: id,
    filename: path.basename(stored.storageKey.split(":").pop() || ""),
    originalName: (file.name || "").slice(0, 200),
    url: stored.url,
    provider: stored.provider,
    storageKey: stored.storageKey,
    mimeType: type.mime,
    size: buf.length,
    alt: opts.alt?.slice(0, 300),
    title: (opts.title || file.name || "").slice(0, 200),
    folder,
    private: Boolean(opts.privateFile),
    uploadedBy: user?.id,
  });
  if (user) logActivity(user, "upload", "media", String(doc._id), `Uploaded ${doc.originalName}`);
  return doc.toObject();
}

export async function listMedia(url: URL) {
  await connectDB();
  const { page, limit, skip, q } = listParams(url, { limit: 40 });
  const filter: Record<string, unknown> = { private: { $ne: true } };
  if (q) filter.$or = ["filename", "originalName", "title", "alt", "url"].map((f) => ({ [f]: { $regex: escapeRegex(q), $options: "i" } }));
  const type = url.searchParams.get("type");
  if (type === "image") filter.mimeType = { $regex: "^image/" };
  if (type === "document") filter.mimeType = { $not: { $regex: "^image/" } };
  const folder = url.searchParams.get("folder");
  if (folder && /^[a-z0-9-]{1,40}$/i.test(folder)) filter.folder = folder;
  const source = url.searchParams.get("source");
  if (source === "website") filter.isFrontendAsset = true;
  if (source === "uploads") filter.isFrontendAsset = { $ne: true };
  const [items, total, folders] = await Promise.all([
    Media.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Media.countDocuments(filter),
    Media.distinct("folder", { private: { $ne: true } }),
  ]);
  return { items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)), folders };
}

export async function updateMedia(user: SessionUser, id: string, body: unknown) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const data = mediaUpdateSchema.parse(body);
  const doc = await Media.findByIdAndUpdate(id, { $set: data }, { new: true }).lean();
  if (!doc) throw new HttpError(404, "File not found");
  logActivity(user, "update", "media", id, `Updated details of ${doc.originalName ?? doc.filename}`);
  return doc;
}

/** Where is this URL used? Checked before deleting so live pages never lose an image. */
export async function findMediaUsage(urlValue: string) {
  await connectDB();
  const rel = urlValue.replace(env.appUrl, "");
  const needles = [...new Set([urlValue, rel])];
  const rx = { $in: needles };
  const uses: string[] = [];
  const add = (label: string, list: { _id: unknown; [k: string]: unknown }[], name: string) => list.forEach((d) => uses.push(`${label}: ${String(d[name] ?? d._id)}`));
  add("Service", await Service.find({ $or: [{ featuredImage: rx }, { bannerImage: rx }] }, "name").lean(), "name");
  add("Blog", await Blog.find({ $or: [{ featuredImage: rx }, { "seo.ogImage": rx }] }, "title").lean(), "title");
  add("Portfolio", await Portfolio.find({ $or: [{ featuredImage: rx }, { gallery: rx }] }, "name").lean(), "name");
  add("Testimonial", await Testimonial.find({ image: rx }, "clientName").lean(), "clientName");
  add("Team", await TeamMember.find({ image: rx }, "name").lean(), "name");
  add("Page", await Page.find({ $or: [{ featuredImage: rx }, { "seo.ogImage": rx }] }, "path").lean(), "path");
  add("Career", await Career.find({ description: { $regex: escapeRegex(rel) } }, "title").lean(), "title");
  const s = await WebsiteSettings.findOne({ key: "global" }).lean();
  if (s && needles.some((n) => [s.logo, s.footerLogo, s.favicon, s.defaultSeo?.ogImage].includes(n))) uses.push("Website settings");
  // Section content is free-form: scan its JSON.
  const sections = await PageSection.find({}, "page key content draftContent").populate("page", "path").lean();
  for (const sec of sections) {
    const json = JSON.stringify([sec.content, sec.draftContent]);
    if (needles.some((n) => json.includes(n))) uses.push(`Section "${sec.key}" on ${(sec.page as { path?: string } | null)?.path ?? "page"}`);
  }
  const blogs = await Blog.find({ content: { $regex: escapeRegex(rel) } }, "title").lean();
  add("Blog body", blogs, "title");
  return uses;
}

export async function deleteMedia(user: SessionUser, id: string, force = false) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await Media.findById(id).lean();
  if (!doc) throw new HttpError(404, "File not found");
  if (doc.isFrontendAsset) throw new HttpError(422, "This image is part of the website code (frontend/public) and cannot be deleted here.");
  const uses = await findMediaUsage(doc.url);
  if (uses.length && !force) throw new HttpError(409, "This file is still in use.", { usage: uses });
  await removeStored(doc);
  await Media.deleteOne({ _id: doc._id });
  logActivity(user, "delete", "media", id, `Deleted ${doc.originalName ?? doc.filename}`);
  return { id };
}
