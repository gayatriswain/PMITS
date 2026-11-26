import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { testMailSettings } from "@/lib/services/mail";

export const POST = handle(async (req: Request) => {
  const user = await requireUser(req, "settings.write");
  const r = await testMailSettings(user, await req.json().catch(() => ({})));
  return ok(r, r.message);
});
