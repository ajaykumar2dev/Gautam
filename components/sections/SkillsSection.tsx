import { Check, Crosshair, UsersRound } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="deferred-section section-space section-surface scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="02 / 10"
          eyebrow="Capabilities"
          title="Technical care, supported by human judgment."
          description="Skills are grouped by practice area rather than assigned arbitrary percentages. The emphasis is on dependable contribution and professional conduct."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => {
            const Icon = groupIndex === 0 ? Crosshair : UsersRound;
            return (
              <Reveal key={group.title} delay={groupIndex * 0.08}>
                <article className="card h-full overflow-hidden p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-5">
                    <span className="icon-disc"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
                      {group.label}
                    </span>
                  </div>
                  <h3 className="mt-7 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight">{group.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{group.description}</p>
                  <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-3 text-sm leading-6 text-ink">
                        <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-blue-100 text-medical-700 dark:bg-blue-950 dark:text-blue-300">
                          <Check className="h-2.5 w-2.5" aria-hidden="true" />
                        </span>
                        {skill}
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
