import { HeartPulse, MapPin } from "lucide-react";
import Link from "next/link";

import { profile } from "@/data/profile";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Gallery", href: "/gallery" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06101d] text-slate-100">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.3fr_.7fr_.7fr]">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-md focus-visible:outline-none"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600 font-bold text-white">
                AG
              </span>
              <span>
                <span className="block font-bold">{profile.name}</span>
                <span className="text-sm text-slate-400">{profile.role}</span>
              </span>
            </Link>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              A personal professional portfolio centered on accuracy, quality,
              patient safety, and dependable laboratory support.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">
              Explore
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-slate-400 lg:grid-cols-1">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link className="inline-flex min-h-11 items-center hover:text-white" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-300">
              Professional details
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-400">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                {profile.location}
              </li>
              <li className="flex gap-3">
                <HeartPulse className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" aria-hidden="true" />
                Works at {profile.organization}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs leading-5 text-slate-400 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} {profile.name}. Personal portfolio.</p>
            <p className="mt-1 max-w-2xl">
              This is not an official website of Dr. RMLIMS and does not imply institutional endorsement.
            </p>
          </div>
          <a className="inline-flex min-h-11 items-center self-start hover:text-slate-200 sm:self-auto" href="#top">
            Back to top <span aria-hidden="true" className="ml-2">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
