import type { Metadata } from "next";
import { FileCheck2, FileText, Info } from "lucide-react";

import { PageIntro } from "@/components/ui/PageIntro";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume availability and replacement instructions for Amrita Gautam's professional portfolio.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <main id="main-content">
      <PageIntro
        eyebrow="Resume"
        title="The resume is not yet available for download."
        description="No placeholder PDF is presented as a finished professional document. Add the reviewed resume to enable download actions across the portfolio."
      />
      <section className="section-space">
        <div className="shell grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <article className="card p-7 sm:p-9">
            <span className="icon-disc"><FileText className="h-5 w-5" aria-hidden="true" /></span>
            <h2 className="mt-6 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight">Resume status</h2>
            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100">
              <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p>The resume file is intentionally disabled until a verified PDF is supplied.</p>
            </div>
            <p className="mt-6 text-sm leading-7 text-muted">Expected public path:</p>
            <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">{profile.resume.path}</code>
          </article>
          <aside className="rounded-[2rem] bg-[#0b1c31] p-7 text-white sm:p-9">
            <FileCheck2 className="h-6 w-6 text-teal-300" aria-hidden="true" />
            <h2 className="mt-5 font-[family-name:var(--font-manrope)] text-2xl font-bold">Before publishing</h2>
            <ol className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
              <li><strong className="text-white">1.</strong> Remove residential addresses, signatures, IDs, and sensitive documents.</li>
              <li><strong className="text-white">2.</strong> Verify dates, qualifications, contact details, and workplace wording.</li>
              <li><strong className="text-white">3.</strong> Save the PDF at the documented path and set <code className="text-teal-200">resume.available</code> to true in the profile data.</li>
            </ol>
          </aside>
        </div>
      </section>
    </main>
  );
}
