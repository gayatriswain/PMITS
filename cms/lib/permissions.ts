/** Role-based access control. Shared by server (enforced) and client (UI hints only). */
export type Role = "super_admin" | "admin" | "editor" | "seo_manager" | "lead_manager";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  seo_manager: "SEO Manager",
  lead_manager: "Lead Manager",
};

export type Permission =
  | "dashboard.view"
  | "pages.read"
  | "pages.write"
  | "pages.publish"
  | "pages.delete"
  | "content.read"
  | "content.write"
  | "content.publish"
  | "content.delete"
  | "media.read"
  | "media.write"
  | "media.delete"
  | "navigation.write"
  | "seo.write"
  | "settings.write"
  | "leads.read"
  | "leads.write"
  | "leads.delete"
  | "leads.export"
  | "careers.applications"
  | "users.manage"
  | "activity.read";

const ALL: Permission[] = [
  "dashboard.view", "pages.read", "pages.write", "pages.publish", "pages.delete", "content.read", "content.write",
  "content.publish", "content.delete", "media.read", "media.write", "media.delete", "navigation.write", "seo.write",
  "settings.write", "leads.read", "leads.write", "leads.delete", "leads.export", "careers.applications", "users.manage",
  "activity.read",
];

const MATRIX: Record<Role, Permission[]> = {
  super_admin: ALL,
  admin: ALL.filter((p) => p !== "users.manage"),
  editor: [
    "dashboard.view", "pages.read", "pages.write", "pages.publish", "content.read", "content.write", "content.publish",
    "media.read", "media.write", "navigation.write",
  ],
  seo_manager: ["dashboard.view", "pages.read", "content.read", "media.read", "seo.write", "pages.publish"],
  lead_manager: ["dashboard.view", "leads.read", "leads.write", "leads.export", "careers.applications"],
};

export function can(role: Role | undefined | null, perm: Permission): boolean {
  if (!role) return false;
  return MATRIX[role]?.includes(perm) ?? false;
}

export function permissionsFor(role: Role): Permission[] {
  return MATRIX[role] ?? [];
}
