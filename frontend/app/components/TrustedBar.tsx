const clientLogos = [
  "NOVA Health",
  "GRANDVIEW Properties",
  "The Daily Digest",
  "CASA Living",
  "FitPro",
  "SecurePay",
  "Birchwood Materials",
];

export default function TrustedBar() {
  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-slate-100 bg-white px-6 py-6 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)] sm:flex-row sm:justify-between">
      <p className="whitespace-nowrap text-sm font-medium text-slate-500">
        Trusted by 250+ Businesses
        <br className="sm:hidden" /> Across 15+ Industries
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {clientLogos.map((logo) => (
          <span key={logo} className="text-sm font-extrabold uppercase tracking-wide text-slate-400">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
