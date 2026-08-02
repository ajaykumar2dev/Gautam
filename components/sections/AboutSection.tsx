import { BriefcaseBusiness, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile, quickFacts } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="deferred-section section-space scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="01 / 10"
          eyebrow="Professional profile"
          title="Precision is a practice, not a promise."
          description="A calm, methodical approach to laboratory support—where each step, record, and safety check matters."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-12">
          <Reveal>
            <p className="text-xl font-semibold leading-9 text-ink sm:text-2xl sm:leading-10">
              {profile.biography}
            </p>

            <div className="mt-8 rounded-3xl border border-blue-200/70 bg-blue-50/70 p-6 dark:border-blue-900 dark:bg-blue-950/25 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="icon-disc"><Sparkles className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h3 className="font-bold text-ink">Career objective</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{profile.objective}</p>
                </div>
              </div>
            </div>

          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-[2rem] border bg-surface p-6 shadow-soft sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-medical-600 dark:text-blue-300">Profile at a glance</p>
              <h3 className="mt-3 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight">Professional details</h3>
              <dl className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {quickFacts.map((fact, index) => {
                const Icon = index === 0 || index === 2 ? BriefcaseBusiness : index === 1 ? MapPin : ShieldCheck;
                return (
                  <div key={fact.label} className={`rounded-2xl border p-5 ${fact.isPlaceholder ? "border-dashed bg-surface" : "bg-canvas"}`}>
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-muted">
                      <Icon className="h-3.5 w-3.5 text-teal-600" aria-hidden="true" /> {fact.label}
                    </dt>
                    <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {fact.value}
                      {fact.isPlaceholder ? <span className="mt-3 block text-[11px] font-semibold text-amber-700 dark:text-amber-300">Details pending</span> : null}
                    </dd>
                  </div>
                );
              })}
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
