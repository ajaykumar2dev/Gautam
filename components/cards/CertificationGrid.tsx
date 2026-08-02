"use client";

import { useState } from "react";

import { CertificationCard } from "@/components/cards/CertificationCard";
import { certifications } from "@/data/certifications";
import { cn } from "@/lib/utils";

const filters = ["All", "Laboratory", "Safety", "Quality", "Clinical", "Training"] as const;

export function CertificationGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const visible = active === "All" ? certifications : certifications.filter((item) => item.category === active);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3" aria-label="Filter credential placeholders">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className={cn(
              "min-h-11 shrink-0 rounded-full border px-4 text-sm font-bold transition",
              active === filter ? "border-medical-500 bg-medical-500 text-white" : "bg-canvas text-muted hover:border-medical-500/50 hover:text-ink",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">Showing {visible.length} credential {visible.length === 1 ? "record" : "records"}.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => <CertificationCard key={item.title} item={item} />)}
      </div>
    </div>
  );
}
