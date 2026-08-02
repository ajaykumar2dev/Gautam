import { ArrowDown, ArrowRight, BadgeCheck, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import profilePhoto from "@/Amrita_Gautam454.jpeg";
import { ClinicalPrecisionCard } from "@/components/sections/ClinicalPrecisionCard";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { profile } from "@/data/profile";

function HeroPortrait() {
  return (
    <div className="relative mx-auto flex w-full max-w-[480px] flex-col gap-5">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border border-white/60 bg-blue-50 shadow-[0_35px_100px_-45px_rgba(30,58,138,.55)] dark:border-white/10 dark:bg-[#0f1c2e]">
        <Image
          src={profilePhoto}
          alt="Professional portrait of Amrita Gautam"
          fill
          priority
          placeholder="blur"
          sizes="(max-width: 1024px) calc(100vw - 40px), 480px"
          className="object-cover object-top"
        />
      </div>

      <ClinicalPrecisionCard />

      <div className="ml-auto max-w-[290px] rounded-2xl border border-line bg-canvas/95 p-4 shadow-soft backdrop-blur">
        <p className="flex items-start gap-2 text-xs leading-5 text-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-medical-500" aria-hidden="true" />
          Works at {profile.organizationShort}, Lucknow
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 sm:pt-28 lg:min-h-[92svh] lg:pt-32">
      <div className="clinical-grid-mask absolute inset-0 -z-20 bg-clinical-grid opacity-60 dark:opacity-20" />
      <div className="absolute right-[-15rem] top-[-12rem] -z-10 h-[42rem] w-[42rem] rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-600/10" />
      <div className="absolute left-[40%] top-[35%] -z-10 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />

      <div className="shell grid items-start gap-16 pb-16 pt-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-12 lg:pb-24 lg:pt-16">
        <div className="order-2 lg:order-1">
          <p className="eyebrow">Medical laboratory professional</p>
          <h1 className="display-title mt-7">
            <span className="block">Amrita</span>
            <span className="block text-medical-600 dark:text-blue-400">Gautam.</span>
          </h1>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-muted sm:text-base">
            <span>{profile.role}</span>
            <span className="h-1 w-1 rounded-full bg-teal-500" aria-hidden="true" />
            <span>Lucknow, India</span>
          </div>
          <blockquote className="mt-8 max-w-2xl border-l-2 border-teal-500 pl-5 font-[family-name:var(--font-manrope)] text-xl font-semibold leading-8 text-ink sm:text-2xl sm:leading-9">
            “{profile.tagline}”
          </blockquote>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            {profile.introduction}
          </p>

          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <ResumeButton />
            <Link href="/contact" className="button-secondary">
              Contact me <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="#experience" className="inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-muted transition hover:text-medical-600 dark:hover:text-blue-300">
              View experience <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line/80 bg-canvas/70 p-4 text-xs leading-5 text-muted backdrop-blur sm:max-w-xl">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" aria-hidden="true" />
            <p>
              Workplace information is presented for professional context only. This personal portfolio is not affiliated with or endorsed by Dr. RMLIMS.
            </p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <HeroPortrait />
        </div>
      </div>
    </section>
  );
}
