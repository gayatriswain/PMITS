import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard } from "@/components/admin/AuthCard";
import { ResetForm } from "./ResetForm";

export const metadata: Metadata = { title: "Set a new password" };

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Set a new password">
      <Suspense>
        <ResetForm />
      </Suspense>
    </AuthCard>
  );
}
