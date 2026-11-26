import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { can, type Permission } from "@/lib/permissions";
import { ShieldAlert } from "lucide-react";

/** Server-side permission gate for an admin screen. */
export async function requirePage(perm: Permission | Permission[]) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  const perms = Array.isArray(perm) ? perm : [perm];
  return { user, allowed: perms.some((p) => can(user.role, p)) };
}

export function NoAccess() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-20 text-center">
      <ShieldAlert className="h-10 w-10 text-amber-500" />
      <p className="mt-3 font-medium text-slate-800">You don&apos;t have access to this section</p>
      <p className="mt-1 text-sm text-slate-500">Ask a Super Admin to change your role if you need it.</p>
    </div>
  );
}
