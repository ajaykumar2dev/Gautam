import { BookOpenCheck, GraduationCap, Landmark, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/education";

export function EducationSection() {
  return (
    <section id="education" className="deferred-section section-space scroll-mt-24">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.55fr]">
          <SectionHeading index="05 / 10" eyebrow="Education" title="Qualifications, documented with care." />
          <p className="body-copy">Academic details have not been supplied, so the record below is intentionally incomplete and cannot be mistaken for a claimed qualification.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          {education.map((item) => (
            <Reveal key={item.degree}>
              <article className="relative overflow-hidden rounded-[2rem] border border-dashed bg-surface p-7 sm:p-9">
                <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full border-[18px] border-blue-500/5" aria-hidden="true" />
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <span className="icon-disc"><GraduationCap className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="status-placeholder">Education details pending</span>
                </div>
                <h3 className="mt-8 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight">[{item.degree}]</h3>
                <dl className="mt-7 grid gap-5 text-sm sm:grid-cols-2">
                  <div><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-muted"><Landmark className="h-3.5 w-3.5" /> Institution</dt><dd className="mt-2 text-ink">[{item.institution}]</dd></div>
                  <div><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-muted"><BookOpenCheck className="h-3.5 w-3.5" /> University / board</dt><dd className="mt-2 text-ink">[{item.university}]</dd></div>
                  <div><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-muted"><MapPin className="h-3.5 w-3.5" /> Location</dt><dd className="mt-2 text-ink">[{item.location}]</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-[.1em] text-muted">Completion</dt><dd className="mt-2 text-ink">[{item.year}]</dd></div>
                </dl>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.08}>
            <aside className="h-full rounded-[2rem] bg-[#0b1c31] p-7 text-white sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-300">Content checklist</p>
              <h3 className="mt-4 font-[family-name:var(--font-manrope)] text-2xl font-bold">Ready for verified details.</h3>
              <ul className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
                {["Degree or diploma title", "Institution and board", "Verified dates", "Grade or percentage", "Key subjects or achievements"].map((item) => (
                  <li key={item} className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />{item}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
