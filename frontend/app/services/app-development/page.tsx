import type { Metadata } from "next";
import AppDevHero from "../../components/AppDevHero";
import AppDevShowcase from "../../components/AppDevShowcase";
import AppDevServices from "../../components/AppDevServices";
import AppDevProcess from "../../components/AppDevProcess";
import WebsiteDevComparison from "../../components/WebsiteDevComparison";
import WebsiteDevStrategyCta from "../../components/WebsiteDevStrategyCta";
import FAQSection from "../../components/FAQSection";

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
