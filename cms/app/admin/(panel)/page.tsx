import type { Metadata } from "next";
import { Dashboard } from "@/components/admin/Dashboard";
import { NoAccess, requirePage } from "@/components/admin/Guard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { user, allowed } = await requirePage("dashboard.view");
  return allowed ? <Dashboard name={user.name} role={user.role} /> : <NoAccess />;
}
