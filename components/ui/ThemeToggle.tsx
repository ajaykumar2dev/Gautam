"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

const controlStyles =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-line bg-surface/90 px-3 text-ink shadow-sm transition-colors hover:border-medical-500/40 hover:bg-medical-50 hover:text-medical-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:cursor-wait disabled:opacity-70 dark:hover:bg-white/10 dark:hover:text-blue-200";

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(controlStyles, className)}
        aria-label="Theme control loading"
        title="Theme control loading"
        disabled
        suppressHydrationWarning
      >
        <SunMoon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        {showLabel ? <span className="text-sm font-semibold">Theme</span> : null}
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  const actionLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      className={cn(controlStyles, className)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={actionLabel}
      aria-pressed={isDark}
      title={actionLabel}
    >
        <span className="inline-flex transition-transform duration-200" aria-hidden="true">
          {isDark ? (
            <Sun className="size-5" strokeWidth={1.8} />
          ) : (
            <Moon className="size-5" strokeWidth={1.8} />
          )}
        </span>
      {showLabel ? (
        <span className="text-sm font-semibold">
          {isDark ? "Light theme" : "Dark theme"}
        </span>
      ) : null}
    </button>
  );
}

export default ThemeToggle;
