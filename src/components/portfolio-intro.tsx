"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PORTFOLIO_INTRO_STORAGE_KEY } from "@/lib/portfolio-intro";

const INTRO_LETTERS = Array.from("ANKUSH");

type PortfolioIntroProps = {
  onComplete: () => void;
};

export function PortfolioIntro({ onComplete }: PortfolioIntroProps) {
  const [visible, setVisible] = useState(true);
  const finished = useRef(false);
  const reducedMotion = useReducedMotion();

  const finishIntro = useCallback(
    () => {
      if (finished.current) return;
      finished.current = true;

      try {
        sessionStorage.setItem(PORTFOLIO_INTRO_STORAGE_KEY, "complete");
      } catch {
        // Storage can be unavailable in hardened browser contexts; the intro still completes.
      }

      onComplete();
      setVisible(false);
    },
    [onComplete],
  );

  useEffect(() => {
    if (finished.current) return;
    const timer = window.setTimeout(
      () => finishIntro(),
      reducedMotion ? 100 : 1750,
    );
    return () => window.clearTimeout(timer);
  }, [finishIntro, reducedMotion]);

  useEffect(() => {
    if (finished.current) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      finishIntro();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finishIntro]);

  const exitTransition = {
    duration: reducedMotion ? 0.12 : 0.75,
    ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          id="portfolio-intro"
          className="portfolio-intro"
          aria-label="Portfolio introduction"
          initial={false}
          exit={reducedMotion ? { opacity: 0 } : { y: "-100%" }}
          transition={exitTransition}
        >
          <div className="intro-ambient" aria-hidden="true" />
          <div className="intro-grid" aria-hidden="true" />

          <motion.div
            className="intro-topline"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.55, delay: 0.08 }}
          >
            <span>ANKUSH.</span>
            <span>PORTFOLIO / 2026</span>
          </motion.div>

          <div className="intro-center">
            <h1 className="intro-name" aria-label="Ankush">
              {INTRO_LETTERS.map((letter, index) => (
                <span className="intro-letter-mask" aria-hidden="true" key={`${letter}-${index}`}>
                  <motion.span
                    className="intro-letter"
                    initial={reducedMotion ? false : { y: "112%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: reducedMotion ? 0.01 : 0.78,
                      delay: reducedMotion ? 0 : 0.18 + index * 0.055,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="intro-rule" aria-hidden="true">
              <motion.span
                className="intro-rule-fill"
                initial={reducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: reducedMotion ? 0.01 : 0.9,
                  delay: reducedMotion ? 0 : 0.52,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
              <motion.i
                className="intro-rule-dot"
                initial={reducedMotion ? false : { left: "0%", opacity: 0 }}
                animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: reducedMotion ? 0.01 : 1.05,
                  delay: reducedMotion ? 0 : 0.58,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </div>

            <motion.p
              className="intro-caption"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.5, delay: reducedMotion ? 0 : 0.78 }}
            >
              Creative developer · Selected work
            </motion.p>
          </div>

          <motion.button
            className="intro-skip"
            type="button"
            onClick={finishIntro}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.4, delay: reducedMotion ? 0 : 0.72 }}
          >
            Skip intro <span aria-hidden="true">↗</span>
          </motion.button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
