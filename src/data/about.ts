export type AboutCard = {
  label: string;
  title: string;
  detail: string;
  depth: 1 | 2 | 3;
  className: string;
};

export const aboutCards: AboutCard[] = [
  { label: "Identity", title: "ANKUSH", detail: "BCA student · developer · creative builder", depth: 3, className: "about-card-identity" },
  { label: "Education", title: "BCA", detail: "2024 — 2027", depth: 2, className: "about-card-education" },
  { label: "Development", title: "WEB", detail: "Interactive experiences and useful applications", depth: 2, className: "about-card-development" },
  { label: "Mobile", title: "ANDROID", detail: "Useful products built for the devices people carry", depth: 2, className: "about-card-mobile" },
  { label: "AI", title: "LOCAL AI", detail: "AI-assisted development and model experimentation", depth: 3, className: "about-card-ai" },
  { label: "Location", title: "MANGALORE", detail: "India", depth: 1, className: "about-card-location" },
  { label: "Philosophy", title: "BUILD. BREAK.", detail: "Learn. Repeat.", depth: 2, className: "about-card-philosophy" },
];
