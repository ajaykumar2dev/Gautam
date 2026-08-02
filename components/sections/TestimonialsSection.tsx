import { MessageSquareQuote, UserRoundCheck } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="deferred-section section-space scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="09 / 10"
          eyebrow="Professional references"
          title="Endorsements belong to real voices."
          description="No sample quotations are presented as genuine testimonials. Verified references can be published here with clear consent."
        />

        {testimonials.length === 0 ? (
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {["Colleague or supervisor", "Healthcare collaborator"].map((relationship) => (
              <article key={relationship} className="rounded-[2rem] border border-dashed bg-surface p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="icon-disc"><MessageSquareQuote className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="status-placeholder">Empty template</span>
                </div>
                <h3 className="mt-7 text-lg font-bold">Verified {relationship.toLowerCase()} reference</h3>
                <p className="mt-3 text-sm leading-7 text-muted">A consented testimonial, professional role, organization, and relationship can be added to this space.</p>
                <div className="mt-7 flex items-center gap-3 border-t pt-5 text-xs text-muted"><UserRoundCheck className="h-4 w-4 text-teal-600" /> No endorsement published</div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
