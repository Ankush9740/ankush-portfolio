import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getProject, getProjectLinks, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.title} — Ankush`, description: project.description } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const projectLinks = getProjectLinks(project);

  return (
    <main className={`case-study case-study-${project.tone}`}>
      <header className="case-header">
        <Link href="/#work"><ArrowLeft size={16} /> Back to selected work</Link>
        <span>ANKUSH.</span>
        <span>{project.number} / {projects.length.toString().padStart(2, "0")}</span>
      </header>
      <section className="case-hero">
        <p>{project.category}</p>
        <h1>{project.title}</h1>
        <div className="case-intro"><p>{project.description}</p><p>{project.secondaryDescription}</p></div>
      </section>
      <section className="case-content">
        <div>
          <p className="label">Engineering focus</p>
          <ul>{project.engineering.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <p className="label">Technology</p>
          <ul>{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>
      {project.caseSections?.length ? (
        <section className="case-narrative" aria-label={`${project.title} case study details`}>
          {project.caseSections.map((section) => (
            <article key={section.label}>
              <p className="label">{section.label}</p>
              <h2>{section.title}</h2>
              <div className="case-narrative-copy">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.items?.length ? (
                <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : null}
            </article>
          ))}
        </section>
      ) : null}
      <section className={`case-media case-media-${project.slug}`} aria-label={`${project.title} screenshots`}>
        {project.media.map((media, index) => (
          <div key={media.label} className={`case-media-item slot-${index + 1}${media.src ? " has-image" : ""}${media.caption ? " has-caption" : ""}`}>
            {media.src ? (
              media.caption ? (
                <>
                  <span className="case-media-image-frame">
                    <Image
                      className="case-media-image"
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(max-width: 820px) 100vw, 50vw"
                    />
                  </span>
                  <span className="case-media-caption"><strong>{media.label}</strong><small>{media.caption}</small></span>
                </>
              ) : (
                <Image
                  className="case-media-image"
                  src={media.src}
                  alt={media.alt}
                  fill
                  sizes={project.slug === "quizloom" && index === 0 ? "100vw" : "(max-width: 820px) 100vw, 50vw"}
                />
              )
            ) : (
              <><span>{project.number}.{index + 1}</span><strong>{media.label}</strong><small>Real screenshot to be added</small></>
            )}
          </div>
        ))}
      </section>
      <section className="case-links">
        {projectLinks.map((link) => link.href.startsWith("http") ? (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRight /></a>
        ) : null)}
      </section>
    </main>
  );
}
