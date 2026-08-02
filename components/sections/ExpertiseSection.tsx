import {
  Activity,
  BadgeCheck,
  ClipboardCheck,
  Droplets,
  FileCheck2,
  Files,
  FlaskConical,
  Gauge,
  Microscope,
  ShieldCheck,
  TestTube,
  Workflow,
} from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { expertise } from "@/data/skills";

const icons = {
  Activity,
  BadgeCheck,
  ClipboardCheck,
  Droplets,
  FileCheck2,
  Files,
  FlaskConical,
  Gauge,
  Microscope,
  ShieldCheck,
  TestTube,
  Workflow,
};

export function ExpertiseSection() {
  return (
    <section id="expertise" className="deferred-section section-space scroll-mt-24">
      <div className="shell">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_.55fr]">
          <SectionHeading
            index="03 / 10"
            eyebrow="Laboratory expertise"
            title="A systematic view of the laboratory workflow."
          />
          <p className="body-copy lg:pb-1">
            These areas describe laboratory support—not independent diagnosis, interpretation, or authorization of clinical results.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {expertise.map((item, index) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <Reveal key={item.title} delay={(index % 4) * 0.035}>
                <article className="card card-hover group h-full p-5 sm:p-6">
                  <span className="icon-disc transition group-hover:border-teal-400 group-hover:bg-teal-50 group-hover:text-teal-700 dark:group-hover:bg-teal-950/40">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-manrope)] text-lg font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Related ${item.title} areas`}>
                    {item.procedures.map((procedure) => (
                      <li key={procedure} className="rounded-full border bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.1em] text-muted">
                        {procedure}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
