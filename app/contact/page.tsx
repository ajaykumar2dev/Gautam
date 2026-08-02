import type { Metadata } from "next";
import {
  Building2,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { ContactForm } from "@/components/forms/ContactForm";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a professional networking, recruitment, training, or general inquiry to Amrita Gautam through a privacy-conscious contact form.",
  alternates: { canonical: "/contact" },
};

const conversationTypes = [
  "Relevant career and recruitment opportunities",
  "Professional networking in healthcare and diagnostics",
  "Training and continuing-development opportunities",
  "General professional portfolio inquiries",
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="relative overflow-hidden border-b border-line bg-surface pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
        <div
          className="clinical-grid-mask pointer-events-none absolute inset-0 bg-clinical-grid opacity-70"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="shell relative">
          <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
            <div className="max-w-4xl">
              <p className="eyebrow">Professional contact</p>
              <h1 className="section-title mt-7 max-w-4xl">
                Start a clear, thoughtful professional conversation.
              </h1>
              <p className="body-copy mt-7 max-w-2xl">
                Use this channel for opportunities, professional networking, training,
                or portfolio-related questions. Every inquiry should remain free of
                patient information and confidential clinical material.
              </p>
            </div>

            <div className="border-l-2 border-teal-500 pl-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                Current availability
              </p>
              <p className="mt-2 font-[var(--font-manrope)] text-lg font-bold leading-7 text-ink">
                {profile.availability}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Based in {profile.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="contact-form-heading">
        <div className="shell">
          <div className="grid gap-10 xl:grid-cols-[minmax(18rem,0.68fr)_minmax(0,1.32fr)] xl:gap-14">
            <aside className="space-y-6">
              <div className="card p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="icon-disc" aria-hidden="true">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                      Contact channel
                    </p>
                    <h2 className="mt-1 font-[var(--font-manrope)] text-xl font-bold" id="contact-form-heading">
                      Before you send
                    </h2>
                  </div>
                </div>

                <ul className="mt-7 space-y-4">
                  {conversationTypes.map((item) => (
                    <li className="flex gap-3 text-sm leading-6 text-muted" key={item}>
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-line pt-6">
                  <dl className="space-y-5 text-sm">
                    <div>
                      <dt className="flex gap-3 font-bold text-ink"><Building2 className="mt-0.5 h-4 w-4 shrink-0 text-medical-600 dark:text-blue-300" aria-hidden="true" />Professional context</dt>
                      <dd className="ml-7 mt-1 leading-6 text-muted">
                          {profile.role} at {profile.organizationShort}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex gap-3 font-bold text-ink"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-medical-600 dark:text-blue-300" aria-hidden="true" />Response expectations</dt>
                      <dd className="ml-7 mt-1 leading-6 text-muted">
                          Replies are sent as professional availability permits.
                      </dd>
                    </div>
                    <div>
                      <dt className="flex gap-3 font-bold text-ink"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-medical-600 dark:text-blue-300" aria-hidden="true" />{profile.email.label}</dt>
                      <dd className="ml-7 mt-2 leading-6 text-muted">
                          {profile.email.isPlaceholder ? (
                            <span className="status-placeholder">Not yet published</span>
                          ) : (
                            <a className="font-semibold text-medical-600 underline underline-offset-4 dark:text-blue-300" href={`mailto:${profile.email.value}`}>
                              {profile.email.value}
                            </a>
                          )}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex gap-3 font-bold text-ink"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-medical-600 dark:text-blue-300" aria-hidden="true" />{profile.phone.label}</dt>
                      <dd className="ml-7 mt-2 leading-6 text-muted">
                          {profile.phone.isPlaceholder ? (
                            <span className="status-placeholder">Not yet published</span>
                          ) : (
                            <a className="font-semibold text-medical-600 underline underline-offset-4 dark:text-blue-300" href={`tel:${profile.phone.value.replace(/[^+\d]/g, "")}`}>
                              {profile.phone.value}
                            </a>
                          )}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex gap-3 font-bold text-ink"><Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-medical-600 dark:text-blue-300" aria-hidden="true" />{profile.linkedin.label}</dt>
                      <dd className="ml-7 mt-2 leading-6 text-muted">
                          {profile.linkedin.isPlaceholder ? (
                            <span className="status-placeholder">Not yet published</span>
                          ) : (
                            <a
                              className="font-semibold text-medical-600 underline underline-offset-4 dark:text-blue-300"
                              href={profile.linkedin.value}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View professional profile
                            </a>
                          )}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-line bg-[#0b1a2d] text-white shadow-soft">
                <div
                  className="relative grid min-h-64 place-items-center overflow-hidden px-6 py-10 text-center"
                  role="img"
                  aria-label="General city location marker for Lucknow, Uttar Pradesh, India; no precise address is shown"
                >
                  <div className="absolute inset-0 bg-clinical-grid bg-[length:28px_28px] opacity-20" aria-hidden="true" />
                  <div className="absolute left-[18%] top-[28%] h-px w-2/3 rotate-[-12deg] bg-blue-300/25" aria-hidden="true" />
                  <div className="absolute left-[14%] top-[60%] h-px w-3/4 rotate-[9deg] bg-teal-300/25" aria-hidden="true" />
                  <div className="relative">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-blue-300/30 bg-blue-500/15 text-blue-200 shadow-[0_0_0_12px_rgba(37,99,235,.08)]" aria-hidden="true">
                      <MapPin className="h-7 w-7" />
                    </span>
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-teal-300">
                      General city location
                    </p>
                    <p className="mt-2 font-[var(--font-manrope)] text-xl font-bold">
                      Lucknow, Uttar Pradesh
                    </p>
                    <p className="mt-2 text-xs text-slate-400">Map placeholder · no precise address</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-300/70 bg-amber-50 p-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/25 dark:text-amber-100">
                <div className="flex gap-3">
                  <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <div>
                    <h2 className="font-bold">Not for clinical or urgent requests</h2>
                    <p className="mt-2 text-sm leading-6">
                      This personal portfolio cannot provide medical advice, test interpretation,
                      appointments, or emergency support. Contact an appropriate healthcare service
                      for clinical needs.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <ContactForm />
              <div className="mt-5 flex items-start gap-3 px-2 text-xs leading-5 text-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                <p>
                  Contact details are used only to manage this conversation. Review the{" "}
                  <Link
                    className="font-bold text-medical-600 underline decoration-blue-300 underline-offset-4 hover:no-underline dark:text-blue-300"
                    href="/privacy"
                  >
                    privacy policy
                  </Link>{" "}
                  for the full handling notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-10">
        <div className="shell flex flex-col gap-3 text-sm leading-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            This is {profile.name}&apos;s personal portfolio, not an official {profile.organizationShort} website.
          </p>
          <p className="font-semibold text-ink">No institutional endorsement is implied.</p>
        </div>
      </section>
    </main>
  );
}
