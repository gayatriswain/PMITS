import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { createUser, listAssignable, listUsers } from "@/lib/services/users";
import { can } from "@/lib/permissions";

export const GET = handle(async (req: Request) => {
  const user = await requireUser(req);
  // Everyone can see who leads can be assigned to; full details need users.manage.
  if (new URL(req.url).searchParams.get("assignable") === "1" || !can(user.role, "users.manage")) return ok(await listAssignable());
  return ok(await listUsers());
});

export const POST = handle(async (req: Request) => {
  const user = await requireUser(req, "users.manage");
  return ok(await createUser(user, await req.json().catch(() => ({}))), "User added", 201);
});
