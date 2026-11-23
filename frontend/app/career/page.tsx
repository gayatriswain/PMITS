import type { Metadata } from "next";
import CareerHero from "../components/career/CareerHero";
import CareerWhyLove from "../components/career/CareerWhyLove";
import CareerLife from "../components/career/CareerLife";
import CareerHowWeWork from "../components/career/CareerHowWeWork";
import CareerOpenPositions from "../components/career/CareerOpenPositions";
import CareerSendProfile from "../components/career/CareerSendProfile";

export const metadata: Metadata = {
  title: "Careers | ProManage",
  description:
    "Careers at ProManage IT Solution — work with people who turn ideas into technology, and technology into impact.",
};

export default function CareerPage() {
  return (
    <div className="relative overflow-x-clip">
      <CareerHero />
      <CareerWhyLove />
      <CareerLife />
      <CareerHowWeWork />
      <CareerOpenPositions />
      <CareerSendProfile />
    </div>
  );
}
