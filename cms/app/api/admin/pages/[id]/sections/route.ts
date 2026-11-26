import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { saveSectionsDraft } from "@/lib/services/pages";

type Ctx = { params: Promise<{ id: string }> };

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "pages.write");
  return ok(await saveSectionsDraft(user, (await ctx.params).id, await req.json().catch(() => ({}))), "Sections saved as draft");
});
