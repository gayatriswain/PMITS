import { handle, ok } from "@/lib/api";
import { getSessionUser, logout } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import { assertSameOrigin } from "@/lib/security";

export const POST = handle(async (req: Request) => {
  assertSameOrigin(req);
  const user = await getSessionUser().catch(() => null);
  if (user) logActivity(user, "logout", "auth", user.id, `${user.name} signed out`);
  await logout();
  return ok(null, "Signed out");
});
