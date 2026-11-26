import type { Metadata } from "next";
import WhyChooseUsHero from "@/app/components/why-choose-us/WhyChooseUsHero";
import WhyChooseUsBenefits from "@/app/components/why-choose-us/WhyChooseUsBenefits";
import WhyChooseUsApproach from "@/app/components/why-choose-us/WhyChooseUsApproach";
import HowWeWorkProcess from "@/app/components/why-choose-us/HowWeWorkProcess";
import WhyChooseUsValue from "@/app/components/why-choose-us/WhyChooseUsValue";
import WhyChooseUsFutureReady from "@/app/components/why-choose-us/WhyChooseUsFutureReady";
import WhyChooseUsProposalForm from "@/app/components/why-choose-us/WhyChooseUsProposalForm";
import { cmsMetadata } from "../../lib/seo";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Why Choose Us | ProManage",
  description: "Strategy. Design. Technology. Growth. Everything aligned to deliver real results that matter to you.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/why-choose-us", staticMetadata);
}

export default function WhyChooseUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd path="/why-choose-us" />
      <CmsSections
        path="/why-choose-us"
        sections={[
          ["hero", <WhyChooseUsHero key="hero" />],
          ["benefits", <WhyChooseUsBenefits key="benefits" />],
          ["how-we-work-process", <HowWeWorkProcess key="how-we-work-process" />],
          ["approach", <WhyChooseUsApproach key="approach" />],
          ["value", <WhyChooseUsValue key="value" />],
          ["future-ready", <WhyChooseUsFutureReady key="future-ready" />],
          ["proposal-form", <WhyChooseUsProposalForm key="proposal-form" />],
        ]}
      />
    </div>
  );
}
