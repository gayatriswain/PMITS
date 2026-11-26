import type { Metadata } from "next";
import { EnquiryList } from "@/components/admin/Enquiries";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export const metadata: Metadata = { title: "Leads" };

export default async function Page() {
  const { user, allowed } = await requirePage("leads.read");
  if (!allowed) return <NoAccess />;
  return <EnquiryList kind="leads" canExport={can(user.role, "leads.export")} />;
}
