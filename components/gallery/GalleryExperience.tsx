"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { galleryItems } from "@/data/gallery";
import type { GalleryItem } from "@/types/portfolio";

type GalleryFilter = "All" | GalleryItem["category"];

const filterOptions: ReadonlyArray<{ value: GalleryFilter; label: string }> = [
  { value: "All", label: "All visuals" },
  { value: "Laboratory", label: "Laboratory" },
  { value: "Equipment", label: "Medical equipment" },
  { value: "Events", label: "Professional events" },
  { value: "Team", label: "Team activities" },
];

const categoryLabels: Record<GalleryItem["category"], string> = {
  Laboratory: "Laboratory",
  Equipment: "Medical equipment",
  Events: "Professional events",
  Team: "Team activities",
};

const cardSpans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-7",
] as const;

const aspectClasses: Record<GalleryItem["aspect"], string> = {
  landscape: "sm:col-span-2 min-h-[22rem] sm:min-h-[30rem]",
  portrait: "min-h-[28rem] sm:min-h-[34rem]",
  square: "min-h-[24rem] sm:min-h-[30rem]",
};

const blurDataUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23dbeafe'/%3E%3Cstop offset='.55' stop-color='%23f8fafc'/%3E%3Cstop offset='1' stop-color='%23ccfbf1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill='url(%23g)' d='M0 0h32v24H0z'/%3E%3C/svg%3E";

