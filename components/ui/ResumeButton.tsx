import Link from "next/link";
import { Download, FileText } from "lucide-react";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type ResumeButtonProps = {
  className?: string;
  compact?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variantStyles = {
  primary:
    "border-medical-600 bg-medical-600 text-white shadow-sm hover:border-medical-700 hover:bg-medical-700 hover:shadow-md",
  secondary:
    "border-line bg-surface text-ink shadow-sm hover:border-medical-500/50 hover:bg-medical-50 hover:text-medical-700 dark:hover:bg-white/10 dark:hover:text-blue-200",
  ghost:
    "border-transparent bg-transparent text-ink hover:border-line hover:bg-surface/80 hover:text-medical-700 dark:hover:text-blue-200",
} as const;

export function ResumeButton({
  className,
  compact = false,
  label,
  variant = "primary",
}: ResumeButtonProps) {
  const sharedStyles = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-4 text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas motion-reduce:transform-none motion-reduce:transition-none",
    compact && "min-w-11 px-3",
    variantStyles[variant],
    className,
  );

  if (!profile.resume.available) {
    const accessibleLabel = "Resume status — view availability information";

    return (
      <Link href="/resume" className={sharedStyles} aria-label={accessibleLabel}>
        <FileText aria-hidden="true" className="size-4.5 shrink-0" />
        {compact ? <span className="sr-only">{accessibleLabel}</span> : <span>Resume status</span>}
      </Link>
    );
  }

  const visibleLabel = label ?? "Download resume";

  return (
    <a
      href={profile.resume.path}
      download
      className={sharedStyles}
      aria-label={`Download ${profile.name}'s resume as a PDF`}
    >
      <Download aria-hidden="true" className="size-4.5 shrink-0" />
      {compact ? <span className="sr-only">{visibleLabel}</span> : <span>{visibleLabel}</span>}
    </a>
  );
}

export default ResumeButton;
