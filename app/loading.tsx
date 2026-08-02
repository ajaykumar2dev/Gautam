export default function Loading() {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-canvas" role="status" aria-live="polite" aria-label="Loading page">
      <div className="text-center">
        <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border border-blue-200 dark:border-blue-900">
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-medical-500 motion-safe:animate-spin" aria-hidden="true" />
          <span className="font-[family-name:var(--font-manrope)] text-lg font-extrabold text-medical-600 dark:text-blue-300">AG</span>
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.18em] text-muted">Loading portfolio</p>
      </div>
    </div>
  );
}
