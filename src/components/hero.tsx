"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";
import { navigation } from "@/data/site";
import { profile } from "@/data/profile";

export function Hero({ active }: { active: boolean }) {
  const heroRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.7 });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mascotX = useTransform(springX, [-1, 1], [-13, 13]);
  const mascotY = useTransform(springY, [-1, 1], [-8, 8]);
  const mascotRotate = useTransform(springX, [-1, 1], [-1.2, 1.2]);
  const mascotScaleTarget = useMotionValue(1);
  const mascotScale = useSpring(mascotScaleTarget, { stiffness: 110, damping: 18, mass: 0.55 });
  const wordX = useTransform(springX, [-1, 1], [5, -5]);
  const wordHighlight = useTransform(springX, [-1, 1], ["38%", "62%"]);
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);
  const supportOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  function trackPointer(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height * 0.5);
    const distance = Math.hypot(dx, dy);
    mascotScaleTarget.set(1 + Math.max(0, 1 - distance / Math.min(rect.width, rect.height)) * 0.025);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
    mascotScaleTarget.set(1);
  }

  return (
    <section ref={heroRef} id="top" className="hero" onPointerMove={trackPointer} onPointerLeave={resetPointer}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ankush, back to top">ANKUSH.</a>
        <nav aria-label="Primary navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        {profile.resumeUrl ? (
          <a className="resume-link" href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume ↗</a>
        ) : (
          <span className="resume-link unavailable" title="Resume link can be added in profile data">Resume — soon</span>
        )}
        <details className="mobile-nav">
          <summary>Menu</summary>
          <div>
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </div>
        </details>
      </header>

      <motion.div className="hero-stage" style={reducedMotion ? undefined : { scale: stageScale }}>
        <div className="hero-name-mask">
          <motion.p
            className="hero-name"
            data-text="ANKUSH"
            style={reducedMotion ? undefined : { x: wordX, backgroundPositionX: wordHighlight }}
            aria-label="Ankush"
            initial={reducedMotion ? false : { y: "112%" }}
            animate={active ? { y: "0%" } : { y: "112%" }}
            transition={{ duration: 0.95, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >ANKUSH</motion.p>
        </div>
        <motion.div
          className="hero-mascot"
          style={reducedMotion ? undefined : { x: mascotX, y: mascotY, rotate: mascotRotate, scale: mascotScale }}
        >
          <motion.div className="hero-mascot-entrance" initial={reducedMotion ? false : { opacity: 0, y: 90, scale: 0.92 }} animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 90, scale: 0.92 }} transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-mascot-idle"><Image src="/assets/mascot.png" alt="An illustrated portrait mascot of Ankush" fill loading="eager" fetchPriority="high" sizes="(max-width: 700px) 88vw, 48vw" /></div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-support"
        style={reducedMotion ? undefined : { opacity: supportOpacity }}
        initial={reducedMotion ? false : "hidden"}
        animate={active ? "visible" : "hidden"}
        variants={{ visible: { transition: { delayChildren: 0.65, staggerChildren: 0.11 } }, hidden: {} }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}>
          <p className="label">{profile.eyebrow}</p>
          <p className="hero-line">{profile.heroLine}</p>
        </motion.div>
        <motion.div className="hero-meta" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
          <p>{profile.role}</p>
          <p>{profile.location}</p>
        </motion.div>
        <motion.a href="#work" className="explore-link" variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>Explore my work <ArrowDownRight size={18} strokeWidth={1.6} /></motion.a>
      </motion.div>
    </section>
  );
}
