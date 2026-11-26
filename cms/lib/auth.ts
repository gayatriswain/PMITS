import "server-only";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { cache } from "react";
import { connectDB } from "./mongodb";
import { AdminUser, Session } from "@/models";
import { env } from "./env";
import { HttpError } from "./api";
import { assertSameOrigin, hmac, randomToken } from "./security";
import { can, type Permission, type Role } from "./permissions";

export const SESSION_COOKIE = "pm_session";
const MAX_FAILED = 5;
const LOCK_MINUTES = 15;

export type SessionUser = { id: string; name: string; email: string; role: Role; avatar?: string };

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, 12);
}

export function passwordProblems(pw: string): string | null {
  if (pw.length < 10) return "Password must be at least 10 characters.";
  if (pw.length > 128) return "Password is too long.";
  if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return "Use upper and lower case letters and a number.";
  return null;
}

const cookieSecure = () => env.appUrl.startsWith("https://");
let dummyHash: string | null = null;
/** A real bcrypt hash used to equalise timing when the email does not exist. */
const getDummyHash = async () => (dummyHash ??= await bcrypt.hash(randomToken(12), 12));

/** Verify credentials (with lockout) and open a session. */
export async function login(email: string, password: string, meta: { ip: string; userAgent: string }) {
  await connectDB();
  const user = await AdminUser.findOne({ email: email.toLowerCase().trim() }).select("+passwordHash");
  const generic = new HttpError(401, "Invalid email or password.");
  if (!user || !user.active) {
    // Spend comparable time so response timing does not reveal which emails exist.
    await bcrypt.compare(password, await getDummyHash());
    throw generic;
  }
  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    throw new HttpError(423, `Account temporarily locked after too many attempts. Try again after ${user.lockedUntil.toLocaleTimeString("en-IN")}.`);
  }
  const okPw = await bcrypt.compare(password, user.passwordHash);
  if (!okPw) {
    user.failedLogins = (user.failedLogins || 0) + 1;
    if (user.failedLogins >= MAX_FAILED) {
      user.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60_000);
      user.failedLogins = 0;
    }
    await user.save();
    throw generic;
  }
  user.failedLogins = 0;
  user.lockedUntil = undefined;
  user.lastLoginAt = new Date();
  await user.save();

  const token = randomToken(32);
  const expiresAt = new Date(Date.now() + env.sessionHours * 3600_000);
  await Session.create({ tokenHash: hmac(token), user: user._id, expiresAt, ip: meta.ip, userAgent: meta.userAgent.slice(0, 300) });
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: cookieSecure(),
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return { id: String(user._id), name: user.name, email: user.email, role: user.role as Role };
}

export async function logout() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await connectDB();
    await Session.deleteOne({ tokenHash: hmac(token) });
  }
  jar.delete(SESSION_COOKIE);
}

/** Current admin (or null). Cached per request. */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token || token.length > 200) return null;
  await connectDB();
  const session = await Session.findOne({ tokenHash: hmac(token), expiresAt: { $gt: new Date() } }).lean();
  if (!session) return null;
  const user = await AdminUser.findById(session.user).lean();
  if (!user || !user.active) return null;
  // Sessions opened before a password change are invalid.
  if (user.passwordChangedAt && session.createdAt && user.passwordChangedAt > session.createdAt) return null;
  return { id: String(user._id), name: user.name, email: user.email, role: user.role as Role, avatar: user.avatar ?? undefined };
});

/** Guard for admin API route handlers: authenticated + permission + same-origin for writes. */
export async function requireUser(req: Request, perm?: Permission): Promise<SessionUser> {
  assertSameOrigin(req);
  const user = await getSessionUser();
  if (!user) throw new HttpError(401, "Please sign in.");
  if (perm && !can(user.role, perm)) throw new HttpError(403, "You do not have permission to do this.");
  return user;
}

export async function revokeUserSessions(userId: string, exceptToken?: string) {
  await connectDB();
  const filter: Record<string, unknown> = { user: userId };
  if (exceptToken) filter.tokenHash = { $ne: hmac(exceptToken) };
  await Session.deleteMany(filter);
}
