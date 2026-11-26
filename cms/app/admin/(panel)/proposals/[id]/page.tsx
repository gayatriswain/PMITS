import { notFound } from "next/navigation";
import { EnquiryDetail } from "@/components/admin/Enquiries";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[a-f0-9]{24}$/i.test(id)) notFound();
  const { user, allowed } = await requirePage("leads.read");
  if (!allowed) return <NoAccess />;
  return <EnquiryDetail kind="proposals" id={id} canWrite={can(user.role, "leads.write")} canDelete={can(user.role, "leads.delete")} />;
}
