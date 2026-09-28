export type ProjectVisualId = "quizloom" | "autolens";

export type ProjectLink = {
  label: "Live demo" | "GitHub" | "Case study";
  href: string;
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  secondaryDescription: string;
  technologies: string[];
  github: string;
  liveDemo?: string;
  caseStudy: string;
  visual: ProjectVisualId;
  engineering: string[];
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
    secondaryDescription:
      "Host-created rooms, synchronized question timing, and deterministic score-first rankings make fast multiplayer sessions feel dependable for hosts and players.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Realtime", "Vercel"],
    github: "https://github.com/Ankush9740/quizloom",
    liveDemo: "https://quizloom-sigma.vercel.app/",
    caseStudy: "/projects/quizloom",
    visual: "quizloom",
    engineering: [
      "Reusable quiz sets and room-code joining",
      "Server-authoritative answer deadlines",
      "Synchronized answer and reveal flow",
      "Live host counters, standings, and final podium",
      "Cumulative response-time tie breaking",
      "Concurrency and multiplayer performance improvements",
    ],
    media: [
      { label: "Homepage / Join", src: "/projects/Quizloom/home.png", alt: "Quizloom homepage with player room-code entry" },
      { label: "Player Quiz", src: "/projects/Quizloom/player-quiz.png", alt: "Quizloom player answer-selection screen" },
      { label: "Host / Result", src: "/projects/Quizloom/host-result.png", alt: "Quizloom host answer-reveal and leaderboard screen" },
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
    secondaryDescription:
      "A Compose-based mobile flow connects photo selection and camera capture to a small Node.js service for careful experimentation with local vision and language models.",
    technologies: ["Kotlin", "Jetpack Compose", "Material 3", "MVVM", "Coroutines", "Node.js", "Ollama"],
    github: "https://github.com/Ankush9740/AutoLens",
    caseStudy: "/projects/autolens",
    visual: "autolens",
    engineering: [
      "Photo Picker and camera capture flows",
      "MVVM state management with coroutines",
      "Node.js bridge for local inference",
      "Local vision and LLM experimentation",
      "Clear separation between mobile UI and AI service",
    ],
    media: [
      { label: "Home / Capture", src: "/projects/AutoLens/home.jpeg", alt: "AutoLens home screen with camera and gallery capture options" },
      { label: "AI Result", src: "/projects/AutoLens/recognition.jpeg", alt: "AutoLens recognition result identifying a BMW iX" },
    ],
    tone: "charcoal",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectLinks(project: Project): ProjectLink[] {
  return [
    ...(project.liveDemo ? [{ label: "Live demo" as const, href: project.liveDemo }] : []),
    { label: "GitHub", href: project.github },
    { label: "Case study", href: project.caseStudy },
  ];
}
