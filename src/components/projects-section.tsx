"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type MotionValue, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ScanLine } from "lucide-react";
import { type CSSProperties, useRef } from "react";
import { projects, type Project } from "@/data/projects";
import { FadeIn } from "@/components/motion/fade-in";

function QuizloomIdentityMedia() {
  return (
    <div
      className="project-media-grid project-media-grid-quizloom quizloom-identity"
      role="img"
      aria-label="Quizloom room code connecting two players to a live answer session"
    >
      <span className="quizloom-connection quizloom-connection-room" aria-hidden="true" />
      <span className="quizloom-connection quizloom-connection-player-one" aria-hidden="true" />
      <span className="quizloom-connection quizloom-connection-player-two" aria-hidden="true" />
      <span className="quizloom-connection quizloom-connection-answers" aria-hidden="true" />

      <span className="quizloom-node quizloom-room-code">
        <small>Room code</small>
        <strong>482913</strong>
      </span>
      <span className="quizloom-node quizloom-player quizloom-player-one"><i />Player 01</span>
      <span className="quizloom-mark" aria-hidden="true">Q</span>
      <span className="quizloom-node quizloom-player quizloom-player-two"><i />Player 02</span>
      <span className="quizloom-node quizloom-answers">
        <small>Answer</small>
        <strong><i>A</i><i>B</i><i>C</i><i>D</i></strong>
      </span>
    </div>
  );
}

function AutoLensIdentityMedia() {
  return (
    <div
      className="project-media-grid project-media-grid-autolens autolens-identity"
      role="img"
      aria-label="AutoLens camera image passing through AI recognition into vehicle details"
    >
      <span className="autolens-connection autolens-connection-camera" aria-hidden="true" />
      <span className="autolens-connection autolens-connection-vehicle" aria-hidden="true" />
      <span className="autolens-connection autolens-connection-ai" aria-hidden="true" />
      <span className="autolens-connection autolens-connection-result" aria-hidden="true" />

      <span className="autolens-node autolens-camera-node">
        <small>Input</small>
        <strong>Camera</strong>
      </span>
      <span className="autolens-node autolens-ai-node">
        <small>Engine</small>
        <strong>AI / Active</strong>
      </span>
      <span className="autolens-scanner" aria-hidden="true">
        <ScanLine className="autolens-scan-icon" strokeWidth={1.25} />
        <i className="autolens-scan-beam" />
      </span>
      <span className="autolens-node autolens-vehicle-node">
        <small>Detected</small>
        <strong>Vehicle</strong>
      </span>
      <span className="autolens-node autolens-result-node">
        <span><small>Make</small><strong>BMW</strong></span>
        <span><small>Model</small><strong>iX</strong></span>
        <span><small>Colour</small><strong>Blue</strong></span>
      </span>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.slug === "quizloom") return <QuizloomIdentityMedia />;
  if (project.slug === "autolens") return <AutoLensIdentityMedia />;

  return (
    <div className={`project-media-grid project-media-grid-${project.slug}`}>
      {project.media.map((media, index) => (
        <div key={media.label} className={`project-media-slot slot-${index + 1}${media.src ? " has-image" : ""}`}>
          {media.src ? (
            <Image
              className="project-media-image"
              src={media.src}
              alt={media.alt}
              fill
              sizes={project.slug === "quizloom" && index === 0 ? "(max-width: 560px) 82vw, 92vw" : "(max-width: 560px) 82vw, 46vw"}
            />
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
            {project.links.map((link) => {
              if (!link.href) return null;
              const content = <>{link.label} <ArrowUpRight size={14} /></>;

              return link.href.startsWith("http") ? (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" data-cursor="VIEW">{content}</a>
              ) : (
                <Link key={link.label} href={link.href} data-cursor="VIEW">{content}</Link>
              );
            })}
          </div>
        </div>
        <div className="project-summary">
          <p>{project.description}</p>
          <p>{project.summary}</p>
        </div>
        <div className="project-visual-area">
          <ProjectMedia project={project} />
        </div>
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
        <h2>SELECTED WORK</h2>
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
