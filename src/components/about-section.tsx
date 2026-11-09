"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, useId } from "react";
import { aboutCards, type AboutCard as AboutCardData } from "@/data/about";
import { profile } from "@/data/profile";
import { FadeIn } from "@/components/motion/fade-in";

function CardMotif({ index }: { index: number }) {
  switch (index) {
    case 0:
      // Identity: Ankush monogram crosshairs
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <rect x="25" y="15" width="110" height="70" rx="4" stroke="rgba(242, 240, 235, 0.2)" strokeDasharray="3 3" />
          <circle cx="80" cy="50" r="24" stroke="rgba(201, 52, 52, 0.6)" strokeWidth="1.2" />
          <circle cx="80" cy="50" r="3" fill="#c93434" />
          <line x1="80" y1="20" x2="80" y2="80" stroke="rgba(242, 240, 235, 0.15)" strokeWidth="1" />
          <line x1="45" y1="50" x2="115" y2="50" stroke="rgba(242, 240, 235, 0.15)" strokeWidth="1" />
          <path d="M72 58 L80 38 L88 58 M75 52 L85 52" stroke="#f2f0eb" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="30" y="28" fill="#77736d" fontSize="7" fontFamily="var(--font-space)" letterSpacing="0.1em">ID // 01</text>
          <text x="96" y="78" fill="#c93434" fontSize="7" fontFamily="var(--font-space)" letterSpacing="0.1em">DEV</text>
        </svg>
      );
    case 1:
      // Education: BCA 2024 - 2027 Timeline
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <line x1="20" y1="50" x2="140" y2="50" stroke="rgba(242, 240, 235, 0.25)" strokeWidth="1" />
          <circle cx="35" cy="50" r="4" fill="#c93434" stroke="#0d0d0d" strokeWidth="2" />
          <circle cx="80" cy="50" r="5" fill="#f2f0eb" stroke="#c93434" strokeWidth="2" />
          <circle cx="125" cy="50" r="4" fill="rgba(242, 240, 235, 0.3)" stroke="#0d0d0d" strokeWidth="2" />
          <rect x="65" y="22" width="30" height="16" rx="2" fill="#1b1b1b" stroke="rgba(242, 240, 235, 0.2)" />
          <text x="69" y="33" fill="#f2f0eb" fontSize="7" fontFamily="var(--font-space)">DEGREE</text>
          <text x="25" y="68" fill="#77736d" fontSize="8" fontFamily="var(--font-space)">2024</text>
          <text x="115" y="68" fill="#77736d" fontSize="8" fontFamily="var(--font-space)">2027</text>
          <path d="M70 42 L80 47 L90 42" stroke="rgba(201, 52, 52, 0.6)" strokeWidth="1" />
        </svg>
      );
    case 2:
      // Development: Web browser viewport wireframe
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <rect x="20" y="15" width="120" height="70" rx="4" stroke="rgba(242, 240, 235, 0.25)" strokeWidth="1" fill="#141414" />
          <line x1="20" y1="30" x2="140" y2="30" stroke="rgba(242, 240, 235, 0.15)" strokeWidth="1" />
          <circle cx="28" cy="22.5" r="2" fill="#c93434" />
          <circle cx="35" cy="22.5" r="2" fill="rgba(242, 240, 235, 0.3)" />
          <circle cx="42" cy="22.5" r="2" fill="rgba(242, 240, 235, 0.3)" />
          <rect x="52" y="19" width="45" height="7" rx="2" fill="rgba(242, 240, 235, 0.08)" />
          <rect x="28" y="38" width="24" height="40" rx="2" fill="rgba(242, 240, 235, 0.05)" />
          <rect x="58" y="38" width="74" height="18" rx="2" fill="rgba(242, 240, 235, 0.08)" />
          <line x1="58" y1="64" x2="110" y2="64" stroke="rgba(201, 52, 52, 0.6)" strokeWidth="1.2" />
          <line x1="58" y1="71" x2="95" y2="71" stroke="rgba(242, 240, 235, 0.2)" strokeWidth="1" />
        </svg>
      );
    case 3:
      // Mobile: Android handheld viewport
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <rect x="52" y="12" width="56" height="76" rx="8" stroke="rgba(242, 240, 235, 0.28)" strokeWidth="1.2" fill="#141414" />
          <rect x="58" y="20" width="44" height="60" rx="3" stroke="rgba(242, 240, 235, 0.12)" fill="#181818" />
          <circle cx="80" cy="16" r="1.5" fill="rgba(242, 240, 235, 0.4)" />
          <line x1="72" y1="76" x2="88" y2="76" stroke="rgba(242, 240, 235, 0.5)" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="62" y="25" width="36" height="20" rx="2" fill="rgba(201, 52, 52, 0.18)" stroke="rgba(201, 52, 52, 0.45)" strokeWidth="0.8" />
          <circle cx="70" cy="58" r="4" fill="rgba(242, 240, 235, 0.2)" />
          <line x1="78" y1="56" x2="92" y2="56" stroke="rgba(242, 240, 235, 0.3)" strokeWidth="1" />
          <line x1="78" y1="61" x2="88" y2="61" stroke="rgba(242, 240, 235, 0.15)" strokeWidth="1" />
        </svg>
      );
    case 4:
      // AI: Local AI neural node lattice
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <line x1="35" y1="30" x2="80" y2="50" stroke="rgba(242, 240, 235, 0.18)" strokeWidth="1" />
          <line x1="35" y1="70" x2="80" y2="50" stroke="rgba(242, 240, 235, 0.18)" strokeWidth="1" />
          <line x1="80" y1="50" x2="125" y2="30" stroke="rgba(201, 52, 52, 0.6)" strokeWidth="1.2" />
          <line x1="80" y1="50" x2="125" y2="70" stroke="rgba(242, 240, 235, 0.18)" strokeWidth="1" />
          <line x1="35" y1="30" x2="35" y2="70" stroke="rgba(242, 240, 235, 0.12)" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="125" y1="30" x2="125" y2="70" stroke="rgba(242, 240, 235, 0.12)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="35" cy="30" r="5" fill="#1b1b1b" stroke="rgba(242, 240, 235, 0.4)" strokeWidth="1.2" />
          <circle cx="35" cy="70" r="5" fill="#1b1b1b" stroke="rgba(242, 240, 235, 0.4)" strokeWidth="1.2" />
          <circle cx="80" cy="50" r="7" fill="#c93434" stroke="#f2f0eb" strokeWidth="1.5" />
          <circle cx="125" cy="30" r="5" fill="#1b1b1b" stroke="#c93434" strokeWidth="1.2" />
          <circle cx="125" cy="70" r="5" fill="#1b1b1b" stroke="rgba(242, 240, 235, 0.4)" strokeWidth="1.2" />
          <text x="68" y="22" fill="#77736d" fontSize="7" fontFamily="var(--font-space)" letterSpacing="0.1em">WEIGHTS</text>
          <text x="66" y="84" fill="#c93434" fontSize="7" fontFamily="var(--font-space)" letterSpacing="0.1em">INFERENCE</text>
        </svg>
      );
    case 5:
      // Location: Mangalore compass crosshair
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="80" cy="46" r="32" stroke="rgba(242, 240, 235, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="80" cy="46" r="18" stroke="rgba(242, 240, 235, 0.25)" strokeWidth="1" />
          <circle cx="80" cy="46" r="3" fill="#c93434" />
          <line x1="80" y1="8" x2="80" y2="84" stroke="rgba(242, 240, 235, 0.18)" strokeWidth="1" />
          <line x1="42" y1="46" x2="118" y2="46" stroke="rgba(242, 240, 235, 0.18)" strokeWidth="1" />
          <path d="M80 18 L83 26 L80 24 L77 26 Z" fill="#c93434" />
          <text x="86" y="24" fill="#c93434" fontSize="7" fontFamily="var(--font-space)">N</text>
          <text x="36" y="92" fill="#77736d" fontSize="7" fontFamily="var(--font-space)" letterSpacing="0.08em">12.9141° N, 74.8560° E</text>
        </svg>
      );
    case 6:
      // Philosophy: Build. Break. Learn. Repeat. cycle
      return (
        <svg className="about-motif" viewBox="0 0 160 100" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M45 42 A28 28 0 0 1 115 42" stroke="rgba(242, 240, 235, 0.3)" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M115 58 A28 28 0 0 1 45 58" stroke="rgba(201, 52, 52, 0.65)" strokeWidth="1.5" />
          <path d="M112 40 L118 43 L113 47" fill="none" stroke="rgba(242, 240, 235, 0.5)" strokeWidth="1.2" />
          <path d="M48 60 L42 57 L47 53" fill="none" stroke="#c93434" strokeWidth="1.4" />
          <circle cx="45" cy="50" r="4" fill="#c93434" />
          <circle cx="115" cy="50" r="4" fill="#f2f0eb" />
          <text x="34" y="32" fill="#77736d" fontSize="7" fontFamily="var(--font-space)">BUILD</text>
          <text x="105" y="32" fill="#77736d" fontSize="7" fontFamily="var(--font-space)">BREAK</text>
          <text x="30" y="75" fill="#c93434" fontSize="7" fontFamily="var(--font-space)">REPEAT</text>
          <text x="105" y="75" fill="#f2f0eb" fontSize="7" fontFamily="var(--font-space)">LEARN</text>
        </svg>
      );
    default:
      return null;
  }
}

