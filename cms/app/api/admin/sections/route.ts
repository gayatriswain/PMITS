import { handle, ok } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import { BUILDER_SECTIONS, allSectionDefs } from "@/lib/sections/registry";

/** Section types and their editable fields (drives the admin page editor). */
export const GET = handle(async (req: Request) => {
  await requireUser(req, "pages.read");
  // ?components=A,B limits the (large) generated field lists to the sections a page actually uses.
  const wanted = new URL(req.url).searchParams.get("components");
  const set = wanted ? new Set(wanted.split(",").filter((c) => /^[A-Za-z0-9]{1,80}$/.test(c))) : null;
  const builder = new Set(BUILDER_SECTIONS.map((d) => d.component));
  const defs = allSectionDefs()
    .filter((d) => !set || set.has(d.component) || builder.has(d.component))
    .map(({ sanitize: _s, ...d }) => d);
  return ok({ sections: defs, builder: BUILDER_SECTIONS.map((d) => d.component) });
});
