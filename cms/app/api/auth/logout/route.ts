import { handle, ok } from "@/lib/api";
import { logout } from "@/lib/auth";
import { assertSameOrigin } from "@/lib/security";

export const POST = handle(async (req: Request) => {
  assertSameOrigin(req);
  await logout();
  return ok(null, "Signed out");
});
