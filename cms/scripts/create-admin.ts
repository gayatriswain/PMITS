/**
 * Create (or reset the password of) a CMS admin. Nothing is hard-coded.
 *
 *   npm run admin:create -- --email you@company.com --name "Your Name" [--role super_admin]
 *
 * The password is asked interactively (hidden). For automation you may pass it through the
 * ADMIN_PASSWORD environment variable instead - never on the command line.
 */
import { createInterface } from "node:readline";
import bcrypt from "bcryptjs";
import { connect, disconnect } from "./_db";
import { AdminUser, ROLES } from "../models";

function arg(name: string) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream };
    let muted = false;
    out._writeToOutput = (s: string) => {
      if (!muted) out.output.write(s);
    };
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
    muted = true;
  });
}

function problems(pw: string) {
  if (pw.length < 10) return "at least 10 characters";
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return "upper and lower case letters and a number";
  return null;
}

async function main() {
  const email = arg("email")?.trim().toLowerCase();
  const name = arg("name")?.trim();
  const role = (arg("role") || "super_admin") as (typeof ROLES)[number];
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Pass --email you@company.com');
  if (!ROLES.includes(role)) throw new Error(`--role must be one of: ${ROLES.join(", ")}`);

  let password = process.env.ADMIN_PASSWORD || "";
  if (!password) {
    password = await askHidden("Password: ");
    const again = await askHidden("Repeat password: ");
    if (password !== again) throw new Error("Passwords do not match");
  }
  const p = problems(password);
  if (p) throw new Error(`Password needs ${p}`);

  await connect();
  const passwordHash = await bcrypt.hash(password, 12);
  const existing = await AdminUser.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    existing.passwordChangedAt = new Date();
    existing.active = true;
    existing.failedLogins = 0;
    existing.lockedUntil = undefined;
    if (name) existing.name = name;
    await existing.save();
    console.log(`Updated password for ${email} (${existing.role}). Existing sessions were signed out.`);
  } else {
    await AdminUser.create({ email, name: name || email.split("@")[0], role, passwordHash });
    console.log(`Created ${role} ${email}. Sign in at ${process.env.APP_URL || "http://localhost:4000"}/admin/login`);
  }
  await disconnect();
}

main().catch(async (err) => {
  console.error("Error:", err.message);
  await disconnect().catch(() => {});
  process.exit(1);
});
