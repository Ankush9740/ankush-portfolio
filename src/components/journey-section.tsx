"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { journey } from "@/data/journey";
import { FadeIn } from "@/components/motion/fade-in";

function JourneyEntry({ item, index, reducedMotion }: { item: (typeof journey)[number]; index: number; reducedMotion: boolean | null }) {
  return (
    <motion.article
      className={`timeline-entry ${item.status ?? ""}`}
      initial={reducedMotion ? false : { opacity: 0.32, y: 36 }}
      whileInView={reducedMotion ? undefined : { opacity: item.status === "future" ? 0.58 : 1, y: 0 }}
      viewport={{ once: true, amount: 0.62 }}
      transition={{ duration: 0.62, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <time>{item.year}</time>
      <motion.span
        className="timeline-dot"
        initial={reducedMotion ? false : { scale: 0.45 }}
        whileInView={reducedMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: index * 0.06 }}
      />
      <div><h3>{item.title}</h3><p>{item.detail}</p></div>
    </motion.article>
  );
}

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 75%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  return (
    <section ref={sectionRef} id="journey" className="journey-section">
      <div className="section-kicker"><span>06</span><span>Journey</span></div>
      <FadeIn className="journey-heading"><p className="label">A quieter chapter</p><h2>MY JOURNEY.</h2></FadeIn>
      <div className="timeline">
        <div className="timeline-rail"><motion.div className="timeline-progress" style={reducedMotion ? { scaleY: 1 } : { scaleY: progress }} /></div>
        {journey.map((item, index) => <JourneyEntry key={item.year} item={item} index={index} reducedMotion={reducedMotion} />)}
      </div>
    </section>
  );
}
