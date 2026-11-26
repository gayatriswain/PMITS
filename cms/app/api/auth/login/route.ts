import { z } from "zod";
import { handle, ok } from "@/lib/api";
import { login } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, clientIp, hmac } from "@/lib/security";
import { logActivity } from "@/lib/activity";

const body = z.object({ email: z.string().trim().email().max(255), password: z.string().min(1).max(128) });

export const POST = handle(async (req: Request) => {
  assertSameOrigin(req);
  const ip = clientIp(req);
  // 10 attempts / 15 min per IP, on top of the per-account lockout in login().
  await rateLimit(`login:${hmac(ip)}`, 10, 900);
  const { email, password } = body.parse(await req.json().catch(() => ({})));
  const user = await login(email, password, { ip, userAgent: req.headers.get("user-agent") || "" });
  logActivity({ ...user }, "login", "auth", user.id, `${user.name} signed in`);
  return ok({ user }, "Signed in");
});
