import { handle, ok, fail } from "@/lib/api";
import { getSessionUser } from "@/lib/auth";
import { permissionsFor } from "@/lib/permissions";

export const GET = handle(async () => {
  const user = await getSessionUser();
  if (!user) return fail("Not signed in", 401);
  return ok({ user, permissions: permissionsFor(user.role) });
});
