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

export const metadata: Metadata = {
  title: "AI SEO Agent - Always Optimizing | Promanage",
  description:
    "Powered by multiple AI agents that work together to grow your visibility, rankings and revenue across Google, AI Overviews, ChatGPT, Gemini and every search experience.",
};

export default function AiSeoPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-[#0b1b33]">
      <AiSeoStyles />
      <AiSeoHero />
      <AiSeoRankEverywhere />
      <AiSeoTeam />
      <AiSeoExperts />
      <AiSeoDifference />
      <AiSeoNeverStops />
      <AiSeoProof />
      <AiSeoStrategy />
    </main>
  );
}
