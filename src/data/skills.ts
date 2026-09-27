export type Skill = {
  name: string;
  icon: string;
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    description: "Languages used across coursework, web, mobile, and experiments.",
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "Kotlin", icon: "kotlin" },
      { name: "SQL", icon: "postgresql" },
      { name: "C", icon: "c" },
      { name: "C#", icon: "csharp" },
    ],
  },
  {
    title: "Web",
    description: "Tools for expressive, responsive, and production-minded interfaces.",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
    ],
  },
  {
    title: "Backend / Data",
    description: "Services and data layers behind practical applications.",
    skills: [
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Node.js", icon: "nodejs" },
      { name: "APIs", icon: "api" },
    ],
  },
  {
    title: "Mobile",
    description: "Native Android tools and interface systems for useful mobile products.",
    skills: [
      { name: "Jetpack Compose", icon: "compose" },
      { name: "Android", icon: "android" },
      { name: "Material Design", icon: "material" },
    ],
  },
  {
    title: "Tools / Platforms",
    description: "Everyday systems used to build, version, debug, and ship.",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "VS Code", icon: "vscode" },
      { name: "Android Studio", icon: "androidstudio" },
    ],
  },
  {
    title: "AI Ecosystem",
    description: "Assistants and model ecosystems used in development workflows and local experimentation—not proficiency claims.",
    skills: [
      { name: "ChatGPT / OpenAI", icon: "openai" },
      { name: "Claude", icon: "claude" },
      { name: "Gemini", icon: "gemini" },
      { name: "Gemma", icon: "gemma" },
      { name: "Qwen", icon: "qwen" },
      { name: "Ollama", icon: "ollama" },
    ],
  },
];
