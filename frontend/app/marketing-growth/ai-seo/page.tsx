import type { Metadata } from "next";
import { AiSeoStyles } from "../../components/shared/AiSeoShared";
import AiSeoHero from "../../components/ai-seo/AiSeoHero";
import AiSeoRankEverywhere from "../../components/ai-seo/AiSeoRankEverywhere";
import AiSeoTeam from "../../components/ai-seo/AiSeoTeam";
import AiSeoExperts from "../../components/ai-seo/AiSeoExperts";
import AiSeoDifference from "../../components/ai-seo/AiSeoDifference";
import AiSeoNeverStops from "../../components/ai-seo/AiSeoNeverStops";
import AiSeoProof from "../../components/ai-seo/AiSeoProof";
import AiSeoStrategy from "../../components/ai-seo/AiSeoStrategy";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "AI SEO Agent - Always Optimizing | Promanage",
  description:
    "Powered by multiple AI agents that work together to grow your visibility, rankings and revenue across Google, AI Overviews, ChatGPT, Gemini and every search experience.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/marketing-growth/ai-seo", staticMetadata);
}

export default function AiSeoPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-[#0b1b33]">
      <JsonLd path="/marketing-growth/ai-seo" />
      <AiSeoStyles />
      <CmsSections
        path="/marketing-growth/ai-seo"
        sections={[
          ["hero", <AiSeoHero key="hero" />],
          ["rank-everywhere", <AiSeoRankEverywhere key="rank-everywhere" />],
          ["team", <AiSeoTeam key="team" />],
          ["experts", <AiSeoExperts key="experts" />],
          ["difference", <AiSeoDifference key="difference" />],
          ["never-stops", <AiSeoNeverStops key="never-stops" />],
          ["proof", <AiSeoProof key="proof" />],
          ["strategy", <AiSeoStrategy key="strategy" />],
        ]}
      />
    </main>
  );
}
