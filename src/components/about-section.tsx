"use client";

import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { aboutCards, type AboutCard as AboutCardData } from "@/data/about";
import { profile } from "@/data/profile";
import { FadeIn } from "@/components/motion/fade-in";

function AboutCard({ card, pointerX, pointerY, cardRef }: { card: AboutCardData; pointerX: ReturnType<typeof useMotionValue<number>>; pointerY: ReturnType<typeof useMotionValue<number>>; cardRef: (node: HTMLElement | null) => void }) {
  const reducedMotion = useReducedMotion();
  const distance = card.depth === 3 ? 8 : card.depth === 2 ? 5 : 3;
  const x = useTransform(pointerX, [-1, 1], [-distance, distance]);
  const y = useTransform(pointerY, [-1, 1], [-distance * 0.55, distance * 0.55]);

  return (
    <motion.article ref={cardRef} className={`about-card ${card.className}`} style={reducedMotion ? undefined : { x, y }} tabIndex={0}>
      <p>{card.label}</p>
      <h3>{card.title}</h3>
      <span>{card.detail}</span>
      <span className="about-card-node" aria-hidden="true" />
    </motion.article>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const activeCardRef = useRef(-1);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 65, damping: 22 });
  const pointerY = useSpring(rawY, { stiffness: 65, damping: 22 });
  const reducedMotion = useReducedMotion();
  const backdropX = useTransform(pointerX, [-1, 1], [2.5, -2.5]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const fieldY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const orbitDistance = useTransform(scrollYProgress, [0, 1], ["2%", "98%"]);
  const orbitBorder = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(242, 240, 235, 0.09)", "rgba(242, 240, 235, 0.17)", "rgba(242, 240, 235, 0.09)"]);

  const updateActiveCard = useCallback((progress: number) => {
    const nextIndex = Math.min(aboutCards.length - 1, Math.max(0, Math.round(progress * (aboutCards.length - 1))));
    if (nextIndex === activeCardRef.current) return;

    cardRefs.current[activeCardRef.current]?.classList.remove("is-orbit-active");
    cardRefs.current[nextIndex]?.classList.add("is-orbit-active");
    activeCardRef.current = nextIndex;
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!reducedMotion) updateActiveCard(latest);
  });

  useEffect(() => {
    if (reducedMotion) {
      cardRefs.current[activeCardRef.current]?.classList.remove("is-orbit-active");
      activeCardRef.current = -1;
      return;
    }

    updateActiveCard(scrollYProgress.get());
  }, [reducedMotion, scrollYProgress, updateActiveCard]);

  function handlePointer(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
    rawX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  }

  return (
    <section ref={sectionRef} id="about" className="about-section" onPointerMove={handlePointer} onPointerLeave={() => { rawX.set(0); rawY.set(0); }}>
      <div className="section-kicker light"><span>02</span><span>About / My world</span></div>
      <motion.p className="about-backdrop" aria-hidden="true" style={reducedMotion ? undefined : { x: backdropX }}>MY WORLD.</motion.p>
      <FadeIn className="about-intro">
        <p>{profile.introduction}</p>
      </FadeIn>
      <motion.div className="about-field" style={reducedMotion ? undefined : { y: fieldY }}>
        <motion.div className="about-connector" aria-hidden="true" style={reducedMotion ? undefined : { borderColor: orbitBorder }}>
          <span className="about-orbit-label">MY WORLD / 07</span>
          <motion.span className="about-orbit-indicator" style={reducedMotion ? undefined : { offsetDistance: orbitDistance }} />
        </motion.div>
        {aboutCards.map((card, index) => (
          <AboutCard
            key={card.label}
            card={card}
            pointerX={pointerX}
            pointerY={pointerY}
            cardRef={(node) => { cardRefs.current[index] = node; }}
          />
        ))}
      </motion.div>
    </section>
  );
}
