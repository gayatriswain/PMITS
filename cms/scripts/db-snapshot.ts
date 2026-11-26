/**
 * Share the website CONTENT database through git.
 *
 *   npm run db:export    database  ->  cms/db/data/*.json   (commit these files)
 *   npm run db:import    cms/db/data/*.json  ->  database   (after git pull)
 *
 * Only content collections are shared (pages, sections, services, blogs, careers, menus, settings, media
 * records…). NEVER shared: admin users (password hashes), sessions, leads / proposals / job applications
 * (personal data), SMTP settings (encrypted password), activity log, rate limits, private files (CVs).
 *
 * Import REPLACES the shared collections in your database with the files' content. Before it does,
 * your current data is saved to cms/.db-backups/<date>/ (not in git). It refuses to touch a
 * non-local database (Atlas / production) unless you pass --allow-remote on purpose.
 */
import fs from "node:fs";
import path from "node:path";
import { connect, disconnect } from "./_db";

const DIR = path.resolve(process.cwd(), "db/data");
const BACKUPS = path.resolve(process.cwd(), ".db-backups");

/** collection → filter for documents that may be shared */
const SHARED: Record<string, Record<string, unknown>> = {
  pages: {},
  pagesections: {},
  services: {},
  blogcategories: {},
  blogs: {},
  testimonials: {},
  portfolios: {},
  careers: {},
  teammembers: {},
  navigations: {},
  websitesettings: {},
  media: { private: { $ne: true } }, // private files (CVs) stay out
};

async function main() {
  const mode = process.argv[2];
  if (mode !== "export" && mode !== "import") {
    console.log("Usage: npm run db:export | npm run db:import [-- --allow-remote]");
    process.exit(1);
  }
  const uri = process.env.MONGODB_URI ?? "";
  const local = /^mongodb:\/\/(127\.0\.0\.1|localhost)(:\d+)?\//.test(uri);
  if (mode === "import" && !local && !process.argv.includes("--allow-remote")) {
    throw new Error("MONGODB_URI is not a local database. Import replaces content - refusing. (Pass --allow-remote only if you really mean it.)");
  }

  const mongoose = await connect();
  const db = mongoose.connection.db!;
  const { EJSON } = mongoose.mongo.BSON;

  if (mode === "export") {
    fs.mkdirSync(DIR, { recursive: true });
    for (const [name, filter] of Object.entries(SHARED)) {
      const docs = await db.collection(name).find(filter).sort({ _id: 1 }).toArray();
      // relaxed EJSON keeps ObjectIds/dates exact while staying readable and diff-friendly in git
      fs.writeFileSync(path.join(DIR, `${name}.json`), EJSON.stringify(docs, undefined, 2, { relaxed: true }) + "\n");
      console.log(`  exported ${name.padEnd(16)} ${docs.length}`);
    }
    console.log(`\nDone -> ${path.relative(process.cwd(), DIR)}. Commit the db/data folder together with your code.`);
  } else {
    const files = Object.keys(SHARED).filter((n) => fs.existsSync(path.join(DIR, `${n}.json`)));
    if (!files.length) throw new Error(`No snapshot found in ${DIR}. Pull the latest code first (or run db:export on the machine that has the data).`);
    // 1. backup what is there now
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const bdir = path.join(BACKUPS, stamp);
    fs.mkdirSync(bdir, { recursive: true });
    for (const name of files) {
      const current = await db.collection(name).find().toArray();
      fs.writeFileSync(path.join(bdir, `${name}.json`), EJSON.stringify(current, undefined, 0, { relaxed: true }));
    }
    console.log(`  backup of your current data -> ${path.relative(process.cwd(), bdir)}`);
    // 2. replace with the snapshot
    for (const name of files) {
      const docs = EJSON.parse(fs.readFileSync(path.join(DIR, `${name}.json`), "utf8"), { relaxed: true }) as Record<string, unknown>[];
      await db.collection(name).deleteMany(SHARED[name]);
      if (docs.length) await db.collection(name).insertMany(docs);
      console.log(`  imported ${name.padEnd(16)} ${docs.length}`);
    }
    await refreshWebsite();
    console.log("\nDone. Your users, leads, applications and email settings were not touched.");
  }
  await disconnect();
}

/** Ask the running website to drop its cached CMS content (best effort; otherwise it refreshes within 5 minutes). */
async function refreshWebsite() {
  const site = process.env.FRONTEND_URL?.replace(/\/$/, "");
  const secret = process.env.REVALIDATE_SECRET;
  if (!site || !secret) return;
  try {
    const res = await fetch(`${site}/api/revalidate`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-revalidate-secret": secret },
      body: JSON.stringify({ tags: ["pages", "sitemap", "settings", "nav:header", "nav:footer", "nav:services", "col:blogs", "col:services", "col:careers", "col:testimonials", "col:portfolio", "col:team", "col:blog-categories"] }),
      signal: AbortSignal.timeout(5000),
    });
    console.log(res.ok ? "  website cache refreshed" : "  website not refreshed (it updates within 5 minutes)");
  } catch {
    console.log("  website is not running - it will show the new content when started");
  }
}

main().catch(async (e) => {
  console.error("\n" + (e as Error).message);
  await disconnect().catch(() => {});
  process.exit(1);
});
