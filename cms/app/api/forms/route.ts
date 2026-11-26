import { formResponse, preflight } from "@/lib/public-form";
import { submitForm } from "@/lib/services/leads";

/** Generic enquiry endpoint used by every other website form (contact, careers, CTAs...). */
export async function POST(req: Request) {
  return formResponse(req, async () => submitForm(req, await req.json().catch(() => ({}))));
}
export const OPTIONS = preflight;
