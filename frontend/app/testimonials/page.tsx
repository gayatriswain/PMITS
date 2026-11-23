import type { Metadata } from "next";
import TestimonialsHero from "../components/testimonials/TestimonialsHero";
import TestimonialsAwards from "../components/testimonials/TestimonialsAwards";
import ClientStories from "../components/shared/ClientStories";
import TestimonialsPlatforms from "../components/testimonials/TestimonialsPlatforms";
import TestimonialsStrategy from "../components/testimonials/TestimonialsStrategy";

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
