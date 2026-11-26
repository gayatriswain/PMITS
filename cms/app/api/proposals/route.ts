import { formResponse, preflight } from "@/lib/public-form";
import { submitLegacyProposal } from "@/lib/services/leads";

/** Drop-in replacement for the old Express POST /api/proposals. */
export async function POST(req: Request) {
  return formResponse(req, async () => submitLegacyProposal(req, await req.json().catch(() => ({}))));
}
export const OPTIONS = preflight;
