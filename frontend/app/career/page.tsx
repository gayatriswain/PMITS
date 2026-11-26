import type { Metadata } from "next";
import CareerHero from "../components/career/CareerHero";
import CareerWhyLove from "../components/career/CareerWhyLove";
import CareerLife from "../components/career/CareerLife";
import CareerHowWeWork from "../components/career/CareerHowWeWork";
import CareerOpenPositions from "../components/career/CareerOpenPositions";
import { jobOptions, type CmsJob } from "../components/career/careerJobs";
import { getCollection } from "../../lib/cms";
import CareerSendProfile from "../components/career/CareerSendProfile";
import { cmsMetadata } from "../../lib/seo";
import CmsSections from "../../components/cms/CmsSections";
import JsonLd from "../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Careers | ProManage",
  description:
    "Careers at ProManage IT Solution — work with people who turn ideas into technology, and technology into impact.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/career", staticMetadata);
}

export default async function CareerPage() {
  // Open jobs from the CMS "Careers" module (empty/unavailable -> the section's own list).
  const jobs = (await getCollection<CmsJob>("careers"))?.items ?? [];
  return (
    <div className="relative overflow-x-clip">
      <JsonLd path="/career" />
      <CmsSections
        path="/career"
        sections={[
          ["hero", <CareerHero key="hero" />],
          ["why-love", <CareerWhyLove key="why-love" />],
          ["life", <CareerLife key="life" />],
          ["how-we-work", <CareerHowWeWork key="how-we-work" />],
          ["open-positions", <CareerOpenPositions key="open-positions" jobs={jobs} />],
          ["send-profile", <CareerSendProfile key="send-profile" jobs={jobOptions(jobs)} />],
        ]}
      />
    </div>
  );
}
