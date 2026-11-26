/**
 * End-to-end test of the Email (SMTP) settings against a RUNNING CMS (npm run dev).
 * Starts a local SMTP server on 127.0.0.1:2526 that records every message, points the CMS at it,
 * submits website forms and checks who received what (To / CC / BCC, Reply-To, auto-reply).
 *
 *   npm run test:mail
 *
 * Uses a temporary super admin and qa.* records that are removed afterwards. The saved email
 * settings are backed up first and restored at the end, so real SMTP details are never lost.
 */
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { SMTPServer } from "smtp-server";
import mongoose from "mongoose";
import { connect, disconnect } from "./_db";
import { AdminUser, Career, JobApplication, Lead, MailSettings, Proposal, WebsiteSettings } from "../models";

const BASE = process.env.APP_URL || "http://localhost:4000";
const ORIGIN = new URL(BASE).origin;
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:3000";
const PORT = 2526;
const SMTP_USER = "qa-smtp-user";
const SMTP_PASS = `Qa-${randomBytes(9).toString("base64url")}`;

let passed = 0;
const failures: string[] = [];
function check(name: string, cond: boolean, detail?: unknown) {
  if (cond) {
    passed++;
    console.log(`  ok   ${name}`);
  } else {
    failures.push(name);
    console.log(`  FAIL ${name}${detail !== undefined ? ` -> ${typeof detail === "string" ? detail : JSON.stringify(detail).slice(0, 400)}` : ""}`);
  }
}

type Received = { from: string; rcpt: string[]; raw: string };
const inbox: Received[] = [];

function header(raw: string, name: string) {
  const head = raw.split(/\r?\n\r?\n/)[0].replace(/\r?\n[ \t]+/g, " ");
  const m = head.match(new RegExp(`^${name}:\\s*(.*)$`, "im"));
  return m ? m[1].trim() : "";
}

async function waitFor(pred: (m: Received) => boolean, ms = 10_000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const hit = inbox.find(pred);
    if (hit) return hit;
    await new Promise((r) => setTimeout(r, 150));
  }
  return null;
}

let cookie = "";
async function req(method: string, path: string, body?: unknown, extra: Record<string, string> = {}) {
  const isForm = body instanceof FormData;
  const res = await fetch(BASE + path, {
    method,
    headers: { Origin: ORIGIN, ...(cookie ? { Cookie: cookie } : {}), ...(body && !isForm ? { "Content-Type": "application/json" } : {}), ...extra },
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });
  const set = res.headers.get("set-cookie");
  if (set?.startsWith("pm_session=")) cookie = set.split(";")[0];
  const text = await res.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* not json */
  }
  return { status: res.status, json, text };
}

