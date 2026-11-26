import "server-only";
import { isValidObjectId, type SortOrder } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { HttpError, escapeRegex, listParams } from "@/lib/api";
import { can } from "@/lib/permissions";
import { logActivity } from "@/lib/activity";
import { revalidateFrontend } from "@/lib/revalidate";
import type { SessionUser } from "@/lib/auth";
import type { ResourceConfig } from "./resources";

type Doc = Record<string, unknown>;

function sortSpec(sort: string): Record<string, SortOrder> {
  return sort.startsWith("-") ? { [sort.slice(1)]: -1 } : { [sort]: 1 };
}

export async function listItems(cfg: ResourceConfig, url: URL) {
  await connectDB();
  const { page, limit, skip, q, sort } = listParams(url, { sort: cfg.defaultSort });
  const filter: Record<string, unknown> = {};
  if (q) filter.$or = cfg.search.map((f) => ({ [f]: { $regex: escapeRegex(q), $options: "i" } }));
  for (const f of cfg.filters) {
    const v = url.searchParams.get(f);
    if (!v) continue;
    if (v === "true" || v === "false") filter[f] = v === "true";
    else if (/^[a-zA-Z0-9_-]{1,60}$/.test(v)) filter[f] = v;
  }
  const [items, total] = await Promise.all([
    cfg.model.find(filter).sort(sortSpec(sort)).skip(skip).limit(limit).lean(),
    cfg.model.countDocuments(filter),
  ]);
  return { items, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) };
}

export async function getItem(cfg: ResourceConfig, id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await cfg.model.findById(id).lean();
  if (!doc) throw new HttpError(404, `${cfg.label} item not found`);
  return doc;
}

/** Editors without publish permission may only save drafts. */
function guardPublish(cfg: ResourceConfig, user: SessionUser, data: Doc, existing?: Doc | null) {
  if (!cfg.statusField) return;
  const next = data[cfg.statusField];
  const prev = existing?.[cfg.statusField];
  const goingPublic = cfg.publicStatuses?.includes(String(next)) && next !== prev;
  const wasPublicEdited = cfg.publicStatuses?.includes(String(prev));
  if ((goingPublic || wasPublicEdited) && !can(user.role, cfg.perms.publish)) {
    throw new HttpError(403, "You can save drafts but not publish. Ask an admin to publish.");
  }
}

export async function createItem(cfg: ResourceConfig, user: SessionUser, body: unknown) {
  await connectDB();
  let data = cfg.schema.parse(body) as Doc;
  guardPublish(cfg, user, data, null);
  if (cfg.prepare) data = cfg.prepare(data, null);
  const doc = await cfg.model.create(data);
  const plain = doc.toObject() as Doc;
  logActivity(user, "create", cfg.name, String(doc._id), `Created ${cfg.label.toLowerCase()} "${plain.name ?? plain.title ?? plain.clientName ?? ""}"`);
  await revalidateFrontend(cfg.revalidate(plain));
  return plain;
}

export async function updateItem(cfg: ResourceConfig, user: SessionUser, id: string, body: unknown) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const existing = (await cfg.model.findById(id).lean()) as Doc | null;
  if (!existing) throw new HttpError(404, `${cfg.label} item not found`);
  let data = cfg.schema.parse(body) as Doc;
  guardPublish(cfg, user, data, existing);
  if (cfg.prepare) data = cfg.prepare(data, existing);
  const doc = (await cfg.model.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean()) as Doc;
  logActivity(user, "update", cfg.name, id, `Updated ${cfg.label.toLowerCase()} "${doc.name ?? doc.title ?? doc.clientName ?? ""}"`);
  // Old slug (if renamed) and new slug both need fresh data.
  await revalidateFrontend([...cfg.revalidate(existing), ...cfg.revalidate(doc)]);
  return doc;
}

export async function deleteItem(cfg: ResourceConfig, user: SessionUser, id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = (await cfg.model.findByIdAndDelete(id).lean()) as Doc | null;
  if (!doc) throw new HttpError(404, `${cfg.label} item not found`);
  logActivity(user, "delete", cfg.name, id, `Deleted ${cfg.label.toLowerCase()} "${doc.name ?? doc.title ?? doc.clientName ?? ""}"`);
  await revalidateFrontend(cfg.revalidate(doc));
  return { id };
}
