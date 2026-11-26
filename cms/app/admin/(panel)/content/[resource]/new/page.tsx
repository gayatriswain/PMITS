import { notFound } from "next/navigation";
import { RESOURCE_UI } from "@/lib/client/resources";
import { ResourceEditor } from "@/components/admin/ResourceEditor";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export default async function NewResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!RESOURCE_UI[resource]) notFound();
  const { user, allowed } = await requirePage("content.write");
  if (!allowed) return <NoAccess />;
  return <ResourceEditor name={resource} canWrite canPublish={can(user.role, "content.publish")} canDelete={false} />;
}
