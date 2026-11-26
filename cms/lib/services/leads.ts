import "server-only";
import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { AdminUser, Lead, Proposal } from "@/models";
import { HttpError, escapeRegex, listParams } from "@/lib/api";
import { leadUpdateSchema } from "@/lib/validation/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp, hmac } from "@/lib/security";
import { logActivity } from "@/lib/activity";
import { notifyTeam } from "@/lib/mailer";
import { env } from "@/lib/env";
import type { SessionUser } from "@/lib/auth";

const EMAIL = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(255);
const PHONE = z.string().trim().regex(/^\+?[0-9\s\-()]{7,20}$/, "Please enter a valid phone number.");
const s = (max: number) => z.string().trim().max(max).optional().or(z.literal("").transform(() => undefined));
const utm = z.object({ source: s(100), medium: s(100), campaign: s(150), term: s(150), content: s(150) }).partial().optional();

/** Generic form submission (new forms). `hp` is the honeypot - real visitors never fill it. */
export const formSchema = z.object({
  formType: z.string().trim().regex(/^[a-z0-9-]{2,60}$/, "Invalid form type"),
  source: s(200),
  sourceUrl: s(500),
  name: s(160),
  email: EMAIL,
  phone: PHONE.optional().or(z.literal("").transform(() => undefined)),
  company: s(200),
  website: s(300),
  service: s(160),
  budget: s(80),
  message: s(5000),
  details: z.record(z.string().regex(/^[a-zA-Z0-9_ -]{1,40}$/), z.string().trim().max(1000)).optional(),
  utm,
  hp: z.string().max(200).optional(),
});

/** Legacy Express contract: { idea, email, source, website(honeypot) } */
const legacyLeadSchema = z.object({
  idea: z.string().trim().min(10, "Please describe your idea in 10–500 characters.").max(500, "Please describe your idea in 10–500 characters."),
  email: EMAIL,
  source: s(100),
  website: z.string().max(200).optional(),
  utm,
});

/** Legacy Express contract for "Get My Free Proposal". */
const legacyProposalSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(100),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(100),
  email: EMAIL,
  phone: PHONE,
  location: z.string().trim().min(1, "Please enter your location.").max(150),
  message: z.string().trim().max(1000, "Please keep this under 1000 characters.").optional(),
  source: s(100),
  website: z.string().max(200).optional(),
  utm,
});

async function guard(req: Request, bucket: string) {
  const ip = clientIp(req);
  // 6 submissions per 10 minutes and 40 per day from one IP.
  await rateLimit(`form:${bucket}:${hmac(ip)}`, 6, 600);
  await rateLimit(`form-day:${hmac(ip)}`, 40, 86400);
  return { ipHash: hmac(ip), userAgent: (req.headers.get("user-agent") || "").slice(0, 400) };
}

const pretty = (k: string) => k.replace(/[-_]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
const utmText = (u?: Record<string, string | undefined>) => (u ? Object.entries(u).filter(([, v]) => v).map(([k, v]) => `${k}=${v}`).join(", ") : "");
const when = () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST";

export async function submitForm(req: Request, body: unknown) {
  const data = formSchema.parse(body);
  if (data.hp) return { id: null, spam: true };
  const meta = await guard(req, data.formType);
  await connectDB();
  const { hp: _hp, ...rest } = data;
  const lead = await Lead.create({ ...rest, ...meta });
  void notifyTeam({
    event: "leads",
    title: `New enquiry: ${pretty(data.formType)}`,
    visitorEmail: data.email,
    visitorName: data.name,
    formName: pretty(data.formType),
    link: `${env.appUrl}/admin/leads/${lead._id}`,
    rows: [
      ["Form", pretty(data.formType)],
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Company", data.company],
      ["Website", data.website],
      ["Service", data.service],
      ["Budget", data.budget],
      ["Message", data.message],
      ...Object.entries(data.details ?? {}).map(([k, v]) => [pretty(k), v] as [string, unknown]),
      ["Page", data.sourceUrl || data.source],
      ["UTM", utmText(data.utm)],
      ["Received", when()],
    ],
  });
  return { id: String(lead._id), spam: false };
}

export async function submitLegacyLead(req: Request, body: unknown) {
  const data = legacyLeadSchema.parse(body);
  if (data.website) return { id: null, spam: true };
  const meta = await guard(req, "legacy-lead");
  await connectDB();
  const lead = await Lead.create({
    formType: data.source || "start-project",
    source: data.source,
    email: data.email,
    message: data.idea,
    utm: data.utm,
    ...meta,
  });
  void notifyTeam({
    event: "leads",
    title: `New enquiry: ${pretty(data.source || "start project")}`,
    visitorEmail: data.email,
    formName: pretty(data.source || "start project"),
    link: `${env.appUrl}/admin/leads/${lead._id}`,
    rows: [["Form", pretty(data.source || "start-project")], ["Email", data.email], ["Idea", data.idea], ["UTM", utmText(data.utm)], ["Received", when()]],
  });
  return { id: String(lead._id), spam: false };
}

export async function submitLegacyProposal(req: Request, body: unknown) {
  const data = legacyProposalSchema.parse(body);
  if (data.website) return { id: null, spam: true };
  const meta = await guard(req, "proposal");
  await connectDB();
  const { website: _w, ...rest } = data;
  const p = await Proposal.create({ ...rest, ipHash: meta.ipHash });
  void notifyTeam({
    event: "proposals",
    title: "New proposal request",
    visitorEmail: data.email,
    visitorName: `${data.firstName} ${data.lastName}`,
    formName: "proposal request",
    link: `${env.appUrl}/admin/proposals/${p._id}`,
    rows: [
      ["Name", `${data.firstName} ${data.lastName}`],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Location", data.location],
      ["Message", data.message],
      ["Page", data.source],
      ["UTM", utmText(data.utm)],
      ["Received", when()],
    ],
  });
  return { id: String(p._id), spam: false };
}

/* ------------------------------ admin ------------------------------ */

type Kind = "leads" | "proposals";
const M = (k: Kind) => (k === "leads" ? Lead : Proposal);

export async function listEnquiries(kind: Kind, url: URL) {
  await connectDB();
  const { page, limit, skip, q } = listParams(url, { limit: 25 });
  const filter: Record<string, unknown> = {};
  if (q) {
    const rx = { $regex: escapeRegex(q), $options: "i" };
    filter.$or = kind === "leads" ? [{ name: rx }, { email: rx }, { company: rx }, { message: rx }, { phone: rx }] : [{ firstName: rx }, { lastName: rx }, { email: rx }, { phone: rx }, { location: rx }];
  }
  const status = url.searchParams.get("status");
  if (status && /^[a-z_]{2,20}$/.test(status)) filter.status = status;
  const formType = url.searchParams.get("formType");
  if (kind === "leads" && formType && /^[a-z0-9-]{2,60}$/.test(formType)) filter.formType = formType;
  const assigned = url.searchParams.get("assignedTo");
  if (assigned && isValidObjectId(assigned)) filter.assignedTo = assigned;
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  if (from || to) {
    const range: Record<string, Date> = {};
    if (from && !Number.isNaN(Date.parse(from))) range.$gte = new Date(from);
    if (to && !Number.isNaN(Date.parse(to))) range.$lte = new Date(new Date(to).getTime() + 86400_000 - 1);
    if (Object.keys(range).length) filter.createdAt = range;
  }
  const model = M(kind);
  const [items, total, formTypes] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (model as any).find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate("assignedTo", "name email").lean(),
    model.countDocuments(filter),
    kind === "leads" ? Lead.distinct("formType") : Promise.resolve([]),
  ]);
  return { items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)), formTypes };
}

