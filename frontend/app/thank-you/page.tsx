import type { Metadata } from "next";
import ThankYouView, { thankYouMetadata } from "@/app/components/thank-you/ThankYouView";

export async function generateMetadata(): Promise<Metadata> {
  return thankYouMetadata();
}

export default function ThankYouPage() {
  return <ThankYouView />;
}
