import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const isPlaceholderDomain = siteUrl.includes("your-domain.example");
  return {
    rules: isPlaceholderDomain
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
