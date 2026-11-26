import type { Metadata } from "next";
import UiUxHero from "@/app/components/ui-ux-design/UiUxHero";
import UiUxApproach from "@/app/components/ui-ux-design/UiUxApproach";
import UiUxWhatWeDo from "@/app/components/ui-ux-design/UiUxWhatWeDo";
import UiUxWhyUs from "@/app/components/ui-ux-design/UiUxWhyUs";
import UiUxClientStories from "@/app/components/ui-ux-design/UiUxClientStories";
import UiUxContactCTA from "@/app/components/ui-ux-design/UiUxContactCTA";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "UI/UX Design Services | ProManage",
  description:
    "We design digital experiences that are intuitive, meaningful and built to deliver real business results.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/design-innovation/ui-ux-design", staticMetadata);
}

export default function UiUxDesignPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/design-innovation/ui-ux-design" />
      {/* 1. Hero: Crafting Experiences. Creating Impact. */}
      <CmsSections
        path="/design-innovation/ui-ux-design"
        sections={[
          ["hero", <UiUxHero key="hero" />],
          ["approach", <UiUxApproach key="approach" />],
          ["what-we-do", <UiUxWhatWeDo key="what-we-do" />],
          ["why-us", <UiUxWhyUs key="why-us" />],
          ["client-stories", <UiUxClientStories key="client-stories" />],
          ["contact-cta", <UiUxContactCTA key="contact-cta" />],
        ]}
      />

      {/* 2. Our Approach: From insight to impact. (5-Step Wave Flow) */}

      {/* 3. What We Do: Digital experiences designed to perform. (1-by-1 Animated 3D Layers + 6 Cards + Stats) */}

      {/* 4. Why ProManage: Design with purpose. Built for impact. (4 Pillars + Center 3D Stack + Bottom Pill) */}

      {/* 5. Client Stories: Good design is felt. (Interactive Carousel with Multi-Device Mockups) */}

      {/* 6. Contact & CTA: Have a project in mind? It starts here. (with uiux.webp bg & floating point cards) */}
    </main>
  );
}
