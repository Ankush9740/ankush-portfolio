import type { ProjectVisualId } from "@/components/project-visuals";

export type ProjectLink = {
  label: "Live demo" | "Download for Windows" | "GitHub" | "View source" | "Case study";
  href: string;
};

export type ProjectCaseSection = {
  label: string;
  title: string;
  paragraphs: string[];
  items?: string[];
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
  githubLabel?: "GitHub" | "View source";
  liveDemo?: string;
  download?: string;
  caseStudy: string;
  visual: ProjectVisualId;
  engineering: string[];
  media: { label: string; src: string | null; alt: string; caption?: string }[];
  caseSections?: ProjectCaseSection[];
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
  {
    number: "03",
    slug: "api-sentinel",
    title: "API Sentinel",
    category: "Web / API tooling",
    description:
      "A secure developer workspace for testing, inspecting, and validating REST APIs.",
    secondaryDescription:
      "Authenticated collections, server-side execution, response inspection, assertions, and history turn repeatable API checks into one focused workflow.",
    technologies: ["Next.js", "React", "TypeScript", "Auth.js", "Prisma", "PostgreSQL / Neon", "Vercel"],
    github: "https://github.com/Ankush9740/api-sentinel",
    liveDemo: "https://api-sentinel-smoky.vercel.app",
    caseStudy: "/projects/api-sentinel",
    visual: "apiSentinel",
    engineering: [
      "Server-side REST request execution and normalized responses",
      "URL, DNS/IP, redirect, timeout, and response-size safeguards",
      "OAuth-backed collections and persistent saved requests",
      "Reusable assertions with clear pass/fail diagnostics",
      "Bounded execution history and encrypted sensitive headers",
      "Per-user request-rate and concurrency guards",
    ],
    media: [
      {
        label: "Workspace",
        src: "/projects/API Sentinel/api-sentinel-workspace.png",
        alt: "API Sentinel workspace showing a GET request and successful JSON response",
        caption: "A focused request composer and response inspector showing a successful server-side API execution.",
      },
      {
        label: "Assertions",
        src: "/projects/API Sentinel/api-sentinel-assertions.png",
        alt: "API Sentinel assertion builder with a passing status-code test",
        caption: "Reusable response assertions execute alongside requests and surface pass or fail results directly in the workspace.",
      },
      {
        label: "Execution history",
        src: "/projects/API Sentinel/api-sentinel-history.png",
        alt: "API Sentinel execution history for previously run API requests",
        caption: "Saved executions retain status, duration, assertion results, and bounded response snapshots for later inspection.",
      },
      {
        label: "Collections",
        src: "/projects/API Sentinel/api-sentinel-collections.png",
        alt: "API Sentinel collections organizing saved endpoints and request configurations",
        caption: "Persistent collections organize reusable API endpoints and request configurations.",
      },
    ],
    caseSections: [
      {
        label: "Overview",
        title: "One focused API workspace.",
        paragraphs: [
          "API Sentinel is a full-stack REST API client for creating, executing, inspecting, validating, saving, and reviewing requests from one focused interface.",
          "It addresses the work around an HTTP call as well as the call itself: organization, response inspection, reusable tests, execution history, authentication, and protected server-side outbound requests.",
        ],
      },
      {
        label: "Core capabilities",
        title: "From request composition to review.",
        paragraphs: [
          "The workspace keeps repeatable API testing close together without turning the interface into a generic terminal.",
        ],
        items: [
          "GET, POST, PUT, PATCH, and DELETE request composition",
          "Query parameters, request headers, and JSON bodies",
          "GitHub and optional Google OAuth-backed private workspaces",
          "Collections, saved endpoints, and persistent requests",
          "Response body, headers, status, duration, and size inspection",
          "Server-side assertions and bounded execution history",
        ],
      },
      {
        label: "Engineering / architecture",
        title: "Server-side by design.",
        paragraphs: [
          "Request Composer → execution endpoint → input validation → URL normalization → DNS/IP security validation → protected outbound request → bounded response processing → normalized result → assertions and history persistence.",
          "The implementation uses the Next.js App Router, React, TypeScript, Auth.js, Prisma, Neon PostgreSQL, and Vercel.",
        ],
      },
      {
        label: "Security",
        title: "Guardrails around outbound work.",
        paragraphs: [
          "Targets are checked before execution and again across redirects. Sensitive saved headers use authenticated encryption and are decrypted only for the outbound request.",
        ],
        items: [
          "SSRF protection with DNS and public-IP validation",
          "Redirect revalidation and safe outbound headers",
          "Request timeouts and a bounded 4 MiB response body",
          "Process-local per-user rate and concurrency limits",
          "Production deployment guidance for a Vercel Firewall rate-limit rule on /api/execute",
          "AES-256-GCM encryption for sensitive saved headers",
        ],
      },
      {
        label: "Testing / reliability",
        title: "Verified across the request lifecycle.",
        paragraphs: [
          "The completed release passed TypeScript checks, ESLint, the production build, and 68 automated tests covering authorization, validation, SSRF defenses, execution limits, response presentation, assertions, history, encryption, and workspace reset behavior.",
        ],
      },
      {
        label: "Outcome",
        title: "A complete testing workspace.",
        paragraphs: [
          "API Sentinel progressed from a REST request composer into a deployed full-stack workspace with authentication, persistence, assertions, history, and practical server-side security controls.",
        ],
      },
    ],
    tone: "paper",
  },
  {
    number: "04",
    slug: "filepilot",
    title: "FilePilot",
    category: "Windows / Local-first",
    description: "Local-first Windows file intelligence.",
    secondaryDescription:
      "Scan crowded folders, surface exact duplicates, understand storage, and organize files through previewed, reversible operations.",
    technologies: ["Python", "PySide6", "SQLite", "SHA-256"],
    github: "https://github.com/Ankush9740/FilePilot",
    githubLabel: "View source",
    download: "https://github.com/Ankush9740/FilePilot/releases/tag/v1.0.0",
    caseStudy: "/projects/filepilot",
    visual: "filepilot",
    engineering: [
      "Recursive read-only folder scanning",
      "Exact duplicate verification with SHA-256",
      "Previewed, conflict-aware organization with no overwrite",
      "Persistent operation history and verified Undo",
      "Background workers for responsive local analysis",
      "PyInstaller and Inno Setup packaging for Windows x64",
    ],
    media: [
      {
        label: "Dashboard",
        src: "/projects/FilePilot/filepilot-dashboard.png",
        alt: "FilePilot dashboard summarizing a locally scanned Windows folder",
        caption:
          "The dashboard turns a crowded folder into a local, readable overview before any files are changed.",
      },
      {
        label: "Duplicate review",
        src: "/projects/FilePilot/filepilot-duplicates.png",
        alt: "FilePilot duplicate review showing exact duplicate file groups",
        caption:
          "Exact duplicate groups are verified with file size and SHA-256 hashing before they are surfaced for review.",
      },
      {
        label: "Organize preview",
        src: "/projects/FilePilot/filepilot-organize.png",
        alt: "FilePilot organization preview showing planned file moves",
        caption:
          "Organization stays preview-first, conflict-aware, and conservative: proposed moves are visible before execution.",
      },
      {
        label: "History and Undo",
        src: "/projects/FilePilot/filepilot-history.png",
        alt: "FilePilot operation history with verified Undo controls",
        caption:
          "Persistent operation history records completed moves and provides a verified path to undo them safely.",
      },
    ],
    caseSections: [
      {
        label: "Problem",
        title: "Understand first. Change second.",
        paragraphs: [
          "Crowded Windows folders make it difficult to see where storage is going, which files are truly duplicated, and what an organization pass will change.",
          "FilePilot begins with inspection. It builds a clear local inventory before offering any operation that changes the filesystem.",
        ],
      },
      {
        label: "Local-first architecture",
        title: "Files stay on the machine.",
        paragraphs: [
          "FilePilot is a Python 3.11 desktop application built with PySide6. Scans, classification, duplicate verification, history, and settings run locally without an account, telemetry, file uploads, or cloud processing.",
          "SQLite stores persistent operation history while background workers keep large scans responsive in the desktop interface.",
        ],
      },
      {
        label: "Folder intelligence",
        title: "See what a folder contains.",
        paragraphs: [
          "Recursive read-only scans gather file counts, sizes, categories, storage distribution, and largest-file insights so the dashboard can explain a folder before the user organizes it.",
          "The same local index supports search, filtering, sorting, and focused file inspection without introducing a cloud dependency.",
        ],
      },
      {
        label: "Exact duplicate detection",
        title: "Verify bytes, not filenames.",
        paragraphs: [
          "Duplicate candidates are narrowed by file size, then verified with SHA-256. Matching names alone never qualify files as exact duplicates.",
          "The review surface groups verified matches and keeps deletion or organization decisions with the user.",
        ],
      },
      {
        label: "Safe organization",
        title: "Preview every move.",
        paragraphs: [
          "FilePilot creates a move plan before touching the filesystem. Category destinations, conflicts, and expected results remain visible for review.",
          "Execution is conflict-aware and never overwrites an existing destination file. Failures are isolated and reported instead of silently forcing a partial plan.",
        ],
      },
      {
        label: "Reversible operations",
        title: "A verified way back.",
        paragraphs: [
          "Completed organization operations are persisted to history with the source and destination required for reversal.",
          "Undo verifies the current filesystem state before moving files back, prevents an old record from overwriting newer work, and conservatively removes only empty directories created by that operation. Completed history can be cleared without affecting files.",
        ],
      },
      {
        label: "Engineering / safety",
        title: "Conservative by construction.",
        paragraphs: [
          "Read-only scanning is separated from filesystem mutation, long work runs away from the UI thread, and organization executes from an explicit previewed plan.",
        ],
        items: [
          "No cloud upload or external file processing",
          "No overwrite during organization or Undo",
          "Path and protection checks constrain operations to the selected working folder",
          "Bounded, reported failures instead of hidden mutation",
          "Persistent SQLite history for auditable operations",
        ],
      },
      {
        label: "Shipping / verification",
        title: "A real Windows release.",
        paragraphs: [
          "Version 1.0.0 ships as a Windows x64 installer assembled with PyInstaller and Inno Setup. Its Python and Qt runtime is bundled, so users do not need Python installed.",
          "The release page includes FilePilot-Setup-1.0.0.exe. The installer is currently unsigned, so Windows SmartScreen may display an Unknown Publisher warning.",
          "Verification completed with 149 passing tests and one privilege-dependent symbolic-link test skipped. The packaged app was checked across all six pages and Light, Dark, and System themes; the installer was exercised through install, launch, and uninstall; and user data stored separately from the installation was preserved after uninstall.",
        ],
      },
    ],
    tone: "paper",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectLinks(project: Project): ProjectLink[] {
  return [
    ...(project.liveDemo ? [{ label: "Live demo" as const, href: project.liveDemo }] : []),
    ...(project.download
      ? [{ label: "Download for Windows" as const, href: project.download }]
      : []),
    { label: project.githubLabel ?? "GitHub", href: project.github },
    { label: "Case study", href: project.caseStudy },
  ];
}
