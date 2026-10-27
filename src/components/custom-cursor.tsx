"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const springX = useSpring(x, { stiffness: 900, damping: 48, mass: 0.15 });
  const springY = useSpring(y, { stiffness: 900, damping: 48, mass: 0.15 });
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)");
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
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("a, button, [data-cursor]");
      setActive(Boolean(target));
      setLabel(target?.dataset.cursor ?? "");
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div className={`custom-cursor ${active ? "is-active" : ""} ${label ? "has-label" : ""}`} style={{ x: springX, y: springY }} aria-hidden="true">
      {label}
    </motion.div>
  );
}
