import { ArrowRight, CheckCircle2, Clock3, LockKeyhole, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function ContactSection() {
  return (
    <section id="contact" className="deferred-section section-space section-surface scroll-mt-24">
      <div className="shell">
        <SectionHeading
          index="10 / 10"
          eyebrow="Contact"
          title="Start a thoughtful professional conversation."
          description="For job opportunities, professional networking, or relevant training conversations. Please do not share patient, medical, or confidential hospital information."
        />

        <div className="mt-14 grid overflow-hidden rounded-[2rem] border bg-canvas shadow-soft lg:grid-cols-[.72fr_1.28fr]">
          <div className="relative overflow-hidden bg-[#0b1c31] p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-28 -top-24 h-72 w-72 rounded-full border-[40px] border-blue-500/10" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[.16em] text-teal-300">Professional inquiries</p>
            <h3 className="mt-4 max-w-sm font-[family-name:var(--font-manrope)] text-3xl font-bold leading-tight tracking-tight">Clear communication begins with the right context.</h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">Direct contact details remain private until Amrita chooses to publish them. This secure form can be connected to a verified email service.</p>

            <dl className="mt-9 space-y-5 text-sm">
              <div>
                <dt className="flex gap-3 font-bold text-white"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />Location</dt>
                <dd className="ml-8 mt-1 text-slate-400">{profile.location}</dd>
              </div>
              <div>
                <dt className="flex gap-3 font-bold text-white"><Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />Availability</dt>
                <dd className="ml-8 mt-1 text-slate-400">{profile.availability}</dd>
              </div>
              <div>
                <dt className="flex gap-3 font-bold text-white"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />Privacy</dt>
                <dd className="ml-8 mt-1 text-slate-400">Only information needed to respond is requested.</dd>
              </div>
            </dl>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs leading-6 text-slate-400">
              <strong className="text-slate-200">Map placeholder:</strong> Lucknow, Uttar Pradesh. No precise residential address is displayed.
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-medical-600 dark:text-blue-300">Choose the right context</p>
            <h3 className="mt-4 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight sm:text-3xl">A dedicated, privacy-conscious inquiry form.</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">The contact page provides full validation, clear consent, inline guidance, and secure server-side handling for:</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Job opportunities", "Professional networking", "Training opportunities", "General inquiries"].map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl border bg-surface p-4 text-sm font-semibold text-ink">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-xs leading-6 text-muted dark:border-blue-900 dark:bg-blue-950/20">
              <LockKeyhole className="mt-1 h-4 w-4 shrink-0 text-medical-600 dark:text-blue-300" aria-hidden="true" />
              <p>Do not include patient data, laboratory reports, specimen identifiers, or confidential workplace information.</p>
            </div>
            <Link href="/contact" className="button-primary mt-8 self-start">
              Open contact form <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
