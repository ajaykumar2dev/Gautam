"use client";

import { useEffect, useRef, useState } from "react";

import { profileStatistics } from "@/data/statistics";

function CountValue({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const element = ref.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !element) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const duration = 700;
      const start = performance.now();
      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }, { rootMargin: "-60px" });
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{display}</span>;
}

export function StatisticsSection() {
  return (
    <section aria-labelledby="portfolio-numbers" className="deferred-section bg-[#08182b] text-white">
      <div className="shell py-12 sm:py-16">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-300">Portfolio at a glance</p>
            <h2 id="portfolio-numbers" className="mt-2 font-[family-name:var(--font-manrope)] text-2xl font-bold tracking-tight sm:text-3xl">
              Facts drawn from the content shown here.
            </h2>
          </div>
          <p className="max-w-md text-xs leading-5 text-slate-400">These are content counts—not performance, patient, or outcome metrics.</p>
        </div>
        <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
          {profileStatistics.map((stat, index) => (
            <div key={stat.label} className={`py-8 sm:px-7 ${index > 0 ? "border-t border-white/10 sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 1 ? "sm:border-t lg:border-t-0" : ""} ${index > 0 ? "lg:border-l" : ""}`}>
              <dt className="font-bold text-blue-100">{stat.label}</dt>
              <dd className="mt-4">
                <span className="block font-[family-name:var(--font-manrope)] text-5xl font-bold tracking-[-.05em] text-white"><CountValue value={stat.value} />{stat.suffix}</span>
                <span className="mt-2 block text-xs text-slate-400">{stat.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