interface About3DCardProps {
  card: AboutCardData;
  index: number;
  total: number;
  smoothAngle: ReturnType<typeof useSpring>;
  radiusRef: React.RefObject<{ rx: number; rz: number }>;
  isActive: boolean;
  onSelect: () => void;
  hasMovedRef: React.RefObject<boolean>;
}

function About3DCard({
  card,
  index,
  total,
  smoothAngle,
  radiusRef,
  isActive,
  onSelect,
  hasMovedRef,
}: About3DCardProps) {
  const cardBaseAngle = index * (360 / total);

  const transform = useTransform(smoothAngle, (latestAngle) => {
    let diff = (cardBaseAngle - latestAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    const rad = (diff * Math.PI) / 180;
    const cosVal = Math.cos(rad);
    const sinVal = Math.sin(rad);

    const rx = radiusRef.current?.rx ?? 440;
    const rz = radiusRef.current?.rz ?? 180;

    const x = sinVal * rx;
    const z = (cosVal - 1) * rz;
    const y = Math.sin(rad * 2) * 20;
    const rotY = -diff * 0.65;
    const scale = 0.82 + 0.18 * ((1 + cosVal) / 2);

    return `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });

  const opacity = useTransform(smoothAngle, (latestAngle) => {
    let diff = (cardBaseAngle - latestAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const cosVal = Math.cos((diff * Math.PI) / 180);
    return cosVal >= 0 ? 1 : Math.max(0, 1 + cosVal * 2.5);
  });

  const pointerEvents = useTransform(smoothAngle, (latestAngle) => {
    let diff = (cardBaseAngle - latestAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const cosVal = Math.cos((diff * Math.PI) / 180);
    return cosVal > -0.15 ? "auto" : "none";
  });

  const zIndex = useTransform(smoothAngle, (latestAngle) => {
    let diff = (cardBaseAngle - latestAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const cosVal = Math.cos((diff * Math.PI) / 180);
    return Math.round((1 + cosVal) * 50) + 1;
  });

  function handleClick(e: React.MouseEvent) {
    if (hasMovedRef.current) {
      e.preventDefault();
      return;
    }
    onSelect();
  }

  return (
    <motion.article
      className={`about-3d-card ${card.className} ${isActive ? "is-active-card" : ""}`}
      style={{
        transform,
        opacity,
        zIndex,
        pointerEvents,
      }}
      onClick={handleClick}
      tabIndex={0}
      role="group"
      aria-roledescription="card"
      aria-current={isActive ? "true" : undefined}
      aria-label={`${card.label}: ${card.title}`}
    >
      <div className="about-card-top">
        <span className="about-card-tag">
          [{String(index + 1).padStart(2, "0")}{" // "}{card.label.toUpperCase()}]
        </span>
        <span className="about-card-badge">
          <span className="about-card-dot" aria-hidden="true" />
          <span>DEPTH 0{card.depth}</span>
        </span>
      </div>

      <div className="about-card-visual">
        <CardMotif index={index} />
      </div>

      <div className="about-card-body">
        <h3>{card.title}</h3>
      </div>

      <div className="about-card-foot">
        <span className="about-card-detail">{card.detail}</span>
        <div className="about-card-status">
          <span>{isActive ? "● ACTIVE ORBIT" : "CLICK TO FOCUS"}</span>
          <span className="about-card-coord">0{index + 1}/0{total}</span>
        </div>
      </div>
    </motion.article>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const total = aboutCards.length;
  const step = 360 / total;

  const angle = useMotionValue(0);
  const smoothAngle = useSpring(angle, {
    stiffness: 150,
    damping: 24,
    mass: 0.65,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const lastAdvanceTimeRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);
  const isHoveringCardsRef = useRef(false);

  const radiusRef = useRef({ rx: 460, rz: 190 });

  const isDraggingRef = useRef(false);
  const pointerDownX = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasMovedRef = useRef(false);

  const reducedMotion = useReducedMotion();
  const rawPointerX = useMotionValue(0);
  const pointerSpringX = useSpring(rawPointerX, { stiffness: 60, damping: 20 });
  const backdropParallaxX = useTransform(pointerSpringX, [-1, 1], [30, -30]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backdropScrollX = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const backdropCombinedX = useTransform(
    [backdropParallaxX, backdropScrollX],
    ([pX, sX]) => (pX as number) + (sX as number)
  );

  // Listen to tab visibility to pause rotation in background tabs
  useEffect(() => {
    function handleVisibility() {
      const visible = !document.hidden;
      setIsTabVisible(visible);
      if (visible) {
        lastAdvanceTimeRef.current = Date.now();
      }
    }
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Update responsive 3D orbit radii
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      let newRadius = { rx: 460, rz: 190 };
      if (w > 1200) {
        newRadius = { rx: 460, rz: 190 };
      } else if (w > 820) {
        newRadius = { rx: 370, rz: 150 };
      } else if (w > 560) {
        newRadius = { rx: 270, rz: 110 };
      } else {
        newRadius = { rx: Math.max(120, Math.round(w * 0.36)), rz: 60 };
      }
      radiusRef.current = newRadius;
      angle.set(angle.get());
    }

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [angle]);

  // Update active index based on smooth spring rotation
  useMotionValueEvent(smoothAngle, "change", (latestAngle) => {
    const normalized = ((latestAngle % 360) + 360) % 360;
    const nextActive = Math.round(normalized / step) % total;
    if (nextActive !== activeIndex) {
      setActiveIndex(nextActive);
    }
  });

  // Automatic carousel rotation heartbeat (every 3s per card)
  useEffect(() => {
    if (reducedMotion || userPaused || !isTabVisible) return;

    lastAdvanceTimeRef.current = Date.now();
    const AUTOPLAY_INTERVAL = 3000;
    const IDLE_COOLDOWN = 3000;

    const timer = setInterval(() => {
      if (isDraggingRef.current) {
        lastInteractionTimeRef.current = Date.now();
        return;
      }

      if (isHoveringCardsRef.current) {
        lastInteractionTimeRef.current = Date.now();
        return;
      }

      const now = Date.now();
      if (now - lastInteractionTimeRef.current < IDLE_COOLDOWN) {
        return;
      }

      if (now - lastAdvanceTimeRef.current >= AUTOPLAY_INTERVAL) {
        lastAdvanceTimeRef.current = now;
        const currentStep = Math.round(angle.get() / step);
        angle.set((currentStep + 1) * step);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [reducedMotion, userPaused, isTabVisible, angle, step]);

  const rotateToIndex = useCallback(
    (targetIndex: number) => {
      lastInteractionTimeRef.current = Date.now();
      lastAdvanceTimeRef.current = Date.now();
      const currentAngle = angle.get();
      const targetMod = targetIndex * step;
      let currentMod = currentAngle % 360;
      if (currentMod < 0) currentMod += 360;
      let diff = targetMod - currentMod;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      angle.set(currentAngle + diff);
    },
    [angle, step]
  );

  const handlePrev = useCallback(() => {
    lastInteractionTimeRef.current = Date.now();
    lastAdvanceTimeRef.current = Date.now();
    const currentStep = Math.round(angle.get() / step);
    angle.set((currentStep - 1) * step);
  }, [angle, step]);

  const handleNext = useCallback(() => {
    lastInteractionTimeRef.current = Date.now();
    lastAdvanceTimeRef.current = Date.now();
    const currentStep = Math.round(angle.get() / step);
    angle.set((currentStep + 1) * step);
  }, [angle, step]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion) return;
    lastInteractionTimeRef.current = Date.now();
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    pointerDownX.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current || reducedMotion) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    lastTimeRef.current = now;

    const totalDx = e.clientX - pointerDownX.current;
    if (Math.abs(totalDx) > 5) {
      hasMovedRef.current = true;
    }

    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = deltaX / dt;

    const degPerPx = typeof window !== "undefined" && window.innerWidth < 600 ? 0.28 : 0.2;
    angle.set(angle.get() - deltaX * degPerPx);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current || reducedMotion) return;
    lastInteractionTimeRef.current = Date.now();
    lastAdvanceTimeRef.current = Date.now();
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    if (hasMovedRef.current) {
      const momentum = velocityRef.current * 110;
      const projectedAngle = angle.get() - momentum;
      const targetIndex = Math.round(projectedAngle / step);
      angle.set(targetIndex * step);
    }
  }

  function handleSectionPointer(e: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || e.pointerType !== "mouse") return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
    rawPointerX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    lastInteractionTimeRef.current = Date.now();
    lastAdvanceTimeRef.current = Date.now();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  }

  const liveRegionId = useId();

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      onPointerMove={handleSectionPointer}
      onPointerLeave={() => rawPointerX.set(0)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="About section: My world"
    >
      {/* Header with kicker and introduction statement */}
      <div className="about-header">
        <div className="section-kicker light">
          <span>02</span>
          <span>About / My world</span>
        </div>
        <FadeIn className="about-intro">
          <p>{profile.introduction}</p>
        </FadeIn>
      </div>

      {/* 3D rotating stage or accessible static rail */}
      <div className="about-stage">
        <motion.p
          className="about-backdrop"
          aria-hidden="true"
          style={reducedMotion ? undefined : { x: backdropCombinedX }}
        >
          MY WORLD.
        </motion.p>

        {reducedMotion ? (
          <div className="about-reduced-rail" role="region" aria-label="About cards">
            {aboutCards.map((card, index) => (
              <article key={card.label} className={`about-card ${card.className} is-reduced-card`}>
                <div className="about-card-top">
                  <span className="about-card-tag">[{String(index + 1).padStart(2, "0")}{" // "}{card.label.toUpperCase()}]</span>
                  <span className="about-card-badge">DEPTH 0{card.depth}</span>
                </div>
                <div className="about-card-visual">
                  <CardMotif index={index} />
                </div>
                <div className="about-card-body">
                  <h3>{card.title}</h3>
                </div>
                <div className="about-card-foot">
                  <span className="about-card-detail">{card.detail}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            ref={viewportRef}
            className="about-carousel-viewport"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerEnter={() => {
              isHoveringCardsRef.current = true;
            }}
            onPointerLeave={() => {
              isHoveringCardsRef.current = false;
              lastInteractionTimeRef.current = Date.now();
              lastAdvanceTimeRef.current = Date.now();
            }}
            role="region"
            aria-label="3D Rotating About cards carousel. Use arrow keys or drag horizontally to explore."
            aria-describedby={liveRegionId}
          >
            {aboutCards.map((card, index) => (
              <About3DCard
                key={card.label}
                card={card}
                index={index}
                total={total}
                smoothAngle={smoothAngle}
                radiusRef={radiusRef}
                isActive={index === activeIndex}
                onSelect={() => rotateToIndex(index)}
                hasMovedRef={hasMovedRef}
              />
            ))}
          </div>
        )}
      </div>

      {/* Screen-reader announcement of active card */}
      <span id={liveRegionId} className="sr-only" aria-live="polite">
        Current card {activeIndex + 1} of {total}: {aboutCards[activeIndex]?.label} - {aboutCards[activeIndex]?.title}. {aboutCards[activeIndex]?.detail}
      </span>

      {/* Navigation and HUD controls */}
      <div className="about-controls">
        <div className="about-hud">
          <span className="about-hud-counter">
            <span className="about-hud-current">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="about-hud-divider">/</span>
            <span className="about-hud-total">{String(total).padStart(2, "0")}</span>
          </span>
          <span className="about-hud-title">{aboutCards[activeIndex]?.title}</span>
          {!reducedMotion && (
            <button
              type="button"
              className={`about-playback-btn ${userPaused ? "is-paused" : "is-active"}`}
              onClick={() => {
                setUserPaused((prev) => {
                  const next = !prev;
                  if (!next) {
                    lastAdvanceTimeRef.current = Date.now();
                  }
                  return next;
                });
              }}
              aria-label={userPaused ? "Resume automatic card rotation" : "Pause automatic card rotation"}
              aria-pressed={!userPaused}
              title={userPaused ? "Resume automatic rotation" : "Pause automatic rotation"}
            >
              <span className="about-playback-icon" aria-hidden="true">
                {userPaused ? "▶" : "⏸"}
              </span>
              <span className="about-playback-label">
                {userPaused ? "PAUSED" : "AUTO"}
              </span>
            </button>
          )}
        </div>

        {/* Segmented indicators for direct jump */}
        <div className="about-dots" role="tablist" aria-label="Select card by index">
          {aboutCards.map((card, idx) => (
            <button
              key={card.label}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Show ${card.title} (${card.label})`}
              className={`about-dot ${idx === activeIndex ? "is-active" : ""}`}
              onClick={() => rotateToIndex(idx)}
            >
              <span className="about-dot-bar" />
              <span className="about-dot-num">{String(idx + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div className="about-nav-buttons">
          <button
            type="button"
            className="about-nav-btn"
            onClick={handlePrev}
            aria-label="Previous card in 3D orbit"
          >
            <span aria-hidden="true">←</span> PREV
          </button>
          <button
            type="button"
            className="about-nav-btn"
            onClick={handleNext}
            aria-label="Next card in 3D orbit"
          >
            NEXT <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
