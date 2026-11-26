import type { Metadata } from "next";
import { ProfileForm } from "@/components/admin/Misc";
import { requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "My profile" };
export default async function Page() {
  const { user } = await requirePage("dashboard.view");
  return <ProfileForm name={user.name} email={user.email} role={user.role} />;
}
