import type { Metadata } from "next";
import CustomDevHero from "@/app/components/custom-development/CustomDevHero";
import CustomDevFeatures from "@/app/components/custom-development/CustomDevFeatures";
import CustomDevWhatWeBuild from "@/app/components/custom-development/CustomDevWhatWeBuild";
import CustomDevGrowthPartner from "@/app/components/custom-development/CustomDevGrowthPartner";
import CustomDevOurWork from "@/app/components/custom-development/CustomDevOurWork";
import CustomDevStartProject from "@/app/components/custom-development/CustomDevStartProject";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Custom Development Services | ProManage",
  description: "We build fully custom web applications and software solutions designed around your business, your workflow, and your future.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/web-software/custom-development", staticMetadata);
}

export default function CustomDevelopmentPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <JsonLd path="/web-software/custom-development" />
      <CmsSections
        path="/web-software/custom-development"
        sections={[
          ["hero", <CustomDevHero key="hero" />],
          ["features", <CustomDevFeatures key="features" />],
          ["what-we-build", <CustomDevWhatWeBuild key="what-we-build" />],
          ["growth-partner", <CustomDevGrowthPartner key="growth-partner" />],
          ["our-work", <CustomDevOurWork key="our-work" />],
          ["start-project", <CustomDevStartProject key="start-project" />],
        ]}
      />
    </div>
  );
}
