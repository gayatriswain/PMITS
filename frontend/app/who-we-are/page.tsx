import type { Metadata } from "next";
import WhoWeAreHero from "../components/who-we-are/WhoWeAreHero";
import WhoWeAreSolve from "../components/who-we-are/WhoWeAreSolve";
import WhoWeAreApproach from "../components/who-we-are/WhoWeAreApproach";
import WhoWeAreMission from "../components/who-we-are/WhoWeAreMission";
import WhoWeAreVision from "../components/who-we-are/WhoWeAreVision";
import WhoWeAreValues from "../components/who-we-are/WhoWeAreValues";
import WooProposal from "../components/shared/WooProposal";

export const metadata: Metadata = {
  title: "Who We Are | ProManage",
  description:
    "ProManage IT Solution — a global IT agency serving clients across 75+ cities. Solutions today, success tomorrow.",
};

export default function WhoWeArePage() {
  return (
    <div className="relative overflow-x-clip">
      <WhoWeAreHero />
      <WhoWeAreSolve />
      <WhoWeAreApproach />
      <WhoWeAreMission />
      <WhoWeAreVision />
      <WhoWeAreValues />
      <WooProposal formId="who-we-are-proposal" fieldPrefix="wwa" sectionId="who-we-are-proposal-section" />
    </div>
  );
}
