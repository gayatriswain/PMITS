import type { Metadata } from "next";
import WebHostingHero from "../../components/web-hosting/WebHostingHero";
import WebHostingFeatures from "../../components/web-hosting/WebHostingFeatures";
import WebHostingSpeed from "../../components/web-hosting/WebHostingSpeed";
import WebHostingSecurity from "../../components/web-hosting/WebHostingSecurity";
import WebHostingScale from "../../components/web-hosting/WebHostingScale";
import WebHostingResults from "../../components/web-hosting/WebHostingResults";
import WebHostingResponsibility from "../../components/web-hosting/WebHostingResponsibility";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Web Hosting | ProManage",
  description: "Supercharge your business with premium web hosting.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/web-software/web-hosting", staticMetadata);
}

export default function WebHostingPage() {
  return (
    <main className="min-h-screen bg-white">
      <JsonLd path="/web-software/web-hosting" />
      <CmsSections
        path="/web-software/web-hosting"
        sections={[
          ["hero", <WebHostingHero key="hero" />],
          ["features", <WebHostingFeatures key="features" />],
          ["speed", <WebHostingSpeed key="speed" />],
          ["security", <WebHostingSecurity key="security" />],
          ["scale", <WebHostingScale key="scale" />],
          ["results", <WebHostingResults key="results" />],
          ["responsibility", <WebHostingResponsibility key="responsibility" />],
        ]}
      />
    </main>
  );
}
