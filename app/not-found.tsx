import { ArrowLeft, Microscope } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="relative grid min-h-[78svh] place-items-center overflow-hidden px-5 pb-20 pt-32">
      <div className="clinical-grid-mask absolute inset-0 -z-10 bg-clinical-grid opacity-60 dark:opacity-20" />
      <div className="max-w-2xl text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-blue-200 bg-blue-50 text-medical-600 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
          <Microscope className="h-10 w-10" aria-hidden="true" />
        </div>
        <p className="mt-8 font-mono text-sm font-bold tracking-[.2em] text-teal-600 dark:text-teal-300">ERROR 404</p>
        <h1 className="section-title mt-4">This page could not be located.</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted">The address may have changed or the page may no longer be available. Return to the portfolio or use the contact page for assistance.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-primary"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Return home</Link>
          <Link href="/contact" className="button-secondary">Contact</Link>
        </div>
      </div>
    </main>
  );
}
