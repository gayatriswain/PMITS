import { z } from "zod";
import { handle, ok } from "@/lib/api";
import { connectDB } from "@/lib/mongodb";
import { AdminUser } from "@/models";
import { rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, clientIp, hmac, randomToken } from "@/lib/security";
import { sendMail } from "@/lib/mailer";
import { env } from "@/lib/env";

const body = z.object({ email: z.string().trim().toLowerCase().email().max(255) });

/** Always answers the same way so it cannot be used to discover admin emails. */
export const POST = handle(async (req: Request) => {
  assertSameOrigin(req);
  await rateLimit(`forgot:${hmac(clientIp(req))}`, 5, 3600);
  const { email } = body.parse(await req.json().catch(() => ({})));
  await connectDB();
  const user = await AdminUser.findOne({ email, active: true });
  if (user) {
    const token = randomToken(32);
    user.resetTokenHash = hmac(token);
    user.resetTokenExpires = new Date(Date.now() + 30 * 60_000);
    await user.save();
    const link = `${env.appUrl}/admin/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
    await sendMail({ to: email, subject: "Reset your ProManage CMS password", text: `Use this link within 30 minutes to set a new password:\n${link}\n\nIf you did not ask for this, ignore this email.` });
  }
  return ok(null, "If that email belongs to an admin, a reset link has been sent.");
});
