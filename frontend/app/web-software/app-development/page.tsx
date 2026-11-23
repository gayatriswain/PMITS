import type { Metadata } from "next";
import AppDevHero from "../../components/app-development/AppDevHero";
import AppDevShowcase from "../../components/app-development/AppDevShowcase";
import AppDevServices from "../../components/app-development/AppDevServices";
import AppDevProcess from "../../components/app-development/AppDevProcess";
import WebsiteDevComparison from "../../components/shared/WebsiteDevComparison";
import WebsiteDevStrategyCta from "../../components/shared/WebsiteDevStrategyCta";
import FAQSection from "../../components/shared/FAQSection";

export const metadata: Metadata = {
  title: "App Development | ProManage",
  description:
    "We design and develop intuitive, high-performance mobile apps that engage users, streamline operations and help your business grow.",
};

export default function AppDevelopmentPage() {
  return (
    <div className="relative overflow-x-clip">
      <AppDevHero />
      <AppDevShowcase />
      <AppDevServices />
      <AppDevProcess />
      <WebsiteDevComparison />
      <WebsiteDevStrategyCta />
      <FAQSection />
    </div>
  );
}
