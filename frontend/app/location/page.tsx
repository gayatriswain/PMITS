import type { Metadata } from "next";
import TrustedBar from "../components/shared/TrustedBar";
import IndustriesWeEmpower from "../components/location/IndustriesWeEmpower";
import RecentSuccessStories from "../components/location/RecentSuccessStories";
import WhyChooseUs from "../components/shared/WhyChooseUs";
import ClientStories from "../components/shared/ClientStories";
import FAQSection from "../components/shared/FAQSection";
import CtaSection from "../components/shared/CtaSection";
import { cmsMetadata } from "../../lib/seo";
import { CmsSlot } from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";
import LocationHero from "../components/location/LocationHero";
import LocationServices from "../components/location/LocationServices";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/location");
}

export default function LocationPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd path="/location" />
      <CmsSlot path="/location" k="hero"><LocationHero /></CmsSlot>

      {/* Client logos strip + digital services intro */}
      <CmsSlot path="/location" k="services"><LocationServices slot1={<CmsSlot path="/location" k="trusted-bar"><TrustedBar /></CmsSlot>} /></CmsSlot>
      <CmsSlot path="/location" k="industries-we-empower"><IndustriesWeEmpower /></CmsSlot>
      <CmsSlot path="/location" k="recent-success-stories"><RecentSuccessStories /></CmsSlot>
      <CmsSlot path="/location" k="why-choose-us"><WhyChooseUs /></CmsSlot>
      <CmsSlot path="/location" k="client-stories"><ClientStories /></CmsSlot>
      <CmsSlot path="/location" k="faq-section"><FAQSection /></CmsSlot>
      <CmsSlot path="/location" k="cta-section"><CtaSection /></CmsSlot>
    </div>
  );
}
