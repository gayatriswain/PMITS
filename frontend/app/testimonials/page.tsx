import type { Metadata } from "next";
import TestimonialsHero from "../components/TestimonialsHero";
import TestimonialsAwards from "../components/TestimonialsAwards";
import ClientStories from "../components/ClientStories";
import TestimonialsPlatforms from "../components/TestimonialsPlatforms";
import TestimonialsStrategy from "../components/TestimonialsStrategy";

export const metadata: Metadata = {
  title: "Client Testimonials | ProManage",
  description: "Real feedback from ProManage clients. Real relationships, and real results that drive businesses forward.",
};

export default function TestimonialsPage() {
  return (
    <div className="relative overflow-x-clip">
      <TestimonialsHero />
      <TestimonialsAwards />
      <ClientStories />
      <TestimonialsPlatforms />
      <TestimonialsStrategy />
    </div>
  );
}
