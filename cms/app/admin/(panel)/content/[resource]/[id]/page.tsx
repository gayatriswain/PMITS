import { notFound } from "next/navigation";
import { RESOURCE_UI } from "@/lib/client/resources";
import { ResourceEditor } from "@/components/admin/ResourceEditor";
import { NoAccess, requirePage } from "@/components/admin/Guard";
import { can } from "@/lib/permissions";

export default async function EditResourcePage({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;
  if (!RESOURCE_UI[resource] || !/^[a-f0-9]{24}$/i.test(id)) notFound();
  const { user, allowed } = await requirePage("content.read");
  if (!allowed) return <NoAccess />;
  return (
    <ResourceEditor
      name={resource}
      id={id}
      canWrite={can(user.role, "content.write")}
      canPublish={can(user.role, "content.publish")}
      canDelete={can(user.role, "content.delete")}
    />
  );
}
