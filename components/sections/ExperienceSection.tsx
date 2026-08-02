import { Building2, CalendarDays, CheckCircle2, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="deferred-section section-space section-surface scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="04 / 10"
          eyebrow="Professional experience"
          title="Reliable work inside a collaborative care system."
          description="One current role is presented without inferring dates, departments, or employment terms that have not been verified."
        />

        <div className="relative mt-14 pl-7 sm:pl-12">
          <div className="absolute bottom-0 left-2 top-0 w-px bg-gradient-to-b from-medical-500 via-teal-500 to-transparent sm:left-4" aria-hidden="true" />
          {experience.map((item) => (
            <Reveal key={`${item.role}-${item.organization}`}>
              <article className="relative rounded-[2rem] border bg-canvas p-6 shadow-soft sm:p-9 lg:p-11">
                <span className="absolute -left-[1.78rem] top-10 grid h-5 w-5 place-items-center rounded-full border-4 border-surface bg-medical-500 sm:-left-[3.09rem]" aria-hidden="true" />
                <div className="flex flex-col gap-7 border-b pb-8 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-medical-700 dark:bg-blue-950 dark:text-blue-300">
                      Current position
                    </span>
                    <h3 className="mt-4 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight sm:text-3xl">{item.role}</h3>
                    <p className="mt-2 flex items-start gap-2 text-sm font-semibold leading-6 text-ink">
                      <Building2 className="mt-1 h-4 w-4 shrink-0 text-medical-500" aria-hidden="true" /> {item.organization}
                    </p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted"><MapPin className="h-4 w-4" aria-hidden="true" /> {item.location}</p>
                  </div>
                  <dl className="grid min-w-[250px] gap-2 rounded-2xl border border-dashed bg-surface p-5 text-xs">
                    <div><dt className="font-bold uppercase tracking-[.1em] text-muted">Dates</dt><dd className="mt-1 text-ink">{item.dates}</dd></div>
                    <div className="mt-2"><dt className="font-bold uppercase tracking-[.1em] text-muted">Unit</dt><dd className="mt-1 text-ink">{item.department}</dd></div>
                    <div className="mt-2"><dt className="font-bold uppercase tracking-[.1em] text-muted">Type</dt><dd className="mt-1 text-ink">{item.employmentType}</dd></div>
                    <div className="mt-2">
                      <dt className="sr-only">Verification status</dt>
                      <dd><span className="status-placeholder w-fit"><CalendarDays className="h-3 w-3" /> Details pending</span></dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-8 max-w-3xl text-base leading-8 text-muted">{item.summary}</p>
                <details className="group mt-8 rounded-2xl border bg-surface open:bg-canvas">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-3 font-bold text-ink hover:text-medical-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 [&::-webkit-details-marker]:hidden">
                    View responsibilities
                    <span className="text-xl font-normal transition group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <ul className="grid gap-4 border-t p-5 sm:grid-cols-2 sm:p-6">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="flex items-start gap-3 text-sm leading-6 text-muted">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </details>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