export async function getEnquiry(kind: Kind, id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await (M(kind) as any).findById(id).populate("assignedTo", "name email").lean();
  if (!doc) throw new HttpError(404, "Enquiry not found");
  return doc;
}

export async function updateEnquiry(kind: Kind, user: SessionUser, id: string, body: unknown) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  const data = leadUpdateSchema.parse(body);
  await connectDB();
  const update: Record<string, unknown> = {};
  if (data.status) update.$set = { ...(update.$set as object), status: data.status };
  if (data.assignedTo !== undefined) {
    if (data.assignedTo && !(await AdminUser.exists({ _id: data.assignedTo, active: true }))) throw new HttpError(422, "Unknown team member");
    update.$set = { ...(update.$set as object), assignedTo: data.assignedTo };
  }
  if (data.note) update.$push = { notes: { body: data.note, author: user.id, authorName: user.name } };
  if (!Object.keys(update).length) throw new HttpError(422, "Nothing to update");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = await (M(kind) as any).findByIdAndUpdate(id, update, { new: true }).populate("assignedTo", "name email").lean();
  if (!doc) throw new HttpError(404, "Enquiry not found");
  logActivity(user, "update", kind, id, [data.status && `status → ${data.status}`, data.note && "added a note", data.assignedTo !== undefined && "reassigned"].filter(Boolean).join(", "));
  return doc;
}

export async function deleteEnquiry(kind: Kind, user: SessionUser, id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await M(kind).findByIdAndDelete(id).lean();
  if (!doc) throw new HttpError(404, "Enquiry not found");
  logActivity(user, "delete", kind, id, `Deleted ${kind === "leads" ? "lead" : "proposal"} from ${(doc as { email?: string }).email}`);
  return { id };
}

const csvCell = (v: unknown) => {
  let s = v === undefined || v === null ? "" : v instanceof Date ? v.toISOString() : String(v);
  // Neutralise spreadsheet formula injection.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function exportCsv(kind: Kind, url: URL, user: SessionUser) {
  url.searchParams.set("limit", "100");
  const rows: Record<string, unknown>[] = [];
  for (let p = 1; p <= 100; p++) {
    url.searchParams.set("page", String(p));
    const res = await listEnquiries(kind, url);
    rows.push(...(res.items as Record<string, unknown>[]));
    if (p >= res.pages) break;
  }
  const cols =
    kind === "leads"
      ? ["createdAt", "formType", "source", "name", "email", "phone", "company", "website", "service", "budget", "message", "status", "assignedTo", "utm"]
      : ["createdAt", "firstName", "lastName", "email", "phone", "location", "message", "source", "status", "assignedTo"];
  const lines = [cols.join(",")];
  for (const r of rows) {
    lines.push(
      cols
        .map((c) => {
          const v = r[c];
          if (c === "assignedTo") return csvCell((v as { name?: string } | null)?.name ?? "");
          if (c === "utm") return csvCell(v ? Object.entries(v as object).filter(([, x]) => x).map(([k, x]) => `${k}=${x}`).join("; ") : "");
          return csvCell(v);
        })
        .join(","),
    );
  }
  logActivity(user, "export", kind, undefined, `Exported ${rows.length} ${kind}`);
  return "﻿" + lines.join("\r\n");
}
