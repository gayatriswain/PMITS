/** Shared between the open-positions grid (cards + popup) and the "Send us your profile" form. */

/** An open job from the CMS "Careers" module (the public API only returns status "open", not past the deadline). */
export type CmsJob = {
  _id: string;
  slug: string;
  title: string;
  department?: string;
  location?: string;
  employmentType?: string;
  experience?: string;
  salaryRange?: string;
  /** Rich text, sanitized by the CMS when it is saved. */
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  deadline?: string;
};

/** A position the form can apply for. careerId links the application to the CMS job. */
export type JobOption = { id: string; title: string; careerId?: string };

export const jobOptions = (jobs: CmsJob[] = []): JobOption[] => jobs.map((j) => ({ id: j.slug, title: j.title, careerId: j._id }));

const APPLY_EVENT = "career:apply";

/** "Apply for this role": select the position in the form below and scroll to it. */
export function applyForJob(job: JobOption) {
  window.dispatchEvent(new CustomEvent<JobOption>(APPLY_EVENT, { detail: job }));
  document.getElementById("send-profile")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onApplyForJob(cb: (job: JobOption) => void) {
  const h = (e: Event) => cb((e as CustomEvent<JobOption>).detail);
  window.addEventListener(APPLY_EVENT, h);
  return () => window.removeEventListener(APPLY_EVENT, h);
}
