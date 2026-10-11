"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { type CSSProperties, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/motion/fade-in";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const activeProjectIndexRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });
  const projectCount = projects.length;
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const showcaseStyle = { "--project-scroll-height": `${100 + Math.max(1, projectCount - 1) * 165}svh` } as CSSProperties;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      projectCount - 1,
      Math.max(0, Math.round(latest * Math.max(0, projectCount - 1))),
    );

    if (activeProjectIndexRef.current === nextIndex) return;
    activeProjectIndexRef.current = nextIndex;
    setActiveProjectIndex(nextIndex);
  });

  const activeProject = projects[activeProjectIndex] ?? projects[0];
  const activePosition = String(activeProjectIndex + 1).padStart(2, "0");
  const totalPositions = String(projectCount).padStart(2, "0");

  return (
    <section id="work" className="projects-section">
      <div className="section-kicker"><span>03</span><span>Selected work</span></div>
      <FadeIn className="projects-heading">
        <p className="label">{projectCount} flagship builds</p>
        <h2>SELECTED WORK</h2>
      </FadeIn>
      <div ref={showcaseRef} className={`project-showcase${reducedMotion ? " reduced-motion" : ""}`} style={showcaseStyle}>
        <div className="project-stage">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              totalProjects={projectCount}
              progress={scrollYProgress}
            />
          ))}
          {!reducedMotion && (
            <div
              className="project-stage-hud"
              role="status"
              aria-live="polite"
              aria-label={`Selected project ${activePosition} of ${totalPositions}: ${activeProject.title}`}
            >
              <span>{activePosition} / {totalPositions} — {activeProject.title}</span>
              <span className="project-stage-track"><motion.span style={{ scaleX: scrollYProgress }} /></span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
