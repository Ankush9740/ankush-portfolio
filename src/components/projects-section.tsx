"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { type CSSProperties, useRef } from "react";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/motion/fade-in";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });
  const projectCount = projects.length;
  const showcaseStyle = { "--project-scroll-height": `${100 + Math.max(1, projectCount - 1) * 165}svh` } as CSSProperties;

  return (
    <section id="work" className="projects-section">
      <div className="section-kicker"><span>03</span><span>Selected work</span></div>
      <FadeIn className="projects-heading">
        <p className="label">Three flagship builds</p>
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
            <div className="project-stage-hud" aria-hidden="true">
              <span>Scroll to exchange</span>
              <span className="project-stage-track"><motion.span style={{ scaleX: scrollYProgress }} /></span>
              <span>{String(projectCount).padStart(2, "0")} projects</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
