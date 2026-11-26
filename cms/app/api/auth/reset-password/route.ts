import { z } from "zod";
import { handle, ok, HttpError } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models";
import { hashPassword, passwordProblems, revokeUserSessions } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, clientIp, hmac, safeEqual } from "@/lib/security";
import { logActivity } from "@/lib/activity";

const body = z.object({ email: z.string().trim().toLowerCase().email(), token: z.string().min(20).max(200), password: z.string().min(1).max(128) });

export const POST = handle(async (req: Request) => {
  assertSameOrigin(req);
  await rateLimit(`reset:${hmac(clientIp(req))}`, 10, 3600);
  const { email, token, password } = body.parse(await req.json().catch(() => ({})));
  const problem = passwordProblems(password);
  if (problem) throw new HttpError(422, problem, { password: problem });
  await connectDB();
  const user = await AdminUser.findOne({ email }).select("+resetTokenHash +resetTokenExpires");
  const valid = user && user.resetTokenHash && user.resetTokenExpires && user.resetTokenExpires.getTime() > Date.now() && safeEqual(user.resetTokenHash, hmac(token));
  if (!user || !valid) throw new HttpError(400, "This reset link is invalid or has expired. Request a new one.");
  user.passwordHash = await hashPassword(password);
  user.passwordChangedAt = new Date();
  user.resetTokenHash = undefined;
  user.resetTokenExpires = undefined;
  user.failedLogins = 0;
  user.lockedUntil = undefined;
  await user.save();
  await revokeUserSessions(String(user._id));
  logActivity({ id: String(user._id), name: user.name, email: user.email, role: user.role }, "reset-password", "auth", String(user._id), "Password reset via email link");
  return ok(null, "Password updated. You can sign in now.");
});
