import type { Metadata } from "next";
import Container from "./components/shared/Container";
import GrowthDashboardCard from "./components/home/GrowthDashboardCard";
import ProjectsCarousel from "./components/home/ProjectsCarousel";
import CoreExpertise from "./components/home/CoreExpertise";
import TrustedBar from "./components/shared/TrustedBar";
import WhyChooseUs from "./components/shared/WhyChooseUs";
import ServicesShowcase from "./components/home/ServicesShowcase";
import ClientStories from "./components/shared/ClientStories";
import OurWork from "./components/home/OurWork";
import AboutBento from "./components/home/AboutBento";
import FAQSection from "./components/shared/FAQSection";
import CtaSection from "./components/shared/CtaSection";
import { cmsMetadata } from "../lib/seo";
import { CmsSlot } from "../components/cms/CmsSections";
import JsonLd from "../components/cms/JsonLd";
import HomeHero from "./components/home/HomeHero";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/");
}

export default function Home() {
  return (
    <div className="bg-slate-50">
      <JsonLd path="/" />
      <CmsSlot path="/" k="hero"><HomeHero slot1={<CmsSlot path="/" k="growth-dashboard-card"><GrowthDashboardCard /></CmsSlot>} /></CmsSlot>

      <CmsSlot path="/" k="projects-carousel"><ProjectsCarousel /></CmsSlot>
      <CmsSlot path="/" k="core-expertise"><CoreExpertise /></CmsSlot>
      <section className="bg-white pb-16 lg:pb-20">
        <Container>
          <CmsSlot path="/" k="trusted-bar"><TrustedBar /></CmsSlot>
        </Container>
      </section>
      <CmsSlot path="/" k="why-choose-us"><WhyChooseUs /></CmsSlot>
      <CmsSlot path="/" k="services-showcase"><ServicesShowcase /></CmsSlot>
      <CmsSlot path="/" k="client-stories"><ClientStories /></CmsSlot>
      <CmsSlot path="/" k="our-work"><OurWork /></CmsSlot>
      <CmsSlot path="/" k="about-bento"><AboutBento /></CmsSlot>
      <CmsSlot path="/" k="faq-section"><FAQSection /></CmsSlot>
      <CmsSlot path="/" k="cta-section"><CtaSection /></CmsSlot>
    </div>
  );
}
