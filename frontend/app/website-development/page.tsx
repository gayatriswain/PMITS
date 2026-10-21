import Image from "next/image";
import Link from "next/link";
import Container from "../components/Container";
import WebsiteDevHeroVisual from "../components/WebsiteDevHeroVisual";
import TrustedBar from "../components/TrustedBar";
import WebsiteDevTransformations from "../components/WebsiteDevTransformations";
import WebsiteDevApproach from "../components/WebsiteDevApproach";
import WebsiteDevGrowthJourney from "../components/WebsiteDevGrowthJourney";
import WebsiteDevComparison from "../components/WebsiteDevComparison";
import WebsiteDevGrowthPlan from "../components/WebsiteDevGrowthPlan";
import WebsiteDevStrategyCta from "../components/WebsiteDevStrategyCta";
import FAQSection from "../components/FAQSection";

const NAVY = "#132a43";
const TEAL = "#0d9488";

export default function WebsiteDevelopmentPage() {
  return (
    <div className="relative overflow-x-clip min-h-[90vh] bg-[#F5F7F8]">
      <section className="pt-12 pb-12 lg:pt-16 lg:pb-16 relative z-10">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column Content */}
          <div className="max-w-xl">
            <h4 className="text-xs lg:text-sm font-bold tracking-[0.15em] uppercase mb-4" style={{ color: TEAL }}>
              WEBSITE DEVELOPMENT SERVICES
            </h4>

            <h1 className="font-serif text-4xl leading-[1.15] md:text-[3.25rem] font-extrabold mb-5 tracking-tight">
              <span style={{ color: NAVY }}>We Build Websites<br />That Do More.</span><br />
              <span style={{ color: TEAL }}>So You Can Grow<br />Without Limits.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Strategy-led websites that attract the right audience, build trust and turn clicks into loyal customers.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold transition-transform hover:-translate-y-1 shadow-lg shadow-teal-500/30"
                style={{ backgroundColor: TEAL }}
              >
                Start Your Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>

              <Link href="/portfolio" className="inline-flex items-center gap-3 group">
                <span className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-teal-100 text-teal-600 group-hover:bg-teal-50 transition-colors shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </span>
                <span className="font-bold text-sm" style={{ color: NAVY }}>
                  See Our Work
                </span>
              </Link>
            </div>

            {/* Trusted By Section */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-200">
                    <Image src="/image1.jpg" alt="User" fill className="object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-teal-50 flex items-center justify-center text-[11px] font-bold text-teal-700 shadow-sm z-10 relative">
                  25+
                </div>
              </div>
              <p className="text-xs font-medium text-slate-500 leading-snug">
                Trusted by 250+<br />businesses worldwide
              </p>
            </div>
          </div>

          {/* Right Column Visual Composition */}
          <div className="relative w-full flex justify-center lg:justify-end mt-12 lg:mt-0">
            <WebsiteDevHeroVisual />
          </div>
        </Container>
      </section>
      
      <section className="bg-[#F5F7F8] pb-12 lg:pb-16 relative z-10 -mt-4 lg:-mt-8">
        <Container>
          <TrustedBar />
        </Container>
      </section>
      
      <WebsiteDevTransformations />

      <WebsiteDevApproach />

      <WebsiteDevGrowthJourney />

      <WebsiteDevComparison />

      <WebsiteDevGrowthPlan />

      <WebsiteDevStrategyCta />

      <FAQSection />
    </div>
  );
}
