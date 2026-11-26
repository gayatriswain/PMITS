import type { Metadata } from "next";
import AgenticAiHero from "@/app/components/custom-agentic-ai-solution/AgenticAiHero";
import AgenticAiWorkflow from "@/app/components/custom-agentic-ai-solution/AgenticAiWorkflow";
import AgenticAiLiveAction from "@/app/components/custom-agentic-ai-solution/AgenticAiLiveAction";
import AgenticAiFeatures from "@/app/components/custom-agentic-ai-solution/AgenticAiFeatures";
import AgenticAiPlatform from "@/app/components/custom-agentic-ai-solution/AgenticAiPlatform";
import AgenticAiCTA from "@/app/components/custom-agentic-ai-solution/AgenticAiCTA";
import { cmsMetadata } from "../../../lib/seo";
import CmsSections from "../../../components/cms/CmsSections";
import JsonLd from "../../../components/cms/JsonLd";

const staticMetadata: Metadata = {
  title: "Custom Agentic AI Solution | ProManage",
  description:
    "AI that thinks. AI that acts. We build intelligent AI agents that understand your business, make decisions and take action — automatically.",
};

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/design-innovation/custom-agentic-ai-solution", staticMetadata);
}

export default function CustomAgenticAiSolutionPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      <JsonLd path="/design-innovation/custom-agentic-ai-solution" />
      {/* 1. Hero: AI That Thinks. AI That Acts. with floating agent activity cards and command box */}
      <CmsSections
        path="/design-innovation/custom-agentic-ai-solution"
        sections={[
          ["hero", <AgenticAiHero key="hero" />],
          ["workflow", <AgenticAiWorkflow key="workflow" />],
          ["live-action", <AgenticAiLiveAction key="live-action" />],
          ["features", <AgenticAiFeatures key="features" />],
          ["platform", <AgenticAiPlatform key="platform" />],
          ["cta", <AgenticAiCTA key="cta" />],
        ]}
      />

      {/* 2. Architecture & Workflow: AI That Works Your Way */}

      {/* 3. See It In Action: Watch Your Agent Go to Work */}

      {/* 4. Features: Smarter Tools to Accelerate Your Growth */}

      {/* 5. Intelligent Agents. Real Results. */}

      {/* 6. Ready to Lead with AI? */}
    </main>
  );
}
