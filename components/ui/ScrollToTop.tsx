"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      setIsVisible(window.scrollY > Math.max(480, window.innerHeight * 0.65));
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateVisibility);
      }
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return isVisible ? (
        <button
          type="button"
          className="fixed bottom-5 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-line bg-surface/95 text-ink shadow-soft backdrop-blur-md transition-colors hover:border-medical-500/50 hover:bg-medical-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:bottom-7 sm:right-7"
          onClick={scrollToTop}
          aria-label="Scroll back to the top"
          title="Back to top"
        >
          <ArrowUp aria-hidden="true" className="size-5" strokeWidth={1.9} />
        </button>
  ) : null;
}

export default ScrollToTop;
