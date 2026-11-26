import "server-only";
import { isValidObjectId } from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models";
import { HttpError } from "@/lib/api";
import { hashPassword, passwordProblems, revokeUserSessions, type SessionUser } from "@/lib/auth";
import { userCreateSchema, userUpdateSchema } from "@/lib/validation/schemas";
import { logActivity } from "@/lib/activity";
import { hmac, randomToken } from "@/lib/security";
import { env } from "@/lib/env";

export async function listUsers() {
  await connectDB();
  return AdminUser.find().sort({ createdAt: 1 }).lean();
}

/** Lightweight list for "assign to" pickers (any signed-in staff may read it). */
export async function listAssignable() {
  await connectDB();
  return AdminUser.find({ active: true }, "name email role").sort({ name: 1 }).lean();
}

async function superAdminsLeft(excludingId: string) {
  return AdminUser.countDocuments({ role: "super_admin", active: true, _id: { $ne: excludingId } });
}

export async function createUser(actor: SessionUser, body: unknown) {
  const data = userCreateSchema.parse(body);
  const problem = passwordProblems(data.password);
  if (problem) throw new HttpError(422, problem, { password: problem });
  await connectDB();
  const { password, ...rest } = data;
  const doc = await AdminUser.create({ ...rest, passwordHash: await hashPassword(password) });
  logActivity(actor, "create", "users", String(doc._id), `Added ${doc.email} as ${doc.role}`);
  const { passwordHash: _p, ...safe } = doc.toObject();
  return safe;
}

export async function updateUser(actor: SessionUser, id: string, body: unknown) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  const data = userUpdateSchema.parse(body);
  await connectDB();
  const doc = await AdminUser.findById(id);
  if (!doc) throw new HttpError(404, "User not found");
  const demoting = (data.role && data.role !== "super_admin") || data.active === false;
  if (doc.role === "super_admin" && demoting && (await superAdminsLeft(id)) === 0) {
    throw new HttpError(422, "At least one active Super Admin must remain.");
  }
  if (data.name) doc.name = data.name;
  if (data.email) doc.email = data.email;
  if (data.role) doc.role = data.role;
  if (data.active !== undefined) doc.active = data.active;
  if (data.password) {
    const problem = passwordProblems(data.password);
    if (problem) throw new HttpError(422, problem, { password: problem });
    doc.passwordHash = await hashPassword(data.password);
    doc.passwordChangedAt = new Date();
  }
  await doc.save();
  if (data.password || data.active === false || data.role) await revokeUserSessions(id);
  logActivity(actor, "update", "users", id, `Updated ${doc.email}`);
  const { passwordHash: _p, ...safe } = doc.toObject();
  return safe;
}

export async function deleteUser(actor: SessionUser, id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  if (id === actor.id) throw new HttpError(422, "You cannot delete your own account.");
  await connectDB();
  const doc = await AdminUser.findById(id).lean();
  if (!doc) throw new HttpError(404, "User not found");
  if (doc.role === "super_admin" && (await superAdminsLeft(id)) === 0) throw new HttpError(422, "At least one active Super Admin must remain.");
  await revokeUserSessions(id);
  await AdminUser.deleteOne({ _id: id });
  logActivity(actor, "delete", "users", id, `Removed ${doc.email}`);
  return { id };
}

/** Super admins can generate a one-time reset link to hand over when email is not configured. */
export async function createResetLink(actor: SessionUser, id: string) {
  if (!isValidObjectId(id)) throw new HttpError(400, "Invalid identifier");
  await connectDB();
  const doc = await AdminUser.findById(id);
  if (!doc) throw new HttpError(404, "User not found");
  const token = randomToken(32);
  doc.resetTokenHash = hmac(token);
  doc.resetTokenExpires = new Date(Date.now() + 30 * 60_000);
  await doc.save();
  logActivity(actor, "reset-link", "users", id, `Generated a password reset link for ${doc.email}`);
  return { url: `${env.appUrl}/admin/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(doc.email)}`, expiresInMinutes: 30 };
}
