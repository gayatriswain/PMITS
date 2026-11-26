import { notFound } from "next/navigation";
import { RESOURCE_UI } from "@/lib/client/resources";
import { ResourceList } from "@/components/admin/ResourceList";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export default async function ResourceListPage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!RESOURCE_UI[resource]) notFound();
  const { user, allowed } = await requirePage("content.read");
  if (!allowed) return <NoAccess />;
  return <ResourceList name={resource} canWrite={can(user.role, "content.write")} canDelete={can(user.role, "content.delete")} />;
}
