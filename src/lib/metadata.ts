import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

type BuildMetadataOptions = {
  title?: string;
  description: string;
  path?: string;
};

export function buildPageMetadata({ title, description, path = "" }: BuildMetadataOptions): Metadata {
  const canonicalUrl = path ? `${siteConfig.siteUrl}${path}` : siteConfig.siteUrl;
  const pageTitle = title ? `${title} | ${siteConfig.shortName}` : `${siteConfig.shortName} | Premium Youth Soccer Club`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}
