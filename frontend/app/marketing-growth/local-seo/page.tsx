import type { Metadata } from "next";
import { LocalSeoStyles } from "../../components/local-seo/LocalSeoShared";
import LocalSeoHero from "../../components/local-seo/LocalSeoHero";
import LocalSeoJourney from "../../components/local-seo/LocalSeoJourney";
import LocalSeoDominate from "../../components/local-seo/LocalSeoDominate";
import LocalSeoEverywhere from "../../components/local-seo/LocalSeoEverywhere";
import LocalSeoOptimize from "../../components/local-seo/LocalSeoOptimize";
import LocalSeoResults from "../../components/local-seo/LocalSeoResults";
import LocalSeoContact from "../../components/local-seo/LocalSeoContact";

export const metadata: Metadata = {
  title: "Local SEO Services - Be Found. Get Chosen. Grow Locally. | ProManage",
  description:
    "Local SEO that drives real customers: Google Business Profile optimization, local keywords, citations, reviews and location pages so nearby customers find and choose you.",
};

export default function LocalSeoPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-white text-[#0b1b33]">
      <LocalSeoStyles />
      <LocalSeoHero />
      <LocalSeoJourney />
      <LocalSeoDominate />
      <LocalSeoEverywhere />
      <LocalSeoOptimize />
      <LocalSeoResults />
      <LocalSeoContact />
    </main>
  );
}
