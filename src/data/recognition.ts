export type RecognitionType = "certificate";

export type RecognitionItem = {
  id: string;
  title: string;
  issuer: string | null;
  date: string | null;
  type: RecognitionType;
  image: string | null;
  description: string;
  credentialUrl: string | null;
  placeholder: boolean;
};

// Replace these intentionally empty slots with verified recognition records.
export const recognitionItems: RecognitionItem[] = [
  {
    id: "certificate-01",
    title: "Certificate 01",
    issuer: null,
    date: null,
    type: "certificate",
    image: null,
    description: "Neutral placeholder for a future verified certificate. No credential claim is being made.",
    credentialUrl: null,
    placeholder: true,
  },
  {
    id: "certificate-02",
    title: "Certificate 02",
    issuer: null,
    date: null,
    type: "certificate",
    image: null,
    description: "Neutral placeholder for a future verified certificate. No credential claim is being made.",
    credentialUrl: null,
    placeholder: true,
  },
  {
    id: "certificate-03",
    title: "Certificate 03",
    issuer: null,
    date: null,
    type: "certificate",
    image: null,
    description: "Neutral placeholder for a future verified certificate. No credential claim is being made.",
    credentialUrl: null,
    placeholder: true,
  },
];
