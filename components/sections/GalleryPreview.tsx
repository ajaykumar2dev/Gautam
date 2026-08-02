import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryItems } from "@/data/gallery";

export function GalleryPreview() {
  return (
    <section id="gallery" className="deferred-section section-space section-surface scroll-mt-24">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06 / 06"
            eyebrow="Gallery"
            title="A visual record, designed around privacy."
            description="Abstract placeholders show the intended editorial direction. Real images should be approved, consented, and free of patient or hospital-confidential information."
          />
          <Link href="/gallery" className="button-secondary self-start lg:self-auto">Explore gallery <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-12">
          {galleryItems.slice(0, 3).map((item, index) => (
            <Reveal key={item.id} className={index === 0 ? "md:col-span-7" : "md:col-span-5"} delay={index * 0.06}>
              <Link href="/gallery" className="group relative block h-full min-h-[300px] overflow-hidden rounded-[2rem] border bg-canvas focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25">
                <Image src={item.src} alt={item.alt} fill sizes={index === 0 ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"} className="object-cover transition duration-500 group-hover:scale-[1.025]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06101d]/90 via-[#06101d]/60 to-transparent p-6 pt-20 text-white">
                  <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] backdrop-blur">Placeholder · {item.category}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-manrope)] text-xl font-bold">{item.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
