"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    function move(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      setVisible((prev) => (prev ? prev : true));

      const rawTarget = event.target;
      const element =
        rawTarget instanceof Element
          ? rawTarget
          : typeof document !== "undefined"
            ? document.elementFromPoint(event.clientX, event.clientY)
            : null;
      const target = element as HTMLElement | null;

      const interactiveTarget = target?.closest<HTMLElement>(
        "a, button, summary, [role='button'], [data-cursor]"
      );
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const newActive = Boolean(interactiveTarget);
      const newLabel = cursorTarget?.dataset.cursor ?? "";
      const newDark = Boolean(
        target?.closest(
          ".about-section, .editorial-marquee, .skills-section, .site-footer, .case-study-charcoal, .portfolio-intro, .recognition-dialog, .project-charcoal"
        )
      );

      setActive((prev) => (prev !== newActive ? newActive : prev));
      setLabel((prev) => (prev !== newLabel ? newLabel : prev));
      setIsDark((prev) => (prev !== newDark ? newDark : prev));
    }

    function handlePointerDown() {
      setPressed(true);
    }

    function handlePointerUp() {
      setPressed(false);
    }

    function handlePointerLeave() {
      setVisible(false);
      setPressed(false);
    }

    function handlePointerEnter() {
      setVisible(true);
    }

    function handleScroll() {
      const currentX = x.get();
      const currentY = y.get();
      if (currentX < 0 || currentY < 0) return;

      const element =
        typeof document !== "undefined"
          ? document.elementFromPoint(currentX, currentY)
          : null;
      const target = element as HTMLElement | null;

      const interactiveTarget = target?.closest<HTMLElement>(
        "a, button, summary, [role='button'], [data-cursor]"
      );
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const newActive = Boolean(interactiveTarget);
      const newLabel = cursorTarget?.dataset.cursor ?? "";
      const newDark = Boolean(
        target?.closest(
          ".about-section, .editorial-marquee, .skills-section, .site-footer, .case-study-charcoal, .portfolio-intro, .recognition-dialog, .project-charcoal"
        )
      );

      setActive((prev) => (prev !== newActive ? newActive : prev));
      setLabel((prev) => (prev !== newLabel ? newLabel : prev));
      setIsDark((prev) => (prev !== newDark ? newDark : prev));
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.documentElement.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.documentElement.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const rootClasses = [
    "custom-cursor",
    visible ? "is-visible" : "",
    active ? "is-active" : "",
    label ? "has-label" : "",
    pressed ? "is-pressed" : "",
    isDark ? "is-dark" : "is-light",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClasses} aria-hidden="true">
      <motion.div className="custom-cursor-follower-box" style={{ x: springX, y: springY }}>
        <div className="custom-cursor-follower">
          <span className="custom-cursor-label">{label}</span>
        </div>
      </motion.div>
      <motion.div className="custom-cursor-dot-box" style={{ x, y }}>
        <div className="custom-cursor-dot" />
      </motion.div>
    </div>
  );
}
