export type ProjectLink = {
  label: "Live demo" | "GitHub" | "Case study" | "Demo";
  href: string | null;
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  summary: string;
  technologies: string[];
  engineering: string[];
  links: ProjectLink[];
  media: { label: string; src: string | null; alt: string }[];
  tone: "paper" | "charcoal";
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "quizloom",
    title: "Quizloom",
    category: "Web / Real-time",
    description:
      "A real-time multiplayer quiz platform designed for interactive quiz sessions and events.",
    summary:
      "Host-created rooms, synchronized question timing, and deterministic score-first rankings make fast multiplayer sessions feel dependable for hosts and players.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Realtime", "Vercel"],
    engineering: [
      "Reusable quiz sets and room-code joining",
      "Server-authoritative answer deadlines",
      "Synchronized answer and reveal flow",
      "Live host counters, standings, and final podium",
      "Cumulative response-time tie breaking",
      "Concurrency and multiplayer performance improvements",
    ],
    links: [
      { label: "Live demo", href: null },
      { label: "GitHub", href: null },
      { label: "Case study", href: "/projects/quizloom" },
    ],
    media: [
      { label: "Lobby / room screen", src: null, alt: "Quizloom lobby screenshot" },
      { label: "Live quiz screen", src: null, alt: "Quizloom live quiz screenshot" },
      { label: "Host controls", src: null, alt: "Quizloom host controls screenshot" },
    ],
    tone: "paper",
  },
  {
    number: "02",
    slug: "autolens",
    title: "AutoLens",
    category: "Android / AI",
    description:
      "An AI-assisted Android car recognition application built as a practical mobile development and local-AI experiment.",
    summary:
      "A Compose-based mobile flow connects photo selection and camera capture to a small Node.js service for careful experimentation with local vision and language models.",
    technologies: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM", "Coroutines", "Node.js", "Ollama"],
    engineering: [
      "Photo Picker and camera capture flows",
      "MVVM state management with coroutines",
      "Node.js bridge for local inference",
      "Local vision and LLM experimentation",
      "Clear separation between mobile UI and AI service",
    ],
    links: [
      { label: "Demo", href: null },
      { label: "GitHub", href: null },
      { label: "Case study", href: "/projects/autolens" },
    ],
    media: [
      { label: "Capture flow", src: null, alt: "AutoLens capture screen screenshot" },
      { label: "Recognition result", src: null, alt: "AutoLens recognition result screenshot" },
      { label: "Mobile interface", src: null, alt: "AutoLens mobile interface screenshot" },
    ],
    tone: "charcoal",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
