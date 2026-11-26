import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { connectDB } from "@/lib/mongodb";
import { MailSettings, WebsiteSettings } from "@/models";
import { decryptSecret } from "@/lib/security";

/**
 * Outgoing email. SMTP details come from Admin → Email (SMTP) settings; when nothing is saved there,
 * the SMTP_* environment variables are used instead (old setups keep working).
 */

export type SmtpConfig = {
  host: string;
  port: number;
  encryption: "tls" | "ssl" | "none";
  username?: string;
  password?: string;
  fromName?: string;
  fromEmail?: string;
  replyTo?: string;
};

export type MailConfig = {
  source: "database" | "env" | "none";
  smtp: SmtpConfig | null;
  to: string[];
  cc: string[];
  bcc: string[];
  subjectPrefix: string;
  events: { leads: boolean; proposals: boolean; applications: boolean };
  autoReply: { enabled: boolean; subject: string; body: string };
  siteName: string;
};

type MailDoc = {
  enabled?: boolean; host?: string; port?: number; encryption?: SmtpConfig["encryption"]; username?: string; passwordEnc?: string;
  fromName?: string; fromEmail?: string; replyTo?: string; to?: string[]; cc?: string[]; bcc?: string[]; subjectPrefix?: string;
  events?: Partial<MailConfig["events"]>; autoReply?: { enabled?: boolean; subject?: string; body?: string };
};

function envSmtp(): SmtpConfig | null {
  if (!process.env.SMTP_HOST) return null;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.MAIL_FROM || "";
  const m = from.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  return {
    host: process.env.SMTP_HOST,
    port,
    encryption: port === 465 ? "ssl" : "tls",
    username: process.env.SMTP_USER || undefined,
    password: process.env.SMTP_PASS || undefined,
    fromName: m ? m[1] : undefined,
    fromEmail: m ? m[2] : from || undefined,
  };
}

export async function loadMailConfig(): Promise<MailConfig> {
  await connectDB();
  const [doc, site] = await Promise.all([
    MailSettings.findOne({ key: "smtp" }).select("+passwordEnc").lean<MailDoc>(),
    WebsiteSettings.findOne({ key: "global" }).select("siteName notificationEmails").lean<{ siteName?: string; notificationEmails?: string[] }>(),
  ]);
  let smtp: SmtpConfig | null = null;
  let source: MailConfig["source"] = "none";
  if (doc?.enabled && doc.host) {
    smtp = {
      host: doc.host,
      port: doc.port || 587,
      encryption: doc.encryption || "tls",
      username: doc.username || undefined,
      password: decryptSecret(doc.passwordEnc) ?? undefined,
      fromName: doc.fromName || undefined,
      fromEmail: doc.fromEmail || undefined,
      replyTo: doc.replyTo || undefined,
    };
    source = "database";
  } else if (!doc?.enabled && (smtp = envSmtp())) {
    source = "env";
  }
  const to = doc?.to?.length ? doc.to : site?.notificationEmails ?? [];
  return {
    source,
    smtp,
    to,
    cc: doc?.cc ?? [],
    bcc: doc?.bcc ?? [],
    subjectPrefix: doc?.subjectPrefix ?? "",
    events: { leads: doc?.events?.leads ?? true, proposals: doc?.events?.proposals ?? true, applications: doc?.events?.applications ?? true },
    autoReply: { enabled: !!doc?.autoReply?.enabled, subject: doc?.autoReply?.subject ?? "", body: doc?.autoReply?.body ?? "" },
    siteName: site?.siteName || "ProManage IT Solution",
  };
}

const cache = new Map<string, Transporter>();

