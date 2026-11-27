import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { saveSectionsDraft } from "@/lib/services/pages";

type Ctx = { params: Promise<{ id: string }> };

export const PUT = handle(async (req: Request, ctx: Ctx) => {
  const user = await requireUser(req, "pages.write");
  // ?auto=1: visual-editor autosave (its activity entries are merged)
  const auto = new URL(req.url).searchParams.get("auto") === "1";
  return ok(await saveSectionsDraft(user, (await ctx.params).id, await req.json().catch(() => ({})), { auto }), "Sections saved as draft");
});
