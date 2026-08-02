import type { Metadata } from "next";

import { GalleryExperience } from "@/components/gallery/GalleryExperience";

const description =
  "Explore Amrita Gautam's privacy-conscious professional gallery through clearly labelled, code-native placeholders for approved laboratory, learning, equipment, and team imagery.";

export const metadata: Metadata = {
  title: "Professional Gallery",
  description,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Professional Gallery | Amrita Gautam",
    description,
    url: "/gallery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Gallery | Amrita Gautam",
    description,
  },
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <GalleryExperience />
    </main>
  );
}
