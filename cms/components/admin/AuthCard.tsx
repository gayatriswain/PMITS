import type { ReactNode } from "react";
import { BarChart3, FileStack, Inbox, Search, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  { icon: FileStack, title: "Pages & sections", text: "Edit text, images and sliders without touching code." },
  { icon: Inbox, title: "Leads & enquiries", text: "Every form submission in one place, with email alerts." },
  { icon: Search, title: "SEO & publishing", text: "Titles, descriptions, drafts and one-click publish." },
];

/**
 * Sign-in / password screens: brand panel with soft animation on the left (desktop), form card on the right.
 * Animations are plain CSS (see .auth-* in globals.css) and switch off for "reduce motion" users.
 */
export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      {/* ---------- brand panel ---------- */}
      <aside className="relative hidden w-[46%] max-w-[760px] overflow-hidden bg-[linear-gradient(150deg,#0c1e3d_0%,#0b2f4a_55%,#0b5f5a_100%)] text-white lg:flex lg:flex-col">
        {/* background: grid, glows, orbit */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(70%_60%_at_40%_40%,#000,transparent)]" />
        <div aria-hidden className="auth-glow absolute -left-24 top-10 h-80 w-80 rounded-full bg-teal/40 blur-[90px]" />
        <div aria-hidden className="auth-glow absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px] [animation-delay:-4s]" />
        <div aria-hidden className="auth-orbit absolute right-[-120px] top-[18%] h-[420px] w-[420px] rounded-full border border-dashed border-white/15">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-teal-300 shadow-[0_0_14px_rgba(94,234,212,0.9)]" />
          <span className="absolute bottom-10 left-6 h-2 w-2 rounded-full bg-cyan-300" />
        </div>

        <div className="relative flex flex-1 flex-col px-12 py-10 xl:px-16">
          {/* logo */}
          <div className="auth-rise flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-lg font-extrabold text-navy shadow-lg">P</span>
            <div className="leading-tight">
              <p className="text-base font-semibold">ProManage</p>
              <p className="text-xs text-teal-100/80">Content Management</p>
            </div>
          </div>

          {/* headline */}
          <div className="my-auto max-w-md py-12">
            <p className="auth-rise inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-teal-100 [animation-delay:80ms]">
              <Sparkles className="h-3.5 w-3.5" /> Website admin
            </p>
            <h2 className="auth-rise mt-5 text-4xl font-bold leading-[1.15] tracking-tight [animation-delay:160ms] xl:text-[44px]">
              Run your website <span className="bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-transparent">from one place.</span>
            </h2>
            <p className="auth-rise mt-4 text-[15px] leading-relaxed text-slate-300 [animation-delay:240ms]">
              Content, enquiries, SEO and publishing for the ProManage website, all in a single dashboard.
            </p>

            <ul className="mt-9 space-y-4">
              {FEATURES.map((f, i) => (
                <li key={f.title} className="auth-rise flex items-start gap-3.5" style={{ animationDelay: `${320 + i * 90}ms` }}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/10 backdrop-blur">
                    <f.icon className="h-[18px] w-[18px] text-teal-200" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{f.title}</span>
                    <span className="block text-[13px] text-slate-300">{f.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* floating preview cards */}
          <div aria-hidden className="pointer-events-none absolute right-10 top-[16%] hidden xl:block">
            <div className="auth-float rounded-2xl border border-white/10 bg-white/10 p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal/80"><Inbox className="h-4 w-4" /></span>
                <div>
                  <p className="text-[11px] text-slate-300">New enquiry</p>
                  <p className="text-xs font-semibold">Website development</p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute bottom-[11%] right-14 hidden xl:block">
            <div className="auth-float rounded-2xl border border-white/10 bg-white/10 p-3.5 shadow-2xl backdrop-blur-md [animation-delay:-3s]">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-500/70"><BarChart3 className="h-4 w-4" /></span>
                <div>
                  <p className="text-[11px] text-slate-300">Page published</p>
                  <div className="mt-1 flex items-end gap-1">
                    {[10, 16, 12, 20, 26].map((h, i) => (
                      <span key={i} className="auth-bar w-1.5 rounded-sm bg-teal-200" style={{ height: h, animationDelay: `${i * 120}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="auth-rise flex items-center gap-2 text-xs text-slate-400 [animation-delay:600ms]">
            <ShieldCheck className="h-4 w-4 text-teal-300" /> Secure sign-in · sessions expire automatically
          </p>
        </div>
      </aside>

      {/* ---------- form ---------- */}
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-12">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_45%_at_70%_10%,rgba(13,148,136,0.10),transparent)]" />
        <div className="relative w-full max-w-[400px]">
          {/* compact brand on small screens */}
          <div className="auth-rise mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-base font-bold text-white">P</span>
            <div className="leading-tight">
              <p className="font-semibold text-slate-900">ProManage</p>
              <p className="text-xs text-slate-500">Content Management</p>
            </div>
          </div>

          <div className="auth-rise rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_30px_70px_-35px_rgba(12,30,61,0.45)] [animation-delay:120ms] sm:p-9">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/10 text-teal">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
            <div className="mt-7">{children}</div>
          </div>
          <p className="auth-rise mt-6 text-center text-xs text-slate-400 [animation-delay:240ms]">
            © {new Date().getFullYear()} ProManage IT Solution · Authorised staff only
          </p>
        </div>
      </main>
    </div>
  );
}
