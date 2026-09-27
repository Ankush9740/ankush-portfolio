"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type MotionValue, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { type CSSProperties, useRef } from "react";
import { projects, type Project } from "@/data/projects";
import { FadeIn } from "@/components/motion/fade-in";

function ProjectMedia({ project }: { project: Project }) {
  return (
    <div className="project-media-grid">
      {project.media.map((media, index) => (
        <div key={media.label} className={`project-media-slot slot-${index + 1}`}>
          {media.src ? (
            <Image src={media.src} alt={media.alt} fill sizes={index === 0 ? "70vw" : "30vw"} />
          ) : (
            <>
              <span className="placeholder-mark">{project.number}.{String(index + 1).padStart(2, "0")}</span>
              <span>{media.label}</span>
              <small>Screenshot placeholder</small>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ project, index, progress }: { project: Project; index: number; progress: MotionValue<number> }) {
  const reducedMotion = useReducedMotion();
  const isBaseSheet = index === 0;
  const incomingY = useTransform(progress, [0, 1], ["104%", "0%"]);
  const incomingTransform = useMotionTemplate`translate3d(0, ${incomingY}, 0)`;

  return (
      <motion.article
        className={`project-card project-slide project-${project.tone}`}
        data-project-index={index}
        style={reducedMotion ? undefined : isBaseSheet ? { zIndex: 1 } : { transform: incomingTransform, zIndex: index + 1 }}
      >
        <div className="project-card-head">
          <div className="project-index-block"><p className="project-number">{project.number}</p><span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span></div>
          <div>
            <p className="project-category">{project.category}</p>
            <h3>{project.title}</h3>
          </div>
          <div className="project-links">
            {project.links.map((link) => link.href ? (
              <Link key={link.label} href={link.href} data-cursor="VIEW">{link.label} <ArrowUpRight size={14} /></Link>
            ) : (
              <span key={link.label} title={`${link.label} URL has not been added`}>{link.label} · add link</span>
            ))}
          </div>
        </div>
        <div className="project-summary">
          <p>{project.description}</p>
          <p>{project.summary}</p>
        </div>
        <ProjectMedia project={project} />
        <ul className="tech-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </motion.article>
  );
}

export function ProjectsSection() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });
  const showcaseStyle = { "--project-scroll-height": `${100 + Math.max(1, projects.length - 1) * 165}svh` } as CSSProperties;

  return (
    <section id="work" className="projects-section">
      <div className="section-kicker"><span>03</span><span>Selected work</span></div>
      <FadeIn className="projects-heading">
        <p className="label">Two flagship builds</p>
        <h2>SELECTED<br />WORK</h2>
      </FadeIn>
      <div ref={showcaseRef} className={`project-showcase${reducedMotion ? " reduced-motion" : ""}`} style={showcaseStyle}>
        <div className="project-stage">
          {projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} progress={scrollYProgress} />)}
          {!reducedMotion && (
            <div className="project-stage-hud" aria-hidden="true">
              <span>Scroll to exchange</span>
              <span className="project-stage-track"><motion.span style={{ scaleX: scrollYProgress }} /></span>
              <span>{String(projects.length).padStart(2, "0")} projects</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
