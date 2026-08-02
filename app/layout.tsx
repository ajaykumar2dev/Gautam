import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Suspense } from "react";

import "@/app/globals.css";
import profilePhoto from "@/Amrita_Gautam454.jpeg";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/utils";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = "Amrita Gautam | Medical Laboratory Technician in Lucknow";
const description =
  "Professional portfolio of Amrita Gautam, a Medical Laboratory Technician at Dr. Ram Manohar Lohia Institute of Medical Sciences, showcasing laboratory expertise, experience, education, certifications, and professional focus.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Amrita Gautam",
  },
  description,
  applicationName: "Amrita Gautam Portfolio",
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "/",
    siteName: "Amrita Gautam Portfolio",
    title,
    description,
    images: [{ url: profilePhoto.src, width: profilePhoto.width, height: profilePhoto.height, alt: `${profile.name} professional portrait` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [profilePhoto.src],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  robots: siteUrl.includes("your-domain.example")
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07111f" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} min-h-screen antialiased`} id="top">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-medical-600 px-5 py-3 font-bold text-white"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <Header />
          <Suspense
            fallback={
              <div className="grid min-h-[78svh] place-items-center" role="status" aria-live="polite">
                <div className="text-center">
                  <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-blue-200 dark:border-blue-900">
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-medical-500 motion-safe:animate-spin" aria-hidden="true" />
                    <span className="font-[family-name:var(--font-manrope)] text-sm font-extrabold text-medical-600 dark:text-blue-300">AG</span>
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[.18em] text-muted">Loading portfolio</p>
                </div>
              </div>
            }
          >
            {children}
            <Footer />
          </Suspense>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
