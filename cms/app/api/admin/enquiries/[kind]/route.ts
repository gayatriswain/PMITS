import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { listEnquiries } from "@/lib/services/leads";

type Ctx = { params: Promise<{ kind: string }> };
async function kindOf(ctx: Ctx) {
  const { kind } = await ctx.params;
  if (kind !== "leads" && kind !== "proposals") throw new HttpError(404, "Unknown enquiry type");
  return kind;
}

export const GET = handle(async (req: Request, ctx: Ctx) => {
  const kind = await kindOf(ctx);
  await requireUser(req, "leads.read");
  return ok(await listEnquiries(kind, new URL(req.url)));
});
