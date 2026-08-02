import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notice for the Amrita Gautam professional portfolio and contact form.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Information collected",
    body: "The contact form asks for your name, email address, inquiry type, message, and optional phone number. Do not submit patient information, medical records, specimen identifiers, laboratory reports, or confidential hospital information.",
  },
  {
    title: "How information is used",
    body: "Submitted information is intended only to review and respond to your professional inquiry. It should not be used for marketing, profiling, or unrelated purposes.",
  },
  {
    title: "Delivery and storage",
    body: "When configured, form messages are sent through the site owner’s chosen email provider. That provider’s processing terms also apply. Before launch, the site owner should define a deletion schedule and remove messages when they are no longer needed.",
  },
  {
    title: "Security and spam prevention",
    body: "The form uses client and server validation, a hidden spam field, request-size limits, and basic rate limiting. Production deployment should add a durable rate-limit store and, if abuse occurs, a privacy-conscious challenge service.",
  },
  {
    title: "Analytics and cookies",
    body: "This starter does not include analytics or advertising trackers. A theme preference may be stored locally in your browser so the selected light or dark appearance can be restored.",
  },
  {
    title: "Your choices",
    body: "You can choose not to submit the form. The public portfolio does not require an account. Contact details for privacy requests should be added here once a verified professional email address is available.",
  },
];

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Privacy notice"
        title="Professional contact, handled with restraint."
        description="A plain-language summary of what the contact form collects, why it is needed, and what must be configured before production use."
      />
      <article className="section-space">
        <div className="shell max-w-[920px]">
          <div className="rounded-3xl border bg-blue-50/70 p-6 text-sm leading-7 text-muted dark:bg-blue-950/20 sm:p-8">
            <strong className="text-ink">Status:</strong> This notice is a production-ready starting point, not legal advice. Update it to reflect the actual email provider, retention period, hosting, and applicable policies before launch.
          </div>
          <div className="mt-12 space-y-10">
            {sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`privacy-${index}`} className="grid gap-4 border-t pt-8 sm:grid-cols-[180px_1fr] sm:gap-10">
                <p className="font-mono text-xs text-medical-600 dark:text-blue-300">0{index + 1}</p>
                <div>
                  <h2 id={`privacy-${index}`} className="font-[family-name:var(--font-manrope)] text-xl font-bold tracking-tight">{section.title}</h2>
                  <p className="mt-3 text-base leading-8 text-muted">{section.body}</p>
                </div>
              </section>
            ))}
          </div>
          <p className="mt-12 border-t pt-8 text-xs leading-6 text-muted">Last reviewed: August 2026. Replace this date when the notice is materially updated.</p>
        </div>
      </article>
    </main>
  );
}
