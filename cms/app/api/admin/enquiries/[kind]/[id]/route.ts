import { handle, ok, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { deleteEnquiry, getEnquiry, updateEnquiry } from "@/lib/services/leads";

type Ctx = { params: Promise<{ kind: string; id: string }> };
async function resolve(ctx: Ctx) {
  const { kind, id } = await ctx.params;
  if (kind !== "leads" && kind !== "proposals") throw new HttpError(404, "Unknown enquiry type");
  return { kind, id } as const;
}

export const GET = handle(async (req: Request, ctx: Ctx) => {
  const { kind, id } = await resolve(ctx);
  await requireUser(req, "leads.read");
  return ok(await getEnquiry(kind, id));
});

export const PATCH = handle(async (req: Request, ctx: Ctx) => {
  const { kind, id } = await resolve(ctx);
  const user = await requireUser(req, "leads.write");
  return ok(await updateEnquiry(kind, user, id, await req.json().catch(() => ({}))), "Enquiry updated");
});

export const DELETE = handle(async (req: Request, ctx: Ctx) => {
  const { kind, id } = await resolve(ctx);
  const user = await requireUser(req, "leads.delete");
  return ok(await deleteEnquiry(kind, user, id), "Enquiry deleted");
});
