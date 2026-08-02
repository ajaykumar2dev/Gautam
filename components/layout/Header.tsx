"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems, profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type NavItem = (typeof navItems)[number];

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function routeSection(pathname: string) {
  return (
    navItems.find(
      (item) =>
        !item.href.startsWith("/#") &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`)),
    )?.section ?? ""
  );
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(() =>
    pathname === "/" ? "home" : routeSection(pathname),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const closeMobileMenu = useCallback((restoreFocus = false) => {
    setMobileMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    const anchoredSections = navItems.filter((item) => item.href.startsWith("/#"));

    const updateScrollState = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 12);

      if (pathname !== "/") {
        setActiveSection(routeSection(pathname));
        return;
      }

      const marker = window.scrollY + Math.min(window.innerHeight * 0.32, 260);
      let currentSection = anchoredSections[0]?.section ?? "home";

      for (const item of anchoredSections) {
        const section = document.getElementById(item.section);
        const sectionTop = section
          ? section.getBoundingClientRect().top + window.scrollY
          : Number.POSITIVE_INFINITY;
        if (sectionTop <= marker) currentSection = item.section;
      }

      setActiveSection(currentSection);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMobileMenu();
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, [closeMobileMenu]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstControl = mobilePanelRef.current?.querySelector<HTMLElement>(focusableSelector);
      firstControl?.focus();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 80);

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const panelControls = Array.from(
        mobilePanelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((control) => !control.hasAttribute("disabled"));
      const controls = menuButtonRef.current
        ? [menuButtonRef.current, ...panelControls]
        : panelControls;

      if (!controls.length) return;

      const firstControl = controls[0];
      const lastControl = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === firstControl) {
        event.preventDefault();
        lastControl.focus();
      } else if (!event.shiftKey && document.activeElement === lastControl) {
        event.preventDefault();
        firstControl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeMobileMenu, mobileMenuOpen]);

  const handleNavigation = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    closeMobileMenu();

    if (pathname !== "/" || !item.href.startsWith("/#")) return;

    const target = document.getElementById(item.section);
    if (!target) return;

    event.preventDefault();
    setActiveSection(item.section);

    const hash = `#${item.section}`;
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });

    const sectionHeading = target.querySelector<HTMLElement>("h1, h2, h3");
    if (sectionHeading) {
      const alreadyFocusable = sectionHeading.hasAttribute("tabindex");
      if (!alreadyFocusable) sectionHeading.setAttribute("tabindex", "-1");
      sectionHeading.focus({ preventScroll: true });

      if (!alreadyFocusable) {
        sectionHeading.addEventListener(
          "blur",
          () => sectionHeading.removeAttribute("tabindex"),
          { once: true },
        );
      }
    }
  };

  const handleMenuButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (!mobileMenuOpen && event.key === "ArrowDown") {
      event.preventDefault();
      setMobileMenuOpen(true);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] w-full border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        isScrolled || mobileMenuOpen
          ? "border-line/80 bg-white/90 shadow-sm backdrop-blur-xl dark:bg-[#07111F]/90"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="relative z-20 mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex min-h-11 items-center gap-3 rounded-xl pr-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-medical-600 to-teal-500 text-sm font-extrabold tracking-wide text-white shadow-sm transition-transform group-hover:scale-[1.03] motion-reduce:transform-none">
            {profile.initials}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-extrabold tracking-tight sm:text-base">
              {profile.name}
            </span>
            <span className="block text-[0.69rem] font-medium text-muted">
              {profile.role}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.section;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(event) => handleNavigation(event, item)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-lg px-2.5 text-[0.8rem] font-semibold transition-colors hover:bg-medical-50 hover:text-medical-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:hover:bg-white/10 dark:hover:text-blue-200",
                  isActive ? "text-medical-700 dark:text-blue-300" : "text-muted",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-0.5 origin-center rounded-full bg-medical-600 transition-transform duration-200 motion-reduce:transition-none",
                    isActive ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <ThemeToggle />
          <ResumeButton />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-sm transition-colors hover:border-medical-500/40 hover:bg-medical-50 hover:text-medical-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:hover:bg-white/10 dark:hover:text-blue-200"
            onClick={() => setMobileMenuOpen((open) => !open)}
            onKeyDown={handleMenuButtonKeyDown}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-panel"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
          <>
            <div
              className="fixed inset-0 top-[4.5rem] z-0 bg-slate-950/30 backdrop-blur-[2px] xl:hidden"
              onClick={() => closeMobileMenu(true)}
              aria-hidden="true"
            />
            <div
              ref={mobilePanelRef}
              id="mobile-navigation-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="absolute inset-x-0 top-full z-10 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-line bg-white/[0.98] px-4 pb-5 pt-3 shadow-soft backdrop-blur-xl dark:bg-[#07111F]/[0.98] sm:px-6 xl:hidden"
            >
              <nav aria-label="Mobile navigation" className="mx-auto grid max-w-2xl gap-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.section;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) => handleNavigation(event, item)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex min-h-11 items-center rounded-xl border-l-2 px-4 text-sm font-semibold transition-colors hover:bg-medical-50 hover:text-medical-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas dark:hover:bg-white/10 dark:hover:text-blue-200",
                        isActive
                          ? "border-medical-600 bg-medical-50 text-medical-700 dark:bg-medical-500/10 dark:text-blue-300"
                          : "border-transparent text-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mx-auto mt-4 grid max-w-2xl gap-2 border-t border-line pt-4 sm:grid-cols-2">
                <ThemeToggle className="w-full justify-center rounded-xl" showLabel />
                <ResumeButton className="w-full rounded-xl" />
              </div>
            </div>
          </>
      ) : null}
    </header>
  );
}

export default Header;
