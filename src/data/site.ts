export const siteConfig = {
  name: "Ankush",
  title: "Ankush — Creative Developer",
  description:
    "A creative developer portfolio focused on useful, interactive digital experiences.",
  location: "Mangalore, India",
  sectionVisibility: {
    about: true,
    projects: true,
    skills: true,
    lab: true,
    recognition: true,
    contact: true,
  },
} as const;

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Lab", href: "#lab" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
] as const;
