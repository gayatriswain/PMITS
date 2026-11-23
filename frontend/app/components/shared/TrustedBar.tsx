import Image from "next/image";

/* Logos live in /public/clients. To use a real logo, drop the file there and point `src` at it
   (any width works: every logo is scaled to the same height, keeping its aspect ratio). */
const clientLogos: { name: string; src: string; w: number; h: number; tall?: boolean }[] = [
  { name: "Max Healthcare", src: "/clients/max-healthcare.svg", w: 112, h: 44 },
  { name: "Danube Properties", src: "/clients/danube-properties.svg", w: 150, h: 44 },
  { name: "The Better India", src: "/clients/the-better-india.svg", w: 62, h: 58, tall: true },
  { name: "HomeLane", src: "/clients/homelane.svg", w: 150, h: 44 },
  { name: "Tynor", src: "/clients/tynor.svg", w: 110, h: 50 },
  { name: "Policybazaar", src: "/clients/policybazaar.svg", w: 152, h: 44 },
  { name: "Bikanervala", src: "/clients/bikanervala.svg", w: 120, h: 50 },
];

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {clientLogos.map((logo) => (
        <li
          key={logo.name}
          className="flex h-14 shrink-0 items-center border-r border-slate-200/80 px-7 sm:px-9"
        >
          <Image
            src={logo.src}
            alt={hidden ? "" : logo.name}
            width={logo.w}
            height={logo.h}
            className={`w-auto opacity-85 transition duration-300 hover:scale-105 hover:opacity-100 ${logo.tall ? "h-11 sm:h-12" : "h-8 sm:h-9"}`}
          />
        </li>
      ))}
    </ul>
  );
}

export default function TrustedBar() {
  return (
    <div className="flex flex-col items-center gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)] sm:flex-row sm:gap-0 sm:px-6">
      <p className="shrink-0 text-center text-sm font-medium leading-relaxed text-slate-600 sm:w-56 sm:border-r lg:w-60 sm:border-slate-200 sm:pr-6 sm:text-left">
        Trusted by 250+ Businesses
        <br /> Across 15+ Industries
      </p>

      {/* infinite marquee: the row is rendered twice and the track slides by exactly one copy (-50%) */}
      <div
        className="relative w-full min-w-0 flex-1 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)",
        }}
      >
        <div className="animate-ticker-x flex w-max motion-reduce:animate-none" style={{ animationDuration: "30s" }}>
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </div>
  );
}
