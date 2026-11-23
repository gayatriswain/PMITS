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

export const metadata: Metadata = {
  title: "E-Commerce SEO Services | ProManage",
  description:
    "E-commerce SEO that gets your products found by the right shoppers and turns searches into sales.",
};

export default function EcommerceSeoPage() {
  return (
    <main className="min-h-screen bg-[#fafdfc]">
      <EcommerceSeoHero />
      <EcommerceSeoLayers />
      <EcommerceSeoEcosystem />
      <EcommerceSeoResults />
      <EcommerceSeoProcessSection />
      <GrowthPartnerSection />
      <LeadFormSection />
    </main>
  );
}