export function GalleryExperience() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("All");
  const [activeId, setActiveId] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const activeItem = useMemo(
    () => filteredItems.find((item) => item.id === activeId) ?? null,
    [activeId, filteredItems],
  );

  const activeIndex = activeItem
    ? filteredItems.findIndex((item) => item.id === activeItem.id)
    : -1;
  const isLightboxOpen = activeItem !== null;

  const closeLightbox = useCallback(() => setActiveId(null), []);

  const moveLightbox = useCallback(
    (direction: -1 | 1) => {
      setActiveId((currentId) => {
        if (currentId === null || filteredItems.length === 0) return currentId;

        const currentIndex = filteredItems.findIndex((item) => item.id === currentId);
        const nextIndex =
          (currentIndex + direction + filteredItems.length) % filteredItems.length;

        return filteredItems[nextIndex]?.id ?? currentId;
      });
    },
    [filteredItems],
  );

  const openLightbox = (itemId: number, trigger: HTMLButtonElement) => {
    openerRef.current = trigger;
    setActiveId(itemId);
  };

  const selectFilter = (filter: GalleryFilter) => {
    closeLightbox();
    setActiveFilter(filter);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveLightbox(-1);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveLightbox(1);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [closeLightbox, isLightboxOpen, moveLightbox]);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line bg-surface">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-clinical-grid opacity-50 clinical-grid-mask"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-12 -z-10 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-500/10"
        />
        <div
          aria-hidden="true"
          className="absolute -left-28 bottom-0 -z-10 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl"
        />

        <div className="shell grid gap-10 pb-16 pt-20 sm:pb-20 sm:pt-24 lg:grid-cols-12 lg:items-end lg:gap-12 lg:pb-24 lg:pt-28">
          <motion.div
            className="lg:col-span-8"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
          >
            <p className="eyebrow">Curated professional gallery</p>
            <h1 className="section-title mt-5 max-w-4xl text-ink">
              A visual study of precision, learning, and collaborative care.
            </h1>
            <p className="body-copy mt-7 max-w-2xl">
              This gallery is prepared for approved professional imagery. Every visual shown now is
              a purpose-built placeholder—never a patient photograph, medical record, report, or
              real laboratory sample.
            </p>
          </motion.div>

          <motion.aside
            className="rounded-3xl border border-blue-200/80 bg-canvas/90 p-6 shadow-soft backdrop-blur-sm dark:border-blue-900"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.08,
              ease: "easeOut",
            }}
            aria-label="Gallery privacy standard"
          >
            <div className="flex items-start gap-4">
              <span className="icon-disc" aria-hidden="true">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Privacy by design</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Only consented, reviewed, and fully de-identified photography should replace these
                  illustrations.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5">
              <div>
                <p className="font-[var(--font-manrope)] text-2xl font-extrabold text-ink">
                  {String(galleryItems.length).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Placeholders
                </p>
              </div>
              <div>
                <p className="font-[var(--font-manrope)] text-2xl font-extrabold text-teal-600 dark:text-teal-400">
                  0
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Patient records
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="section-space bg-canvas" aria-labelledby="gallery-collection-title">
        <div className="shell">
          <div className="flex flex-col gap-7 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="icon-disc" aria-hidden="true">
                  <Images className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-medical-600 dark:text-blue-300">
                    Editorial collection
                  </p>
                  <h2
                    id="gallery-collection-title"
                    className="mt-1 font-[var(--font-manrope)] text-2xl font-extrabold tracking-[-0.035em] text-ink sm:text-3xl"
                  >
                    Professional moments, thoughtfully framed
                  </h2>
                </div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted lg:text-right">
              Select a category, then open any illustration for its caption and full-screen view.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]"
              role="group"
              aria-label="Filter gallery by category"
            >
              {filterOptions.map((option) => {
                const isActive = activeFilter === option.value;
                const count =
                  option.value === "All"
                    ? galleryItems.length
                    : galleryItems.filter((item) => item.category === option.value).length;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectFilter(option.value)}
                    className={`min-h-11 shrink-0 rounded-full border px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${
                      isActive
                        ? "border-medical-600 bg-medical-600 text-white shadow-md shadow-blue-700/15"
                        : "border-line bg-surface text-muted hover:border-medical-500/45 hover:bg-blue-50 hover:text-medical-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-200"
                    }`}
                  >
                    {option.label}
                    <span
                      className={`ml-2 rounded-full px-1.5 py-0.5 text-[11px] ${
                        isActive ? "bg-white/20 text-white" : "bg-canvas text-muted"
                      }`}
                      aria-hidden="true"
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="shrink-0 text-sm font-medium text-muted" role="status" aria-live="polite">
              Showing {filteredItems.length} {filteredItems.length === 1 ? "placeholder" : "placeholders"}
            </p>
          </div>

          <motion.div
            layout={!shouldReduceMotion}
            className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.article
                  layout={!shouldReduceMotion}
                  key={item.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: "easeOut" }}
                  className={`${aspectClasses[item.aspect]} ${cardSpans[index % cardSpans.length]} h-full`}
                >
                  <button
                    type="button"
                    onClick={(event) => openLightbox(item.id, event.currentTarget)}
                    className="group relative block h-full min-h-[inherit] w-full overflow-hidden rounded-[1.75rem] border border-line bg-surface text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 dark:hover:border-blue-700"
                    aria-haspopup="dialog"
                    aria-label={`Open illustrated placeholder: ${item.title}`}
                  >
                    <figure className="relative h-full min-h-[inherit] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) calc(50vw - 44px), 56vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                        placeholder="blur"
                        blurDataURL={blurDataUrl}
                        priority={index === 0 && activeFilter === "All"}
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent"
                      />

                      <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2 sm:left-5 sm:top-5">
                        <span className="status-placeholder border-amber-300/70 bg-amber-50/95 shadow-sm">
                          Illustrated placeholder
                        </span>
                        <span className="rounded-full border border-white/35 bg-slate-950/40 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                          {categoryLabels[item.category]}
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="absolute right-4 top-4 inline-flex h-11 w-11 translate-y-1 items-center justify-center rounded-full border border-white/35 bg-slate-950/45 text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:right-5 sm:top-5"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </span>

                      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-200">
                          Placeholder {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 font-[var(--font-manrope)] text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-200 sm:text-base">
                          {item.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                          View placeholder
                          <Maximize2 className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </figcaption>
                    </figure>
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[120] overflow-y-auto bg-slate-950/95 p-3 text-white backdrop-blur-lg sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="gallery-lightbox-title"
              aria-describedby="gallery-lightbox-description"
              tabIndex={-1}
              className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.99, y: 6 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <header className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold uppercase tracking-[0.16em] text-blue-300">
                    {categoryLabels[activeItem.category]} · illustrated placeholder
                  </p>
                  <p className="mt-1 text-sm text-slate-400" aria-live="polite" aria-atomic="true">
                    Image {activeIndex + 1} of {filteredItems.length}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/35"
                  aria-label="Close gallery lightbox"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </header>

              <div className="relative flex flex-1 items-center px-2 py-4 sm:px-16 sm:py-6 lg:px-24">
                <button
                  type="button"
                  onClick={() => moveLightbox(-1)}
                  className="absolute left-3 top-1/2 z-10 inline-flex min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-slate-950/75 text-white shadow-lg backdrop-blur-md transition hover:border-white/50 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/35 sm:left-4"
                  aria-label={`Previous placeholder: ${
                    filteredItems[(activeIndex - 1 + filteredItems.length) % filteredItems.length]
                      ?.title ?? "previous image"
                  }`}
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>

                <AnimatePresence initial={false} mode="wait">
                  <motion.figure
                    key={activeItem.id}
                    className="mx-auto w-full max-w-6xl"
                    initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                  >
                    <div className="relative h-[48vh] min-h-[17rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 sm:h-[58vh] lg:h-[64vh]">
                      <Image
                        src={activeItem.src}
                        alt={activeItem.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 88vw"
                        className="object-contain"
                        priority
                      />
                      <span className="absolute bottom-3 left-3 rounded-full border border-amber-300/40 bg-amber-50/95 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-900 shadow-lg sm:bottom-5 sm:left-5">
                        Privacy-safe placeholder illustration
                      </span>
                    </div>
                    <figcaption className="mx-auto max-w-4xl px-1 pb-3 pt-5 text-center sm:pt-6">
                      <h2
                        id="gallery-lightbox-title"
                        className="font-[var(--font-manrope)] text-2xl font-extrabold tracking-[-0.035em] text-white sm:text-3xl"
                      >
                        {activeItem.title}
                      </h2>
                      <p
                        id="gallery-lightbox-description"
                        className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base"
                      >
                        {activeItem.description}
                      </p>
                      <p className="mt-3 hidden text-xs font-medium text-slate-500 sm:block">
                        Use the left and right arrow keys to browse. Press Escape to close.
                      </p>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => moveLightbox(1)}
                  className="absolute right-3 top-1/2 z-10 inline-flex min-h-12 min-w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-slate-950/75 text-white shadow-lg backdrop-blur-md transition hover:border-white/50 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/35 sm:right-4"
                  aria-label={`Next placeholder: ${
                    filteredItems[(activeIndex + 1) % filteredItems.length]?.title ?? "next image"
                  }`}
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
