"use client";

import ConsultationForm from "../shared/ConsultationForm";
import Container from "../shared/Container";
import { ClockIcon, LockIcon, MailIcon, PhoneIcon, PinIcon } from "../shared/icons";
import { useCmsText } from "@/components/cms/SectionContent";
import { html, rich } from "@/components/cms/rich";

const NAVY = "#132a43";
const TEAL = "#0d9488";
const DARK = "#0b3b35";
const ACCENT = "#ff6321";

export type ContactDetails = { phone?: string; email?: string; address?: string; hours?: string };

/** Contact page: contact details (from Admin → Settings) next to the enquiry form (goes to Admin → Leads and the email recipients). */
export default function ContactHero({ details }: { details: ContactDetails }) {
  const $t = useCmsText();
  const rows = [
    details.phone && { icon: PhoneIcon, label: $t("ContactHero__t1", "Call us"), value: details.phone, href: `tel:${details.phone.replace(/[^+\d]/g, "")}` },
    details.email && { icon: MailIcon, label: $t("ContactHero__t2", "Email us"), value: details.email, href: `mailto:${details.email}` },
    details.address && { icon: PinIcon, label: $t("ContactHero__t3", "Visit us"), value: details.address },
    details.hours && { icon: ClockIcon, label: $t("ContactHero__t4", "Working hours"), value: details.hours },
  ].filter(Boolean) as { icon: () => React.JSX.Element; label: string; value: string; href?: string }[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0fdfa] to-white py-16 lg:py-24">
      <div className="pointer-events-none absolute right-[-8%] top-[-12%] h-[480px] w-[480px] rounded-full bg-[#99f6e4]/30 blur-[110px]" aria-hidden />
      <Container className="relative grid items-start gap-12 lg:grid-cols-[1fr_440px] xl:gap-20">
        <div>
          <span className="inline-block rounded-full border border-[#0d9488]/25 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest" style={{ color: TEAL }}>
            {html($t("ContactHero__t5", "Contact Us"))}
          </span>
          <h1 className="text-h1 mt-5 font-bold" style={{ color: NAVY }}>{rich($t("ContactHero__t6m", "Let's talk about <span class=\"text-[#0d9488]\">your project</span>"))}</h1>
          <p className="text-body mt-5 max-w-xl text-slate-600">
            {rich($t("ContactHero__t8", "Tell us what you need and our team will get back to you shortly."))}
          </p>

          {rows.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.3)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "#e6f6f4", color: TEAL }}>
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-caption font-semibold uppercase tracking-wider text-slate-500">{label}</p>
                    {href ? (
                      <a href={href} className="text-small mt-1 block break-words font-semibold transition-colors hover:text-teal-700" style={{ color: NAVY }}>
                        {value}
                      </a>
                    ) : (
                      <p className="text-small mt-1 break-words font-semibold" style={{ color: NAVY }}>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div id="contact-form" className="relative w-full overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-15px_rgba(15,23,42,0.25)] ring-1 ring-slate-100">
          <div className="px-6 pb-10 pt-7 sm:px-8" style={{ backgroundImage: `linear-gradient(135deg, ${DARK}, ${TEAL})` }}>
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: ACCENT }}>{rich($t("ContactHero__t9", "Let's Talk"))}</p>
            <h2 className="text-h5 mt-2 font-bold text-white">{html($t("ContactHero__t10", "Get a Free Consultation"))}</h2>
            <p className="text-small mt-2 text-white/80">{rich($t("ContactHero__t11", "Share your details and our experts will get back to you shortly."))}</p>
          </div>
          <div className="relative -mt-6 rounded-t-3xl bg-white px-6 pb-6 pt-6 sm:px-8">
            <ConsultationForm variant="location" formType="contact" extended />
            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <LockIcon className="h-3.5 w-3.5 text-slate-400" /> {rich($t("ContactHero__t12", "Your information is safe with us."))}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
