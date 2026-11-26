import type { Metadata } from "next";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import EcommerceSeoHero from "../../components/ecommerce-seo/EcommerceSeoHero";
import EcommerceSeoLayers from "../../components/ecommerce-seo/EcommerceSeoLayers";
import EcommerceSeoEcosystem from "../../components/ecommerce-seo/EcommerceSeoEcosystem";
import EcommerceSeoResults from "../../components/ecommerce-seo/EcommerceSeoResults";
import EcommerceSeoProcessSection from "../../components/ecommerce-seo/EcommerceSeoProcessSection";
import GrowthPartnerSection from "../../components/ecommerce-seo/GrowthPartnerSection";
import LeadFormSection from "../../components/ecommerce-seo/LeadFormSection";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "E-Commerce SEO Services | ProManage",
  description:
    "E-commerce SEO that gets your products found by the right shoppers and turns searches into sales.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/marketing-growth/ecommerce-seo", staticMetadata);
}

export default function EcommerceSeoPage() {
  return (
    <main className="min-h-screen bg-[#fafdfc]">
      <JsonLd path="/marketing-growth/ecommerce-seo" />
      <CmsSections
        path="/marketing-growth/ecommerce-seo"
        sections={[
          ["hero", <EcommerceSeoHero key="hero" />],
          ["layers", <EcommerceSeoLayers key="layers" />],
          ["ecosystem", <EcommerceSeoEcosystem key="ecosystem" />],
          ["results", <EcommerceSeoResults key="results" />],
          ["process-section", <EcommerceSeoProcessSection key="process-section" />],
          ["growth-partner-section", <GrowthPartnerSection key="growth-partner-section" />],
          ["lead-form-section", <LeadFormSection key="lead-form-section" />],
        ]}
      />
    </main>
  );
}
