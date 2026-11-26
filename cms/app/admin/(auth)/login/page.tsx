import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth";
import { AuthCard } from "@/components/admin/AuthCard";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/admin");
  return (
    <AuthCard title="Welcome back" subtitle="Sign in to manage the ProManage website.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
