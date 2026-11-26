import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { deleteUser, updateUser } from "@/lib/services/users";

type Ctx = { params: Promise<{ id: string }> };

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "users.manage");
  return ok(await updateUser(user, (await ctx.params).id, await req.json().catch(() => ({}))), "User updated");
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "users.manage");
  return ok(await deleteUser(user, (await ctx.params).id), "User removed");
});
