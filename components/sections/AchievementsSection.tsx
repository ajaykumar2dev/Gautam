import { ArrowUpRight, CheckCircle2, Trophy } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formalAchievements, professionalFocus } from "@/data/achievements";

export function AchievementsSection() {
  return (
    <section id="achievements" className="deferred-section section-space scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="05 / 06"
          eyebrow="Professional commitments"
          title="Values demonstrated in daily practice."
          description="These are areas of professional focus, not formal awards or institutional endorsements. Verified achievements can be added separately."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {professionalFocus.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="card card-hover flex h-full gap-5 p-6 sm:p-7">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-medical-600 dark:text-blue-300">Professional focus</p>
                  <h3 className="mt-2 font-[family-name:var(--font-manrope)] text-xl font-bold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-[2rem] border border-dashed bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-start gap-4">
            <span className="icon-disc"><Trophy className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <h3 className="font-bold text-ink">Verified awards and achievements</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {formalAchievements.length === 0 ? "No formal awards have been provided for publication." : `${formalAchievements.length} verified records available.`}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-muted">Details can be added later <ArrowUpRight className="h-4 w-4" /></span>
        </div>
      </div>
    </section>
  );
}
