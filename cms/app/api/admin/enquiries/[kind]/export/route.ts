import { handle, HttpError } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { exportCsv } from "@/lib/services/leads";

type Ctx = { params: Promise<{ kind: string }> };

export const GET = handle(async (req: Request, ctx: Ctx) => {
  const { kind } = await ctx.params;
  if (kind !== "leads" && kind !== "proposals") throw new HttpError(404, "Unknown enquiry type");
  const user = await requireUser(req, "leads.export");
  const csv = await exportCsv(kind, new URL(req.url), user);
  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${kind}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
});
