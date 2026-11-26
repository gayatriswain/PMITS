import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Leave preview mode (POST from the preview banner). */
export async function POST(req: Request) {
  (await draftMode()).disable();
  const back = new URL(req.url).searchParams.get("path") ?? "/";
  redirect(/^\/[a-z0-9\-/]*$/.test(back) ? back : "/");
}
