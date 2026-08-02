import type { ExpertiseItem, SkillGroup } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    title: "Technical skills",
    description: "Laboratory capabilities and protocol-led practice areas.",
    label: "Core expertise",
    skills: [
      "Hematology",
      "Clinical Biochemistry",
      "Microbiology",
      "Immunology",
      "Blood Sample Collection",
      "Urine Analysis",
      "Specimen Processing",
      "Diagnostic Testing",
      "Medical Equipment Handling",
      "Quality Control",
      "Infection Control",
      "Laboratory Documentation",
      "Laboratory Safety",
      "Biomedical Waste Management",
      "Report Preparation",
    ],
  },
  {
    title: "Professional strengths",
    description: "Human skills that support safe, coordinated healthcare work.",
    label: "Professional strength",
    skills: [
      "Communication",
      "Teamwork",
      "Time Management",
      "Attention to Detail",
      "Critical Thinking",
      "Problem Solving",
      "Professional Ethics",
      "Patient Care",
      "Confidentiality",
      "Workflow Coordination",
    ],
  },
];

export const expertise: ExpertiseItem[] = [
  { title: "Blood Testing", description: "Protocol-led support for routine blood-based investigations.", procedures: ["Preparation", "Processing"], icon: "Droplets" },
  { title: "Urine Testing", description: "Careful handling and processing for routine urinalysis workflows.", procedures: ["Collection guidance", "Analysis support"], icon: "TestTube" },
  { title: "Clinical Chemistry", description: "Accurate preparation and instrument-assisted biochemical testing support.", procedures: ["Analyzers", "Quality checks"], icon: "FlaskConical" },
  { title: "Hematology", description: "Structured support for hematology procedures and documentation.", procedures: ["Cell analysis", "Records"], icon: "Activity" },
  { title: "Serology", description: "Methodical assistance with established serological testing protocols.", procedures: ["Preparation", "Controls"], icon: "ShieldCheck" },
  { title: "Microbiology", description: "Safety-conscious specimen workflow support in microbiology settings.", procedures: ["Aseptic practice", "Workflow"], icon: "Microscope" },
  { title: "Specimen Collection", description: "Patient-aware collection, identification, and handling practices.", procedures: ["Collection", "Labelling"], icon: "ClipboardCheck" },
  { title: "Sample Processing", description: "Timely preparation and routing in line with laboratory protocols.", procedures: ["Preparation", "Traceability"], icon: "Workflow" },
  { title: "Equipment Calibration", description: "Support for routine checks, upkeep, and calibration records.", procedures: ["Checks", "Maintenance logs"], icon: "Gauge" },
  { title: "Quality Control", description: "Consistent attention to internal controls and quality procedures.", procedures: ["Internal QC", "Documentation"], icon: "BadgeCheck" },
  { title: "Diagnostic Reporting", description: "Accurate preparation and routing of laboratory documentation.", procedures: ["Completeness", "Timeliness"], icon: "FileCheck2" },
  { title: "Laboratory Documentation", description: "Clear, confidential, and traceable record-keeping practices.", procedures: ["Records", "Confidentiality"], icon: "Files" },
];
