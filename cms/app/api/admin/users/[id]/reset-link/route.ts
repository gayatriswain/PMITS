import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { createResetLink } from "@/lib/services/users";

type Ctx = { params: Promise<{ id: string }> };

export const POST = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "users.manage");
  return ok(await createResetLink(user, (await ctx.params).id), "Reset link created (valid 30 minutes)");
});
