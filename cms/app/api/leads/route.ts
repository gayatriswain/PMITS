import { formResponse, preflight } from "@/lib/public-form";
import { submitLegacyLead } from "@/lib/services/leads";

/** Drop-in replacement for the old Express POST /api/leads. */
export async function POST(req: Request) {
  return formResponse(req, async () => submitLegacyLead(req, await req.json().catch(() => ({}))));
}
export const OPTIONS = preflight;
