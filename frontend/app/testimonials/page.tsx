import type { Metadata } from "next";
import TestimonialsHero from "../components/testimonials/TestimonialsHero";
import TestimonialsAwards from "../components/testimonials/TestimonialsAwards";
import ClientStories from "../components/shared/ClientStories";
import TestimonialsPlatforms from "../components/testimonials/TestimonialsPlatforms";
import TestimonialsStrategy from "../components/testimonials/TestimonialsStrategy";
import { cmsMetadata } from "../../lib/seo";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Client Testimonials | ProManage",
  description: "Real feedback from ProManage clients. Real relationships, and real results that drive businesses forward.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/testimonials", staticMetadata);
}

export default function TestimonialsPage() {
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/testimonials" />
      <CmsSections
        path="/testimonials"
        sections={[
          ["hero", <TestimonialsHero key="hero" />],
          ["awards", <TestimonialsAwards key="awards" />],
          ["client-stories", <ClientStories key="client-stories" />],
          ["platforms", <TestimonialsPlatforms key="platforms" />],
          ["strategy", <TestimonialsStrategy key="strategy" />],
        ]}
      />
    </div>
  );
}
