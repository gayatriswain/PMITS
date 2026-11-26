import type { Metadata } from "next";
import ArVrHero from "@/app/components/custom-ar-vr-solution/ArVrHero";
import ArVrSolutions from "@/app/components/custom-ar-vr-solution/ArVrSolutions";
import ArVrShowcase from "@/app/components/custom-ar-vr-solution/ArVrShowcase";
import ArVrWhy from "@/app/components/custom-ar-vr-solution/ArVrWhy";
import ArVrApproach from "@/app/components/custom-ar-vr-solution/ArVrApproach";
import ArVrCTA from "@/app/components/custom-ar-vr-solution/ArVrCTA";
import ArVrResults from "@/app/components/custom-ar-vr-solution/ArVrResults";
import ArVrContact from "@/app/components/custom-ar-vr-solution/ArVrContact";
import { getSettings } from "../../../lib/cms";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Custom AR/VR Solutions | ProManage",
  description:
    "Step Into. Experience. Transform. We create immersive AR/VR experiences that connect imagination with real-world impact.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/design-innovation/custom-ar-vr-solution", staticMetadata);
}

export default async function CustomArVrSolutionPage() {
  const s = await getSettings();
  const contact = { address: s?.address, email: s?.contactEmail, phone: s?.contactPhone, hours: s?.workingHours };
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/design-innovation/custom-ar-vr-solution" />
      {/* 1. Hero Section (background image) */}
      <CmsSections
        path="/design-innovation/custom-ar-vr-solution"
        sections={[
          ["hero", <ArVrHero key="hero" />],
          ["solutions", <ArVrSolutions key="solutions" />],
          ["cta", <ArVrCTA key="cta" />],
          ["approach", <ArVrApproach key="approach" />],
          ["showcase", <ArVrShowcase key="showcase" />],
          ["why", <ArVrWhy key="why" />],
          ["results", <ArVrResults key="results" />],
          ["contact", <ArVrContact key="contact" details={contact} />],
        ]}
      />

      {/* 2. Immersive Solutions: cards around the centre artwork + stats bar */}

      {/* 3. CTA: archway artwork, consultation form, trusted-by row */}

      {/* 4. Our Approach: 5-step process on a wavy line + stats bar */}

      {/* 5. What we create: circular carousel of solution cards + feature bar (bottom of the page) */}

      {/* 6. Why ProManage: five points on an arc + specialist CTA (bottom of the page) */}
    </main>
  );
}
