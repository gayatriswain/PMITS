"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { api } from "@/lib/client/api";
import { Button } from "@/components/admin/ui";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // Only allow redirects back into the admin (no open redirects).
  const next = params.get("next");
  const target = next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setBusy(true);
        try {
          await api("/api/auth/login", { method: "POST", json: { email, password } });
          router.replace(target);
          router.refresh();
        } catch (err) {
          setError((err as Error).message);
          setBusy(false);
        }
      }}
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">Email</span>
        <span className="relative block">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15" />
        </span>
      </label>
      <label className="block">
        <span className="mb-1.5 flex items-center justify-between text-sm font-medium text-slate-700">
          Password
          <Link href="/admin/forgot-password" className="text-xs font-normal text-teal hover:underline">
            Forgot password?
          </Link>
        </span>
        <span className="relative block">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15" />
        </span>
      </label>
      {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <Button type="submit" className="h-11 w-full" loading={busy}>
        Sign in
      </Button>
    </form>
  );
}
