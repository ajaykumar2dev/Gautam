import { ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { CertificationCard } from "@/components/cards/CertificationCard";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";

export function CertificationsSection() {
  return (
    <section id="certifications" className="deferred-section section-space section-surface scroll-mt-24">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06 / 10"
            eyebrow="Credentials"
            title="A place for evidence, never assumptions."
            description="Suggested credential records are shown as placeholders only. They do not state that any course or certification has been completed."
          />
          <Link href="/certifications" className="button-secondary self-start lg:self-auto">
            View credential records <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p><strong>Placeholder records:</strong> completion, issuer, date, and credential ID must be verified before any item is published as earned.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certifications.slice(0, 3).map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}><CertificationCard item={item} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
