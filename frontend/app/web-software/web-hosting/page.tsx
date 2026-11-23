import type { Metadata } from "next";
import WebHostingHero from "../../components/web-hosting/WebHostingHero";
import WebHostingFeatures from "../../components/web-hosting/WebHostingFeatures";
import WebHostingSpeed from "../../components/web-hosting/WebHostingSpeed";
import WebHostingSecurity from "../../components/web-hosting/WebHostingSecurity";

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
