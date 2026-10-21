import type { Metadata } from "next";
import WebHostingHero from "../../components/WebHostingHero";
import WebHostingFeatures from "../../components/WebHostingFeatures";
import WebHostingSpeed from "../../components/WebHostingSpeed";
import WebHostingSecurity from "../../components/WebHostingSecurity";

export const metadata: Metadata = {
  title: "Web Hosting | ProManage",
  description: "Supercharge your business with premium web hosting.",
};

export default function WebHostingPage() {
  return (
    <main className="min-h-screen bg-white">
      <WebHostingHero />
      <WebHostingFeatures />
      <WebHostingSpeed />
      <WebHostingSecurity />
    </main>
  );
}