export function createTransport(c: SmtpConfig): Transporter {
  const key = JSON.stringify(c);
  let t = cache.get(key);
  if (!t) {
    if (cache.size > 5) cache.clear();
    t = nodemailer.createTransport({
      host: c.host,
      port: c.port,
      secure: c.encryption === "ssl",
      requireTLS: c.encryption === "tls",
      ignoreTLS: c.encryption === "none",
      auth: c.username ? { user: c.username, pass: c.password ?? "" } : undefined,
      connectionTimeout: 15_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
    cache.set(key, t);
  }
  return t;
}

export function fromHeader(c: SmtpConfig, siteName: string) {
  const email = c.fromEmail || c.username || "no-reply@localhost";
  const name = (c.fromName || siteName).replace(/["\r\n]/g, "");
  return `"${name}" <${email}>`;
}

export type Message = {
  to: string | string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

/** Send an email. Never throws: returns false when email is not set up or sending fails (the error is logged). */
export async function sendMail(msg: Message, config?: MailConfig): Promise<boolean> {
  try {
    const cfg = config ?? (await loadMailConfig());
    if (!cfg.smtp) {
      console.info(`[mail:not-configured] to=${[msg.to].flat().join(",")} subject="${msg.subject}"\n${msg.text}`);
      return false;
    }
    await createTransport(cfg.smtp).sendMail({
      from: fromHeader(cfg.smtp, cfg.siteName),
      to: msg.to,
      cc: msg.cc?.length ? msg.cc : undefined,
      bcc: msg.bcc?.length ? msg.bcc : undefined,
      replyTo: msg.replyTo || cfg.smtp.replyTo,
      subject: msg.subject.replace(/[\r\n]+/g, " ").slice(0, 250),
      text: msg.text,
      html: msg.html,
    });
    return true;
  } catch (err) {
    console.error("[mail] send failed", err);
    return false;
  }
}

/* ------------------------------ templates ------------------------------ */

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Simple, email-client-safe HTML: a title, a table of fields and an optional button. */
export function renderMail(title: string, rows: [string, unknown][], button?: { label: string; href: string }, intro?: string) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "");
  const text = [title, "", ...(intro ? [intro, ""] : []), ...filled.map(([k, v]) => `${k}: ${String(v)}`), ...(button ? ["", `${button.label}: ${button.href}`] : [])].join("\n");
  const html = `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
<tr><td style="background:#0f766e;color:#ffffff;padding:18px 24px;font-size:18px;font-weight:bold">${esc(title)}</td></tr>
${intro ? `<tr><td style="padding:18px 24px 0;font-size:14px;line-height:1.6;color:#334155">${esc(intro).replace(/\n/g, "<br>")}</td></tr>` : ""}
<tr><td style="padding:16px 24px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5">
${filled
  .map(
    ([k, v]) =>
      `<tr><td valign="top" style="padding:8px 12px 8px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:150px;white-space:nowrap">${esc(k)}</td><td valign="top" style="padding:8px 0;border-bottom:1px solid #f1f5f9;color:#0f172a">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
  )
  .join("\n")}
</table></td></tr>
${button ? `<tr><td style="padding:4px 24px 24px"><a href="${esc(button.href)}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:14px;font-weight:bold">${esc(button.label)}</a></td></tr>` : ""}
</table></td></tr></table></body></html>`;
  return { text, html };
}

/** Fill {name}/{siteName}/{formName} placeholders in an admin-written template. */
export function fillTemplate(tpl: string, vars: Record<string, string>) {
  return tpl.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? vars[k] : m));
}

export type Notice = {
  event: keyof MailConfig["events"];
  /** e.g. "New enquiry: Contact form" */
  title: string;
  rows: [string, unknown][];
  link: string;
  /** Visitor's email: used as Reply-To so the team can answer directly, and for the optional auto-reply. */
  visitorEmail?: string;
  visitorName?: string;
  formName?: string;
};

/** Email the team about a website submission (To/CC/BCC from settings), plus the optional auto-reply. Never throws. */
export async function notifyTeam(n: Notice) {
  try {
    const cfg = await loadMailConfig();
    if (!cfg.events[n.event]) return { team: false, autoReply: false };
    let team = false;
    if (cfg.to.length) {
      const { text, html } = renderMail(n.title, n.rows, { label: "Open in CMS", href: n.link });
      const subject = `${cfg.subjectPrefix ? `${cfg.subjectPrefix} ` : ""}${n.title}${n.visitorName ? ` - ${n.visitorName}` : ""}`;
      team = await sendMail({ to: cfg.to, cc: cfg.cc, bcc: cfg.bcc, subject, text, html, replyTo: n.visitorEmail }, cfg);
    }
    let autoReply = false;
    if (cfg.autoReply.enabled && cfg.smtp && n.visitorEmail && cfg.autoReply.body) {
      // Only a short, plain first name goes into the template, so the form cannot be used to relay spam text.
      const first = (n.visitorName ?? "").split(/\s+/)[0].replace(/[^\p{L}\p{M}'-]/gu, "").slice(0, 30);
      const vars = { name: first || "there", siteName: cfg.siteName, formName: n.formName ?? "enquiry" };
      const subject = fillTemplate(cfg.autoReply.subject || "Thanks for contacting {siteName}", vars);
      const body = fillTemplate(cfg.autoReply.body, vars);
      const { html } = renderMail(subject, [], undefined, body);
      autoReply = await sendMail({ to: n.visitorEmail, subject, text: body, html }, cfg);
    }
    return { team, autoReply };
  } catch (err) {
    console.error("[mail] notify failed", err);
    return { team: false, autoReply: false };
  }
}
