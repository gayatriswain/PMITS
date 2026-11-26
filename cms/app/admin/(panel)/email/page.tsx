import type { Metadata } from "next";
import { EmailSettings } from "@/components/admin/EmailSettings";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Email (SMTP)" };
export default async function Page() {
  const { allowed } = await requirePage("settings.write");
  return allowed ? <EmailSettings /> : <NoAccess />;
}
