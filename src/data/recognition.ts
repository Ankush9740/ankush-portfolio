export type RecognitionType = "certificate";

export type RecognitionItem = {
  id: string;
  title: string;
  shortTitle: string;
  achievement: string;
  category: string;
  institution: string;
  institutionShort: string;
  event: string;
  date: string;
  type: RecognitionType;
  image: string;
  credentialUrl: string | null;
};

export const recognitionItems: RecognitionItem[] = [
  {
    id: "certificate-01",
    title: "EXCEL 5.0 — Design Dock",
    shortTitle: "EXCEL 5.0",
    achievement: "1st Place",
    category: "Web Design",
    institution: "Srinivas Institute of Technology, Valachil, Mangaluru",
    institutionShort: "Srinivas Institute of Technology",
    event: "National Level IT Fest EXCEL 5.0",
    date: "18 February 2026",
    type: "certificate",
    image: "/certificates/excel-5-srinivas.jpg",
    credentialUrl: null,
  },
  {
    id: "certificate-02",
    title: "AGNESIA 2K26 — Codevyuham",
    shortTitle: "AGNESIA 2K26",
    achievement: "1st Place",
    category: "Coding + Web Designing",
    institution: "St Agnes College (Autonomous), Centre for Postgraduate Studies and Research, Mangaluru",
    institutionShort: "St Agnes College",
    event: "AGNESIA 2K26 National Level Inter-Collegiate Competition",
    date: "24–25 February 2026",
    type: "certificate",
    image: "/certificates/agnesia-2026.jpg",
    credentialUrl: null,
  },
  {
    id: "certificate-03",
    title: "SDM Aaroha 2K26 — Pixora",
    shortTitle: "AAROHA 2K26",
    achievement: "1st Place",
    category: "Web Designing",
    institution: "Sri Dharmasthala Manjunatheshwara College (Autonomous), Ujire",
    institutionShort: "SDM College, Ujire",
    event: "SDM Aaroha 2K26 — Two-Day National Level Educational and Cultural Fest",
    date: "10–11 September 2026",
    type: "certificate",
    image: "/certificates/aaroha-2026.jpg",
    credentialUrl: null,
  },
];
