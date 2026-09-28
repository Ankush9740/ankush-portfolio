"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { recognitionItems, type RecognitionItem } from "@/data/recognition";
import { FadeIn } from "@/components/motion/fade-in";

const poses = [
  { x: "-92%", y: "7%", rotate: -10 },
  { x: "0%", y: "-12%", rotate: 2 },
  { x: "92%", y: "8%", rotate: 10 },
];

function RecognitionCard({ item, index, activeIndex, isInView, onOpen, onHover }: { item: RecognitionItem; index: number; activeIndex: number | null; isInView: boolean; onOpen: () => void; onHover: (index: number | null) => void }) {
  const reducedMotion = useReducedMotion();
  const pose = poses[index % poses.length];
  const hovered = activeIndex === index;
  const siblingShift = activeIndex === null || hovered ? 0 : index < activeIndex ? -64 : 64;
  const activePose = reducedMotion || !isInView
    ? { x: (index - 1) * 16, y: index * 7, rotate: (index - 1) * -5, opacity: 1, scale: 0.96, boxShadow: "0 1.4rem 3rem rgba(13, 13, 13, 0.14)" }
    : { x: `calc(${pose.x} + ${siblingShift}px)`, y: hovered ? "-17%" : pose.y, rotate: hovered ? 0 : pose.rotate, opacity: 1, scale: hovered ? 1.075 : 1, boxShadow: hovered ? "0 3.5rem 7rem rgba(13, 13, 13, 0.3)" : "0 2rem 4rem rgba(13, 13, 13, 0.18)" };
  return (
    <motion.button
      type="button"
      className="recognition-card"
      onClick={onOpen}
      onPointerEnter={() => onHover(index)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
      data-cursor="OPEN"
      aria-label={`Open ${item.title}`}
      initial={false}
      animate={activePose}
      transition={{ type: "spring", stiffness: hovered ? 170 : 82, damping: hovered ? 20 : 17, mass: 0.86, delay: isInView && activeIndex === null ? index * 0.08 : 0 }}
      style={{ zIndex: hovered ? 10 : index + 1 }}
    >
      <div className="recognition-card-top"><span>{item.type}</span><span>{item.date}</span></div>
      <h3>{item.shortTitle}</h3>
      <div className="recognition-image">
        <Image src={item.image} alt={`${item.title} certificate preview`} fill sizes="(max-width: 820px) 78vw, 24vw" />
      </div>
      <div className="recognition-card-bottom"><span>{item.institutionShort}</span><span>View ↗</span></div>
    </motion.button>
  );
}

function RecognitionDialog({ item, onClose }: { item: RecognitionItem; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute("disabled"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div className="recognition-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div ref={dialogRef} className="recognition-dialog" role="dialog" aria-modal="true" aria-labelledby="recognition-dialog-title" initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.42 }}>
        <button ref={closeRef} type="button" className="dialog-close" onClick={onClose} aria-label="Close recognition viewer"><X /></button>
        <div className="dialog-visual">
          <Image src={item.image} alt={`${item.title} certificate`} fill sizes="(max-width: 820px) 94vw, 58vw" priority />
        </div>
        <div className="dialog-copy">
          <p className="label">Achievement record</p>
          <h3 id="recognition-dialog-title">{item.title}</h3>
          <dl>
            <div><dt>Achievement</dt><dd>{item.achievement}</dd></div>
            <div><dt>Category</dt><dd>{item.category}</dd></div>
            <div><dt>Institution</dt><dd>{item.institution}</dd></div>
            <div><dt>Date</dt><dd>{item.date}</dd></div>
          </dl>
          <p>{item.event}</p>
          {item.credentialUrl && <a href={item.credentialUrl} target="_blank" rel="noreferrer">View credential <ExternalLink size={15} /></a>}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function RecognitionSection() {
  const [selected, setSelected] = useState<RecognitionItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { once: true, amount: 0.32 });

  return (
    <section id="certificates" className="recognition-section">
      <div className="section-kicker"><span>06</span><span>Selected achievements</span></div>
      <FadeIn className="recognition-heading">
        <p className="label">Selected achievements</p>
        <h2>CERTIFICATE<br />COLLECTION</h2>
        <p>A small archive of competition wins and work recognized beyond the classroom.</p>
      </FadeIn>
      <div ref={stageRef} className="recognition-stage">
        {recognitionItems.map((item, index) => <RecognitionCard key={item.id} item={item} index={index} activeIndex={activeIndex} isInView={isInView} onHover={setActiveIndex} onOpen={() => setSelected(item)} />)}
      </div>
      <AnimatePresence>{selected && <RecognitionDialog item={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  );
}
