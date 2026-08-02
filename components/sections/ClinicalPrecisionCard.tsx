"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { useId, useRef, type PointerEvent as ReactPointerEvent } from "react";

const waveformPath = "M2 34h78l16-20 25 41 29-34 18 13h65l15-17 22 32 22-15h106";

export function ClinicalPrecisionCard() {
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();
  const pointerBounds = useRef<DOMRect | null>(null);
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, { stiffness: 210, damping: 25, mass: 0.45 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 210, damping: 25, mass: 0.45 });

  const entranceVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const labelGroupVariants: Variants = shouldReduceMotion
    ? { hidden: {}, visible: {} }
    : {
        hidden: {},
        visible: {
          transition: { delayChildren: 0.46, staggerChildren: 0.12 },
        },
      };

  const labelVariants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      };

  function resetParallax() {
    pointerBounds.current = null;
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (shouldReduceMotion || event.pointerType === "touch") return;
    pointerBounds.current = event.currentTarget.getBoundingClientRect();
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (shouldReduceMotion || event.pointerType === "touch") return;

    const bounds = pointerBounds.current;
    if (!bounds) return;

    const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
    const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateYTarget.set(horizontalPosition * 3);
    rotateXTarget.set(verticalPosition * -3);
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={entranceVariants}
    >
      <motion.section
        aria-labelledby={titleId}
        className="clinical-precision-card overflow-hidden rounded-[2rem] border border-line bg-canvas/95 p-5 shadow-soft backdrop-blur sm:p-6"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -4,
                borderColor: "rgba(45, 212, 191, 0.38)",
                boxShadow: "0 24px 58px -30px rgba(20, 184, 166, 0.48)",
                transition: {
                  y: { type: "spring", stiffness: 240, damping: 24, mass: 0.5 },
                  borderColor: { duration: 0.22 },
                  boxShadow: { duration: 0.24 },
                },
              }
        }
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetParallax}
        onPointerCancel={resetParallax}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-medical-700 dark:text-blue-300">
              <span className="precision-status-dot" aria-hidden="true" />
              Clinical precision
            </h2>
            <p className="mt-2 text-xs leading-5 text-muted">Quality-led laboratory practice</p>
          </div>
          <span className="shrink-0 font-mono text-[10px] text-muted" aria-hidden="true">AG / LKO</span>
        </div>

        <div className="precision-waveform-panel relative mt-5 h-24 overflow-hidden rounded-2xl border border-line/80 bg-blue-50/70 dark:bg-[#0b1727]" aria-hidden="true">
          <div className="absolute inset-0 bg-clinical-grid bg-[length:24px_24px] opacity-70 dark:opacity-35" />

          <div className="precision-orbit-field">
            <span className="precision-ring precision-ring-outer" />
            <span className="precision-ring precision-ring-inner" />
          </div>

          <span className="precision-scan-line" />

          <svg className="absolute inset-x-4 top-1/2 z-30 h-16 w-[calc(100%-2rem)] -translate-y-1/2" viewBox="0 0 400 64" fill="none" preserveAspectRatio="none">
            <path d="M2 34h396" stroke="currentColor" strokeWidth="1" className="text-medical-400/25" vectorEffect="non-scaling-stroke" />
            <path
              d={waveformPath}
              className="precision-waveform-ghost"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={waveformPath}
              className="precision-waveform-path"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={waveformPath}
              className="precision-waveform-pulse"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <motion.div
          className="mt-4 flex items-center justify-between gap-3 text-[9px] font-bold uppercase tracking-[.16em] text-muted sm:text-[10px]"
          initial="hidden"
          animate="visible"
          variants={labelGroupVariants}
        >
          {["Accuracy", "Quality", "Safety"].map((label) => (
            <motion.span className="precision-label" variants={labelVariants} key={label}>
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
