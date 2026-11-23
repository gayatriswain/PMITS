import type { Metadata } from "next";
import CareerHero from "../components/CareerHero";
import CareerWhyLove from "../components/CareerWhyLove";
import CareerLife from "../components/CareerLife";
import CareerHowWeWork from "../components/CareerHowWeWork";
import CareerOpenPositions from "../components/CareerOpenPositions";
import CareerSendProfile from "../components/CareerSendProfile";

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
