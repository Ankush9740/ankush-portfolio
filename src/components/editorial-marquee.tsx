"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

const marqueeItems = ["BUILD", "BREAK", "LEARN", "SHIP", "REPEAT"];

function MarqueeSequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="editorial-marquee-sequence" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <span key={item} className="editorial-marquee-item">
          <span>{item}</span>
          <span className="editorial-marquee-arrow" aria-hidden="true">→</span>
        </span>
      ))}
    </span>
  );
}

export function EditorialMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const track = trackRef.current;
    const sequence = sequenceRef.current;
    if (!track || !sequence) return;

    let frame = 0;
    let offset = 0;
    let velocity = 0;
    let impulse = 0;
    let lastScrollY = window.scrollY;
    let sequenceWidth = sequence.getBoundingClientRect().width;

    const measure = () => {
      sequenceWidth = sequence.getBoundingClientRect().width;
    };

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const delta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      impulse += Math.max(-12, Math.min(12, delta * 0.18));
    };

    const animate = () => {
      velocity += (impulse - velocity) * 0.16;
      impulse *= 0.78;
      velocity *= 0.94;
      offset -= velocity;

      if (sequenceWidth > 0) {
        offset = ((offset % sequenceWidth) - sequenceWidth) % sequenceWidth;
      }

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      frame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(sequence);
    window.addEventListener("scroll", handleScroll, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reducedMotion]);

  return (
    <section className="editorial-marquee" aria-label="Build, break, learn, ship, repeat">
      <div ref={trackRef} className="editorial-marquee-track">
        <span ref={sequenceRef}><MarqueeSequence /></span>
        <MarqueeSequence hidden />
      </div>
    </section>
  );
}
