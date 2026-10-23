import type { Metadata } from "next";
import WhoWeAreHero from "../components/WhoWeAreHero";
import WhoWeAreSolve from "../components/WhoWeAreSolve";
import WhoWeAreApproach from "../components/WhoWeAreApproach";
import WhoWeAreMission from "../components/WhoWeAreMission";

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
    </div>
  );
}
