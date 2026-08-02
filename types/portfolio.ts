export type PlaceholderValue = {
  label: string;
  value: string;
  isPlaceholder?: boolean;
};

export type SkillGroup = {
  title: string;
  description: string;
  label: string;
  skills: string[];
};

export type ExpertiseItem = {
  title: string;
  description: string;
  procedures: string[];
  icon: string;
};

export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  dates: string;
  department: string;
  employmentType: string;
  isPlaceholder: boolean;
  summary: string;
  responsibilities: string[];
};

export type EducationItem = {
  degree: string;
  institution: string;
  university: string;
  year: string;
  location: string;
  status: "placeholder" | "verified";
};

export type CertificationItem = {
  title: string;
  category: "Laboratory" | "Safety" | "Quality" | "Clinical" | "Training";
  issuer: string;
  issueDate: string;
  credentialId: string;
  status: "placeholder" | "verified";
};

export type GalleryItem = {
  id: number;
  title: string;
  category: "Laboratory" | "Equipment" | "Events" | "Certificates" | "Team";
  description: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
  isPlaceholder: boolean;
};
