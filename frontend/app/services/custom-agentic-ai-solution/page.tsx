import type { Metadata } from "next";
import AgenticAiHero from "@/app/components/AgenticAiHero";
import AgenticAiWorkflow from "@/app/components/AgenticAiWorkflow";
import AgenticAiLiveAction from "@/app/components/AgenticAiLiveAction";
import AgenticAiFeatures from "@/app/components/AgenticAiFeatures";
import AgenticAiPlatform from "@/app/components/AgenticAiPlatform";
import AgenticAiCTA from "@/app/components/AgenticAiCTA";

export const metadata: Metadata = {
  title: "Custom Agentic AI Solution | ProManage",
  description:
    "AI that thinks. AI that acts. We build intelligent AI agents that understand your business, make decisions and take action — automatically.",
};

export default function CustomAgenticAiSolutionPage() {
  return (
    <main className="relative min-h-screen bg-white overflow-x-clip">
      {/* 1. Hero: AI That Thinks. AI That Acts. with floating agent activity cards and command box */}
      <AgenticAiHero />

      {/* 2. Architecture & Workflow: AI That Works Your Way */}
      <AgenticAiWorkflow />

      {/* 3. See It In Action: Watch Your Agent Go to Work */}
      <AgenticAiLiveAction />

      {/* 4. Features: Smarter Tools to Accelerate Your Growth */}
      <AgenticAiFeatures />

      {/* 5. Intelligent Agents. Real Results. */}
      <AgenticAiPlatform />

      {/* 6. Ready to Lead with AI? */}
      <AgenticAiCTA />
    </main>
  );
}
