import "server-only";
import { connectDB } from "@/lib/mongodb";
import { MailSettings, WebsiteSettings } from "@/models";
import { mailSettingsSchema, mailTestSchema } from "@/lib/validation/schemas";
import { createTransport, fromHeader, loadMailConfig, renderMail, type SmtpConfig } from "@/lib/mailer";
import { decryptSecret, encryptSecret } from "@/lib/security";
import { logActivity } from "@/lib/activity";
import { rateLimit } from "@/lib/rate-limit";
import { HttpError } from "@/lib/api";
import type { SessionUser } from "@/lib/auth";
import type { z } from "zod";

type Input = z.infer<typeof mailSettingsSchema>;

/** Admin view of the email settings. The password itself is never returned, only whether one is saved. */
export async function getMailSettings() {
  await connectDB();
  let doc = await MailSettings.findOne({ key: "smtp" }).select("+passwordEnc").lean<Record<string, unknown>>();
  if (!doc) {
    // First visit: start from the recipients already set under Settings → Notifications.
    const site = await WebsiteSettings.findOne({ key: "global" }).select("notificationEmails").lean<{ notificationEmails?: string[] }>();
    doc = (await MailSettings.create({ key: "smtp", to: site?.notificationEmails ?? [] })).toObject();
  }
  const { passwordEnc, _id, __v, key, ...rest } = doc as Record<string, unknown>;
  void _id; void __v; void key;
  const cfg = await loadMailConfig();
  return {
    ...rest,
    hasPassword: Boolean(passwordEnc),
    passwordReadable: !passwordEnc || decryptSecret(passwordEnc as string) !== null,
    activeSource: cfg.source,
    envConfigured: Boolean(process.env.SMTP_HOST),
  };
}

function fields(d: Input) {
  return {
    enabled: d.enabled ?? false,
    host: d.host ?? "",
    port: d.port ?? 587,
    encryption: d.encryption ?? "tls",
    username: d.username ?? "",
    fromName: d.fromName ?? "",
    fromEmail: d.fromEmail ?? "",
    replyTo: d.replyTo ?? "",
    to: d.to ?? [],
    cc: d.cc ?? [],
    bcc: d.bcc ?? [],
    subjectPrefix: d.subjectPrefix ?? "",
    events: { leads: d.events?.leads ?? true, proposals: d.events?.proposals ?? true, applications: d.events?.applications ?? true },
    autoReply: { enabled: d.autoReply?.enabled ?? false, subject: d.autoReply?.subject ?? "", body: d.autoReply?.body ?? "" },
  };
}

export async function updateMailSettings(user: SessionUser, body: unknown) {
  const d = mailSettingsSchema.parse(body);
  await connectDB();
  const update: Record<string, unknown> = { $set: fields(d) };
  if (d.password) (update.$set as Record<string, unknown>).passwordEnc = encryptSecret(d.password);
  else if (d.clearPassword) update.$unset = { passwordEnc: 1 };
  await MailSettings.findOneAndUpdate({ key: "smtp" }, update, { upsert: true, runValidators: true });
  // Keep the old field in step so anything still reading it sees the same recipients.
  await WebsiteSettings.updateOne({ key: "global" }, { $set: { notificationEmails: fields(d).to } });
  logActivity(user, "update", "settings", "smtp", `Updated email settings${d.password ? " (password changed)" : ""}`);
  return getMailSettings();
}

/** Connects to the SMTP server, logs in and sends a test message. Uses the unsaved form values when given. */
export async function testMailSettings(user: SessionUser, body: unknown) {
  const { to, config } = mailTestSchema.parse(body);
  await rateLimit(`mail-test:${user.id}`, 10, 600);
  await connectDB();
  const saved = await MailSettings.findOne({ key: "smtp" }).select("+passwordEnc").lean<{ host?: string; passwordEnc?: string }>();
  let smtp: SmtpConfig | null;
  let siteName = "ProManage IT Solution";
  if (config) {
    if (!config.host) throw new HttpError(422, "Enter the SMTP host first", { host: "Required" });
    smtp = {
      host: config.host,
      port: config.port ?? 587,
      encryption: config.encryption ?? "tls",
      username: config.username || undefined,
      // The saved password is only reused for the same server, so it can never be sent to a different host.
      password: config.password || (!config.clearPassword && saved?.host === config.host ? decryptSecret(saved?.passwordEnc) ?? undefined : undefined),
      fromName: config.fromName || undefined,
      fromEmail: config.fromEmail || undefined,
      replyTo: config.replyTo || undefined,
    };
  } else {
    const cfg = await loadMailConfig();
    smtp = cfg.smtp;
    siteName = cfg.siteName;
  }
  if (!smtp) throw new HttpError(422, "Email is not set up yet. Fill in the SMTP details first.");

  let ok = false;
  let message: string;
  try {
    const t = createTransport(smtp);
    await t.verify();
    const { text, html } = renderMail(
      "Test email from the ProManage CMS",
      [["Sent by", user.name], ["SMTP server", `${smtp.host}:${smtp.port} (${smtp.encryption.toUpperCase()})`], ["Time", new Date().toISOString()]],
      undefined,
      "If you can read this, outgoing email is working. Website enquiries will be sent to the recipients set on the Email (SMTP) page.",
    );
    const info = await t.sendMail({ from: fromHeader(smtp, siteName), to, replyTo: smtp.replyTo, subject: "Test email - ProManage CMS", text, html });
    ok = true;
    message = `Test email sent to ${to}. Server reply: ${String(info.response ?? "OK").slice(0, 160)}`;
  } catch (err) {
    message = describeSmtpError(err);
  }
  await MailSettings.updateOne({ key: "smtp" }, { $set: { lastTest: { at: new Date(), ok, message, by: user.name } } }, { upsert: true });
  logActivity(user, "test", "settings", "smtp", ok ? `Sent a test email to ${to}` : "Email test failed");
  return { ok, message };
}

/** Turns nodemailer errors into something an admin can act on. */
function describeSmtpError(err: unknown) {
  const e = err as { code?: string; responseCode?: number; response?: string; message?: string };
  const raw = (e.response || e.message || "Unknown error").slice(0, 200);
  if (e.code === "EAUTH" || e.responseCode === 535) return `Login failed - check the username and password (for Gmail/Outlook use an app password). ${raw}`;
  if (e.code === "ESOCKET" && /wrong version number|ssl/i.test(raw)) return `TLS mismatch - use SSL with port 465, or TLS (STARTTLS) with port 587. ${raw}`;
  if (e.code === "ECONNECTION" || e.code === "ETIMEDOUT" || e.code === "ESOCKET" || e.code === "EDNS")
    return `Could not connect to the SMTP server - check the host and port, and that the server allows outgoing SMTP. ${raw}`;
  if (e.code === "EENVELOPE") return `The server refused the sender or recipient - the From email may need to match the SMTP account. ${raw}`;
  return raw;
}