async function main() {
  await connect();

  /* ---------- local SMTP server ---------- */
  const server = new SMTPServer({
    authOptional: false,
    allowInsecureAuth: true,
    disabledCommands: ["STARTTLS"],
    logger: false,
    onAuth(auth, _s, cb) {
      if (auth.username === SMTP_USER && auth.password === SMTP_PASS) cb(null, { user: auth.username });
      else cb(Object.assign(new Error("Invalid username or password"), { responseCode: 535 }));
    },
    onData(stream, session, cb) {
      const chunks: Buffer[] = [];
      stream.on("data", (c: Buffer) => chunks.push(c));
      stream.on("end", () => {
        inbox.push({
          from: session.envelope.mailFrom ? session.envelope.mailFrom.address : "",
          rcpt: session.envelope.rcptTo.map((r) => r.address.toLowerCase()),
          raw: Buffer.concat(chunks).toString("utf8"),
        });
        cb();
      });
    },
  });
  await new Promise<void>((r) => server.listen(PORT, "127.0.0.1", r));

  /* ---------- back up real settings, create a temporary admin ---------- */
  const backupMail = await MailSettings.collection.findOne({ key: "smtp" });
  const backupSite = await WebsiteSettings.collection.findOne({ key: "global" }, { projection: { notificationEmails: 1 } });
  const adminEmail = "qa.mailtest@example.test";
  const adminPass = `Qa1-${randomBytes(12).toString("base64url")}`;
  await AdminUser.deleteMany({ email: adminEmail });
  await AdminUser.create({ name: "QA Mail Test", email: adminEmail, role: "super_admin", passwordHash: await bcrypt.hash(adminPass, 10), active: true });
  const career = await Career.create({ title: "QA Mail Job", slug: `qa-mail-job-${Date.now()}`, status: "open" });

  try {
    console.log("\nAccess");
    check("signed-out user cannot read email settings", (await req("GET", "/api/admin/email")).status === 401);
    const login = await req("POST", "/api/auth/login", { email: adminEmail, password: adminPass });
    check("temporary admin signs in", login.status === 200, login.json);
    check("cross-site save blocked", (await req("PUT", "/api/admin/email", { enabled: false }, { Origin: "https://evil.example" })).status === 403);

    console.log("\nValidation");
    const bad = await req("PUT", "/api/admin/email", { enabled: true, host: "", to: [] });
    check("enabling without host/from/recipients is rejected", bad.status === 422 && !!(bad.json?.errors as Record<string, string>)?.host, bad.json);
    const badEmail = await req("PUT", "/api/admin/email", { enabled: false, cc: ["not-an-email"] });
    check("invalid CC address is rejected", badEmail.status === 422, badEmail.json);
    const badHost = await req("PUT", "/api/admin/email", { enabled: false, host: "smtp.example.com/evil" });
    check("host with a path is rejected", badHost.status === 422, badHost.json);

    console.log("\nSave");
    const cfg = {
      enabled: true,
      host: "127.0.0.1",
      port: PORT,
      encryption: "none",
      username: SMTP_USER,
      password: SMTP_PASS,
      fromName: "QA Site",
      fromEmail: "qa.sender@example.test",
      replyTo: "qa.replyto@example.test",
      to: ["qa.to1@example.test", "qa.to2@example.test"],
      cc: ["qa.cc@example.test"],
      bcc: ["qa.bcc@example.test"],
      subjectPrefix: "[QA]",
      events: { leads: true, proposals: true, applications: true },
      autoReply: { enabled: true, subject: "Thanks {name} from {siteName}", body: "Hi {name}, we got your {formName}." },
    };
    const saved = await req("PUT", "/api/admin/email", cfg);
    check("settings saved", saved.status === 200, saved.json);
    const data = saved.json?.data as Record<string, unknown>;
    check("response never contains the password", !saved.text.includes(SMTP_PASS) && !("passwordEnc" in (data ?? {})), data);
    check("response says a password is saved", data?.hasPassword === true && data?.activeSource === "database", data);
    const raw = await MailSettings.collection.findOne({ key: "smtp" });
    check("password is stored encrypted in MongoDB", typeof raw?.passwordEnc === "string" && !String(raw.passwordEnc).includes(SMTP_PASS) && String(raw.passwordEnc).startsWith("v1."), raw?.passwordEnc);
    const got = await req("GET", "/api/admin/email");
    check("GET never contains the password", got.status === 200 && !got.text.includes(SMTP_PASS) && !got.text.includes(String(raw?.passwordEnc)));

    const keep = await req("PUT", "/api/admin/email", { ...cfg, password: "" });
    const raw2 = await MailSettings.collection.findOne({ key: "smtp" });
    check("saving with an empty password keeps the saved one", keep.status === 200 && raw2?.passwordEnc === raw?.passwordEnc);

    console.log("\nTest button");
    const wrong = await req("POST", "/api/admin/email/test", { to: "qa.test@example.test", config: { ...cfg, password: "wrong-password" } });
    check("wrong password -> clear login error", wrong.status === 200 && (wrong.json?.data as { ok: boolean })?.ok === false && /Login failed/i.test(String((wrong.json?.data as { message: string })?.message)), wrong.json);
    const other = await req("POST", "/api/admin/email/test", { to: "qa.test@example.test", config: { ...cfg, host: "localhost", password: "" } });
    check("saved password is not sent to a different host", (other.json?.data as { ok: boolean })?.ok === false, other.json);
    const down = await req("POST", "/api/admin/email/test", { to: "qa.test@example.test", config: { ...cfg, port: 2599 } });
    check("unreachable server -> connection error", /connect/i.test(String((down.json?.data as { message: string })?.message)), down.json);

    inbox.length = 0;
    const t = await req("POST", "/api/admin/email/test", { to: "qa.test@example.test", config: { ...cfg, password: "" } });
    check("test with unsaved form values + saved password succeeds", (t.json?.data as { ok: boolean })?.ok === true, t.json);
    const tm = await waitFor((m) => m.rcpt.includes("qa.test@example.test"));
    check("test email delivered to the address typed", !!tm && /Test email/i.test(header(tm.raw, "Subject")));
    check("From uses the configured name and email", !!tm && /QA Site/.test(header(tm.raw, "From")) && /qa\.sender@example\.test/.test(header(tm.raw, "From")), tm && header(tm.raw, "From"));
    const last = (await MailSettings.findOne({ key: "smtp" }).lean())?.lastTest;
    check("last test result is recorded", last?.ok === true);

    console.log("\nContact form -> email");
    inbox.length = 0;
    const form = await req(
      "POST",
      "/api/forms",
      { formType: "contact-us", name: "Asha Verma", email: "qa.visitor@example.test", phone: "+91 98765 43210", message: "Need a website <b>quote</b>", details: { "Preferred time": "Morning" }, sourceUrl: "http://localhost:3000/contact" },
      { Origin: FRONTEND },
    );
    check("form accepted", form.status === 201 || form.status === 200, form.json);
    const team = await waitFor((m) => m.rcpt.includes("qa.to1@example.test"));
    check("team email sent", !!team);
    if (team) {
      check("envelope includes To, CC and BCC", ["qa.to1@example.test", "qa.to2@example.test", "qa.cc@example.test", "qa.bcc@example.test"].every((a) => team.rcpt.includes(a)), team.rcpt);
      check("To header lists both recipients", /qa\.to1@example\.test/.test(header(team.raw, "To")) && /qa\.to2@example\.test/.test(header(team.raw, "To")));
      check("Cc header present", /qa\.cc@example\.test/.test(header(team.raw, "Cc")));
      check("BCC address is hidden from headers", !/qa\.bcc@example\.test/.test(team.raw.split(/\r?\n\r?\n/)[0]));
      check("Reply-To is the visitor", /qa\.visitor@example\.test/.test(header(team.raw, "Reply-To")), header(team.raw, "Reply-To"));
      check("subject has prefix, form and name", /^\[QA\] New enquiry: Contact us - Asha Verma/.test(header(team.raw, "Subject")), header(team.raw, "Subject"));
      check("body contains phone, message and extra answers", /98765 43210/.test(team.raw) && /Preferred time/.test(team.raw));
      const htmlPart = team.raw.slice(team.raw.search(/Content-Type: text\/html/i)).replace(/=\r?\n/g, "");
      check("HTML in the message is escaped", htmlPart.includes("&lt;b&gt;quote&lt;/b&gt;") && !htmlPart.includes("<b>quote</b>"), htmlPart.slice(0, 1500));
    }
    const auto = await waitFor((m) => m.rcpt.includes("qa.visitor@example.test"));
    check("auto-reply sent to the visitor", !!auto);
    if (auto) {
      check("auto-reply fills {name}, {siteName}", /Thanks Asha from/.test(header(auto.raw, "Subject")), header(auto.raw, "Subject"));
      check("auto-reply goes only to the visitor (no team CC/BCC)", auto.rcpt.length === 1, auto.rcpt);
    }

    console.log("\nOther forms");
    inbox.length = 0;
    const prop = await req("POST", "/api/proposals", { firstName: "Ravi", lastName: "Kumar", email: "qa.prop@example.test", phone: "+91 99999 11111", location: "Noida", message: "SEO" }, { Origin: FRONTEND });
    check("proposal accepted", prop.status === 201 || prop.status === 200, prop.json);
    const pm = await waitFor((m) => m.rcpt.includes("qa.to1@example.test"));
    check("proposal request emailed to team with CC/BCC", !!pm && /proposal request/i.test(header(pm.raw, "Subject")) && pm.rcpt.includes("qa.bcc@example.test"), pm && header(pm.raw, "Subject"));

    inbox.length = 0;
    const fd = new FormData();
    fd.set("name", "Neha Singh");
    fd.set("email", "qa.apply@example.test");
    fd.set("careerId", String(career._id));
    fd.set("coverLetter", "Hello");
    const apply = await req("POST", "/api/careers/apply", fd, { Origin: FRONTEND });
    check("job application accepted", apply.status === 201, apply.json);
    const am = await waitFor((m) => m.rcpt.includes("qa.to1@example.test"));
    check("job application emailed to team", !!am && /QA Mail Job/.test(header(am.raw, "Subject")), am && header(am.raw, "Subject"));

    console.log("\nSwitches");
    await req("PUT", "/api/admin/email", { ...cfg, password: "", events: { leads: false, proposals: true, applications: true }, autoReply: { enabled: false } });
    inbox.length = 0;
    await req("POST", "/api/forms", { formType: "contact-us", name: "Off Test", email: "qa.off@example.test", message: "x" }, { Origin: FRONTEND });
    check("no email when contact forms are switched off", !(await waitFor((m) => m.rcpt.includes("qa.to1@example.test") || m.rcpt.includes("qa.off@example.test"), 3000)));

    await req("PUT", "/api/admin/email", { ...cfg, password: "", enabled: false });
    inbox.length = 0;
    await req("POST", "/api/proposals", { firstName: "Off", lastName: "Test", email: "qa.off2@example.test", phone: "+91 99999 22222", location: "Delhi" }, { Origin: FRONTEND });
    check("no email when email is switched off", !(await waitFor((m) => m.rcpt.includes("qa.to1@example.test"), 3000)));
  } finally {
    /* ---------- restore ---------- */
    if (backupMail) await MailSettings.collection.replaceOne({ key: "smtp" }, backupMail, { upsert: true });
    else await MailSettings.collection.deleteOne({ key: "smtp" });
    if (backupSite) await WebsiteSettings.collection.updateOne({ key: "global" }, backupSite.notificationEmails ? { $set: { notificationEmails: backupSite.notificationEmails } } : { $unset: { notificationEmails: 1 } });
    await Lead.deleteMany({ email: /^qa\./ });
    await Proposal.deleteMany({ email: /^qa\./ });
    await JobApplication.deleteMany({ email: /^qa\./ });
    await Career.deleteOne({ _id: career._id });
    await AdminUser.deleteMany({ email: adminEmail });
    await mongoose.connection.collection("activitylogs").deleteMany({ userName: "QA Mail Test" });
    await new Promise<void>((r) => server.close(() => r()));
    await disconnect();
  }

  console.log(`\n${passed} checks passed, ${failures.length} failed`);
  process.exit(failures.length ? 1 : 0);
}

main().catch(async (err) => {
  console.error(err);
  await disconnect().catch(() => {});
  process.exit(1);
});
