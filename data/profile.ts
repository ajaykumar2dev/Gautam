import type { PlaceholderValue } from "@/types/portfolio";

export const profile = {
  name: "Amrita Gautam",
  initials: "AG",
  role: "Medical Laboratory Technician",
  organization: "Dr. Ram Manohar Lohia Institute of Medical Sciences",
  organizationShort: "Dr. RMLIMS",
  location: "Lucknow, Uttar Pradesh, India",
  tagline:
    "Committed to accuracy, quality diagnostics, and patient-centered laboratory services.",
  introduction:
    "A laboratory professional focused on dependable procedures, careful documentation, quality control, and safe diagnostic support within collaborative healthcare teams.",
  biography:
    "Amrita Gautam is a dedicated Medical Laboratory Technician with experience supporting diagnostic laboratory procedures, specimen collection and processing, laboratory safety, and quality assurance. Her practice is grounded in precision, timely workflow, and careful adherence to established protocols. She approaches each responsibility with respect for patient confidentiality, collaborative care, and the role accurate laboratory work plays in clinical decision-making.",
  objective:
    "To continue contributing reliable laboratory support in an environment that values quality systems, patient safety, ethical practice, and continuous professional development.",
  email: {
    label: "Email",
    value: "Add professional email",
    isPlaceholder: true,
  },
  phone: {
    label: "Phone",
    value: "Add professional phone",
    isPlaceholder: true,
  },
  linkedin: {
    label: "LinkedIn",
    value: "Add LinkedIn profile",
    isPlaceholder: true,
  },
  resume: {
    path: "/documents/amrita-gautam-resume.pdf",
    available: false,
  },
  availability: "Open to relevant professional conversations",
  languages: "Add languages",
} as const;

export const quickFacts: PlaceholderValue[] = [
  { label: "Current workplace", value: profile.organization },
  { label: "Based in", value: profile.location },
  { label: "Professional field", value: "Diagnostic laboratory services" },
  { label: "Availability", value: profile.availability },
  { label: "Languages", value: profile.languages, isPlaceholder: true },
  { label: "Experience", value: "Add verified duration", isPlaceholder: true },
];

export const navItems = [
  { label: "Home", href: "/#home", section: "home" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Education", href: "/#education", section: "education" },
  { label: "Credentials", href: "/certifications", section: "certifications" },
  { label: "Gallery", href: "/gallery", section: "gallery" },
  { label: "Contact", href: "/contact", section: "contact" },
] as const;
