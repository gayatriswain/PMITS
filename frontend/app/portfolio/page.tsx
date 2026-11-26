import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getCollection } from "@/lib/cms";
import { cmsImage } from "@/lib/images";
import CtaSection from "../components/shared/CtaSection";
import { GlobalSlot } from "@/components/cms/CmsSections";

/** Portfolio listing — published projects from the CMS Portfolio module. */
type Project = { _id: string; slug: string; name: string; client?: string; category?: string; featuredImage?: string; technologies?: string[] };

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Our Work | ProManage",
  description: "Selected websites, apps and digital growth projects delivered by ProManage IT Solution.",
  alternates: { canonical: `${SITE}/portfolio` },
};

export default async function PortfolioPage() {
  const res = await getCollection<Project>("portfolio", { limit: 100 });
  const projects = res?.items ?? [];
  // No published projects yet: the many "View our work" buttons go to the client success stories
  // instead of an empty page. Publishing a project in Admin -> Portfolio brings this page back.
  if (!projects.length) redirect("/testimonials");

  return (
    <main className="min-h-screen bg-[#fafdfc] font-sans">
      <section className="relative overflow-hidden pb-6 pt-14 lg:pt-20">
        <div className="pointer-events-none absolute right-[-5%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[#99f6e4]/25 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <span className="inline-block rounded-full border border-[#0d9488]/25 bg-[#f0fdfa] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Our Work</span>
          <h1 className="text-h1 font-playfair mx-auto mt-5 max-w-3xl font-bold text-[#0f2333]">Projects that drive real growth</h1>
          <p className="text-body mx-auto mt-4 max-w-2xl text-slate-600">A selection of websites, apps and campaigns we have designed, built and grown with our clients.</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => {
            const img = cmsImage(p.featuredImage);
            return (
              <Link key={p._id} href={`/portfolio/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,118,110,0.1)]">
                <div className="relative aspect-[16/10] bg-slate-100">
                  {img && <Image src={img.src} unoptimized={img.unoptimized} alt={p.name} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                  {p.category && <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0f766e] shadow-sm">{p.category}</span>}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg font-bold text-[#0f2333] group-hover:text-[#0f766e]">{p.name}</h2>
                  {p.client && p.client !== p.name && <p className="text-small mt-1 text-slate-500">{p.client}</p>}
                  {p.technologies?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] text-slate-600">{t}</span>
                      ))}
                    </div>
                  ) : null}
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-[#0d9488]">
                    View case study <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <GlobalSlot><CtaSection /></GlobalSlot>
    </main>
  );
}
