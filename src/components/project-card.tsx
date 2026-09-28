"use client";

import Link from "next/link";
import { motion, type MotionValue, useMotionTemplate, useReducedMotion, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { getProjectLinks, type Project } from "@/data/projects";
import { ProjectVisual } from "@/components/project-visuals";

type ProjectCardProps = {
  project: Project;
  index: number;
  totalProjects: number;
  progress: MotionValue<number>;
};

export function ProjectCard({ project, index, totalProjects, progress }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const isBaseSheet = index === 0;
  const transitionCount = Math.max(1, totalProjects - 1);
  const transitionStart = isBaseSheet ? 0 : (index - 1) / transitionCount;
  const transitionEnd = isBaseSheet ? 1 : index / transitionCount;
  const incomingY = useTransform(progress, [transitionStart, transitionEnd], ["104%", "0%"]);
  const incomingTransform = useMotionTemplate`translate3d(0, ${incomingY}, 0)`;
  const projectLinks = getProjectLinks(project);

  return (
    <motion.article
      className={`project-card project-slide project-${project.tone}`}
      data-project-index={index}
      style={reducedMotion ? undefined : isBaseSheet ? { zIndex: 1 } : { transform: incomingTransform, zIndex: index + 1 }}
    >
      <div className="project-card-head">
        <div className="project-index-block"><p className="project-number">{project.number}</p><span>{String(index + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}</span></div>
        <div>
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <div className="project-links">
          {projectLinks.map((link) => {
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
        <p>{project.secondaryDescription}</p>
      </div>
      <div className="project-visual-area">
        <ProjectVisual visual={project.visual} />
      </div>
      <ul className="tech-list" aria-label={`${project.title} technologies`}>
        {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>
    </motion.article>
  );
}
