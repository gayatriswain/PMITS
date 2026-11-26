import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ThankYouView, { thankYouMetadata } from "@/app/components/thank-you/ThankYouView";

/** /thank-you/<form-name>: same page; the form name stays in a clean path (for analytics) instead of a "?from=" query. */
export async function generateMetadata(): Promise<Metadata> {
  return thankYouMetadata();
}

export default async function ThankYouFormPage({ params }: { params: Promise<{ form: string }> }) {
  const { form } = await params;
  if (!/^[a-z0-9-]{1,60}$/.test(form)) notFound();
  return <ThankYouView />;
}
