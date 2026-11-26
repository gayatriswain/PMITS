import type { Metadata } from "next";
import WhoWeAreHero from "../components/who-we-are/WhoWeAreHero";
import WhoWeAreSolve from "../components/who-we-are/WhoWeAreSolve";
import WhoWeAreApproach from "../components/who-we-are/WhoWeAreApproach";
import WhoWeAreMission from "../components/who-we-are/WhoWeAreMission";
import WhoWeAreVision from "../components/who-we-are/WhoWeAreVision";
import WhoWeAreValues from "../components/who-we-are/WhoWeAreValues";
import WooProposal from "../components/shared/WooProposal";
import { cmsMetadata } from "../../lib/seo";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Who We Are | ProManage",
  description:
    "ProManage IT Solution — a global IT agency serving clients across 75+ cities. Solutions today, success tomorrow.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/who-we-are", staticMetadata);
}

export default function WhoWeArePage() {
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/who-we-are" />
      <CmsSections
        path="/who-we-are"
        sections={[
          ["hero", <WhoWeAreHero key="hero" />],
          ["solve", <WhoWeAreSolve key="solve" />],
          ["approach", <WhoWeAreApproach key="approach" />],
          ["mission", <WhoWeAreMission key="mission" />],
          ["vision", <WhoWeAreVision key="vision" />],
          ["values", <WhoWeAreValues key="values" />],
          ["woo-proposal", <WooProposal key="woo-proposal" formId="who-we-are-proposal" fieldPrefix="wwa" sectionId="who-we-are-proposal-section" />],
        ]}
      />
    </div>
  );
}
