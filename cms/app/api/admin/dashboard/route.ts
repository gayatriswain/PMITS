import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { dashboardStats } from "@/lib/services/dashboard";

export const GET = handle(async (req: Request) => {
  await requireUser(req, "dashboard.view");
  return ok(await dashboardStats());
});
