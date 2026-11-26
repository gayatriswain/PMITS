import type { Metadata } from "next";
import { UsersManager } from "@/components/admin/Misc";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Users" };
export default async function Page() {
  const { user, allowed } = await requirePage("users.manage");
  return allowed ? <UsersManager selfId={user.id} /> : <NoAccess />;
}
