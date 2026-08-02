import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="relative isolate overflow-hidden border-b bg-surface pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24">
      <div className="clinical-grid-mask absolute inset-0 -z-10 bg-clinical-grid opacity-55 dark:opacity-20" />
      <div className="absolute -right-24 -top-40 -z-10 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="shell">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-semibold text-muted">
            <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-medical-600">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="text-ink">{eyebrow}</li>
          </ol>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title mt-6 max-w-4xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">{description}</p>
      </div>
    </header>
  );
}
