import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EcommerceSeoHero from "../../components/EcommerceSeoHero";
import EcommerceSeoLayers from "../../components/EcommerceSeoLayers";
import EcommerceSeoEcosystem from "../../components/EcommerceSeoEcosystem";
import EcommerceSeoResults from "../../components/EcommerceSeoResults";
import EcommerceSeoProcessSection from "../../components/EcommerceSeoProcessSection";
import GrowthPartnerSection from "../../components/GrowthPartnerSection";
import LeadFormSection from "../../components/LeadFormSection";

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
