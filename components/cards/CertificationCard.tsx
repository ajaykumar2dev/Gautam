import { Award, CalendarDays, ExternalLink } from "lucide-react";

import type { CertificationItem } from "@/types/portfolio";

export function CertificationCard({ item }: { item: CertificationItem }) {
  const isPlaceholder = item.status === "placeholder";

  return (
    <article className={`h-full rounded-3xl border p-6 ${isPlaceholder ? "border-dashed bg-surface" : "bg-canvas shadow-soft"}`}>
      <div className="flex items-start justify-between gap-4">
        <span className="icon-disc"><Award className="h-5 w-5" aria-hidden="true" /></span>
        <span className={isPlaceholder ? "status-placeholder" : "rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700"}>
          {isPlaceholder ? "Not yet verified" : "Verified"}
        </span>
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[.15em] text-medical-600 dark:text-blue-300">{item.category}</p>
      <h3 className="mt-2 font-[family-name:var(--font-manrope)] text-xl font-bold tracking-tight">{item.title}</h3>
      <dl className="mt-5 space-y-3 text-sm">
        <div><dt className="text-xs font-bold uppercase tracking-[.1em] text-muted">Issuer</dt><dd className="mt-1 text-ink">{item.issuer}</dd></div>
        <div><dt className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.1em] text-muted"><CalendarDays className="h-3 w-3" /> Issue date</dt><dd className="mt-1 text-ink">{item.issueDate}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-[.1em] text-muted">Credential</dt><dd className="mt-1 text-ink">{item.credentialId}</dd></div>
      </dl>
      <button type="button" disabled className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-muted opacity-65" title="Verification link will be enabled after credential details are added">
        <ExternalLink className="h-4 w-4" aria-hidden="true" /> Verification unavailable
      </button>
    </article>
  );
}
