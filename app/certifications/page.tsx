import type { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

import { CertificationGrid } from "@/components/cards/CertificationGrid";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Credential record templates for Amrita Gautam. Placeholder items are not claims of completed certification.",
  alternates: { canonical: "/certifications" },
};

export default function CertificationsPage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Certifications"
        title="Credentials presented with verification in mind."
        description="This page is ready for verified certificates, issuers, dates, and credential links. Every current record is clearly marked as a placeholder."
      />
      <section className="section-space" aria-labelledby="credential-records-heading">
        <div className="shell">
          <h2 id="credential-records-heading" className="sr-only">Credential placeholder records</h2>
          <div className="mb-9 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p><strong>Important:</strong> These are suggested record types, not completed credentials. Publish a card as verified only after confirming its source details and permission to display the document.</p>
          </div>
          <CertificationGrid />
        </div>
      </section>
    </main>
  );
}
