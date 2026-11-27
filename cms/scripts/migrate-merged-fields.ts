/**
 * After scripts/merge-text-fields.ts joined sentence pieces into one field (new key "…m"), move texts
 * already edited in the CMS from the old piece keys into the new field. Published content and
 * drafts are both migrated; untouched pieces use the website's original text.
 *
 *   npx tsx scripts/migrate-merged-fields.ts                   # dry run: shows what would change
 *   npx tsx scripts/migrate-merged-fields.ts --apply           # local database
 *   npx tsx scripts/migrate-merged-fields.ts --apply --allow-remote   # Atlas / production, on purpose
 *
 * Safe to run again: pieces are removed once moved, so a second run finds nothing to do.
 * Before writing, the affected sections are saved to cms/.db-backups/merge-fields-<time>.json.
 */
import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";
import { connect, disconnect } from "./_db";

type Piece = { key: string; def: string; rich: boolean };
type Entry = { file: string; key: string; template: string; pieces: Piece[] };
type Content = Record<string, unknown>;

const APPLY = process.argv.includes("--apply");
const MAP: Entry[] = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "scripts/merged-fields.map.json"), "utf8"));
const TOKEN = (k: string) => `\u0000${k}\u0000`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Returns the changed content, or null when none of the merged pieces are in it. */
function migrate(content: Content | undefined, log: string[]): Content | null {
  if (!content || typeof content !== "object") return null;
  let out: Content | null = null;
  for (const e of MAP) {
    const present = e.pieces.filter((p) => p.key in content);
    if (!present.length) continue;
    out ??= { ...content };
    if (!(e.key in content)) {
      const value = (p: Piece) => {
        const v = content[p.key];
        const s = typeof v === "string" ? v : p.def;
        return p.rich ? s : esc(s);
      };
      out[e.key] = e.pieces.reduce((s, p) => s.split(TOKEN(p.key)).join(value(p)), e.template).trim();
      const edited = present.filter((p) => content[p.key] !== p.def).map((p) => p.key);
      if (edited.length) log.push(`  ${e.key} <- edited ${edited.join(", ")}: ${String(out[e.key]).slice(0, 90)}`);
    }
    for (const p of e.pieces) delete out[p.key];
  }
  return out;
}

async function main() {
  const uri = process.env.MONGODB_URI ?? "";
  const local = /^mongodb:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(uri);
  if (APPLY && !local && !process.argv.includes("--allow-remote")) {
    throw new Error("MONGODB_URI is not a local database - refusing. Pass --allow-remote to migrate it on purpose.");
  }
  await connect();
  const col = mongoose.connection.collection("pagesections");
  const docs = await col.find({}).toArray();
  const backup: unknown[] = [];
  let changed = 0;
  for (const d of docs) {
    const log: string[] = [];
    const content = migrate(d.content as Content, log);
    const draft = migrate(d.draftContent as Content | undefined, log);
    if (!content && !draft) continue;
    changed++;
    console.log(`${d.component} (${d.key})${log.length ? "" : " - only original texts, nothing edited"}`);
    log.forEach((l) => console.log(l));
    if (!APPLY) continue;
    backup.push(d);
    const set: Content = {};
    if (content) set.content = content;
    if (draft) set.draftContent = draft;
    await col.updateOne({ _id: d._id }, { $set: set });
  }
  if (APPLY && backup.length) {
    const dir = path.resolve(process.cwd(), ".db-backups");
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `merge-fields-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
    fs.writeFileSync(file, JSON.stringify(backup, null, 1));
    console.log(`Backup of the ${backup.length} sections before the change: ${path.relative(process.cwd(), file)}`);
  }
  console.log(`${APPLY ? "Migrated" : "Would migrate"} ${changed} sections (${MAP.length} merged fields known).`);
  if (APPLY && changed) {
    // drop the website's cached pages so the merged fields show right away
    const front = (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/$/, "");
    const res = await fetch(`${front}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-revalidate-secret": process.env.REVALIDATE_SECRET ?? "" },
      body: JSON.stringify({ tags: ["pages"] }),
    }).catch(() => null);
    console.log(res?.ok ? "Website cache refreshed." : "Website not reached - it refreshes by itself within a few minutes.");
  }
  await disconnect();
}

main().catch(async (e) => {
  console.error(e.message);
  await disconnect().catch(() => {});
  process.exit(1);
});
