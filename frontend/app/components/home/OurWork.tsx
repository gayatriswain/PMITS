import Link from "next/link";
import Image from "next/image";
import Container from "../shared/Container";
import { ArrowIcon } from "../shared/icons";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const GREEN = "#0be881";

type Project = {
  name: string;
  year: string;
  category: string;
  image: string;
};

const leftProjects: Project[] = [
  {
    name: "NovaTech Website",
    year: "2025",
    category: "Web Design",
    image: "/project1.png",
  },
  {
    name: "Bloom Cosmetics",
    year: "2025",
    category: "Branding",
    image: "/project2.png",
  },
  {
    name: "Horizon App UI",
    year: "2025",
    category: "UI/UX Design",
    image: "/project3.png",
  },
];

const rightProjects: Project[] = [
  {
    name: "Pulse Creative Studio",
    year: "2024",
    category: "Branding",
    image: "/project4.png",
  },
  {
    name: "Vertex Analytics",
    year: "2024",
    category: "Creative Development",
    image: "/project5.png",
  },
  {
    name: "Arclight Interior",
    year: "2024",
    category: "Web Design",
    image: "/project6.png",
  },
];

const CARD_START_MS = 150;
const CARD_STEP_MS = 90;

function ArrowBadge() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition-colors duration-300 group-hover:border-teal-500 group-hover:bg-teal-500 group-hover:text-white">
      <span className="block" style={{ transform: "rotate(-45deg)" }}>
        <ArrowIcon />
      </span>
    </span>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { name, year, category, image } = project;
  return (
    <div className="animate-fade-up group cursor-pointer" style={{ animationDelay: `${delay}ms` }}>
      <Link
        href="#"
        aria-label={`View ${name} project`}
        className="relative block w-full max-w-[595px] overflow-hidden rounded-2xl"
        style={{ aspectRatio: "595 / 580" }}
      >
        <Image
          src={image}
          alt={`${name} project preview`}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(min-width: 1024px) 35vw, 90vw"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span
            className="translate-y-2 rounded-full bg-white px-4 py-2 text-xs font-bold shadow-lg transition-transform duration-500 group-hover:translate-y-0"
            style={{ color: NAVY }}
          >
            View Project
          </span>
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm font-bold" style={{ color: NAVY }}>
          {name}
        </p>
        <span className="text-xs text-slate-400">{year}</span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-xs text-slate-400">{category}</p>
        <ArrowBadge />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="animate-fade-up">
      <p className="flex items-center gap-2 text-lg font-extrabold sm:text-xl" style={{ color: NAVY }}>
        <span aria-hidden style={{ color: GREEN }}>
          {"//"}
        </span>
        Our Work
      </p>
      <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl" style={{ color: NAVY }}>
        Projects That Reflect Our{" "}
        <span style={{ color: TEAL }}>Design Excellence</span>
      </h2>
    </div>
  );
}

export default function OurWork() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <div className="mx-auto lg:w-[70%]">
          <div className="mb-8 lg:hidden">
            <Heading />
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              {leftProjects.map((project, i) => (
                <ProjectCard key={project.name} project={project} delay={CARD_START_MS + i * CARD_STEP_MS} />
              ))}

              <div
                className="animate-fade-up"
                style={{ animationDelay: `${CARD_START_MS + 6 * CARD_STEP_MS}ms` }}
              >
                <p className="text-sm leading-relaxed text-slate-500">
                  Shaping digital experiences with precision and purpose.
                </p>
                <Link
                  href="/portfolio"
                  className="group mt-4 flex max-w-[280px] items-center justify-between gap-4 rounded-2xl bg-slate-100 py-2 pl-5 pr-2 transition-colors hover:bg-slate-200"
                >
                  <span className="text-sm font-bold" style={{ color: NAVY }}>
                    View All Projects
                  </span>
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 bg-white transition-colors duration-300 group-hover:bg-[#0be881] group-hover:text-white"
                    style={{ borderColor: GREEN, color: GREEN }}
                  >
                    <span className="block" style={{ transform: "rotate(-45deg)" }}>
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="hidden lg:block">
                <Heading />
              </div>
              {rightProjects.map((project, i) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  delay={CARD_START_MS + (leftProjects.length + i) * CARD_STEP_MS}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
