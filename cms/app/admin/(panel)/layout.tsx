import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { Shell } from "@/components/admin/Shell";

/** Every admin screen re-checks the session on the server (Proxy is only an optimistic redirect). */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return <Shell user={{ id: user.id, name: user.name, email: user.email, role: user.role }}>{children}</Shell>;
}
