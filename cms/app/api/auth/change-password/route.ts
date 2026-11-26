import { z } from "zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { handle, ok, HttpError } from "@/lib/api";
import { hashPassword, passwordProblems, requireUser, revokeUserSessions, SESSION_COOKIE } from "@/lib/auth";
import { AdminUser } from "@/models";
import { logActivity } from "@/lib/activity";

const body = z.object({ currentPassword: z.string().min(1).max(128), newPassword: z.string().min(1).max(128) });

export const POST = handle(async (req: Request) => {
  const user = await requireUser(req);
  const { currentPassword, newPassword } = body.parse(await req.json().catch(() => ({})));
  const problem = passwordProblems(newPassword);
  if (problem) throw new HttpError(422, problem, { newPassword: problem });
  const doc = await AdminUser.findById(user.id).select("+passwordHash");
  if (!doc || !(await bcrypt.compare(currentPassword, doc.passwordHash))) {
    throw new HttpError(422, "Current password is incorrect", { currentPassword: "Incorrect password" });
  }
  doc.passwordHash = await hashPassword(newPassword);
  await doc.save();
  // Keep this browser signed in, sign out everywhere else.
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  await revokeUserSessions(user.id, token);
  logActivity(user, "change-password", "auth", user.id, "Changed own password");
  return ok(null, "Password updated");
});
