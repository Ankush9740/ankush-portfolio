import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

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
        <div className="case-intro"><p>{project.description}</p><p>{project.summary}</p></div>
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
      <section className="case-media" aria-label="Project screenshot placeholders">
        {project.media.map((media, index) => <div key={media.label}><span>{project.number}.{index + 1}</span><strong>{media.label}</strong><small>Real screenshot to be added</small></div>)}
      </section>
      <section className="case-links">
        {project.links.map((link) => link.href && !link.href.startsWith("/projects") ? <a key={link.label} href={link.href}>{link.label}<ArrowUpRight /></a> : link.href ? null : <span key={link.label}>{link.label} URL not added</span>)}
      </section>
    </main>
  );
}
