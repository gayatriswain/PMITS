"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity, BookOpen, Briefcase, FileStack, FolderKanban, Gauge, ImageIcon, Inbox, LayoutGrid, LogOut, Menu, MessageSquareQuote,
  Mail, Navigation, ScrollText, Search, Settings, Tags, UserCircle, Users, UsersRound, X, ExternalLink, FileUser,
  Layers, BadgeCheck, GalleryHorizontalEnd, Quote,
} from "lucide-react";
import { can, ROLE_LABELS, type Permission, type Role } from "@/lib/permissions";
import { api } from "@/lib/client/api";
import { ConfirmProvider, ToastProvider } from "./ui";

/** exact: only highlight on this exact URL (its sub-pages are separate menu items) */
type NavItem = { href: string; label: string; icon: typeof Gauge; perm: Permission; exact?: boolean };
const NAV: { title: string; items: NavItem[] }[] = [
  { title: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: Gauge, perm: "dashboard.view" }] },
  {
    title: "Website",
    items: [
      { href: "/admin/pages", label: "Pages & sections", icon: FileStack, perm: "pages.read" },
      { href: "/admin/seo", label: "SEO", icon: Search, perm: "pages.read" },
      { href: "/admin/navigation", label: "Navigation", icon: Navigation, perm: "navigation.write" },
      { href: "/admin/media", label: "Media library", icon: ImageIcon, perm: "media.read" },
    ],
  },
  {
    // shared on every page: edit once (see frontend/components/cms/global-sections.data.ts)
    title: "Global (all pages)",
    items: [
      { href: "/admin/global", label: "Global sections", icon: Layers, perm: "pages.read", exact: true },
      { href: "/admin/global/trusted-bar", label: "Client logos slider", icon: BadgeCheck, perm: "pages.read" },
      { href: "/admin/global/projects-carousel", label: "Featured projects slider", icon: GalleryHorizontalEnd, perm: "pages.read" },
      { href: "/admin/global/client-stories", label: "Client stories slider", icon: Quote, perm: "pages.read" },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/content/services", label: "Services", icon: LayoutGrid, perm: "content.read" },
      { href: "/admin/content/blogs", label: "Blogs", icon: BookOpen, perm: "content.read" },
      { href: "/admin/content/blog-categories", label: "Blog categories", icon: Tags, perm: "content.read" },
      { href: "/admin/content/testimonials", label: "Testimonials", icon: MessageSquareQuote, perm: "content.read" },
      { href: "/admin/content/portfolio", label: "Portfolio", icon: FolderKanban, perm: "content.read" },
      { href: "/admin/content/careers", label: "Careers", icon: Briefcase, perm: "content.read" },
      { href: "/admin/content/team", label: "Team", icon: UsersRound, perm: "content.read" },
    ],
  },
  {
    title: "Enquiries",
    items: [
      { href: "/admin/leads", label: "Leads", icon: Inbox, perm: "leads.read" },
      { href: "/admin/proposals", label: "Proposal requests", icon: ScrollText, perm: "leads.read" },
      { href: "/admin/applications", label: "Job applications", icon: FileUser, perm: "careers.applications" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings, perm: "settings.write" },
      { href: "/admin/email", label: "Email (SMTP)", icon: Mail, perm: "settings.write" },
      { href: "/admin/users", label: "Users & roles", icon: Users, perm: "users.manage" },
      { href: "/admin/activity", label: "Activity log", icon: Activity, perm: "activity.read" },
    ],
  },
];

export type ShellUser = { id: string; name: string; email: string; role: Role };

export function Shell({ user, children }: { user: ShellUser; children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const isActive = (href: string, exact?: boolean) => (href === "/admin" || exact ? path === href : path === href || path.startsWith(`${href}/`));

  const sidebar = (
    <nav className="flex h-full flex-col" aria-label="Admin">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal text-sm font-bold text-white">P</span>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">ProManage</p>
          <p className="text-[11px] text-slate-400">Content Management</p>
        </div>
      </div>
      <div className="sidebar-scroll flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {NAV.map((g) => {
          const items = g.items.filter((i) => can(user.role, i.perm) || (i.href === "/admin/seo" && can(user.role, "seo.write")));
          if (!items.length) return null;
          return (
            <div key={g.title}>
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{g.title}</p>
              <ul className="mt-1.5 space-y-0.5">
                {items.map((i) => (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${isActive(i.href, i.exact) ? "bg-white/10 font-medium text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                    >
                      <i.icon className={`h-4 w-4 ${isActive(i.href, i.exact) ? "text-teal-300" : ""}`} />
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <a href={process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"} target="_blank" rel="noreferrer" className="m-3 flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5">
        <ExternalLink className="h-3.5 w-3.5" /> View website
      </a>
    </nav>
  );

  return (
    <ToastProvider>
      <ConfirmProvider>
        <div className="min-h-screen bg-[#f6f8fb]">
          <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-navy lg:block">{sidebar}</aside>
          {open && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
              <aside className="absolute inset-y-0 left-0 w-72 bg-navy">
                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="absolute right-3 top-4 rounded p-1 text-slate-300 hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
                {sidebar}
              </aside>
            </div>
          )}
          <div className="lg:pl-64">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
              <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden">
                <Menu className="h-5 w-5" />
              </button>
              <div className="ml-auto flex items-center gap-3">
                <Link href="/admin/profile" className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100">
                  <UserCircle className="h-7 w-7 text-slate-400" />
                  <span className="hidden text-left leading-tight sm:block">
                    <span className="block text-sm font-medium text-slate-800">{user.name}</span>
                    <span className="block text-[11px] text-slate-500">{ROLE_LABELS[user.role]}</span>
                  </span>
                </Link>
                <button
                  type="button"
                  title="Sign out"
                  onClick={async () => {
                    await api("/api/auth/logout", { method: "POST" }).catch(() => {});
                    router.replace("/admin/login");
                    router.refresh();
                  }}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-rose-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </header>
            <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
          </div>
        </div>
      </ConfirmProvider>
    </ToastProvider>
  );
}
