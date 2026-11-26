"use client";

import Link from "next/link";
import { useState } from "react";
import { api } from "@/lib/client/api";
import { AuthCard } from "@/components/admin/AuthCard";
import { Button } from "@/components/admin/ui";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <AuthCard title="Reset your password" subtitle="We'll email you a link that is valid for 30 minutes.">
      {msg ? (
        <div className="space-y-4">
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{msg}</p>
          <Link href="/admin/login" className="text-sm text-teal hover:underline">Back to sign in</Link>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            try {
              await api("/api/auth/forgot-password", { method: "POST", json: { email } });
              setMsg("If that email belongs to an admin, a reset link has been sent. If email is not set up, ask a Super Admin to create a reset link for you.");
            } catch (err) {
              setError((err as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/15" />
          {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
          <Button type="submit" className="h-11 w-full" loading={busy}>Send reset link</Button>
          <Link href="/admin/login" className="block text-center text-sm text-slate-500 hover:text-teal">Back to sign in</Link>
        </form>
      )}
    </AuthCard>
  );
}
