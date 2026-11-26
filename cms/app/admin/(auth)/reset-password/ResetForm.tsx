"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/client/api";
import { Button } from "@/components/admin/ui";
import { PasswordInput } from "@/components/admin/PasswordInput";

export function ResetForm() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  if (!token || !email) return <p className="text-sm text-rose-600">This link is incomplete. Request a new reset link.</p>;
  if (done)
    return (
      <div className="space-y-4">
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Password updated. You can sign in now.</p>
        <Link href="/admin/login" className="text-sm text-teal hover:underline">Go to sign in</Link>
      </div>
    );
  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (password !== confirm) return setError("Passwords do not match.");
        setBusy(true);
        setError("");
        try {
          await api("/api/auth/reset-password", { method: "POST", json: { email, token, password } });
          setDone(true);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <p className="text-sm text-slate-500">Setting a new password for <b className="text-slate-700">{email}</b>. Use 10+ characters with upper and lower case letters and a number.</p>
      <PasswordInput required autoComplete="new-password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 text-sm outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
      <PasswordInput required autoComplete="new-password" placeholder="Repeat new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 text-sm outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10" />
      {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <Button type="submit" className="h-11 w-full" loading={busy}>Update password</Button>
    </form>
  );
}
