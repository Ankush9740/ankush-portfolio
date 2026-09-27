export type JourneyEntry = {
  year: string;
  title: string;
  detail: string;
  status?: "current" | "future";
};

export const journey: JourneyEntry[] = [
  { year: "2024", title: "Started BCA", detail: "Began a formal foundation in computer applications and software development." },
  { year: "2025", title: "Learning & building", detail: "Turned coursework and self-directed learning into increasingly complete application projects." },
  { year: "2026", title: "Quizloom, AutoLens & AI-assisted development", detail: "Exploring real-time web systems, Android development, and practical local-AI workflows.", status: "current" },
  { year: "2027", title: "What’s next?", detail: "An open milestone for graduation and the next verified professional chapter.", status: "future" },
];
