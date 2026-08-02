import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/AboutSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Hero } from "@/components/sections/Hero";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StatisticsSection } from "@/components/sections/StatisticsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustRail } from "@/components/sections/TrustRail";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.role,
      address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: profile.organization },
      url: siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${profile.name} Professional Portfolio`,
      url: siteUrl,
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: `${profile.name} — ${profile.role}`,
      url: siteUrl,
      mainEntity: { "@type": "Person", name: profile.name, jobTitle: profile.role },
      isPartOf: { "@type": "WebSite", name: `${profile.name} Professional Portfolio`, url: siteUrl },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }],
    },
  ];

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Hero />
      <TrustRail />
      <AboutSection />
      <StatisticsSection />
      <SkillsSection />
      <ExpertiseSection />
      <ExperienceSection />
      <EducationSection />
      <CertificationsSection />
      <AchievementsSection />
      <GalleryPreview />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}
