import type { ReactNode } from "react";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(60%_50%_at_50%_0%,rgba(13,148,136,0.12),transparent),#f6f8fb] px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-base font-bold text-white">P</span>
          <div className="leading-tight">
            <p className="font-semibold text-slate-900">ProManage</p>
            <p className="text-xs text-slate-500">Content Management</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(12,30,61,0.35)] sm:p-7">
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
