import type { Metadata } from "next";
import ThankYouHero from "./ThankYouHero";
import { cmsMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/cms";
import CmsSections from "@/components/cms/CmsSections";

const staticMetadata: Metadata = {
  title: "Thank You | ProManage",
  description: "Thanks for contacting ProManage IT Solutions. Our team will get back to you within 24 hours.",
  robots: { index: false, follow: true },
};

/** Shared by /thank-you and /thank-you/<form>: never indexed, canonical is always /thank-you. */
export async function thankYouMetadata(): Promise<Metadata> {
  const meta = await cmsMetadata("/thank-you", staticMetadata);
  // canonical already points to /thank-you (cmsMetadata uses the base path)
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function ThankYouView() {
  const s = await getSettings();
  const contact = { phone: s?.contactPhone, email: s?.contactEmail };
  return (
    <main className="min-h-screen bg-white">
      <CmsSections path="/thank-you" sections={[["thank-you", <ThankYouHero key="thank-you" contact={contact} />]]} />
    </main>
  );
}
