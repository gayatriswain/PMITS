import type { Metadata } from "next";
import HireCorePhpHero from "@/app/components/hire-core-php-developers/HireCorePhpHero";
import HireCorePhpApproach from "@/app/components/hire-core-php-developers/HireCorePhpApproach";
import HireCorePhpWhyItMatters from "@/app/components/hire-core-php-developers/HireCorePhpWhyItMatters";
import HireCorePhpSolutions from "@/app/components/hire-core-php-developers/HireCorePhpSolutions";
import HireCorePhpWhyChooseUs from "@/app/components/hire-core-php-developers/HireCorePhpWhyChooseUs";
import HireCorePhpWhatYouCanBuild from "@/app/components/hire-core-php-developers/HireCorePhpWhatYouCanBuild";
import HireCorePhpWhyHireFromUs from "@/app/components/hire-core-php-developers/HireCorePhpWhyHireFromUs";
import HireCorePhpSignature from "@/app/components/hire-core-php-developers/HireCorePhpSignature";
import HireCorePhpCaseStudy from "@/app/components/hire-core-php-developers/HireCorePhpCaseStudy";
import HireCorePhpNextStep from "@/app/components/hire-core-php-developers/HireCorePhpNextStep";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Hire Core PHP Developers | ProManage",
  description:
    "Bring in dedicated PHP experts who build, optimize and scale powerful web applications.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hire-developer/hire-core-php-developers", staticMetadata);
}

export default function HireCorePhpPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/hire-developer/hire-core-php-developers" />
      <CmsSections
        path="/hire-developer/hire-core-php-developers"
        sections={[
          ["hero", <HireCorePhpHero key="hero" />],
          ["approach", <HireCorePhpApproach key="approach" />],
          ["why-it-matters", <HireCorePhpWhyItMatters key="why-it-matters" />],
          ["solutions", <HireCorePhpSolutions key="solutions" />],
          ["why-choose-us", <HireCorePhpWhyChooseUs key="why-choose-us" />],
          ["case-study", <HireCorePhpCaseStudy key="case-study" />],
          ["what-you-can-build", <HireCorePhpWhatYouCanBuild key="what-you-can-build" />],
          ["why-hire-from-us", <HireCorePhpWhyHireFromUs key="why-hire-from-us" />],
          ["next-step", <HireCorePhpNextStep key="next-step" />],
          ["signature", <HireCorePhpSignature key="signature" />],
        ]}
      />
    </main>
  );
}
